import React from 'react';

export const TypographyPreview: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full items-start">
      
      {/* Headings */}
      <div className="flex flex-col gap-4 w-full">
         <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Headings</h4>
         <div className="flex flex-col gap-4 p-4 border rounded" style={{ borderColor: 'var(--ds-color-border)' }}>
            <ds-heading variant="h1">Heading 1</ds-heading>
            <ds-heading variant="h2">Heading 2</ds-heading>
            <ds-heading variant="h3">Heading 3</ds-heading>
            <ds-heading variant="h4">Heading 4</ds-heading>
            <ds-heading variant="h5">Heading 5</ds-heading>
            <ds-heading variant="h6">Heading 6</ds-heading>
         </div>
      </div>

      {/* Subtitles */}
      <div className="flex flex-col gap-4 w-full">
         <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Subtitles</h4>
         <div className="flex flex-col gap-4 p-4 border rounded" style={{ borderColor: 'var(--ds-color-border)' }}>
            <ds-heading variant="subtitle1">Subtitle 1: The quick brown fox jumps over the lazy dog</ds-heading>
            <ds-heading variant="subtitle2">Subtitle 2: The quick brown fox jumps over the lazy dog</ds-heading>
         </div>
      </div>

      {/* Body Copy */}
      <div className="flex flex-col gap-4 w-full">
         <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Body Text</h4>
         <div className="flex flex-col gap-4 p-4 border rounded" style={{ borderColor: 'var(--ds-color-border)' }}>
            <ds-text variant="body1">
              <strong>Body 1:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </ds-text>
            <ds-text variant="body2">
              <strong>Body 2:</strong> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </ds-text>
            <ds-text variant="caption">
              <strong>Caption:</strong> Duis aute irure dolor in reprehenderit in voluptate velit esse.
            </ds-text>
         </div>
      </div>

      {/* Colors */}
      <div className="flex flex-col gap-4 w-full">
         <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Semantic Colors</h4>
         <div className="flex flex-col gap-2 p-4 border rounded" style={{ borderColor: 'var(--ds-color-border)' }}>
            <ds-text variant="body2" color="primary">Primary Text Color</ds-text>
            <ds-text variant="body2" color="secondary">Secondary Text Color</ds-text>
            <ds-text variant="body2" color="dim">Dimmed Text Color</ds-text>
            <ds-text variant="body2" color="error">Error Text Color</ds-text>
            <ds-text variant="body2" color="success">Success Text Color</ds-text>
         </div>
      </div>

      <style>{`
        ds-heading, ds-text { display: block; font-family: var(--ds-typography-family-base); color: var(--ds-color-text); }
        /* Simulation if WC not loaded */
        ds-heading:not(:defined), ds-text:not(:defined) { display: block; margin-bottom: 0.5em; }
        
        ds-heading[variant="h1"] { font-size: var(--ds-typography-variants-h1-fontSize); font-weight: bold; }
        ds-heading[variant="h2"] { font-size: var(--ds-typography-variants-h2-fontSize); font-weight: bold; }
        ds-heading[variant="h3"] { font-size: var(--ds-typography-variants-h3-fontSize); font-weight: 600; }
        ds-heading[variant="h4"] { font-size: var(--ds-typography-variants-h4-fontSize); font-weight: 600; }
        ds-heading[variant="subtitle1"] { font-size: var(--ds-typography-variants-subtitle1-fontSize); }
        
        ds-text[variant="body1"] { font-size: var(--ds-typography-variants-body1-fontSize); }
        ds-text[variant="body2"] { font-size: var(--ds-typography-variants-body2-fontSize); }
        ds-text[variant="caption"] { font-size: var(--ds-typography-variants-caption-fontSize); opacity: 0.8; }
        ds-text[color="primary"] { color: var(--ds-color-primary); }
      `}</style>
    </div>
  );
};