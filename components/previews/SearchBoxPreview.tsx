
import React from 'react';
import { Search } from 'lucide-react';

export const SearchBoxPreview: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      
      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Standard</h4>
        <ds-search-box>
          <input placeholder="Search items..." />
        </ds-search-box>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>With Value</h4>
        <ds-search-box>
           <input placeholder="Search items..." defaultValue="Component Library" />
        </ds-search-box>
      </div>

      <style>{`
        /* Fallback for preview */
        ds-search-box:not(:defined) { 
          display: block; 
          width: 100%; 
          position: relative;
          font-family: var(--ds-typography-family-base);
        }
        
        ds-search-box:not(:defined) input {
          width: 100%;
          padding: 0.5rem 0.75rem 0.5rem 2.5rem;
          border: 1px solid var(--ds-color-border);
          border-radius: var(--ds-geometry-radius-md);
          background: var(--ds-color-surface);
          color: var(--ds-color-text);
          font-family: inherit;
          outline: none;
          font-size: 0.875rem;
        }

        ds-search-box:not(:defined) input:focus {
          border-color: var(--ds-color-primary);
          box-shadow: 0 0 0 1px var(--ds-color-primary);
        }
        
        /* Mock Search Icon Wrapper */
        ds-search-box:not(:defined)::before {
          content: ""; 
          /* We use a background image or SVG mask in production, 
             but here we can just use the absolute positioned SVG below this block
             via React rendering if we wanted, but pseudo-elements are pure CSS.
             Let's use a simpler approach: compose the icon in React. 
          */
          display: none;
        }

        /* We inject the icon via React for the preview to ensure it looks good */
        .preview-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--ds-color-textDim);
          pointer-events: none;
          z-index: 10;
        }
      `}</style>
      
      {/* 
         Since ds-search-box slots the input, the icon is internal to the Web Component.
         However, for the PREVIEW (before JS runs), the WC shadow DOM isn't there.
         So we simulate the icon being there by appending it absolutely.
         
         In the real WC template (litTemplates.ts), the icon is part of the shadow DOM.
      */}
      <script dangerouslySetInnerHTML={{__html: `
        // This script purely simulates the icon injection for the "No-JS" preview state if needed,
        // but simpler is to just rely on the WC definition loading eventually.
        // For immediate visual feedback in the "Live Preview" before hydration:
        document.querySelectorAll('ds-search-box').forEach(el => {
           if (!el.querySelector('.preview-icon')) {
             const icon = document.createElement('div');
             icon.className = 'preview-icon';
             icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';
             el.prepend(icon);
           }
        });
      `}} />

    </div>
  );
};
