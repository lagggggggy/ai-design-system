import { DesignTokens, ComponentType, GeneratedFile, GenerationStrategy } from '../types';

const litTemplates: Record<ComponentType, (tokens: DesignTokens) => GeneratedFile[]> = {
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
      --btn-font: var(--ds-fontFamily);
      --btn-radius: var(--ds-borderRadiusMedium);
      --btn-transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    button {
      font-family: var(--btn-font);
      border: var(--ds-borderWidth) solid transparent;
      border-radius: var(--btn-radius);
      cursor: pointer;
      font-weight: var(--ds-fontWeightBold);
      transition: all var(--btn-transition);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--ds-spacingUnit);
      outline: none;
      position: relative;
    }

    button:focus-visible {
      box-shadow: 0 0 0 2px var(--ds-background), 0 0 0 4px var(--ds-primary);
    }

    button:active:not([disabled]) {
      transform: scale(0.97);
    }
    
    button:hover:not([disabled]) {
       transform: translateY(-1px);
       box-shadow: var(--ds-shadowSm);
    }

    /* SIZES */
    .sm {
      font-size: var(--ds-fontSizeSm);
      padding: calc(var(--ds-spacingUnit) * 1.5) calc(var(--ds-spacingUnit) * 3);
    }
    .md {
      font-size: var(--ds-fontSizeMd);
      padding: calc(var(--ds-spacingUnit) * 2.5) calc(var(--ds-spacingUnit) * 4);
    }
    .lg {
      font-size: var(--ds-fontSizeLg);
      padding: calc(var(--ds-spacingUnit) * 3.5) calc(var(--ds-spacingUnit) * 6);
    }

    /* VARIANTS */
    .primary {
      background-color: var(--ds-primary);
      color: var(--ds-textInverse);
    }
    .primary:hover:not([disabled]) {
      background-color: var(--ds-primaryHover);
    }

    .secondary {
      background-color: var(--ds-secondary);
      color: var(--ds-textInverse);
    }
    .secondary:hover:not([disabled]) {
      background-color: var(--ds-secondaryHover);
    }

    .outline {
      background-color: transparent;
      border-color: var(--ds-border);
      color: var(--ds-text);
    }
    .outline:hover:not([disabled]) {
      background-color: var(--ds-surface);
      border-color: var(--ds-primary);
      color: var(--ds-primary);
    }

    .ghost {
      background-color: transparent;
      color: var(--ds-text);
    }
    .ghost:hover:not([disabled]) {
      background-color: var(--ds-surface);
      color: var(--ds-primary);
    }

    .link {
      background-color: transparent;
      color: var(--ds-primary);
      text-decoration: underline;
      padding-left: 0;
      padding-right: 0;
    }
    .link:hover:not([disabled]) {
      color: var(--ds-primaryHover);
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
      gap: var(--ds-spacingUnit);
      font-family: var(--ds-fontFamily);
      width: 100%;
    }

    :host([disabled]) {
      opacity: 0.6;
      pointer-events: none;
    }

    label {
      font-size: var(--ds-fontSizeSm);
      font-weight: var(--ds-fontWeightBold);
      color: var(--ds-text);
      transition: color 0.2s;
    }

    label.error {
      color: var(--ds-error);
    }

    input {
      width: 100%;
      padding: calc(var(--ds-spacingUnit) * 2.5) calc(var(--ds-spacingUnit) * 3);
      border: var(--ds-borderWidth) solid var(--ds-border);
      border-radius: var(--ds-borderRadiusMedium);
      background: var(--ds-surface);
      color: var(--ds-text);
      font-family: inherit;
      outline: none;
      transition: all 0.2s;
      box-sizing: border-box;
      font-size: var(--ds-fontSizeMd);
    }

    input:focus {
      border-color: var(--ds-primary);
      box-shadow: 0 0 0 2px var(--ds-primary); 
    }

    input.error {
      border-color: var(--ds-error);
    }

    input.error:focus {
      box-shadow: 0 0 0 2px var(--ds-error); 
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
      gap: calc(var(--ds-spacingUnit) * 2);
      font-family: var(--ds-fontFamily);
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
      accent-color: var(--ds-primary);
      width: 1.25rem;
      height: 1.25rem;
      cursor: pointer;
    }
    
    input:disabled {
      cursor: not-allowed;
    }

    span {
      font-size: var(--ds-fontSizeMd);
      color: var(--ds-text);
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
      font-family: var(--ds-fontFamily);
    }

    fieldset {
      border: none;
      padding: 0;
      margin: 0;
    }

    legend {
      font-size: var(--ds-fontSizeSm);
      font-weight: var(--ds-fontWeightBold);
      color: var(--ds-text);
      margin-bottom: var(--ds-spacingUnit);
    }

    .group {
      display: flex;
      gap: calc(var(--ds-spacingUnit) * 2);
    }

    .group.vertical {
      flex-direction: column;
    }

    .group.horizontal {
      flex-direction: row;
      flex-wrap: wrap;
    }

    .error-msg {
      margin-top: var(--ds-spacingUnit);
      font-size: var(--ds-fontSizeSm);
      color: var(--ds-error);
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
      background: var(--ds-surface);
      border-radius: var(--ds-borderRadiusLarge);
      border: var(--ds-borderWidth) solid var(--ds-border);
      font-family: var(--ds-fontFamily);
      color: var(--ds-text);
      overflow: hidden;
      box-shadow: var(--ds-shadowMd);
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
      padding: calc(var(--ds-spacingUnit) * 4);
      border-bottom: 1px solid var(--ds-border);
      font-weight: var(--ds-fontWeightBold);
      font-size: var(--ds-fontSizeLg);
    }

    .body {
      padding: calc(var(--ds-spacingUnit) * 4);
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
  ]
};

