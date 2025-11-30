
import { DesignTokens, ComponentDefinition, TokenGroup, W3CToken, W3CColorScale, Brand } from './types';

// --- Helpers for Token Generation ---

const createW3CScale = (name: string, shades: Record<string, string>, defaultRef: string = '500'): W3CColorScale => {
  const scale: any = { DEFAULT: { $value: `{color.${name}.${defaultRef}}`, $type: 'color' } };
  Object.entries(shades).forEach(([key, value]) => {
    scale[key] = { $value: value, $type: 'color' };
  });
  return scale as W3CColorScale;
};

// --- 1. TECH BRAND (Default) ---
// Blue Primary, Slate Neutral, Inter Font

const TECH_PRIMARY = {
  50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa',
  500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a', 950: '#172554'
};
const TECH_NEUTRAL = {
  50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8',
  500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617'
};

const TECH_TOKENS: DesignTokens = {
  color: {
    primary: createW3CScale('primary', TECH_PRIMARY),
    secondary: createW3CScale('secondary', TECH_NEUTRAL), // Use slate as secondary
    neutral: createW3CScale('neutral', TECH_NEUTRAL),
    error: createW3CScale('error', { 50:'#fef2f2',100:'#fee2e2',200:'#fecaca',300:'#fca5a5',400:'#f87171',500:'#ef4444',600:'#dc2626',700:'#b91c1c',800:'#991b1b',900:'#7f1d1d',950:'#450a0a' }),
    success: createW3CScale('success', { 50:'#f0fdf4',100:'#dcfce7',200:'#bbf7d0',300:'#86efac',400:'#4ade80',500:'#22c55e',600:'#16a34a',700:'#15803d',800:'#166534',900:'#14532d',950:'#052e16' }),
    warning: createW3CScale('warning', { 50:'#fffbeb',100:'#fef3c7',200:'#fde68a',300:'#fcd34d',400:'#fbbf24',500:'#f59e0b',600:'#d97706',700:'#b45309',800:'#92400e',900:'#78350f',950:'#451a03' }),
    info: createW3CScale('info', { 50:'#f0f9ff',100:'#e0f2fe',200:'#bae6fd',300:'#7dd3fc',400:'#38bdf8',500:'#0ea5e9',600:'#0284c7',700:'#0369a1',800:'#075985',900:'#0c4a6e',950:'#082f49' }),
    
    // Semantics
    background: { $value: '{color.neutral.50}', $type: 'color' },
    surface: { $value: '#ffffff', $type: 'color' },
    surfaceHighlight: { $value: '{color.neutral.100}', $type: 'color' },
    text: { $value: '{color.neutral.900}', $type: 'color' },
    textDim: { $value: '{color.neutral.500}', $type: 'color' },
    textInverse: { $value: '#ffffff', $type: 'color' },
    border: { $value: '{color.neutral.200}', $type: 'color' },
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

// --- 2. NATURE BRAND (Eco) ---
// Green Primary, Stone Neutral, Rounded

const NATURE_PRIMARY = {
  50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399',
  500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b', 950: '#022c22'
};
const NATURE_NEUTRAL = {
  50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1', 400: '#a8a29e',
  500: '#78716c', 600: '#57534e', 700: '#44403c', 800: '#292524', 900: '#1c1917', 950: '#0c0a09'
};

const NATURE_TOKENS = JSON.parse(JSON.stringify(TECH_TOKENS));
NATURE_TOKENS.color.primary = createW3CScale('primary', NATURE_PRIMARY);
NATURE_TOKENS.color.secondary = createW3CScale('secondary', NATURE_NEUTRAL);
NATURE_TOKENS.color.neutral = createW3CScale('neutral', NATURE_NEUTRAL);
// More rounded geometry
NATURE_TOKENS.geometry.radius = {
  sm: { $value: '0.5rem', $type: 'dimension' },
  md: { $value: '0.75rem', $type: 'dimension' },
  lg: { $value: '1.5rem', $type: 'dimension' },
};
// Different font
NATURE_TOKENS.typography.family.base = { $value: 'System UI, -apple-system, sans-serif', $type: 'fontFamily' };


// --- 3. CREATIVE BRAND (Vibrant) ---
// Violet Primary, Zinc Neutral, Playful

const CREATIVE_PRIMARY = {
  50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa',
  500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065'
};
const CREATIVE_NEUTRAL = {
  50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa',
  500: '#71717a', 600: '#52525b', 700: '#3f3f46', 800: '#27272a', 900: '#18181b', 950: '#09090b'
};

const CREATIVE_TOKENS = JSON.parse(JSON.stringify(TECH_TOKENS));
CREATIVE_TOKENS.color.primary = createW3CScale('primary', CREATIVE_PRIMARY);
CREATIVE_TOKENS.color.secondary = createW3CScale('secondary', { // Pinkish Secondary
  50:'#fdf2f8',100:'#fce7f3',200:'#fbcfe8',300:'#f9a8d4',400:'#f472b6',500:'#ec4899',600:'#db2777',700:'#be185d',800:'#9d174d',900:'#831843',950:'#500724'
}, '500');
CREATIVE_TOKENS.color.neutral = createW3CScale('neutral', CREATIVE_NEUTRAL);
// Tighter spacing
CREATIVE_TOKENS.geometry.spacing.base = { $value: '0.2rem', $type: 'dimension' };
// Sharp radius
CREATIVE_TOKENS.geometry.radius = {
  sm: { $value: '2px', $type: 'dimension' },
  md: { $value: '4px', $type: 'dimension' },
  lg: { $value: '8px', $type: 'dimension' },
};


// --- 4. FUNKY ALIEN GLITCH RETRO (Experimental) ---
// Acid Green, Hot Pink, Void Black Background, Monospace, Sharp edges

const ALIEN_PRIMARY = {
  50: '#f7fee7', 100: '#ecfccb', 200: '#d9f99d', 300: '#bef264', 400: '#a3e635',
  500: '#84cc16', 600: '#65a30d', 700: '#4d7c0f', 800: '#3f6212', 900: '#365314', 950: '#1a2e05'
};

const ALIEN_SECONDARY = {
  50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc', 400: '#e879f9',
  500: '#d946ef', 600: '#c026d3', 700: '#a21caf', 800: '#86198f', 900: '#701a75', 950: '#4a044e'
};

const ALIEN_NEUTRAL = {
  50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa',
  500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065'
};

const ALIEN_TOKENS = JSON.parse(JSON.stringify(TECH_TOKENS));
ALIEN_TOKENS.color.primary = createW3CScale('primary', {
    50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80', 
    500: '#39ff14', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d', 950: '#052e16'
}, '500'); // Explicit Neon Green
ALIEN_TOKENS.color.secondary = createW3CScale('secondary', ALIEN_SECONDARY);
ALIEN_TOKENS.color.neutral = createW3CScale('neutral', ALIEN_NEUTRAL);

// Override Background for deep space feel
ALIEN_TOKENS.color.background = { $value: '#050505', $type: 'color' };
ALIEN_TOKENS.color.surface = { $value: '#111111', $type: 'color' };
ALIEN_TOKENS.color.text = { $value: '#39ff14', $type: 'color' }; // Green text default
ALIEN_TOKENS.color.border = { $value: '#39ff14', $type: 'color' }; 

// Sharp Geometry
ALIEN_TOKENS.geometry.radius = {
  sm: { $value: '0px', $type: 'dimension' },
  md: { $value: '0px', $type: 'dimension' },
  lg: { $value: '0px', $type: 'dimension' },
};
ALIEN_TOKENS.geometry.border.width = { $value: '2px', $type: 'dimension' };

// Retro Typography
ALIEN_TOKENS.typography.family.base = { $value: '"Courier New", Courier, monospace', $type: 'fontFamily' };
ALIEN_TOKENS.typography.family.mono = { $value: '"VT323", monospace', $type: 'fontFamily' };


// --- Generate Dark Modes ---
const createDark = (tokens: DesignTokens) => {
  const dt = JSON.parse(JSON.stringify(tokens));
  dt.color.background = { $value: '{color.neutral.950}', $type: 'color' };
  dt.color.surface = { $value: '{color.neutral.900}', $type: 'color' };
  dt.color.surfaceHighlight = { $value: '{color.neutral.800}', $type: 'color' };
  dt.color.text = { $value: '{color.neutral.50}', $type: 'color' };
  dt.color.textDim = { $value: '{color.neutral.400}', $type: 'color' };
  dt.color.textInverse = { $value: '{color.neutral.950}', $type: 'color' };
  dt.color.border = { $value: '{color.neutral.700}', $type: 'color' };
  dt.effect.shadow.sm = { $value: '0 1px 2px 0 rgb(0 0 0 / 0.5)', $type: 'shadow' };
  dt.effect.shadow.md = { $value: '0 4px 6px -1px rgb(0 0 0 / 0.5)', $type: 'shadow' };
  return dt;
};

// --- EXPORT BRANDS ---

export const DEFAULT_BRANDS: Brand[] = [
  {
    id: 'tech-brand',
    name: 'Tech UI',
    description: 'Clean, professional interface optimized for SaaS applications.',
    themes: [
      { id: 'tech-light', name: 'Standard Light', mode: 'light', tokens: TECH_TOKENS },
      { id: 'tech-dark', name: 'Midnight Dark', mode: 'dark', tokens: createDark(TECH_TOKENS) }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'nature-brand',
    name: 'Nature & Co',
    description: 'Organic, calming aesthetics with softer geometry and earth tones.',
    themes: [
      { id: 'nature-light', name: 'Forest Light', mode: 'light', tokens: NATURE_TOKENS },
      { id: 'nature-dark', name: 'Deep Woods', mode: 'dark', tokens: createDark(NATURE_TOKENS) }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'creative-brand',
    name: 'Creative Studio',
    description: 'Vibrant, high-contrast design for portfolio and art directions.',
    themes: [
      { id: 'creative-light', name: 'Studio Light', mode: 'light', tokens: CREATIVE_TOKENS },
      { id: 'creative-dark', name: 'Neon Dark', mode: 'dark', tokens: createDark(CREATIVE_TOKENS) }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alien-brand',
    name: 'Funky Alien',
    description: 'Glitchy, retro-futuristic aesthetic with neon greens and deep voids.',
    themes: [
      // Alien theme is inherently dark/high-contrast, so Light mode is just a slightly inverted version
      { id: 'alien-light', name: 'Hacker Terminal', mode: 'dark', tokens: ALIEN_TOKENS }, 
      { id: 'alien-dark', name: 'Deep Space', mode: 'dark', tokens: createDark(ALIEN_TOKENS) }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const DEFAULT_TOKENS = TECH_TOKENS; // Fallback export if needed

export const SUPPORTED_COMPONENTS: ComponentDefinition[] = [
  { id: 'button', name: 'Button', type: 'atom', description: 'Interactive clickable element' },
  { id: 'input', name: 'Input', type: 'atom', description: 'Text input field with label' },
  { id: 'select', name: 'Select', type: 'molecule', description: 'Dropdown selection control' },
  { id: 'search-box', name: 'Search Box', type: 'molecule', description: 'Input with search icon' },
  { id: 'label', name: 'Label', type: 'atom', description: 'Form field label' },
  { id: 'icon', name: 'Icon', type: 'atom', description: 'SVG Icon wrapper' },
  { id: 'image', name: 'Image', type: 'atom', description: 'Responsive image container' },
  { id: 'checkbox', name: 'Checkbox', type: 'atom', description: 'Binary selection input' },
  { id: 'radio', name: 'Radio', type: 'atom', description: 'Single selection input' },
  { id: 'switch', name: 'Switch', type: 'atom', description: 'Toggle switch control' },
  { id: 'badge', name: 'Badge', type: 'atom', description: 'Status indicator label' },
  { id: 'avatar', name: 'Avatar', type: 'atom', description: 'Profile image or initials' },
  { id: 'spinner', name: 'Spinner', type: 'atom', description: 'Loading indicator' },
  { id: 'divider', name: 'Divider', type: 'atom', description: 'Separation line' },
  { id: 'typography', name: 'Typography', type: 'atom', description: 'Text and headings' },
  { id: 'link', name: 'Link', type: 'atom', description: 'Hyperlink element' },
  { id: 'form-field', name: 'Form Field', type: 'molecule', description: 'Wrapper with label, error, and helper' },
  { id: 'button-group', name: 'Button Group', type: 'molecule', description: 'Group of connected buttons' },
  { id: 'input-group', name: 'Input Group', type: 'molecule', description: 'Input with attached buttons or text' },
  { id: 'tabs', name: 'Tabs', type: 'molecule', description: 'Tabbed navigation content' },
  { id: 'checkbox-group', name: 'Checkbox Group', type: 'molecule', description: 'Group of checkboxes (Composite)' },
  { id: 'radio-group', name: 'Radio Group', type: 'molecule', description: 'Group of radio buttons (Composite)' },
  { id: 'alert', name: 'Alert', type: 'molecule', description: 'Feedback/Notification message' },
  { id: 'card', name: 'Card', type: 'organism', description: 'Container for grouping content' },
  { id: 'modal', name: 'Modal', type: 'organism', description: 'Overlay dialog window' },
  { id: 'drawer', name: 'Drawer', type: 'organism', description: 'Sliding sidebar panel' },
  { id: 'navbar', name: 'Navbar', type: 'organism', description: 'Top level navigation header' },
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
