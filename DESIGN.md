---
name: Kinetic Pulse
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e0bfbd'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#a78a88'
  outline-variant: '#584140'
  surface-tint: '#ffb3b0'
  primary: '#ffb3b0'
  on-primary: '#68000f'
  primary-container: '#ff6b6b'
  on-primary-container: '#6d0010'
  inverse-primary: '#ae2f34'
  secondary: '#ecb2ff'
  on-secondary: '#520071'
  secondary-container: '#6f258e'
  on-secondary-container: '#e59dff'
  tertiary: '#52dea2'
  on-tertiary: '#003824'
  tertiary-container: '#00b179'
  on-tertiary-container: '#003b26'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b0'
  on-primary-fixed: '#410006'
  on-primary-fixed-variant: '#8c1520'
  secondary-fixed: '#f8d8ff'
  secondary-fixed-dim: '#ecb2ff'
  on-secondary-fixed: '#320047'
  on-secondary-fixed-variant: '#6c228c'
  tertiary-fixed: '#72fbbc'
  tertiary-fixed-dim: '#52dea2'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
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
    lineHeight: '1.5'
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.1em
  technical-data:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-margin-mobile: 20px
  container-margin-desktop: 80px
  gutter: 16px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The design system is built for a 2027 video social landscape that prioritizes human depth over algorithmic fatigue. The brand personality is **Cultural, Dynamic, and Premium**, moving away from the frantic energy of legacy short-form video toward a more intentional, high-fidelity experience.

The visual direction follows a **Modern-Tactile** approach. It blends high-contrast typography with spacious layouts and organic depth. The UI should feel like a premium physical gallery where digital content is treated with archival respect. We avoid the "casino-style" UI of contemporary social apps, opting instead for a "Digital Third Place" aesthetic—calm, focused, and deeply immersive.

Key themes include:
- **Human Connection:** Soft edges and natural motion.
- **Dynamic Content:** Surfaces that adapt to the vibrant colors of video content.
- **Proof & Trust:** Architectural UI elements that frame "Proof Layer" metadata with authority.

## Colors
The palette is rooted in a high-contrast foundation designed for cinematic video playback.

- **Primary & Secondary:** A "Power Duo" of Warm Coral and Electric Violet. These are used for active states, high-priority CTAs, and brand moments. They should rarely be used in solid blocks; instead, use them as gradients to signify "The Fuse"—the connection point between users.
- **Backgrounds:** The default state is a deep Graphite (#121212) to allow video content to "pop" without bezel distraction. The light mode uses a soft Off-White (#F8F8F8) to maintain a premium, editorial feel for long-form reading and community threads.
- **Functional Colors:** Use a muted version of the primary coral for critical errors and a soft mint for verified "Proof Layer" badges.

## Typography
This design system utilizes **Inter** for its incredible versatility and readability in dense social interfaces. To inject the "2027 Technology" feel, **Space Grotesk** is introduced as a secondary label font for technical metadata, "Algorithm Mixer" settings, and "Proof Layer" timestamps.

- **Scale:** Headings are oversized to create an editorial rhythm.
- **Hierarchy:** Use heavy weights (700+) for primary headlines and lighter weights for supporting body text to maintain a high-fashion, high-tech balance.
- **Variable Usage:** Leverage variable font weight axes to subtly transition text weight during scroll interactions or button hovers.

## Layout & Spacing
The layout philosophy centers on **Immersive Focus**.

- **Grid:** A 12-column fluid grid for desktop and a 4-column grid for mobile.
- **The "Safety Zone":** Video content always occupies the full width of the viewport, with UI controls floating in a "Safe Margin" of 20px from the edges.
- **Rhythm:** We use a 4px base unit. Larger stacks (48px+) are encouraged between different "Community Worlds" to give the content room to breathe, preventing the cluttered feeling of traditional social feeds.
- **Algorithm Mixer:** This dedicated panel uses a fixed-width drawer (400px on desktop) to provide a consistent control center for user-curated feeds.

## Elevation & Depth
Depth is used functionally to separate the "Observer Layer" (UI) from the "Content Layer" (Video).

- **Glassmorphism:** Applied sparingly to floating overlays. Use a `backdrop-filter: blur(12px)` with a 10% white (light mode) or 5% white (dark mode) fill. This ensures readability over unpredictable video backgrounds without feeling "heavy."
- **Natural Shadows:** Shadows are long and soft, mimicking an ambient light source from the top-center. Use hex-tinted shadows (e.g., `#000000` at 15% opacity with a 30px blur) to make cards feel like they are floating just above the background.
- **The "Proof" Layer:** Elements verifying content authenticity use a slight inner-glow effect to suggest they are "embedded" into the interface rather than floating on top.

## Shapes
The shape language is organic and approachable.

- **Base Radius:** 18px is the standard for most cards and containers.
- **Large Elements:** Use 24px (rounded-lg) for main video containers and "Community World" cards.
- **Interaction:** Buttons and input fields should utilize the `rounded-xl` (pill) style to contrast against the softer rectangular shapes of the video content.
- **The Mark:** The FUSE logo and related iconography should follow a circular geometry, reinforcing the theme of "Connection."

## Components
- **Buttons:** Primary buttons use the Coral-to-Violet gradient with white text. Secondary buttons are "Ghost" style with a 1px border. All buttons have a high-press "squish" animation (scale 0.96) to feel tactile.
- **The Algorithm Mixer:** A bespoke slider component using a thick track and a large, circular thumb that glows with the primary gradient when active.
- **Proof Layer Badges:** Small, pill-shaped tags with a "Technical-Data" font style. They use a subtle glass effect and a green "Authentic" checkmark icon.
- **Community World Cards:** Large-format cards with video previews as backgrounds. Typography is overlaid using a bottom-weighted gradient scrim for legibility.
- **Input Fields:** Minimalist styling with a bottom-only border that transforms into a gradient line when focused.
- **Chips:** Used for "Vibe" tagging. They are monochromatic (dark grey on dark background) until selected, at which point they take on the primary brand gradient.
