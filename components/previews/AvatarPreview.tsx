import React from 'react';

export const AvatarPreview: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full items-center">
      
      {/* Sizes */}
      <div className="flex flex-col items-center gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Sizes</h4>
        <div className="flex items-center gap-4">
           <ds-avatar size="sm" src="https://i.pravatar.cc/150?u=1"></ds-avatar>
           <ds-avatar size="md" src="https://i.pravatar.cc/150?u=1"></ds-avatar>
           <ds-avatar size="lg" src="https://i.pravatar.cc/150?u=1"></ds-avatar>
        </div>
      </div>

      {/* Variants (Shapes) */}
      <div className="flex flex-col items-center gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Shapes</h4>
        <div className="flex items-center gap-4">
           <ds-avatar variant="circle" src="https://i.pravatar.cc/150?u=3"></ds-avatar>
           <ds-avatar variant="rounded" src="https://i.pravatar.cc/150?u=3"></ds-avatar>
           <ds-avatar variant="square" src="https://i.pravatar.cc/150?u=3"></ds-avatar>
        </div>
      </div>

      {/* Fallback Initials */}
      <div className="flex flex-col items-center gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Initials Fallback</h4>
        <div className="flex items-center gap-4">
           <ds-avatar size="sm" initials="JD"></ds-avatar>
           <ds-avatar size="md" initials="MK"></ds-avatar>
           <ds-avatar size="lg" initials="TR"></ds-avatar>
        </div>
      </div>

       <style>{`
        ds-avatar {
          display: inline-block;
          vertical-align: middle;
          font-family: var(--ds-typography-family-base);
        }
        /* Fallback style for preview in case Web Components aren't mounted */
        ds-avatar:not(:defined) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--ds-color-surfaceHighlight);
          color: var(--ds-color-text);
          font-weight: bold;
          border-radius: 50%;
          width: 3rem; height: 3rem;
        }
      `}</style>
    </div>
  );
};