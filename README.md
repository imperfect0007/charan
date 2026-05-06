# FraudShield × Identity Suite

A unified GUI suite that combines two operations dashboards into a single
Next.js application:

1. **FraudShield — Ad Fraud Detection Dashboard**
2. **Identity Verification & User Dashboard**

Both modules are integrated into one app, accessible through a shared
**Module Switcher** in their navigation, with dedicated pages, a
fully-responsive layout, dark / light / system theming, and a comprehensive
test suite.

This repository was built as the deliverable for the *GUI Development for Ad
Fraud and User Identity* assignment.

---

## Tech stack

| Concern         | Choice                                            |
| --------------- | ------------------------------------------------- |
| Framework       | **Next.js 14** (App Router, TypeScript, RSC)      |
| Styling         | **Tailwind CSS** with semantic CSS variables      |
| UI primitives   | **shadcn/ui** (Radix UI under the hood)           |
| Charts          | **Recharts**                                      |
| Theming         | **next-themes** (light / dark / system)           |
| Icons           | **lucide-react**                                  |
| Testing         | **Vitest** + **React Testing Library** + jsdom    |
| Lint / format   | ESLint (Next.js config), strict TypeScript        |

---

## Features

### Shared experience
- **Single application** with two modules, navigable from anywhere via the
  Module Switcher in each module's header.
- **Light, Dark, and System themes** wired through CSS variables; every chart,
  table, badge, and button reacts automatically.
- **Fully responsive** layouts: mobile drawers for navigation and filters,
  tablet-friendly grids, and a full desktop dashboard.
- **Accessibility first**: semantic landmarks (`banner`, `main`,
  `navigation`), labelled inputs, ARIA tooltips on map pins,
  keyboard-navigable menus and dropdowns, and focus-visible styles
  inherited from the shadcn primitives.

### FraudShield module (`/ad-fraud`)
- Top navigation: brand, dashboard / reports / campaigns / alerts / settings,
  global search, notifications bell, theme toggle, profile avatar.
- Filters sidebar (collapses into a slide-over on mobile) with date range,
  campaigns, traffic sources, fraud types, and region selectors plus a
  one-click reset.
- Five KPI cards: Overall Fraud Rate, Total Traffic, Valid Traffic,
  Invalid Traffic (IVT), and Revenue Saved — each with deltas.
- **Ad Fraud Trend** stacked-area chart, **Fraud Distribution by Type**
  bar chart with rounded bars, **Top 5 Fraudulent Sources** donut, and a
  **Fraud Hotspots by Country** SVG world map with severity-coded pins.
- **Recent Fraud Incidents** table with built-in client-side search,
  empty state, paginator, and status badges (Blocked / Flagged /
  Investigating).

### Identity Verification module (`/identity`)
- Persistent left side-nav (Dashboard, Users, Verification, Activity Logs,
  Settings) plus mobile slide-over.
- **Identity Scanning & Verification** card with progress bars for phone
  and document, a clearly-CTA'd Upload ID button.
- **Scan Results** card with verified phone, in-progress document analysis,
  and face match comparison, all using the brand semantic palette.
- **User Profile Information** card with “Verifying Profile” live state.
- **Verification Success Rate** line chart and **User Status Distribution**
  donut.
- **Verification History** table with status badges and `View Details`
  affordances.

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
# → http://localhost:3000

