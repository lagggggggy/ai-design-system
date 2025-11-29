import React, { useState } from 'react';
import { DesignTokens, TokenGroup, TokenField } from '../types';
import { generateThemeFromDescription } from '../services/geminiService';
import { getTokenValue, setTokenValue, getScaleValues } from '../utils/tokenUtils';
import { Wand2, Loader2, Palette, Type, BoxSelect, Sparkles, AlertCircle, MousePointer2, Copy, Check, Eye, Code } from 'lucide-react';
import { TOKEN_GROUPS } from '../constants';

interface TokenEditorProps {
  tokens: DesignTokens;
  onUpdate: (tokens: DesignTokens) => void;
  isDark: boolean;
}

const ICONS: Record<string, any> = {
  Palette,
  Type,
  BoxSelect,
  Sparkles,
  AlertCircle,
  MousePointer2
};

export const TokenEditor: React.FC<TokenEditorProps> = ({ tokens, onUpdate, isDark }) => {
  const [magicPrompt, setMagicPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [magicError, setMagicError] = useState('');
  const [activeTab, setActiveTab] = useState<'visual' | 'json'>('visual');
  const [copied, setCopied] = useState(false);

  const handleChange = (path: string, value: string) => {
    const newTokens = setTokenValue(tokens, path, value);
    onUpdate(newTokens);
  };

  const handleMagicGenerate = async () => {
    if (!magicPrompt) return;
    setIsGenerating(true);
    setMagicError('');
    
    try {
      const newTokens = await generateThemeFromDescription(magicPrompt);
      if (newTokens) {
        onUpdate({ ...tokens, ...newTokens });
        setMagicPrompt('');
      } else {
        setMagicError("No theme generated.");
      }
    } catch (e) {
      setMagicError("Generation failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(tokens, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- Sub-Editors ---

  const PaletteEditor = ({ label, path }: { label: string, path: string }) => {
    const scale = getScaleValues(tokens, path);
    // scale keys: 50, 100 ... 950, DEFAULT
    const sortedKeys = Object.keys(scale)
      .filter(k => k !== 'DEFAULT')
      .sort((a, b) => parseInt(a) - parseInt(b));

    return (
      <div className={`p-4 rounded-lg border shadow-sm ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <h4 className={`text-sm font-bold mb-3 flex justify-between items-center ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
          {label}
          <div className="flex gap-1">
             {sortedKeys.map(k => (
                <div key={k} className="w-4 h-4 rounded-sm" style={{ backgroundColor: scale[k] }} title={k}></div>
             ))}
          </div>
        </h4>
        <div className="grid grid-cols-6 gap-3">
          {sortedKeys.map(key => (
            <div key={key} className="flex flex-col gap-1">
               <div 
                 className={`w-full h-8 rounded border shadow-inner ${isDark ? 'border-slate-600' : 'border-slate-100'}`} 
                 style={{ backgroundColor: scale[key] }}
               />
               <div className="flex flex-col">
                  <span className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>{key}</span>
                  <input
                    type="text"
                    value={scale[key]}
                    onChange={(e) => handleChange(`${path}.${key}`, e.target.value)}
                    className={`text-[10px] font-mono border-b border-transparent hover:border-slate-300 focus:border-blue-500 outline-none bg-transparent w-full ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
                  />
               </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const AliasEditor = ({ label, path }: { label: string, path: string }) => {
    const val = getTokenValue(tokens, path);
    // Check if it's an alias
    const isAlias = val.startsWith('{') && val.endsWith('}');
    
    return (
      <div className="flex flex-col gap-1">
        <label className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</label>
        <div className="flex items-center gap-2">
           <input
             type="text"
             value={val}
             onChange={(e) => handleChange(path, e.target.value)}
             className={`flex-1 text-sm border rounded px-2 py-1.5 outline-none font-mono ${
               isAlias 
                 ? (isDark ? 'text-purple-300 bg-purple-900/20 border-purple-700/50' : 'text-purple-600 bg-purple-50 border-purple-200')
                 : (isDark ? 'text-slate-200 bg-slate-800 border-slate-600' : 'text-slate-900 border-slate-300')
             }`}
          />
          {!isAlias && (
            <input
              type="color"
              value={val}
              onChange={(e) => handleChange(path, e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border-0 p-0 overflow-hidden shrink-0"
            />
          )}
        </div>
      </div>
    );
  };

  const SimpleColorInput = ({ label, path }: { label: string, path: string }) => {
    const val = getTokenValue(tokens, path);
    return (
      <div className="flex flex-col gap-1">
        <label className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</label>
        <div className="flex items-center gap-2">
          <input
             type="text"
             value={val}
             onChange={(e) => handleChange(path, e.target.value)}
             className={`flex-1 text-sm font-mono border rounded px-2 py-1.5 uppercase outline-none focus:ring-1 focus:ring-blue-500 ${isDark ? 'bg-slate-800 border-slate-600 text-slate-200' : 'bg-white border-slate-300 text-slate-900'}`}
          />
          <input
            type="color"
            value={val}
            onChange={(e) => handleChange(path, e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border-0 p-0 overflow-hidden shrink-0"
          />
        </div>
      </div>
    );
  };

  const TextInput = ({ label, path }: { label: string, path: string }) => {
    const val = getTokenValue(tokens, path);
    return (
      <div>
        <label className={`text-xs block mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</label>
        <input 
          type="text"
          value={val}
          onChange={(e) => handleChange(path, e.target.value)}
          className={`w-full text-sm border rounded p-1.5 outline-none focus:ring-1 focus:ring-blue-500 ${isDark ? 'bg-slate-800 border-slate-600 text-slate-200' : 'bg-white border-slate-300 text-slate-900'}`}
        />
      </div>
    );
  };

  const renderField = (field: TokenField) => {
    switch(field.type) {
      case 'scale': return <PaletteEditor key={field.path} label={field.label} path={field.path} />;
      case 'alias': return <AliasEditor key={field.path} label={field.label} path={field.path} />;
      case 'color': return <SimpleColorInput key={field.path} label={field.label} path={field.path} />;
      default: return <TextInput key={field.path} label={field.label} path={field.path} />;
    }
  };

  return (
    <div className={`flex flex-col h-full overflow-y-auto transition-colors ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      
      {/* Magic Theme Header */}
      <div className={`border-b p-8 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Design System Studio</h1>
          <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Define your atomic tokens, semantic aliases, and brand palettes.</p>
          
          <div className={`p-6 rounded-xl border flex items-center gap-4 ${isDark ? 'bg-indigo-900/20 border-indigo-500/30' : 'bg-gradient-to-r from-violet-50 to-indigo-50 border-indigo-100'}`}>
             <div className={`p-3 rounded-lg shadow-sm ${isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-white text-indigo-600'}`}>
               <Wand2 className="w-6 h-6" />
             </div>
             <div className="flex-1">
               <label className={`text-sm font-bold block mb-1 ${isDark ? 'text-indigo-200' : 'text-indigo-900'}`}>Magic Theme Generator</label>
               <p className={`text-xs mb-3 ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>Describe your brand (e.g., "Modern fintech with emerald greens and slate grays")</p>
               <div className="flex gap-2">
                <input 
                  type="text" 
                  className={`flex-1 text-sm border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm ${isDark ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-indigo-200 text-slate-900'}`}
                  placeholder="Describe your theme..."
                  value={magicPrompt}
                  onChange={(e) => setMagicPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleMagicGenerate()}
                />
                <button 
                  onClick={handleMagicGenerate}
                  disabled={isGenerating || !magicPrompt}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors font-medium flex items-center gap-2"
                >
                  {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Generate'}
                </button>
              </div>
              {magicError && <p className="text-xs text-red-500 mt-2">{magicError}</p>}
             </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`border-b ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
         <div className="max-w-5xl mx-auto px-8 flex gap-8">
            <button 
              onClick={() => setActiveTab('visual')}
              className={`py-4 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'visual' ? (isDark ? 'border-indigo-400 text-indigo-400' : 'border-indigo-600 text-indigo-600') : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              <Eye className="w-4 h-4" />
              Visual Editor
            </button>
            <button 
              onClick={() => setActiveTab('json')}
              className={`py-4 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'json' ? (isDark ? 'border-indigo-400 text-indigo-400' : 'border-indigo-600 text-indigo-600') : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              <Code className="w-4 h-4" />
              JSON Source
            </button>
         </div>
      </div>

      {/* Content Area */}
      <div className="max-w-5xl mx-auto w-full p-8 pb-20">
        
        {/* VISUAL EDITOR */}
        {activeTab === 'visual' && (
          <div className="space-y-12">
            {TOKEN_GROUPS.map((group) => {
              const Icon = ICONS[group.icon] || Palette;
              return (
                <section key={group.title} className="space-y-6">
                  <div className={`flex items-center gap-3 border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                    <div className={`p-2 rounded-lg shadow-sm border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'} ${group.color}`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{group.title}</h3>
                      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{group.description}</p>
                    </div>
                  </div>
                  
                  <div className={group.fields.some(f => f.type === 'scale') ? "space-y-6" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
                    {group.fields.map((field) => (
                      <div key={field.path} className={field.type === 'scale' ? 'w-full' : ''}>
                        {renderField(field)}
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* JSON SOURCE */}
        {activeTab === 'json' && (
           <div className="relative">
              <div className="absolute top-4 right-4 z-10">
                <button 
                  onClick={handleCopyJson}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors shadow-sm ${
                    isDark 
                    ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700' 
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied!' : 'Copy JSON'}
                </button>
              </div>
              <div className={`rounded-xl border overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <pre className={`p-6 text-xs font-mono overflow-auto leading-relaxed ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                  {JSON.stringify(tokens, null, 2)}
                </pre>
              </div>
           </div>
        )}

      </div>
    </div>
  );
};