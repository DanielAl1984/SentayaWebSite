---
name: ckm:ui-styling
description: Build beautiful, accessible user interfaces with shadcn/ui components (built on Radix UI + Tailwind), Tailwind CSS utility-first styling, and canvas-based visual designs. Use for React-based apps, accessible components, responsive layouts, dark mode, design systems, and rapid prototyping.
argument-hint: "[component or task]"
license: MIT
metadata:
  author: claudekit
  version: "1.0.0"
---

# UI Styling

Create beautiful, accessible user interfaces with shadcn/ui components (built on Radix UI + Tailwind), Tailwind CSS utility-first styling, and canvas-based visual designs.

## When to Use

- Building React-based applications
- Implementing accessible components
- Styling with utilities
- Creating responsive layouts
- Implementing dark mode
- Building design systems
- Generating visual designs with rapid prototyping

## Core Stack

- **shadcn/ui** — pre-built, accessible components based on Radix UI primitives (copy-paste distribution)
- **Tailwind CSS** — utility-first styling with build-time processing, zero runtime overhead
- **Canvas-based design** — sophisticated visual compositions emphasizing visual communication

## Setup

```bash
# shadcn/ui + Tailwind
npx shadcn@latest init

# Add individual components
npx shadcn@latest add button
npx shadcn@latest add modal
npx shadcn@latest add table
```

## Component Categories

- **Form components** — inputs, selects, checkboxes, radio, textarea, validation
- **Layout & navigation** — navbar, sidebar, tabs, breadcrumbs, pagination
- **Overlays & dialogs** — modal, drawer, tooltip, popover, sheet
- **Data display** — table, card, badge, avatar, data grid, command palette

## Key Principles

- **Mobile-first** responsive design using Tailwind breakpoints
- **Accessibility-first** leveraging Radix UI's ARIA and keyboard primitives
- **Dark mode** via Tailwind's `dark:` modifier and CSS variables
- **Consistent design tokens** — never hardcode colors or spacing
- **TypeScript-first** component typing

## Tailwind Quick Reference

```html
<!-- Spacing scale (4/8pt grid) -->
<div class="p-4 m-8 gap-6">

<!-- Typography -->
<h1 class="text-4xl font-bold tracking-tight">
<p class="text-base leading-relaxed text-gray-600">

<!-- Responsive -->
<div class="flex flex-col md:flex-row lg:grid lg:grid-cols-3">

<!-- Dark mode -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">

<!-- Focus / accessibility -->
<button class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
```

## References

| Topic | File |
|-------|------|
| Component Catalog | `references/component-catalog.md` |
| Theming | `references/theming.md` |
| Accessibility Patterns | `references/accessibility-patterns.md` |
| Tailwind Utilities | `references/tailwind-utilities.md` |
| Responsive Design | `references/responsive-design.md` |
| Customization | `references/customization.md` |
| Visual Design | `references/visual-design.md` |

## Integration

**With design-system:** Component tokens → Tailwind config
**With brand:** Brand colors/typography → Tailwind theme
**With ui-ux-pro-max:** Design decisions → implementation

**Skill Dependencies:** design-system, brand
