
import { DesignTokens, ComponentType, GeneratedFile } from '../types';

const createReactFile = (name: string, content: string, css: string): GeneratedFile[] => [
  { 
    fileName: `${name}.tsx`, 
    language: 'typescript', 
    description: `React ${name} Component`, 
    content: content.trim() 
  },
  { 
    fileName: `${name}.module.css`, 
    language: 'css', 
    description: 'CSS Module', 
    content: css.trim() 
  }
];

export const nativeReactTemplates: Partial<Record<ComponentType, (tokens: DesignTokens) => GeneratedFile[]>> = {
  // ... (Other existing templates like button, input, card, badge, switch, select, tabs, form-field, search-box, modal, navbar, drawer, typography)
  
  button: () => createReactFile('Button', `
import React from 'react';
import s from './Button.module.css';
import { Icon } from './Icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  children?: React.ReactNode;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon,
  className, 
  ...props 
}: ButtonProps) => {
  return (
    <button 
      className={\`\${s.root} \${s[variant]} \${s[size]} \${className || ''}\`}
      {...props}
    >
      {icon && <Icon name={icon} size={size === 'lg' ? 'md' : 'sm'} className={s.icon} />}
      {children}
    </button>
  );
};
`, `
.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--ds-geometry-radius-md);
  font-family: var(--ds-typography-family-base);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
  gap: 0.5rem;
}

.primary { background: var(--ds-color-primary); color: var(--ds-color-textInverse); }
.secondary { background: var(--ds-color-secondary); color: var(--ds-color-textInverse); }
.outline { background: transparent; border-color: var(--ds-color-border); color: var(--ds-color-text); }
.ghost { background: transparent; color: var(--ds-color-text); }

.sm { font-size: 0.875rem; padding: 0.25rem 0.75rem; }
.md { font-size: 1rem; padding: 0.5rem 1rem; }
.lg { font-size: 1.125rem; padding: 0.75rem 1.5rem; }
`),

  icon: () => createReactFile('Icon', `
import React from 'react';
import s from './Icon.module.css';

const ICONS: Record<string, React.ReactNode> = {
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  search: <><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></>,
  check: <polyline points="20 6 9 17 4 12"></polyline>,
  info: <><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></>,
  alert: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></>,
  close: <><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></>,
  user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></>,
  home: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></>,
  settings: <><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></>
};

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Icon = ({ name, size = 'md', className, ...props }: IconProps) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={\`\${s.root} \${s[size]} \${className || ''}\`}
    {...props}
  >
    {ICONS[name] || ICONS.menu}
  </svg>
);
`, `
.root { display: inline-block; vertical-align: middle; }
.sm { width: 1rem; height: 1rem; }
.md { width: 1.5rem; height: 1.5rem; }
.lg { width: 2rem; height: 2rem; }
`),

  // ButtonGroup Template
  'button-group': () => createReactFile('ButtonGroup', `
import React from 'react';
import s from './ButtonGroup.module.css';

export interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const ButtonGroup = ({ children, orientation = 'horizontal', className }: ButtonGroupProps) => {
  return (
    <div className={\`\${s.root} \${s[orientation]} \${className || ''}\`}>
      {children}
    </div>
  );
};
`, `
.root {
  display: inline-flex;
}

.vertical {
  flex-direction: column;
}

/* Children Radius Reset */
.root > * {
  border-radius: 0 !important;
}

/* Horizontal Layout */
.horizontal > *:first-child {
  border-top-left-radius: var(--ds-geometry-radius-md) !important;
  border-bottom-left-radius: var(--ds-geometry-radius-md) !important;
}
.horizontal > *:last-child {
  border-top-right-radius: var(--ds-geometry-radius-md) !important;
  border-bottom-right-radius: var(--ds-geometry-radius-md) !important;
}
.horizontal > *:not(:first-child) {
  margin-left: -1px;
}

/* Vertical Layout */
.vertical > *:first-child {
  border-top-left-radius: var(--ds-geometry-radius-md) !important;
  border-top-right-radius: var(--ds-geometry-radius-md) !important;
}
.vertical > *:last-child {
  border-bottom-left-radius: var(--ds-geometry-radius-md) !important;
  border-bottom-right-radius: var(--ds-geometry-radius-md) !important;
}
.vertical > *:not(:first-child) {
  margin-top: -1px;
}

.root > *:hover,
.root > *:focus {
  z-index: 1;
  position: relative;
}
`),

  'input-group': () => createReactFile('InputGroup', `
import React from 'react';
import s from './InputGroup.module.css';

export interface InputGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const InputGroup = ({ children, className }: InputGroupProps) => {
  return (
    <div className={\`\${s.root} \${className || ''}\`}>
      {children}
    </div>
  );
};
`, `
.root {
  display: flex;
  align-items: stretch;
  width: 100%;
}

.root > * {
  border-radius: 0;
}

.root > *:first-child {
  border-top-left-radius: var(--ds-geometry-radius-md);
  border-bottom-left-radius: var(--ds-geometry-radius-md);
}

.root > *:last-child {
  border-top-right-radius: var(--ds-geometry-radius-md);
  border-bottom-right-radius: var(--ds-geometry-radius-md);
}

.root > *:not(:first-child) {
  margin-left: -1px;
}

.root > *:focus-within {
  z-index: 2;
  position: relative;
}
`),
  
  // Re-export other simple ones to ensure full coverage
  input: () => createReactFile('Input', `
import React from 'react';
import s from './Input.module.css';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { error?: boolean; }
export const Input = ({ className, error, ...props }: InputProps) => (
  <input className={\`\${s.root} \${error ? s.error : ''} \${className || ''}\`} {...props} />
);
`, `.root { width: 100%; padding: 0.5rem 0.75rem; border: 1px solid var(--ds-color-border); border-radius: var(--ds-geometry-radius-md); background: var(--ds-color-surface); color: var(--ds-color-text); font-family: var(--ds-typography-family-base); outline: none; } .root:focus { border-color: var(--ds-color-primary); box-shadow: 0 0 0 1px var(--ds-color-primary); } .error { border-color: var(--ds-color-error); }`),
  
  card: () => createReactFile('Card', `import React from 'react'; import s from './Card.module.css'; export const Card = ({ children, className }: any) => <div className={\`\${s.root} \${className||''}\`}>{children}</div>;`, `.root { display: block; background: var(--ds-color-surface); border: 1px solid var(--ds-color-border); border-radius: var(--ds-geometry-radius-lg); overflow: hidden; color: var(--ds-color-text); }`),
  badge: () => createReactFile('Badge', `import React from 'react'; import s from './Badge.module.css'; export const Badge = ({ children, variant='primary', shape='rounded' }: any) => <span className={\`\${s.root} \${s[variant]} \${s[shape]}\`}>{children}</span>;`, `.root { display: inline-flex; padding: 0.25em 0.75em; border-radius: var(--ds-geometry-radius-sm); font-size: 0.75rem; font-weight: 500; border: 1px solid transparent; } .primary { background: var(--ds-color-primary); color: white; } .pill { border-radius: 999px; }`),
  switch: () => createReactFile('Switch', `import React from 'react'; import s from './Switch.module.css'; export const Switch = ({ checked, onChange }: any) => <button className={\`\${s.track} \${checked?s.checked:''}\`} onClick={()=>onChange(!checked)}><span className={s.thumb}/></button>;`, `.track { width: 2.5rem; height: 1.25rem; background: var(--ds-color-secondary); border-radius: 99px; position: relative; } .checked { background: var(--ds-color-primary); } .thumb { width: 1rem; height: 1rem; background: white; border-radius: 50%; position: absolute; top: 0.125rem; left: 0.125rem; transition: 0.2s; } .checked .thumb { transform: translateX(1.25rem); }`),
  select: () => createReactFile('Select', `import React from 'react'; import s from './Select.module.css'; export const Select = ({ children, ...props }: any) => <div className={s.wrapper}><select className={s.root} {...props}>{children}</select></div>;`, `.wrapper { position: relative; } .root { width: 100%; padding: 0.5rem; border: 1px solid var(--ds-color-border); border-radius: var(--ds-geometry-radius-md); }`),
  tabs: () => createReactFile('Tabs', `import React from 'react'; import s from './Tabs.module.css'; export const Tabs = ({ items }: any) => <div className={s.root}><div className={s.list}>{items.map((i:any)=><button key={i.id} className={s.tab}>{i.label}</button>)}</div></div>;`, `.root { width: 100%; } .list { display: flex; gap: 1rem; border-bottom: 1px solid var(--ds-color-border); } .tab { padding: 0.5rem 1rem; background: none; border: none; cursor: pointer; }`),
  'form-field': () => createReactFile('FormField', `import React from 'react'; import s from './FormField.module.css'; export const FormField = ({ label, children, helper, error }: any) => <div className={s.root}><label className={s.label}>{label}</label>{children}{error && <div className={s.error}>{error}</div>}</div>;`, `.root { display: flex; flex-direction: column; gap: 0.25rem; } .label { font-size: 0.875rem; font-weight: 500; } .error { font-size: 0.75rem; color: var(--ds-color-error); }`),
  'search-box': () => createReactFile('SearchBox', `import React from 'react'; import s from './SearchBox.module.css'; export const SearchBox = ({ children }: any) => <div className={s.wrapper}><div className={s.icon}>🔍</div>{children}</div>;`, `.wrapper { position: relative; } .icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); }`),
  modal: () => createReactFile('Modal', `import React from 'react'; import s from './Modal.module.css'; export const Modal = ({ open, children }: any) => open ? <div className={s.overlay}><div className={s.dialog}>{children}</div></div> : null;`, `.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; } .dialog { background: white; padding: 1.5rem; border-radius: var(--ds-geometry-radius-lg); }`),
  navbar: () => createReactFile('Navbar', `import React from 'react'; import s from './Navbar.module.css'; export const Navbar = ({ children }: any) => <nav className={s.root}>{children}</nav>;`, `.root { width: 100%; border-bottom: 1px solid var(--ds-color-border); padding: 1rem; }`),
  drawer: () => createReactFile('Drawer', `import React from 'react'; import s from './Drawer.module.css'; export const Drawer = ({ open, children }: any) => open ? <div className={s.panel}>{children}</div> : null;`, `.panel { position: fixed; top: 0; right: 0; bottom: 0; width: 300px; background: white; box-shadow: -2px 0 5px rgba(0,0,0,0.1); }`),
  typography: () => createReactFile('Typography', `import React from 'react'; import s from './Typography.module.css'; export const Typography = ({ variant='body1', children }: any) => <div className={s[variant]}>{children}</div>;`, `.body1 { font-size: 1rem; }`),

  alert: () => createReactFile('Alert', `
import React from 'react';
import s from './Alert.module.css';

const Icons = {
  info: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
  success: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
  warning: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
  error: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
};

export const Alert = ({ children, variant='info' }: any) => (
  <div className={\`\${s.root} \${s[variant]}\`}>
    <div className={s.icon}>{Icons[variant as keyof typeof Icons] || Icons.info}</div>
    <div className={s.content}>{children}</div>
  </div>
);`, `
.root {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 1rem;
  border-radius: var(--ds-geometry-radius-md);
  border: 1px solid var(--ds-color-border);
  color: var(--ds-color-text);
  font-family: var(--ds-typography-family-base);
}

.icon {
  margin-top: 0.125rem;
  flex-shrink: 0;
  display: flex;
}

.content {
  flex: 1;
  font-size: 0.875rem;
  line-height: 1.5;
}

.info {
  background: color-mix(in srgb, var(--ds-color-info), transparent 90%);
  border-color: color-mix(in srgb, var(--ds-color-info), transparent 80%);
}

.success {
  background: color-mix(in srgb, var(--ds-color-success), transparent 90%);
  border-color: color-mix(in srgb, var(--ds-color-success), transparent 80%);
}

.warning {
  background: color-mix(in srgb, var(--ds-color-warning), transparent 90%);
  border-color: color-mix(in srgb, var(--ds-color-warning), transparent 80%);
}

.error {
  background: color-mix(in srgb, var(--ds-color-error), transparent 90%);
  border-color: color-mix(in srgb, var(--ds-color-error), transparent 80%);
}
`)
};
