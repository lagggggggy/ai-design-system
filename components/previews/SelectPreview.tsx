
import React from 'react';

export const SelectPreview: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      
      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Default</h4>
        <ds-select>
          <select>
            <option value="1">Design System</option>
            <option value="2">Component Library</option>
            <option value="3">Tokens</option>
          </select>
        </ds-select>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Placeholder / Empty</h4>
        <ds-select>
          <select defaultValue="">
            <option value="" disabled>Select a project...</option>
            <option value="1">Project A</option>
            <option value="2">Project B</option>
          </select>
        </ds-select>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Disabled</h4>
        <ds-select>
           <select disabled>
            <option>Option 1</option>
            <option>Option 2</option>
           </select>
        </ds-select>
      </div>
      
      <style>{`
        /* 
           Fallback styles for the preview when the Web Component 
           hasn't hydrated yet (Shadow DOM not active).
        */
        ds-select:not(:defined) { 
          display: block; 
          width: 100%; 
          position: relative; 
          font-family: var(--ds-typography-family-base);
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

        /* Mock the custom arrow since Shadow DOM slot isn't active */
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
