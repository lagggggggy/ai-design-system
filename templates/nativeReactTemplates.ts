import { DesignTokens, ComponentType, GeneratedFile } from '../types';

export const nativeReactTemplates: Record<ComponentType, (tokens: DesignTokens) => GeneratedFile[]> = {
  button: () => [
    {
      fileName: 'Button.module.css',
      language: 'css',
      description: 'CSS Module',
      content: `.button {
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
  position: relative;
}

.button:focus-visible {
  box-shadow: 0 0 0 2px var(--ds-color-background), 0 0 0 4px var(--ds-color-primary);
  outline: none;
}
.button:active:not(:disabled) {
  transform: scale(0.97);
}
.button:hover:not(:disabled) {
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
.primary:hover:not(:disabled) {
  background-color: var(--ds-color-primaryHover);
}

.secondary {
  background-color: var(--ds-color-secondary);
  color: var(--ds-color-textInverse);
}
.secondary:hover:not(:disabled) {
  background-color: var(--ds-color-secondaryHover);
}

.outline {
  background-color: transparent;
  border-color: var(--ds-color-border);
  color: var(--ds-color-text);
}
.outline:hover:not(:disabled) {
  background-color: var(--ds-color-surface);
  border-color: var(--ds-color-primary);
  color: var(--ds-color-primary);
}

.ghost {
  background-color: transparent;
  color: var(--ds-color-text);
}
.ghost:hover:not(:disabled) {
  background-color: var(--ds-color-surface);
  color: var(--ds-color-primary);
}

.link {
  background-color: transparent;
  color: var(--ds-color-primary);
  text-decoration: underline;
  padding: 0;
}
.link:hover:not(:disabled) {
  color: var(--ds-color-primaryHover);
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
  radio: () => [
    {
      fileName: 'Radio.module.css',
      language: 'css',
      description: 'CSS Module',
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
      fileName: 'Radio.tsx',
      language: 'typescript',
      description: 'Native React Radio',
      content: `import React from 'react';
import styles from './Radio.module.css';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Radio: React.FC<RadioProps> = ({ 
  label, 
  disabled,
  className,
  ...props 
}) => {
  return (
    <label className={\`\${styles.container} \${disabled ? styles.disabled : ''} \${className || ''}\`}>
      <input 
        type="radio" 
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
  'radio-group': () => [
    {
      fileName: 'RadioGroup.module.css',
      language: 'css',
      description: 'CSS Module',
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
      fileName: 'RadioGroup.tsx',
      language: 'typescript',
      description: 'Native React Radio Group',
      content: `import React from 'react';
import styles from './RadioGroup.module.css';

interface RadioGroupProps {
  label?: string;
  error?: string;
  direction?: 'vertical' | 'horizontal';
  children: React.ReactNode;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
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
  alert: () => [
    {
      fileName: 'Alert.module.css',
      language: 'css',
      description: 'CSS Module',
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
      fileName: 'Alert.tsx',
      language: 'typescript',
      description: 'Native React Alert',
      content: `import React from 'react';
import styles from './Alert.module.css';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  className
}) => {
  return (
    <div className={\`\${styles.alert} \${styles[variant]} \${className || ''}\`}>
      {title && <div className={styles.title}>{title}</div>}
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
};`
    }
  ],
  switch: () => [
    {
      fileName: 'Switch.module.css',
      language: 'css',
      description: 'CSS Module',
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

.input:checked + .slider {
  background-color: var(--ds-color-primary);
}

.input:checked + .slider:before {
  transform: translateX(1.25rem);
}

.input:focus-visible + .slider {
  box-shadow: 0 0 0 2px var(--ds-color-background), 0 0 0 4px var(--ds-color-primary);
}

.label {
  font-size: var(--ds-typography-size-md);
  color: var(--ds-color-text);
}`
    },
    {
      fileName: 'Switch.tsx',
      language: 'typescript',
      description: 'Native React Switch',
      content: `import React from 'react';
import styles from './Switch.module.css';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  label,
  disabled,
  className,
  ...props
}) => {
  return (
    <label className={\`\${styles.container} \${disabled ? styles.disabled : ''} \${className || ''}\`}>
      <div className={styles.switch}>
        <input 
          type="checkbox" 
          className={styles.input}
          disabled={disabled}
          {...props} 
        />
        <span className={styles.slider}></span>
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};`
    }
  ],
  badge: () => [
    {
      fileName: 'Badge.module.css',
      language: 'css',
      description: 'CSS Module',
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
      fileName: 'Badge.tsx',
      language: 'typescript',
      description: 'Native React Badge',
      content: `import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  children,
  className
}) => {
  return (
    <span className={\`\${styles.badge} \${styles[variant]} \${className || ''}\`}>
      {children}
    </span>
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
  ],
  avatar: () => [
    {
      fileName: 'Avatar.module.css',
      language: 'css',
      description: 'CSS Module',
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

.img {
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
      fileName: 'Avatar.tsx',
      language: 'typescript',
      description: 'Native React Avatar',
      content: `import React from 'react';
import styles from './Avatar.module.css';

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'circle' | 'square' | 'rounded';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  initials,
  size = 'md',
  variant = 'circle',
  className
}) => {
  return (
    <div className={\`\${styles.avatar} \${styles[size]} \${styles[variant]} \${className || ''}\`}>
      {src ? (
        <img src={src} alt={alt} className={styles.img} />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};`
    }
  ],
  spinner: () => [
    {
      fileName: 'Spinner.module.css',
      language: 'css',
      description: 'CSS Module',
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
      fileName: 'Spinner.tsx',
      language: 'typescript',
      description: 'Native React Spinner',
      content: `import React from 'react';
import styles from './Spinner.module.css';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  className
}) => {
  return (
    <div className={\`\${styles.spinner} \${styles[size]} \${variant === 'secondary' ? styles.secondary : ''} \${className || ''}\`} />
  );
};`
    }
  ],
  divider: () => [
    {
      fileName: 'Divider.module.css',
      language: 'css',
      description: 'CSS Module',
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
      fileName: 'Divider.tsx',
      language: 'typescript',
      description: 'Native React Divider',
      content: `import React from 'react';
import styles from './Divider.module.css';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  className
}) => {
  return (
    <div className={\`\${styles.divider} \${styles[orientation]} \${className || ''}\`} />
  );
};`
    }
  ],
  heading: () => [
    {
      fileName: 'Heading.module.css',
      language: 'css',
      description: 'CSS Module',
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
      fileName: 'Heading.tsx',
      language: 'typescript',
      description: 'Native React Heading',
      content: `import React from 'react';
import styles from './Heading.module.css';

interface HeadingProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2';
  color?: 'default' | 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Heading: React.FC<HeadingProps> = ({
  variant = 'h1',
  color = 'default',
  children,
  className,
  as
}) => {
  const Component = as || (variant.startsWith('h') ? variant : 'h6');
  return (
    <Component className={\`\${styles.heading} \${styles[variant]} \${color !== 'default' ? styles[color] : ''} \${className || ''}\`}>
      {children}
    </Component>
  );
};`
    }
  ],
  text: () => [
    {
      fileName: 'Text.module.css',
      language: 'css',
      description: 'CSS Module',
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
      fileName: 'Text.tsx',
      language: 'typescript',
      description: 'Native React Text',
      content: `import React from 'react';
import styles from './Text.module.css';

interface TextProps {
  variant?: 'body1' | 'body2' | 'caption';
  weight?: 'light' | 'normal' | 'medium' | 'bold';
  color?: 'default' | 'dim' | 'primary' | 'secondary' | 'error' | 'success';
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body1',
  weight = 'normal',
  color = 'default',
  children,
  className,
  as = 'p'
}) => {
  const Component = as;
  return (
    <Component className={\`\${styles.text} \${styles[variant]} \${styles[weight]} \${color !== 'default' ? styles[color] : ''} \${className || ''}\`}>
      {children}
    </Component>
  );
};`
    }
  ],
  link: () => [
    {
      fileName: 'Link.module.css',
      language: 'css',
      description: 'CSS Module',
      content: `.link {
  font-family: var(--ds-typography-family-base);
  color: var(--ds-color-primary);
  text-decoration: underline;
  cursor: pointer;
  font-weight: var(--ds-typography-weight-medium);
  transition: color 0.2s;
}
.link:hover {
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
      fileName: 'Link.tsx',
      language: 'typescript',
      description: 'Native React Link',
      content: `import React from 'react';
import styles from './Link.module.css';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'discrete';
}

export const Link: React.FC<LinkProps> = ({
  variant = 'default',
  className,
  children,
  ...props
}) => {
  return (
    <a 
      className={\`\${styles.link} \${variant === 'discrete' ? styles.discrete : ''} \${className || ''}\`}
      {...props}
    >
      {children}
    </a>
  );
};`
    }
  ]
};