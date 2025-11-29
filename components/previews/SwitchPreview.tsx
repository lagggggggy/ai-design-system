import React, { useState } from 'react';

export const SwitchPreview: React.FC = () => {
  const [active, setActive] = useState(false);
  const [notif, setNotif] = useState(true);

  // Styles to simulate the component if web components aren't fully hydrated
  const sliderStyle = {
    position: 'absolute' as const, cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'var(--ds-color-secondary)', transition: '.4s', borderRadius: '2rem'
  };
  const sliderActiveStyle = { ...sliderStyle, backgroundColor: 'var(--ds-color-primary)' };
  
  const knobStyle = {
    position: 'absolute' as const, content: '""', height: '1.125rem', width: '1.125rem',
    left: '0.1875rem', bottom: '0.1875rem', backgroundColor: 'white', transition: '.4s', borderRadius: '50%'
  };
  const knobActiveStyle = { ...knobStyle, transform: 'translateX(1.25rem)' };

  return (
    <div className="flex flex-col gap-8 w-full max-w-lg items-start">
       
       {/* Interactive */}
       <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActive(!active)}>
          <div style={{ position: 'relative', width: '2.75rem', height: '1.5rem' }}>
             <div style={active ? sliderActiveStyle : sliderStyle}></div>
             <div style={active ? knobActiveStyle : knobStyle}></div>
          </div>
          <span style={{ fontFamily: 'var(--ds-typography-family-base)', color: 'var(--ds-color-text)' }}>
            Airplane Mode ({active ? 'On' : 'Off'})
          </span>
       </div>

       {/* Pre-checked */}
       <div className="flex items-center gap-4 cursor-pointer" onClick={() => setNotif(!notif)}>
          <div style={{ position: 'relative', width: '2.75rem', height: '1.5rem' }}>
             <div style={notif ? sliderActiveStyle : sliderStyle}></div>
             <div style={notif ? knobActiveStyle : knobStyle}></div>
          </div>
          <span style={{ fontFamily: 'var(--ds-typography-family-base)', color: 'var(--ds-color-text)' }}>
            Push Notifications
          </span>
       </div>

       {/* Disabled */}
       <div className="flex items-center gap-4 opacity-50 cursor-not-allowed">
          <div style={{ position: 'relative', width: '2.75rem', height: '1.5rem' }}>
             <div style={sliderStyle}></div>
             <div style={knobStyle}></div>
          </div>
          <span style={{ fontFamily: 'var(--ds-typography-family-base)', color: 'var(--ds-color-text)' }}>
            Force Update (Disabled)
          </span>
       </div>

    </div>
  );
};