const nativeReactTemplates: Record<ComponentType, (tokens: DesignTokens) => GeneratedFile[]> = {
  button: () => [
    {
      fileName: 'Button.module.css',
      language: 'css',
      description: 'CSS Module',
      content: `.button {
  font-family: var(--ds-fontFamily);
  border-radius: var(--ds-borderRadiusMedium);
  border: var(--ds-borderWidth) solid transparent;
  font-weight: var(--ds-fontWeightBold);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--ds-spacingUnit);
  position: relative;
}

.button:focus-visible {
  box-shadow: 0 0 0 2px var(--ds-background), 0 0 0 4px var(--ds-primary);
  outline: none;
}
.button:active:not(:disabled) {
  transform: scale(0.97);
}
.button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--ds-shadowSm);
}

/* SIZES */
.sm {
  font-size: var(--ds-fontSizeSm);
  padding: calc(var(--ds-spacingUnit) * 1.5) calc(var(--ds-spacingUnit) * 3);
}
.md {
  font-size: var(--ds-fontSizeMd);
  padding: calc(var(--ds-spacingUnit) * 2.5) calc(var(--ds-spacingUnit) * 4);
}
.lg {
  font-size: var(--ds-fontSizeLg);
  padding: calc(var(--ds-spacingUnit) * 3.5) calc(var(--ds-spacingUnit) * 6);
}

/* VARIANTS */
.primary {
  background-color: var(--ds-primary);
  color: var(--ds-textInverse);
}
.primary:hover:not(:disabled) {
  background-color: var(--ds-primaryHover);
}

.secondary {
  background-color: var(--ds-secondary);
  color: var(--ds-textInverse);
}
.secondary:hover:not(:disabled) {
  background-color: var(--ds-secondaryHover);
}

.outline {
  background-color: transparent;
  border-color: var(--ds-border);
  color: var(--ds-text);
}
.outline:hover:not(:disabled) {
  background-color: var(--ds-surface);
  border-color: var(--ds-primary);
  color: var(--ds-primary);
}

.ghost {
  background-color: transparent;
  color: var(--ds-text);
}
.ghost:hover:not(:disabled) {
  background-color: var(--ds-surface);
  color: var(--ds-primary);
}

.link {
  background-color: transparent;
  color: var(--ds-primary);
  text-decoration: underline;
  padding: 0;
}
.link:hover:not(:disabled) {
  color: var(--ds-primaryHover);
  box-shadow: none;
  transform: none;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}`
    },
    {
      fileName: 'Button.tsx',
      language: 'typescript',
      description: 'Native React Component',
      content: `import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md',
  className, 
  children,
  ...props 
}) => {
  return (
    <button 
      className={\`\${styles.button} \${styles[variant]} \${styles[size]} \${className || ''}\`} 
      {...props} 
    >
      {children}
    </button>
  );
};`
    }
  ],
  input: () => [
    {
      fileName: 'Input.module.css',
      language: 'css',
      description: 'CSS Module',
      content: `.container {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacingUnit);
  font-family: var(--ds-fontFamily);
  width: 100%;
}

.container.disabled {
  opacity: 0.6;
  pointer-events: none;
}

.label {
  font-size: var(--ds-fontSizeSm);
  font-weight: var(--ds-fontWeightBold);
  color: var(--ds-text);
  transition: color 0.2s;
}

.label.error {
  color: var(--ds-error);
}

.input {
  width: 100%;
  padding: calc(var(--ds-spacingUnit) * 2.5) calc(var(--ds-spacingUnit) * 3);
  border: var(--ds-borderWidth) solid var(--ds-border);
  border-radius: var(--ds-borderRadiusMedium);
  background: var(--ds-surface);
  color: var(--ds-text);
  font-family: inherit;
  outline: none;
  transition: all 0.2s;
  box-sizing: border-box;
  font-size: var(--ds-fontSizeMd);
}

.input:focus {
  border-color: var(--ds-primary);
  box-shadow: 0 0 0 2px var(--ds-primary); 
}

.input.error {
  border-color: var(--ds-error);
}

.input.error:focus {
  box-shadow: 0 0 0 2px var(--ds-error); 
}`
    },
    {
      fileName: 'Input.tsx',
      language: 'typescript',
      description: 'Native React Input',
      content: `import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  disabled,
  className, 
  ...props 
}) => {
  return (
    <div className={\`\${styles.container} \${disabled ? styles.disabled : ''}\`}>
      {label && (
        <label className={\`\${styles.label} \${error ? styles.error : ''}\`}>
          {label}
        </label>
      )}
      <input 
        className={\`\${styles.input} \${error ? styles.error : ''} \${className || ''}\`}
        disabled={disabled}
        {...props} 
      />
    </div>
  );
};`
    }
  ],
  checkbox: () => [
     {
      fileName: 'Checkbox.module.css',
      language: 'css',
      description: 'CSS Module',
      content: `.container {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--ds-spacingUnit) * 2);
  font-family: var(--ds-fontFamily);
  cursor: pointer;
}

.container.disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}

.input {
  appearance: auto;
  -webkit-appearance: auto;
  accent-color: var(--ds-primary);
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
}

.label {
  font-size: var(--ds-fontSizeMd);
  color: var(--ds-text);
}`
    },
    {
      fileName: 'Checkbox.tsx',
      language: 'typescript',
      description: 'Native React Checkbox',
      content: `import React, { useEffect, useRef } from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  indeterminate?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({ 
  label, 
  indeterminate,
  disabled,
  className,
  ...props 
}) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  return (
    <label className={\`\${styles.container} \${disabled ? styles.disabled : ''} \${className || ''}\`}>
      <input 
        ref={ref}
        type="checkbox" 
        className={styles.input}
        disabled={disabled}
        {...props} 
      />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};`
    }
  ],
  'checkbox-group': () => [
    {
      fileName: 'CheckboxGroup.module.css',
      language: 'css',
      description: 'CSS Module',
      content: `.fieldset {
  border: none;
  padding: 0;
  margin: 0;
  font-family: var(--ds-fontFamily);
}

.legend {
  font-size: var(--ds-fontSizeSm);
  font-weight: var(--ds-fontWeightBold);
  color: var(--ds-text);
  margin-bottom: var(--ds-spacingUnit);
}

.group {
  display: flex;
  gap: calc(var(--ds-spacingUnit) * 2);
}

.vertical {
  flex-direction: column;
}

.horizontal {
  flex-direction: row;
  flex-wrap: wrap;
}

.error {
  margin-top: var(--ds-spacingUnit);
  font-size: var(--ds-fontSizeSm);
  color: var(--ds-error);
}`
    },
    {
      fileName: 'CheckboxGroup.tsx',
      language: 'typescript',
      description: 'Native React Checkbox Group',
      content: `import React from 'react';
import styles from './CheckboxGroup.module.css';

interface CheckboxGroupProps {
  label?: string;
  error?: string;
  direction?: 'vertical' | 'horizontal';
  children: React.ReactNode;
  className?: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  error,
  direction = 'vertical',
  children,
  className
}) => {
  return (
    <fieldset className={\`\${styles.fieldset} \${className || ''}\`}>
      {label && <legend className={styles.legend}>{label}</legend>}
      <div className={\`\${styles.group} \${styles[direction]}\`}>
        {children}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </fieldset>
  );
};`
    }
  ],
  card: () => [
    {
      fileName: 'Card.module.css',
      language: 'css',
      description: 'CSS Module',
      content: `.card {
  display: block;
  background: var(--ds-surface);
  border-radius: var(--ds-borderRadiusLarge);
  border: var(--ds-borderWidth) solid var(--ds-border);
  font-family: var(--ds-fontFamily);
  color: var(--ds-text);
  overflow: hidden;
  box-shadow: var(--ds-shadowMd);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover:not(.disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.card.disabled {
  opacity: 0.7;
  pointer-events: none;
  filter: grayscale(0.5);
}

.header {
  padding: calc(var(--ds-spacingUnit) * 4);
  border-bottom: 1px solid var(--ds-border);
  font-weight: var(--ds-fontWeightBold);
  font-size: var(--ds-fontSizeLg);
}

.body {
  padding: calc(var(--ds-spacingUnit) * 4);
}`
    },
    {
      fileName: 'Card.tsx',
      language: 'typescript',
      description: 'Native React Card',
      content: `import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  title?: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ 
  title, 
  disabled,
  children,
  className,
}) => {
  return (
    <div className={\`\${styles.card} \${disabled ? styles.disabled : ''} \${className || ''}\`}>
      {title && <div className={styles.header}>{title}</div>}
      <div className={styles.body}>{children}</div>
    </div>
  );
};`
    }
  ]
};

