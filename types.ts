
import React from 'react';

export interface W3CToken {
  $value: string;
  $type: string;
  $description?: string;
}

export interface W3CColorScale {
  50: W3CToken;
  100: W3CToken;
  200: W3CToken;
  300: W3CToken;
  400: W3CToken;
  500: W3CToken;
  600: W3CToken;
  700: W3CToken;
  800: W3CToken;
  900: W3CToken;
  950: W3CToken;
  DEFAULT: W3CToken; // Maps to the base name (e.g. --ds-color-primary)
}

export interface DesignTokens {
  color: {
    primary: W3CColorScale;
    secondary: W3CColorScale;
    neutral: W3CColorScale;
    
    // Semantics (Can be aliases or direct values)
    background: W3CToken;
    surface: W3CToken;
    surfaceHighlight: W3CToken;
    text: W3CToken;
    textDim: W3CToken;
    textInverse: W3CToken;
    border: W3CToken;

    // Status Colors - Now full scales
    error: W3CColorScale;
    success: W3CColorScale;
    warning: W3CColorScale;
    info: W3CColorScale;
    
    // Component specific (Legacy support for templates using these specific semantic names)
    primaryHover: W3CToken; 
    secondaryHover: W3CToken;
  };
  
  geometry: {
    spacing: {
      base: W3CToken;
    };
    border: {
      width: W3CToken;
    };
    radius: {
      sm: W3CToken;
      md: W3CToken;
      lg: W3CToken;
    };
  };

  typography: {
    family: {
      base: W3CToken;
      mono: W3CToken;
    };
    size: {
      xs: W3CToken;
      sm: W3CToken;
      md: W3CToken;
      lg: W3CToken;
      xl: W3CToken;
      '2xl': W3CToken;
      '3xl': W3CToken;
      '4xl': W3CToken;
    };
    weight: {
      light: W3CToken;
      normal: W3CToken;
      medium: W3CToken;
      semibold: W3CToken;
      bold: W3CToken;
      100: W3CToken;
      200: W3CToken;
      300: W3CToken;
      400: W3CToken;
      500: W3CToken;
      600: W3CToken;
      700: W3CToken;
      800: W3CToken;
      900: W3CToken;
    };
    lineHeight: {
      tight: W3CToken;
      normal: W3CToken;
      relaxed: W3CToken;
    };
    variants: {
      h1: TypographyVariant;
      h2: TypographyVariant;
      h3: TypographyVariant;
      h4: TypographyVariant;
      h5: TypographyVariant;
      h6: TypographyVariant;
      subtitle1: TypographyVariant;
      subtitle2: TypographyVariant;
      body1: TypographyVariant;
      body2: TypographyVariant;
      caption: TypographyVariant;
    }
  };

  effect: {
    shadow: {
      sm: W3CToken;
      md: W3CToken;
    };
  };
}

export interface Theme {
  id: string;
  name: string;
  mode: 'light' | 'dark';
  tokens: DesignTokens;
}

export interface Brand {
  id: string;
  name: string;
  description?: string;
  themes: Theme[];
  createdAt: string;
  updatedAt: string;
}

export interface TypographyVariant {
  fontSize: W3CToken;
  fontWeight: W3CToken;
  lineHeight: W3CToken;
}

export interface GeneratedFile {
  fileName: string;
  content: string;
  language: 'typescript' | 'html' | 'css' | 'json';
  description: string;
}

export type GenerationStrategy = 'web-component' | 'native-react' | 'native-angular';

export type ComponentType = 
  | 'button' 
  | 'checkbox' 
  | 'checkbox-group' 
  | 'input' 
  | 'card' 
  | 'badge' 
  | 'switch' 
  | 'radio' 
  | 'radio-group' 
  | 'alert' 
  | 'avatar' 
  | 'spinner' 
  | 'divider' 
  | 'typography'
  | 'link'
  | 'label'
  | 'icon'
  | 'image'
  | 'select'
  | 'search-box'
  | 'form-field'
  | 'button-group'
  | 'input-group'
  | 'tabs'
  | 'modal'
  | 'drawer'
  | 'navbar';

export interface ComponentDefinition {
  id: ComponentType;
  name: string;
  type: 'atom' | 'molecule' | 'organism';
  description: string;
}

export interface GeneratorOutput {
  strategy: GenerationStrategy;
  files: GeneratedFile[];
}

export interface TokenField {
  label: string;
  path: string;
  type: 'color' | 'text' | 'scale' | 'alias';
  description?: string;
}

export interface TokenGroup {
  title: string;
  icon: string;
  color: string;
  description?: string;
  fields: TokenField[];
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'ds-badge': any;
      'ds-radio': any;
      'ds-radio-group': any;
      'ds-alert': any;
      'ds-button': any;
      'ds-input': any;
      'ds-checkbox': any;
      'ds-switch': any;
      'ds-checkbox-group': any;
      'ds-card': any;
      'ds-avatar': any;
      'ds-spinner': any;
      'ds-divider': any;
      'ds-typography': any;
      'ds-link': any;
      'ds-label': any;
      'ds-icon': any;
      'ds-image': any;
      'ds-select': any;
      'ds-search-box': any;
      'ds-form-field': any;
      'ds-button-group': any;
      'ds-input-group': any;
      'ds-tabs': any;
      'ds-tab': any;
      'ds-tab-panel': any;
      'ds-modal': any;
      'ds-drawer': any;
      'ds-navbar': any;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-badge': any;
      'ds-radio': any;
      'ds-radio-group': any;
      'ds-alert': any;
      'ds-button': any;
      'ds-input': any;
      'ds-checkbox': any;
      'ds-switch': any;
      'ds-checkbox-group': any;
      'ds-card': any;
      'ds-avatar': any;
      'ds-spinner': any;
      'ds-divider': any;
      'ds-typography': any;
      'ds-link': any;
      'ds-label': any;
      'ds-icon': any;
      'ds-image': any;
      'ds-select': any;
      'ds-search-box': any;
      'ds-form-field': any;
      'ds-button-group': any;
      'ds-input-group': any;
      'ds-tabs': any;
      'ds-tab': any;
      'ds-tab-panel': any;
      'ds-modal': any;
      'ds-drawer': any;
      'ds-navbar': any;
    }
  }
}
