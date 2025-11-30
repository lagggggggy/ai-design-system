
import React from 'react';

export const ImagePreview: React.FC = () => {
  const images = [
    { ratio: '16:9', src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=500&auto=format&fit=crop' },
    { ratio: '4:3', src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=500&auto=format&fit=crop' },
    { ratio: '1:1', src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=500&auto=format&fit=crop' }
  ];

  return (
    <div className="flex flex-col gap-10 w-full max-w-xl">
      
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Aspect Ratios</h4>
        <div className="grid grid-cols-2 gap-6">
           {images.map(img => (
             <div key={img.ratio}>
               <div className="text-xs mb-2 opacity-70 font-mono" style={{ color: 'var(--ds-color-text)' }}>{img.ratio}</div>
               <ds-image src={img.src} aspectRatio={img.ratio} radius="md">
                 {/* Fallback for preview if WC not defined */}
                 <img src={img.src} style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
               </ds-image>
             </div>
           ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Border Radius Variants</h4>
        <div className="grid grid-cols-3 gap-6">
           <div>
             <div className="text-xs mb-2 opacity-50 text-center" style={{ color: 'var(--ds-color-text)' }}>None</div>
             <ds-image src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&auto=format&fit=crop" aspectRatio="1:1" radius="none">
               <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&auto=format&fit=crop" style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
             </ds-image>
           </div>
           <div>
             <div className="text-xs mb-2 opacity-50 text-center" style={{ color: 'var(--ds-color-text)' }}>Medium</div>
             <ds-image src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&auto=format&fit=crop" aspectRatio="1:1" radius="md">
               <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&auto=format&fit=crop" style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
             </ds-image>
           </div>
           <div>
             <div className="text-xs mb-2 opacity-50 text-center" style={{ color: 'var(--ds-color-text)' }}>Full</div>
             <ds-image src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&auto=format&fit=crop" aspectRatio="1:1" radius="full">
               <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&auto=format&fit=crop" style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
             </ds-image>
           </div>
        </div>
      </div>

      <style>{`
        ds-image:not(:defined) { 
          display: block; 
          width: 100%; 
          background: #eee; 
          overflow: hidden;
        }
        
        /* Apply aspect ratio to fallback container if supported */
        ds-image:not(:defined)[aspectRatio="16:9"] { aspect-ratio: 16/9; }
        ds-image:not(:defined)[aspectRatio="4:3"] { aspect-ratio: 4/3; }
        ds-image:not(:defined)[aspectRatio="1:1"] { aspect-ratio: 1/1; }

        /* Radius fallback */
        ds-image:not(:defined)[radius="none"] { border-radius: 0; }
        ds-image:not(:defined)[radius="sm"] { border-radius: var(--ds-geometry-radius-sm); }
        ds-image:not(:defined)[radius="md"] { border-radius: var(--ds-geometry-radius-md); }
        ds-image:not(:defined)[radius="lg"] { border-radius: var(--ds-geometry-radius-lg); }
        ds-image:not(:defined)[radius="full"] { border-radius: 9999px; }
      `}</style>
    </div>
  );
};
