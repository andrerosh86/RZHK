# RZHK VISUAL ENGINEERING - COMPLETE WEBSITE SPECIFICATION
## Build Instructions for Claude Code

---

## 📋 PROJECT SUMMARY
Build a premium, cinematic, fully-functional portfolio landing page for RZHK Visual Engineering with:
- Loading screen with animated logo
- Cinematic split-screen hero with parallax
- Interactive service cards with modal expansions
- Smooth animations via Framer Motion & GSAP
- Fully responsive design
- 60fps performance

---

## 🎨 DESIGN SPECIFICATIONS

### Color Palette
```
Primary Background: #000000 (pure black)
Text Primary: #FFFFFF (white)
Text Secondary: #B0B0B0 (light gray)
Text Tertiary: #808080 (medium gray)
Accent Red: #DC143C (crimson - automotive side only)
Accent Red Glow: rgba(220, 20, 60, 0.3)
Overlay Dark: rgba(0, 0, 0, 0.7)
```

### Typography
**Primary Font: Futura PT (or similar geometric sans-serif)**
- Alternative 1: Avenir Next
- Alternative 2: DIN Alternate
- Alternative 3: Proxima Nova

**Font Weights Used:**
- Bold: 700 (headings)
- Regular: 400 (body text)
- Light: 300 (secondary text)

**Letter Spacing:**
- Logo: 0.2em
- Tagline: 0.15em
- Navigation: 0.12em
- Service titles: 0.1em
- Body text: 0.05em

**Font Sizes:**
- Main Logo (RZHK): 6rem (desktop) / 3rem (mobile)
- Tagline: 0.875rem
- Hero Statement: 1rem
- Navigation: 0.875rem
- Service Title: 1.25rem
- Service Description: 0.875rem

---

## 🖼️ ASSET SPECIFICATIONS

### Images Provided:
1. **rzhk.png** - Main logo (vector/clean, use for all instances)
2. **rzhk_with_slogan.png** - Logo + tagline (reference for positioning)
3. **full_header_example.png** - Reference for exact hero layout, nav, and center content
4. **back_left.png** - Architecture background (left side)
5. **back_right.png** - Automotive background (right side)

### Image Usage:
- **Logo**: Import as React component or SVG, render at scale
- **Backgrounds**: Split into left (architecture) and right (automotive) layers
- **Resolution**: Ensure backgrounds are optimized (2560x1440 or 1920x1080 depending on device)
- **Lazy Loading**: Use next/image with loading="lazy"

---

## 📐 PAGE LAYOUT STRUCTURE

### 1. LOADING SCREEN (0-3 seconds)
**Duration**: 3 seconds (configurable)
**Behavior**:
- Full viewport, pure black background
- Center vertically and horizontally
- Show RZHK logo with animated entry

**Animation Sequence**:
1. **Phase 1 (0-0.8s)**: Letters appear sequentially with subtle stroke-to-fill effect
   - R: 0-0.2s (draw + fill)
   - Z: 0.15-0.35s (draw + fill)
   - H: 0.3-0.5s (draw + fill)
   - K: 0.45-0.65s (draw + fill)
2. **Phase 2 (0.8-1.5s)**: Slight fragment/glitch effect (3-4 micro-shakes, very subtle)
3. **Phase 3 (1.5-3s)**: Hold final state, then fade + slight blur
4. **Tagline Fade**: "VISUAL ENGINEERING" appears at 1.2s, fades in over 1s
5. **Exit (at 3s)**: Fade out + minimal zoom-out (scale 1 → 0.95) into landing page

**Technical Notes**:
- Use Framer Motion for letter sequencing
- Use SVG stroke animation for draw effect
- Consider Three.js for subtle 3D perspective if needed

---

### 2. HERO SECTION (MAIN LANDING PAGE)

#### Layout Structure:
```
┌─────────────────────────────────────────┐
│  WORK   ABOUT   SERVICES   CONTACT      │ (nav, top center)
├────────────────┬────────────────────────┤
│                │                        │
│  ARCHITECTURE  │   AUTOMOTIVE           │
│  (dark, soft)  │   (dark, red light)    │
│                │                        │
│                │                        │
│     ┌──────────────────────┐            │
│     │   RZHK LOGO (Large)  │            │
│     │ VISUAL ENGINEERING   │            │
│     │ (tagline)            │            │
│     │                      │            │
│     │ "Engineering visuals │            │
│     │ where precision      │            │
│     │ meets emotion"       │            │
│     └──────────────────────┘            │
│                │                        │
├────────────────┴────────────────────────┤
│  [Service Cards Row Below - 5 columns]  │
└─────────────────────────────────────────┘
```

