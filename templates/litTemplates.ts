
import { DesignTokens, ComponentType, GeneratedFile } from '../types';

export const litTemplates: Partial<Record<ComponentType, (tokens: DesignTokens) => GeneratedFile[]>> = {
  // ... (Other templates)

  navbar: () => [{
      fileName: 'ds-navbar.ts',
      language: 'typescript',
      description: 'Lit Navbar',
      content: `import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ds-navbar')
export class DSNavbar extends LitElement {
  static styles = css\`
    :host { display: block; width: 100%; background: var(--ds-color-surface); border-bottom: 1px solid var(--ds-color-border); color: var(--ds-color-text); font-family: var(--ds-typography-family-base); }
    .container { display: flex; align-items: center; justify-content: space-between; height: 64px; padding: 0 1.5rem; max-width: 1200px; margin: 0 auto; }
    .left { display: flex; align-items: center; gap: 2rem; }
    .brand { font-weight: 700; font-size: 1.25rem; }
    ::slotted(a) { text-decoration: none; color: var(--ds-color-textDim); transition: color 0.2s; }
    ::slotted(a:hover) { color: var(--ds-color-primary); }
  \`;
  render() { return html\`<div class="container"><div class="left"><div class="brand"><slot name="brand"></slot></div><slot></slot></div><div class="right"><slot name="end"></slot></div></div>\`; }
}`
  }],
  button: () => [{
      fileName: 'ds-button.ts',
      language: 'typescript',
      description: 'Lit Component Definition',
      content: `import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import './ds-icon';

@customElement('ds-button')
export class DSButton extends LitElement {
  static styles = css\`
    :host { 
      display: inline-block; 
      vertical-align: middle;
      border-radius: var(--ds-geometry-radius-md);
    }
    button {
      font-family: var(--ds-typography-family-base); 
      border: 1px solid transparent; 
      border-radius: inherit;
      cursor: pointer; font-weight: 600; transition: all 0.2s; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
      width: 100%; height: 100%;
    }
    .primary { background: var(--ds-color-primary); color: var(--ds-color-textInverse); }
    .secondary { background: var(--ds-color-secondary); color: var(--ds-color-textInverse); }
    .outline { background: transparent; border-color: var(--ds-color-border); color: var(--ds-color-text); }
    .ghost { background: transparent; color: var(--ds-color-text); }
    .sm { font-size: 0.875rem; padding: 0.25rem 0.75rem; }
    .md { font-size: 1rem; padding: 0.5rem 1rem; }
    .lg { font-size: 1.125rem; padding: 0.75rem 1.5rem; }
  \`;
  @property() variant = 'primary';
  @property() size = 'md';
  @property() icon = '';
  
  render() { 
    return html\`
      <button class=\${classMap({[this.variant]:true, [this.size]:true})}>
        \${this.icon ? html\`<ds-icon name="\${this.icon}" size="\${this.size === 'lg' ? 'md' : 'sm'}"></ds-icon>\` : ''}
        <slot></slot>
      </button>
    \`; 
  }
}`
  }],
  
  input: () => [{
    fileName: 'ds-input.ts',
    language: 'typescript',
    description: 'Lit Input Wrapper',
    content: `import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ds-input') export class DSInput extends LitElement {
  static styles = css\`
    :host { display: block; width: 100%; font-family: var(--ds-typography-family-base); }
    ::slotted(input) { 
      width: 100%; padding: 0.5rem 0.75rem; 
      border: 1px solid var(--ds-color-border); border-radius: var(--ds-geometry-radius-md); 
      background: var(--ds-color-surface); color: var(--ds-color-text); 
      font-family: inherit; font-size: 0.875rem; outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    ::slotted(input:focus) { 
      border-color: var(--ds-color-primary); 
      box-shadow: 0 0 0 1px var(--ds-color-primary); 
    }
    :host([error]) ::slotted(input) {
      border-color: var(--ds-color-error);
    }
    :host([error]) ::slotted(input:focus) {
      box-shadow: 0 0 0 1px var(--ds-color-error);
    }
    :host([disabled]) { opacity: 0.6; pointer-events: none; }
    ::slotted(input:disabled) { cursor: not-allowed; }
  \`;
  render() { return html\`<slot></slot>\`; }
}`
  }],

  'button-group': () => [{
    fileName: 'ds-button-group.ts',
    language: 'typescript',
    description: 'Lit Button Group',
    content: `import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('ds-button-group') export class DSButtonGroup extends LitElement {
  static styles = css\`
    :host { display: inline-flex; vertical-align: middle; } 
    :host([orientation="vertical"]) { flex-direction: column; }
    :host([orientation="vertical"]) { width: fit-content; }
    
    ::slotted(*) {
       border-radius: 0 !important;
    }
    
    /* Horizontal Layout */
    :host(:not([orientation="vertical"])) ::slotted(*:first-child) { 
      border-top-left-radius: var(--ds-geometry-radius-md) !important; 
      border-bottom-left-radius: var(--ds-geometry-radius-md) !important; 
    }
    :host(:not([orientation="vertical"])) ::slotted(*:last-child) { 
      border-top-right-radius: var(--ds-geometry-radius-md) !important; 
      border-bottom-right-radius: var(--ds-geometry-radius-md) !important; 
    }
    :host(:not([orientation="vertical"])) ::slotted(*:not(:first-child)) { 
      margin-left: -1px; 
    }
    
    /* Vertical Layout */
    :host([orientation="vertical"]) ::slotted(*) {
      width: 100%;
    }
    :host([orientation="vertical"]) ::slotted(*:first-child) { 
      border-top-left-radius: var(--ds-geometry-radius-md) !important; 
      border-top-right-radius: var(--ds-geometry-radius-md) !important; 
    }
    :host([orientation="vertical"]) ::slotted(*:last-child) { 
      border-bottom-left-radius: var(--ds-geometry-radius-md) !important; 
      border-bottom-right-radius: var(--ds-geometry-radius-md) !important; 
    }
    :host([orientation="vertical"]) ::slotted(*:not(:first-child)) { 
      margin-top: -1px; 
    }

    ::slotted(*:hover), ::slotted(*:focus) { z-index: 1; position: relative; }
  \`;
  @property() orientation: 'horizontal'|'vertical' = 'horizontal';
  render() { return html\`<slot></slot>\`; }
}`
  }],
  
  'input-group': () => [{fileName:'ds-input-group.ts',language:'typescript',description:'Lit Input Group',content:`import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
@customElement('ds-input-group') export class DSInputGroup extends LitElement {
  static styles = css\`
    :host { display: flex; align-items: stretch; width: 100%; } 
    
    /* First child logic: target slotted native elements or custom elements */
    ::slotted(*:first-child) { border-top-right-radius: 0 !important; border-bottom-right-radius: 0 !important; } 
    
    /* Last child logic */
    ::slotted(*:last-child) { border-top-left-radius: 0 !important; border-bottom-left-radius: 0 !important; }
    
    /* Middle children */
    ::slotted(*:not(:first-child):not(:last-child)) { border-radius: 0 !important; }
    
    /* Overlap borders */
    ::slotted(*:not(:first-child)) { margin-left: -1px; }
    ::slotted(*:focus-within), ::slotted(*:focus) { z-index: 2; position: relative; }
  \`;
  render() { return html\`<slot></slot>\`; }
}`}],

  checkbox: () => [{fileName:'ds-checkbox.ts',language:'typescript',description:'Lit Checkbox',content:`import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('ds-checkbox') export class DSCheckbox extends LitElement {
  static styles = css\`:host { display: inline-flex; align-items: center; gap: 0.5rem; cursor: pointer; color: var(--ds-color-text); font-family: var(--ds-typography-family-base); } input { accent-color: var(--ds-color-primary); width: 1rem; height: 1rem; }\`;
  @property({type:Boolean}) checked=false; @property() label='';
  render() { return html\`<label><input type="checkbox" .checked=\${this.checked} /> \${this.label}</label>\`; }
}`}],
  badge: () => [{fileName:'ds-badge.ts',language:'typescript',description:'Lit Badge',content:`import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('ds-badge') export class DSBadge extends LitElement {
  static styles = css\`
    :host { 
      display: inline-flex; align-items: center; justify-content: center; 
      padding: 0.25em 0.75em; font-size: 0.75rem; font-weight: 500; 
      font-family: var(--ds-typography-family-base); 
      border-radius: var(--ds-geometry-radius-sm); 
      line-height: 1; white-space: nowrap; 
      border: 1px solid transparent; 
    } 
    :host([shape="pill"]) { border-radius: 9999px; }
    :host([shape="square"]) { border-radius: 0; }
    
    :host([variant="primary"]) { background: var(--ds-color-primary); color: var(--ds-color-textInverse); } 
    :host([variant="secondary"]) { background: var(--ds-color-surfaceHighlight); color: var(--ds-color-text); border-color: var(--ds-color-border); } 
    :host([variant="outline"]) { background: transparent; border-color: var(--ds-color-border); color: var(--ds-color-text); }
    
    /* Soft Variants */
    :host([variant="success"]) { 
      background: color-mix(in srgb, var(--ds-color-success), transparent 85%); 
      color: var(--ds-color-success); 
      border-color: color-mix(in srgb, var(--ds-color-success), transparent 80%);
    }
    :host([variant="warning"]) { 
      background: color-mix(in srgb, var(--ds-color-warning), transparent 85%); 
      color: var(--ds-color-warning); 
      border-color: color-mix(in srgb, var(--ds-color-warning), transparent 80%);
    }
    :host([variant="error"]) { 
      background: color-mix(in srgb, var(--ds-color-error), transparent 85%); 
      color: var(--ds-color-error); 
      border-color: color-mix(in srgb, var(--ds-color-error), transparent 80%);
    }
    :host([variant="info"]) { 
      background: color-mix(in srgb, var(--ds-color-info), transparent 85%); 
      color: var(--ds-color-info); 
      border-color: color-mix(in srgb, var(--ds-color-info), transparent 80%);
    }
  \`;
  @property() variant='primary';
  @property() shape='rounded';
  render() { return html\`<slot></slot>\`; }
}`}],
  card: () => [{fileName:'ds-card.ts',language:'typescript',description:'Lit Card',content:`import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
@customElement('ds-card') export class DSCard extends LitElement {
  static styles = css\`:host { display: block; background: var(--ds-color-surface); border: 1px solid var(--ds-color-border); border-radius: var(--ds-geometry-radius-lg); overflow: hidden; color: var(--ds-color-text); }\`;
  render() { return html\`<slot></slot>\`; }
}`}],
  select: () => [{fileName:'ds-select.ts',language:'typescript',description:'Lit Select',content:`import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ds-select') export class DSSelect extends LitElement {
  static styles = css\`
    :host { display: block; width: 100%; font-family: var(--ds-typography-family-base); }
    .wrapper { position: relative; width: 100%; }
    ::slotted(select) { 
      width: 100%; padding: 0.5rem 2.5rem 0.5rem 0.75rem; border: 1px solid var(--ds-color-border); border-radius: var(--ds-geometry-radius-md); 
      background: var(--ds-color-surface); color: var(--ds-color-text); appearance: none; -webkit-appearance: none; font-family: inherit; font-size: 0.875rem; cursor: pointer;
    }
    ::slotted(select:focus) { outline: none; border-color: var(--ds-color-primary); box-shadow: 0 0 0 1px var(--ds-color-primary); }
    .arrow {
      position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); pointer-events: none; width: 1rem; height: 1rem; color: var(--ds-color-textDim); display: flex;
    }
  \`;
  render() { 
    return html\`<div class="wrapper"><slot></slot><div class="arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></div></div>\`; 
  }
}`}],
  switch: () => [{fileName:'ds-switch.ts',language:'typescript',description:'Lit Switch',content:`import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('ds-switch') export class DSSwitch extends LitElement {
  static styles = css\`:host { display: inline-flex; align-items: center; gap: 0.5rem; cursor: pointer; } .track { width: 2.5rem; height: 1.25rem; background: var(--ds-color-secondary); border-radius: 99px; position: relative; transition: 0.2s; } .track.checked { background: var(--ds-color-primary); } .thumb { width: 1rem; height: 1rem; background: white; border-radius: 50%; position: absolute; top: 0.125rem; left: 0.125rem; transition: 0.2s; } .track.checked .thumb { transform: translateX(1.25rem); }\`;
  @property({type:Boolean}) checked=false;
  render() { return html\`<div class="track \${this.checked?'checked':''}" @click=\${()=>this.checked=!this.checked}><div class="thumb"></div></div><slot></slot>\`; }
}`}],
  'radio-group': () => [{fileName:'ds-radio-group.ts',language:'typescript',description:'Lit Radio Group',content:`import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('ds-radio-group') export class DSRadioGroup extends LitElement {
  static styles = css\`:host { display: flex; flex-direction: column; gap: 0.5rem; font-family: var(--ds-typography-family-base); } label { font-weight: 500; font-size: 0.875rem; color: var(--ds-color-text); margin-bottom: 0.25rem; }\`;
  @property() label = '';
  render() { return html\`\${this.label ? html\`<label>\${this.label}</label>\` : ''}<slot></slot>\`; }
}`}],
  avatar: () => [{fileName:'ds-avatar.ts',language:'typescript',description:'Lit Avatar',content:`import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('ds-avatar') export class DSAvatar extends LitElement {
  static styles = css\`:host { display: inline-block; vertical-align: middle; } .avatar { display: flex; align-items: center; justify-content: center; background: var(--ds-color-surfaceHighlight); color: var(--ds-color-text); overflow: hidden; font-weight: 600; font-family: var(--ds-typography-family-base); text-transform: uppercase; } .circle { border-radius: 50%; } .rounded { border-radius: var(--ds-geometry-radius-md); } .square { border-radius: 0; } .sm { width: 2rem; height: 2rem; font-size: 0.75rem; } .md { width: 3rem; height: 3rem; font-size: 1rem; } .lg { width: 4rem; height: 4rem; font-size: 1.25rem; } img { width: 100%; height: 100%; object-fit: cover; }\`;
  @property() src=''; @property() initials=''; @property() size: 'sm'|'md'|'lg' = 'md'; @property() variant: 'circle'|'rounded'|'square' = 'circle';
  render() { return html\`<div class="avatar \${this.size} \${this.variant}">\${this.src ? html\`<img src=\${this.src} />\` : this.initials}</div>\`; }
}`}],
  tabs: () => [{fileName:'ds-tabs.ts',language:'typescript',description:'Lit Tabs',content:`import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('ds-tabs') export class DSTabs extends LitElement {
  static styles = css\`
    :host { display: block; font-family: var(--ds-typography-family-base); } 
    .tab-list { display: flex; border-bottom: 1px solid var(--ds-color-border); gap: 1rem; } 
    ::slotted(ds-tab) { padding: 0.75rem 1rem; cursor: pointer; color: var(--ds-color-textDim); border-bottom: 2px solid transparent; transition: all 0.2s; margin-bottom: -1px; }
    ::slotted(ds-tab[active]) { color: var(--ds-color-primary); border-bottom-color: var(--ds-color-primary); font-weight: 500; }
  \`;
  render() { return html\`<div class="tab-list"><slot name="tab"></slot></div><slot name="panel"></slot>\`; }
}`}],
  modal: () => [{fileName:'ds-modal.ts',language:'typescript',description:'Lit Modal',content:`import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('ds-modal') export class DSModal extends LitElement {
  static styles = css\`:host { display: none; position: fixed; inset: 0; z-index: 50; } :host([open]) { display: flex; align-items: center; justify-content: center; } .backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.5); } .dialog { position: relative; background: var(--ds-color-surface); padding: 1.5rem; border-radius: var(--ds-geometry-radius-lg); min-width: 400px; color: var(--ds-color-text); }\`;
  @property({type:Boolean}) open=false;
  render() { return html\`<div class="backdrop" @click=\${()=>this.open=false}></div><div class="dialog"><slot></slot></div>\`; }
}`}],
  drawer: () => [{fileName:'ds-drawer.ts',language:'typescript',description:'Lit Drawer',content:`import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('ds-drawer') export class DSDrawer extends LitElement {
  static styles = css\`:host { display: none; position: fixed; inset: 0; z-index: 50; } :host([open]) { display: block; } .backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.5); } .panel { position: absolute; top:0; bottom:0; right:0; width: 300px; background: var(--ds-color-surface); padding: 1rem; color: var(--ds-color-text); }\`;
  @property({type:Boolean}) open=false;
  render() { return html\`<div class="backdrop" @click=\${()=>this.open=false}></div><div class="panel"><slot></slot></div>\`; }
}`}],
  'form-field': () => [{fileName:'ds-form-field.ts',language:'typescript',description:'Lit Form Field',content:`import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ds-form-field') export class DSFormField extends LitElement {
  static styles = css\`
    :host { 
      display: flex; flex-direction: column; gap: 0.375rem; 
      font-family: var(--ds-typography-family-base); width: 100%; 
    }
    ::slotted([slot="label"]) { 
      font-size: 0.875rem; font-weight: 500; color: var(--ds-color-text); margin-bottom: 0.125rem; display: block;
    }
    ::slotted([slot="helper"]) { 
      font-size: 0.75rem; color: var(--ds-color-textDim); margin-top: 0.125rem; display: block;
    }
    ::slotted([slot="error"]) { 
      font-size: 0.75rem; color: var(--ds-color-error); margin-top: 0.125rem; display: block;
    }
  \`;
  
  render() { 
    return html\`
      <slot name="label"></slot>
      <slot></slot>
      <slot name="error"></slot>
      <slot name="helper"></slot>
    \`; 
  }
}`}],
  alert: () => [{fileName:'ds-alert.ts',language:'typescript',description:'Lit Alert',content:`import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './ds-icon';
@customElement('ds-alert') export class DSAlert extends LitElement {
  static styles = css\`
    :host { display: flex; gap: 0.75rem; align-items: flex-start; padding: 1rem; border-radius: var(--ds-geometry-radius-md); background: var(--ds-color-surfaceHighlight); border: 1px solid var(--ds-color-border); color: var(--ds-color-text); font-family: var(--ds-typography-family-base); }
    :host([variant="info"]) { background: color-mix(in srgb, var(--ds-color-info), transparent 90%); border-color: color-mix(in srgb, var(--ds-color-info), transparent 80%); }
    :host([variant="success"]) { background: color-mix(in srgb, var(--ds-color-success), transparent 90%); border-color: color-mix(in srgb, var(--ds-color-success), transparent 80%); }
    :host([variant="warning"]) { background: color-mix(in srgb, var(--ds-color-warning), transparent 90%); border-color: color-mix(in srgb, var(--ds-color-warning), transparent 80%); }
    :host([variant="error"]) { background: color-mix(in srgb, var(--ds-color-error), transparent 90%); border-color: color-mix(in srgb, var(--ds-color-error), transparent 80%); }
    .icon { margin-top: 0.125rem; flex-shrink: 0; } .content { flex: 1; font-size: 0.875rem; line-height: 1.5; }
  \`;
  @property() variant: 'info'|'success'|'warning'|'error' = 'info';
  render() { 
    const icons = { info: 'info', success: 'check', warning: 'alert', error: 'close' };
    const iconName = icons[this.variant] || 'info';
    return html\`<div class="icon"><ds-icon name="\${iconName}" size="sm"></ds-icon></div><div class="content"><slot></slot></div>\`; 
  }
}`}],
  spinner: () => [{fileName:'ds-spinner.ts',language:'typescript',description:'Lit Spinner',content:`import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('ds-spinner') export class DSSpinner extends LitElement {
  static styles = css\`:host { display: inline-block; width: 1.5rem; height: 1.5rem; border: 2px solid var(--ds-color-border); border-top-color: var(--ds-color-primary); border-radius: 50%; animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }\`;
  render() { return html\`\`; }
}`}],
  divider: () => [{fileName:'ds-divider.ts',language:'typescript',description:'Lit Divider',content:`import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('ds-divider') export class DSDivider extends LitElement {
  static styles = css\`:host { display: block; height: 1px; background: var(--ds-color-border); margin: 1rem 0; }\`;
  render() { return html\`\`; }
}`}],
  typography: () => [{fileName:'ds-typography.ts',language:'typescript',description:'Lit Typography',content:`import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('ds-typography') export class DSTypography extends LitElement {
  static styles = css\`:host { display: block; font-family: var(--ds-typography-family-base); color: var(--ds-color-text); } :host([variant="h1"]) { font-size: var(--ds-typography-variants-h1-fontSize); } :host([variant="body1"]) { font-size: var(--ds-typography-variants-body1-fontSize); }\`;
  @property() variant = 'body1';
  render() { return html\`<slot></slot>\`; }
}`}],
  link: () => [{fileName:'ds-link.ts',language:'typescript',description:'Lit Link',content:`import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('ds-link') export class DSLink extends LitElement {
  static styles = css\`:host { display: inline; color: var(--ds-color-primary); text-decoration: underline; cursor: pointer; }\`;
  @property() href='';
  render() { return html\`<a href="\${this.href}"><slot></slot></a>\`; }
}`}],
  label: () => [{fileName:'ds-label.ts',language:'typescript',description:'Lit Label',content:`import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('ds-label') export class DSLabel extends LitElement {
  static styles = css\`:host { display: block; font-size: 0.875rem; font-weight: 500; color: var(--ds-color-text); margin-bottom: 0.25rem; }\`;
  @property() text='';
  render() { return html\`\${this.text}\`; }
}`}],
  icon: () => [{fileName:'ds-icon.ts',language:'typescript',description:'Lit Icon',content:`import { html, css, LitElement, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const ICONS: any = { 
  menu: svg\`<path d="M4 6h16M4 12h16M4 18h16" />\`, 
  search: svg\`<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>\`,
  check: svg\`<polyline points="20 6 9 17 4 12"></polyline>\`,
  info: svg\`<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>\`,
  alert: svg\`<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>\`,
  close: svg\`<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>\`,
  user: svg\`<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>\`,
  home: svg\`<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>\`,
  settings: svg\`<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>\`
};
@customElement('ds-icon') export class DSIcon extends LitElement {
  static styles = css\`:host { display: inline-flex; width: 1.5rem; height: 1.5rem; color: currentColor; } svg { width: 100%; height: 100%; fill: none; stroke: currentColor; stroke-width: 2; }\`;
  @property() name=''; @property() size='md'; @property() color='';
  render() { return html\`<svg viewBox="0 0 24 24">\${ICONS[this.name] || ICONS['menu']}</svg>\`; }
}`}],
  image: () => [{fileName:'ds-image.ts',language:'typescript',description:'Lit Image',content:`import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('ds-image') export class DSImage extends LitElement {
  static styles = css\`:host { display: block; width: 100%; overflow: hidden; } .wrapper { width: 100%; position: relative; border-radius: inherit; } img { width: 100%; height: 100%; object-fit: cover; display: block; }\`;
  @property() src=''; @property() aspectRatio='16:9'; @property() radius='md';
  render() { return html\`<div class="wrapper"><img src="\${this.src}" /></div>\`; }
}`}],
  'checkbox-group': () => [{fileName:'ds-checkbox-group.ts',language:'typescript',description:'Lit Checkbox Group',content:`import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('ds-checkbox-group') export class DSCheckboxGroup extends LitElement {
  static styles = css\`:host { display: flex; flex-direction: column; gap: 0.5rem; font-family: var(--ds-typography-family-base); } label { font-weight: 500; font-size: 0.875rem; color: var(--ds-color-text); margin-bottom: 0.25rem; }\`;
  @property() label = '';
  render() { return html\`\${this.label ? html\`<label>\${this.label}</label>\` : ''}<slot></slot>\`; }
}`}],
  
  'search-box': () => [{fileName:'ds-search-box.ts',language:'typescript',description:'Lit Search Box',content:`import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './ds-icon'; 

@customElement('ds-search-box') export class DSSearchBox extends LitElement {
  static styles = css\`
    :host { display: block; width: 100%; font-family: var(--ds-typography-family-base); }
    .wrapper { position: relative; width: 100%; }
    .icon { 
      position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%);
      color: var(--ds-color-textDim); pointer-events: none;
      z-index: 10;
      display: flex;
    }
    ::slotted(input) { 
      width: 100%; padding: 0.5rem 0.75rem 0.5rem 2.5rem; 
      border: 1px solid var(--ds-color-border); border-radius: var(--ds-geometry-radius-md); 
      background: var(--ds-color-surface); color: var(--ds-color-text);
      outline: none; font-family: inherit; font-size: 0.875rem;
    }
    ::slotted(input:focus) { border-color: var(--ds-color-primary); box-shadow: 0 0 0 1px var(--ds-color-primary); }
  \`;
  render() { 
    return html\`
      <div class="wrapper">
        <div class="icon"><ds-icon name="search" size="sm"></ds-icon></div>
        <slot></slot>
      </div>
    \`; 
  }
}`}]
};