# 3. Type-check, lint, and run all tests
npm run typecheck
npm run lint
npm run test
```

### Available scripts

| Script                  | What it does                                        |
| ----------------------- | --------------------------------------------------- |
| `npm run dev`           | Start the Next.js dev server with Turbopack        |
| `npm run build`         | Production build                                    |
| `npm run start`         | Run the production build                            |
| `npm run lint`          | ESLint with the Next.js core-web-vitals config      |
| `npm run typecheck`     | `tsc --noEmit` strict type check                    |
| `npm run test`          | Run the full Vitest suite once                      |
| `npm run test:watch`    | Vitest in watch mode                                |
| `npm run test:coverage` | Vitest with V8 coverage (text + html + lcov)        |

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (theme + tooltip providers)
│   ├── page.tsx                # Landing page with both module CTAs
│   ├── ad-fraud/               # FraudShield module
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Main dashboard
│   │   ├── reports/            # Reports placeholder
│   │   ├── campaigns/          # Campaigns placeholder
│   │   ├── alerts/             # Alerts placeholder
│   │   └── settings/           # Settings placeholder
│   └── identity/               # Identity module
│       ├── layout.tsx          # Side-nav + content shell
│       ├── page.tsx            # Main dashboard
│       ├── users/              # Users placeholder
│       ├── verification/       # Verification deep-dive
│       ├── activity/           # Activity logs placeholder
│       └── settings/           # Settings placeholder
├── components/
│   ├── ad-fraud/               # FraudShield-specific widgets
│   ├── identity/               # Identity Suite-specific widgets
│   ├── shared/                 # Module switcher, etc.
│   ├── ui/                     # shadcn/ui primitives
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── lib/
│   ├── mock-data.ts            # Deterministic dashboard data
│   └── utils.ts                # cn() + format helpers
└── test/
    └── utils.tsx               # renderWithProviders + setPathname
```

---

## Testing strategy

The Vitest suite covers:

- **Utilities** — `cn`, `formatNumber`, `formatPercent`, `formatCurrency`.
- **Theming** — `ThemeToggle` opens a menu, applies `class="dark"` to `<html>`.
- **Module switching** — active state per pathname, link targets.
- **Ad Fraud widgets** — KPI card variants, filter selection + reset,
  chart titles + categories, world-map pins, and the incidents table
  (initial render, search filtering, empty state).
- **Identity widgets** — verification progress states, scan results,
  history table rows / badges, status distribution.
- **Page-level integration** — landing CTAs, ad-fraud dashboard end-to-end
  (all stat cards + KPI numbers + charts present), identity dashboard
  end-to-end.

Recharts' `ResponsiveContainer` is fed a sane `ResizeObserver` polyfill and a
fixed `getBoundingClientRect` in `vitest.setup.ts` so charts render in jsdom.
`next/navigation` hooks (`usePathname`, `useRouter`, `useSearchParams`) are
mocked from the same setup file so any client component can be rendered in
isolation; tests change the active path via the `setPathname` helper exported
from `src/test/utils.tsx`.

### Run the suite

```bash
npm run test          # one-shot
npm run test:watch    # watch mode
npm run test:coverage # with coverage report in ./coverage
```

---

## Deployment

The app is a stock Next.js project and deploys to **Vercel** with zero
configuration:

```bash
# Install Vercel CLI once
npm i -g vercel

# From the project root
vercel        # preview deployment
vercel --prod # production deployment
```

…or simply push the repository to GitHub and import it from the Vercel
dashboard. Recommended Node.js version: **18.18+ / 20+**.

---

## Improvements made over the screenshots

Beyond rebuilding both screenshots faithfully, the suite also adds:

- A unified **Module Switcher** so operators can move between modules
  without leaving the workspace.
- A polished **landing page** that explains the suite and links to both
  modules.
- A real **theme toggle** with light / dark / system, instead of a
  hard-coded color scheme per screenshot.
- A **mobile slide-over** for both the Ad Fraud filters and the navigation,
  keeping the dashboards usable on phones.
- A working **client-side search** in the incidents table with an
  empty-state row.
- **ARIA tooltips** on the world-map pins so country names and severity
  are reachable to screen readers and keyboard users.
- A first-class **test suite** that gates regressions across every widget.

---

## Credits

Built for the GUI Development assignment. UI primitives derived from
[shadcn/ui](https://ui.shadcn.com), charts powered by
[Recharts](https://recharts.org), icons by
[lucide.dev](https://lucide.dev).

# charan
