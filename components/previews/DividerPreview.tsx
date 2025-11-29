import React from 'react';

export const DividerPreview: React.FC = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-md">
      
      {/* Horizontal */}
      <div className="flex flex-col gap-2 w-full">
         <div style={{ color: 'var(--ds-color-text)', fontSize: 'var(--ds-typography-size-sm)' }}>Content Above</div>
         <ds-divider orientation="horizontal"></ds-divider>
         <div style={{ color: 'var(--ds-color-text)', fontSize: 'var(--ds-typography-size-sm)' }}>Content Below</div>
      </div>

      {/* Vertical */}
      <div className="flex items-center justify-center h-16 w-full border p-4 rounded" style={{ borderColor: 'var(--ds-color-border)' }}>
         <span style={{ color: 'var(--ds-color-text)' }}>Left</span>
         <ds-divider orientation="vertical"></ds-divider>
         <span style={{ color: 'var(--ds-color-text)' }}>Right</span>
      </div>

      <style>{`
        ds-divider { display: block; background-color: var(--ds-color-border); }
        ds-divider[orientation="horizontal"] { height: 1px; width: 100%; margin: 0.5rem 0; }
        ds-divider[orientation="vertical"] { width: 1px; height: 100%; margin: 0 1rem; display: inline-block; }
      `}</style>
    </div>
  );
};