import React from 'react';

export const CheckboxGroupPreview: React.FC = () => {
  const fieldsetStyle: React.CSSProperties = { border: 'none', padding: 0, margin: 0, fontFamily: 'var(--ds-typography-family-base)' };
  const legendStyle: React.CSSProperties = { 
    fontSize: 'var(--ds-typography-size-sm)', 
    fontWeight: 'var(--ds-typography-weight-bold)', 
    color: 'var(--ds-color-text)', 
    marginBottom: 'var(--ds-geometry-spacing-base)' 
  };
  const labelStyle: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 'calc(var(--ds-geometry-spacing-base) * 2)', cursor: 'pointer' };
  const inputStyle: React.CSSProperties = { appearance: 'auto', accentColor: 'var(--ds-color-primary)', width: '1.25rem', height: '1.25rem' };
  const spanStyle: React.CSSProperties = { color: 'var(--ds-color-text)', fontSize: 'var(--ds-typography-size-md)' };

  const CheckboxItem = ({ label }: { label: string }) => (
    <label style={labelStyle}>
      <input type="checkbox" style={inputStyle} />
      <span style={spanStyle}>{label}</span>
    </label>
  );

  return (
    <div className="flex flex-col gap-8 w-full items-start max-w-lg">
      
      {/* Vertical Group */}
      <fieldset style={fieldsetStyle}>
        <legend style={legendStyle}>Select Your Interests (Vertical)</legend>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--ds-geometry-spacing-base) * 2)' }}>
          <CheckboxItem label="Coding" />
          <CheckboxItem label="Design" />
          <CheckboxItem label="Marketing" />
        </div>
      </fieldset>

      {/* Horizontal Group */}
      <fieldset style={fieldsetStyle}>
        <legend style={legendStyle}>Notification Settings (Horizontal)</legend>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 'calc(var(--ds-geometry-spacing-base) * 2)' }}>
          <CheckboxItem label="Email" />
          <CheckboxItem label="SMS" />
          <CheckboxItem label="Push" />
        </div>
      </fieldset>

       {/* Error State */}
       <fieldset style={fieldsetStyle}>
        <legend style={legendStyle}>Required Selection (Error)</legend>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--ds-geometry-spacing-base) * 2)' }}>
          <CheckboxItem label="Terms of Service" />
        </div>
        <div style={{ marginTop: 'var(--ds-geometry-spacing-base)', fontSize: 'var(--ds-typography-size-sm)', color: 'var(--ds-color-error)' }}>
          You must accept the terms to proceed.
        </div>
      </fieldset>
    </div>
  );
};