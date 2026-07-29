# Frontend Bundle Builder

A responsive React prototype for building a personalized security system. The
shopper moves through a four-step accordion while a live review panel keeps
selected products, variants, quantities, discounts, and totals synchronized.

## Features

- Four-step accordion with selected-product counts and guided navigation
- Data-driven products and plans loaded from local JSON files
- Independent quantity state for every product variant
- Synchronized quantity controls in product cards and the review panel
- Live totals, compare-at prices, and savings calculations
- Selectable subscription plan, including a no-plan option
- Persistent configurations with validated `localStorage` restoration
- Save success and failure feedback
- Checkout confirmation for the prototype flow
- Responsive layouts for desktop, tablet, and phone
- Keyboard-accessible controls and descriptive ARIA attributes
- Automated tests for bundle calculations, variant behavior, controls, and
  persistence

## Tech stack

- React 19
- TypeScript
- Vite
- CSS Grid, Flexbox, and BEM naming
- Vitest
- Testing Library

## Getting started

Requirements:

- Node.js 22 or later
- npm 10 or later

Install and start the development server:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Available scripts

```bash
npm run dev
npm run test
npm run test:watch
npm run lint
npm run build
npm run preview
```

Before submitting or deploying, run:

```bash
npm run test
npm run lint
npm run build
```

## How to review the interactions

1. Change a camera color and adjust its quantity.
2. Switch to another color on the same camera and set a different quantity.
3. Confirm that both selected variants appear as separate review lines.
4. Change a quantity from the review panel and confirm the matching card
   updates.
5. Open each accordion step and choose a plan, sensor, or accessory.
6. Select **Save my system for later**, reload the page, and confirm that the
   exact configuration is restored.
7. Change the configuration after saving and save it again.
8. Select **Checkout** to view the prototype confirmation.

## Project structure

```text
src/
├── components/
│   ├── bundle/       # Accordion and step navigation
│   ├── common/       # Shared quantity and badge components
│   ├── layout/       # Page-level state and layout
│   ├── plan/         # Plan selection
│   ├── product/      # Data-driven product cards and lists
│   └── review/       # Selected items, totals, save, and checkout
├── data/
│   ├── plans.json
│   └── products.json
├── styles/           # BEM component and layout styles
├── test/             # Shared test setup
├── types/            # Product and plan models
└── utils/            # Pricing, selection, formatting, and persistence
```

## Technical decisions

### One source of truth

The page-level `Main` component owns the current product configuration and
selected plan. Both the builder and review panel receive that same state, so
their quantity controls cannot drift out of sync.

### Variant quantities

Variant products use a discriminated union and store a quantity on every
variant. Selecting a different color only changes the active variant; it does
not erase quantities from the other colors.

### Data source

Static catalog content is stored in `src/data/products.json` and
`src/data/plans.json`. Small typed adapter files expose the JSON to the React
application without hardcoded product markup.

### Persistence

Only mutable configuration is saved: product IDs, quantities, active variants,
and the selected plan ID. On restoration, values are validated against the
current catalog. Invalid quantities, retired variants, malformed JSON, and
unknown plan IDs safely fall back to catalog defaults.

### Styling

The interface uses component-scoped BEM class names, CSS Grid for the card and
page layouts, and responsive breakpoints that preserve usability down to a
320px viewport.

## Tradeoffs and prototype boundaries

- Product data is local JSON because the brief treats an API as a bonus.
- `Learn More` is intentionally non-navigational because product-detail pages
  are outside this prototype's scope.
- Checkout displays an inline confirmation because there is no checkout route
  or backend in the brief.
- Variant prices are stored on each variant even where the supplied colors
  currently share a price. This keeps the card, review line, and totals ready
  for differently priced options without changing the selection flow.
- Persistence is local to the current browser and device.

## Quality checks

The test suite covers:

- Separate review lines for independently selected variants
- Dynamic totals and savings, including the selected plan
- Configuration-key changes after edits
- Simple and variant product quantities
- Save and restore behavior
- Invalid plan IDs and malformed stored data
- Storage write failures
- Accessible quantity-control behavior

The production bundle is generated with TypeScript checking through
`npm run build`.
