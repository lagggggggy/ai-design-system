
import React, { useState, useEffect, useCallback, memo } from 'react';
import { DesignTokens, TokenGroup, TokenField } from '../types';
import { runAccessibilityAudit } from '../services/geminiService';
import { getTokenValue, setTokenValue, getScaleValues } from '../utils/tokenUtils';
import { validateTokens } from '../schemas/tokenSchema';
import { Wand2, Loader2, Palette, Type, BoxSelect, Sparkles, AlertCircle, MousePointer2, Copy, Check, Eye, Code, ScanSearch, X, Undo2, Redo2 } from 'lucide-react';
import { TOKEN_GROUPS } from '../constants';

interface TokenEditorProps {
  tokens: DesignTokens;
  onUpdate: (tokens: DesignTokens) => void;
  isDark: boolean;
  onGenerate?: (prompt: string) => Promise<void>;
  undo?: () => void;
  redo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

const ICONS: Record<string, any> = {
  Palette,
  Type,
  BoxSelect,
  Sparkles,
  AlertCircle,
  MousePointer2
};

// --- Helpers ---

// Debounce helper to avoid flooding state updates
const useDebouncedUpdate = (
  path: string, 
  initialValue: string, 
  onGlobalUpdate: (path: string, value: string) => void,
  delay: number = 300
) => {
  const [localValue, setLocalValue] = useState(initialValue);

  useEffect(() => {
    setLocalValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localValue !== initialValue) {
        onGlobalUpdate(path, localValue);
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [localValue, path, initialValue, delay, onGlobalUpdate]);

  return [localValue, setLocalValue] as const;
};

// --- Extracted Sub-Components (Prevents Remounting) ---

const PaletteEditor = memo(({ label, path, tokens, isDark, onUpdate }: { label: string, path: string, tokens: DesignTokens, isDark: boolean, onUpdate: (path: string, val: string) => void }) => {
  const scale = getScaleValues(tokens, path);
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
          <PaletteInput 
            key={key} 
            colorKey={key} 
            fullPath={`${path}.${key}`} 
            initialValue={scale[key]} 
            isDark={isDark} 
            onUpdate={onUpdate} 
          />
        ))}
      </div>
    </div>
  );
});

const PaletteInput = memo(({ colorKey, fullPath, initialValue, isDark, onUpdate }: { colorKey: string, fullPath: string, initialValue: string, isDark: boolean, onUpdate: (p: string, v: string) => void }) => {
  const [value, setValue] = useDebouncedUpdate(fullPath, initialValue, onUpdate);

  return (
    <div className="flex flex-col gap-1">
        <div 
          className={`w-full h-8 rounded border shadow-inner ${isDark ? 'border-slate-600' : 'border-slate-100'}`} 
          style={{ backgroundColor: value }}
        />
        <div className="flex flex-col">
          <span className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>{colorKey}</span>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={`text-[10px] font-mono border-b border-transparent hover:border-slate-300 focus:border-blue-500 outline-none bg-transparent w-full ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
          />
        </div>
    </div>
  );
});

const AliasEditor = memo(({ label, path, tokens, isDark, onUpdate }: { label: string, path: string, tokens: DesignTokens, isDark: boolean, onUpdate: (path: string, val: string) => void }) => {
  const initialValue = getTokenValue(tokens, path);
  const [value, setValue] = useDebouncedUpdate(path, initialValue, onUpdate);
  const isAlias = value.startsWith('{') && value.endsWith('}');
  
  return (
    <div className="flex flex-col gap-1">
      <label className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</label>
      <div className="flex items-center gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={`flex-1 text-sm border rounded px-2 py-1.5 outline-none font-mono ${
              isAlias 
                ? (isDark ? 'text-purple-300 bg-purple-900/20 border-purple-700/50' : 'text-purple-600 bg-purple-50 border-purple-200')
                : (isDark ? 'text-slate-200 bg-slate-800 border-slate-600' : 'text-slate-900 border-slate-300')
            }`}
        />
        {!isAlias && (
          <input
            type="color"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border-0 p-0 overflow-hidden shrink-0"
          />
        )}
      </div>
    </div>
  );
});

const SimpleColorInput = memo(({ label, path, tokens, isDark, onUpdate }: { label: string, path: string, tokens: DesignTokens, isDark: boolean, onUpdate: (path: string, val: string) => void }) => {
  const initialValue = getTokenValue(tokens, path);
  const [value, setValue] = useDebouncedUpdate(path, initialValue, onUpdate);

  return (
    <div className="flex flex-col gap-1">
      <label className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</label>
      <div className="flex items-center gap-2">
        <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={`flex-1 text-sm font-mono border rounded px-2 py-1.5 uppercase outline-none focus:ring-1 focus:ring-blue-500 ${isDark ? 'bg-slate-800 border-slate-600 text-slate-200' : 'bg-white border-slate-300 text-slate-900'}`}
        />
        <input
          type="color"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border-0 p-0 overflow-hidden shrink-0"
        />
      </div>
    </div>
  );
});

const TextInput = memo(({ label, path, tokens, isDark, onUpdate }: { label: string, path: string, tokens: DesignTokens, isDark: boolean, onUpdate: (path: string, val: string) => void }) => {
  const initialValue = getTokenValue(tokens, path);
  const [value, setValue] = useDebouncedUpdate(path, initialValue, onUpdate);

  return (
    <div>
      <label className={`text-xs block mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</label>
      <input 
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`w-full text-sm border rounded p-1.5 outline-none focus:ring-1 focus:ring-blue-500 ${isDark ? 'bg-slate-800 border-slate-600 text-slate-200' : 'bg-white border-slate-300 text-slate-900'}`}
      />
    </div>
  );
});

