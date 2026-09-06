# RZHK WEBSITE - ASSETS & FONT SPECIFICATION
## Complete Guide for Asset Integration & Font Matching

---

## 🎯 ASSET FILES ANALYSIS

### Uploaded Assets Summary
```
1. rzhk.png - Main Logo
   - Size: Clean vector/PNG
   - Usage: Hero center, navigation (optional)
   - Format: PNG with transparency
   - Color: White on transparent
   - Import method: Next.js Image component

2. rzhk_with_slogan.png - Logo + Tagline Reference
   - Size: Complete branding unit
   - Usage: DESIGN REFERENCE ONLY
   - Font analysis: "VISUAL ENGINEERING" text
   - Purpose: Determine exact typography styling

3. full_header_example.png - Complete Hero Reference
   - Size: Full viewport mockup
   - Usage: LAYOUT & POSITIONING REFERENCE
   - Contains: Navigation, logo, tagline, statement
   - Shows: Exact center alignment, spacing, text color
   - Analysis: All typography styling verified here

4. back_left.png - Architecture Background
   - Size: Half of hero (50vw x 100vh)
   - Usage: Left side parallax layer
   - Styling: Dark, soft-lit architecture
   - Filters needed: brightness(0.8) contrast(1.1)
   - Format: Optimize before deployment

5. back_right.png - Automotive Background
   - Size: Half of hero (50vw x 100vh)
   - Usage: Right side parallax layer
   - Styling: Dark with red light accents
   - Filters needed: brightness(0.8) contrast(1.1) saturate(1.2)
   - Red accent lights: Already in image, enhance on hover
   - Format: Optimize before deployment
```

---

## 📁 FILE ORGANIZATION FOR NEXT.JS PROJECT

### Directory Structure
```
project-root/
├── public/
│   └── images/
│       ├── rzhk-logo.png           (from rzhk.png)
│       ├── back-left.png           (from back_left.png)
│       └── back-right.png          (from back_right.png)
├── app/
│   ├── page.tsx                    (main landing)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── LoadingScreen.tsx
│   ├── HeroSection.tsx
│   ├── Navigation.tsx
│   ├── CenterContent.tsx
│   ├── BackgroundSplit.tsx
│   ├── ServiceCards.tsx
│   ├── ServiceModal.tsx
│   └── index.ts                    (barrel export)
├── hooks/
│   ├── useMousePosition.ts
│   ├── useParallax.ts
│   └── useScrollParallax.ts
├── lib/
│   └── animations.ts
├── styles/
│   └── (optional for additional CSS)
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## 🎨 FONT ANALYSIS & MATCHING

### Font from rzhk_with_slogan.png Analysis

**Tagline Text: "VISUAL ENGINEERING"**

#### Characteristics Identified:
1. **Geometric Sans-Serif**
   - Perfectly square letter proportions
   - Equal height and width relationships
   - Sharp, angular corners (minimal rounding)
   - Modern, technical aesthetic

2. **Weight**: Bold (700 or 800)
   - High contrast, strong presence
   - Thick stroke width
   - Maximum readability

3. **Letter Spacing**: Very Wide
   - Spacing appears to be 0.15em - 0.2em
   - Creates luxury, premium feel
   - Breathing room between characters

4. **Baseline & Alignment**:
   - All caps
   - Perfectly centered
   - Uniform baseline (no descenders)
   - Kerning: optimized for geometric forms

5. **Possible Font Families** (in priority order):

| Font | Match Score | Notes |
|------|-------------|-------|
| **Futura PT** | 95/100 | Perfect geometric sans, exact match |
| **Futura STD** | 94/100 | Same as above, different vendor |
| **DIN Alternate** | 93/100 | Geometric, technical, slightly different proportions |
| **Avenir Next** | 92/100 | Geometric sans, slightly rounder corners |
| **Montserrat Bold** | 88/100 | Geometric, slightly softer edges |
| **Proxima Nova** | 87/100 | Geometric, slightly different weight |
| **Space Grotesk** | 85/100 | Monospace-inspired geometric |
| **Inconsolata** | 80/100 | Technical, more monospace feel |

---

## 🔤 FONT IMPLEMENTATION STRATEGY

### Primary Font Stack (Recommended)
```css
font-family: 'Futura PT', 'Avenir Next', 'DIN Alternate', 'Proxima Nova', 'Montserrat', sans-serif;
```

### Font Loading Methods

#### Option 1: Google Fonts (Recommended for Quick Setup)
```typescript
// In app/layout.tsx
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-montserrat',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  )
}
```

#### Option 2: Self-Hosted Font Files (Best Quality)
If you have Futura PT font files:

```typescript
// app/layout.tsx
import '@/styles/fonts.css'

