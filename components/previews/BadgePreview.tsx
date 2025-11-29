import React from 'react';

export const BadgePreview: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-lg items-start">
      <div className="flex flex-col gap-4 w-full">
        <h4 className="text-sm font-semibold opacity-70" style={{ color: 'var(--ds-color-text)' }}>Brand Variants</h4>
        <div className="flex flex-wrap gap-4">
          <ds-badge variant="primary">Primary</ds-badge>
          <ds-badge variant="secondary">Secondary</ds-badge>
          <ds-badge variant="outline">Outline</ds-badge>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <h4 className="text-sm font-semibold opacity-70" style={{ color: 'var(--ds-color-text)' }}>Status Semantics</h4>
        <div className="flex flex-wrap gap-4">
          <ds-badge variant="success">Success</ds-badge>
          <ds-badge variant="warning">Warning</ds-badge>
          <ds-badge variant="error">Error</ds-badge>
          <ds-badge variant="info">Info</ds-badge>
        </div>
      </div>
      
      {/* Styles for native preview (in case web components aren't loaded in this context yet) */}
      <style>{`
        ds-badge {
          display: inline-flex;
          align-items: center;
          padding: calc(var(--ds-geometry-spacing-base) * 0.5) calc(var(--ds-geometry-spacing-base) * 2);
          border-radius: var(--ds-geometry-radius-lg);
          font-family: var(--ds-typography-family-base);
          font-size: var(--ds-typography-size-sm);
          font-weight: var(--ds-typography-weight-bold);
          line-height: 1;
          white-space: nowrap;
          border: 1px solid transparent;
        }
        ds-badge[variant="primary"] { background-color: var(--ds-color-primary); color: var(--ds-color-textInverse); }
        ds-badge[variant="secondary"] { background-color: var(--ds-color-secondary); color: var(--ds-color-textInverse); }
        ds-badge[variant="outline"] { background-color: transparent; border-color: var(--ds-color-border); color: var(--ds-color-text); }
        ds-badge[variant="success"] { background-color: var(--ds-color-success); color: #fff; }
        ds-badge[variant="warning"] { background-color: var(--ds-color-warning); color: #fff; }
        ds-badge[variant="error"] { background-color: var(--ds-color-error); color: #fff; }
        ds-badge[variant="info"] { background-color: var(--ds-color-info); color: #fff; }
      `}</style>
    </div>
  );
};