#### Hero Container
- **Height**: 100vh (fullscreen)
- **Width**: 100vw
- **Background**: Split image (left + right)
- **Overflow**: hidden

#### Navigation Bar (Top Center)
- **Position**: absolute, top 2rem, centered horizontally
- **Layout**: flexbox, gap 3rem
- **Items**: WORK / ABOUT / SERVICES / CONTACT
- **Styling**:
  - Font: Futura PT, 0.875rem, uppercase, letter-spacing 0.12em
  - Color: #FFFFFF
  - Hover: opacity 0.6, transition 0.3s
  - Optional: underline animation from center

#### Center Content Area
- **Position**: absolute, center (50% left, 50% top, transform translate(-50%, -50%))
- **Width**: 100% max (adjust for content)
- **Text Alignment**: center

**Components**:
1. **Logo**
   - Size: 6rem (desktop) / 3rem (mobile)
   - Margin bottom: 1.5rem
   - Subtle hover effect: slight scale + soft glow (optional)

2. **Tagline**
   - Text: "VISUAL ENGINEERING"
   - Font: 0.875rem, uppercase, letter-spacing 0.15em
   - Color: #FFFFFF
   - Margin bottom: 2rem
   - Animation: fade in on page load

3. **Statement**
   - Text: "Engineering visuals where precision meets emotion."
   - Font: 1rem, letter-spacing 0.05em
   - Color: #B0B0B0
   - Max-width: 400px
   - Line height: 1.6
   - Margin bottom: 2rem
   - Animation: fade in with slight delay

4. **CTA Button (Optional)**
   - Text: "VIEW WORK" or "EXPLORE"
   - Style: outline button, border #FFFFFF, padding 0.75rem 2rem
   - Hover: background fades to #FFFFFF, text → #000000
   - Transition: 0.4s ease

#### Background Split Management
- **Left Side (Architecture)**:
  - Image: back_left.png
  - Position: absolute, left 0, top 0
  - Size: 50vw, 100vh
  - Object-fit: cover
  - Filter: brightness(0.8) contrast(1.1)
  - Z-index: 1 (behind content)

- **Right Side (Automotive)**:
  - Image: back_right.png
  - Position: absolute, right 0, top 0
  - Size: 50vw, 100vh
  - Object-fit: cover
  - Filter: brightness(0.8) contrast(1.1) saturate(1.2)
  - Z-index: 1 (behind content)

---

### 3. SERVICE CARDS SECTION (BOTTOM STRIP)

#### Container
- **Position**: absolute, bottom 0, width 100%, height auto
- **Background**: rgba(0, 0, 0, 0.5) (subtle overlay)
- **Backdrop Filter**: blur(10px) (optional, glassmorphism)
- **Padding**: 2rem
- **Display**: flex, justify-content space-around, gap 1rem

#### Service Card Item (5 Total)
**Services List**:
1. Architectural Visualization
2. Automotive Cinematics
3. Visual Storytelling
4. Technical Direction
5. Visual Engineering

**Card Styling**:
- **Width**: calc(20% - 1rem) or flex: 1
- **Padding**: 1.5rem
- **Border**: none, but thin vertical separator (opacity 0.2)
- **Cursor**: pointer
- **Hover States**:
  - Text opacity: 0.8 → 1
  - Scale: 1 → 1.05
  - Transition: 0.3s ease
  - Background: rgba(255, 255, 255, 0.05)

**Card Content**:
- **Title**: All caps, 1.25rem, font-weight 700, letter-spacing 0.1em
- **Description**: Hidden by default (shown only on hover/click)
- **Icon/Separator**: Optional thin line above title

**Descriptions**:
1. "Designing spaces before they exist. Precision-driven imagery for architecture, interiors, and real estate."
2. "Capturing performance through light and motion. High-end visuals focused on emotion, speed, and detail."
3. "Crafting narratives through composition, timing, and atmosphere. Every frame serves a purpose."
4. "Bridging creativity and execution. Optimizing pipelines, realism, and production workflows."
5. "Where art direction meets technical precision. Building controlled visual systems for consistent, high-end output."

