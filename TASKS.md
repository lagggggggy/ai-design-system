# Project Backlog & Roadmap

## Current Status
**Last Updated**: 2025-11-28  
**Phase**: Development - Component Expansion  
**Priority**: Design System Production Readiness

---

## Epic 1: Core Architecture & Engineering Standards
- [x] Implement Basic Token State Management
- [x] Create deterministic string templates for components
- [x] Implement Web Component (Lit), React Adapter, Angular Wrapper
- [x] Implement Native React and Native Angular strategies
- [x] **Refactor ComponentPreview into modular components**
- [x] **Refactor TokenEditor to be data-driven**
- [x] **Migrate Token Schema to W3C Standard ($value, $type)**
- [x] **Expand Color System to Full Palettes (50-950)**
- [x] **Modular App Navigation (Sidebar & Component Studio)**
- [x] **Implement Global Dark Mode Architecture**
- [ ] Setup testing infrastructure (Vitest)
- [ ] Add unit tests for generator core

---

## Epic 2: Design Token System Enhancement
- [x] Basic token management with TokenService
- [x] CSS variable generation (Semantic)
- [x] Add semantic tokens (success, warning, info, error)
- [x] **Implement Color Scales & W3C Aliasing**
- [ ] Implement multi-brand support
- [ ] Implement multi-theme support (light/dark/custom per brand)
- [ ] Add Zod schema validation for tokens

---

## Epic 3: Component Generation Engine - Base Components

### Atoms (15 Components)
- [x] Button
- [x] Input
- [x] Checkbox
- [x] Badge
- [x] Switch (Toggle)
- [x] Radio
- [x] Avatar
- [x] Spinner/Loader
- [x] Divider
- [x] Text/Typography
- [x] Heading
- [x] Link
- [ ] Label (Next)
- [ ] Icon (Next)
- [ ] Image (Next)

### Molecules (12 Components)
- [x] CheckboxGroup
- [x] RadioGroup
- [x] Alert
- [ ] Select/Dropdown
- [ ] SearchBox
- [ ] FormField
- [ ] ButtonGroup
- [ ] InputGroup
- [ ] Tabs

### Organisms (8 Components)
- [x] Card
- [ ] Modal/Dialog
- [ ] Drawer/Sidebar
- [ ] Navbar/Header

---

## Epic 4: UI/UX Enhancement
- [x] Split view: Configuration vs. Live Preview vs. Code Output
- [x] Integrated Token Editor
- [x] **Full-Page Design System Studio**
- [x] **Palette Visualizer & Editor**
- [x] Dark/Light mode toggle for Preview
- [x] Download Generated Files
- [x] **Global Dark Mode Support**
- [ ] Brand selector UI
- [ ] Theme switcher UI (per brand)

---

## Epic 5: AI Integration (Gemini)
- [x] Implement "Magic Theme" generator
- [x] **Update Magic Theme for W3C Nested Scales**
- [ ] Add "Accessibility Audit"