import React, { useState, useMemo, useRef, useCallback } from 'react';
import { TokenEditor } from './components/TokenEditor';
import { ComponentPreview } from './components/ComponentPreview';
import { FileViewer } from './components/FileViewer';
import { SUPPORTED_COMPONENTS } from './constants';
import { ComponentType, GeneratedFile } from './types';
import { generateCode } from './services/generatorService';
import { downloadAsZip } from './utils/fileUtils';
import { useDesignSystem } from './hooks/useDesignSystem';
import { 
  Layout, 
  Palette, 
  Code2, 
  Download, 
  Moon, 
  Sun,
  PanelLeftClose,
  PanelLeftOpen,
  BookOpen,
  Check,
  ChevronsUpDown,
  Plus,
  Trash2,
  RotateCcw,
  Loader2,
  GripVertical,
  Copy
} from 'lucide-react';

function App() {
  // --- Core Domain Logic (Extracted to Hook) ---
  const {
    brands,
    activeBrand,
    activeTheme,
    activeBrandId,
    activeThemeId,
    isDark,
    isLoading,
    setActiveThemeId,
    updateTokens,
    createBrand,
    deleteBrand,
    switchBrand,
    createTheme,
    deleteTheme,
    generateMagicTheme,
    resetData,
    undo,
    redo,
    canUndo,
    canRedo
  } = useDesignSystem();

  // --- UI State (View specific) ---
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [activePage, setActivePage] = useState<'tokens' | 'components'>('tokens');
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>('button');
  const [selectedStrategy, setSelectedStrategy] = useState<'web-component' | 'native-react' | 'native-angular'>('web-component');
  const [isLibraryOpen, setIsLibraryOpen] = useState(true);
  
  // Studio Resizer State
  const [splitPosition, setSplitPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoize generated code to avoid recalculation on every render
  const generatedFiles = useMemo(() => {
    return generateCode(selectedComponent, activeTheme.tokens, selectedStrategy);
  }, [selectedComponent, activeTheme.tokens, selectedStrategy]);

  const handleDownload = () => {
    downloadAsZip(generatedFiles, `${selectedComponent}-${selectedStrategy}.zip`);
  };

  const handleOpenStorybook = () => {
    let port = 6006; // React Default
    if (selectedStrategy === 'web-component') port = 6008;
    if (selectedStrategy === 'native-angular') port = 6007;
    
    // Construct deep link to story (assuming standard Storybook ID generation)
    const componentId = selectedComponent.toLowerCase();
    const storyId = `components-${componentId}--default`;
    const url = `http://localhost:${port}/?path=/story/${storyId}`;
    window.open(url, '_blank');
  };

  const handleToggleMode = () => {
    const targetMode = activeTheme.mode === 'light' ? 'dark' : 'light';
    const targetTheme = activeBrand.themes.find(t => t.mode === targetMode);
    
    if (targetTheme) {
      setActiveThemeId(targetTheme.id);
    } else {
      createTheme(targetMode);
    }
  };

  const startResizing = useCallback(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      // Clamp between 20% and 80% to prevent panels from disappearing
      const clamped = Math.max(20, Math.min(80, percentage));
      setSplitPosition(clamped);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  const categories = ['atom', 'molecule', 'organism'] as const;

  if (isLoading) {
    return (
      <div className="flex h-dvh w-full items-center justify-center bg-slate-50 text-slate-500">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          <span className="text-sm font-medium">Loading Design System...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-dvh w-full transition-colors duration-300 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Sidebar Navigation */}
      <aside className={`w-20 flex-none flex flex-col items-center py-6 border-r z-20 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        
        {/* Brand Switcher / App Icon */}
        <div className="relative mb-6">
           <button 
             onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}
             className={`w-12 h-12 rounded-xl shadow-lg transition-all flex items-center justify-center font-bold text-xl ${isDark ? 'bg-indigo-600 shadow-indigo-500/20 hover:bg-indigo-500 text-white' : 'bg-indigo-600 shadow-indigo-500/30 hover:bg-indigo-700 text-white'}`}
             title={activeBrand.name}
           >
             {activeBrand.name.charAt(0)}
           </button>
           
           {isBrandDropdownOpen && (
             <div className={`absolute top-full left-0 mt-2 w-64 p-2 rounded-xl shadow-xl border z-50 flex flex-col gap-1 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <div className={`px-2 py-1.5 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Switch Brand</div>
                {brands.map(brand => (
                  <button
                    key={brand.id}
                    onClick={() => { switchBrand(brand.id); setIsBrandDropdownOpen(false); }}
                    className={`flex items-center justify-between w-full text-left px-2 py-2 rounded-lg text-sm transition-colors group ${
                      activeBrandId === brand.id 
                        ? (isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-700') 
                        : (isDark ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-50')
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className={`w-6 h-6 rounded flex-none flex items-center justify-center text-xs font-bold ${activeBrandId === brand.id ? (isDark ? 'bg-indigo-500 text-white' : 'bg-indigo-600 text-white') : (isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-600')}`}>
                        {brand.name.charAt(0)}
                      </div>
                      <div className="flex flex-col truncate pr-2">
                        <span className="font-medium truncate">{brand.name}</span>
                        <span className="text-[10px] opacity-60">{brand.themes.length} themes</span>
                      </div>
                    </div>
                    <div className="flex items-center flex-none">
                       {activeBrandId === brand.id && <Check className="w-3 h-3 mr-2 opacity-50" />}
                       {brands.length > 1 && (
                         <div 
                           onClick={(e) => { e.stopPropagation(); deleteBrand(brand.id); }}
                           className="p-1 rounded hover:bg-red-500/10 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                         >
                           <Trash2 className="w-3 h-3" />
                         </div>
                       )}
                    </div>
                  </button>
                ))}
                <div className={`h-px my-1 ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}></div>
                <button
                  onClick={() => { createBrand(); setIsBrandDropdownOpen(false); }}
                  className={`flex items-center gap-2 w-full text-left px-2 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isDark ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Plus className="w-3 h-3" />
                  Create New Brand
                </button>
                <div className={`h-px my-1 ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}></div>
                <button
                  onClick={resetData}
                  className={`flex items-center gap-2 w-full text-left px-2 py-2 rounded-lg text-xs font-medium transition-colors text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20`}
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset Data
                </button>
             </div>
           )}
        </div>

        <nav className="flex-1 flex flex-col gap-4 w-full px-2">
          <button 
            onClick={() => setActivePage('tokens')}
            className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${activePage === 'tokens' ? 'bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
          >
            <Palette className="w-5 h-5" />
            <span className="text-[10px] font-medium">Tokens</span>
          </button>

          <button 
            onClick={() => setActivePage('components')}
            className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${activePage === 'components' ? 'bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
          >
            <Layout className="w-5 h-5" />
            <span className="text-[10px] font-medium">Studio</span>
          </button>
        </nav>

        <div className="flex flex-col gap-4 w-full px-2">
           <button 
            onClick={handleToggleMode}
            className={`p-3 rounded-xl flex items-center justify-center transition-all ${isDark ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden relative">
        
        {/* PAGE: TOKENS */}
        {activePage === 'tokens' && (
          <div className="w-full h-full flex flex-col">
             {/* Header */}
             <div className={`px-8 py-4 border-b flex items-center justify-between ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center gap-6">
                  <div>
                    <h2 className={`text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {activeBrand.name} 
                    </h2>
                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{activeBrand.description}</p>
                  </div>
                  
                  {/* Theme Selector */}
                  <div className="relative">
                    <button 
                      onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                        isDark ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {activeTheme.mode === 'dark' ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
                      {activeTheme.name}
                      <ChevronsUpDown className="w-3 h-3 opacity-50 ml-1" />
                    </button>

                    {isThemeDropdownOpen && (
                      <div className={`absolute top-full left-0 mt-2 w-56 p-2 rounded-xl shadow-xl border z-50 flex flex-col gap-1 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                          <div className={`px-2 py-1.5 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Select Theme</div>
                          {activeBrand.themes.map(theme => (
                            <button
                              key={theme.id}
                              onClick={() => { setActiveThemeId(theme.id); setIsThemeDropdownOpen(false); }}
                              className={`flex items-center justify-between w-full text-left px-2 py-2 rounded-lg text-sm transition-colors group ${
                                activeThemeId === theme.id 
                                  ? (isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-700') 
                                  : (isDark ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-50')
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {theme.mode === 'dark' ? <Moon className="w-3 h-3 opacity-70" /> : <Sun className="w-3 h-3 opacity-70" />}
                                <span className="truncate">{theme.name}</span>
                              </div>
                              <div className="flex items-center">
                                {activeThemeId === theme.id && <Check className="w-3 h-3 mr-2 opacity-50" />}
                                {activeBrand.themes.length > 1 && (
                                  <div 
                                    onClick={(e) => { e.stopPropagation(); deleteTheme(theme.id); }}
                                    className="p-1 rounded hover:bg-red-500/10 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </div>
                                )}
                              </div>
                            </button>
                          ))}
                          <div className={`h-px my-1 ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}></div>
                          <button
                            onClick={() => { createTheme(); setIsThemeDropdownOpen(false); }}
                            className={`flex items-center gap-2 w-full text-left px-2 py-2 rounded-lg text-xs font-medium transition-colors ${
                              isDark ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                            }`}
                          >
                            <Copy className="w-3 h-3" />
                            Duplicate Current
                          </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  Last updated: {new Date(activeBrand.updatedAt).toLocaleTimeString()}
                </div>
             </div>
             
             <div className="flex-1 overflow-hidden">
                <TokenEditor 
                  tokens={activeTheme.tokens} 
                  onUpdate={updateTokens} 
                  onGenerate={generateMagicTheme}
                  isDark={isDark}
                  undo={undo}
                  redo={redo}
                  canUndo={canUndo}
                  canRedo={canRedo}
                />
             </div>
          </div>
        )}

        {/* PAGE: COMPONENTS STUDIO */}
        {activePage === 'components' && (
          <div className="flex w-full h-full">
            
            {/* Component Picker Sidebar (Collapsible) */}
            {isLibraryOpen && (
              <div className={`w-64 flex-none border-r overflow-y-auto ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className={`p-4 border-b sticky top-0 backdrop-blur-sm z-10 flex items-center justify-between ${isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-white'}`}>
                  <h2 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Library</h2>
                  <button 
                    onClick={() => setIsLibraryOpen(false)}
                    className={`p-1.5 -mr-1.5 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
                    title="Close Library"
                  >
                    <PanelLeftClose className="w-4 h-4" />
                  </button>
                </div>
                <div className="py-2">
                  {categories.map(category => {
                    const categoryComponents = SUPPORTED_COMPONENTS.filter(c => c.type === category);
                    if (categoryComponents.length === 0) return null;
                    
                    return (
                      <div key={category} className="mb-4">
                        <h3 className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider opacity-60 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                          {category}s
                        </h3>
                        <div className="px-2 space-y-1">
                          {categoryComponents.map(c => (
                            <button
                              key={c.id}
                              onClick={() => setSelectedComponent(c.id)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between group ${
                                selectedComponent === c.id 
                                  ? (isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-700 font-medium') 
                                  : (isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-50')
                              }`}
                            >
                              {c.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Preview & Code Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              
              {/* Toolbar */}
              <div className={`h-16 flex-none border-b flex items-center justify-between px-6 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center gap-4">
                  {!isLibraryOpen && (
                    <>
                      <button 
                        onClick={() => setIsLibraryOpen(true)}
                        className={`p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
                        title="Open Library"
                      >
                        <PanelLeftOpen className="w-5 h-5" />
                      </button>
                      
                      <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
                    </>
                  )}

                  <div className="flex bg-slate-100 rounded-lg p-1 dark:bg-slate-800">
                     <button
                        onClick={() => setSelectedStrategy('web-component')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${selectedStrategy === 'web-component' ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-300' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                      >
                        Web Component
                      </button>
                      <button
                        onClick={() => setSelectedStrategy('native-react')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${selectedStrategy === 'native-react' ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-300' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                      >
                        React
                      </button>
                      <button
                        onClick={() => setSelectedStrategy('native-angular')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${selectedStrategy === 'native-angular' ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-300' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                      >
                        Angular
                      </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleToggleMode}
                    className={`p-2 rounded-lg transition-colors border ${isDark ? 'bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
                  >
                    {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>

                  <div className={`text-xs px-3 py-1 rounded-full border ${isDark ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                    Viewing: <span className="font-semibold">{activeTheme.name}</span>
                  </div>

                  <button
                    onClick={handleOpenStorybook}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
                    title="Open in Storybook"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span className="hidden sm:inline">Storybook</span>
                  </button>
                  
                  <button 
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium transition-colors shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>

              {/* Workspace Split (Resizable) */}
              <div ref={containerRef} className="flex-1 flex overflow-hidden">
                
                {/* Visual Preview */}
                <div 
                  style={{ width: `${splitPosition}%` }} 
                  className="relative flex flex-col border-r dark:border-slate-800"
                >
                  <ComponentPreview 
                    component={selectedComponent} 
                    tokens={activeTheme.tokens}
                    isDark={isDark}
                    themeMode={activeTheme.mode}
                  />
                  <div className={`absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium border shadow-sm backdrop-blur-sm ${isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-white/80 border-slate-200 text-slate-500'}`}>
                    Live Preview
                  </div>
                </div>

                {/* Resizer Handle */}
                <div 
                  onMouseDown={startResizing}
                  className={`w-1 hover:w-2 transition-all cursor-col-resize z-10 flex flex-col justify-center items-center group relative hover:bg-indigo-500 active:bg-indigo-600 ${isDark ? 'bg-slate-900 hover:bg-indigo-500' : 'bg-slate-200 hover:bg-indigo-500'}`}
                  title="Drag to resize"
                >
                  <div className="absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Code View */}
                <div 
                  style={{ width: `${100 - splitPosition}%` }} 
                  className={`flex flex-col ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}
                >
                  <div className={`p-4 border-b flex items-center gap-2 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                    <Code2 className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                    <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Generated Output</span>
                  </div>
                  <div className="flex-1 overflow-auto p-4 space-y-4">
                    {generatedFiles.map((file) => (
                      <FileViewer key={file.fileName} file={file} isDark={isDark} />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;