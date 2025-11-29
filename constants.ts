import { DesignTokens, ComponentDefinition, TokenGroup, W3CToken, W3CColorScale } from './types';

// Helper to create a scale
const createScale = (hue: string, primaryShade: string): W3CColorScale => ({
  50: { $value: `${hue}50`, $type: 'color' },
  100: { $value: `${hue}100`, $type: 'color' },
  200: { $value: `${hue}200`, $type: 'color' },
  300: { $value: `${hue}300`, $type: 'color' },
  400: { $value: `${hue}400`, $type: 'color' },
  500: { $value: `${hue}500`, $type: 'color' },
  600: { $value: `${hue}600`, $type: 'color' },
  700: { $value: `${hue}700`, $type: 'color' },
  800: { $value: `${hue}800`, $type: 'color' },
  900: { $value: `${hue}900`, $type: 'color' },
  950: { $value: `${hue}950`, $type: 'color' },
  DEFAULT: { $value: `{color.${hue.replace('-', '')}.${primaryShade}}`, $type: 'color' }
});

export const DEFAULT_TOKENS: DesignTokens = {
  color: {
    primary: {
      50: { $value: '#eff6ff', $type: 'color' },
      100: { $value: '#dbeafe', $type: 'color' },
      200: { $value: '#bfdbfe', $type: 'color' },
      300: { $value: '#93c5fd', $type: 'color' },
      400: { $value: '#60a5fa', $type: 'color' },
      500: { $value: '#3b82f6', $type: 'color' }, // Base
      600: { $value: '#2563eb', $type: 'color' },
      700: { $value: '#1d4ed8', $type: 'color' },
      800: { $value: '#1e40af', $type: 'color' },
      900: { $value: '#1e3a8a', $type: 'color' },
      950: { $value: '#172554', $type: 'color' },
      DEFAULT: { $value: '{color.primary.500}', $type: 'color' }
    },
    secondary: {
      50: { $value: '#f8fafc', $type: 'color' },
      100: { $value: '#f1f5f9', $type: 'color' },
      200: { $value: '#e2e8f0', $type: 'color' },
      300: { $value: '#cbd5e1', $type: 'color' },
      400: { $value: '#94a3b8', $type: 'color' },
      500: { $value: '#64748b', $type: 'color' }, // Base
      600: { $value: '#475569', $type: 'color' },
      700: { $value: '#334155', $type: 'color' },
      800: { $value: '#1e293b', $type: 'color' },
      900: { $value: '#0f172a', $type: 'color' },
      950: { $value: '#020617', $type: 'color' },
      DEFAULT: { $value: '{color.secondary.500}', $type: 'color' }
    },
    neutral: {
      50: { $value: '#f9fafb', $type: 'color' },
      100: { $value: '#f3f4f6', $type: 'color' },
      200: { $value: '#e5e7eb', $type: 'color' },
      300: { $value: '#d1d5db', $type: 'color' },
      400: { $value: '#9ca3af', $type: 'color' },
      500: { $value: '#6b7280', $type: 'color' },
      600: { $value: '#4b5563', $type: 'color' },
      700: { $value: '#374151', $type: 'color' },
      800: { $value: '#1f2937', $type: 'color' },
      900: { $value: '#111827', $type: 'color' },
      950: { $value: '#030712', $type: 'color' },
      DEFAULT: { $value: '{color.neutral.500}', $type: 'color' }
    },
    
    // Status Colors (Scales)
    error: {
      50: { $value: '#fef2f2', $type: 'color' },
      100: { $value: '#fee2e2', $type: 'color' },
      200: { $value: '#fecaca', $type: 'color' },
      300: { $value: '#fca5a5', $type: 'color' },
      400: { $value: '#f87171', $type: 'color' },
      500: { $value: '#ef4444', $type: 'color' }, // Base
      600: { $value: '#dc2626', $type: 'color' },
      700: { $value: '#b91c1c', $type: 'color' },
      800: { $value: '#991b1b', $type: 'color' },
      900: { $value: '#7f1d1d', $type: 'color' },
      950: { $value: '#450a0a', $type: 'color' },
      DEFAULT: { $value: '{color.error.500}', $type: 'color' }
    },
    success: {
      50: { $value: '#f0fdf4', $type: 'color' },
      100: { $value: '#dcfce7', $type: 'color' },
      200: { $value: '#bbf7d0', $type: 'color' },
      300: { $value: '#86efac', $type: 'color' },
      400: { $value: '#4ade80', $type: 'color' },
      500: { $value: '#22c55e', $type: 'color' }, // Base
      600: { $value: '#16a34a', $type: 'color' },
      700: { $value: '#15803d', $type: 'color' },
      800: { $value: '#166534', $type: 'color' },
      900: { $value: '#14532d', $type: 'color' },
      950: { $value: '#052e16', $type: 'color' },
      DEFAULT: { $value: '{color.success.500}', $type: 'color' }
    },
    warning: {
      50: { $value: '#fffbeb', $type: 'color' },
      100: { $value: '#fef3c7', $type: 'color' },
      200: { $value: '#fde68a', $type: 'color' },
      300: { $value: '#fcd34d', $type: 'color' },
      400: { $value: '#fbbf24', $type: 'color' },
      500: { $value: '#f59e0b', $type: 'color' }, // Base
      600: { $value: '#d97706', $type: 'color' },
      700: { $value: '#b45309', $type: 'color' },
      800: { $value: '#92400e', $type: 'color' },
      900: { $value: '#78350f', $type: 'color' },
      950: { $value: '#451a03', $type: 'color' },
      DEFAULT: { $value: '{color.warning.500}', $type: 'color' }
    },
    info: {
      50: { $value: '#f0f9ff', $type: 'color' },
      100: { $value: '#e0f2fe', $type: 'color' },
      200: { $value: '#bae6fd', $type: 'color' },
      300: { $value: '#7dd3fc', $type: 'color' },
      400: { $value: '#38bdf8', $type: 'color' },
      500: { $value: '#0ea5e9', $type: 'color' }, // Base
      600: { $value: '#0284c7', $type: 'color' },
      700: { $value: '#0369a1', $type: 'color' },
      800: { $value: '#075985', $type: 'color' },
      900: { $value: '#0c4a6e', $type: 'color' },
      950: { $value: '#082f49', $type: 'color' },
      DEFAULT: { $value: '{color.info.500}', $type: 'color' }
    },

    // Semantic Aliases
    background: { $value: '{color.neutral.50}', $type: 'color' },
    surface: { $value: '#ffffff', $type: 'color' },
    surfaceHighlight: { $value: '{color.neutral.100}', $type: 'color' },
    text: { $value: '{color.neutral.900}', $type: 'color' },
    textDim: { $value: '{color.neutral.500}', $type: 'color' },
    textInverse: { $value: '#ffffff', $type: 'color' },
    border: { $value: '{color.neutral.200}', $type: 'color' },

    // Legacy/Convenience Aliases for Templates
    primaryHover: { $value: '{color.primary.600}', $type: 'color' },
    secondaryHover: { $value: '{color.secondary.600}', $type: 'color' },
  },
  
  geometry: {
    spacing: { base: { $value: '0.25rem', $type: 'dimension' } },
    border: { width: { $value: '1px', $type: 'dimension' } },
    radius: {
      sm: { $value: '0.25rem', $type: 'dimension' },
      md: { $value: '0.5rem', $type: 'dimension' },
      lg: { $value: '1rem', $type: 'dimension' },
    }
  },

  typography: {
    family: { 
      base: { $value: 'Inter, system-ui, sans-serif', $type: 'fontFamily' },
      mono: { $value: 'JetBrains Mono, monospace', $type: 'fontFamily' }
    },
    size: {
      xs: { $value: '0.75rem', $type: 'dimension' },
      sm: { $value: '0.875rem', $type: 'dimension' },
      md: { $value: '1rem', $type: 'dimension' },
      lg: { $value: '1.125rem', $type: 'dimension' },
      xl: { $value: '1.25rem', $type: 'dimension' },
      '2xl': { $value: '1.5rem', $type: 'dimension' },
      '3xl': { $value: '1.875rem', $type: 'dimension' },
      '4xl': { $value: '2.25rem', $type: 'dimension' },
    },
    weight: {
      light: { $value: '300', $type: 'fontWeight' },
      normal: { $value: '400', $type: 'fontWeight' },
      medium: { $value: '500', $type: 'fontWeight' },
      semibold: { $value: '600', $type: 'fontWeight' },
      bold: { $value: '700', $type: 'fontWeight' },
      // Numeric weights for mapping
      100: { $value: '100', $type: 'fontWeight' },
      200: { $value: '200', $type: 'fontWeight' },
      300: { $value: '300', $type: 'fontWeight' },
      400: { $value: '400', $type: 'fontWeight' },
      500: { $value: '500', $type: 'fontWeight' },
      600: { $value: '600', $type: 'fontWeight' },
      700: { $value: '700', $type: 'fontWeight' },
      800: { $value: '800', $type: 'fontWeight' },
      900: { $value: '900', $type: 'fontWeight' },
    },
    lineHeight: {
      tight: { $value: '1.25', $type: 'number' },
      normal: { $value: '1.5', $type: 'number' },
      relaxed: { $value: '1.75', $type: 'number' },
    },
    variants: {
      h1: { fontSize: { $value: '2.5rem', $type: 'dimension'}, fontWeight: { $value: '700', $type: 'fontWeight' }, lineHeight: { $value: '1.2', $type: 'number' } },
      h2: { fontSize: { $value: '2rem', $type: 'dimension'}, fontWeight: { $value: '700', $type: 'fontWeight' }, lineHeight: { $value: '1.2', $type: 'number' } },
      h3: { fontSize: { $value: '1.75rem', $type: 'dimension'}, fontWeight: { $value: '600', $type: 'fontWeight' }, lineHeight: { $value: '1.2', $type: 'number' } },
      h4: { fontSize: { $value: '1.5rem', $type: 'dimension'}, fontWeight: { $value: '600', $type: 'fontWeight' }, lineHeight: { $value: '1.2', $type: 'number' } },
      h5: { fontSize: { $value: '1.25rem', $type: 'dimension'}, fontWeight: { $value: '600', $type: 'fontWeight' }, lineHeight: { $value: '1.2', $type: 'number' } },
      h6: { fontSize: { $value: '1rem', $type: 'dimension'}, fontWeight: { $value: '600', $type: 'fontWeight' }, lineHeight: { $value: '1.2', $type: 'number' } },
      subtitle1: { fontSize: { $value: '1rem', $type: 'dimension'}, fontWeight: { $value: '400', $type: 'fontWeight' }, lineHeight: { $value: '1.5', $type: 'number' } },
      subtitle2: { fontSize: { $value: '0.875rem', $type: 'dimension'}, fontWeight: { $value: '500', $type: 'fontWeight' }, lineHeight: { $value: '1.5', $type: 'number' } },
      body1: { fontSize: { $value: '1rem', $type: 'dimension'}, fontWeight: { $value: '400', $type: 'fontWeight' }, lineHeight: { $value: '1.5', $type: 'number' } },
      body2: { fontSize: { $value: '0.875rem', $type: 'dimension'}, fontWeight: { $value: '400', $type: 'fontWeight' }, lineHeight: { $value: '1.43', $type: 'number' } },
      caption: { fontSize: { $value: '0.75rem', $type: 'dimension'}, fontWeight: { $value: '400', $type: 'fontWeight' }, lineHeight: { $value: '1.66', $type: 'number' } },
    }
  },

  effect: {
    shadow: {
      sm: { $value: '0 1px 2px 0 rgb(0 0 0 / 0.05)', $type: 'shadow' },
      md: { $value: '0 4px 6px -1px rgb(0 0 0 / 0.1)', $type: 'shadow' },
    }
  }
};