---

## ⚙️ INTERACTION SPECIFICATIONS

### 1. PARALLAX EFFECT (CRITICAL)

#### Mouse Move Parallax:
```
Function: updateParallax(mouseX, mouseY)
- Calculate offset: offsetX = (mouseX - centerX) * 0.02
- Calculate offset: offsetY = (mouseY - centerY) * 0.02

Left Background (Architecture):
  - Transform: translate(offsetX * 0.3, offsetY * 0.3)
  - Depth layer: slowest

Right Background (Automotive):
  - Transform: translate(offsetX * -0.3, offsetY * -0.3)
  - Depth layer: slowest (opposite direction)

Logo:
  - Transform: translate(offsetX * 0.05, offsetY * 0.05)
  - Depth layer: nearly static

Use Framer Motion useMotionValue + useTransform for smooth performance
```

#### Scroll Parallax:
```
Function: updateScrollParallax(scrollY)
- Left image: translateY(scrollY * 0.5)
- Right image: translateY(scrollY * 0.5)
- Logo: translateY(scrollY * 0.2)
- Content: translateY(scrollY * 0.3)

Creates depth illusion where background moves slower than scroll
Use Framer Motion useScroll + useTransform for smooth performance
```

**Implementation Notes**:
- Use `useMotionValue` for mouse position tracking
- Use `useTransform` for responsive transforms
- Debounce mouse move to 60fps (requestAnimationFrame)
- Clamp transform values to prevent excessive shifts

---

### 2. LOGO BEHAVIOR

#### Subtle Reactive Movement:
- On mouse enter: slight scale (1 → 1.02) + soft glow
- On mouse move: micro-parallax (offset by 2-3px based on mouse position)
- On mouse leave: smooth return to original state
- Duration: 0.3s (easeOut)

#### Optional Micro-Interactions:
- Hover glow: box-shadow 0 0 40px rgba(255, 255, 255, 0.1)
- Slight sharpening: filter drop-shadow(0 0 2px rgba(255, 255, 255, 0.2))

---

### 3. BACKGROUND IMAGE INTERACTION

#### Left Side (Architecture) - Hover:
- Brightness: 0.8 → 0.9
- Saturation: 1 → 1.1
- Transition: 0.4s ease
- Return on mouse leave

#### Right Side (Automotive) - Hover:
- Brightness: 0.8 → 0.85
- Saturation: 1.2 → 1.3
- Red tint: subtle increase in warmth (optional filter: hue-rotate(5deg))
- Car lights: opacity boost 0.8 → 1 (if distinct layer)
- Transition: 0.4s ease

---

### 4. SERVICE CARD INTERACTIONS

#### Click / Tap Behavior:

**Phase 1: Modal/Panel Opens**
- Background overlay darkens: 0.5 → 0.8 (z-index 50)
- Selected card expands smoothly upward
- Animation duration: 0.5s (easeInOut)

**Phase 2: Content Display**
- Title slides in from top
- Description fades in (staggered 0.1s after title)
- Optional image/preview fades in
- Duration: 0.4s total

**Phase 3: Close Action**
- On click outside OR close button (X)
- Reverse animation sequence
- Return to card hover state

**Modal/Panel Styling**:
- **Position**: fixed or absolute over hero
- **Width**: 80% (desktop) / 95% (mobile)
- **Max-width**: 600px
- **Height**: auto, min 300px
- **Background**: #000000, border 1px solid #333333
- **Padding**: 2rem
- **Border-radius**: 4px (minimal)
- **Box-shadow**: 0 20px 60px rgba(0, 0, 0, 0.9)
- **Top**: 50%, left 50%, transform translate(-50%, -50%)

**Modal Content**:
```
┌─────────────────────────────────┐
│  Title (Service Name)       [X] │  (close button top right)
├─────────────────────────────────┤
│                                 │
│  [Optional Image/Preview]       │
│                                 │
├─────────────────────────────────┤
│  Description (full paragraph)   │
│                                 │
│  [Optional: Learn More →]       │
└─────────────────────────────────┘
```

---

### 5. MICRO-INTERACTIONS (ACROSS ALL ELEMENTS)

