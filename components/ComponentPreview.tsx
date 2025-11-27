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
    '--ds-error': effectiveTokens.error,
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

  const previewCardClass = `p-8 rounded-xl shadow-lg border transition-all duration-300 w-full max-w-3xl flex flex-col items-center gap-8`;
  const previewCardStyle = {
    backgroundColor: 'var(--ds-surface)', 
    borderColor: 'var(--ds-border)',
  };

  return (
    <div className={containerClass} style={style}>
      <div style={previewCardStyle} className={previewCardClass}>
        <div className="flex justify-between w-full items-center mb-4 border-b pb-4" style={{borderColor: 'var(--ds-border)'}}>
           <h3 style={{ color: 'var(--ds-text)', fontFamily: 'var(--ds-font)' }} className="text-xl font-bold">
            {component.charAt(0).toUpperCase() + component.slice(1).replace('-', ' ')} Variants
          </h3>
          <span className="text-xs uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-text)' }}>
            System Preview
          </span>
        </div>

        {/* BUTTON PREVIEW */}
        {component === 'button' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {(['small', 'medium', 'large'] as const).map(size => (
              <div key={size} className="flex flex-col gap-4 items-center">
                <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold" style={{ color: 'var(--ds-text)' }}>
                  {size}
                </span>
                {(['primary', 'secondary', 'outline', 'ghost', 'link'] as const).map(variant => {
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
                  if (variant === 'primary') variantStyle = { backgroundColor: 'var(--ds-primary)', color: 'var(--ds-textInverse)' };
                  else if (variant === 'secondary') variantStyle = { backgroundColor: 'var(--ds-secondary)', color: 'var(--ds-textInverse)' };
                  else if (variant === 'outline') variantStyle = { backgroundColor: 'transparent', borderColor: 'var(--ds-border)', color: 'var(--ds-text)' };
                  else if (variant === 'ghost') variantStyle = { backgroundColor: 'transparent', color: 'var(--ds-text)' };
                  else if (variant === 'link') variantStyle = { backgroundColor: 'transparent', color: 'var(--ds-primary)', textDecoration: 'underline' };

                  let sizeStyle = {};
                  if (size === 'small') sizeStyle = { fontSize: 'var(--ds-text-sm)', padding: 'calc(var(--ds-space) * 1.5) calc(var(--ds-space) * 3)' };
                  else if (size === 'medium') sizeStyle = { fontSize: 'var(--ds-text-md)', padding: 'calc(var(--ds-space) * 2.5) calc(var(--ds-space) * 4)' };
                  else if (size === 'large') sizeStyle = { fontSize: 'var(--ds-text-lg)', padding: 'calc(var(--ds-space) * 3.5) calc(var(--ds-space) * 6)' };

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

        {/* INPUT PREVIEW */}
        {component === 'input' && (
          <div className="flex flex-col gap-8 w-full max-w-md">
            {/* Standard */}
            <div className="flex flex-col gap-2 w-full">
              <label style={{ fontSize: 'var(--ds-text-sm)', fontWeight: 'var(--ds-font-bold)', color: 'var(--ds-text)', fontFamily: 'var(--ds-font)' }}>
                Standard Input
              </label>
              <input 
                type="text"
                placeholder="Type something..."
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

            {/* Error */}
            <div className="flex flex-col gap-2 w-full">
              <label style={{ fontSize: 'var(--ds-text-sm)', fontWeight: 'var(--ds-font-bold)', color: 'var(--ds-error)', fontFamily: 'var(--ds-font)' }}>
                Error State
              </label>
              <input 
                type="text"
                defaultValue="Invalid Value"
                style={{
                  width: '100%',
                  padding: 'calc(var(--ds-space) * 2.5) calc(var(--ds-space) * 3)',
                  border: '1px solid var(--ds-error)',
                  borderRadius: 'var(--ds-radius-md)',
                  background: 'var(--ds-surface)',
                  color: 'var(--ds-text)',
                  fontFamily: 'var(--ds-font)',
                  outline: 'none',
                }}
                className="focus:ring-2 focus:ring-[var(--ds-error)]"
              />
            </div>

             {/* Disabled */}
             <div className="flex flex-col gap-2 w-full opacity-60 pointer-events-none">
              <label style={{ fontSize: 'var(--ds-text-sm)', fontWeight: 'var(--ds-font-bold)', color: 'var(--ds-text)', fontFamily: 'var(--ds-font)' }}>
                Disabled State
              </label>
              <input 
                type="text"
                disabled
                placeholder="Cannot type here"
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
              />
            </div>
          </div>
        )}

        {/* CHECKBOX PREVIEW */}
        {component === 'checkbox' && (
           <div className="flex flex-col gap-6 items-start">
             {/* Checked */}
             <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'calc(var(--ds-space) * 2)', cursor: 'pointer', fontFamily: 'var(--ds-font)' }}>
                <input type="checkbox" readOnly defaultChecked onClick={(e) => e.preventDefault()} style={{ appearance: 'auto', accentColor: 'var(--ds-primary)', width: '1.25rem', height: '1.25rem' }} />
                <span style={{ color: 'var(--ds-text)', fontSize: 'var(--ds-text-md)' }}>Checked Option</span>
             </label>

             {/* Unchecked */}
             <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'calc(var(--ds-space) * 2)', cursor: 'pointer', fontFamily: 'var(--ds-font)' }}>
                <input type="checkbox" readOnly onClick={(e) => e.preventDefault()} style={{ appearance: 'auto', accentColor: 'var(--ds-primary)', width: '1.25rem', height: '1.25rem' }} />
                <span style={{ color: 'var(--ds-text)', fontSize: 'var(--ds-text-md)' }}>Unchecked Option</span>
             </label>

             {/* Indeterminate (Simulated for visual preview) */}
             <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'calc(var(--ds-space) * 2)', cursor: 'pointer', fontFamily: 'var(--ds-font)' }}>
                <input 
                  type="checkbox" 
                  ref={el => { if(el) el.indeterminate = true; }}
                  readOnly onClick={(e) => e.preventDefault()}
                  style={{ appearance: 'auto', accentColor: 'var(--ds-primary)', width: '1.25rem', height: '1.25rem' }} 
                />
                <span style={{ color: 'var(--ds-text)', fontSize: 'var(--ds-text-md)' }}>Indeterminate Option</span>
             </label>

              {/* Disabled */}
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'calc(var(--ds-space) * 2)', cursor: 'not-allowed', fontFamily: 'var(--ds-font)', opacity: 0.5 }}>
                <input type="checkbox" disabled defaultChecked style={{ appearance: 'auto', accentColor: 'var(--ds-primary)', width: '1.25rem', height: '1.25rem' }} />
                <span style={{ color: 'var(--ds-text)', fontSize: 'var(--ds-text-md)' }}>Disabled Option</span>
             </label>
           </div>
        )}

        {/* CHECKBOX GROUP PREVIEW */}
        {component === 'checkbox-group' && (
          <div className="flex flex-col gap-8 w-full items-start max-w-lg">
            
            {/* Vertical Group */}
            <fieldset style={{ border: 'none', padding: 0, margin: 0, fontFamily: 'var(--ds-font)' }}>
              <legend style={{ fontSize: 'var(--ds-text-sm)', fontWeight: 'var(--ds-font-bold)', color: 'var(--ds-text)', marginBottom: 'var(--ds-space)' }}>
                Select Your Interests (Vertical)
              </legend>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--ds-space) * 2)' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'calc(var(--ds-space) * 2)', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ appearance: 'auto', accentColor: 'var(--ds-primary)', width: '1.25rem', height: '1.25rem' }} />
                  <span style={{ color: 'var(--ds-text)', fontSize: 'var(--ds-text-md)' }}>Coding</span>
                </label>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'calc(var(--ds-space) * 2)', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ appearance: 'auto', accentColor: 'var(--ds-primary)', width: '1.25rem', height: '1.25rem' }} />
                  <span style={{ color: 'var(--ds-text)', fontSize: 'var(--ds-text-md)' }}>Design</span>
                </label>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'calc(var(--ds-space) * 2)', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ appearance: 'auto', accentColor: 'var(--ds-primary)', width: '1.25rem', height: '1.25rem' }} />
                  <span style={{ color: 'var(--ds-text)', fontSize: 'var(--ds-text-md)' }}>Marketing</span>
                </label>
              </div>
            </fieldset>

            {/* Horizontal Group */}
            <fieldset style={{ border: 'none', padding: 0, margin: 0, fontFamily: 'var(--ds-font)' }}>
              <legend style={{ fontSize: 'var(--ds-text-sm)', fontWeight: 'var(--ds-font-bold)', color: 'var(--ds-text)', marginBottom: 'var(--ds-space)' }}>
                Notification Settings (Horizontal)
              </legend>
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 'calc(var(--ds-space) * 2)' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'calc(var(--ds-space) * 2)', cursor: 'pointer' }}>
                   <input type="checkbox" style={{ appearance: 'auto', accentColor: 'var(--ds-primary)', width: '1.25rem', height: '1.25rem' }} />
                   <span style={{ color: 'var(--ds-text)', fontSize: 'var(--ds-text-md)' }}>Email</span>
                </label>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'calc(var(--ds-space) * 2)', cursor: 'pointer' }}>
                   <input type="checkbox" style={{ appearance: 'auto', accentColor: 'var(--ds-primary)', width: '1.25rem', height: '1.25rem' }} />
                   <span style={{ color: 'var(--ds-text)', fontSize: 'var(--ds-text-md)' }}>SMS</span>
                </label>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'calc(var(--ds-space) * 2)', cursor: 'pointer' }}>
                   <input type="checkbox" style={{ appearance: 'auto', accentColor: 'var(--ds-primary)', width: '1.25rem', height: '1.25rem' }} />
                   <span style={{ color: 'var(--ds-text)', fontSize: 'var(--ds-text-md)' }}>Push</span>
                </label>
              </div>
            </fieldset>

             {/* Error State */}
             <fieldset style={{ border: 'none', padding: 0, margin: 0, fontFamily: 'var(--ds-font)' }}>
              <legend style={{ fontSize: 'var(--ds-text-sm)', fontWeight: 'var(--ds-font-bold)', color: 'var(--ds-text)', marginBottom: 'var(--ds-space)' }}>
                Required Selection (Error)
              </legend>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--ds-space) * 2)' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'calc(var(--ds-space) * 2)', cursor: 'pointer' }}>
                   <input type="checkbox" style={{ appearance: 'auto', accentColor: 'var(--ds-primary)', width: '1.25rem', height: '1.25rem' }} />
                   <span style={{ color: 'var(--ds-text)', fontSize: 'var(--ds-text-md)' }}>Terms of Service</span>
                </label>
              </div>
              <div style={{ marginTop: 'var(--ds-space)', fontSize: 'var(--ds-text-sm)', color: 'var(--ds-error)' }}>
                You must accept the terms to proceed.
              </div>
            </fieldset>
          </div>
        )}

        {/* CARD PREVIEW */}
        {component === 'card' && (
           <div className="flex flex-col gap-8 w-full">
            {/* Interactive Card */}
            <div 
              className="group"
              style={{
                display: 'block',
                background: 'var(--ds-surface)',
                borderRadius: 'var(--ds-radius-lg)',
                border: '1px solid var(--ds-border)',
                fontFamily: 'var(--ds-font)',
                color: 'var(--ds-text)',
                overflow: 'hidden',
                boxShadow: 'var(--ds-shadow-md)',
                width: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'var(--ds-shadow-md)';
              }}
            >
              <div style={{
                padding: 'calc(var(--ds-space) * 4)',
                borderBottom: '1px solid var(--ds-border)',
                fontWeight: 600,
                fontSize: 'var(--ds-text-lg)'
              }}>
                Interactive Card (Hover Me)
              </div>
              <div style={{ padding: 'calc(var(--ds-space) * 4)' }}>
                <p style={{ opacity: 0.8 }}>This card demonstrates the hover lift effect and shadow expansion defined in the generated code.</p>
              </div>
            </div>

            {/* Disabled Card */}
            <div 
              style={{
                display: 'block',
                background: 'var(--ds-surface)',
                borderRadius: 'var(--ds-radius-lg)',
                border: '1px solid var(--ds-border)',
                fontFamily: 'var(--ds-font)',
                color: 'var(--ds-text)',
                overflow: 'hidden',
                boxShadow: 'none',
                width: '100%',
                opacity: 0.6,
                filter: 'grayscale(0.8)',
                pointerEvents: 'none'
              }}
            >
              <div style={{
                padding: 'calc(var(--ds-space) * 4)',
                borderBottom: '1px solid var(--ds-border)',
                fontWeight: 600,
                fontSize: 'var(--ds-text-lg)'
              }}>
                Disabled Card
              </div>
              <div style={{ padding: 'calc(var(--ds-space) * 4)' }}>
                <p style={{ opacity: 0.8 }}>This card is visually disabled, non-interactive, and has reduced opacity.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};