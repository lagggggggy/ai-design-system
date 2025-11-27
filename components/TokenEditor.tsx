import React, { useState } from 'react';
import { DesignTokens } from '../types';
import { generateThemeFromDescription } from '../services/geminiService';
import { Wand2, Loader2, RefreshCw, Palette, Type, BoxSelect, Sparkles } from 'lucide-react';

interface TokenEditorProps {
  tokens: DesignTokens;
  onUpdate: (tokens: DesignTokens) => void;
}

export const TokenEditor: React.FC<TokenEditorProps> = ({ tokens, onUpdate }) => {
  const [magicPrompt, setMagicPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [magicError, setMagicError] = useState('');

  const handleChange = (key: keyof DesignTokens, value: string) => {
    onUpdate({ ...tokens, [key]: value });
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

  const ColorInput = ({ label, tokenKey }: { label: string, tokenKey: keyof DesignTokens }) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-slate-500">{label}</label>
      <div className="flex items-center gap-2">
        <input
           type="text"
           value={tokens[tokenKey]}
           onChange={(e) => handleChange(tokenKey, e.target.value)}
           className="flex-1 text-xs font-mono border border-slate-300 rounded px-2 py-1 uppercase bg-white text-slate-900"
        />
        <input
          type="color"
          value={tokens[tokenKey]}
          onChange={(e) => handleChange(tokenKey, e.target.value)}
          className="w-6 h-6 rounded cursor-pointer border-0 p-0 overflow-hidden"
        />
      </div>
    </div>
  );

  const TextInput = ({ label, tokenKey }: { label: string, tokenKey: keyof DesignTokens }) => (
    <div>
      <label className="text-xs text-slate-500 block mb-1">{label}</label>
      <input 
        type="text"
        value={tokens[tokenKey]}
        onChange={(e) => handleChange(tokenKey, e.target.value)}
        className="w-full text-xs border border-slate-300 rounded p-1.5 bg-white text-slate-900"
      />
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 w-80 overflow-y-auto">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          Tokens
        </h2>
      </div>

      <div className="p-4 border-b border-slate-100 bg-slate-50">
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
          <Wand2 className="w-3 h-3 text-purple-600" />
          Magic Theme
        </label>
        <div className="flex gap-2">
          <input 
            type="text" 
            className="flex-1 text-sm border border-slate-300 rounded px-2 py-1 focus:ring-1 focus:ring-purple-500 bg-white"
            placeholder="e.g. 'Cyberpunk'"
            value={magicPrompt}
            onChange={(e) => setMagicPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleMagicGenerate()}
          />
          <button 
            onClick={handleMagicGenerate}
            disabled={isGenerating || !magicPrompt}
            className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="p-4 space-y-8 pb-12">
        {/* Colors */}
        <section>
          <h3 className="text-sm font-semibold mb-3 text-slate-800 flex items-center gap-2">
            <Palette className="w-4 h-4 text-blue-500" /> Palette & States
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <ColorInput label="Primary" tokenKey="primary" />
            <ColorInput label="Primary Hover" tokenKey="primaryHover" />
            <ColorInput label="Secondary" tokenKey="secondary" />
            <ColorInput label="Secondary Hover" tokenKey="secondaryHover" />
            <ColorInput label="Error" tokenKey="error" />
            <ColorInput label="Border" tokenKey="border" />
            <ColorInput label="Background" tokenKey="background" />
            <ColorInput label="Surface" tokenKey="surface" />
            <ColorInput label="Text" tokenKey="text" />
            <ColorInput label="Text Inverse" tokenKey="textInverse" />
          </div>
        </section>

        {/* Geometry */}
        <section>
          <h3 className="text-sm font-semibold mb-3 text-slate-800 flex items-center gap-2">
            <BoxSelect className="w-4 h-4 text-green-500" /> Geometry
          </h3>
          <div className="space-y-3">
             <div className="grid grid-cols-2 gap-3">
                <TextInput label="Base Spacing" tokenKey="spacingUnit" />
                <TextInput label="Border Width" tokenKey="borderWidth" />
             </div>
             <TextInput label="Radius Small" tokenKey="borderRadiusSmall" />
             <TextInput label="Radius Medium" tokenKey="borderRadiusMedium" />
             <TextInput label="Radius Large" tokenKey="borderRadiusLarge" />
          </div>
        </section>

        {/* Typography */}
        <section>
          <h3 className="text-sm font-semibold mb-3 text-slate-800 flex items-center gap-2">
            <Type className="w-4 h-4 text-orange-500" /> Typography
          </h3>
          <div className="space-y-3">
             <TextInput label="Font Family" tokenKey="fontFamily" />
             <div className="grid grid-cols-3 gap-2">
                <TextInput label="Size Sm" tokenKey="fontSizeSm" />
                <TextInput label="Size Md" tokenKey="fontSizeMd" />
                <TextInput label="Size Lg" tokenKey="fontSizeLg" />
             </div>
             <div className="grid grid-cols-2 gap-3">
                <TextInput label="Weight Norm" tokenKey="fontWeightNormal" />
                <TextInput label="Weight Bold" tokenKey="fontWeightBold" />
             </div>
          </div>
        </section>

        {/* Effects */}
        <section>
          <h3 className="text-sm font-semibold mb-3 text-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" /> Effects
          </h3>
          <div className="space-y-3">
             <TextInput label="Shadow Sm" tokenKey="shadowSm" />
             <TextInput label="Shadow Md" tokenKey="shadowMd" />
          </div>
        </section>
      </div>
    </div>
  );
};