#### Button Hover:
- Underline grows from center
- Animation: width 0 → 100%, duration 0.3s
- Color: #FFFFFF → #B0B0B0

#### Text Load Animation:
- Opacity: 0 → 1
- Duration: 0.6s (staggered for each line)
- Easing: easeOut

#### Section Appear Animation:
- Opacity: 0 → 1
- Transform: translateY(20px) → translateY(0)
- Duration: 0.8s
- Easing: easeOut
- Stagger children by 0.1s

#### Separator Lines:
- Opacity on hover: 0.2 → 0.4
- Transition: 0.3s ease

---

## 📱 RESPONSIVE DESIGN SPECIFICATIONS

### Breakpoints
```
Mobile:     < 640px
Tablet:     640px - 1024px
Desktop:    > 1024px
```

### Mobile (< 640px)

#### Hero Section:
- **Layout**: Stack backgrounds vertically (top: architecture, bottom: automotive)
- **Height**: 200vh or 150vh to show both images
- **Parallax**: Reduce motion (50% intensity)
- **Logo size**: 3rem
- **Tagline**: 0.75rem
- **Statement**: 0.9rem
- **Nav**: Stack vertically or hide behind hamburger menu
- **Statement max-width**: 90%

#### Service Cards:
- **Layout**: Single column (5 rows)
- **Width**: 100%
- **Padding**: 1rem
- **Font size**: Reduce by 10%
- **Gap**: 0.5rem
- **Hover effect**: Opacity change only (no scale)

#### Modal:
- **Width**: 95%
- **Max-width**: 100%
- **Padding**: 1.5rem
- **Font size**: Reduce by 15%

### Tablet (640px - 1024px)

#### Hero Section:
- **Logo size**: 4.5rem
- **Tagline**: 0.8rem
- **Statement**: 0.95rem
- **Nav**: Horizontal with reduced spacing (1.5rem gap)

#### Service Cards:
- **Layout**: 2-3 columns (grid)
- **Width**: calc(50% - 0.5rem) or calc(33% - 0.5rem)
- **Padding**: 1.25rem
- **Font size**: 90% of desktop

### Desktop (> 1024px)
- Full specifications as detailed above

---

## 🎬 ANIMATION SPECIFICATIONS

### Animation Library & Timing Functions

**Primary Library**: Framer Motion
- `easeOut`: default for enter animations
- `easeInOut`: for state transitions
- `linear`: for continuous parallax
- `spring`: for playful micro-interactions

**Secondary Library**: GSAP (optional, for advanced timelines)
- Use for sequencing complex animations
- Timeline control for loading screen

### Animation Timeline Details

#### Loading Screen Animation:
```
Timeline: 0-3000ms total

0-200ms: R letter appears (stroke → fill)
15-350ms: Z letter appears (stroke → fill)
30-500ms: H letter appears (stroke → fill)
45-650ms: K letter appears (stroke → fill)

100-150ms: Micro-glitch effect (subtle 2-3px shake)
  - Apply at 800ms, 850ms, 900ms, 950ms
  - Amplitude: 2px max

800-1500ms: Fragment assembly (subtle reassembly effect)
  - Opacity flicker 0.95-1
  - Scale micro-pulse 0.99-1.01

1200-2200ms: Tagline fade in
  - Opacity 0 → 1

2200-3000ms: Hold final state

3000ms: Exit animation (fade + zoom)
  - Opacity 1 → 0
  - Scale 1 → 0.95
  - Duration: 500ms

Page transition: Trigger fade in of main content simultaneously
```

#### Hero Section Load Animation:
```
Timeline: After loading screen exits

0ms: Navigation appears
  - Opacity 0 → 1
  - Duration: 400ms
  - Easing: easeOut

100ms: Center content appears
  - Logo: fade in + slight scale (0.95 → 1)
  - Tagline: fade in (delay 150ms)
  - Statement: fade in (delay 300ms)
  - Duration: 600ms each
  - Easing: easeOut

300ms: Service cards appear
  - Stagger: 80ms between items
  - Each: opacity 0 → 1, translateY(20px) → 0
  - Duration: 500ms
```

#### Parallax Animation (Continuous):
- Update on mousemove (throttled to 60fps)
- Duration: 0.4s (smooth follow)
- Easing: easeOut

