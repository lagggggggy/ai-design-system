import React from 'react';

export const InputPreview: React.FC = () => {
  const commonInputStyle: React.CSSProperties = {
    width: '100%',
    padding: 'calc(var(--ds-geometry-spacing-base) * 2.5) calc(var(--ds-geometry-spacing-base) * 3)',
    border: '1px solid var(--ds-color-border)',
    borderRadius: 'var(--ds-geometry-radius-md)',
    background: 'var(--ds-color-surface)',
    color: 'var(--ds-color-text)',
    fontFamily: 'var(--ds-typography-family-base)',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 'var(--ds-typography-size-sm)',
    fontWeight: 'var(--ds-typography-weight-bold)',
    color: 'var(--ds-color-text)',
    fontFamily: 'var(--ds-typography-family-base)',
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      {/* Standard */}
      <div className="flex flex-col gap-2 w-full">
        <label style={labelStyle}>Standard Input</label>
        <input 
          type="text"
          placeholder="Type something..."
          style={commonInputStyle}
          className="focus:ring-2 focus:ring-[var(--ds-color-primary)] focus:border-[var(--ds-color-primary)]"
        />
      </div>

      {/* Error */}
      <div className="flex flex-col gap-2 w-full">
        <label style={{ ...labelStyle, color: 'var(--ds-color-error)' }}>Error State</label>
        <input 
          type="text"
          defaultValue="Invalid Value"
          style={{ ...commonInputStyle, border: '1px solid var(--ds-color-error)' }}
          className="focus:ring-2 focus:ring-[var(--ds-color-error)]"
        />
      </div>

       {/* Disabled */}
       <div className="flex flex-col gap-2 w-full opacity-60 pointer-events-none">
        <label style={labelStyle}>Disabled State</label>
        <input 
          type="text"
          disabled
          placeholder="Cannot type here"
          style={commonInputStyle}
        />
      </div>
    </div>
  );
};