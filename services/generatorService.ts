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
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
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
      content: `import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
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

    label {
      font-size: var(--ds-fontSizeSm);
      font-weight: var(--ds-fontWeightBold);
      color: var(--ds-text);
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
  \`;

  @property({ type: String }) label = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) value = '';
  @property({ type: String }) type = 'text';

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
      \${this.label ? html\`<label>\${this.label}</label>\` : ''}
      <input
        .type=\${this.type}
        .value=\${this.value}
        .placeholder=\${this.placeholder}
        @input=\${this._handleInput}
      />
    \`;
  }
}`
    },
    { fileName: 'ds-input.react.ts', language: 'typescript', description: 'React Wrapper', content: '// Same as before, just imports updated ds-input' },
    { fileName: 'ds-input.angular.ts', language: 'typescript', description: 'Angular Directive', content: '// Same as before' }
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

    input {
      accent-color: var(--ds-primary);
      width: 1.25rem;
      height: 1.25rem;
      cursor: pointer;
    }
    span {
      font-size: var(--ds-fontSizeMd);
      color: var(--ds-text);
    }
  \`;

  @property({ type: Boolean }) checked = false;
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';

  render() {
    return html\`
      <label>
        <input type="checkbox" .checked=\${this.checked} />
        <span>\${this.label}</span>
      </label>
    \`;
  }
}`
    }
  ],
  'checkbox-group': () => [], // omitted for brevity
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
  render() { return html\`\${this.title ? html\`<div class="header">\${this.title}</div>\` : ''}<div class="body"><slot></slot></div>\`; }
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
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
  // ... other components would follow similar pattern
  input: () => [],
  checkbox: () => [],
  'checkbox-group': () => [],
  card: () => []
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
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
  input: () => [],
  checkbox: () => [],
  'checkbox-group': () => [],
  card: () => []
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