#### Service Card Modal Animation:
```
Open:
  - Background overlay: opacity 0.5 → 0.8, duration 300ms
  - Modal panel: 
    - Scale 0.9 → 1
    - Opacity 0 → 1
    - Duration: 400ms
    - Easing: easeOut
  - Content stagger: 80ms between items

Close:
  - Reverse all animations
  - Duration: 300ms
```

---

## 🔧 TECHNICAL IMPLEMENTATION GUIDE

### Project Structure
```
project/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (main landing)
│   └── globals.css
├── components/
│   ├── LoadingScreen.tsx
│   ├── HeroSection.tsx
│   ├── Navigation.tsx
│   ├── CenterContent.tsx
│   ├── BackgroundSplit.tsx
│   ├── ServiceCards.tsx
│   ├── ServiceModal.tsx
│   └── ParallaxProvider.tsx
├── hooks/
│   ├── useParallax.ts
│   ├── useMousePosition.ts
│   └── useScrollParallax.ts
├── lib/
│   ├── constants.ts
│   └── animations.ts
└── public/
    ├── images/
    │   ├── rzhk-logo.png
    │   ├── back-left.png
    │   └── back-right.png
    └── fonts/ (if self-hosted)
```

### Key Dependencies
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "framer-motion": "^10.16.0",
    "gsap": "^3.12.0",
    "tailwindcss": "^3.4.0",
    "react-use-gesture": "^10.2.0"
  }
}
```

### CSS Custom Properties (Tailwind Config)
```javascript
theme: {
  colors: {
    black: '#000000',
    white: '#FFFFFF',
    gray: {
      300: '#B0B0B0',
      500: '#808080'
    },
    accent: {
      red: '#DC143C'
    }
  },
  fontFamily: {
    sans: ['Futura PT', 'Avenir Next', 'sans-serif']
  },
  letterSpacing: {
    tighter: '0.05em',
    tight: '0.1em',
    normal: '0.12em',
    wide: '0.15em',
    wider: '0.2em'
  }
}
```

---

## 🎯 INTERACTIVE ELEMENT CHECKLIST

- [ ] Loading screen with animated logo entry/exit
- [ ] Parallax on mouse move (left/right opposite directions)
- [ ] Parallax on scroll (depth effect)
- [ ] Logo hover: scale + glow
- [ ] Background hover effects (left/right distinct)
- [ ] Navigation menu with underline animation on hover
- [ ] Service cards hover states (scale + opacity)
- [ ] Service card click opens modal with smooth animation
- [ ] Modal close button (X) with hover effect
- [ ] Modal backdrop click to close
- [ ] Smooth fade transitions between states
- [ ] Fully responsive layout (mobile/tablet/desktop)
- [ ] Performance: 60fps on modern devices
- [ ] Lazy load images
- [ ] Touch-friendly mobile interactions

---

## ⚡ PERFORMANCE OPTIMIZATION

### Image Optimization
```
- Use next/image with:
  - priority={false} (lazy load)
  - quality={80}
  - responsive sizes
  - Ensure WebP/AVIF fallbacks

- Compress backgrounds:
  - back_left.png: target ~50KB
  - back_right.png: target ~50KB
  - Use TinyPNG or ImageOptim
```

### Animation Performance
```
- Use GPU-accelerated properties only:
  - transform (translateX, translateY, scale)
  - opacity
  
- Avoid animating:
  - width/height (use transform scale instead)
  - left/right/top/bottom (use transform translate)
  - background color (use opacity + overlay)

- Throttle/Debounce:
  - Mouse move events (requestAnimationFrame)
  - Scroll events (useScroll from Framer Motion)
  - Resize events (debounce 250ms)

- Use will-change sparingly:
  - Only on actively animated elements
  - Remove after animation completes
