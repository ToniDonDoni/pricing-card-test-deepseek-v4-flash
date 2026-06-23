# SPEC: Animated Pricing Card Component

## Overview
A single HTML file implementing an animated pricing card component with three pricing plans (Free, Pro, Enterprise) using pure HTML/CSS/JS.

## Functional Requirements

### 1. Plans
- Three pricing cards: **Free**, **Pro**, **Enterprise**
- Each card displays: plan name, price, feature list, CTA button
- **Pro** plan has a "Most Popular" badge

### 2. Pricing Toggle
- Toggle switch between Monthly and Annual billing
- Annual prices = 20% discount off Monthly prices
- Price updates with smooth animation when toggling

### 3. Interactive Effects
- **Hover effect**: card lifts up with a glow/shadow on hover
- **Button ripple effect**: clicking any CTA button shows a ripple animation
- **Smooth price transition**: animated when toggling between Monthly/Annual

### 4. Layout
- Three cards in a horizontal row on desktop
- Responsive: cards stack vertically on mobile (≤768px)

### 5. Visual Design
- Dark theme throughout
- Modern design with clean typography

### 6. Technical Constraints
- **No frameworks or libraries** — pure HTML5, CSS3, JavaScript
- Single `.html` file, fully self-contained
- No external assets or CDN dependencies

## Price Structure

| Plan | Monthly | Annual (per month) |
|------|---------|-------------------|
| Free | $0 | $0 |
| Pro | $19 | $15.20 (was $228/yr) |
| Enterprise | $99 | $79.20 (was $1,188/yr) |
