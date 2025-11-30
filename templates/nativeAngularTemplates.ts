
import { DesignTokens, ComponentType, GeneratedFile } from '../types';

const createAngularFile = (
  className: string, 
  selector: string, 
  template: string, 
  styles: string, 
  logic: string = ''
): GeneratedFile[] => [
  {
    fileName: `${className.toLowerCase()}.component.ts`,
    language: 'typescript',
    description: `Angular ${className} Component`,
    content: `
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: '${selector}',
  standalone: true,
  imports: [CommonModule${logic.includes('IconComponent') ? ', IconComponent' : ''}],
  template: \`
${template.trim()}
  \`,
  styles: [\`
${styles.trim()}
  \`]
})
export class ${className}Component {
${logic.replace(', IconComponent', '').trim()}
}
`.trim()
  }
];

export const nativeAngularTemplates: Partial<Record<ComponentType, (tokens: DesignTokens) => GeneratedFile[]>> = {
  // ... (Keep existing simple templates)
  
  button: () => [
    {
    fileName: `button.component.ts`,
    language: 'typescript',
    description: `Angular Button Component`,
    content: `
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: \`
<button [class]="'root ' + variant + ' ' + size" [disabled]="disabled">
  <app-icon *ngIf="icon" [name]="icon" [size]="size === 'lg' ? 'md' : 'sm'"></app-icon>
  <ng-content></ng-content>
</button>
  \`,
  styles: [\`
.root { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.5rem 1rem; border-radius: var(--ds-geometry-radius-md); font-weight: 600; cursor: pointer; border: 1px solid transparent; } .primary { background: var(--ds-color-primary); color: white; }
  \`]
})
export class ButtonComponent {
@Input() variant = 'primary'; @Input() size = 'md'; @Input() disabled = false; @Input() icon = '';
}
`.trim()
  }
  ],
  
  icon: () => createAngularFile('Icon', 'app-icon', `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" [class]="size" [ngSwitch]="name">
       <path *ngSwitchCase="'menu'" d="M4 6h16M4 12h16M4 18h16"></path>
       <g *ngSwitchCase="'search'"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></g>
       <polyline *ngSwitchCase="'check'" points="20 6 9 17 4 12"></polyline>
       <g *ngSwitchCase="'info'"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></g>
       <g *ngSwitchCase="'alert'"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></g>
       <g *ngSwitchCase="'close'"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></g>
       <g *ngSwitchCase="'user'"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g>
       <g *ngSwitchCase="'home'"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></g>
       <g *ngSwitchCase="'settings'"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></g>
    </svg>
  `, `
    :host { display: inline-flex; vertical-align: middle; }
    .sm { width: 1rem; height: 1rem; }
    .md { width: 1.5rem; height: 1.5rem; }
    .lg { width: 2rem; height: 2rem; }
  `, `@Input() name=''; @Input() size='md';`),

  'button-group': () => createAngularFile('ButtonGroup', 'app-button-group', `
    <div [class]="'root ' + orientation">
      <ng-content></ng-content>
    </div>
  `, `
    :host { display: inline-block; }
    .root { display: inline-flex; }
    .vertical { flex-direction: column; }
    
    /* Reset radius for all projected children */
    ::ng-deep .root > * { border-radius: 0 !important; }

    /* Horizontal Merging */
    ::ng-deep .root:not(.vertical) > *:first-child { 
      border-top-left-radius: var(--ds-geometry-radius-md) !important; 
      border-bottom-left-radius: var(--ds-geometry-radius-md) !important; 
    }
    ::ng-deep .root:not(.vertical) > *:last-child { 
      border-top-right-radius: var(--ds-geometry-radius-md) !important; 
      border-bottom-right-radius: var(--ds-geometry-radius-md) !important; 
    }
    ::ng-deep .root:not(.vertical) > *:not(:first-child) { 
      margin-left: -1px; 
    }
    
    /* Vertical Merging */
    ::ng-deep .root.vertical > *:first-child { 
      border-top-left-radius: var(--ds-geometry-radius-md) !important; 
      border-top-right-radius: var(--ds-geometry-radius-md) !important; 
    }
    ::ng-deep .root.vertical > *:last-child { 
      border-bottom-left-radius: var(--ds-geometry-radius-md) !important; 
      border-bottom-right-radius: var(--ds-geometry-radius-md) !important; 
    }
    ::ng-deep .root.vertical > *:not(:first-child) { 
      margin-top: -1px; 
    }
  `, `@Input() orientation: 'horizontal' | 'vertical' = 'horizontal';`),

  'input-group': () => createAngularFile('InputGroup', 'app-input-group', `
    <div class="root">
      <ng-content></ng-content>
    </div>
  `, `
    :host { display: block; width: 100%; }
    .root { display: flex; align-items: stretch; width: 100%; }
    
    ::ng-deep .root > * { border-radius: 0 !important; }

    ::ng-deep .root > *:first-child { border-top-left-radius: var(--ds-geometry-radius-md) !important; border-bottom-left-radius: var(--ds-geometry-radius-md) !important; }
    ::ng-deep .root > *:last-child { border-top-right-radius: var(--ds-geometry-radius-md) !important; border-bottom-right-radius: var(--ds-geometry-radius-md) !important; }
    
    ::ng-deep .root > *:not(:first-child) { margin-left: -1px; }
  `, ``),

  input: () => createAngularFile('Input', 'app-input', `<input [type]="type" [placeholder]="placeholder" class="input" />`, `.input { width: 100%; padding: 0.5rem; border: 1px solid var(--ds-color-border); border-radius: var(--ds-geometry-radius-md); }`, `@Input() type='text'; @Input() placeholder='';`),
  card: () => createAngularFile('Card', 'app-card', `<div class="card"><ng-content></ng-content></div>`, `.card { background: var(--ds-color-surface); border: 1px solid var(--ds-color-border); border-radius: var(--ds-geometry-radius-lg); padding: 1.5rem; }`, ``),
  badge: () => createAngularFile('Badge', 'app-badge', `<span [class]="'badge ' + variant"><ng-content></ng-content></span>`, `.badge { padding: 0.25em 0.75em; border-radius: var(--ds-geometry-radius-sm); font-size: 0.75rem; font-weight: 500; } .primary { background: var(--ds-color-primary); color: white; }`, `@Input() variant='primary';`),
  switch: () => createAngularFile('Switch', 'app-switch', `<button [class.checked]="checked" (click)="checked=!checked" class="track"><span class="thumb"></span></button>`, `.track { width: 2.5rem; height: 1.25rem; background: var(--ds-color-secondary); border-radius: 99px; position: relative; } .checked { background: var(--ds-color-primary); } .thumb { width: 1rem; height: 1rem; background: white; border-radius: 50%; position: absolute; left: 0.125rem; transition: 0.2s; } .checked .thumb { transform: translateX(1.25rem); }`, `@Input() checked=false;`),
  select: () => createAngularFile('Select', 'app-select', `<div class="wrapper"><ng-content></ng-content></div>`, `.wrapper { position: relative; }`, ``),
  tabs: () => createAngularFile('Tabs', 'app-tabs', `<div class="tabs"><div class="list"><button *ngFor="let t of tabs">{{t.label}}</button></div><ng-content></ng-content></div>`, `.list { display: flex; gap: 1rem; border-bottom: 1px solid var(--ds-color-border); }`, `@Input() tabs: any[] = [];`),
  modal: () => createAngularFile('Modal', 'app-modal', `<div *ngIf="open" class="overlay"><div class="dialog"><ng-content></ng-content></div></div>`, `.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; } .dialog { background: white; padding: 1.5rem; }`, `@Input() open=false;`),
  avatar: () => createAngularFile('Avatar', 'app-avatar', `<div class="avatar"><ng-content></ng-content></div>`, `.avatar { overflow: hidden; border-radius: 50%; width: 3rem; height: 3rem; background: #eee; }`, ``),
  navbar: () => createAngularFile('Navbar', 'app-navbar', `<nav><ng-content></ng-content></nav>`, `nav { border-bottom: 1px solid var(--ds-color-border); padding: 1rem; }`, ``),
  drawer: () => createAngularFile('Drawer', 'app-drawer', `<div *ngIf="open" class="panel"><ng-content></ng-content></div>`, `.panel { position: fixed; top: 0; right: 0; bottom: 0; width: 300px; background: white; box-shadow: -2px 0 5px rgba(0,0,0,0.1); }`, `@Input() open=false;`),
  typography: () => createAngularFile('Typography', 'app-typography', `<p [class]="variant"><ng-content></ng-content></p>`, `.body1 { font-size: 1rem; }`, `@Input() variant='body1';`),
  'form-field': () => createAngularFile('FormField', 'app-form-field', `<div class="root"><label>{{label}}</label><ng-content></ng-content><div *ngIf="error" class="error">{{error}}</div></div>`, `.root { display: flex; flex-direction: column; gap: 0.25rem; } .error { color: var(--ds-color-error); font-size: 0.75rem; }`, `@Input() label=''; @Input() error='';`),
  'search-box': () => createAngularFile('SearchBox', 'app-search-box', `<div class="wrapper"><div class="icon">🔍</div><ng-content></ng-content></div>`, `.wrapper { position: relative; } .icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); }`, ``),
  
  alert: () => createAngularFile('Alert', 'app-alert', `
    <div [class]="'root ' + variant">
      <div class="icon" [ngSwitch]="variant">
        <svg *ngSwitchCase="'info'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        <svg *ngSwitchCase="'success'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <svg *ngSwitchCase="'warning'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        <svg *ngSwitchCase="'error'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
      </div>
      <div class="content"><ng-content></ng-content></div>
    </div>
  `, `
    .root {
      display: flex; gap: 0.75rem; align-items: flex-start;
      padding: 1rem;
      border: 1px solid var(--ds-color-border);
      border-radius: var(--ds-geometry-radius-md);
      color: var(--ds-color-text);
      font-family: var(--ds-typography-family-base);
    }
    .icon { margin-top: 0.125rem; flex-shrink: 0; display: flex; }
    .content { flex: 1; font-size: 0.875rem; line-height: 1.5; }

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
  `, `@Input() variant='info';`)
};
