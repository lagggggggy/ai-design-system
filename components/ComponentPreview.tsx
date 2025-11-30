
import React, { useMemo } from 'react';
import { ComponentType, DesignTokens } from '../types';
import { flattenTokensToCSS } from '../utils/tokenUtils';
import { ButtonPreview } from './previews/ButtonPreview';
import { InputPreview } from './previews/InputPreview';
import { CheckboxPreview } from './previews/CheckboxPreview';
import { CheckboxGroupPreview } from './previews/CheckboxGroupPreview';
import { RadioGroupPreview } from './previews/RadioGroupPreview';
import { CardPreview } from './previews/CardPreview';
import { BadgePreview } from './previews/BadgePreview';
import { SwitchPreview } from './previews/SwitchPreview';
import { AlertPreview } from './previews/AlertPreview';
import { AvatarPreview } from './previews/AvatarPreview';
import { SpinnerPreview } from './previews/SpinnerPreview';
import { DividerPreview } from './previews/DividerPreview';
import { TypographyPreview } from './previews/TypographyPreview';
import { LinkPreview } from './previews/LinkPreview';
import { LabelPreview } from './previews/LabelPreview';
import { IconPreview } from './previews/IconPreview';
import { ImagePreview } from './previews/ImagePreview';
import { SelectPreview } from './previews/SelectPreview';
import { SearchBoxPreview } from './previews/SearchBoxPreview';
import { FormFieldPreview } from './previews/FormFieldPreview';
import { ButtonGroupPreview } from './previews/ButtonGroupPreview';
import { InputGroupPreview } from './previews/InputGroupPreview';
import { TabsPreview } from './previews/TabsPreview';
import { NavbarPreview } from './previews/NavbarPreview';

interface Props {
  component: ComponentType;
  tokens: DesignTokens;
  isDark: boolean; 
  themeMode?: 'light' | 'dark';
}

// -- Missing Previews Implementation (Modal/Drawer kept here for simplicity as they need state) --

const ModalPreview: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const modalRef = React.useRef<any>(null);

  React.useEffect(() => {
    const el = modalRef.current;
    if (el) {
       const handler = () => setOpen(false);
       el.addEventListener('ds-close', handler);
       return () => el.removeEventListener('ds-close', handler);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-48">
       <ds-button onClick={() => setOpen(true)}>Open Modal</ds-button>
       <ds-modal ref={modalRef} open={open} title="Preview Modal" size="md">
         <p style={{ margin: 0, color: 'var(--ds-color-text)', fontFamily: 'var(--ds-typography-family-base)' }}>
           This is the modal body content.
         </p>
         <div slot="footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <ds-button variant="ghost" onClick={() => setOpen(false)}>Cancel</ds-button>
            <ds-button variant="primary" onClick={() => setOpen(false)}>Confirm</ds-button>
         </div>
       </ds-modal>
    </div>
  );
};

const DrawerPreview: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const drawerRef = React.useRef<any>(null);

  React.useEffect(() => {
    const el = drawerRef.current;
    if (el) {
       const handler = () => setOpen(false);
       el.addEventListener('ds-close', handler);
       return () => el.removeEventListener('ds-close', handler);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-48">
       <ds-button onClick={() => setOpen(true)}>Open Drawer</ds-button>
       <ds-drawer ref={drawerRef} open={open} title="Navigation" placement="right">
         <div style={{ padding: '1rem' }}>
           <p style={{ margin: '0 0 1rem 0', color: 'var(--ds-color-text)', fontFamily: 'var(--ds-typography-family-base)' }}>Drawer Content</p>
           <ds-button variant="outline" style={{ width: '100%' }}>Action</ds-button>
         </div>
         <div slot="footer" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ds-button variant="ghost" onClick={() => setOpen(false)}>Close</ds-button>
         </div>
       </ds-drawer>
    </div>
  );
};

const PREVIEW_REGISTRY: Record<ComponentType, React.FC> = {
  button: ButtonPreview,
  input: InputPreview,
  checkbox: CheckboxPreview,
  'checkbox-group': CheckboxGroupPreview,
  radio: RadioGroupPreview,
  'radio-group': RadioGroupPreview,
  card: CardPreview,
  badge: BadgePreview,
  switch: SwitchPreview,
  alert: AlertPreview,
  avatar: AvatarPreview,
  spinner: SpinnerPreview,
  divider: DividerPreview,
  typography: TypographyPreview,
  link: LinkPreview,
  label: LabelPreview,
  icon: IconPreview,
  image: ImagePreview,
  select: SelectPreview,
  'search-box': SearchBoxPreview,
  'form-field': FormFieldPreview,
  'button-group': ButtonGroupPreview,
  'input-group': InputGroupPreview,
  tabs: TabsPreview,
  modal: ModalPreview,
  drawer: DrawerPreview,
  navbar: NavbarPreview
};

export const ComponentPreview: React.FC<Props> = ({ component, tokens, isDark, themeMode }) => {
  
  const style = useMemo(() => flattenTokensToCSS(tokens), [tokens]);
  const mode = themeMode || (isDark ? 'dark' : 'light');

  const containerClass = `flex-1 flex flex-col items-center justify-start pt-12 p-12 transition-colors duration-300 overflow-y-auto ${
    mode === 'dark' ? 'bg-slate-950' : 'bg-slate-100'
  }`;

  const previewCardClass = `p-8 rounded-xl shadow-lg border transition-all duration-300 w-full max-w-3xl flex flex-col items-center gap-8 mb-12`;
  const previewCardStyle = {
    backgroundColor: 'var(--ds-color-surface)', 
    borderColor: 'var(--ds-color-border)',
  };

  if (component === 'navbar') {
     return (
       <div className={containerClass} style={{ ...style, padding: '2rem 0', justifyContent: 'flex-start' }}>
          <NavbarPreview />
       </div>
     );
  }

  const PreviewComponent = PREVIEW_REGISTRY[component];

  return (
    <div className={containerClass} style={style}>
      <div style={previewCardStyle} className={previewCardClass}>
        <div className="flex justify-between w-full items-center mb-4 border-b pb-4" style={{borderColor: 'var(--ds-color-border)'}}>
           <h3 style={{ color: 'var(--ds-color-text)', fontFamily: 'var(--ds-typography-family-base)' }} className="text-xl font-bold">
            {component.charAt(0).toUpperCase() + component.slice(1).replace('-', ' ')}
          </h3>
          <span className="text-xs uppercase tracking-wider opacity-60" style={{ color: 'var(--ds-color-text)' }}>
            System Preview
          </span>
        </div>

        {PreviewComponent ? <PreviewComponent /> : <div className="text-red-500">Preview not found for {component}</div>}
      </div>
    </div>
  );
};
