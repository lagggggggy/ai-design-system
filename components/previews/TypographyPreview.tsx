
import React from 'react';

export const TypographyPreview: React.FC = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-4xl">
      
      {/* Headings */}
      <div className="flex flex-col gap-4 w-full">
         <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Headings</h4>
         <div className="flex flex-col gap-6 p-8 border rounded-xl" style={{ borderColor: 'var(--ds-color-border)' }}>
            <div className="flex items-baseline gap-4 border-b pb-4" style={{borderColor: 'var(--ds-color-border)'}}>
              <span className="text-xs w-16 opacity-50 font-mono">H1</span>
              <ds-typography variant="h1">The quick brown fox</ds-typography>
            </div>
            <div className="flex items-baseline gap-4 border-b pb-4" style={{borderColor: 'var(--ds-color-border)'}}>
              <span className="text-xs w-16 opacity-50 font-mono">H2</span>
              <ds-typography variant="h2">Jumps over the lazy dog</ds-typography>
            </div>
            <div className="flex items-baseline gap-4 border-b pb-4" style={{borderColor: 'var(--ds-color-border)'}}>
              <span className="text-xs w-16 opacity-50 font-mono">H3</span>
              <ds-typography variant="h3">System Typography</ds-typography>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-xs w-16 opacity-50 font-mono">H4</span>
              <ds-typography variant="h4">Design Tokens</ds-typography>
            </div>
         </div>
      </div>

      {/* Subtitles & Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
           <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Subtitles</h4>
           <div className="flex flex-col gap-4 p-6 border rounded-xl" style={{ borderColor: 'var(--ds-color-border)' }}>
              <div>
                <span className="text-[10px] opacity-50 block mb-1">Subtitle 1</span>
                <ds-typography variant="subtitle1">A modular approach to design systems</ds-typography>
              </div>
              <div>
                <span className="text-[10px] opacity-50 block mb-1">Subtitle 2</span>
                <ds-typography variant="subtitle2">Consistent cross-platform UI components</ds-typography>
              </div>
           </div>
        </div>

        <div className="flex flex-col gap-4">
           <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Body</h4>
           <div className="flex flex-col gap-4 p-6 border rounded-xl" style={{ borderColor: 'var(--ds-color-border)' }}>
              <div>
                <span className="text-[10px] opacity-50 block mb-1">Body 1</span>
                <ds-typography variant="body1">
                  Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes.
                </ds-typography>
              </div>
              <div>
                <span className="text-[10px] opacity-50 block mb-1">Body 2</span>
                <ds-typography variant="body2">
                  We use them in place of hard-coded values (such as hex values for color or pixel values for spacing) in order to maintain a scalable and consistent visual system.
                </ds-typography>
              </div>
              <div>
                <span className="text-[10px] opacity-50 block mb-1">Caption</span>
                <ds-typography variant="caption">
                  Figure 1.1: Token Architecture
                </ds-typography>
              </div>
           </div>
        </div>
      </div>

      <style>{`
        ds-typography { display: block; font-family: var(--ds-typography-family-base); color: var(--ds-color-text); }
        
        ds-typography[variant="h1"] { font-size: var(--ds-typography-variants-h1-fontSize); font-weight: var(--ds-typography-variants-h1-fontWeight); line-height: var(--ds-typography-variants-h1-lineHeight); }
        ds-typography[variant="h2"] { font-size: var(--ds-typography-variants-h2-fontSize); font-weight: var(--ds-typography-variants-h2-fontWeight); line-height: var(--ds-typography-variants-h2-lineHeight); }
        ds-typography[variant="h3"] { font-size: var(--ds-typography-variants-h3-fontSize); font-weight: var(--ds-typography-variants-h3-fontWeight); line-height: var(--ds-typography-variants-h3-lineHeight); }
        ds-typography[variant="h4"] { font-size: var(--ds-typography-variants-h4-fontSize); font-weight: var(--ds-typography-variants-h4-fontWeight); line-height: var(--ds-typography-variants-h4-lineHeight); }
        ds-typography[variant="subtitle1"] { font-size: var(--ds-typography-variants-subtitle1-fontSize); font-weight: var(--ds-typography-variants-subtitle1-fontWeight); line-height: var(--ds-typography-variants-subtitle1-lineHeight); }
        ds-typography[variant="subtitle2"] { font-size: var(--ds-typography-variants-subtitle2-fontSize); font-weight: var(--ds-typography-variants-subtitle2-fontWeight); line-height: var(--ds-typography-variants-subtitle2-lineHeight); }
        
        ds-typography[variant="body1"] { font-size: var(--ds-typography-variants-body1-fontSize); font-weight: var(--ds-typography-variants-body1-fontWeight); line-height: var(--ds-typography-variants-body1-lineHeight); }
        ds-typography[variant="body2"] { font-size: var(--ds-typography-variants-body2-fontSize); font-weight: var(--ds-typography-variants-body2-fontWeight); line-height: var(--ds-typography-variants-body2-lineHeight); }
        ds-typography[variant="caption"] { font-size: var(--ds-typography-variants-caption-fontSize); font-weight: var(--ds-typography-variants-caption-fontWeight); line-height: var(--ds-typography-variants-caption-lineHeight); opacity: 0.8; }
      `}</style>
    </div>
  );
};
