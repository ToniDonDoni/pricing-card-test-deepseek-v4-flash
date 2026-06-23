# Architecture: Animated Pricing Card Component

## Overview
Single-file HTML application implementing a pricing card component. No build tools, no frameworks, no external dependencies.

## File Structure
- `index.html` — single self-contained file containing HTML, CSS, and JavaScript

## Component Architecture

### HTML Structure
```
body (dark background)
└── main.pricing-container
    ├── header (title + toggle switch)
    │   ├── h1 (page title)
    │   └── .toggle-switch (Monthly | ☐ | Annual)
    └── .pricing-grid
        ├── .pricing-card.free
        │   ├── .card-header (plan name, price)
        │   ├── .card-features (feature list)
        │   └── .card-btn (CTA button)
        ├── .pricing-card.pro (featured)
        │   ├── .badge ("Most Popular")
        │   ├── .card-header
        │   ├── .card-features
        │   └── .card-btn
        └── .pricing-card.enterprise
            ├── .card-header
            ├── .card-features
            └── .card-btn
```

### CSS Architecture
- **Variables**: colors, transitions, spacing in `:root`
- **Dark theme**: background `#0f0f1a`, cards `#1a1a2e`, accents `#6c63ff`
- **Layout**: CSS Grid (3 columns desktop, 1 column mobile @ 768px)
- **Card hover**: `transform: translateY(-8px)` + `box-shadow` glow
- **Toggle**: CSS custom property `--pricing-factor` toggled by JS
- **Ripple**: pseudo-element animation on button click
- **Price animation**: CSS `transition` on `.price-amount` text or parent

### JavaScript Architecture
- **Pricing data**: object mapping plan → {monthly, annual}
- **Toggle handler**: updates `--pricing-factor` data attribute, triggers price DOM update
- **Price update**: animate via `requestAnimationFrame` or CSS transitions on innerHTML swap
- **Ripple handler**: `click` event → creates ripple `<span>`, animates, removes after animationend
- **State**: `isAnnual` boolean, updates all cards' prices on toggle

## Data Flow
1. Page load → render pricing cards from static data (monthly by default)
2. User clicks toggle → `isAnnual` flips → each card's price recalculates (annual = monthly * 12 * 0.8 / 12)
3. DOM update with smooth CSS transition on price element
4. User hovers card → CSS lift + glow (pure CSS, no JS)
5. User clicks CTA → ripple effect via JS event handler

## States
- **Default**: monthly prices, no hover
- **Hover**: card elevated with glow
- **Annual toggle**: prices updated to 20% discounted annual rate
- **Mobile**: cards stacked vertically
