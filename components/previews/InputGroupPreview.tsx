
import React from 'react';

export const InputGroupPreview: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 w-full max-w-md">
       
       <div className="flex flex-col gap-2">
         <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Search Action</h4>
         <ds-input-group>
           <ds-input placeholder="Search query..."></ds-input>
           <ds-button variant="primary">Search</ds-button>
         </ds-input-group>
       </div>

       <div className="flex flex-col gap-2">
         <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Copy Link</h4>
         <ds-input-group>
           <div style={{ backgroundColor: 'var(--ds-color-surfaceHighlight)', padding: '0 0.75rem', display: 'flex', alignItems: 'center', border: '1px solid var(--ds-color-border)', borderRight: 'none', borderRadius: 'var(--ds-geometry-radius-md) 0 0 var(--ds-geometry-radius-md)', color: 'var(--ds-color-textDim)', fontSize: '0.875rem' }}>
             https://
           </div>
           <ds-input placeholder="example.com/share" style={{ width: '100%' }}></ds-input>
           <ds-button variant="secondary">Copy</ds-button>
         </ds-input-group>
       </div>

       <div className="flex flex-col gap-2">
         <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Currency Amount</h4>
         <ds-input-group>
           <span className="addon">$</span>
           <ds-input placeholder="0.00"></ds-input>
           <span className="addon">USD</span>
         </ds-input-group>
       </div>

       <style>{`
         ds-input-group:not(:defined) { display: flex; width: 100%; align-items: stretch; }
         
         /* Fallback styling for spans/addons in preview */
         ds-input-group:not(:defined) .addon { 
           padding: 0 1rem; 
           background: var(--ds-color-surfaceHighlight); 
           border: 1px solid var(--ds-color-border); 
           display: flex; 
           align-items: center; 
           color: var(--ds-color-text);
           font-family: var(--ds-typography-family-base);
         }
         
         ds-input-group:not(:defined) > *:first-child { border-top-right-radius: 0 !important; border-bottom-right-radius: 0 !important; }
         ds-input-group:not(:defined) > *:last-child { border-top-left-radius: 0 !important; border-bottom-left-radius: 0 !important; }
         ds-input-group:not(:defined) > *:not(:first-child):not(:last-child) { border-radius: 0 !important; }
         
         /* Handle border overlapping */
         ds-input-group:not(:defined) > *:not(:first-child) { margin-left: -1px; }
         ds-input-group:not(:defined) > *:focus-within { z-index: 2; position: relative; }
       `}</style>
    </div>
  );
};
