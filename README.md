# Atomic Design System Generator

**Architecture & Tooling for Scalable Design Systems**

The Atomic DS Generator is a staff-engineer-grade tool designed to bridge the gap between design tokens and production code. It allows you to define your brand identity once and generate deterministic, type-safe components for multiple frameworks (Lit/Web Components, React, Angular).

![Status](https://img.shields.io/badge/status-production_ready-green) ![License](https://img.shields.io/badge/license-MIT-blue)

## 🚀 Key Features

*   **Token-First Architecture**: Define design decisions (colors, typography, spacing) as W3C-standard design tokens.
*   **Multi-Brand & Multi-Theme**: Manage distinct brands (e.g., "Consumer", "Enterprise") and themes (Light, Dark, High Contrast) within a single workspace.
*   **AI-Powered Theming**: Use the "Magic Theme" generator (powered by Gemini) to create complete color palettes and typographic scales from natural language descriptions.
*   **Live Preview**: Real-time visualization of component updates as you modify tokens.
*   **Multi-Framework Generation**: Instantly generate production-ready code for:
    *   **Web Components (Lit)**: The canonical implementation.
    *   **React**: Native CSS Modules + Functional Components.
    *   **Angular**: Native SCSS + Components.
*   **Accessibility Audit**: Built-in AI analysis to check color contrast and semantic integrity against WCAG standards.
*   **Local Storage Persistence**: Your work is automatically saved to your browser.

## 🛠 Usage Guide

### 1. Tokens Studio
Navigate to the **Tokens** tab to configure your system.
*   **Brand Palettes**: Adjust the 50-950 scales for Primary, Secondary, and Neutral colors.
*   **Semantics**: Map specific UI roles (Surface, Border, Text) to your palettes.
*   **Magic Generator**: Type a prompt like *"Cyberpunk neon aesthetic with dark purple backgrounds"* to instantly generate a theme.

### 2. Component Studio
Navigate to the **Studio** tab to preview and export components.
*   **Library**: Select from Atoms (Button, Input), Molecules (SearchBox, Tabs), or Organisms (Navbar, Modal).
*   **Strategy**: Toggle between "Web Component", "React", or "Angular" to see the specific code output.
*   **Export**: Click "Download" to get a ZIP file containing the component code, styles, and Storybook stories.

## 🏗 Architecture

The project follows strict **Atomic Design** principles:

```
src/
├── components/         # Editor UI Components
├── templates/          # Code Generation Templates (Lit, React, Angular)
├── schemas/            # Zod Schemas for Token Validation
├── services/           # AI & Generator Logic
├── utils/              # Token Transformation & File Handling
└── types.ts            # TypeScript Definitions
```

### Data Model
*   **Brand**: Top-level container (e.g., "Acme Corp").
*   **Theme**: Variation within a brand (e.g., "Dark Mode").
*   **DesignTokens**: The actual W3C token tree (`$value`, `$type`).

## 💻 Development

This project uses **React 19**, **Vite**, **Tailwind CSS**, and **Google GenAI SDK**.

### Prerequisites
*   Node.js v18+
*   Gemini API Key (optional, for AI features)

### Running Locally
```bash
npm install
npm run dev
```

## 🤝 Contributing
1.  Fork the repo
2.  Create a feature branch
3.  Submit a Pull Request

---
*Built with ❤️ by the Atomic DS Team*