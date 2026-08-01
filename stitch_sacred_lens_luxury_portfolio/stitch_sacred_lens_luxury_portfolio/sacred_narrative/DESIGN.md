---
name: Sacred Narrative
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1b1b1d'
  surface-container: '#201f21'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#dac2b2'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#a28d7f'
  outline-variant: '#544338'
  surface-tint: '#ffb780'
  primary: '#ffb780'
  on-primary: '#4e2600'
  primary-container: '#e58a3c'
  on-primary-container: '#582b00'
  inverse-primary: '#924c00'
  secondary: '#fbba6a'
  on-secondary: '#472a00'
  secondary-container: '#794b00'
  on-secondary-container: '#ffbd6d'
  tertiary: '#c8c5cb'
  on-tertiary: '#303034'
  tertiary-container: '#a19fa4'
  on-tertiary-container: '#37363b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdcc4'
  primary-fixed-dim: '#ffb780'
  on-primary-fixed: '#2f1400'
  on-primary-fixed-variant: '#6f3800'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#fbba6a'
  on-secondary-fixed: '#2b1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#e4e1e7'
  tertiary-fixed-dim: '#c8c5cb'
  on-tertiary-fixed: '#1b1b1f'
  on-tertiary-fixed-variant: '#47464b'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 72px
    fontWeight: '600'
    lineHeight: 84px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '500'
    lineHeight: 44px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-mobile: 24px
  margin-desktop: 80px
  section-gap: 160px
---

## Brand & Style

This design system establishes a premium, high-end visual language for professional photography, blending cultural reverence with extreme minimalism. The aesthetic is curated and cinematic, designed to act as a silent frame for high-resolution imagery.

The style is **Minimalist-Luxury**, defined by deep obsidian surfaces, expansive whitespace (dark-space), and sophisticated typography. It prioritizes a respectful, gallery-like experience that feels both ancient and contemporary. Visual interest is generated through light rather than structure—subtle glows, amber highlights, and razor-thin borders that mimic the precision of a camera lens.

## Colors

The palette is rooted in the "Sacred Orange" of the brand's identity, set against a void-like obsidian background to ensure colors in photography pop with maximum vibrancy.

- **Primary (Sacred Orange):** Used for branding, primary calls to action, and thin structural accents.
- **Background (Obsidian Black):** The foundation of the entire system; provides a deep, non-distractive canvas.
- **Surface (Charcoal Slate):** Used for cards or sectional backgrounds to provide a soft lift from the true black base.
- **Accent (Warm Amber Gold):** Reserved exclusively for interactive states and hover effects to guide the user's eye with a warm "glow."
- **Typography (Off-White):** A high-legibility, low-strain white that prevents harsh glare on dark backgrounds.

## Typography

The typographic hierarchy relies on the tension between the editorial elegance of *Playfair Display* and the functional precision of *Inter*. 

- **Display & Headlines:** Set in Playfair Display. Use these for storytelling, title sequences, and photo series names.
- **Body:** Set in Inter for maximum clarity. Paragraphs should maintain a generous line height to enhance the feeling of "air" within the design.
- **Labels:** Always uppercase with tracked-out letter spacing to provide a modern, metadata-style aesthetic often seen in high-end galleries.

## Layout & Spacing

This design system uses a **Fluid-Fixed Hybrid** model. While content follows a 12-column grid, the whitespace is intentional and aggressive.

- **Grid:** 12 columns for desktop, 4 columns for mobile. 
- **The "Breath":** Large-scale photography should often sit within a "safe zone" of 80px margins on desktop, allowing the obsidian background to frame the work.
- **Section Gaps:** Vertically, sections are separated by significant gaps (160px+) to ensure the user processes one "story" at a time.
- **Alignment:** Central alignment is preferred for hero moments; asymmetrical, staggered alignments are encouraged for gallery grids to create a dynamic, editorial rhythm.

## Elevation & Depth

In a minimalist dark mode system, elevation is achieved through **Tonal Layering** and **Light Bloom** rather than traditional shadows.

- **Base Level:** #0E0E10 (Obsidian).
- **Surface Level:** #1A1A1E (Charcoal). Use this for floating panels or image metadata cards.
- **Outlines:** Instead of depth, use 1px solid borders at #E58A3C with 25% opacity. This creates a "etched" look.
- **The Amber Glow:** For active elements or focal points, use a subtle `drop-shadow` or `box-shadow` with the Primary color (#E58A3C) at very low opacity (10-15%) and high blur (40px+) to simulate light emanating from the screen.

## Shapes

To maintain an exclusive, architectural feel, this system uses **Sharp (0px)** corners for almost all structural elements, including buttons and image containers. 

- **Images:** Strictly sharp edges to mimic physical prints.
- **Buttons:** Rectangular with no radius.
- **Exceptions:** Very small icons or decorative logo-related elements may use circular forms, but the UI container logic remains strictly orthogonal.

## Components

### Buttons
- **Primary:** No fill, 1px border of #E58A3C. Text is Label-LG. On hover, the background fills with #F2B263 and text switches to #0E0E10.
- **Ghost:** No border, no fill. Text has a subtle underline that expands on hover.

### Input Fields
- Underline-only style using the 25% primary orange divider. On focus, the line becomes 100% opaque Primary Orange with a subtle glow beneath the text.

### Cards & Gallery Items
- Images should feature a "dimmed" state (80% opacity) by default. On hover, they transition to 100% opacity with a slight scale-up (1.02x) and the metadata (Label-LG) appears using a smooth fade-in.

### Dividers
- Horizontal and vertical lines are strictly 1px wide. Use #E58A3C at 25% opacity. In long-scroll pages, dividers should not span the full width, leaving 80px of "air" on either side.

### Navigation
- Top-aligned, persistent but minimal. Use high letter-spacing for links. The active state is indicated by a single dot in Sacred Orange beneath the link.