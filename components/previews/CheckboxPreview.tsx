import React from 'react';

export const CheckboxPreview: React.FC = () => {
  const labelStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'calc(var(--ds-geometry-spacing-base) * 2)',
    cursor: 'pointer',
    fontFamily: 'var(--ds-typography-family-base)'
  };

  const inputStyle: React.CSSProperties = {
    appearance: 'auto',
    accentColor: 'var(--ds-color-primary)',
    width: '1.25rem',
    height: '1.25rem'
  };

  const spanStyle: React.CSSProperties = {
    color: 'var(--ds-color-text)',
    fontSize: 'var(--ds-typography-size-md)'
  };

  return (
    <div className="flex flex-col gap-6 items-start">
      {/* Checked */}
      <label style={labelStyle}>
         <input type="checkbox" readOnly defaultChecked onClick={(e) => e.preventDefault()} style={inputStyle} />
         <span style={spanStyle}>Checked Option</span>
      </label>

      {/* Unchecked */}
      <label style={labelStyle}>
         <input type="checkbox" readOnly onClick={(e) => e.preventDefault()} style={inputStyle} />
         <span style={spanStyle}>Unchecked Option</span>
      </label>

      {/* Indeterminate (Simulated for visual preview) */}
      <label style={labelStyle}>
         <input 
           type="checkbox" 
           ref={el => { if(el) el.indeterminate = true; }}
           readOnly onClick={(e) => e.preventDefault()}
           style={inputStyle} 
         />
         <span style={spanStyle}>Indeterminate Option</span>
      </label>

       {/* Disabled */}
       <label style={{ ...labelStyle, cursor: 'not-allowed', opacity: 0.5 }}>
         <input type="checkbox" disabled defaultChecked style={inputStyle} />
         <span style={spanStyle}>Disabled Option</span>
      </label>
    </div>
  );
};