import { z } from 'zod';

export const W3CTokenSchema = z.object({
  $value: z.string(),
  $type: z.string(),
  $description: z.string().optional()
});

export const W3CColorScaleSchema = z.object({
  50: W3CTokenSchema,
  100: W3CTokenSchema,
  200: W3CTokenSchema,
  300: W3CTokenSchema,
  400: W3CTokenSchema,
  500: W3CTokenSchema,
  600: W3CTokenSchema,
  700: W3CTokenSchema,
  800: W3CTokenSchema,
  900: W3CTokenSchema,
  950: W3CTokenSchema,
  DEFAULT: W3CTokenSchema
});

export const DesignTokensSchema = z.object({
  color: z.object({
    primary: W3CColorScaleSchema,
    secondary: W3CColorScaleSchema,
    neutral: W3CColorScaleSchema,
    
    // Semantics
    background: W3CTokenSchema,
    surface: W3CTokenSchema,
    surfaceHighlight: W3CTokenSchema,
    text: W3CTokenSchema,
    textDim: W3CTokenSchema,
    textInverse: W3CTokenSchema,
    border: W3CTokenSchema,

    // Status
    error: W3CColorScaleSchema,
    success: W3CColorScaleSchema,
    warning: W3CColorScaleSchema,
    info: W3CColorScaleSchema,

    // Legacy/Convenience
    primaryHover: W3CTokenSchema.optional(),
    secondaryHover: W3CTokenSchema.optional(),
  }),
  geometry: z.object({
    spacing: z.object({
      base: W3CTokenSchema
    }),
    border: z.object({
      width: W3CTokenSchema
    }),
    radius: z.object({
      sm: W3CTokenSchema,
      md: W3CTokenSchema,
      lg: W3CTokenSchema
    })
  }),
  typography: z.object({
    family: z.object({
      base: W3CTokenSchema,
      mono: W3CTokenSchema
    }),
    size: z.record(z.string(), W3CTokenSchema), // Simplification for dynamic keys like '2xl'
    weight: z.record(z.string(), W3CTokenSchema),
    lineHeight: z.record(z.string(), W3CTokenSchema),
    variants: z.record(z.string(), z.object({
      fontSize: W3CTokenSchema,
      fontWeight: W3CTokenSchema,
      lineHeight: W3CTokenSchema
    }))
  }),
  effect: z.object({
    shadow: z.object({
      sm: W3CTokenSchema,
      md: W3CTokenSchema
    })
  })
});

export type ValidationResult = {
  success: boolean;
  errors?: string[];
};

export function validateTokens(tokens: unknown): ValidationResult {
  const result = DesignTokensSchema.safeParse(tokens);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.issues.map(e => `${e.path.join('.')}: ${e.message}`)
    };
  }
  return { success: true };
}