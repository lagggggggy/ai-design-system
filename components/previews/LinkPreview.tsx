import React from 'react';

export const LinkPreview: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      
      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Default Link</h4>
        <p style={{ color: 'var(--ds-color-text)', fontSize: 'var(--ds-typography-size-md)' }}>
           This is a sentence with a <ds-link href="#">standard link</ds-link> inside it.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Discrete Link</h4>
        <p style={{ color: 'var(--ds-color-text)', fontSize: 'var(--ds-typography-size-md)' }}>
           The <ds-link href="#" variant="discrete">discrete link</ds-link> only shows color/underline on hover, blending into text otherwise.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Standalone Context</h4>
        <div className="flex gap-4">
           <ds-link href="#">Terms of Service</ds-link>
           <ds-link href="#">Privacy Policy</ds-link>
        </div>
      </div>

      <style>{`
        ds-link { display: inline; }
        ds-link:not(:defined) { color: var(--ds-color-primary); text-decoration: underline; cursor: pointer; }
      `}</style>
    </div>
  );
};