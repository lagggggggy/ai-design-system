import { DesignTokens, ComponentType, GeneratedFile } from '../types';

export const nativeAngularTemplates: Record<ComponentType, (tokens: DesignTokens) => GeneratedFile[]> = {
  button: () => [
    {
      fileName: 'button.component.css',
      language: 'css',
      description: 'Angular Styles',
      content: `button {
  font-family: var(--ds-typography-family-base);
  border-radius: var(--ds-geometry-radius-md);
  border: var(--ds-geometry-border-width) solid transparent;
  font-weight: var(--ds-typography-weight-bold);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--ds-geometry-spacing-base);
}

button:focus-visible {
  box-shadow: 0 0 0 2px var(--ds-color-background), 0 0 0 4px var(--ds-color-primary);
  outline: none;
}
button:active:not(:disabled) {
  transform: scale(0.97);
}
button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--ds-effect-shadow-sm);
}

/* SIZES */
button.sm {
  font-size: var(--ds-typography-size-sm);
  padding: calc(var(--ds-geometry-spacing-base) * 1.5) calc(var(--ds-geometry-spacing-base) * 3);
}
button.md {
  font-size: var(--ds-typography-size-md);
  padding: calc(var(--ds-geometry-spacing-base) * 2.5) calc(var(--ds-geometry-spacing-base) * 4);
}
button.lg {
  font-size: var(--ds-typography-size-lg);
  padding: calc(var(--ds-geometry-spacing-base) * 3.5) calc(var(--ds-geometry-spacing-base) * 6);
}

/* VARIANTS */
button.primary {
  background-color: var(--ds-color-primary);
  color: var(--ds-color-textInverse);
}
button.primary:hover:not(:disabled) {
  background-color: var(--ds-color-primaryHover);
}

button.secondary {
  background-color: var(--ds-color-secondary);
  color: var(--ds-color-textInverse);
}
button.secondary:hover:not(:disabled) {
  background-color: var(--ds-color-secondaryHover);
}

button.outline {
  background-color: transparent;
  border-color: var(--ds-color-border);
  color: var(--ds-color-text);
}
button.outline:hover:not(:disabled) {
  background-color: var(--ds-color-surface);
  border-color: var(--ds-color-primary);
  color: var(--ds-color-primary);
}

button.ghost {
  background-color: transparent;
  color: var(--ds-color-text);
}
button.ghost:hover:not(:disabled) {
  background-color: var(--ds-color-surface);
  color: var(--ds-color-primary);
}

button.link {
  background-color: transparent;
  color: var(--ds-color-primary);
  text-decoration: underline;
  padding: 0;
}
button.link:hover:not(:disabled) {
  color: var(--ds-color-primaryHover);
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
  gap: var(--ds-geometry-spacing-base);
  font-family: var(--ds-typography-family-base);
  width: 100%;
}

.container.disabled {
  opacity: 0.6;
  pointer-events: none;
}

.label {
  font-size: var(--ds-typography-size-sm);
  font-weight: var(--ds-typography-weight-bold);
  color: var(--ds-color-text);
  transition: color 0.2s;
}

.label.error {
  color: var(--ds-color-error);
}

.input {
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

.input:focus {
  border-color: var(--ds-color-primary);
  box-shadow: 0 0 0 2px var(--ds-color-primary); 
}

.input.error {
  border-color: var(--ds-color-error);
}

.input.error:focus {
  box-shadow: 0 0 0 2px var(--ds-color-error); 
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
  gap: calc(var(--ds-geometry-spacing-base) * 2);
  font-family: var(--ds-typography-family-base);
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
  accent-color: var(--ds-color-primary);
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
}

.label {
  font-size: var(--ds-typography-size-md);
  color: var(--ds-color-text);
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
  radio: () => [
    {
      fileName: 'radio.component.css',
      language: 'css',
      description: 'Angular Styles',
      content: `.container {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--ds-geometry-spacing-base) * 2);
  font-family: var(--ds-typography-family-base);
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
  accent-color: var(--ds-color-primary);
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
  margin: 0;
}

.label {
  font-size: var(--ds-typography-size-md);
  color: var(--ds-color-text);
}`
    },
    {
      fileName: 'radio.component.ts',
      language: 'typescript',
      description: 'Angular Radio',
      content: `import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-radio',
  template: \`
    <label class="container" [class.disabled]="disabled">
      <input 
        type="radio" 
        class="input"
        [name]="name"
        [value]="value"
        [checked]="checked"
        [disabled]="disabled"
        (change)="onChange($event)"
      />
      <span class="label" *ngIf="label">{{ label }}</span>
    </label>
  \`,
  styleUrls: ['./radio.component.css']
})
export class RadioComponent {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() label = '';
  @Input() value = '';
  @Input() name = '';
  @Output() checkedChange = new EventEmitter<any>();

  onChange(event: Event) {
    if ((event.target as HTMLInputElement).checked) {
      this.checkedChange.emit(this.value);
    }
  }
}`
    }
  ],
  'radio-group': () => [
    {
      fileName: 'radio-group.component.css',
      language: 'css',
      description: 'Angular Styles',
      content: `.fieldset {
  border: none;
  padding: 0;
  margin: 0;
  font-family: var(--ds-typography-family-base);
}

.legend {
  font-size: var(--ds-typography-size-sm);
  font-weight: var(--ds-typography-weight-bold);
  color: var(--ds-color-text);
  margin-bottom: var(--ds-geometry-spacing-base);
}

.group {
  display: flex;
  gap: calc(var(--ds-geometry-spacing-base) * 2);
}

.vertical {
  flex-direction: column;
}

.horizontal {
  flex-direction: row;
  flex-wrap: wrap;
}

.error {
  margin-top: var(--ds-geometry-spacing-base);
  font-size: var(--ds-typography-size-sm);
  color: var(--ds-color-error);
}`
    },
    {
      fileName: 'radio-group.component.ts',
      language: 'typescript',
      description: 'Angular Radio Group',
      content: `import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-radio-group',
  template: \`
    <fieldset class="fieldset">
      <legend class="legend" *ngIf="label">{{ label }}</legend>
      <div class="group" [class.vertical]="direction === 'vertical'" [class.horizontal]="direction === 'horizontal'">
        <ng-content></ng-content>
      </div>
      <div class="error" *ngIf="error">{{ error }}</div>
    </fieldset>
  \`,
  styleUrls: ['./radio-group.component.css']
})
export class RadioGroupComponent {
  @Input() label = '';
  @Input() error = '';
  @Input() direction: 'vertical' | 'horizontal' = 'vertical';
}`
    }
  ],
  alert: () => [
    {
      fileName: 'alert.component.css',
      language: 'css',
      description: 'Angular Styles',
      content: `.alert {
  padding: calc(var(--ds-geometry-spacing-base) * 3);
  border-radius: var(--ds-geometry-radius-md);
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  gap: var(--ds-geometry-spacing-base);
  font-family: var(--ds-typography-family-base);
  width: 100%;
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
.error .title { color: var(--ds-color-error); }`
    },
    {
      fileName: 'alert.component.ts',
      language: 'typescript',
      description: 'Angular Alert',
      content: `import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: \`
    <div class="alert" [ngClass]="variant">
      <div class="title" *ngIf="title">{{ title }}</div>
      <div class="content"><ng-content></ng-content></div>
    </div>
  \`,
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() variant: 'info' | 'success' | 'warning' | 'error' = 'info';
  @Input() title = '';
}`
    }
  ],
  switch: () => [
    {
      fileName: 'switch.component.css',
      language: 'css',
      description: 'Angular Styles',
      content: `.container {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--ds-geometry-spacing-base) * 2);
  font-family: var(--ds-typography-family-base);
  cursor: pointer;
}

.container.disabled {
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

.label {
  font-size: var(--ds-typography-size-md);
  color: var(--ds-color-text);
}`
    },
    {
      fileName: 'switch.component.ts',
      language: 'typescript',
      description: 'Angular Switch',
      content: `import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-switch',
  template: \`
    <label class="container" [class.disabled]="disabled">
      <div class="switch">
        <input 
          type="checkbox" 
          [checked]="checked"
          [disabled]="disabled"
          (change)="onChange($event)"
        />
        <span class="slider"></span>
      </div>
      <span class="label" *ngIf="label">{{ label }}</span>
    </label>
  \`,
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() label = '';
  @Output() checkedChange = new EventEmitter<boolean>();

  onChange(event: Event) {
    this.checkedChange.emit((event.target as HTMLInputElement).checked);
  }
}`
    }
  ],
  badge: () => [
    {
      fileName: 'badge.component.css',
      language: 'css',
      description: 'Angular Styles',
      content: `.badge {
  display: inline-flex;
  align-items: center;
  padding: calc(var(--ds-geometry-spacing-base) * 0.5) calc(var(--ds-geometry-spacing-base) * 2);
  border-radius: var(--ds-geometry-radius-lg);
  font-family: var(--ds-typography-family-base);
  font-size: var(--ds-typography-size-sm);
  font-weight: var(--ds-typography-weight-bold);
  line-height: 1;
  white-space: nowrap;
  border: 1px solid transparent;
}

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
}`
    },
    {
      fileName: 'badge.component.ts',
      language: 'typescript',
      description: 'Angular Badge',
      content: `import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  template: \`<span class="badge" [ngClass]="variant"><ng-content></ng-content></span>\`,
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'error' | 'info' = 'primary';
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
  font-family: var(--ds-typography-family-base);
}

.legend {
  font-size: var(--ds-typography-size-sm);
  font-weight: var(--ds-typography-weight-bold);
  color: var(--ds-color-text);
  margin-bottom: var(--ds-geometry-spacing-base);
}

.group {
  display: flex;
  gap: calc(var(--ds-geometry-spacing-base) * 2);
}

.vertical {
  flex-direction: column;
}

.horizontal {
  flex-direction: row;
  flex-wrap: wrap;
}

.error {
  margin-top: var(--ds-geometry-spacing-base);
  font-size: var(--ds-typography-size-sm);
  color: var(--ds-color-error);
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
  background: var(--ds-color-surface);
  border-radius: var(--ds-geometry-radius-lg);
  border: var(--ds-geometry-border-width) solid var(--ds-color-border);
  font-family: var(--ds-typography-family-base);
  color: var(--ds-color-text);
  overflow: hidden;
  box-shadow: var(--ds-effect-shadow-md);
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
  padding: calc(var(--ds-geometry-spacing-base) * 4);
  border-bottom: 1px solid var(--ds-color-border);
  font-weight: var(--ds-typography-weight-bold);
  font-size: var(--ds-typography-size-lg);
}

.body {
  padding: calc(var(--ds-geometry-spacing-base) * 4);
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
  ],
  avatar: () => [
    {
      fileName: 'avatar.component.css',
      language: 'css',
      description: 'Angular Styles',
      content: `.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--ds-color-surfaceHighlight);
  color: var(--ds-color-text);
  font-family: var(--ds-typography-family-base);
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
.rounded { border-radius: var(--ds-geometry-radius-md); }`
    },
    {
      fileName: 'avatar.component.ts',
      language: 'typescript',
      description: 'Angular Avatar',
      content: `import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: \`
    <div class="avatar" [class]="size + ' ' + variant">
      <img *ngIf="src" [src]="src" [alt]="alt" />
      <span *ngIf="!src">{{ initials }}</span>
    </div>
  \`,
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {
  @Input() src = '';
  @Input() alt = '';
  @Input() initials = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: 'circle' | 'square' | 'rounded' = 'circle';
}`
    }
  ],
  spinner: () => [
    {
      fileName: 'spinner.component.css',
      language: 'css',
      description: 'Angular Styles',
      content: `.spinner {
  display: inline-block;
  border: 3px solid rgba(0,0,0,0.1);
  border-radius: 50%;
  border-top-color: var(--ds-color-primary);
  animation: spin 1s linear infinite;
}

.secondary {
  border-top-color: var(--ds-color-secondary);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.sm { width: 1rem; height: 1rem; border-width: 2px; }
.md { width: 2rem; height: 2rem; border-width: 3px; }
.lg { width: 3rem; height: 3rem; border-width: 4px; }`
    },
    {
      fileName: 'spinner.component.ts',
      language: 'typescript',
      description: 'Angular Spinner',
      content: `import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: \`<div class="spinner" [class]="size" [class.secondary]="variant === 'secondary'"></div>\`,
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: 'primary' | 'secondary' = 'primary';
}`
    }
  ],
  divider: () => [
    {
      fileName: 'divider.component.css',
      language: 'css',
      description: 'Angular Styles',
      content: `.divider {
  display: block;
  background-color: var(--ds-color-border);
}

.horizontal {
  height: 1px;
  width: 100%;
  margin: var(--ds-geometry-spacing-base) 0;
}

.vertical {
  width: 1px;
  height: 100%;
  min-height: 1em;
  display: inline-block;
  margin: 0 var(--ds-geometry-spacing-base);
}`
    },
    {
      fileName: 'divider.component.ts',
      language: 'typescript',
      description: 'Angular Divider',
      content: `import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-divider',
  template: \`<div class="divider" [class]="orientation"></div>\`,
  styleUrls: ['./divider.component.css']
})
export class DividerComponent {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
}`
    }
  ],
  heading: () => [
    {
      fileName: 'heading.component.css',
      language: 'css',
      description: 'Angular Styles',
      content: `.heading {
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
.secondary { color: var(--ds-color-secondary); }`
    },
    {
      fileName: 'heading.component.ts',
      language: 'typescript',
      description: 'Angular Heading',
      content: `import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heading',
  template: \`
    <ng-container [ngSwitch]="variant">
      <h1 *ngSwitchCase="'h1'" class="heading" [ngClass]="[variant, color]"><ng-content></ng-content></h1>
      <h2 *ngSwitchCase="'h2'" class="heading" [ngClass]="[variant, color]"><ng-content></ng-content></h2>
      <h3 *ngSwitchCase="'h3'" class="heading" [ngClass]="[variant, color]"><ng-content></ng-content></h3>
      <h4 *ngSwitchCase="'h4'" class="heading" [ngClass]="[variant, color]"><ng-content></ng-content></h4>
      <h5 *ngSwitchCase="'h5'" class="heading" [ngClass]="[variant, color]"><ng-content></ng-content></h5>
      <h6 *ngSwitchDefault class="heading" [ngClass]="[variant, color]"><ng-content></ng-content></h6>
    </ng-container>
  \`,
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent {
  @Input() variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' = 'h1';
  @Input() color: 'default' | 'primary' | 'secondary' = 'default';
}`
    }
  ],
  text: () => [
    {
      fileName: 'text.component.css',
      language: 'css',
      description: 'Angular Styles',
      content: `.text {
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
.success { color: var(--ds-color-success); }`
    },
    {
      fileName: 'text.component.ts',
      language: 'typescript',
      description: 'Angular Text',
      content: `import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text',
  template: \`<p class="text" [ngClass]="[variant, weight, color]"><ng-content></ng-content></p>\`,
  styleUrls: ['./text.component.css']
})
export class TextComponent {
  @Input() variant: 'body1' | 'body2' | 'caption' = 'body1';
  @Input() weight: 'light' | 'normal' | 'medium' | 'bold' = 'normal';
  @Input() color: 'default' | 'dim' | 'primary' | 'secondary' | 'error' | 'success' = 'default';
}`
    }
  ],
  link: () => [
    {
      fileName: 'link.component.css',
      language: 'css',
      description: 'Angular Styles',
      content: `a {
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

.discrete {
  color: var(--ds-color-text);
  text-decoration: none;
}
.discrete:hover {
  text-decoration: underline;
  color: var(--ds-color-primary);
}`
    },
    {
      fileName: 'link.component.ts',
      language: 'typescript',
      description: 'Angular Link',
      content: `import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-link',
  template: \`<a [href]="href" [target]="target" [ngClass]="{discrete: variant === 'discrete'}"><ng-content></ng-content></a>\`,
  styleUrls: ['./link.component.css']
})
export class LinkComponent {
  @Input() href = '#';
  @Input() target = '_self';
  @Input() variant: 'default' | 'discrete' = 'default';
}`
    }
  ]
};