
import { DesignTokens, W3CToken } from '../types';

/**
 * Resolves W3C aliases like "{color.primary.500}" to CSS var "--ds-color-primary-500"
 */
function resolveAliasToVar(value: string | number | undefined | null): string {
  if (value === undefined || value === null) return '';
  const strValue = String(value);
  if (strValue.startsWith('{') && strValue.endsWith('}')) {
    const path = strValue.slice(1, -1); // remove { and }
    const varName = `--ds-${path.replace(/\./g, '-')}`;
    return `var(${varName})`;
  }
  return strValue;
}

/**
 * Flattens a nested W3C Token object into CSS variables.
 * Handles:
 * 1. Deep nesting (color.primary.50 -> --ds-color-primary-50)
 * 2. DEFAULT keys (color.primary.DEFAULT -> --ds-color-primary)
 * 3. W3C Aliases ({color.primary.500} -> var(--ds-color-primary-500))
 */
export function flattenTokensToCSS(tokens: DesignTokens): React.CSSProperties {
  const cssVars: Record<string, string> = {};

  const traverse = (obj: any, prefix: string) => {
    if (!obj || typeof obj !== 'object') return;

    for (const key in obj) {
      // Handle meta keys
      if (key === '$value') {
        // We found a token value
        const val = obj[key];
        const resolvedVal = resolveAliasToVar(val);
        
        // If the current object was reached via a DEFAULT key in the previous step,
        // it's handled by the parent loop's conditional logic usually, 
        // BUT in our data structure, DEFAULT is a sibling key.
        // So we just add the prefix.
        if (prefix) {
            cssVars[`--ds-${prefix}`] = resolvedVal;
        }
        return;
      }
      if (key === '$type' || key === '$description') continue;
      
      // Handle Nested Objects (including Scales)
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        
        // Special Handling for DEFAULT key:
        // If we encounter 'DEFAULT', we map it to the parent prefix directly.
        // e.g. color.primary.DEFAULT maps to --ds-color-primary
        if (key === 'DEFAULT') {
            const val = obj[key].$value;
            if (val !== undefined && val !== null) {
                cssVars[`--ds-${prefix}`] = resolveAliasToVar(val);
            }
            continue; 
        }

        const nextPrefix = prefix ? `${prefix}-${key}` : key;
        traverse(obj[key], nextPrefix);
      }
    }
  };

  traverse(tokens, '');
  return cssVars as React.CSSProperties;
}

/**
 * Helper to get value from dot notation path
 */
export function getTokenValue(tokens: any, path: string): string {
  const parts = path.split('.');
  let current = tokens;
  for (const part of parts) {
    if (current === undefined || current === null) return '';
    current = current[part];
  }
  // Return the raw $value, or empty if it's an intermediate node
  const val = current?.$value;
  return val === undefined || val === null ? '' : String(val);
}

/**
 * Helper to set value from dot notation path (returns new object)
 */
export function setTokenValue(tokens: any, path: string, value: string): any {
  const newTokens = JSON.parse(JSON.stringify(tokens)); // Deep copy
  const parts = path.split('.');
  let current = newTokens;
  
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (i === parts.length - 1) {
       // Target node
       if (current[part]) {
         current[part].$value = value;
       }
    } else {
      if (!current[part]) current[part] = {};
      current = current[part];
    }
  }
  return newTokens;
}

export function getScaleValues(tokens: any, path: string): Record<string, string> {
  const parts = path.split('.');
  let current = tokens;
  for (const part of parts) {
    if (current === undefined) return {};
    current = current[part];
  }
  
  // Extract simple k-v pairs for the scale editor
  const result: Record<string, string> = {};
  if (current) {
    Object.keys(current).forEach(k => {
      if (current[k] && current[k].$value !== undefined) {
        result[k] = String(current[k].$value);
      }
    });
  }
  return result;
}

/**
 * Applies standard Dark Mode semantic overrides to a token set.
 * This preserves palettes but inverts the semantic aliases.
 */
export function applyDarkModeOverrides(tokens: DesignTokens): DesignTokens {
  const newTokens = JSON.parse(JSON.stringify(tokens));
  
  if (newTokens.color) {
    newTokens.color.background = { $value: '{color.neutral.950}', $type: 'color' };
    newTokens.color.surface = { $value: '{color.neutral.900}', $type: 'color' };
    newTokens.color.surfaceHighlight = { $value: '{color.neutral.800}', $type: 'color' };
    newTokens.color.text = { $value: '{color.neutral.50}', $type: 'color' };
    newTokens.color.textDim = { $value: '{color.neutral.400}', $type: 'color' };
    newTokens.color.textInverse = { $value: '{color.neutral.950}', $type: 'color' };
    newTokens.color.border = { $value: '{color.neutral.700}', $type: 'color' };
  }
  
  if (newTokens.effect && newTokens.effect.shadow) {
    newTokens.effect.shadow.sm = { $value: '0 1px 2px 0 rgb(0 0 0 / 0.5)', $type: 'shadow' };
    newTokens.effect.shadow.md = { $value: '0 4px 6px -1px rgb(0 0 0 / 0.5)', $type: 'shadow' };
  }

  return newTokens;
}
