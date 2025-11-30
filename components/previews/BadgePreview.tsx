
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

      <div className="flex flex-col gap-4 w-full">
        <h4 className="text-sm font-semibold opacity-70" style={{ color: 'var(--ds-color-text)' }}>Shapes</h4>
        <div className="flex flex-wrap gap-4 items-center">
          <ds-badge variant="primary" shape="rounded">Rounded</ds-badge>
          <ds-badge variant="primary" shape="pill">Pill</ds-badge>
          <ds-badge variant="primary" shape="square">Square</ds-badge>
        </div>
      </div>
      
      <style>{`
        ds-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.25em 0.75em;
          border-radius: var(--ds-geometry-radius-sm);
          font-family: var(--ds-typography-family-base);
          font-size: 0.75rem;
          font-weight: 500;
          line-height: 1;
          border: 1px solid transparent;
          white-space: nowrap;
        }
        
        /* Solid / Base variants */
        ds-badge[variant="primary"] { background-color: var(--ds-color-primary); color: var(--ds-color-textInverse); }
        ds-badge[variant="secondary"] { background-color: var(--ds-color-surfaceHighlight); color: var(--ds-color-text); border-color: var(--ds-color-border); }
        ds-badge[variant="outline"] { background-color: transparent; border-color: var(--ds-color-border); color: var(--ds-color-text); }
        
        /* Soft Variants */
        ds-badge[variant="success"] { 
          background-color: color-mix(in srgb, var(--ds-color-success), transparent 85%); 
          color: var(--ds-color-success); 
          border-color: color-mix(in srgb, var(--ds-color-success), transparent 80%);
        }
        ds-badge[variant="warning"] { 
          background-color: color-mix(in srgb, var(--ds-color-warning), transparent 85%); 
          color: var(--ds-color-warning); 
          border-color: color-mix(in srgb, var(--ds-color-warning), transparent 80%);
        }
        ds-badge[variant="error"] { 
          background-color: color-mix(in srgb, var(--ds-color-error), transparent 85%); 
          color: var(--ds-color-error); 
          border-color: color-mix(in srgb, var(--ds-color-error), transparent 80%);
        }
        ds-badge[variant="info"] { 
          background-color: color-mix(in srgb, var(--ds-color-info), transparent 85%); 
          color: var(--ds-color-info); 
          border-color: color-mix(in srgb, var(--ds-color-info), transparent 80%);
        }
        
        ds-badge[shape="pill"] { border-radius: 9999px; }
        ds-badge[shape="square"] { border-radius: 0; }
      `}</style>
    </div>
  );
};
