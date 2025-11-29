import { DesignTokens, ComponentType, GeneratedFile } from '../types';

export const litTemplates: Record<ComponentType, (tokens: DesignTokens) => GeneratedFile[]> = {
  button: () => [
    {
      fileName: 'ds-button.ts',
      language: 'typescript',
      description: 'Lit Component Definition',
      content: `import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ds-button')
export class DSButton extends LitElement {
  static styles = css\`
    :host {
      display: inline-block;
      --btn-font: var(--ds-typography-family-base);
      --btn-radius: var(--ds-geometry-radius-md);
      --btn-transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    button {
      font-family: var(--btn-font);
      border: var(--ds-geometry-border-width) solid transparent;
      border-radius: var(--btn-radius);
      cursor: pointer;
      font-weight: var(--ds-typography-weight-bold);
      transition: all var(--btn-transition);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--ds-geometry-spacing-base);
      outline: none;
      position: relative;
    }

    button:focus-visible {
      box-shadow: 0 0 0 2px var(--ds-color-background), 0 0 0 4px var(--ds-color-primary);
    }

    button:active:not([disabled]) {
      transform: scale(0.97);
    }
    
    button:hover:not([disabled]) {
       transform: translateY(-1px);
       box-shadow: var(--ds-effect-shadow-sm);
    }

    /* SIZES */
    .sm {
      font-size: var(--ds-typography-size-sm);
      padding: calc(var(--ds-geometry-spacing-base) * 1.5) calc(var(--ds-geometry-spacing-base) * 3);
    }
    .md {
      font-size: var(--ds-typography-size-md);
      padding: calc(var(--ds-geometry-spacing-base) * 2.5) calc(var(--ds-geometry-spacing-base) * 4);
    }
    .lg {
      font-size: var(--ds-typography-size-lg);
      padding: calc(var(--ds-geometry-spacing-base) * 3.5) calc(var(--ds-geometry-spacing-base) * 6);
    }

    /* VARIANTS */
    .primary {
      background-color: var(--ds-color-primary);
      color: var(--ds-color-textInverse);
    }
    .primary:hover:not([disabled]) {
      background-color: var(--ds-color-primaryHover);
    }

    .secondary {
      background-color: var(--ds-color-secondary);
      color: var(--ds-color-textInverse);
    }
    .secondary:hover:not([disabled]) {
      background-color: var(--ds-color-secondaryHover);
    }

    .outline {
      background-color: transparent;
      border-color: var(--ds-color-border);
      color: var(--ds-color-text);
    }
    .outline:hover:not([disabled]) {
      background-color: var(--ds-color-surface);
      border-color: var(--ds-color-primary);
      color: var(--ds-color-primary);
    }

    .ghost {
      background-color: transparent;
      color: var(--ds-color-text);
    }
    .ghost:hover:not([disabled]) {
      background-color: var(--ds-color-surface);
      color: var(--ds-color-primary);
    }

    .link {
      background-color: transparent;
      color: var(--ds-color-primary);
      text-decoration: underline;
      padding-left: 0;
      padding-right: 0;
    }
    .link:hover:not([disabled]) {
      color: var(--ds-color-primaryHover);
      box-shadow: none;
      transform: none;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
      box-shadow: none;
    }
  \`;

  @property({ type: String }) variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' = 'primary';
  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) type: 'button' | 'submit' | 'reset' = 'button';

  render() {
    const classes = {
      [this.variant]: true,
      [this.size]: true,
    };

    return html\`
      <button 
        class=\${classMap(classes)} 
        ?disabled=\${this.disabled} 
        type=\${this.type}
        part="button"
      >
        <slot></slot>
      </button>
    \`;
  }
}`
    },
    {
      fileName: 'ds-button.react.ts',
      language: 'typescript',
      description: 'React Wrapper',
      content: `import React from 'react';
import { createComponent } from '@lit/react';
import { DSButton as DSButtonElement } from './ds-button';

export const DSButton = createComponent({
  tagName: 'ds-button',
  elementClass: DSButtonElement,
  react: React,
  events: {
    onClick: 'click',
  },
});`
    },
    {
      fileName: 'ds-button.angular.ts',
      language: 'typescript',
      description: 'Angular Directive Proxy',
      content: `import { Directive, ElementRef, Input } from '@angular/core';
import './ds-button';

@Directive({
  selector: 'ds-button',
  standalone: true
})
export class DSButtonDirective {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled: boolean = false;
  
  constructor(private el: ElementRef) {}
}`
    }
  ],
  input: () => [
    {
      fileName: 'ds-input.ts',
      language: 'typescript',
      description: 'Lit Input Atom',
      content: `import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ds-input')
export class DSInput extends LitElement {
  static styles = css\`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--ds-geometry-spacing-base);
      font-family: var(--ds-typography-family-base);
      width: 100%;
    }

    :host([disabled]) {
      opacity: 0.6;
      pointer-events: none;
    }

    label {
      font-size: var(--ds-typography-size-sm);
      font-weight: var(--ds-typography-weight-bold);
      color: var(--ds-color-text);
      transition: color 0.2s;
    }

    label.error {
      color: var(--ds-color-error);
    }

    input {
      width: 100%;
      padding: calc(var(--ds-geometry-spacing-base) * 2.5) calc(var(--ds-geometry-spacing-base) * 3);
      border: var(--ds-geometry-border-width) solid var(--ds-color-border);
      border-radius: var(--ds-geometry-radius-md);
      background: var(--ds-color-surface);
      color: var(--ds-color-text);
      font-family: inherit;
      outline: none;
      transition: all 0.2s;
      box-sizing: border-box;
      font-size: var(--ds-typography-size-md);
    }

    input:focus {
      border-color: var(--ds-color-primary);
      box-shadow: 0 0 0 2px var(--ds-color-primary); 
    }

    input.error {
      border-color: var(--ds-color-error);
    }

    input.error:focus {
      box-shadow: 0 0 0 2px var(--ds-color-error); 
    }
  \`;

  @property({ type: String }) label = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) value = '';
  @property({ type: String }) type = 'text';
  @property({ type: Boolean }) error = false;
  @property({ type: Boolean }) disabled = false;

  private _handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('ds-input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html\`
      \${this.label ? html\`<label class=\${classMap({ error: this.error })}>\${this.label}</label>\` : ''}
      <input
        class=\${classMap({ error: this.error })}
        .type=\${this.type}
        .value=\${this.value}
        .placeholder=\${this.placeholder}
        ?disabled=\${this.disabled}
        @input=\${this._handleInput}
      />
    \`;
  }
}`
    },
    { fileName: 'ds-input.react.ts', language: 'typescript', description: 'React Wrapper', content: `import React from 'react';
import { createComponent } from '@lit/react';
import { DSInput as DSInputElement } from './ds-input';

export const DSInput = createComponent({
  tagName: 'ds-input',
  elementClass: DSInputElement,
  react: React,
  events: {
    onInput: 'ds-input',
  },
});` },
    { fileName: 'ds-input.angular.ts', language: 'typescript', description: 'Angular Directive', content: `import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import './ds-input';

@Directive({
  selector: 'ds-input',
  standalone: true
})
export class DSInputDirective {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() value = '';
  @Input() type = 'text';
  @Input() error = false;
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<string>();

  constructor(private el: ElementRef) {
    el.nativeElement.addEventListener('ds-input', (e: CustomEvent) => {
      this.valueChange.emit(e.detail.value);
    });
  }
}` }
  ],
  checkbox: () => [
    {
      fileName: 'ds-checkbox.ts',
      language: 'typescript',
      description: 'Lit Checkbox',
      content: `import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ds-checkbox')
export class DSCheckbox extends LitElement {
  static styles = css\`
    :host {
      display: inline-flex;
      align-items: center;
      gap: calc(var(--ds-geometry-spacing-base) * 2);
      font-family: var(--ds-typography-family-base);
      cursor: pointer;
    }
    
    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
      cursor: not-allowed;
    }

    input {
      appearance: auto;
      -webkit-appearance: auto;
      accent-color: var(--ds-color-primary);
      width: 1.25rem;
      height: 1.25rem;
      cursor: pointer;
    }
    
    input:disabled {
      cursor: not-allowed;
    }

    span {
      font-size: var(--ds-typography-size-md);
      color: var(--ds-color-text);
    }
  \`;

  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) indeterminate = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';

  render() {
    return html\`
      <label>
        <input 
          type="checkbox" 
          .checked=\${this.checked} 
          .indeterminate=\${this.indeterminate}
          ?disabled=\${this.disabled}
        />
        <span>\${this.label}</span>
      </label>
    \`;
  }
}`
    }
  ],
  radio: () => [
    {
      fileName: 'ds-radio.ts',
      language: 'typescript',
      description: 'Lit Radio',
      content: `import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ds-radio')
export class DSRadio extends LitElement {
  static styles = css\`
    :host {
      display: inline-flex;
      align-items: center;
      gap: calc(var(--ds-geometry-spacing-base) * 2);
      font-family: var(--ds-typography-family-base);
      cursor: pointer;
    }
    
    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
      cursor: not-allowed;
    }

    input {
      appearance: auto;
      -webkit-appearance: auto;
      accent-color: var(--ds-color-primary);
      width: 1.25rem;
      height: 1.25rem;
      cursor: pointer;
      margin: 0;
    }
    
    input:disabled {
      cursor: not-allowed;
    }

    span {
      font-size: var(--ds-typography-size-md);
      color: var(--ds-color-text);
    }
  \`;

  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';
  @property({ type: String }) name = '';

  private _handleChange(e: Event) {
    this.checked = (e.target as HTMLInputElement).checked;
    this.dispatchEvent(new CustomEvent('ds-change', {
      detail: { checked: this.checked, value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html\`
      <label>
        <input 
          type="radio" 
          .name=\${this.name}
          .checked=\${this.checked} 
          .value=\${this.value}
          ?disabled=\${this.disabled}
          @change=\${this._handleChange}
        />
        \${this.label ? html\`<span>\${this.label}</span>\` : ''}
      </label>
    \`;
  }
}`
    },
    {
      fileName: 'ds-radio.react.ts',
      language: 'typescript',
      description: 'React Wrapper',
      content: `import React from 'react';
import { createComponent } from '@lit/react';
import { DSRadio as DSRadioElement } from './ds-radio';

export const DSRadio = createComponent({
  tagName: 'ds-radio',
  elementClass: DSRadioElement,
  react: React,
  events: {
    onChange: 'ds-change',
  },
});`
    },
    {
      fileName: 'ds-radio.angular.ts',
      language: 'typescript',
      description: 'Angular Directive',
      content: `import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import './ds-radio';

@Directive({
  selector: 'ds-radio',
  standalone: true
})
export class DSRadioDirective {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() label = '';
  @Input() value = '';
  @Input() name = '';
  @Output() checkedChange = new EventEmitter<any>();

  constructor(private el: ElementRef) {
    el.nativeElement.addEventListener('ds-change', (e: CustomEvent) => {
      this.checkedChange.emit(e.detail);
    });
  }
}`
    }
  ],
  'radio-group': () => [
    {
      fileName: 'ds-radio-group.ts',
      language: 'typescript',
      description: 'Lit Radio Group',
      content: `import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ds-radio-group')
export class DSRadioGroup extends LitElement {
  static styles = css\`
    :host {
      display: block;
      font-family: var(--ds-typography-family-base);
    }

    fieldset {
      border: none;
      padding: 0;
      margin: 0;
    }

    legend {
      font-size: var(--ds-typography-size-sm);
      font-weight: var(--ds-typography-weight-bold);
      color: var(--ds-color-text);
      margin-bottom: var(--ds-geometry-spacing-base);
    }

    .group {
      display: flex;
      gap: calc(var(--ds-geometry-spacing-base) * 2);
    }

    .group.vertical {
      flex-direction: column;
    }

    .group.horizontal {
      flex-direction: row;
      flex-wrap: wrap;
    }

    .error-msg {
      margin-top: var(--ds-geometry-spacing-base);
      font-size: var(--ds-typography-size-sm);
      color: var(--ds-color-error);
    }
  \`;

  @property({ type: String }) label = '';
  @property({ type: String }) error = '';
  @property({ type: String }) direction: 'vertical' | 'horizontal' = 'vertical';

  render() {
    return html\`
      <fieldset>
        \${this.label ? html\`<legend>\${this.label}</legend>\` : ''}
        <div class=\${classMap({ group: true, [this.direction]: true })}>
          <slot></slot>
        </div>
        \${this.error ? html\`<div class="error-msg">\${this.error}</div>\` : ''}
      </fieldset>
    \`;
  }
}`
    },
    {
      fileName: 'ds-radio-group.react.ts',
      language: 'typescript',
      description: 'React Wrapper',
      content: `import React from 'react';
import { createComponent } from '@lit/react';
import { DSRadioGroup as DSRadioGroupElement } from './ds-radio-group';

export const DSRadioGroup = createComponent({
  tagName: 'ds-radio-group',
  elementClass: DSRadioGroupElement,
  react: React,
});`
    },
    {
      fileName: 'ds-radio-group.angular.ts',
      language: 'typescript',
      description: 'Angular Directive',
      content: `import { Directive, ElementRef, Input } from '@angular/core';
import './ds-radio-group';

@Directive({
  selector: 'ds-radio-group',
  standalone: true
})
export class DSRadioGroupDirective {
  @Input() label = '';
  @Input() error = '';
  @Input() direction: 'vertical' | 'horizontal' = 'vertical';
  
  constructor(private el: ElementRef) {}
}`
    }
  ],
  alert: () => [
    {
      fileName: 'ds-alert.ts',
      language: 'typescript',
      description: 'Lit Alert',
      content: `import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ds-alert')
export class DSAlert extends LitElement {
  static styles = css\`
    :host {
      display: block;
      font-family: var(--ds-typography-family-base);
      width: 100%;
    }

    .alert {
      padding: calc(var(--ds-geometry-spacing-base) * 3);
      border-radius: var(--ds-geometry-radius-md);
      border: 1px solid transparent;
      display: flex;
      flex-direction: column;
      gap: var(--ds-geometry-spacing-base);
    }

    .title {
      font-weight: var(--ds-typography-weight-bold);
      font-size: var(--ds-typography-size-md);
      line-height: 1.4;
    }

    .content {
      font-size: var(--ds-typography-size-sm);
      line-height: 1.5;
    }

    /* VARIANTS */
    .info {
      background-color: color-mix(in srgb, var(--ds-color-info) 10%, var(--ds-color-surface));
      border-color: color-mix(in srgb, var(--ds-color-info) 30%, transparent);
      color: var(--ds-color-text);
    }
    .info .title { color: var(--ds-color-info); }

    .success {
      background-color: color-mix(in srgb, var(--ds-color-success) 10%, var(--ds-color-surface));
      border-color: color-mix(in srgb, var(--ds-color-success) 30%, transparent);
      color: var(--ds-color-text);
    }
    .success .title { color: var(--ds-color-success); }

    .warning {
      background-color: color-mix(in srgb, var(--ds-color-warning) 10%, var(--ds-color-surface));
      border-color: color-mix(in srgb, var(--ds-color-warning) 30%, transparent);
      color: var(--ds-color-text);
    }
    .warning .title { color: var(--ds-color-warning); }

    .error {
      background-color: color-mix(in srgb, var(--ds-color-error) 10%, var(--ds-color-surface));
      border-color: color-mix(in srgb, var(--ds-color-error) 30%, transparent);
      color: var(--ds-color-text);
    }
    .error .title { color: var(--ds-color-error); }
  \`;

  @property({ type: String }) variant: 'info' | 'success' | 'warning' | 'error' = 'info';
  @property({ type: String }) title = '';

  render() {
    return html\`
      <div class=\${classMap({ alert: true, [this.variant]: true })}>
        \${this.title ? html\`<div class="title">\${this.title}</div>\` : ''}
        <div class="content"><slot></slot></div>
      </div>
    \`;
  }
}`
    },
    {
      fileName: 'ds-alert.react.ts',
      language: 'typescript',
      description: 'React Wrapper',
      content: `import React from 'react';
import { createComponent } from '@lit/react';
import { DSAlert as DSAlertElement } from './ds-alert';

export const DSAlert = createComponent({
  tagName: 'ds-alert',
  elementClass: DSAlertElement,
  react: React,
});`
    },
    {
      fileName: 'ds-alert.angular.ts',
      language: 'typescript',
      description: 'Angular Directive',
      content: `import { Directive, ElementRef, Input } from '@angular/core';
import './ds-alert';

@Directive({
  selector: 'ds-alert',
  standalone: true
})
export class DSAlertDirective {
  @Input() variant: 'info' | 'success' | 'warning' | 'error' = 'info';
  @Input() title = '';
  constructor(private el: ElementRef) {}
}`
    }
  ],
  switch: () => [
    {
      fileName: 'ds-switch.ts',
      language: 'typescript',
      description: 'Lit Switch',
      content: `import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ds-switch')
export class DSSwitch extends LitElement {
  static styles = css\`
    :host {
      display: inline-flex;
      align-items: center;
      gap: calc(var(--ds-geometry-spacing-base) * 2);
      font-family: var(--ds-typography-family-base);
      cursor: pointer;
    }
    
    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
      cursor: not-allowed;
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 2.75rem;
      height: 1.5rem;
    }

    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--ds-color-secondary);
      transition: .4s;
      border-radius: 2rem;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 1.125rem;
      width: 1.125rem;
      left: 0.1875rem;
      bottom: 0.1875rem;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }

    input:checked + .slider {
      background-color: var(--ds-color-primary);
    }

    input:checked + .slider:before {
      transform: translateX(1.25rem);
    }

    input:focus-visible + .slider {
      box-shadow: 0 0 0 2px var(--ds-color-background), 0 0 0 4px var(--ds-color-primary);
    }

    span {
      font-size: var(--ds-typography-size-md);
      color: var(--ds-color-text);
    }
  \`;

  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) label = '';

  private _handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.checked = target.checked;
    this.dispatchEvent(new CustomEvent('ds-change', {
      detail: { checked: this.checked },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html\`
      <label class="switch">
        <input 
          type="checkbox" 
          .checked=\${this.checked} 
          ?disabled=\${this.disabled}
          @change=\${this._handleChange}
        />
        <span class="slider"></span>
      </label>
      \${this.label ? html\`<span>\${this.label}</span>\` : ''}
    \`;
  }
}`
    },
    {
      fileName: 'ds-switch.react.ts',
      language: 'typescript',
      description: 'React Wrapper',
      content: `import React from 'react';
import { createComponent } from '@lit/react';
import { DSSwitch as DSSwitchElement } from './ds-switch';

export const DSSwitch = createComponent({
  tagName: 'ds-switch',
  elementClass: DSSwitchElement,
  react: React,
  events: {
    onChange: 'ds-change',
  },
});`
    },
    {
      fileName: 'ds-switch.angular.ts',
      language: 'typescript',
      description: 'Angular Directive',
      content: `import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import './ds-switch';

@Directive({
  selector: 'ds-switch',
  standalone: true
})
export class DSSwitchDirective {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() label = '';
  @Output() checkedChange = new EventEmitter<boolean>();

  constructor(private el: ElementRef) {
    el.nativeElement.addEventListener('ds-change', (e: CustomEvent) => {
      this.checkedChange.emit(e.detail.checked);
    });
  }
}`
    }
  ],
  badge: () => [
    {
      fileName: 'ds-badge.ts',
      language: 'typescript',
      description: 'Lit Badge',
      content: `import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ds-badge')
export class DSBadge extends LitElement {
  static styles = css\`
    :host {
      display: inline-flex;
      vertical-align: middle;
      --badge-font: var(--ds-typography-family-base);
      --badge-radius: var(--ds-geometry-radius-lg);
    }

    .badge {
      display: inline-flex;
      align-items: center;
      padding: calc(var(--ds-geometry-spacing-base) * 0.5) calc(var(--ds-geometry-spacing-base) * 2);
      border-radius: var(--badge-radius);
      font-family: var(--badge-font);
      font-size: var(--ds-typography-size-sm);
      font-weight: var(--ds-typography-weight-bold);
      line-height: 1;
      white-space: nowrap;
      border: 1px solid transparent;
    }

    /* VARIANTS */
    .primary {
      background-color: var(--ds-color-primary);
      color: var(--ds-color-textInverse);
    }
    
    .secondary {
      background-color: var(--ds-color-secondary);
      color: var(--ds-color-textInverse);
    }
    
    .outline {
      background-color: transparent;
      border-color: var(--ds-color-border);
      color: var(--ds-color-text);
    }

    .success {
      background-color: var(--ds-color-success);
      color: #fff;
    }

    .warning {
      background-color: var(--ds-color-warning);
      color: #fff;
    }

    .error {
      background-color: var(--ds-color-error);
      color: #fff;
    }

    .info {
      background-color: var(--ds-color-info);
      color: #fff;
    }
  \`;

  @property({ type: String }) variant: 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'error' | 'info' = 'primary';

  render() {
    const classes = {
      badge: true,
      [this.variant]: true
    };

    return html\`
      <span class=\${classMap(classes)}>
        <slot></slot>
      </span>
    \`;
  }
}`
    },
    {
      fileName: 'ds-badge.react.ts',
      language: 'typescript',
      description: 'React Wrapper',
      content: `import React from 'react';
import { createComponent } from '@lit/react';
import { DSBadge as DSBadgeElement } from './ds-badge';

export const DSBadge = createComponent({
  tagName: 'ds-badge',
  elementClass: DSBadgeElement,
  react: React,
});`
    },
    {
      fileName: 'ds-badge.angular.ts',
      language: 'typescript',
      description: 'Angular Directive',
      content: `import { Directive, ElementRef, Input } from '@angular/core';
import './ds-badge';

@Directive({
  selector: 'ds-badge',
  standalone: true
})
export class DSBadgeDirective {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'error' | 'info' = 'primary';
  constructor(private el: ElementRef) {}
}`
    }
  ],
  avatar: () => [
    {
      fileName: 'ds-avatar.ts',
      language: 'typescript',
      description: 'Lit Avatar',
      content: `import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ds-avatar')
export class DSAvatar extends LitElement {
  static styles = css\`
    :host {
      display: inline-block;
      vertical-align: middle;
      font-family: var(--ds-typography-family-base);
    }

    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background-color: var(--ds-color-surfaceHighlight);
      color: var(--ds-color-text);
      font-weight: var(--ds-typography-weight-bold);
      user-select: none;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* SIZES */
    .sm { width: 2rem; height: 2rem; font-size: var(--ds-typography-size-xs); }
    .md { width: 3rem; height: 3rem; font-size: var(--ds-typography-size-md); }
    .lg { width: 4rem; height: 4rem; font-size: var(--ds-typography-size-lg); }

    /* VARIANTS */
    .circle { border-radius: 50%; }
    .square { border-radius: var(--ds-geometry-radius-sm); }
    .rounded { border-radius: var(--ds-geometry-radius-md); }
  \`;

  @property({ type: String }) src = '';
  @property({ type: String }) alt = '';
  @property({ type: String }) initials = '';
  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: String }) variant: 'circle' | 'square' | 'rounded' = 'circle';

  render() {
    const classes = {
      avatar: true,
      [this.size]: true,
      [this.variant]: true
    };

    return html\`
      <div class=\${classMap(classes)}>
        \${this.src 
          ? html\`<img src=\${this.src} alt=\${this.alt} />\` 
          : html\`<span>\${this.initials}</span>\`
        }
      </div>
    \`;
  }
}`
    },
    {
      fileName: 'ds-avatar.react.ts',
      language: 'typescript',
      description: 'React Wrapper',
      content: `import React from 'react';
import { createComponent } from '@lit/react';
import { DSAvatar as DSAvatarElement } from './ds-avatar';

export const DSAvatar = createComponent({
  tagName: 'ds-avatar',
  elementClass: DSAvatarElement,
  react: React,
});`
    },
    {
      fileName: 'ds-avatar.angular.ts',
      language: 'typescript',
      description: 'Angular Directive',
      content: `import { Directive, ElementRef, Input } from '@angular/core';
import './ds-avatar';

@Directive({
  selector: 'ds-avatar',
  standalone: true
})
export class DSAvatarDirective {
  @Input() src = '';
  @Input() alt = '';
  @Input() initials = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: 'circle' | 'square' | 'rounded' = 'circle';
  constructor(private el: ElementRef) {}
}`
    }
  ],
  spinner: () => [
    {
      fileName: 'ds-spinner.ts',
      language: 'typescript',
      description: 'Lit Spinner',
      content: `import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ds-spinner')
export class DSSpinner extends LitElement {
  static styles = css\`
    :host {
      display: inline-block;
      vertical-align: middle;
    }

    .spinner {
      border: 3px solid rgba(0,0,0,0.1);
      border-radius: 50%;
      border-top-color: var(--ds-color-primary);
      animation: spin 1s linear infinite;
    }
    
    :host([variant="secondary"]) .spinner {
        border-top-color: var(--ds-color-secondary);
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* SIZES */
    .sm { width: 1rem; height: 1rem; border-width: 2px; }
    .md { width: 2rem; height: 2rem; border-width: 3px; }
    .lg { width: 3rem; height: 3rem; border-width: 4px; }
  \`;

  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: String }) variant: 'primary' | 'secondary' = 'primary';

  render() {
    return html\`<div class=\${classMap({ spinner: true, [this.size]: true })}></div>\`;
  }
}`
    },
    {
      fileName: 'ds-spinner.react.ts',
      language: 'typescript',
      description: 'React Wrapper',
      content: `import React from 'react';
import { createComponent } from '@lit/react';
import { DSSpinner as DSSpinnerElement } from './ds-spinner';

export const DSSpinner = createComponent({
  tagName: 'ds-spinner',
  elementClass: DSSpinnerElement,
  react: React,
});`
    },
    {
      fileName: 'ds-spinner.angular.ts',
      language: 'typescript',
      description: 'Angular Directive',
      content: `import { Directive, ElementRef, Input } from '@angular/core';
import './ds-spinner';

@Directive({
  selector: 'ds-spinner',
  standalone: true
})
export class DSSpinnerDirective {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  constructor(private el: ElementRef) {}
}`
    }
  ],
  divider: () => [
    {
      fileName: 'ds-divider.ts',
      language: 'typescript',
      description: 'Lit Divider',
      content: `import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ds-divider')
export class DSDivider extends LitElement {
  static styles = css\`
    :host {
      display: block;
      background-color: var(--ds-color-border);
    }

    :host([orientation="horizontal"]) {
      height: 1px;
      width: 100%;
      margin: var(--ds-geometry-spacing-base) 0;
    }

    :host([orientation="vertical"]) {
      width: 1px;
      height: 100%; /* Requires parent with height or flex context */
      min-height: 1em;
      display: inline-block;
      margin: 0 var(--ds-geometry-spacing-base);
    }
  \`;

  @property({ type: String, reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  render() {
    return html\`\`;
  }
}`
    },
    {
      fileName: 'ds-divider.react.ts',
      language: 'typescript',
      description: 'React Wrapper',
      content: `import React from 'react';
import { createComponent } from '@lit/react';
import { DSDivider as DSDividerElement } from './ds-divider';

export const DSDivider = createComponent({
  tagName: 'ds-divider',
  elementClass: DSDividerElement,
  react: React,
});`
    },
    {
      fileName: 'ds-divider.angular.ts',
      language: 'typescript',
      description: 'Angular Directive',
      content: `import { Directive, ElementRef, Input } from '@angular/core';
import './ds-divider';

@Directive({
  selector: 'ds-divider',
  standalone: true
})
export class DSDividerDirective {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  constructor(private el: ElementRef) {}
}`
    }
  ],
  'checkbox-group': () => [
    {
      fileName: 'ds-checkbox-group.ts',
      language: 'typescript',
      description: 'Lit Checkbox Group',
      content: `import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ds-checkbox-group')
export class DSCheckboxGroup extends LitElement {
  static styles = css\`
    :host {
      display: block;
      font-family: var(--ds-typography-family-base);
    }

    fieldset {
      border: none;
      padding: 0;
      margin: 0;
    }

    legend {
      font-size: var(--ds-typography-size-sm);
      font-weight: var(--ds-typography-weight-bold);
      color: var(--ds-color-text);
      margin-bottom: var(--ds-geometry-spacing-base);
    }

    .group {
      display: flex;
      gap: calc(var(--ds-geometry-spacing-base) * 2);
    }

    .group.vertical {
      flex-direction: column;
    }

    .group.horizontal {
      flex-direction: row;
      flex-wrap: wrap;
    }

    .error-msg {
      margin-top: var(--ds-geometry-spacing-base);
      font-size: var(--ds-typography-size-sm);
      color: var(--ds-color-error);
    }
  \`;

  @property({ type: String }) label = '';
  @property({ type: String }) error = '';
  @property({ type: String }) direction: 'vertical' | 'horizontal' = 'vertical';

  render() {
    return html\`
      <fieldset>
        \${this.label ? html\`<legend>\${this.label}</legend>\` : ''}
        <div class=\${classMap({ group: true, [this.direction]: true })}>
          <slot></slot>
        </div>
        \${this.error ? html\`<div class="error-msg">\${this.error}</div>\` : ''}
      </fieldset>
    \`;
  }
}`
    },
    {
      fileName: 'ds-checkbox-group.react.ts',
      language: 'typescript',
      description: 'React Wrapper',
      content: `import React from 'react';
import { createComponent } from '@lit/react';
import { DSCheckboxGroup as DSCheckboxGroupElement } from './ds-checkbox-group';

export const DSCheckboxGroup = createComponent({
  tagName: 'ds-checkbox-group',
  elementClass: DSCheckboxGroupElement,
  react: React,
});`
    },
    {
      fileName: 'ds-checkbox-group.angular.ts',
      language: 'typescript',
      description: 'Angular Directive',
      content: `import { Directive, ElementRef, Input } from '@angular/core';
import './ds-checkbox-group';

@Directive({
  selector: 'ds-checkbox-group',
  standalone: true
})
export class DSCheckboxGroupDirective {
  @Input() label = '';
  @Input() error = '';
  @Input() direction: 'vertical' | 'horizontal' = 'vertical';
  
  constructor(private el: ElementRef) {}
}`
    }
  ],
  card: () => [
    {
      fileName: 'ds-card.ts',
      language: 'typescript',
      description: 'Lit Card',
      content: `import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ds-card')
export class DSCard extends LitElement {
  static styles = css\`
    :host {
      display: block;
      background: var(--ds-color-surface);
      border-radius: var(--ds-geometry-radius-lg);
      border: var(--ds-geometry-border-width) solid var(--ds-color-border);
      font-family: var(--ds-typography-family-base);
      color: var(--ds-color-text);
      overflow: hidden;
      box-shadow: var(--ds-effect-shadow-md);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    :host(:hover:not([disabled])) {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    }

    :host([disabled]) {
      opacity: 0.7;
      pointer-events: none;
      filter: grayscale(0.5);
    }

    .header {
      padding: calc(var(--ds-geometry-spacing-base) * 4);
      border-bottom: 1px solid var(--ds-color-border);
      font-weight: var(--ds-typography-weight-bold);
      font-size: var(--ds-typography-size-lg);
    }

    .body {
      padding: calc(var(--ds-geometry-spacing-base) * 4);
    }
  \`;
  @property({ type: String }) title = '';
  @property({ type: Boolean }) disabled = false;
  
  render() { 
    return html\`
      \${this.title ? html\`<div class="header">\${this.title}</div>\` : ''}
      <div class="body"><slot></slot></div>
    \`; 
  }
}`
    }
  ],
  heading: () => [
    {
      fileName: 'ds-heading.ts',
      language: 'typescript',
      description: 'Lit Heading',
      content: `import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ds-heading')
export class DSHeading extends LitElement {
  static styles = css\`
    :host {
      display: block;
      font-family: var(--ds-typography-family-base);
      color: var(--ds-color-text);
      margin: 0;
    }

    .h1 { font-size: var(--ds-typography-variants-h1-fontSize); font-weight: var(--ds-typography-variants-h1-fontWeight); line-height: var(--ds-typography-variants-h1-lineHeight); }
    .h2 { font-size: var(--ds-typography-variants-h2-fontSize); font-weight: var(--ds-typography-variants-h2-fontWeight); line-height: var(--ds-typography-variants-h2-lineHeight); }
    .h3 { font-size: var(--ds-typography-variants-h3-fontSize); font-weight: var(--ds-typography-variants-h3-fontWeight); line-height: var(--ds-typography-variants-h3-lineHeight); }
    .h4 { font-size: var(--ds-typography-variants-h4-fontSize); font-weight: var(--ds-typography-variants-h4-fontWeight); line-height: var(--ds-typography-variants-h4-lineHeight); }
    .h5 { font-size: var(--ds-typography-variants-h5-fontSize); font-weight: var(--ds-typography-variants-h5-fontWeight); line-height: var(--ds-typography-variants-h5-lineHeight); }
    .h6 { font-size: var(--ds-typography-variants-h6-fontSize); font-weight: var(--ds-typography-variants-h6-fontWeight); line-height: var(--ds-typography-variants-h6-lineHeight); }
    .subtitle1 { font-size: var(--ds-typography-variants-subtitle1-fontSize); font-weight: var(--ds-typography-variants-subtitle1-fontWeight); line-height: var(--ds-typography-variants-subtitle1-lineHeight); }
    .subtitle2 { font-size: var(--ds-typography-variants-subtitle2-fontSize); font-weight: var(--ds-typography-variants-subtitle2-fontWeight); line-height: var(--ds-typography-variants-subtitle2-lineHeight); }
    
    .primary { color: var(--ds-color-primary); }
    .secondary { color: var(--ds-color-secondary); }
  \`;

  @property({ type: String }) variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' = 'h1';
  @property({ type: String }) color: 'default' | 'primary' | 'secondary' = 'default';
  
  render() {
    const classes = {
      [this.variant]: true,
      [this.color]: this.color !== 'default'
    };
    return html\`<div class=\${classMap(classes)}><slot></slot></div>\`;
  }
}`
    },
    {
      fileName: 'ds-heading.react.ts',
      language: 'typescript',
      description: 'React Wrapper',
      content: `import React from 'react';
import { createComponent } from '@lit/react';
import { DSHeading as DSHeadingElement } from './ds-heading';

export const DSHeading = createComponent({
  tagName: 'ds-heading',
  elementClass: DSHeadingElement,
  react: React,
});`
    },
    {
      fileName: 'ds-heading.angular.ts',
      language: 'typescript',
      description: 'Angular Directive',
      content: `import { Directive, ElementRef, Input } from '@angular/core';
import './ds-heading';

@Directive({
  selector: 'ds-heading',
  standalone: true
})
export class DSHeadingDirective {
  @Input() variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' = 'h1';
  @Input() color: 'default' | 'primary' | 'secondary' = 'default';
  constructor(private el: ElementRef) {}
}`
    }
  ],
  text: () => [
    {
      fileName: 'ds-text.ts',
      language: 'typescript',
      description: 'Lit Text',
      content: `import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ds-text')
export class DSText extends LitElement {
  static styles = css\`
    :host {
      display: block;
      font-family: var(--ds-typography-family-base);
      color: var(--ds-color-text);
      margin: 0;
    }

    .body1 { font-size: var(--ds-typography-variants-body1-fontSize); line-height: var(--ds-typography-variants-body1-lineHeight); }
    .body2 { font-size: var(--ds-typography-variants-body2-fontSize); line-height: var(--ds-typography-variants-body2-lineHeight); }
    .caption { font-size: var(--ds-typography-variants-caption-fontSize); line-height: var(--ds-typography-variants-caption-lineHeight); }
    
    .light { font-weight: var(--ds-typography-weight-light); }
    .normal { font-weight: var(--ds-typography-weight-normal); }
    .medium { font-weight: var(--ds-typography-weight-medium); }
    .bold { font-weight: var(--ds-typography-weight-bold); }

    .dim { color: var(--ds-color-textDim); }
    .primary { color: var(--ds-color-primary); }
    .secondary { color: var(--ds-color-secondary); }
    .error { color: var(--ds-color-error); }
    .success { color: var(--ds-color-success); }
  \`;

  @property({ type: String }) variant: 'body1' | 'body2' | 'caption' = 'body1';
  @property({ type: String }) weight: 'light' | 'normal' | 'medium' | 'bold' = 'normal';
  @property({ type: String }) color: 'default' | 'dim' | 'primary' | 'secondary' | 'error' | 'success' = 'default';

  render() {
    const classes = {
      [this.variant]: true,
      [this.weight]: true,
      [this.color]: this.color !== 'default'
    };
    return html\`<div class=\${classMap(classes)}><slot></slot></div>\`;
  }
}`
    },
    {
      fileName: 'ds-text.react.ts',
      language: 'typescript',
      description: 'React Wrapper',
      content: `import React from 'react';
import { createComponent } from '@lit/react';
import { DSText as DSTextElement } from './ds-text';

export const DSText = createComponent({
  tagName: 'ds-text',
  elementClass: DSTextElement,
  react: React,
});`
    },
    {
      fileName: 'ds-text.angular.ts',
      language: 'typescript',
      description: 'Angular Directive',
      content: `import { Directive, ElementRef, Input } from '@angular/core';
import './ds-text';

@Directive({
  selector: 'ds-text',
  standalone: true
})
export class DSTextDirective {
  @Input() variant: 'body1' | 'body2' | 'caption' = 'body1';
  @Input() weight: 'light' | 'normal' | 'medium' | 'bold' = 'normal';
  @Input() color: 'default' | 'dim' | 'primary' | 'secondary' | 'error' | 'success' = 'default';
  constructor(private el: ElementRef) {}
}`
    }
  ],
  link: () => [
    {
      fileName: 'ds-link.ts',
      language: 'typescript',
      description: 'Lit Link',
      content: `import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ds-link')
export class DSLink extends LitElement {
  static styles = css\`
    :host {
      display: inline;
    }
    a {
      font-family: var(--ds-typography-family-base);
      color: var(--ds-color-primary);
      text-decoration: underline;
      cursor: pointer;
      font-weight: var(--ds-typography-weight-medium);
      transition: color 0.2s;
    }
    a:hover {
      color: var(--ds-color-primaryHover);
    }
    
    :host([variant="discrete"]) a {
      color: var(--ds-color-text);
      text-decoration: none;
    }
    :host([variant="discrete"]) a:hover {
      text-decoration: underline;
      color: var(--ds-color-primary);
    }
  \`;

  @property({ type: String }) href = '#';
  @property({ type: String }) target = '_self';
  @property({ type: String }) variant: 'default' | 'discrete' = 'default';

  render() {
    return html\`<a href=\${this.href} target=\${this.target}><slot></slot></a>\`;
  }
}`
    },
    {
      fileName: 'ds-link.react.ts',
      language: 'typescript',
      description: 'React Wrapper',
      content: `import React from 'react';
import { createComponent } from '@lit/react';
import { DSLink as DSLinkElement } from './ds-link';

export const DSLink = createComponent({
  tagName: 'ds-link',
  elementClass: DSLinkElement,
  react: React,
});`
    },
    {
      fileName: 'ds-link.angular.ts',
      language: 'typescript',
      description: 'Angular Directive',
      content: `import { Directive, ElementRef, Input } from '@angular/core';
import './ds-link';

@Directive({
  selector: 'ds-link',
  standalone: true
})
export class DSLinkDirective {
  @Input() href = '#';
  @Input() target = '_self';
  @Input() variant: 'default' | 'discrete' = 'default';
  constructor(private el: ElementRef) {}
}`
    }
  ]
};