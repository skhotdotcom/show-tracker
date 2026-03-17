# Build a Design System from a Reference UI

**Purpose:** Replicate the visual patterns, layout system, and interaction model of a reference UI (website, app, or screenshots) as a white-labeled component library built with shadcn/ui, Tailwind CSS, and Radix UI primitives.

**Use when:** You have screenshots, a live site, or a Mobbin/AppOfTheDay reference and want to extract its design language into reusable, composable components — without duplicating branding, content, or proprietary assets.

---

## The Prompt

> You are a design systems engineer. Your task is to reverse-engineer a reference UI into a production-ready component library. You are NOT building a clone. You are extracting the design language — spacing, typography patterns, interaction models, layout logic — and rebuilding it with shadcn/ui, Tailwind CSS, and Radix UI primitives as a white-labeled product.
>
> **Reference:** [URL or describe the screenshots]
>
> **Output format:** Next.js app with `src/components/<project-name>/` folder, a docs site at `src/app/docs/`, and example pages at `src/app/examples/`.
>
> ### Rules
>
> 1. **White-label the output.** Do not use the reference's brand name, logos, trademarks, or proprietary content. Replace with generic equivalents (e.g., "Wallet Cash" not "Apple Cash", "Bank Card" not "Chase Sapphire"). The result should be inspired by, not derived from.
>
> 2. **One component = one UI element.** Each component maps to exactly one visual/conceptual concern. No component renders two concerns. This ensures composability — developers pick the pieces they need without dragging in unrelated logic.
>
> 3. **Use shadcn/ui as the base.** Start with shadcn components (Button, Card, Badge, Sheet, Dialog, Tabs) and extend with custom wallet-specific components. Use Radix UI primitives for accessible behavior (dropdowns, dialogs, tooltips, tabs). Never roll your own accessibility.
>
> 4. **Tailwind for all styling.** No CSS modules, no styled-components, no inline style objects. Use Tailwind utility classes. Use CSS custom properties for theming (colors, radii, spacing tokens). Use the `cn()` utility for conditional class merging.
>
> 5. **Document every component.** Create a docs site (`src/app/docs/components/<name>/page.tsx`) for each component with:
>    - Component name and description
>    - Live preview (render the component with sample data)
>    - Props table (name, type, default, description)
>    - Usage code snippet
>    - Design notes (what it does, why it exists, how it composes)
>
> 6. **Build full examples.** Create 3-5 example pages (`src/app/examples/`) that show real-world usage — not just isolated components, but complete screen flows that demonstrate how components compose together.
>
> 7. **Group shared styles.** Use a shared CSS file (`globals.css`) with CSS custom properties for the design token system. Use a layout component for consistent navigation and structure.
>
> 8. **System fonts, responsive by default.** Use system font stack (`-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui`). All components should be responsive and work on mobile, tablet, and desktop.
>
> ### Component Inventory
>
> Analyze the reference UI and extract components into these categories:
>
> **Core Cards:**
> - Pass Card (gradient card with logo, title, subtitle, barcode, content slot)
> - Balance Card / Daily Cash Card (financial summary with trend)
> - Order Tracking Card (status timeline + product info)
>
> **Layout:**
> - Card Stack (stacked overlapping cards with expand/collapse)
> - Card Carousel (horizontal scroll with snap points)
> - Grouped Section (title + grouped rows with padding/margin)
> - Wallet Header (search bar, add button, nav items, filter tabs)
>
> **Data Display:**
> - Transaction Row (merchant icon, name, amount, date, category, pending state)
> - Statement Row (billing period, amount, due date, paid badge)
> - Merchant Row (merchant name, logo, transaction count, total spend)
> - Balance Breakdown (pie/bar chart of spending by category)
> - Spending Chart (line/bar chart over time)
> - Rewards Progress (tier progress bar with milestone markers)
>
> **Actions:**
> - Action Button Group (icon buttons: share, info, add to wallet)
> - Add to Wallet Sheet (bottom sheet with card preview and add button)
> - Payment Status Bar (status indicator with color-coded states)
> - Success Screen (confirmation with checkmark and details)
>
> **Detail:**
> - Pass Detail Section (grouped detail rows with optional icons)
> - Detail Row (label + value + optional chevron)
> - Status Badge (active/expired/pending/used/locked with semantic colors)
>
> ### File Structure
>
> ```
> src/
> ├── app/
> │   ├── layout.tsx              # Root layout with system fonts
> │   ├── page.tsx                # Landing page with component grid
> │   ├── globals.css             # Design tokens as CSS custom properties
> │   ├── docs/
> │   │   ├── layout.tsx          # Docs layout with sidebar nav
> │   │   ├── page.tsx            # Docs index — component list
│>   │   └── components/
> │   │       └── <name>/page.tsx  # Per-component doc pages
> │   └── examples/
> │       ├── layout.tsx          # Examples layout
> │       ├── wallet-home/        # Full wallet home screen
> │       ├── card-detail/        # Card detail + transactions
> │       ├── boarding-pass/      # Travel pass
│>   │       ├── order-tracking/  # Package tracking
│>   │       └── rewards/         # Rewards + loyalty
> ├── components/
> │   ├── ui/                     # shadcn base components (button, badge, card, sheet, etc.)
> │   └── wallet/                 # Custom wallet components
> │       ├── index.ts            # Barrel export for all components
> │       ├── pass-card.tsx
> │       ├── card-stack.tsx
> │       ├── transaction-row.tsx
│>   │       └── ... (one file per component)
> └── lib/
>     └── utils.ts                # cn() utility
> ```
>
> ### Quality Checks
>
> Before finalizing, verify:
>
> - [ ] **Composability:** Can each component be used independently? Does importing one component avoid pulling in unrelated code?
> - [ ] **Accessibility:** Do interactive elements have proper ARIA attributes? Can you tab through and operate everything with keyboard?
> - [ ] **Responsiveness:** Does everything work on mobile (375px), tablet (768px), and desktop (1024px+)? Are tap targets at least 44x44px?
> - [ ] **White-label:** Is all branding removed? No reference brand names, logos, colors, or proprietary content remain?
> - [ ] **Build clean:** Does `npm run build` pass with zero errors and zero TypeScript issues?
> - [ ] **Docs complete:** Does every component have a doc page with preview, props table, and usage example?
>
> ### Naming Conventions
>
> - Component files: `kebab-case.tsx` (e.g., `pass-card.tsx`, `transaction-row.tsx`)
> - Component names: `PascalCase` (e.g., `PassCard`, `TransactionRow`)
> - Props interfaces: `<ComponentName>Props` (e.g., `PassCardProps`)
> - CSS custom properties: `--<category>-<property>` (e.g., `--wallet-primary`, `--card-radius`)
> - Color categories: use semantic names (primary, secondary, muted, destructive) not brand names

---

## Why This Works

This prompt extracts the **design language** without the **brand identity**. The result is:

- **Composable** — one component per concern, pick what you need
- **Accessible** — Radix primitives handle ARIA, keyboard, focus management
- **Token-driven** — CSS custom properties enable theming and customization
- **Documented** — every component has a doc page with preview and props
- **Example-rich** — full screen flows show real composition patterns

The output is a white-labeled design system that any developer can install, theme, and extend — inspired by a reference, not copying it.

---

## Example Usage

```
Build a design system from the Mobbin reference:
https://mobbin.com/apps/some-app

Requirements:
- shadcn/ui + Tailwind CSS + Radix primitives
- White-labeled (inspired by, not copy)
- Full docs site with per-component pages
- 5 example screens showing real usage
- System fonts, responsive, accessible
- Project name: my-design-system
```

---

*Based on the wallet-components pattern — a white-labeled component library inspired by mobile wallet interfaces.*
