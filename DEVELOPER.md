# Atomic Design System Generator

A framework-agnostic design system generator that creates production-ready UI components for React, Angular, and Web Components from a single token-based configuration.

## 🎯 Overview

This project implements a **Token-First, Atomic Architecture** approach to design system generation. It enables teams to:

- Define design tokens once and generate components for multiple frameworks
- Support multi-brand and multi-theme configurations
- Generate deterministic, type-safe component code
- Verify components in isolated Storybook environments

### Key Features

- **Multi-Framework Support**: Generate native components for React, Angular, and Web Components (Lit)
- **Token-Driven Design**: CSS variables enable runtime theming without recompilation
- **Atomic Composition**: Components follow atomic design principles (Atoms → Molecules → Organisms)
- **AI-Powered Theming**: Generate complete design tokens from natural language descriptions
- **Monorepo Architecture**: Organized workspace with shared packages and isolated apps

## 📁 Project Structure

```
atomic-ds-generator/
├── apps/
│   ├── generator-ui/        # Main UI for token editing and code generation
│   ├── storybook-react/       # React component Storybook
│   ├── storybook-angular/     # Angular component Storybook
│   └── storybook-web/         # Web Components Storybook
├── packages/
│   ├── core/                 # Core generator logic and templates
│   └── tokens/               # Token service and schema definitions
└── scripts/
    └── sync-components.ts    # Component generation and sync script
```

## 🚀 Installation

### Prerequisites

- **Node.js**: v18 or higher
- **pnpm**: v8 or higher (install via `npm install -g pnpm`)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd atomic-ds-generator
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure API Key** (for AI theme generation)
   
   Create `.env.local` in `apps/generator-ui/`:
   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```

## 🏃 Running the Project

### Run All Applications

Start all applications (Generator UI + all Storybooks) in parallel:

```bash
pnpm dev
```

This launches:
- **Generator UI**: http://localhost:3000
- **React Storybook**: http://localhost:6006
- **Angular Storybook**: http://localhost:6007 (when configured)
- **Web Storybook**: http://localhost:6008 (when configured)

### Run Individual Applications

```bash
# Generator UI only
pnpm -F @atomic/generator-ui dev

# React Storybook only
pnpm -F @atomic/storybook-react storybook

# Angular Storybook only
pnpm -F @atomic/storybook-angular storybook

# Web Components Storybook only
pnpm -F @atomic/storybook-web storybook
```

### Generate Components

Regenerate components for all Storybooks:

```bash
pnpm exec tsx scripts/sync-components.ts
```

## 🏗️ Development Best Practices

### 1. Token-First Approach

**Always use CSS variables** for styling. Never hardcode values.

```css
/* ✅ CORRECT */
.button {
  background: var(--ds-primary);
  border-radius: var(--ds-borderRadiusMedium);
}

/* ❌ INCORRECT */
.button {
  background: #3b82f6;
  border-radius: 0.5rem;
}
```

### 2. Atomic Composition

Build complex components from simpler ones:

- **Atoms**: Basic elements (Button, Input, Checkbox)
- **Molecules**: Simple combinations (SearchBox = Input + Button)
- **Organisms**: Complex sections (Header, Card with multiple children)

### 3. Framework Agnostic Templates

When adding new component templates in `packages/core/src/generator.ts`:

1. Define the Lit (Web Component) version first
2. Create React and Angular wrappers/native versions
3. Ensure all versions consume the same tokens
4. Test in all three Storybooks

### 4. Type Safety

All components should have proper TypeScript interfaces:

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}
```

### 5. Monorepo Workflow

- Use workspace references: `@atomic/core`, `@atomic/tokens`
- Filter commands by workspace: `pnpm -F @atomic/core <command>`
- Run commands across all workspaces: `pnpm -r <command>`

## 🧪 Testing

### Manual Testing

1. **Generator UI Testing**
   - Modify tokens in the UI
   - Verify live preview updates
   - Test code generation for all frameworks
   - Validate AI theme generation

2. **Storybook Testing**
   - Run sync script: `pnpm exec tsx scripts/sync-components.ts`
   - Start Storybooks: `pnpm dev`
   - Verify components render correctly
   - Test theming and token injection
   - Validate component interactions

### Unit Testing (Future)

Unit tests will be added for:
- Token validation and transformation
- Code generation logic
- Component template rendering
- CSS variable generation

**Recommended Testing Stack:**
- **Test Runner**: Vitest
- **Component Testing**: React Testing Library, Angular Testing Library
- **E2E Testing**: Playwright

## 📝 Adding New Components

1. **Define Component Template** in `packages/core/src/generator.ts`
   ```typescript
   const litTemplates: Record<ComponentType, (tokens: DesignTokens) => GeneratedFile[]> = {
     'my-component': () => [
       {
         fileName: 'ds-my-component.ts',
         language: 'typescript',
         description: 'Lit Component',
         content: `...`
       }
     ]
   };
   ```

2. **Add to Component List** in `scripts/sync-components.ts`
   ```typescript
   const COMPONENTS: ComponentType[] = ['button', 'input', 'my-component'];
   ```

3. **Update Type Definitions** in `packages/core/src/types.ts`
   ```typescript
   export type ComponentType = 'button' | 'input' | 'my-component';
   ```

4. **Generate and Test**
   ```bash
   pnpm exec tsx scripts/sync-components.ts
   pnpm dev
   ```

## 🔧 Build

Build all packages and applications:

```bash
pnpm -r build
```

Build specific workspace:

```bash
pnpm -F @atomic/generator-ui build
```

## 📚 Additional Documentation

- [DEVELOPER.md](./DEVELOPER.md) - Detailed engineering guidelines and architecture
- [TASKS.md](./TASKS.md) - Project backlog and task tracking

## 🤝 Contributing

1. Follow the atomic design principles outlined in `DEVELOPER.md`
2. Ensure all generated components use CSS variables
3. Test in all three Storybook environments
4. Maintain type safety across all packages

## 📄 License

[Add your license here]