// --- Main Component ---

export const TokenEditor: React.FC<TokenEditorProps> = ({ 
  tokens, 
  onUpdate, 
  isDark, 
  onGenerate,
  undo,
  redo,
  canUndo,
  canRedo
}) => {
  const [magicPrompt, setMagicPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [magicError, setMagicError] = useState('');
  
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditReport, setAuditReport] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'visual' | 'json'>('visual');
  const [copied, setCopied] = useState(false);

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Keyboard shortcuts for Undo/Redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
           redo?.();
        } else {
           undo?.();
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'y') {
        e.preventDefault();
        redo?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const handleUpdateWrapper = useCallback((path: string, value: string) => {
    // Create new tokens from the *current* tokens prop
    const newTokens = setTokenValue(tokens, path, value);
    
    const result = validateTokens(newTokens);
    if (!result.success && result.errors) {
      setValidationErrors(result.errors);
    } else {
      setValidationErrors([]);
    }
    
    onUpdate(newTokens);
  }, [tokens, onUpdate]);

  const handleMagicGenerate = async () => {
    if (!magicPrompt) return;
    setIsGenerating(true);
    setMagicError('');
    
    try {
      if (onGenerate) {
        await onGenerate(magicPrompt);
        setMagicPrompt('');
      } else {
        setMagicError("Generator service not connected.");
      }
    } catch (e) {
      setMagicError("Generation failed.");
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAudit = async () => {
    setIsAuditing(true);
    setAuditReport(null);
    try {
      const report = await runAccessibilityAudit(tokens);
      setAuditReport(report);
    } catch (e) {
      setAuditReport("Failed to run audit.");
    } finally {
      setIsAuditing(false);
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(tokens, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderField = (field: TokenField) => {
    const commonProps = {
      key: field.path,
      label: field.label,
      path: field.path,
      tokens,
      isDark,
      onUpdate: handleUpdateWrapper
    };

    switch(field.type) {
      case 'scale': return <PaletteEditor {...commonProps} />;
      case 'alias': return <AliasEditor {...commonProps} />;
      case 'color': return <SimpleColorInput {...commonProps} />;
      default: return <TextInput {...commonProps} />;
    }
  };

  return (
    <div className={`flex flex-col h-full overflow-y-auto transition-colors ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      
      {/* Magic Theme Header */}
      <div className={`border-b p-8 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h1 className={`text-3xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Design System Studio</h1>
              <p className={`mt-1 mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Define your atomic tokens, semantic aliases, and brand palettes.</p>
            </div>
            
            {/* Undo/Redo Controls */}
            <div className={`flex items-center gap-1 rounded-lg border p-1 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <button 
                onClick={undo}
                disabled={!canUndo}
                className={`p-2 rounded hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors ${isDark ? 'text-slate-200 hover:bg-white/10' : 'text-slate-600'}`}
                title="Undo (Ctrl+Z)"
              >
                <Undo2 className="w-5 h-5" />
              </button>
              <button 
                onClick={redo}
                disabled={!canRedo}
                className={`p-2 rounded hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors ${isDark ? 'text-slate-200 hover:bg-white/10' : 'text-slate-600'}`}
                title="Redo (Ctrl+Shift+Z)"
              >
                <Redo2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            
            {/* Generator Row */}
            <div className={`p-6 rounded-xl border flex items-center gap-4 ${isDark ? 'bg-indigo-900/20 border-indigo-500/30' : 'bg-gradient-to-r from-violet-50 to-indigo-50 border-indigo-100'}`}>
               <div className={`p-3 rounded-lg shadow-sm ${isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-white text-indigo-600'}`}>
                 <Wand2 className="w-6 h-6" />
               </div>
               <div className="flex-1">
                 <label className={`text-sm font-bold block mb-1 ${isDark ? 'text-indigo-200' : 'text-indigo-900'}`}>Magic Theme Generator</label>
                 <div className="flex gap-2">
                  <input 
                    type="text" 
                    className={`flex-1 text-sm border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm ${isDark ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-indigo-200 text-slate-900'}`}
                    placeholder="Describe your theme (e.g. 'Cyberpunk with neon yellow')..."
                    value={magicPrompt}
                    onChange={(e) => setMagicPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleMagicGenerate()}
                  />
                  <button 
                    onClick={handleMagicGenerate}
                    disabled={isGenerating || !magicPrompt}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors font-medium flex items-center gap-2"
                  >
                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Generate Brand Theme'}
                  </button>
                </div>
                {magicError && <p className="text-xs text-red-500 mt-2">{magicError}</p>}
               </div>
            </div>

            {/* Actions Row */}
            <div className="flex gap-4">
              <button 
                onClick={handleAudit}
                disabled={isAuditing}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-colors ${isDark ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-teal-400' : 'bg-white border-slate-200 hover:bg-slate-50 text-teal-700'}`}
              >
                {isAuditing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ScanSearch className="w-4 h-4" />}
                <span className="font-medium">Run Accessibility Audit</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
         <div className="max-w-4xl mx-auto mt-4 px-8 w-full">
           <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
             <h4 className="font-bold flex items-center gap-2 mb-2">
               <AlertCircle className="w-4 h-4" /> Token Validation Errors
             </h4>
             <ul className="list-disc pl-5 space-y-1">
               {validationErrors.slice(0, 5).map((err, i) => <li key={i}>{err}</li>)}
               {validationErrors.length > 5 && <li>...and {validationErrors.length - 5} more</li>}
             </ul>
           </div>
         </div>
      )}

      {/* Audit Report Modal/Section */}
      {auditReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/50 backdrop-blur-sm">
           <div className={`w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-xl shadow-2xl ${isDark ? 'bg-slate-900 border border-slate-700' : 'bg-white'}`}>
             <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-inherit z-10">
               <h3 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                 <ScanSearch className="w-5 h-5 text-teal-500" />
                 Accessibility Report
               </h3>
               <button onClick={() => setAuditReport(null)} className="p-2 hover:bg-black/10 rounded-full">
                 <X className="w-5 h-5" />
               </button>
             </div>
             <div className={`p-6 prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
               <pre className="whitespace-pre-wrap font-sans text-sm">{auditReport}</pre>
             </div>
           </div>
        </div>
      )}

      {/* Tabs */}
      <div className={`border-b mt-4 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
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