export const SUPPORTED_COMPONENTS: ComponentDefinition[] = [
  { id: 'button', name: 'Button', type: 'atom', description: 'Interactive clickable element' },
  { id: 'input', name: 'Input', type: 'atom', description: 'Text input field with label' },
  { id: 'checkbox', name: 'Checkbox', type: 'atom', description: 'Binary selection input' },
  { id: 'radio', name: 'Radio', type: 'atom', description: 'Single selection input' },
  { id: 'switch', name: 'Switch', type: 'atom', description: 'Toggle switch control' },
  { id: 'badge', name: 'Badge', type: 'atom', description: 'Status indicator label' },
  { id: 'avatar', name: 'Avatar', type: 'atom', description: 'Profile image or initials' },
  { id: 'spinner', name: 'Spinner', type: 'atom', description: 'Loading indicator' },
  { id: 'divider', name: 'Divider', type: 'atom', description: 'Separation line' },
  { id: 'text', name: 'Text', type: 'atom', description: 'Body copy and captions' },
  { id: 'heading', name: 'Heading', type: 'atom', description: 'Headings and subtitles' },
  { id: 'link', name: 'Link', type: 'atom', description: 'Hyperlink element' },
  { id: 'checkbox-group', name: 'Checkbox Group', type: 'molecule', description: 'Group of checkboxes (Composite)' },
  { id: 'radio-group', name: 'Radio Group', type: 'molecule', description: 'Group of radio buttons (Composite)' },
  { id: 'alert', name: 'Alert', type: 'molecule', description: 'Feedback/Notification message' },
  { id: 'card', name: 'Card', type: 'organism', description: 'Container for grouping content' },
];

