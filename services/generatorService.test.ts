import { describe, it, expect } from 'vitest';
import { generateCode } from './generatorService';
import { DEFAULT_TOKENS } from '../constants';

describe('Generator Service', () => {
  it('generates Lit web component correctly', () => {
    const files = generateCode('button', DEFAULT_TOKENS, 'web-component');
    expect(files).toBeDefined();
    expect(files.length).toBeGreaterThan(0);
    
    const componentFile = files.find(f => f.fileName === 'ds-button.ts');
    expect(componentFile).toBeDefined();
    expect(componentFile?.content).toContain("import { html, css, LitElement } from 'lit'");
    expect(componentFile?.content).toContain("@customElement('ds-button')");
  });

  it('generates React component correctly', () => {
    const files = generateCode('button', DEFAULT_TOKENS, 'native-react');
    expect(files).toBeDefined();
    
    // Should have Component, CSS Module, and Story
    expect(files.some(f => f.fileName === 'Button.tsx')).toBe(true);
    expect(files.some(f => f.fileName === 'Button.module.css')).toBe(true);
    
    const componentFile = files.find(f => f.fileName === 'Button.tsx');
    expect(componentFile?.content).toContain("import React");
    expect(componentFile?.content).toContain("export const Button");
  });

  it('generates Angular component correctly', () => {
    const files = generateCode('button', DEFAULT_TOKENS, 'native-angular');
    expect(files).toBeDefined();

    // Should have Component, CSS, and Story
    expect(files.some(f => f.fileName === 'button.component.ts')).toBe(true);
    expect(files.some(f => f.fileName === 'button.component.css')).toBe(true);

    const componentFile = files.find(f => f.fileName === 'button.component.ts');
    expect(componentFile?.content).toContain("@Component");
    expect(componentFile?.content).toContain("selector: 'app-button'");
  });

  it('handles unknown components gracefully', () => {
    const files = generateCode('unknown-component' as any, DEFAULT_TOKENS, 'web-component');
    expect(files).toEqual([]);
  });
});