import { DesignTokens, ComponentDefinition } from './types';

export const DEFAULT_TOKENS: DesignTokens = {
  // Colors
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  secondary: '#64748b',
  secondaryHover: '#475569',
  background: '#ffffff',
  surface: '#f8fafc',
  text: '#0f172a',
  textInverse: '#ffffff',
  border: '#e2e8f0',

  // Geometry
  borderRadiusSmall: '0.25rem',
  borderRadiusMedium: '0.5rem',
  borderRadiusLarge: '1rem',
  borderWidth: '1px',
  spacingUnit: '0.25rem',

  // Typography
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSizeSm: '0.875rem',
  fontSizeMd: '1rem',
  fontSizeLg: '1.125rem',
  fontWeightNormal: '400',
  fontWeightBold: '600',

  // Effects
  shadowSm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  shadowMd: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
};

export const SUPPORTED_COMPONENTS: ComponentDefinition[] = [
  { id: 'button', name: 'Button', type: 'atom', description: 'Interactive clickable element' },
  { id: 'input', name: 'Input', type: 'atom', description: 'Text input field with label' },
  { id: 'checkbox', name: 'Checkbox', type: 'atom', description: 'Binary selection input' },
  { id: 'checkbox-group', name: 'Checkbox Group', type: 'molecule', description: 'Group of checkboxes (Composite)' },
  { id: 'card', name: 'Card', type: 'organism', description: 'Container for grouping content' },
];