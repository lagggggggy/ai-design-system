import React from 'react';
import { ComponentType, DesignTokens } from '../types';

interface Props {
  component: ComponentType;
  tokens: DesignTokens;
  isDark: boolean;
}

export const ComponentPreview: React.FC<Props> = ({ component, tokens, isDark }) => {
  
  const effectiveTokens = isDark ? {
    ...tokens,
    background: '#0f172a',
    surface: '#1e293b', 
    text: '#f8fafc',
    secondary: '#334155',
    secondaryHover: '#475569',
    border: '#334155',
    shadowSm: '0 1px 2px 0 rgb(255 255 255 / 0.05)',
    shadowMd: '0 4px 6px -1px rgb(0 0 0 / 0.3)',
  } : tokens;

  const style = {
    '--ds-primary': effectiveTokens.primary,
    '--ds-primaryHover': effectiveTokens.primaryHover,
    '--ds-secondary': effectiveTokens.secondary,
    '--ds-secondaryHover': effectiveTokens.secondaryHover,
    '--ds-background': effectiveTokens.background,
    '--ds-surface': effectiveTokens.surface,
    '--ds-text': effectiveTokens.text,
    '--ds-textInverse': effectiveTokens.textInverse,
    '--ds-border': effectiveTokens.border,
    
    '--ds-radius-sm': effectiveTokens.borderRadiusSmall,
    '--ds-radius-md': effectiveTokens.borderRadiusMedium,
    '--ds-radius-lg': effectiveTokens.borderRadiusLarge,
    '--ds-border-width': effectiveTokens.borderWidth,
    '--ds-space': effectiveTokens.spacingUnit,
    
    '--ds-font': effectiveTokens.fontFamily,
    '--ds-text-sm': effectiveTokens.fontSizeSm,
    '--ds-text-md': effectiveTokens.fontSizeMd,
    '--ds-text-lg': effectiveTokens.fontSizeLg,
    '--ds-font-normal': effectiveTokens.fontWeightNormal,
    '--ds-font-bold': effectiveTokens.fontWeightBold,

    '--ds-shadow-sm': effectiveTokens.shadowSm,
    '--ds-shadow-md': effectiveTokens.shadowMd,
  } as React.CSSProperties;

  const containerClass = `flex-1 flex flex-col items-center justify-center p-12 transition-colors duration-300 overflow-y-auto ${
    isDark ? 'bg-slate-900' : 'bg-slate-100'
  }`;

  const previewCardClass = `p-8 rounded-xl shadow-lg border transition-all duration-300 w-full max-w-2xl flex flex-col items-center gap-8`;
  const previewCardStyle = {
    backgroundColor: 'var(--ds-surface)', 
    borderColor: 'var(--ds-border)',
  };

  return (
    <div className={containerClass} style={style}>
      <div style={previewCardStyle} className={previewCardClass}>
        <h3 style={{ color: 'var(--ds-text)', fontFamily: 'var(--ds-font)' }} className="text-xl font-bold mb-4">
          {component.charAt(0).toUpperCase() + component.slice(1)} Preview
        </h3>

        {/* BUTTON PREVIEW: MATRIX */}
        {component === 'button' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {(['small', 'medium', 'large'] as const).map(size => (
              <div key={size} className="flex flex-col gap-4 items-center">
                <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold" style={{ color: 'var(--ds-text)' }}>
                  {size}
                </span>
                {(['primary', 'secondary', 'outline', 'ghost', 'link'] as const).map(variant => {
                  
                  // Simulation of Generated Styles for Preview
                  const baseStyle = {
                    fontFamily: 'var(--ds-font)',
                    fontWeight: 'var(--ds-font-bold)',
                    borderRadius: 'var(--ds-radius-md)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: 'var(--ds-border-width) solid transparent',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  };

                  let variantStyle = {};
                  if (variant === 'primary') {
                    variantStyle = {
                      backgroundColor: 'var(--ds-primary)',
                      color: 'var(--ds-textInverse)',
                    };
                  } else if (variant === 'secondary') {
                    variantStyle = {
                      backgroundColor: 'var(--ds-secondary)',
                      color: 'var(--ds-textInverse)',
                    };
                  } else if (variant === 'outline') {
                    variantStyle = {
                      backgroundColor: 'transparent',
                      borderColor: 'var(--ds-border)',
                      color: 'var(--ds-text)',
                    };
                  } else if (variant === 'ghost') {
                    variantStyle = {
                      backgroundColor: 'transparent',
                      color: 'var(--ds-text)',
                    };
                  } else if (variant === 'link') {
                    variantStyle = {
                      backgroundColor: 'transparent',
                      color: 'var(--ds-primary)',
                      textDecoration: 'underline',
                    };
                  }

                  let sizeStyle = {};
                  if (size === 'small') {
                    sizeStyle = {
                      fontSize: 'var(--ds-text-sm)',
                      padding: 'calc(var(--ds-space) * 1.5) calc(var(--ds-space) * 3)',
                    };
                  } else if (size === 'medium') {
                    sizeStyle = {
                      fontSize: 'var(--ds-text-md)',
                      padding: 'calc(var(--ds-space) * 2.5) calc(var(--ds-space) * 4)',
                    };
                  } else if (size === 'large') {
                    sizeStyle = {
                      fontSize: 'var(--ds-text-lg)',
                      padding: 'calc(var(--ds-space) * 3.5) calc(var(--ds-space) * 6)',
                    };
                  }

                  return (
                    <button 
                      key={variant}
                      style={{ ...baseStyle, ...variantStyle, ...sizeStyle }}
                      className="hover:opacity-90 active:scale-95 focus:ring-2 ring-offset-2 ring-blue-400"
                    >
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {component === 'input' && (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label style={{ fontSize: 'var(--ds-text-sm)', fontWeight: 'var(--ds-font-bold)', color: 'var(--ds-text)', fontFamily: 'var(--ds-font)' }}>
                Email Address
              </label>
              <input 
                type="text"
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: 'calc(var(--ds-space) * 2.5) calc(var(--ds-space) * 3)',
                  border: '1px solid var(--ds-border)',
                  borderRadius: 'var(--ds-radius-md)',
                  background: 'var(--ds-surface)',
                  color: 'var(--ds-text)',
                  fontFamily: 'var(--ds-font)',
                  outline: 'none',
                }}
                className="focus:ring-2 focus:ring-[var(--ds-primary)] focus:border-[var(--ds-primary)]"
              />
            </div>
          </div>
        )}

        {component === 'card' && (
           <div style={{
            display: 'block',
            background: 'var(--ds-surface)',
            borderRadius: 'var(--ds-radius-lg)',
            border: '1px solid var(--ds-border)',
            fontFamily: 'var(--ds-font)',
            color: 'var(--ds-text)',
            overflow: 'hidden',
            boxShadow: 'var(--ds-shadow-md)',
            width: '100%',
          }}>
            <div style={{
              padding: 'calc(var(--ds-space) * 4)',
              borderBottom: '1px solid var(--ds-border)',
              fontWeight: 600,
              fontSize: 'var(--ds-text-lg)'
            }}>
              Production Ready Card
            </div>
            <div style={{ padding: 'calc(var(--ds-space) * 4)' }}>
              <p style={{ opacity: 0.8 }}>This uses the new spacing, radius, and shadow tokens.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};