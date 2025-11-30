
import React from 'react';

const ICONS: Record<string, React.ReactNode> = {
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></>,
  search: <><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></>,
  close: <><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></>,
  check: <polyline points="20 6 9 17 4 12"></polyline>,
  home: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></>,
  settings: <><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></>
};

// Helper to render the fallback SVG inside the ds-icon
const SvgIcon = ({ name, ...props }: any) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    {ICONS[name] || ICONS.menu}
  </svg>
);

export const IconPreview: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 w-full items-center">
      
      <div className="flex flex-col items-center gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Standard Set</h4>
        <div className="grid grid-cols-4 gap-8">
           <div className="flex flex-col items-center gap-2">
             <ds-icon name="home" size="md"><SvgIcon name="home" /></ds-icon>
             <span className="text-[10px] opacity-50" style={{color: 'var(--ds-color-text)'}}>Home</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <ds-icon name="user" size="md"><SvgIcon name="user" /></ds-icon>
             <span className="text-[10px] opacity-50" style={{color: 'var(--ds-color-text)'}}>User</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <ds-icon name="settings" size="md"><SvgIcon name="settings" /></ds-icon>
             <span className="text-[10px] opacity-50" style={{color: 'var(--ds-color-text)'}}>Settings</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <ds-icon name="search" size="md"><SvgIcon name="search" /></ds-icon>
             <span className="text-[10px] opacity-50" style={{color: 'var(--ds-color-text)'}}>Search</span>
           </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Brand Integration</h4>
        <div className="flex items-center gap-8 p-6 rounded-lg border bg-opacity-50" style={{ borderColor: 'var(--ds-color-border)', backgroundColor: 'var(--ds-color-surfaceHighlight)' }}>
           <ds-icon name="check" size="lg" color="primary"><SvgIcon name="check" /></ds-icon>
           <ds-icon name="home" size="lg" color="primary"><SvgIcon name="home" /></ds-icon>
           <ds-icon name="user" size="lg" color="primary"><SvgIcon name="user" /></ds-icon>
        </div>
        <span className="text-xs opacity-50" style={{color: 'var(--ds-color-text)'}}>Icons inheriting Primary Color</span>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Semantic Colors</h4>
        <div className="flex items-center gap-8">
           <div className="flex flex-col items-center gap-2">
              <ds-icon name="check" size="md" color="success"><SvgIcon name="check" /></ds-icon>
              <span className="text-[10px]" style={{color: 'var(--ds-color-success)'}}>Success</span>
           </div>
           <div className="flex flex-col items-center gap-2">
              <ds-icon name="close" size="md" color="error"><SvgIcon name="close" /></ds-icon>
              <span className="text-[10px]" style={{color: 'var(--ds-color-error)'}}>Error</span>
           </div>
        </div>
      </div>

      <style>{`
        /* 
           Simulate the Custom Element styles. 
           If the WC is defined, it will likely replace this content with Shadow DOM,
           or we can use slotting if we updated the template.
           The fallback ensures it looks correct even without JS execution.
        */
        ds-icon:not(:defined) { 
          display: inline-flex; 
          align-items: center; 
          justify-content: center;
          width: 1.5rem; 
          height: 1.5rem; 
          color: currentColor; 
        }
        
        ds-icon:not(:defined) svg {
          width: 100%;
          height: 100%;
        }

        ds-icon:not(:defined)[size="sm"] { width: 1rem; height: 1rem; }
        ds-icon:not(:defined)[size="md"] { width: 1.5rem; height: 1.5rem; }
        ds-icon:not(:defined)[size="lg"] { width: 2rem; height: 2rem; }
        
        ds-icon:not(:defined)[color="primary"] { color: var(--ds-color-primary); }
        ds-icon:not(:defined)[color="secondary"] { color: var(--ds-color-secondary); }
        ds-icon:not(:defined)[color="success"] { color: var(--ds-color-success); }
        ds-icon:not(:defined)[color="error"] { color: var(--ds-color-error); }
      `}</style>
    </div>
  );
};
