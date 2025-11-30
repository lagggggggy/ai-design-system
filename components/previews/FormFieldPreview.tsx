
import React from 'react';

export const FormFieldPreview: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      
      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Standard Field</h4>
        <ds-form-field>
           <label slot="label">Username</label>
           <ds-input>
             <input placeholder="user123" />
           </ds-input>
           <div slot="helper">This will be your public handle.</div>
        </ds-form-field>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>With Error</h4>
        <ds-form-field>
           <label slot="label">Password</label>
           <ds-input error>
             <input type="password" value="pass" />
           </ds-input>
           <div slot="error">Password must be at least 8 characters long.</div>
        </ds-form-field>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Wrapping Select</h4>
        <ds-form-field>
           <label slot="label">Region</label>
           <ds-select>
             <select>
               <option value="us">United States</option>
               <option value="eu">Europe</option>
               <option value="asia">Asia</option>
             </select>
           </ds-select>
           <div slot="helper">Select the region nearest to you.</div>
        </ds-form-field>
      </div>
      
      <style>{`
        /* 
           Fallback for form-field container structure.
           Ensures that slot children (labels, errors) are visible
           even when Web Component is not hydrated.
        */
        ds-form-field:not(:defined) {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
          font-family: var(--ds-typography-family-base);
          width: 100%;
        }

        ds-form-field:not(:defined) > [slot="label"] {
          font-size: 0.875rem; 
          font-weight: 500; 
          color: var(--ds-color-text); 
        }

        ds-form-field:not(:defined) > [slot="helper"] {
          font-size: 0.75rem; 
          color: var(--ds-color-textDim); 
        }

        ds-form-field:not(:defined) > [slot="error"] {
          font-size: 0.75rem; 
          color: var(--ds-color-error); 
        }

        /* 
           Include Nested Component Fallbacks 
           (Input & Select styles copied from their previews)
        */
        
        /* Input Styling */
        ds-input:not(:defined) {
          display: block; width: 100%;
        }
        ds-input:not(:defined) input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--ds-color-border);
          border-radius: var(--ds-geometry-radius-md);
          background: var(--ds-color-surface);
          color: var(--ds-color-text);
          font-family: inherit;
          outline: none;
          font-size: 0.875rem;
        }
        ds-input:not(:defined)[error] input {
           border-color: var(--ds-color-error);
        }

        /* Select Styling */
        ds-select:not(:defined) { 
          display: block; width: 100%; position: relative; 
        }
        ds-select:not(:defined) select {
          width: 100%;
          padding: 0.5rem 2.5rem 0.5rem 0.75rem;
          border: 1px solid var(--ds-color-border);
          border-radius: var(--ds-geometry-radius-md);
          background: var(--ds-color-surface);
          color: var(--ds-color-text);
          font-family: inherit;
          appearance: none;
          cursor: pointer;
          font-size: 0.875rem;
        }
        ds-select:not(:defined)::after {
          content: "";
          position: absolute;
          right: 1rem;
          top: 0.75rem;
          width: 0.6em;
          height: 0.6em;
          border-right: 2px solid var(--ds-color-textDim);
          border-bottom: 2px solid var(--ds-color-textDim);
          transform: rotate(45deg);
          pointer-events: none;
        }
      `}</style>

    </div>
  );
};
