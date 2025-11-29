import { DesignTokens, ComponentType, GeneratedFile, GenerationStrategy } from '../types';
import { litTemplates } from '../templates/litTemplates';
import { nativeReactTemplates } from '../templates/nativeReactTemplates';
import { nativeAngularTemplates } from '../templates/nativeAngularTemplates';

// We pass the full DesignTokens object to templates now.
// The templates are responsible for using the correct CSS variable names (which are standardized).
// See templates/*.ts for the variable usage.

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