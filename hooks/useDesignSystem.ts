
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Brand, Theme, DesignTokens } from '../types';
import { DEFAULT_BRANDS } from '../constants';
import { api, AppState } from '../services/api';
import { logger } from '../services/logger';
import { generateThemeFromDescription } from '../services/geminiService';
import { applyDarkModeOverrides } from '../utils/tokenUtils';
import { useHistory } from './useHistory';

export function useDesignSystem() {
  // Domain State managed by History
  const {
    state: brands,
    set: setBrands,
    reset: resetBrands,
    undo,
    redo,
    canUndo,
    canRedo
  } = useHistory<Brand[]>(DEFAULT_BRANDS);

  const [activeBrandId, setActiveBrandId] = useState<string>(DEFAULT_BRANDS[0].id);
  const [activeThemeId, setActiveThemeId] = useState<string>(DEFAULT_BRANDS[0].themes[0].id);
  const [isLoading, setIsLoading] = useState(true);

  // Derived State
  const activeBrand = useMemo(() => brands.find(b => b.id === activeBrandId) || brands[0], [brands, activeBrandId]);
  const activeTheme = useMemo(() => activeBrand.themes.find(t => t.id === activeThemeId) || activeBrand.themes[0], [activeBrand, activeThemeId]);
  const isDark = activeTheme.mode === 'dark';

  // --- Initialization ---
  useEffect(() => {
    const init = async () => {
      try {
        const savedState = await api.fetchState();
        if (savedState) {
          resetBrands(savedState.brands); // Reset history with saved state
          setActiveBrandId(savedState.activeBrandId);
          setActiveThemeId(savedState.activeThemeId);
        }
      } catch (e) {
        logger.error('Initialization failed', e);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [resetBrands]);

  // --- Persistence ---
  useEffect(() => {
    if (isLoading) return;
    const state: AppState = { brands, activeBrandId, activeThemeId };
    api.saveState(state).catch(e => logger.error('Auto-save failed', e));
  }, [brands, activeBrandId, activeThemeId, isLoading]);

  // --- Actions ---

  const updateTokens = useCallback((newTokens: DesignTokens) => {
    const newBrands = brands.map(b => {
      if (b.id !== activeBrandId) return b;
      return {
        ...b,
        updatedAt: new Date().toISOString(),
        themes: b.themes.map(t => {
          if (t.id !== activeThemeId) return t;
          return { ...t, tokens: newTokens };
        })
      };
    });
    setBrands(newBrands);
    logger.debug('Tokens updated', { brand: activeBrandId, theme: activeThemeId });
  }, [activeBrandId, activeThemeId, brands, setBrands]);

  const createBrand = useCallback(() => {
    const newBrand: Brand = {
      id: `brand-${Date.now()}`,
      name: `New Brand ${brands.length + 1}`,
      description: 'A new brand based on default tokens.',
      themes: [
        {
          id: `theme-light-${Date.now()}`,
          name: 'Default Light',
          mode: 'light',
          tokens: JSON.parse(JSON.stringify(DEFAULT_BRANDS[0].themes[0].tokens))
        },
        {
          id: `theme-dark-${Date.now()}`,
          name: 'Default Dark',
          mode: 'dark',
          tokens: JSON.parse(JSON.stringify(DEFAULT_BRANDS[0].themes[1].tokens))
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setBrands([...brands, newBrand]);
    setActiveBrandId(newBrand.id);
    setActiveThemeId(newBrand.themes[0].id);
    logger.info('Created new brand', newBrand.id);
  }, [brands, setBrands]);

  const deleteBrand = useCallback((id: string) => {
    if (brands.length <= 1) {
      logger.warn('Attempted to delete last brand');
      return;
    }
    const newBrands = brands.filter(b => b.id !== id);
    setBrands(newBrands);
    if (activeBrandId === id) {
      setActiveBrandId(newBrands[0].id);
      setActiveThemeId(newBrands[0].themes[0].id);
    }
    logger.info('Deleted brand', id);
  }, [brands, activeBrandId, setBrands]);

  const switchBrand = useCallback((id: string) => {
    setActiveBrandId(id);
    const brand = brands.find(b => b.id === id);
    if (brand && brand.themes.length > 0) {
      setActiveThemeId(brand.themes[0].id);
    }
    logger.debug('Switched brand', id);
  }, [brands]);

  const createTheme = useCallback((modeOverride?: 'light' | 'dark') => {
    const mode = modeOverride || activeTheme.mode;
    const newTheme: Theme = {
      id: `theme-${Date.now()}`,
      name: `New ${mode === 'light' ? 'Light' : 'Dark'} Theme`,
      mode: mode,
      tokens: JSON.parse(JSON.stringify(activeTheme.tokens))
    };
    
    if (mode === 'dark' && activeTheme.mode === 'light') {
       newTheme.tokens = applyDarkModeOverrides(newTheme.tokens);
    }
    
    const newBrands = brands.map(b => {
      if (b.id !== activeBrandId) return b;
      return { ...b, themes: [...b.themes, newTheme], updatedAt: new Date().toISOString() };
    });

    setBrands(newBrands);
    setActiveThemeId(newTheme.id);
    logger.info('Created theme', newTheme.id);
  }, [activeBrandId, activeTheme, brands, setBrands]);

  const deleteTheme = useCallback((id: string) => {
    if (activeBrand.themes.length <= 1) return;
    
    const newBrands = brands.map(b => {
      if (b.id !== activeBrandId) return b;
      const newThemes = b.themes.filter(t => t.id !== id);
      return { ...b, themes: newThemes, updatedAt: new Date().toISOString() };
    });
    
    setBrands(newBrands);
    
    if (activeThemeId === id) {
       const remaining = activeBrand.themes.filter(t => t.id !== id);
       setActiveThemeId(remaining[0].id);
    }
    logger.info('Deleted theme', id);
  }, [activeBrandId, activeBrand.themes, activeThemeId, brands, setBrands]);

  const generateMagicTheme = useCallback(async (prompt: string) => {
    logger.info('Starting magic theme generation', prompt);
    const newTokens = await generateThemeFromDescription(prompt);
    if (!newTokens) return;

    const newBrands = brands.map(brand => {
      if (brand.id !== activeBrandId) return brand;
      
      const newThemes = brand.themes.map(theme => {
         let mergedTokens = { ...theme.tokens, ...newTokens };
         if (theme.mode === 'dark') {
            mergedTokens = applyDarkModeOverrides(mergedTokens);
         }
         return { ...theme, tokens: mergedTokens };
      });

      return { 
        ...brand, 
        themes: newThemes, 
        updatedAt: new Date().toISOString() 
      };
    });

    setBrands(newBrands);
    logger.info('Magic theme generated and applied');
  }, [activeBrandId, brands, setBrands]);

  const resetData = useCallback(async () => {
    if (window.confirm("Are you sure? This will delete all custom brands and themes.")) {
       const defaultState = await api.resetState();
       resetBrands(defaultState.brands);
       setActiveBrandId(defaultState.activeBrandId);
       setActiveThemeId(defaultState.activeThemeId);
       logger.warn('Application reset');
    }
  }, [resetBrands]);

  return {
    // State
    brands,
    activeBrand,
    activeTheme,
    activeBrandId,
    activeThemeId,
    isDark,
    isLoading,
    
    // History
    undo,
    redo,
    canUndo,
    canRedo,
    
    // Actions
    setActiveThemeId,
    updateTokens,
    createBrand,
    deleteBrand,
    switchBrand,
    createTheme,
    deleteTheme,
    generateMagicTheme,
    resetData
  };
}