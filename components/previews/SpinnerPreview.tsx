import React from 'react';

export const SpinnerPreview: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full items-center">
       <div className="flex flex-col items-center gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Primary</h4>
        <div className="flex items-center gap-8">
           <ds-spinner size="sm"></ds-spinner>
           <ds-spinner size="md"></ds-spinner>
           <ds-spinner size="lg"></ds-spinner>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Secondary</h4>
        <div className="flex items-center gap-8">
           <ds-spinner size="md" variant="secondary"></ds-spinner>
        </div>
      </div>

      <style>{`
        ds-spinner { display: inline-block; }
        /* Simulation styles if WC not defined */
        ds-spinner:not(:defined) {
          width: 2rem; height: 2rem;
          border: 3px solid rgba(0,0,0,0.1);
          border-radius: 50%;
          border-top-color: var(--ds-color-primary);
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};