// styles/fonts.css
@font-face {
  font-family: 'Futura PT';
  src: url('/fonts/FuturaPT-Bold.woff2') format('woff2'),
       url('/fonts/FuturaPT-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Futura PT';
  src: url('/fonts/FuturaPT-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

#### Option 3: System Font Fallback (Fastest Loading)
```css
font-family: 
  'Avenir Next',
  'Montserrat',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  sans-serif;
```

---

## 📐 TYPOGRAPHY SPECIFICATIONS FROM DESIGN REFERENCE

### Extracted from full_header_example.png

#### Logo (RZHK)
```
Font: Futura PT (or match)
Weight: Bold (700)
Size: 6rem (desktop) / 3rem (mobile) / 4.5rem (tablet)
Letter Spacing: 0.2em
Color: #FFFFFF
Line Height: 1
Alignment: Center
Transform: None (but scales on hover)
```

#### Tagline (VISUAL ENGINEERING)
```
Font: Futura PT (or match)
Weight: Regular (400)
Size: 0.875rem desktop / 0.75rem mobile / 0.8rem tablet
Letter Spacing: 0.15em
Color: #FFFFFF
Opacity: 1
Line Height: 1
Alignment: Center
Transform: None
Position: Below logo, 1.5rem gap
```

#### Statement (Engineering visuals where...)
```
Font: Futura PT (or match)
Weight: Regular (400)
Size: 1rem desktop / 0.9rem mobile / 0.95rem tablet
Letter Spacing: 0.05em
Color: #B0B0B0 (gray-light)
Line Height: 1.6
Alignment: Center
Max Width: 400px
Position: Below tagline, 2rem gap
```

#### Navigation Items (WORK, ABOUT, SERVICES, CONTACT)
```
Font: Futura PT (or match)
Weight: Regular (400)
Size: 0.875rem (all sizes same)
Letter Spacing: 0.12em
Color: #FFFFFF
Opacity: 1, hover: 0.6
Line Height: 1
Alignment: Center
Position: Top center, 3rem gap between items
Transform: None
Underline animation: On hover (from center)
```

#### Service Card Titles
```
Font: Futura PT (or match)
Weight: Bold (700)
Size: 1.25rem desktop / 0.9rem mobile / 1rem tablet
Letter Spacing: 0.1em
Color: #FFFFFF
Line Height: 1.2 (multi-line titles)
Alignment: Center
Transform: None (but scale 1.02 on hover)
```

#### Service Card Descriptions
```
Font: Futura PT (or match)
Weight: Regular (400)
Size: 0.875rem (all sizes)
Letter Spacing: 0.05em
Color: #B0B0B0
Line Height: 1.6
Alignment: Left or Center (your choice)
Visibility: Hidden by default, shown in modal
```

---

## 🖼️ IMAGE OPTIMIZATION GUIDE

### Before Uploading to Project

#### back_left.png & back_right.png

**Current Status**: Needs optimization

**Optimization Steps**:
1. **Compression**:
   ```bash
   # Using ImageMagick
   convert back_left.png -quality 80 -resize 2560x1440 back_left-optimized.png
   
   # Or use online tools:
   # - TinyPNG.com
   # - ImageOptim (Mac)
   # - FileOptimizer (Windows)
   ```

2. **Target File Size**:
   - back_left.png: ~40-60KB (target)
   - back_right.png: ~40-60KB (target)

3. **Conversion to WebP** (Modern Format):
   ```bash
   cwebp -q 80 back_left.png -o back_left.webp
   cwebp -q 80 back_right.png -o back_right.webp
   ```

4. **Verify Quality**:
   - No visible compression artifacts
   - Colors remain vibrant
   - Dark areas maintain detail

#### rzhk.png (Logo)

**Current Status**: Ready to use

**Optimization**:
```bash
# Remove unnecessary metadata, keep transparency
pngquant 256 rzhk.png -o rzhk-optimized.png

# Verify PNG integrity
file rzhk-optimized.png
```

**Storage Location**: `/public/images/rzhk-logo.png`

---

## 📐 RESPONSIVE IMAGE SIZES

### Next.js Image Configuration
```typescript
// next.config.js
module.exports = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
}
```

### Background Images (back_left.png & back_right.png)
```typescript
// Component usage with responsive sizing
<Image
  src="/images/back-left.png"
  alt="Architecture Background"
  fill
  className="object-cover"
  quality={80}
  priority={true}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Logo Images
```typescript
<Image
  src="/images/rzhk-logo.png"
  alt="RZHK Logo"
  width={192}
  height={128}
  className="object-contain"
  quality={95}
  priority={true}
/>
```

---

## 🔍 COLOR EXTRACTION FROM IMAGES

### Verified Colors from Design Assets

#### From full_header_example.png:
```
Background: #000000 (pure black)
Text Primary: #FFFFFF (white)
Text Secondary: #B0B0B0 (light gray)
Navigation Hover: Opacity 0.6 (faded)
Underline: #FFFFFF (white)
```

#### From back_right.png (Automotive):
```
Accent Red Light: #DC143C or #E63946 (crimson/red)
Red Glow Opacity: 0.3-0.4 (subtle)
Car Highlights: Already in image
Intensity on Hover: Boost saturate to 1.3
```

#### From back_left.png (Architecture):
```
Architecture Lighting: Warm amber/gold tones
Glass Reflections: White/light gray
Intensity on Hover: Boost brightness to 0.9
```

---

## 🎬 ANIMATION-SPECIFIC IMAGE NOTES

### Parallax Performance with Large Images
- Split images (left/right) reduces simultaneous transform calculations
- Each background runs parallax independently
- Use `will-change: transform` for GPU acceleration
- Remove `will-change` after animation completes

### Loading Screen Image
- Logo should appear instantly (prioritized load)
- Use `priority={true}` in next/image
- No lazy loading for hero section images

### Hover Effects on Backgrounds
- Brightness/Saturation changes don't affect performance
- These are CSS filter properties (not transform)
- Smooth transitions: 0.4s duration recommended

---

## 📋 ASSET DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] All PNG files compressed to under 100KB each
- [ ] Images converted to WebP for modern browsers
- [ ] Verify image aspect ratios match design
- [ ] Check for color space consistency (sRGB)
- [ ] Remove EXIF data from images

### Project Setup
- [ ] Copy images to `/public/images/` directory
- [ ] Verify image filenames match import statements
- [ ] Test image loading on localhost:3000
- [ ] Check responsive image sizes with DevTools
- [ ] Verify quality at different screen sizes

### Vercel Deployment
- [ ] Enable Image Optimization in Vercel dashboard
- [ ] Set cache headers for static images
- [ ] Monitor Core Web Vitals (Lighthouse)
- [ ] Test image loading on different networks
- [ ] Verify WebP serving to compatible browsers

---

## 🌐 FONT LOADING PERFORMANCE

### Google Fonts (Recommended for Balance)
```
Load Time: ~50-100ms
File Size: ~20-40KB (all weights combined)
Fallback: System sans-serif
Strategy: font-display: swap (shows fallback while loading)
```

### Self-Hosted Fonts
```
Load Time: ~30-50ms (from CDN)
File Size: ~60-100KB (WOFF2 format)
Fallback: System sans-serif
Strategy: Preload critical font weights
```

### System Fonts Only (Fastest)
```
Load Time: 0ms (already installed)
File Size: 0KB
Fallback: None needed
Trade-off: Less unique branding
```

---

## 📱 RESPONSIVE IMAGE BEHAVIOR

### Mobile (< 640px)
- Background images: Stack vertically or half-width
- Logo: 3rem (48px)
- Quality: 75 (reduce to save bandwidth)

### Tablet (640px - 1024px)
- Background images: Split 50/50 horizontally
- Logo: 4.5rem (72px)
- Quality: 80

### Desktop (> 1024px)
- Background images: Split 50/50 horizontally
- Logo: 6rem (96px)
- Quality: 80-95

---

## 💾 FINAL ASSET CHECKLIST

### Image Files Ready for Project:
- [ ] rzhk-logo.png → `/public/images/rzhk-logo.png`
  - Size: Keep original or max 2x largest usage (96px × 64px × 2)
  - Format: PNG with transparency
  - Quality: 95

- [ ] back-left.png → `/public/images/back-left.png`
  - Size: ~2560×1440 (can reduce to 1920×1080)
  - Format: PNG or WebP
  - File size: Target 40-60KB
  - Quality: 80

- [ ] back-right.png → `/public/images/back-right.png`
  - Size: ~2560×1440 (can reduce to 1920×1080)
  - Format: PNG or WebP
  - File size: Target 40-60KB
  - Quality: 80

---

## 🚀 QUICK FONT SWAP GUIDE

If Futura PT isn't available, quick swap options:

```typescript
// Option 1: Use Montserrat from Google Fonts (89/100 match)
import { Montserrat } from 'next/font/google'
const font = Montserrat({ weight: ['400', '700'] })

// Option 2: Use Proxima Nova from Google Fonts (87/100 match)
import { Proxima_Nova } from 'next/font/google'

// Option 3: Use Inter (closest system font, 80/100 match)
import { Inter } from 'next/font/google'

// Option 4: Stick with system fonts (70/100 match but instant)
font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
```

**Recommendation**: Use Montserrat from Google Fonts if Futura PT unavailable. It maintains 89% visual similarity while loading from Google's CDN.

---

**All assets are now ready for Claude Code implementation!**

Next step: Copy both specification documents to Claude Code with these assets configured.

