import React, { useState, useMemo } from 'react';
import { TokenEditor } from './components/TokenEditor';
import { ComponentPreview } from './components/ComponentPreview';
import { DEFAULT_TOKENS, SUPPORTED_COMPONENTS } from './constants';
import { DesignTokens, ComponentType, GenerationStrategy } from './types';
import { generateCode } from './services/generatorService';
import { downloadAllFiles } from './utils/fileUtils';
import { Code, Eye, Moon, Sun, Copy, Check, FileJson, Download, Layers, Palette, Layout, Settings } from 'lucide-react';

type ViewMode = 'design-system' | 'components';

const App: React.FC = () => {
  const [tokens, setTokens] = useState<DesignTokens>(DEFAULT_TOKENS);
  const [activeView, setActiveView] = useState<ViewMode>('design-system');
  const [isDark, setIsDark] = useState(false); // Global Dark Mode
  
  // Component Studio States
  const [activeComponent, setActiveComponent] = useState<ComponentType>('button');
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'tokens'>('preview');
  const [strategy, setStrategy] = useState<GenerationStrategy>('web-component');
  const [copied, setCopied] = useState(false);

  // Memoize generated code
  const generatedFiles = useMemo(() => {
    return generateCode(activeComponent, tokens, strategy);
  }, [activeComponent, tokens, strategy]);

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadAllFiles(generatedFiles);
  };

  return (
    <div className={`flex h-screen w-screen overflow-hidden font-sans transition-colors duration-300 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* GLOBAL SIDEBAR */}
      <aside className={`w-20 flex flex-col items-center py-6 shrink-0 z-50 border-r ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-900 border-slate-800'}`}>
         <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-blue-900/50">
           <Layout className="text-white w-6 h-6" />
         </div>

         <nav className="flex flex-col gap-4 w-full px-2">
            <button 
              onClick={() => setActiveView('design-system')}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${activeView === 'design-system' ? 'bg-slate-800 text-blue-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              title="Design System"
            >
              <Palette className="w-6 h-6" />
              <span className="text-[10px] font-medium">Tokens</span>
            </button>
            
            <button 
              onClick={() => setActiveView('components')}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${activeView === 'components' ? 'bg-slate-800 text-blue-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              title="Component Studio"
            >
              <Layers className="w-6 h-6" />
              <span className="text-[10px] font-medium">Studio</span>
            </button>
         </nav>

         <div className="mt-auto flex flex-col gap-4">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-3 text-slate-500 hover:text-white transition-colors rounded-xl hover:bg-slate-800"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
         </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* VIEW: DESIGN SYSTEM (TOKEN EDITOR) */}
        {activeView === 'design-system' && (
          <div className="flex-1 h-full overflow-hidden">
            <TokenEditor tokens={tokens} onUpdate={setTokens} isDark={isDark} />
          </div>
        )}

        {/* VIEW: COMPONENT STUDIO */}
        {activeView === 'components' && (
          <div className="flex-1 flex flex-col h-full min-w-0">
            {/* Header / Toolbar */}
            <header className={`h-16 border-b flex items-center justify-between px-6 shrink-0 transition-colors ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
               
               {/* Component Selector */}
               <div className="flex items-center gap-4 overflow-x-auto no-scrollbar mask-gradient">
                  <div className={`flex items-center p-1 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                    {SUPPORTED_COMPONENTS.map(comp => (
                      <button
                        key={comp.id}
                        onClick={() => setActiveComponent(comp.id)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                          activeComponent === comp.id 
                            ? (isDark ? 'bg-slate-700 text-blue-400 shadow-sm' : 'bg-white text-blue-600 shadow-sm') 
                            : (isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700')
                        }`}
                      >
                        {comp.name}
                      </button>
                    ))}
                  </div>
               </div>

               {/* Framework Strategy Selector */}
               <div className="flex items-center gap-3 ml-4 shrink-0">
                 <div className={`flex items-center p-1 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                    {['web-component', 'native-react', 'native-angular'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setStrategy(s as GenerationStrategy)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${
                          strategy === s 
                            ? (isDark ? 'bg-slate-700 text-indigo-400 shadow-sm' : 'bg-white text-indigo-600 shadow-sm') 
                            : (isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700')
                        }`}
                      >
                        {s.replace('-', ' ')}
                      </button>
                    ))}
                 </div>
               </div>
            </header>

            {/* Sub-Toolbar */}
            <div className={`h-12 border-b flex items-center justify-between px-6 shrink-0 shadow-sm z-10 transition-colors ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
               <div className="flex gap-6">
                  <button 
                    onClick={() => setActiveTab('preview')}
                    className={`flex items-center gap-2 text-sm border-b-2 px-1 h-12 transition-colors ${
                      activeTab === 'preview' ? 'border-blue-500 text-blue-500 font-medium' : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                  >
                    <Eye className="w-4 h-4" /> Preview
                  </button>
                  <button 
                    onClick={() => setActiveTab('code')}
                    className={`flex items-center gap-2 text-sm border-b-2 px-1 h-12 transition-colors ${
                      activeTab === 'code' ? 'border-blue-500 text-blue-500 font-medium' : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                  >
                    <Code className="w-4 h-4" /> Code
                  </button>
                  <button 
                    onClick={() => setActiveTab('tokens')}
                    className={`flex items-center gap-2 text-sm border-b-2 px-1 h-12 transition-colors ${
                      activeTab === 'tokens' ? 'border-blue-500 text-blue-500 font-medium' : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                  >
                    <FileJson className="w-4 h-4" /> Debug JSON
                  </button>
               </div>

               <div className="flex items-center gap-2">
                 {activeTab === 'code' && (
                    <button 
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
                    title="Download Generated Files"
                  >
                    <Download className="w-3 h-3" /> Download Files
                  </button>
                 )}
               </div>
            </div>

            {/* Workspace Content */}
            <div className={`flex-1 overflow-hidden relative ${isDark ? 'bg-slate-950' : 'bg-slate-100'}`}>
              
              {activeTab === 'preview' && (
                <div className="absolute inset-0 flex flex-col">
                  <ComponentPreview 
                    component={activeComponent} 
                    tokens={tokens} 
                    isDark={isDark} 
                  />
                </div>
              )}

              {activeTab === 'code' && (
                <div className="absolute inset-0 bg-[#0d1117] text-slate-50 p-8 overflow-auto">
                  <div className="max-w-5xl mx-auto space-y-8">
                    {generatedFiles.map((file) => (
                      <div key={file.fileName} className="border border-slate-700 rounded-xl overflow-hidden bg-[#161b22] shadow-2xl">
                        <div className="bg-[#21262d] px-4 py-3 border-b border-slate-700 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                             <span className="text-sm font-mono text-blue-400 font-semibold">{file.fileName}</span>
                             <span className="text-[10px] text-slate-400 px-2 py-0.5 bg-slate-800 rounded-full border border-slate-700">
                               {file.description}
                             </span>
                          </div>
                          <button 
                            onClick={() => handleCopy(file.content)}
                            className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-700"
                            title="Copy code"
                          >
                             {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        <pre className="p-6 text-sm font-mono overflow-x-auto text-slate-300 leading-relaxed custom-scrollbar">
                          <code>{file.content}</code>
                        </pre>
                      </div>
                    ))}
                    {generatedFiles.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                        <Code className="w-12 h-12 mb-4 opacity-20" />
                        <p>No generation strategy available for this configuration.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'tokens' && (
                <div className="absolute inset-0 bg-[#0d1117] text-slate-50 p-8 overflow-auto">
                   <div className="max-w-5xl mx-auto">
                      <div className="border border-slate-700 rounded-xl overflow-hidden bg-[#161b22] shadow-2xl">
                        <div className="bg-[#21262d] px-4 py-3 border-b border-slate-700 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                             <span className="text-sm font-mono text-purple-400 font-semibold">tokens.json</span>
                             <span className="text-[10px] text-slate-400 px-2 py-0.5 bg-slate-800 rounded-full border border-slate-700">
                               W3C Standard
                             </span>
                          </div>
                          <button 
                            onClick={() => handleCopy(JSON.stringify(tokens, null, 2))}
                            className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-700"
                          >
                             {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        <pre className="p-6 text-sm font-mono overflow-x-auto text-slate-300 leading-relaxed custom-scrollbar">
                          <code>{JSON.stringify(tokens, null, 2)}</code>
                        </pre>
                      </div>
                   </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;