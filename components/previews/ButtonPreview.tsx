import React from 'react';

export const ButtonPreview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
      {(['small', 'medium', 'large'] as const).map(size => (
        <div key={size} className="flex flex-col gap-4 items-center">
          <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold" style={{ color: 'var(--ds-color-text)' }}>
            {size}
          </span>
          {(['primary', 'secondary', 'outline', 'ghost', 'link'] as const).map(variant => {
            const baseStyle: React.CSSProperties = {
              fontFamily: 'var(--ds-typography-family-base)',
              fontWeight: 'var(--ds-typography-weight-bold)',
              borderRadius: 'var(--ds-geometry-radius-md)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: 'var(--ds-geometry-border-width) solid transparent',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            };
            let variantStyle: React.CSSProperties = {};
            if (variant === 'primary') variantStyle = { backgroundColor: 'var(--ds-color-primary)', color: 'var(--ds-color-textInverse)' };
            else if (variant === 'secondary') variantStyle = { backgroundColor: 'var(--ds-color-secondary)', color: 'var(--ds-color-textInverse)' };
            else if (variant === 'outline') variantStyle = { backgroundColor: 'transparent', borderColor: 'var(--ds-color-border)', color: 'var(--ds-color-text)' };
            else if (variant === 'ghost') variantStyle = { backgroundColor: 'transparent', color: 'var(--ds-color-text)' };
            else if (variant === 'link') variantStyle = { backgroundColor: 'transparent', color: 'var(--ds-color-primary)', textDecoration: 'underline' };

            let sizeStyle: React.CSSProperties = {};
            if (size === 'small') sizeStyle = { fontSize: 'var(--ds-typography-size-sm)', padding: 'calc(var(--ds-geometry-spacing-base) * 1.5) calc(var(--ds-geometry-spacing-base) * 3)' };
            else if (size === 'medium') sizeStyle = { fontSize: 'var(--ds-typography-size-md)', padding: 'calc(var(--ds-geometry-spacing-base) * 2.5) calc(var(--ds-geometry-spacing-base) * 4)' };
            else if (size === 'large') sizeStyle = { fontSize: 'var(--ds-typography-size-lg)', padding: 'calc(var(--ds-geometry-spacing-base) * 3.5) calc(var(--ds-geometry-spacing-base) * 6)' };

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
  );
};