
import React from 'react';

export const InputPreview: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      {/* Standard */}
      <div className="flex flex-col gap-2 w-full">
        <label style={{ fontSize: 'var(--ds-typography-size-sm)', fontWeight: 'bold', color: 'var(--ds-color-text)', fontFamily: 'var(--ds-typography-family-base)' }}>
          Standard Input
        </label>
        <ds-input>
          <input type="text" placeholder="Type something..." />
        </ds-input>
      </div>

      {/* Error */}
      <div className="flex flex-col gap-2 w-full">
        <label style={{ fontSize: 'var(--ds-typography-size-sm)', fontWeight: 'bold', color: 'var(--ds-color-error)', fontFamily: 'var(--ds-typography-family-base)' }}>
          Error State
        </label>
        <ds-input error>
          <input type="text" defaultValue="Invalid Value" />
        </ds-input>
      </div>

       {/* Disabled */}
       <div className="flex flex-col gap-2 w-full">
        <label style={{ fontSize: 'var(--ds-typography-size-sm)', fontWeight: 'bold', color: 'var(--ds-color-text)', fontFamily: 'var(--ds-typography-family-base)', opacity: 0.6 }}>
          Disabled State
        </label>
        <ds-input disabled>
          <input type="text" disabled placeholder="Cannot type here" />
        </ds-input>
      </div>

      <style>{`
        ds-input:not(:defined) {
          display: block;
          width: 100%;
          font-family: var(--ds-typography-family-base);
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
        
        ds-input:not(:defined)[disabled] {
           opacity: 0.6;
           pointer-events: none;
        }
      `}</style>
    </div>
  );
};
