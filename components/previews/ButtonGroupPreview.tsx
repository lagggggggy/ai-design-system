
import React from 'react';

export const ButtonGroupPreview: React.FC = () => {
  return (
    <div className="flex flex-col gap-12 w-full items-center">
       
       <div className="flex flex-col gap-4 items-center">
         <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Basic Group (DS Buttons)</h4>
         <ds-button-group>
           <ds-button variant="outline">Year</ds-button>
           <ds-button variant="outline">Month</ds-button>
           <ds-button variant="outline">Day</ds-button>
         </ds-button-group>
       </div>

       <div className="flex flex-col gap-4 items-center">
         <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Native Buttons</h4>
         <ds-button-group>
           <button className="native-btn">Left</button>
           <button className="native-btn">Middle</button>
           <button className="native-btn">Right</button>
         </ds-button-group>
       </div>

       <div className="flex flex-col gap-4 items-center">
         <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Toolbar (Icons)</h4>
         <ds-button-group>
            <ds-button variant="outline" size="sm">
               <ds-icon name="menu" size="sm"></ds-icon>
            </ds-button>
            <ds-button variant="outline" size="sm">
               <ds-icon name="home" size="sm"></ds-icon>
            </ds-button>
            <ds-button variant="outline" size="sm">
               <ds-icon name="settings" size="sm"></ds-icon>
            </ds-button>
         </ds-button-group>
       </div>

       <div className="flex flex-col gap-4 items-center">
         <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Vertical</h4>
         <ds-button-group orientation="vertical">
           <ds-button variant="secondary">Top</ds-button>
           <ds-button variant="secondary">Middle</ds-button>
           <ds-button variant="secondary">Bottom</ds-button>
         </ds-button-group>
       </div>

       <style>{`
         /* Fallback for ds-button when not defined */
         ds-button:not(:defined) {
           display: inline-flex;
           vertical-align: middle;
           border-radius: var(--ds-geometry-radius-md);
         }
         ds-button:not(:defined) button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            border: 1px solid transparent;
            font-family: var(--ds-typography-family-base);
            font-weight: 600;
            font-size: 0.875rem;
            cursor: pointer;
            width: 100%; height: 100%;
            border-radius: inherit; /* Emulate new template behavior */
         }
         
         /* Native button styles for preview */
         .native-btn {
            padding: 0.5rem 1rem;
            border: 1px solid var(--ds-color-border);
            background: white;
            font-family: var(--ds-typography-family-base);
            font-size: 0.875rem;
            cursor: pointer;
         }

         /* Variants */
         ds-button:not(:defined)[variant="outline"] button {
           background: transparent; border-color: var(--ds-color-border); color: var(--ds-color-text);
         }
         ds-button:not(:defined)[variant="secondary"] button {
           background: var(--ds-color-secondary); color: var(--ds-color-textInverse);
         }
         ds-button:not(:defined)[size="sm"] button {
           padding: 0.25rem 0.75rem; font-size: 0.75rem;
         }

         /* Button Group Fallback */
         ds-button-group:not(:defined) { display: inline-flex; vertical-align: middle; }
         ds-button-group:not(:defined)[orientation="vertical"] { flex-direction: column; }
         
         /* Reset all children radii */
         ds-button-group:not(:defined) > * { border-radius: 0 !important; }
         
         /* Horizontal Merging */
         ds-button-group:not(:defined):not([orientation="vertical"]) > *:not(:first-child) { margin-left: -1px; }
         
         ds-button-group:not(:defined):not([orientation="vertical"]) > *:first-child { 
           border-top-left-radius: var(--ds-geometry-radius-md) !important; 
           border-bottom-left-radius: var(--ds-geometry-radius-md) !important; 
         }
         ds-button-group:not(:defined):not([orientation="vertical"]) > *:last-child { 
           border-top-right-radius: var(--ds-geometry-radius-md) !important; 
           border-bottom-right-radius: var(--ds-geometry-radius-md) !important; 
         }

         /* Vertical Merging */
         ds-button-group:not(:defined)[orientation="vertical"] > *:not(:first-child) { margin-top: -1px; }

         ds-button-group:not(:defined)[orientation="vertical"] > *:first-child { 
            border-top-left-radius: var(--ds-geometry-radius-md) !important; 
            border-top-right-radius: var(--ds-geometry-radius-md) !important; 
         }
         ds-button-group:not(:defined)[orientation="vertical"] > *:last-child { 
            border-bottom-left-radius: var(--ds-geometry-radius-md) !important; 
            border-bottom-right-radius: var(--ds-geometry-radius-md) !important; 
         }
       `}</style>
    </div>
  );
};
