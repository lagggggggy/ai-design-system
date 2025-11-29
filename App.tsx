import React, { useState, useMemo } from 'react';
import { TokenEditor } from './components/TokenEditor';
import { ComponentPreview } from './components/ComponentPreview';
import { DEFAULT_TOKENS, SUPPORTED_COMPONENTS } from './constants';
import { DesignTokens, ComponentType } from './types';
import { generateCode } from './services/generatorService';
import { downloadAllFiles } from './utils/fileUtils';
import { 
  Layout, 
  Palette, 
  Code2, 
  Download, 
  Moon, 
  Sun,
  Layers
} from 'lucide-react';

function App() {
  const [tokens, setTokens] = useState<DesignTokens>(DEFAULT_TOKENS);
  const [activePage, setActivePage] = useState<'tokens' | 'components'>('tokens');
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>('button');
  const [selectedStrategy, setSelectedStrategy] = useState<'web-component' | 'native-react' | 'native-angular'>('web-component');
  const [isDark, setIsDark] = useState(false);

  // Memoize generated code to avoid recalculation on every render
  const generatedFiles = useMemo(() => {
    return generateCode(selectedComponent, tokens, selectedStrategy);
  }, [selectedComponent, tokens, selectedStrategy]);

  const handleDownload = () => {
    downloadAllFiles(generatedFiles);
  };

  return (
    <div className={`flex h-screen w-full transition-colors duration-300 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Sidebar Navigation */}
      <aside className={`w-20 flex-none flex flex-col items-center py-6 border-r z-20 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="mb-8 p-3 rounded-xl bg-indigo-600 shadow-lg shadow-indigo-500/30">
          <Layers className="w-6 h-6 text-white" />
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
            onClick={() => setIsDark(!isDark)}
            className={`p-3 rounded-xl flex items-center justify-center transition-all ${isDark ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            title="Toggle Dark Mode"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden relative">
        
        {/* PAGE: TOKENS */}
        {activePage === 'tokens' && (
          <div className="w-full h-full">
            <TokenEditor 
              tokens={tokens} 
              onUpdate={setTokens} 
              isDark={isDark}
            />
          </div>
        )}

        {/* PAGE: COMPONENTS STUDIO */}
        {activePage === 'components' && (
          <div className="flex w-full h-full">
            
            {/* Component Picker Sidebar */}
            <div className={`w-64 flex-none border-r overflow-y-auto ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className={`p-4 border-b sticky top-0 backdrop-blur-sm z-10 ${isDark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-100 bg-white/80'}`}>
                <h2 className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Components</h2>
              </div>
              <div className="p-2 space-y-1">
                {SUPPORTED_COMPONENTS.map(c => (
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
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                      c.type === 'atom' 
                        ? (isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700') 
                        : (isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700')
                    }`}>
                      {c.type}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview & Code Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              
              {/* Toolbar */}
              <div className={`h-16 flex-none border-b flex items-center justify-between px-6 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center gap-4">
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

                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium transition-colors shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>

              {/* Workspace Split */}
              <div className="flex-1 flex overflow-hidden">
                {/* Visual Preview */}
                <div className="flex-1 relative flex flex-col">
                  <ComponentPreview 
                    component={selectedComponent} 
                    tokens={tokens}
                    isDark={isDark}
                  />
                  <div className={`absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium border shadow-sm backdrop-blur-sm ${isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-white/80 border-slate-200 text-slate-500'}`}>
                    Live Preview
                  </div>
                </div>

                {/* Code View */}
                <div className={`w-[400px] flex-none border-l flex flex-col ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className={`p-4 border-b flex items-center gap-2 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                    <Code2 className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                    <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Generated Output</span>
                  </div>
                  <div className="flex-1 overflow-auto p-4 space-y-4">
                    {generatedFiles.map((file) => (
                      <div key={file.fileName} className={`rounded-lg border overflow-hidden ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
                        <div className={`px-3 py-2 border-b text-xs font-medium flex justify-between items-center ${isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
                          <span>{file.fileName}</span>
                          <span className="opacity-50 text-[10px] uppercase">{file.language}</span>
                        </div>
                        <pre className={`p-3 text-[11px] font-mono leading-relaxed overflow-x-auto ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          {file.content}
                        </pre>
                      </div>
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