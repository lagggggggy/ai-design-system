
import React from 'react';

export const ButtonPreview: React.FC = () => {
  return (
    <div className="flex flex-col gap-12 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {(['small', 'medium', 'large'] as const).map(size => (
          <div key={size} className="flex flex-col gap-4 items-center">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold" style={{ color: 'var(--ds-color-text)' }}>
              {size}
            </span>
            {(['primary', 'secondary', 'outline', 'ghost'] as const).map(variant => {
              const sizeProp = size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md';
              return (
                <ds-button 
                  key={variant}
                  variant={variant}
                  size={sizeProp}
                >
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </ds-button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 items-center border-t pt-8" style={{ borderColor: 'var(--ds-color-border)' }}>
         <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>With Icon</h4>
         <div className="flex gap-4 items-center">
            <ds-button variant="primary" icon="check">Save</ds-button>
            <ds-button variant="secondary" icon="search">Search</ds-button>
            <ds-button variant="outline" icon="settings">Settings</ds-button>
         </div>
      </div>

      <style>{`
        /* Fallback for ds-button when not defined (simulate shadow DOM styles) */
        ds-button:not(:defined) {
           display: inline-block;
           vertical-align: middle;
           border-radius: var(--ds-geometry-radius-md);
        }
        
        /* 
           Since ds-button puts everything in shadow DOM, for the fallback preview
           we can't easily put the icon inside unless we use children in React,
           but the new API uses a prop. 
           
           For correct visual preview of props before hydration, we would need JS simulation.
           However, this style block ensures that IF the component hydrates, it looks good,
           and if not, it at least renders the text content.
        */
        
        ds-button:not(:defined) {
           font-family: var(--ds-typography-family-base);
           font-weight: 600;
           cursor: pointer;
           transition: all 0.2s;
           display: inline-flex;
           align-items: center;
           justify-content: center;
           gap: 0.5rem;
           border: 1px solid transparent;
        }

        /* Variant Styles for Fallback */
        ds-button:not(:defined)[variant="primary"] { background: var(--ds-color-primary); color: var(--ds-color-textInverse); }
        ds-button:not(:defined)[variant="secondary"] { background: var(--ds-color-secondary); color: var(--ds-color-textInverse); }
        ds-button:not(:defined)[variant="outline"] { background: transparent; border-color: var(--ds-color-border); color: var(--ds-color-text); }
        ds-button:not(:defined)[variant="ghost"] { background: transparent; color: var(--ds-color-text); }

        /* Size Styles for Fallback */
        ds-button:not(:defined)[size="sm"] { font-size: 0.875rem; padding: 0.25rem 0.75rem; }
        ds-button:not(:defined)[size="md"] { font-size: 1rem; padding: 0.5rem 1rem; }
        ds-button:not(:defined)[size="lg"] { font-size: 1.125rem; padding: 0.75rem 1.5rem; }
      `}</style>
    </div>
  );
};
