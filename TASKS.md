# Project Backlog & Roadmap

## Epic: Core Generator Engine
- [x] Implement Basic Token State Management
- [x] Create deterministic string templates for `Button` (Atom)
- [x] Create deterministic string templates for `Checkbox` (Atom) and `CheckboxGroup` (Molecule)
- [x] Implement Web Component (Lit) generation strategy
- [x] Implement React Adapter generation strategy
- [x] Implement Angular Wrapper generation strategy
- [x] Implement Native Angular generation strategy

## Epic: UI/UX
- [x] Split view: Configuration vs. Live Preview vs. Code Output
- [x] Integrated Token Editor (Color pickers, spacing sliders)
- [x] Dark/Light mode toggle for the *Preview* context
- [x] JSON Token View

## Epic: AI Integration (Gemini)
- [x] Implement "Magic Theme" generator using Gemini 2.5 Flash
- [ ] Add "Accessibility Audit" for generated contrast ratios

## PBI: Advanced Components
- [x] Add `Input` (Atom)
- [x] Add `Card` (Container / Organism)
- [ ] Add `Modal` (Overlay - requires Portal logic in adapters)

## Technical Debt / Refactoring
- [ ] Move string templates to separate files if they grow too large
- [ ] Add unit tests for the generator string output consistency
- [x] Refactor Native React templates to use CSS Modules for better style separation