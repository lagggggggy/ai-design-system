import { describe, it, expect } from 'vitest';
import { flattenTokensToCSS, getTokenValue, setTokenValue } from './tokenUtils';
import { DesignTokens } from '../types';

describe('Token Utilities', () => {
  const mockTokens = {
    color: {
      primary: {
        500: { $value: '#000000', $type: 'color' },
        DEFAULT: { $value: '{color.primary.500}', $type: 'color' }
      },
      text: { $value: '#333', $type: 'color' }
    }
  } as unknown as DesignTokens;

  it('flattens tokens to CSS variables', () => {
    const vars = flattenTokensToCSS(mockTokens);
    expect(vars['--ds-color-primary-500']).toBe('#000000');
    expect(vars['--ds-color-primary']).toBe('var(--ds-color-primary-500)');
    expect(vars['--ds-color-text']).toBe('#333');
  });

  it('gets token value by path', () => {
    const val = getTokenValue(mockTokens, 'color.primary.500');
    expect(val).toBe('#000000');
  });

  it('sets token value immutably', () => {
    const newTokens = setTokenValue(mockTokens, 'color.text', '#fff');
    expect(newTokens.color.text.$value).toBe('#fff');
    expect(mockTokens.color.text.$value).toBe('#333'); // Original unchanged
  });
});