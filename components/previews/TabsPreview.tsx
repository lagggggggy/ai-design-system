
import React from 'react';

export const TabsPreview: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
       <div className="flex flex-col gap-2">
         <h4 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>Basic Tabs</h4>
         
         <ds-tabs>
           <ds-tab slot="tab" active>Profile</ds-tab>
           <ds-tab slot="tab">Settings</ds-tab>
           <ds-tab slot="tab" disabled>Notifications</ds-tab>
           
           <div slot="panel" style={{ padding: '1.5rem', border: '1px solid var(--ds-color-border)', borderRadius: 'var(--ds-geometry-radius-md)', marginTop: '1rem' }}>
              <ds-typography variant="h6">Profile Settings</ds-typography>
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', opacity: 0.8 }}>Manage your public profile and preferences here.</p>
           </div>
         </ds-tabs>
       </div>
    </div>
  );
};
