import React from 'react';

export const LabelPreview: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      
      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Default</h4>
        <ds-label text="Username"></ds-label>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Required</h4>
        <ds-label text="Email Address" required></ds-label>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>With Input Context</h4>
        <div className="flex flex-col">
          <ds-label text="Password" required></ds-label>
          <ds-input placeholder="••••••••" type="password"></ds-input>
        </div>
      </div>

      <style>{`
        ds-label:not(:defined) { display: block; font-weight: bold; font-family: var(--ds-typography-family-base); color: var(--ds-color-text); margin-bottom: 0.5rem; }
      `}</style>
    </div>
  );
};