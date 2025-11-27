# Engineering Guidelines & Architecture

## Philosophy
This project follows a **Token-First, Atomic Architecture**. The goal is to generate framework-agnostic UI components where design decisions (tokens) are decoupled from structural logic (components).

### Core Principles
1.  **Deterministic Generation**: Code output is predictable based on input configuration. We do not use LLMs for structural code generation to ensure compilation safety.
2.  **Runtime Theming**: Components must rely on CSS Variables (Custom Properties) for styling, never hardcoded values. This allows for instant theme switching and sub-theming (light/dark/high-contrast).
3.  **Atomic Composition**: Complex components (Organisms) must be composed of smaller components (Atoms/Molecules).
    *   *Example*: `CheckboxGroup` (Molecule) imports and orchestrates `Checkbox` (Atom).

## System Architecture

### 1. Token Engine (`services/tokenService.ts`)
Responsible for managing the state of design tokens.
-   **Input**: Raw JSON (Brand colors, spacing, radius).
-   **Output**: CSS Variable blocks (`:root { --ds-primary: #... }`).

### 2. Generator Service (`services/generator.ts`)
The core logic that constructs source code strings.
-   **Pattern**: Template Literal interpolation based on AST-like configuration.
-   **Targets**:
    -   **Lit (Web Components)**: The source of truth. Lightweight, browser-native.
    -   **React Wrapper**: Uses `@lit/react` to provide first-class React DX.
    -   **Angular Wrapper**: Proxies events and properties to the custom element.
    -   **Native React**: A pure React alternative (for teams rejecting Web Components).

### 3. AI Assistance (`services/geminiService.ts`)
Uses Google Gemini API to assist with *creative* tasks, not structural tasks.
-   Generating accessible color palettes.
-   Suggesting semantic naming for tokens.

## Directory Structure
-   `/`: Root (App entry)
-   `components/`: UI for the Generator Application itself.
-   `services/`: Business logic (Generation, API calls).
-   `templates/`: String templates for the generator engine.

## Code Standards
-   **Strict TypeScript**: No `any`. Use discriminated unions for component types.
-   **Tailwind**: Use utility classes for the App UI.
-   **State**: React Context for global Token state to avoid prop drilling.
