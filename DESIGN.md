---
name: Finance Insight Demo
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#424754'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#727785'
  outline-variant: '#c2c6d6'
  surface-tint: '#005ac2'
  primary: '#0058be'
  on-primary: '#ffffff'
  primary-container: '#2170e4'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#006947'
  on-tertiary: '#ffffff'
  tertiary-container: '#00855b'
  on-tertiary-container: '#f5fff6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  data-tabular:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  container-margin: 32px
  gutter: 24px
  sidebar-width: 260px
  card-padding: 20px
---

## Brand & Style

The design system is engineered for high-stakes financial environments where clarity, precision, and trust are paramount. The brand personality is **Corporate / Modern**, characterized by a rigorous systematic approach to information density and visual hierarchy.

The target audience consists of financial analysts and executive stakeholders who require a high-performance SaaS interface. The aesthetic balances a sophisticated "Pro" feel with the accessibility of modern web applications. By utilizing a hybrid theme—a persistent dark-mode sidebar contrasted with a light-mode data workspace—the system establishes a clear mental model between navigation (control) and analysis (focus).

## Colors

This design system employs a functional color palette optimized for financial data visualization. 

- **Primary Blue (#3b82f6):** Reserved for primary actions, active states, and focus indicators.
- **Secondary Slate (#0f172a):** Used for the persistent sidebar and deep text hierarchies to ground the interface.
- **Surface Neutral (#f8fafc):** The primary background for the main content area, providing a "paper" feel that reduces eye strain during long analytical sessions.
- **Semantic Indicators:** Success Green (#10b981) and Danger Red (#ef4444) are used strictly for market indicators, profit/loss status, and critical alerts.

The interface utilizes a hybrid color mode: the sidebar remains in a permanent dark state to minimize visual noise, while the main dashboard area utilizes a light-mode systematic approach for maximum legibility of complex tables and charts.

## Typography

The typographic system relies on **Inter** for its exceptional legibility and neutral, professional tone. For numerical data and financial values, the system forces **Tabular Figures** (`tnum`) to ensure that columns of numbers align perfectly for easy comparison.

**JetBrains Mono** is introduced sparingly for labels and metadata (e.g., transaction IDs, timestamps) to provide a technical, precise edge to the financial data. 

Hierarchy is established through weight shifts rather than dramatic size changes to maintain information density. On mobile devices, `display-lg` should scale down to 28px/36px to prevent layout breaking.

## Layout & Spacing

The design system follows a **Fixed-Fluid Hybrid** grid. The sidebar is fixed at 260px, while the main content area occupies the remaining width with a 12-column fluid grid.

- **Grid:** 12-column system with 24px gutters.
- **Margins:** 32px outer margins on desktop; 16px on mobile.
- **Rhythm:** All spacing (margins, padding, gaps) must be multiples of the 4px base unit to ensure a mathematical rigor consistent with financial software.

Content should reflow into a single column on mobile, with the sidebar collapsing into a bottom navigation bar or a hidden "hamburger" drawer.

## Elevation & Depth

This design system utilizes **Tonal Layers** combined with **Ambient Shadows** to create a structured, professional depth.

1.  **Level 0 (Base):** Main content background (#f8fafc).
2.  **Level 1 (Cards):** White surfaces (#ffffff) with a 1px border (#e2e8f0) and a very soft, diffused shadow (0px 1px 3px rgba(15, 23, 42, 0.05)).
3.  **Level 2 (Dropdowns/Modals):** White surfaces with a more pronounced shadow (0px 10px 15px -3px rgba(15, 23, 42, 0.1)) to indicate clear interaction priority.

The sidebar does not use shadows; it relies on high-contrast color values to separate itself from the workspace.

## Shapes

The shape language is **Soft**, emphasizing a modern SaaS feel without becoming too playful or informal.

- **Standard Elements:** 0.25rem (4px) for checkboxes and small tags.
- **Component Enclosures:** 0.5rem (8px) for cards, input fields, and buttons.
- **Large Containers:** 0.75rem (12px) for modals and main dashboard panels.

This consistent use of slightly rounded corners softens the technical nature of financial data while maintaining a structured, grid-aligned appearance.

## Components

### Buttons
Primary buttons use the Primary Blue (#3b82f6) with white text. Secondary buttons use a transparent background with a subtle border (#e2e8f0). States (hover/active) should be achieved by darkening the background color by 10%.

### Data Tables
Tables are the core of the dashboard. Use a high-contrast design: `body-md` for row content, `label-sm` (uppercase) for headers. Row borders are 1px solid (#f1f5f9). Hover states on rows use a subtle background shift to #f8fafc.

### Cards
Cards are the primary container for dashboard widgets. They must include a `headline-sm` title and 20px internal padding. Chart containers within cards should bleed to the edge of the padding but maintain the card's internal radius.

### Input Fields
Following the `shadcn/ui` style, inputs use a 1px border (#e2e8f0), 8px corner radius, and 14px text. The focus state is a 2px ring of Primary Blue with a 2px offset.

### Chips/Badges
Badges for "Status" use low-saturation backgrounds with high-saturation text (e.g., Success Green at 10% opacity for the background, 100% for the text).