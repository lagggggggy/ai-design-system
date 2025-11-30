
import React from 'react';

export const AvatarPreview: React.FC = () => {
  // Helper to render content inside the custom element for preview purposes
  // In a real Web Component usage, 'src' would be handled by Shadow DOM.
  // Here we inject children to ensure visual correctness without JS execution.
  const Avatar = ({ src, initials, size = 'md', variant = 'circle' }: any) => (
    <ds-avatar size={size} variant={variant}>
      {src ? (
        <img 
            src={src} 
            alt="Avatar" 
        />
      ) : (
        <span>{initials}</span>
      )}
    </ds-avatar>
  );

  return (
    <div className="flex flex-col gap-12 w-full items-center">
      
      {/* Image Avatars */}
      <div className="flex flex-col items-center gap-6">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Image Assets</h4>
        <div className="flex items-center gap-6">
           <div className="flex flex-col items-center gap-2">
              <Avatar size="sm" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop" />
              <span className="text-[10px] opacity-50" style={{ color: 'var(--ds-color-text)' }}>sm</span>
           </div>
           <div className="flex flex-col items-center gap-2">
              <Avatar size="md" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop" />
              <span className="text-[10px] opacity-50" style={{ color: 'var(--ds-color-text)' }}>md</span>
           </div>
           <div className="flex flex-col items-center gap-2">
              <Avatar size="lg" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop" />
              <span className="text-[10px] opacity-50" style={{ color: 'var(--ds-color-text)' }}>lg</span>
           </div>
        </div>
      </div>

      {/* Initials Fallback */}
      <div className="flex flex-col items-center gap-6">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Text Fallback</h4>
        <div className="flex items-center gap-6">
           <Avatar size="md" initials="JD" />
           <Avatar size="md" initials="MK" />
           <Avatar size="md" initials="TR" />
        </div>
      </div>

      {/* Shapes */}
      <div className="flex flex-col items-center gap-6">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Shapes</h4>
        <div className="flex items-center gap-6">
           <Avatar variant="circle" initials="C" size="md" />
           <Avatar variant="rounded" initials="R" size="md" />
           <Avatar variant="square" initials="S" size="md" />
        </div>
      </div>

       <style>{`
        ds-avatar {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--ds-color-surfaceHighlight);
          color: var(--ds-color-text);
          font-family: var(--ds-typography-family-base);
          font-weight: 600;
          overflow: hidden;
          text-transform: uppercase;
        }

        ds-avatar[size="sm"] { width: 2rem; height: 2rem; font-size: 0.75rem; }
        ds-avatar[size="md"] { width: 3rem; height: 3rem; font-size: 1rem; }
        ds-avatar[size="lg"] { width: 4rem; height: 4rem; font-size: 1.25rem; }

        ds-avatar[variant="circle"] { border-radius: 50%; }
        ds-avatar[variant="rounded"] { border-radius: var(--ds-geometry-radius-md); }
        ds-avatar[variant="square"] { border-radius: 0; }

        ds-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      `}</style>
    </div>
  );
};
