---
name: Premium Bullion System
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#38393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#d0cecd'
  on-tertiary: '#313030'
  tertiary-container: '#b5b2b2'
  on-tertiary-container: '#454545'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c9c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  section-padding-lg: 120px
  section-padding-sm: 64px
---

## Brand & Style

The design system is engineered to evoke the timeless prestige of physical wealth and the institutional security of high-finance bullion trading. The aesthetic is anchored in **Minimalism** with a heavy **Editorial** influence, prioritizing generous whitespace and high-contrast layouts to reflect clarity and exclusivity.

The target audience consists of high-net-worth individuals and institutional investors who value stability over speculation. The UI avoids the frenetic energy of fintech and crypto, instead opting for a "digital vault" experience. Every interaction is designed to feel deliberate, heavy, and secure, utilizing a structured grid and crisp, refined borders to communicate architectural integrity.

## Colors

The palette is a sophisticated interplay between light and shadow. The primary metallic Gold (#D4AF37) is used strictly for high-value highlights, active states, and primary calls to action, ensuring it retains its perceived value through scarcity. 

Deep Charcoal and Matte Black form the foundation of the interface, providing a sense of depth and weight. For content-heavy sections or transactional forms, Light Grey and Crisp White are utilized to ensure maximum legibility and a clean, institutional feel. Color transitions should be avoided; solid fills and precise strokes are preferred over gradients to maintain the "tangible" quality of the UI.

## Typography

This design system employs a classic typographic contrast. **Playfair Display** provides the authoritative, literary voice for all headlines and display text, emphasizing the heritage and prestige of gold. It should be set with tight letter spacing in larger sizes to maintain a cohesive, high-end feel.

**Inter** is the workhorse for all utility, body, and transactional text. Its neutral, geometric construction provides the professional clarity required for financial data. Use `label-caps` for metadata, section headers, and small UI hints to introduce an organized, institutional rhythm to the page.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop to create a centered, balanced "column of truth" that feels stable and prestigious. A 12-column system is used with generous 24px gutters.

Whitespace is used as a luxury element. Large vertical gaps (120px+) between major sections prevent the interface from feeling cluttered or "salesy." On mobile, the margins tighten to 20px, and content reflows into a single-column stack, ensuring that the high-quality photography remains the focal point without being cramped by UI elements.

## Elevation & Depth

To achieve a "tangible" and secure feel, the design system avoids floating elements. Instead, it uses **Tonal Layers** and **Refined Outlines**. 

Depth is communicated through:
1.  **Stroke-based Hierarchy:** Elements are defined by subtle 1px or 2px borders in Gold or Charcoal rather than heavy shadows.
2.  **Inset States:** Buttons and inputs may use very slight inner shadows to feel "stamped" into the interface.
3.  **Matte Elevations:** Elevated surfaces (like modals) use a slightly lighter shade of Charcoal (#252525) with a sharp, low-spread shadow to create a crisp "lift" off the background without appearing soft or blurry.

## Shapes

The shape language is primarily **Soft (0.25rem)**. This provides just enough refinement to feel modern and "machined" while maintaining the structural strength of sharp corners. 

Buttons and input fields should strictly adhere to this radius. High-level containers, such as hero images or vault galleries, may use a sharp (0px) corner to lean into a more traditional editorial aesthetic. Circular elements are reserved exclusively for avatars or specific status indicators to maintain the dominant rectangular, architectural motif.

## Components

### Buttons
- **Primary:** Solid Gold (#D4AF37) with Matte Black text. High-contrast, no gradient.
- **Secondary:** Transparent background with a 2px Charcoal or Gold border.
- **Interaction:** On hover, primary buttons shift to a slightly deeper gold; secondary buttons gain a subtle solid fill.

### Input Fields
Inputs are structured with a Matte Black background and a 1px Charcoal border. Labels use the `label-caps` style above the field. Focused states utilize a 1px Gold border.

### Cards
Cards for product listings (gold bars, coins) use a Matte Black background with a subtle border. They should feature generous internal padding (32px) and use high-resolution, isolated product photography against a neutral grey or black background.

### Trust Markers & Data
- **Live Price Ticker:** A minimalist bar at the top or bottom of the viewport using a dark background and precise Inter typography. 
- **Dividers:** Use 1px solid lines in Charcoal to separate content, maintaining the grid's structural feel.
- **Charts:** Line charts for gold prices should use a clean Gold line with no fill/gradient underneath, emphasizing the data's precision.