```

### Code Splitting
```
- Lazy load ServiceModal component
- Lazy load Three.js (if used)
- Code-split pages if adding more routes
```

---

## 📝 COPY & CONTENT

### Navigation
- WORK
- ABOUT
- SERVICES
- CONTACT

### Hero Section
**Tagline**: VISUAL ENGINEERING
**Statement**: Engineering visuals where precision meets emotion.

### Service Cards (5 Items)

**1. ARCHITECTURAL VISUALIZATION**
Description: Designing spaces before they exist. Precision-driven imagery for architecture, interiors, and real estate.

**2. AUTOMOTIVE CINEMATICS**
Description: Capturing performance through light and motion. High-end visuals focused on emotion, speed, and detail.

**3. VISUAL STORYTELLING**
Description: Crafting narratives through composition, timing, and atmosphere. Every frame serves a purpose.

**4. TECHNICAL DIRECTION**
Description: Bridging creativity and execution. Optimizing pipelines, realism, and production workflows.

**5. VISUAL ENGINEERING**
Description: Where art direction meets technical precision. Building controlled visual systems for consistent, high-end output.

### Footer
**Social Links**: INSTAGRAM | BEHANCE | LINKEDIN
**Copyright**: © RZHK VISUAL ENGINEERING

---

## 🎨 FONT RECOMMENDATIONS

### Primary Font: Futura PT
- Why: Geometric, premium, matches provided design
- Fallbacks (in order):
  1. Avenir Next (similar geometry, widely available)
  2. DIN Alternate (technical, clean)
  3. Proxima Nova (modern geometric)
  4. Montserrat Bold (geometric sans-serif)
  5. Inter (fallback, system sans)

### Implementation
```typescript
// In globals.css or layout.tsx
import { Futura_PT } from 'next/font/google';
// or use @import from Google Fonts if available

// Fallback stack:
font-family: 'Futura PT', 'Avenir Next', 'DIN Alternate', 'Proxima Nova', 'Montserrat', sans-serif;
```

### Letter Spacing per Element
| Element | Tracking |
|---------|----------|
| RZHK Logo | 0.2em |
| VISUAL ENGINEERING | 0.15em |
| Navigation | 0.12em |
| Service Titles | 0.1em |
| Descriptions | 0.05em |
| Body Text | 0.03em |

---

## 🔐 BROWSER SUPPORT
- Chrome/Edge: 90+
- Firefox: 88+
- Safari: 14+
- Mobile browsers: Latest 2 versions

### Feature Detection
- GPU parallax: Test transform support
- CSS backdrop-filter: Fallback to solid bg
- requestAnimationFrame: Graceful animation fallback

---

## ✅ VALIDATION CHECKLIST

### Visual Accuracy
- [ ] Logo matches rzhk.png exactly
- [ ] Header layout matches full_header_example.png
- [ ] Background split matches back_left.png & back_right.png
- [ ] Tagline font/spacing matches rzhk_with_slogan.png
- [ ] Color palette verified against reference images
- [ ] Typography hierarchy correct
- [ ] Spacing/margins match design intent

### Functionality
- [ ] Loading screen plays on first load
- [ ] All parallax effects smooth at 60fps
- [ ] Service modals open/close smoothly
- [ ] Responsive breakpoints tested
- [ ] Touch interactions work on mobile
- [ ] Accessibility: focus states, ARIA labels
- [ ] Images lazy-load correctly

### Performance
- [ ] Lighthouse: 90+ score
- [ ] First contentful paint: < 2s
- [ ] Animations: consistent 60fps
- [ ] No layout shifts (CLS: 0.1 or lower)
- [ ] Mobile optimization confirmed

---

## 🚀 DEPLOYMENT CHECKLIST

- [ ] Environment variables configured (.env.local)
- [ ] Images optimized and paths correct
- [ ] Build command: `npm run build`
- [ ] Production build tested locally
- [ ] Vercel deployment configured
- [ ] Custom domain configured (if applicable)
- [ ] Analytics integrated (optional)
- [ ] Form submission backend ready (for CONTACT)

---

## 📞 NEXT STEPS FOR CLAUDE CODE

1. **Create Next.js project** with App Router
2. **Import assets**: Place PNG files in `/public/images/`
3. **Build components** in order:
   - LoadingScreen (most complex animation)
   - BackgroundSplit
   - ParallaxProvider (hooks for parallax)
   - Navigation
   - CenterContent
   - ServiceCards
   - ServiceModal
   - HeroSection (combine all above)
4. **Implement animations** using Framer Motion
5. **Add responsive styles** with Tailwind
6. **Test** on desktop, tablet, mobile
7. **Optimize images** and build
8. **Deploy** to Vercel

---

**Total Estimated Build Time**: 4-6 hours for complete implementation with all animations and interactions.

**Difficulty Level**: Advanced (requires strong Framer Motion and React knowledge)

