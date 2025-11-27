import React, { useState, useMemo } from 'react';
import { TokenEditor } from './components/TokenEditor';
import { ComponentPreview } from './components/ComponentPreview';
import { DEFAULT_TOKENS, SUPPORTED_COMPONENTS } from './constants';
import { DesignTokens, ComponentType, GenerationStrategy } from './types';
import { generateCode } from './services/generatorService';
import { Code, Eye, Moon, Sun, Copy, Check, FileJson } from 'lucide-react';

const App: React.FC = () => {
  const [tokens, setTokens] = useState<DesignTokens>(DEFAULT_TOKENS);
  const [activeComponent, setActiveComponent] = useState<ComponentType>('button');
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'tokens'>('preview');
  const [strategy, setStrategy] = useState<GenerationStrategy>('web-component');
  const [isDarkPreview, setIsDarkPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  // Memoize generated code to avoid recalculation on every render unless deps change
  const generatedFiles = useMemo(() => {
    return generateCode(activeComponent, tokens, strategy);
  }, [activeComponent, tokens, strategy]);

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans text-slate-900">
      
      {/* LEFT: Token Editor (Fixed) */}
      <TokenEditor tokens={tokens} onUpdate={setTokens} />

      {/* RIGHT: Main Content */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
             <div className="flex items-center bg-slate-100 p-1 rounded-lg">
                {SUPPORTED_COMPONENTS.map(comp => (
                  <button
                    key={comp.id}
                    onClick={() => setActiveComponent(comp.id)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                      activeComponent === comp.id 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {comp.name}
                  </button>
                ))}
             </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex items-center bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setStrategy('web-component')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    strategy === 'web-component' 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Web Components
                </button>
                <button
                  onClick={() => setStrategy('native-react')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    strategy === 'native-react' 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Native React
                </button>
                <button
                  onClick={() => setStrategy('native-angular')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    strategy === 'native-angular' 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Native Angular
                </button>
             </div>
          </div>
        </header>

        {/* Toolbar */}
        <div className="h-12 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
           <div className="flex gap-4">
              <button 
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-2 text-sm border-b-2 px-1 h-12 transition-colors ${
                  activeTab === 'preview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Eye className="w-4 h-4" /> Preview
              </button>
              <button 
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-2 text-sm border-b-2 px-1 h-12 transition-colors ${
                  activeTab === 'code' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Code className="w-4 h-4" /> Generated Code
              </button>
              <button 
                onClick={() => setActiveTab('tokens')}
                className={`flex items-center gap-2 text-sm border-b-2 px-1 h-12 transition-colors ${
                  activeTab === 'tokens' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileJson className="w-4 h-4" /> Tokens JSON
              </button>
           </div>

           {activeTab === 'preview' && (
             <button 
               onClick={() => setIsDarkPreview(!isDarkPreview)}
               className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
               title="Toggle Dark Mode Preview"
             >
               {isDarkPreview ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
             </button>
           )}
        </div>

        {/* Workspace */}
        <div className="flex-1 overflow-hidden relative">
          
          {activeTab === 'preview' && (
            <div className="absolute inset-0 flex flex-col">
              <ComponentPreview 
                component={activeComponent} 
                tokens={tokens} 
                isDark={isDarkPreview} 
              />
            </div>
          )}

          {activeTab === 'code' && (
            <div className="absolute inset-0 bg-slate-900 text-slate-50 p-6 overflow-auto">
              <div className="max-w-4xl mx-auto space-y-8">
                {generatedFiles.map((file) => (
                  <div key={file.fileName} className="border border-slate-700 rounded-lg overflow-hidden bg-slate-800 shadow-xl">
                    <div className="bg-slate-950 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                         <span className="text-sm font-mono text-blue-400">{file.fileName}</span>
                         <span className="text-xs text-slate-500 px-2 py-0.5 bg-slate-900 rounded-full border border-slate-700">
                           {file.description}
                         </span>
                      </div>
                      <button 
                        onClick={() => handleCopy(file.content)}
                        className="text-slate-400 hover:text-white transition-colors"
                        title="Copy code"
                      >
                         {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <pre className="p-4 text-sm font-mono overflow-x-auto text-slate-300 leading-relaxed">
                      <code>{file.content}</code>
                    </pre>
                  </div>
                ))}

                {generatedFiles.length === 0 && (
                  <div className="text-center text-slate-500 py-20">
                    No code generation strategy found for this component.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'tokens' && (
            <div className="absolute inset-0 bg-slate-900 text-slate-50 p-6 overflow-auto">
               <div className="max-w-4xl mx-auto">
                  <div className="border border-slate-700 rounded-lg overflow-hidden bg-slate-800 shadow-xl">
                    <div className="bg-slate-950 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                         <span className="text-sm font-mono text-purple-400">theme.json</span>
                         <span className="text-xs text-slate-500 px-2 py-0.5 bg-slate-900 rounded-full border border-slate-700">
                           Raw Token Data
                         </span>
                      </div>
                      <button 
                        onClick={() => handleCopy(JSON.stringify(tokens, null, 2))}
                        className="text-slate-400 hover:text-white transition-colors"
                        title="Copy JSON"
                      >
                         {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <pre className="p-4 text-sm font-mono overflow-x-auto text-slate-300 leading-relaxed">
                      <code>{JSON.stringify(tokens, null, 2)}</code>
                    </pre>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;