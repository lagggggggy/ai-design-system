import React from 'react';
import { ComponentType, DesignTokens } from '../types';
import { flattenTokensToCSS } from '../utils/tokenUtils';
import { ButtonPreview } from './previews/ButtonPreview';
import { InputPreview } from './previews/InputPreview';
import { CheckboxPreview } from './previews/CheckboxPreview';
import { CheckboxGroupPreview } from './previews/CheckboxGroupPreview';
import { RadioGroupPreview } from './previews/RadioGroupPreview';
import { CardPreview } from './previews/CardPreview';
import { BadgePreview } from './previews/BadgePreview';
import { SwitchPreview } from './previews/SwitchPreview';
import { AlertPreview } from './previews/AlertPreview';
import { AvatarPreview } from './previews/AvatarPreview';
import { SpinnerPreview } from './previews/SpinnerPreview';
import { DividerPreview } from './previews/DividerPreview';
import { TypographyPreview } from './previews/TypographyPreview';
import { LinkPreview } from './previews/LinkPreview';

interface Props {
  component: ComponentType;
  tokens: DesignTokens;
  isDark: boolean;
}

const PREVIEW_REGISTRY: Record<ComponentType, React.FC> = {
  button: ButtonPreview,
  input: InputPreview,
  checkbox: CheckboxPreview,
  'checkbox-group': CheckboxGroupPreview,
  radio: RadioGroupPreview, // Reuse RadioGroup preview for atomic radio visual check
  'radio-group': RadioGroupPreview,
  card: CardPreview,
  badge: BadgePreview,
  switch: SwitchPreview,
  alert: AlertPreview,
  avatar: AvatarPreview,
  spinner: SpinnerPreview,
  divider: DividerPreview,
  text: TypographyPreview,
  heading: TypographyPreview, // Use same preview for Typography overview
  link: LinkPreview,
};

export const ComponentPreview: React.FC<Props> = ({ component, tokens, isDark }) => {
  
  // Create a deep copy for Dark Mode simulation
  const effectiveTokens = JSON.parse(JSON.stringify(tokens));

  if (isDark) {
     // Adaptive Dark Mode: Attempt to use the 'neutral' scale from the generated theme if available.
     // Fallback to standard slate-dark if the generated tokens are incomplete.
     
     const neutral950 = tokens.color.neutral?.[950]?.$value || '#020617';
     const neutral900 = tokens.color.neutral?.[900]?.$value || '#0f172a';
     const neutral800 = tokens.color.neutral?.[800]?.$value || '#1e293b';
     const neutral700 = tokens.color.neutral?.[700]?.$value || '#334155';
     const neutral600 = tokens.color.neutral?.[600]?.$value || '#475569';
     const neutral200 = tokens.color.neutral?.[200]?.$value || '#e2e8f0';
     const neutral50 = tokens.color.neutral?.[50]?.$value || '#f8fafc';

     effectiveTokens.color.background.$value = neutral950;
     effectiveTokens.color.surface.$value = neutral900;
     effectiveTokens.color.surfaceHighlight.$value = neutral800;
     effectiveTokens.color.text.$value = neutral50;
     effectiveTokens.color.textDim.$value = neutral600; // or use alias if available
     effectiveTokens.color.textInverse.$value = neutral950; // Inverse of dark is light
     
     effectiveTokens.color.border.$value = neutral800;
     
     // Update shadows for dark mode (using white/light opacity if needed, or keeping standard)
     // Usually shadows in dark mode are subtler or require lighter borders to be visible.
     effectiveTokens.effect.shadow.sm.$value = '0 1px 2px 0 rgb(0 0 0 / 0.5)';
     effectiveTokens.effect.shadow.md.$value = '0 4px 6px -1px rgb(0 0 0 / 0.5)';

     // Note: We do NOT override Primary/Secondary scales. 
     // A good design system usually keeps the same hue for primary, maybe shifting lightness slightly.
     // For this generator, we assume the base primary color works on dark (e.g., Blue-500 on Slate-900).
  }

  // Flatten the W3C structure into CSS Variables
  const style = flattenTokensToCSS(effectiveTokens);

  const containerClass = `flex-1 flex flex-col items-center justify-center p-12 transition-colors duration-300 overflow-y-auto ${
    isDark ? 'bg-slate-950' : 'bg-slate-100'
  }`;

  const previewCardClass = `p-8 rounded-xl shadow-lg border transition-all duration-300 w-full max-w-3xl flex flex-col items-center gap-8`;
  const previewCardStyle = {
    backgroundColor: 'var(--ds-color-surface)', 
    borderColor: 'var(--ds-color-border)',
  };

  const PreviewComponent = PREVIEW_REGISTRY[component];

  return (
    <div className={containerClass} style={style}>
      <div style={previewCardStyle} className={previewCardClass}>
        <div className="flex justify-between w-full items-center mb-4 border-b pb-4" style={{borderColor: 'var(--ds-color-border)'}}>
           <h3 style={{ color: 'var(--ds-color-text)', fontFamily: 'var(--ds-typography-family-base)' }} className="text-xl font-bold">
            {component.charAt(0).toUpperCase() + component.slice(1).replace('-', ' ')} Variants
          </h3>
          <span className="text-xs uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>
            System Preview
          </span>
        </div>

        {PreviewComponent ? <PreviewComponent /> : <div className="text-red-500">Preview not found for {component}</div>}
      </div>
    </div>
  );
};