const nativeAngularTemplates: Record<ComponentType, (tokens: DesignTokens) => GeneratedFile[]> = {
  button: () => [
    {
      fileName: 'button.component.css',
      language: 'css',
      description: 'Angular Styles',
      content: `button {
  font-family: var(--ds-fontFamily);
  border-radius: var(--ds-borderRadiusMedium);
  border: var(--ds-borderWidth) solid transparent;
  font-weight: var(--ds-fontWeightBold);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--ds-spacingUnit);
}

button:focus-visible {
  box-shadow: 0 0 0 2px var(--ds-background), 0 0 0 4px var(--ds-primary);
  outline: none;
}
button:active:not(:disabled) {
  transform: scale(0.97);
}
button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--ds-shadowSm);
}

/* SIZES */
button.sm {
  font-size: var(--ds-fontSizeSm);
  padding: calc(var(--ds-spacingUnit) * 1.5) calc(var(--ds-spacingUnit) * 3);
}
button.md {
  font-size: var(--ds-fontSizeMd);
  padding: calc(var(--ds-spacingUnit) * 2.5) calc(var(--ds-spacingUnit) * 4);
}
button.lg {
  font-size: var(--ds-fontSizeLg);
  padding: calc(var(--ds-spacingUnit) * 3.5) calc(var(--ds-spacingUnit) * 6);
}

/* VARIANTS */
button.primary {
  background-color: var(--ds-primary);
  color: var(--ds-textInverse);
}
button.primary:hover:not(:disabled) {
  background-color: var(--ds-primaryHover);
}

button.secondary {
  background-color: var(--ds-secondary);
  color: var(--ds-textInverse);
}
button.secondary:hover:not(:disabled) {
  background-color: var(--ds-secondaryHover);
}

button.outline {
  background-color: transparent;
  border-color: var(--ds-border);
  color: var(--ds-text);
}
button.outline:hover:not(:disabled) {
  background-color: var(--ds-surface);
  border-color: var(--ds-primary);
  color: var(--ds-primary);
}

button.ghost {
  background-color: transparent;
  color: var(--ds-text);
}
button.ghost:hover:not(:disabled) {
  background-color: var(--ds-surface);
  color: var(--ds-primary);
}

button.link {
  background-color: transparent;
  color: var(--ds-primary);
  text-decoration: underline;
  padding: 0;
}
button.link:hover:not(:disabled) {
  color: var(--ds-primaryHover);
  box-shadow: none;
  transform: none;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}`
    },
    {
      fileName: 'button.component.ts',
      language: 'typescript',
      description: 'Angular Component',
      content: `import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: \`<button [class]="variant + ' ' + size" [disabled]="disabled"><ng-content></ng-content></button>\`,
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
}`
    }
  ],
  input: () => [
    {
      fileName: 'input.component.css',
      language: 'css',
      description: 'Angular Styles',
      content: `.container {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacingUnit);
  font-family: var(--ds-fontFamily);
  width: 100%;
}

.container.disabled {
  opacity: 0.6;
  pointer-events: none;
}

.label {
  font-size: var(--ds-fontSizeSm);
  font-weight: var(--ds-fontWeightBold);
  color: var(--ds-text);
  transition: color 0.2s;
}

.label.error {
  color: var(--ds-error);
}

.input {
  width: 100%;
  padding: calc(var(--ds-spacingUnit) * 2.5) calc(var(--ds-spacingUnit) * 3);
  border: var(--ds-borderWidth) solid var(--ds-border);
  border-radius: var(--ds-borderRadiusMedium);
  background: var(--ds-surface);
  color: var(--ds-text);
  font-family: inherit;
  outline: none;
  transition: all 0.2s;
  box-sizing: border-box;
  font-size: var(--ds-fontSizeMd);
}

.input:focus {
  border-color: var(--ds-primary);
  box-shadow: 0 0 0 2px var(--ds-primary); 
}

.input.error {
  border-color: var(--ds-error);
}

.input.error:focus {
  box-shadow: 0 0 0 2px var(--ds-error); 
}`
    },
    {
      fileName: 'input.component.ts',
      language: 'typescript',
      description: 'Angular Input',
      content: `import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  template: \`
    <div class="container" [class.disabled]="disabled">
      <label *ngIf="label" class="label" [class.error]="error">{{ label }}</label>
      <input 
        class="input"
        [class.error]="error"
        [type]="type"
        [value]="value"
        [placeholder]="placeholder"
        [disabled]="disabled"
        (input)="onInput($event)"
      />
    </div>
  \`,
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() value = '';
  @Input() type = 'text';
  @Input() error = false;
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event) {
    this.valueChange.emit((event.target as HTMLInputElement).value);
  }
}`
    }
  ],
  checkbox: () => [
    {
      fileName: 'checkbox.component.css',
      language: 'css',
      description: 'Angular Styles',
      content: `.container {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--ds-spacingUnit) * 2);
  font-family: var(--ds-fontFamily);
  cursor: pointer;
}

.container.disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}

.input {
  appearance: auto;
  -webkit-appearance: auto;
  accent-color: var(--ds-primary);
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
}

.label {
  font-size: var(--ds-fontSizeMd);
  color: var(--ds-text);
}`
    },
    {
      fileName: 'checkbox.component.ts',
      language: 'typescript',
      description: 'Angular Checkbox',
      content: `import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  template: \`
    <label class="container" [class.disabled]="disabled">
      <input 
        #input
        type="checkbox" 
        class="input"
        [checked]="checked"
        [disabled]="disabled"
      />
      <span class="label" *ngIf="label">{{ label }}</span>
    </label>
  \`,
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements AfterViewInit, OnChanges {
  @Input() checked = false;
  @Input() indeterminate = false;
  @Input() disabled = false;
  @Input() label = '';
  
  @ViewChild('input') inputRef!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.updateIndeterminate();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.indeterminate && this.inputRef) {
      this.updateIndeterminate();
    }
  }

  private updateIndeterminate() {
    this.inputRef.nativeElement.indeterminate = this.indeterminate;
  }
}`
    }
  ],
  'checkbox-group': () => [
    {
      fileName: 'checkbox-group.component.css',
      language: 'css',
      description: 'Angular Styles',
      content: `.fieldset {
  border: none;
  padding: 0;
  margin: 0;
  font-family: var(--ds-fontFamily);
}

.legend {
  font-size: var(--ds-fontSizeSm);
  font-weight: var(--ds-fontWeightBold);
  color: var(--ds-text);
  margin-bottom: var(--ds-spacingUnit);
}

.group {
  display: flex;
  gap: calc(var(--ds-spacingUnit) * 2);
}

.vertical {
  flex-direction: column;
}

.horizontal {
  flex-direction: row;
  flex-wrap: wrap;
}

.error {
  margin-top: var(--ds-spacingUnit);
  font-size: var(--ds-fontSizeSm);
  color: var(--ds-error);
}`
    },
    {
      fileName: 'checkbox-group.component.ts',
      language: 'typescript',
      description: 'Angular Checkbox Group',
      content: `import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox-group',
  template: \`
    <fieldset class="fieldset">
      <legend class="legend" *ngIf="label">{{ label }}</legend>
      <div class="group" [class.vertical]="direction === 'vertical'" [class.horizontal]="direction === 'horizontal'">
        <ng-content></ng-content>
      </div>
      <div class="error" *ngIf="error">{{ error }}</div>
    </fieldset>
  \`,
  styleUrls: ['./checkbox-group.component.css']
})
export class CheckboxGroupComponent {
  @Input() label = '';
  @Input() error = '';
  @Input() direction: 'vertical' | 'horizontal' = 'vertical';
}`
    }
  ],
  card: () => [
    {
      fileName: 'card.component.css',
      language: 'css',
      description: 'Angular Styles',
      content: `.card {
  display: block;
  background: var(--ds-surface);
  border-radius: var(--ds-borderRadiusLarge);
  border: var(--ds-borderWidth) solid var(--ds-border);
  font-family: var(--ds-fontFamily);
  color: var(--ds-text);
  overflow: hidden;
  box-shadow: var(--ds-shadowMd);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover:not(.disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.card.disabled {
  opacity: 0.7;
  pointer-events: none;
  filter: grayscale(0.5);
}

.header {
  padding: calc(var(--ds-spacingUnit) * 4);
  border-bottom: 1px solid var(--ds-border);
  font-weight: var(--ds-fontWeightBold);
  font-size: var(--ds-fontSizeLg);
}

.body {
  padding: calc(var(--ds-spacingUnit) * 4);
}`
    },
    {
      fileName: 'card.component.ts',
      language: 'typescript',
      description: 'Angular Card',
      content: `import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: \`
    <div class="card" [class.disabled]="disabled">
      <div class="header" *ngIf="title">{{ title }}</div>
      <div class="body">
        <ng-content></ng-content>
      </div>
    </div>
  \`,
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() title = '';
  @Input() disabled = false;
}`
    }
  ]
};

export function generateCode(
  component: ComponentType,
  tokens: DesignTokens,
  strategy: GenerationStrategy
): GeneratedFile[] {
  if (strategy === 'web-component') {
    return litTemplates[component] ? litTemplates[component](tokens) : [];
  } else if (strategy === 'native-react') {
    return nativeReactTemplates[component] ? nativeReactTemplates[component](tokens) : [];
  } else if (strategy === 'native-angular') {
    return nativeAngularTemplates[component] ? nativeAngularTemplates[component](tokens) : [];
  }
  return [];
}