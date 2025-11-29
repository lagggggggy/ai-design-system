import React from 'react';

export const CardPreview: React.FC = () => {
  const commonCardStyle: React.CSSProperties = {
    display: 'block',
    background: 'var(--ds-color-surface)',
    borderRadius: 'var(--ds-geometry-radius-lg)',
    border: '1px solid var(--ds-color-border)',
    fontFamily: 'var(--ds-typography-family-base)',
    color: 'var(--ds-color-text)',
    overflow: 'hidden',
    width: '100%',
  };

  const headerStyle: React.CSSProperties = {
    padding: 'calc(var(--ds-geometry-spacing-base) * 4)',
    borderBottom: '1px solid var(--ds-color-border)',
    fontWeight: 600,
    fontSize: 'var(--ds-typography-size-lg)'
  };

  const bodyStyle: React.CSSProperties = {
    padding: 'calc(var(--ds-geometry-spacing-base) * 4)'
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Interactive Card */}
      <div 
        className="group"
        style={{
          ...commonCardStyle,
          boxShadow: 'var(--ds-effect-shadow-md)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = 'var(--ds-effect-shadow-md)';
        }}
      >
        <div style={headerStyle}>Interactive Card (Hover Me)</div>
        <div style={bodyStyle}>
          <p style={{ opacity: 0.8 }}>This card demonstrates the hover lift effect and shadow expansion defined in the generated code.</p>
        </div>
      </div>

      {/* Disabled Card */}
      <div 
        style={{
          ...commonCardStyle,
          boxShadow: 'none',
          opacity: 0.6,
          filter: 'grayscale(0.8)',
          pointerEvents: 'none'
        }}
      >
        <div style={headerStyle}>Disabled Card</div>
        <div style={bodyStyle}>
          <p style={{ opacity: 0.8 }}>This card is visually disabled, non-interactive, and has reduced opacity.</p>
        </div>
      </div>
    </div>
  );
};