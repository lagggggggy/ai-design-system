export interface DesignTokens {
  // Colors
  primary: string;
  primaryHover: string; // State color
  secondary: string;
  secondaryHover: string; // State color
  background: string;
  surface: string;
  text: string;
  textInverse: string;
  border: string;

  // Geometry
  borderRadiusSmall: string;
  borderRadiusMedium: string;
  borderRadiusLarge: string;
  borderWidth: string;
  spacingUnit: string;

  // Typography
  fontFamily: string;
  fontSizeSm: string;
  fontSizeMd: string;
  fontSizeLg: string;
  fontWeightNormal: string;
  fontWeightBold: string;

  // Effects
  shadowSm: string;
  shadowMd: string;
}

export interface GeneratedFile {
  fileName: string;
  content: string;
  language: 'typescript' | 'html' | 'css' | 'json';
  description: string;
}

export type GenerationStrategy = 'web-component' | 'native-react' | 'native-angular';

export type ComponentType = 'button' | 'checkbox' | 'checkbox-group' | 'input' | 'card';

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