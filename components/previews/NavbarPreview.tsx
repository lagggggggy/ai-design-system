
import React from 'react';

export const NavbarPreview: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-8">
      
      {/* Default Navbar */}
      <div className="w-full">
        <ds-navbar>
          <div slot="brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ds-icon name="menu" size="md"></ds-icon>
            <span>Brand</span>
          </div>
          
          <a href="#">Dashboard</a>
          <a href="#">Projects</a>
          <a href="#">Team</a>
          
          <div slot="end" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <ds-search-box placeholder="Search..." style={{ width: '200px' }}></ds-search-box>
            <ds-avatar size="sm" initials="JD"></ds-avatar>
          </div>
        </ds-navbar>
      </div>

      <div className="px-8 opacity-60 text-xs text-center" style={{ color: 'var(--ds-color-textDim)' }}>
        Navbar behaves as a sticky or block element.
      </div>

      <style>{`
        ds-navbar:not(:defined) { 
          display: block; 
          height: 64px; 
          background: var(--ds-color-surface); 
          border-bottom: 1px solid var(--ds-color-border);
          display: flex;
          align-items: center;
          padding: 0 1rem;
        }
      `}</style>
    </div>
  );
};
