
import { Brand } from '../types';
import { DEFAULT_BRANDS } from '../constants';
import { logger } from './logger';

const STORAGE_KEY = 'atomic-ds-state-v1';
const SIMULATED_DELAY_MS = 300; // Simulate network latency

export interface AppState {
  brands: Brand[];
  activeBrandId: string;
  activeThemeId: string;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  /**
   * Fetches the current application state.
   * Simulates a GET request.
   */
  fetchState: async (): Promise<AppState | null> => {
    await sleep(SIMULATED_DELAY_MS);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        logger.info('API: State fetched successfully');
        return JSON.parse(saved) as AppState;
      }
      logger.info('API: No saved state found, returning null');
      return null;
    } catch (error) {
      logger.error('API: Failed to fetch state', error);
      throw new Error('Failed to load design system data');
    }
  },

  /**
   * Saves the application state.
   * Simulates a POST/PUT request.
   */
  saveState: async (state: AppState): Promise<void> => {
    // debounce save in a real app, but here we just simulate the call
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      logger.debug('API: State saved');
    } catch (error) {
      logger.error('API: Failed to save state', error);
      throw error;
    }
  },

  /**
   * Resets the data store to defaults.
   * Simulates a DELETE/RESET request.
   */
  resetState: async (): Promise<AppState> => {
    await sleep(SIMULATED_DELAY_MS);
    try {
      localStorage.removeItem(STORAGE_KEY);
      const defaultState: AppState = {
        brands: DEFAULT_BRANDS,
        activeBrandId: DEFAULT_BRANDS[0].id,
        activeThemeId: DEFAULT_BRANDS[0].themes[0].id
      };
      logger.warn('API: State reset to defaults');
      return defaultState;
    } catch (error) {
      logger.error('API: Failed to reset state', error);
      throw error;
    }
  }
};
