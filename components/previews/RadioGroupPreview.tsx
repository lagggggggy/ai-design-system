import React from 'react';

export const RadioGroupPreview: React.FC = () => {
  const fieldsetStyle: React.CSSProperties = { border: 'none', padding: 0, margin: 0, fontFamily: 'var(--ds-typography-family-base)' };
  const legendStyle: React.CSSProperties = { 
    fontSize: 'var(--ds-typography-size-sm)', 
    fontWeight: 'var(--ds-typography-weight-bold)', 
    color: 'var(--ds-color-text)', 
    marginBottom: 'var(--ds-geometry-spacing-base)' 
  };
  const labelStyle: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 'calc(var(--ds-geometry-spacing-base) * 2)', cursor: 'pointer' };
  const inputStyle: React.CSSProperties = { appearance: 'auto', accentColor: 'var(--ds-color-primary)', width: '1.25rem', height: '1.25rem', margin: 0 };
  const spanStyle: React.CSSProperties = { color: 'var(--ds-color-text)', fontSize: 'var(--ds-typography-size-md)' };

  const RadioItem = ({ label, name, checked }: { label: string, name: string, checked?: boolean }) => (
    <label style={labelStyle}>
      <input type="radio" name={name} defaultChecked={checked} style={inputStyle} />
      <span style={spanStyle}>{label}</span>
    </label>
  );

  return (
    <div className="flex flex-col gap-8 w-full items-start max-w-lg">
      
      {/* Vertical Group */}
      <fieldset style={fieldsetStyle}>
        <legend style={legendStyle}>Payment Method (Vertical)</legend>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--ds-geometry-spacing-base) * 2)' }}>
          <RadioItem name="payment" label="Credit Card" checked />
          <RadioItem name="payment" label="PayPal" />
          <RadioItem name="payment" label="Bank Transfer" />
        </div>
      </fieldset>

      {/* Horizontal Group */}
      <fieldset style={fieldsetStyle}>
        <legend style={legendStyle}>T-Shirt Size (Horizontal)</legend>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 'calc(var(--ds-geometry-spacing-base) * 2)' }}>
          <RadioItem name="size" label="Small" />
          <RadioItem name="size" label="Medium" checked />
          <RadioItem name="size" label="Large" />
        </div>
      </fieldset>

       {/* Disabled Group */}
       <fieldset style={{...fieldsetStyle, opacity: 0.5, pointerEvents: 'none'}}>
        <legend style={legendStyle}>Shipping Option (Disabled)</legend>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--ds-geometry-spacing-base) * 2)' }}>
          <RadioItem name="ship" label="Standard" checked />
          <RadioItem name="ship" label="Express" />
        </div>
      </fieldset>
    </div>
  );
};