export { TokenGroup };

export const TOKEN_GROUPS: TokenGroup[] = [
  {
    title: 'Brand Palettes',
    icon: 'Palette',
    color: 'text-blue-500',
    description: 'Core color scales generated from base hues.',
    fields: [
      { label: 'Primary Scale', path: 'color.primary', type: 'scale' },
      { label: 'Secondary Scale', path: 'color.secondary', type: 'scale' },
      { label: 'Neutral Scale', path: 'color.neutral', type: 'scale' },
    ]
  },
  {
    title: 'Status Colors',
    icon: 'AlertCircle',
    color: 'text-red-500',
    description: 'Feedback palettes (Error, Success, Warning, Info).',
    fields: [
      { label: 'Info Scale', path: 'color.info', type: 'scale' },
      { label: 'Success Scale', path: 'color.success', type: 'scale' },
      { label: 'Warning Scale', path: 'color.warning', type: 'scale' },
      { label: 'Error Scale', path: 'color.error', type: 'scale' },
    ]
  },
  {
    title: 'Semantic Mapping',
    icon: 'MousePointer2',
    color: 'text-purple-500',
    description: 'Contextual aliases mapped to the brand palette.',
    fields: [
      { label: 'Background', path: 'color.background', type: 'alias' },
      { label: 'Surface', path: 'color.surface', type: 'alias' },
      { label: 'Text', path: 'color.text', type: 'alias' },
      { label: 'Text Inverse', path: 'color.textInverse', type: 'alias' },
      { label: 'Border', path: 'color.border', type: 'alias' },
    ]
  },
  {
    title: 'Geometry',
    icon: 'BoxSelect',
    color: 'text-green-500',
    fields: [
      { label: 'Base Spacing', path: 'geometry.spacing.base', type: 'text' },
      { label: 'Border Width', path: 'geometry.border.width', type: 'text' },
      { label: 'Radius Small', path: 'geometry.radius.sm', type: 'text' },
      { label: 'Radius Medium', path: 'geometry.radius.md', type: 'text' },
      { label: 'Radius Large', path: 'geometry.radius.lg', type: 'text' },
    ]
  },
  {
    title: 'Typography',
    icon: 'Type',
    color: 'text-orange-500',
    fields: [
      { label: 'Font Family', path: 'typography.family.base', type: 'text' },
      { label: 'Size Sm', path: 'typography.size.sm', type: 'text' },
      { label: 'Size Md', path: 'typography.size.md', type: 'text' },
      { label: 'Size Lg', path: 'typography.size.lg', type: 'text' },
      { label: 'Weight Norm', path: 'typography.weight.normal', type: 'text' },
      { label: 'Weight Bold', path: 'typography.weight.bold', type: 'text' },
      // New Variant Inputs
      { label: 'H1 Size', path: 'typography.variants.h1.fontSize', type: 'text' },
      { label: 'Body1 Size', path: 'typography.variants.body1.fontSize', type: 'text' },
    ]
  },
  {
    title: 'Effects',
    icon: 'Sparkles',
    color: 'text-indigo-500',
    fields: [
      { label: 'Shadow Sm', path: 'effect.shadow.sm', type: 'text' },
      { label: 'Shadow Md', path: 'effect.shadow.md', type: 'text' },
    ]
  }
];