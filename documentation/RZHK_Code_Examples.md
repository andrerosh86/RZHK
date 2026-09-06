# RZHK WEBSITE - CODE IMPLEMENTATION EXAMPLES
## Copy-Paste Ready Code Snippets for Claude Code

---

## 🔧 SETUP CONFIGURATION

### 1. tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        gray: {
          light: '#B0B0B0',
          medium: '#808080',
          dark: '#333333',
        },
        accent: {
          red: '#DC143C',
          redLight: 'rgba(220, 20, 60, 0.3)',
        },
      },
      fontFamily: {
        sans: [
          'Futura PT',
          'Avenir Next',
          'DIN Alternate',
          'Proxima Nova',
          'Montserrat',
          'sans-serif',
        ],
      },
      letterSpacing: {
        tighter: '0.03em',
        tight: '0.05em',
        normal: '0.1em',
        wide: '0.12em',
        wider: '0.15em',
        widest: '0.2em',
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.25rem',
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem',
        '4xl': '4.5rem',
        '5xl': '6rem',
      },
      backdropFilter: {
        blur: 'blur(10px)',
      },
    },
  },
  plugins: [],
}

export default config
```

### 2. globals.css
```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap');

:root {
  --color-black: #000000;
  --color-white: #FFFFFF;
  --color-gray-light: #B0B0B0;
  --color-gray-medium: #808080;
  --color-gray-dark: #333333;
  --color-accent-red: #DC143C;
  --color-accent-red-light: rgba(220, 20, 60, 0.3);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  background-color: var(--color-black);
  color: var(--color-white);
  font-family: 'Futura PT', 'Avenir Next', 'DIN Alternate', 'Proxima Nova', 'Montserrat', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  overflow-x: hidden;
}

html {
  scroll-behavior: smooth;
}

button,
a {
  transition: all 0.3s ease;
}

button:focus,
a:focus {
  outline: 2px solid var(--color-gray-light);
  outline-offset: 2px;
}

/* Remove default scroll bar styling for custom themes */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--color-gray-medium);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-gray-light);
}
```

---

## 📦 CUSTOM HOOKS

### 3. useMousePosition.ts
```typescript
'use client'

import { useState, useEffect } from 'react'

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return mousePosition
}
```

### 4. useParallax.ts
```typescript
'use client'

import { useMotionValue, useTransform } from 'framer-motion'
import { useMousePosition } from './useMousePosition'
import { useEffect } from 'react'

interface ParallaxConfig {
  intensity?: number // 0-1, how much the element moves
  invertX?: boolean
  invertY?: boolean
}

export const useParallax = (config: ParallaxConfig = {}) => {
  const { intensity = 1, invertX = false, invertY = false } = config
  const { x, y } = useMousePosition()

  const xOffset = useMotionValue(0)
  const yOffset = useMotionValue(0)

  useEffect(() => {
    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0
    const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0

    const calcX = (x - centerX) * 0.02 * intensity * (invertX ? -1 : 1)
    const calcY = (y - centerY) * 0.02 * intensity * (invertY ? -1 : 1)

    xOffset.set(calcX)
    yOffset.set(calcY)
  }, [x, y, intensity, invertX, invertY, xOffset, yOffset])

  return { x: xOffset, y: yOffset }
}
```

### 5. useScrollParallax.ts
```typescript
'use client'

import { useScroll, useTransform, MotionValue } from 'framer-motion'
import { useRef } from 'react'

interface ScrollParallaxConfig {
  offset?: number // parallax intensity (0.2 - 0.5 typical)
  direction?: 'up' | 'down'
}

export const useScrollParallax = (
  config: ScrollParallaxConfig = {}
): MotionValue<number> => {
  const { offset = 0.3, direction = 'down' } = config
  const ref = useRef(null)
  const { scrollY } = useScroll()

  const multiplier = direction === 'up' ? -1 : 1

  return useTransform(scrollY, (value) => value * offset * multiplier)
}
```

---

## 🎬 ANIMATION CONSTANTS

### 6. animations.ts
```typescript
export const ANIMATION_DURATIONS = {
  LOADING_SCREEN: 3000,
  LOADING_LETTER: 200,
  GLITCH_EFFECT: 50,
  MODAL_OPEN: 400,
  MODAL_CLOSE: 300,
  PARALLAX_FOLLOW: 400,
  PAGE_LOAD: 600,
  HOVER_EFFECT: 300,
  STAGGER_OFFSET: 80,
}

export const EASE_FUNCTIONS = {
  easeOut: [0.25, 0.46, 0.45, 0.94] as const,
  easeInOut: [0.43, 0.13, 0.23, 0.96] as const,
  easeIn: [0.32, 0, 0.67, 0] as const,
  linear: [0, 0, 1, 1] as const,
}

export const PARALLAX_INTENSITIES = {
  BACKGROUND: 0.3,
  LOGO: 0.05,
  CONTENT: 0.15,
}

export const LOADING_LETTER_TIMING = [
  { letter: 'R', start: 0, duration: 200 },
  { letter: 'Z', start: 150, duration: 200 },
  { letter: 'H', start: 300, duration: 200 },
  { letter: 'K', start: 450, duration: 200 },
]

export const GLITCH_EFFECT_TIMING = [
  { time: 800, duration: 50, offset: 2 },
  { time: 850, duration: 50, offset: -2 },
  { time: 900, duration: 50, offset: 1 },
  { time: 950, duration: 50, offset: -1 },
]

export const COLOR_PALETTE = {
  background: '#000000',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  textTertiary: '#808080',
  accentRed: '#DC143C',
  accentRedLight: 'rgba(220, 20, 60, 0.3)',
  overlayDark: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.5)',
  border: '#333333',
}
```

---

## 🎨 MAIN COMPONENTS

### 7. LoadingScreen.tsx
```typescript
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface LoadingScreenProps {
  onComplete: () => void
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) return null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.5 },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
  }

  const taglineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.2,
        duration: 1,
        ease: 'easeOut',
      },
    },
  }

  const glitchVariants = {
    hidden: { x: 0 },
    glitch: {
      x: [0, 2, -2, 1, -1, 0],
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex flex-col items-center">
        {/* Logo with animated letters */}
        <div className="relative h-24 md:h-32">
          <motion.div
            className="flex gap-4 md:gap-6 text-6xl md:text-7xl font-bold tracking-widest"
            variants={glitchVariants}
            initial="hidden"
            animate="glitch"
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            {/* Using Image as fallback, but ideally use SVG for animated strokes */}
            <motion.span
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0 }}
            >
              R
            </motion.span>
            <motion.span
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
            >
              Z
            </motion.span>
            <motion.span
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              H
            </motion.span>
            <motion.span
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.45 }}
            >
              K
            </motion.span>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          className="text-xs md:text-sm uppercase tracking-widest mt-6 md:mt-8 text-white"
          variants={taglineVariants}
          initial="hidden"
          animate="visible"
        >
          VISUAL ENGINEERING
        </motion.p>
      </div>
    </motion.div>
  )
}
```

### 8. BackgroundSplit.tsx
```typescript
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useState } from 'react'
import { PARALLAX_INTENSITIES } from '@/lib/animations'

export const BackgroundSplit: React.FC = () => {
  const mousePosition = useMousePosition()
  const [leftHover, setLeftHover] = useState(false)
  const [rightHover, setRightHover] = useState(false)

  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0

  const offsetX = (mousePosition.x - centerX) * 0.02 * PARALLAX_INTENSITIES.BACKGROUND
  const offsetY = (mousePosition.y - centerY) * 0.02 * PARALLAX_INTENSITIES.BACKGROUND

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Left Background - Architecture */}
      <motion.div
        className="absolute left-0 top-0 w-1/2 h-full overflow-hidden"
        initial={{ x: 0, y: 0 }}
        animate={{ x: offsetX * 0.3, y: offsetY * 0.3 }}
        transition={{ type: 'tween', ease: 'linear' }}
        onMouseEnter={() => setLeftHover(true)}
        onMouseLeave={() => setLeftHover(false)}
      >
        <motion.div
          className="w-full h-full"
          animate={{
            brightness: leftHover ? 0.9 : 0.8,
            saturate: leftHover ? 1.1 : 1,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Image
            src="/images/back-left.png"
            alt="Architecture Background"
            fill
            className="object-cover"
            quality={80}
            priority={true}
          />
        </motion.div>
      </motion.div>

      {/* Right Background - Automotive */}
      <motion.div
        className="absolute right-0 top-0 w-1/2 h-full overflow-hidden"
        initial={{ x: 0, y: 0 }}
        animate={{ x: -offsetX * 0.3, y: offsetY * 0.3 }}
        transition={{ type: 'tween', ease: 'linear' }}
        onMouseEnter={() => setRightHover(true)}
        onMouseLeave={() => setRightHover(false)}
      >
        <motion.div
          className="w-full h-full"
          animate={{
            brightness: rightHover ? 0.85 : 0.8,
            saturate: rightHover ? 1.3 : 1.2,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Image
            src="/images/back-right.png"
            alt="Automotive Background"
            fill
            className="object-cover"
            quality={80}
            priority={true}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
```

### 9. Navigation.tsx
```typescript
'use client'

import { motion } from 'framer-motion'

const NAV_ITEMS = ['WORK', 'ABOUT', 'SERVICES', 'CONTACT']

export const Navigation: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.nav
      className="absolute top-8 left-1/2 transform -translate-x-1/2 z-40"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex gap-12 text-sm uppercase tracking-wide">
        {NAV_ITEMS.map((item) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="relative group text-white hover:text-gray-light transition-colors duration-300"
            variants={itemVariants}
          >
            {item}
            {/* Underline animation from center */}
            <motion.div
              className="absolute bottom-0 left-1/2 h-px bg-white"
              initial={{ width: 0, x: '-50%' }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        ))}
      </div>
    </motion.nav>
  )
}
```

### 10. CenterContent.tsx
```typescript
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useMousePosition } from '@/hooks/useMousePosition'
import { PARALLAX_INTENSITIES } from '@/lib/animations'
import { useState } from 'react'

export const CenterContent: React.FC = () => {
  const mousePosition = useMousePosition()
  const [logoHover, setLogoHover] = useState(false)

  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0

  const offsetX = (mousePosition.x - centerX) * 0.02 * PARALLAX_INTENSITIES.LOGO
  const offsetY = (mousePosition.y - centerY) * 0.02 * PARALLAX_INTENSITIES.LOGO

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo */}
      <motion.div
        className="mb-6 md:mb-8 cursor-pointer"
        animate={{ x: offsetX, y: offsetY }}
        transition={{ type: 'tween', ease: 'linear' }}
        onMouseEnter={() => setLogoHover(true)}
        onMouseLeave={() => setLogoHover(false)}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          animate={{
            boxShadow: logoHover
              ? '0 0 40px rgba(255, 255, 255, 0.15)'
              : '0 0 0px rgba(255, 255, 255, 0)',
          }}
          transition={{ duration: 0.3 }}
          className="relative w-32 h-20 md:w-48 md:h-32"
        >
          <Image
            src="/images/rzhk-logo.png"
            alt="RZHK Logo"
            fill
            className="object-contain drop-shadow-sm"
            quality={95}
            priority={true}
          />
        </motion.div>
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="text-xs md:text-sm uppercase tracking-widest text-white mb-6 md:mb-8"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.15 }}
      >
        VISUAL ENGINEERING
      </motion.p>

      {/* Statement */}
      <motion.p
        className="text-base md:text-lg text-gray-light max-w-xs md:max-w-md text-center leading-relaxed px-4"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        Engineering visuals where precision meets emotion.
      </motion.p>

      {/* CTA Button (Optional) */}
      <motion.a
        href="#work"
        className="mt-8 px-8 py-3 border border-white text-white text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-400"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.45 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        VIEW WORK
      </motion.a>
    </motion.div>
  )
}
```

### 11. ServiceCards.tsx
```typescript
'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ServiceModal } from './ServiceModal'

const SERVICES = [
  {
    id: 1,
    title: 'ARCHITECTURAL VISUALIZATION',
    description: 'Designing spaces before they exist. Precision-driven imagery for architecture, interiors, and real estate.',
  },
  {
    id: 2,
    title: 'AUTOMOTIVE CINEMATICS',
    description: 'Capturing performance through light and motion. High-end visuals focused on emotion, speed, and detail.',
  },
  {
    id: 3,
    title: 'VISUAL STORYTELLING',
    description: 'Crafting narratives through composition, timing, and atmosphere. Every frame serves a purpose.',
  },
  {
    id: 4,
    title: 'TECHNICAL DIRECTION',
    description: 'Bridging creativity and execution. Optimizing pipelines, realism, and production workflows.',
  },
  {
    id: 5,
    title: 'VISUAL ENGINEERING',
    description: 'Where art direction meets technical precision. Building controlled visual systems for consistent, high-end output.',
  },
]

export const ServiceCards: React.FC = () => {
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.3,
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <>
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <motion.div
          className="flex flex-col md:flex-row justify-around gap-4 md:gap-1 px-4 md:px-8 py-6 md:py-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {SERVICES.map((service, index) => (
            <motion.button
              key={service.id}
              className="flex-1 text-center py-4 px-3 hover:bg-white hover:bg-opacity-5 border-r border-white border-opacity-20 last:border-r-0 transition-all duration-300 group cursor-pointer"
              variants={itemVariants}
              onClick={() => setSelectedService(service)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-xs md:text-sm font-bold uppercase tracking-tight leading-tight group-hover:text-white transition-colors duration-300">
                {service.title}
              </div>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  )
}
```

### 12. ServiceModal.tsx
```typescript
'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface Service {
  id: number
  title: string
  description: string
}

interface ServiceModalProps {
  service: Service
  onClose: () => void
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      y: 20,
      transition: { duration: 0.3 },
    },
  }

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.2, duration: 0.4 },
    },
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className="bg-black border border-gray-dark rounded-sm p-8 max-w-2xl w-11/12 relative"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            className="absolute top-6 right-6 text-gray-light hover:text-white transition-colors duration-300"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>

          {/* Content */}
          <motion.div variants={contentVariants} initial="hidden" animate="visible">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-6">
              {service.title}
            </h2>
            <p className="text-base text-gray-light leading-relaxed mb-6">
              {service.description}
            </p>
            <motion.a
              href="#contact"
              className="inline-block px-6 py-3 border border-white text-white text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
            >
              LEARN MORE
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
```

### 13. page.tsx (Main Landing Page)
```typescript
'use client'

import { useState } from 'react'
import { LoadingScreen } from '@/components/LoadingScreen'
import { BackgroundSplit } from '@/components/BackgroundSplit'
import { Navigation } from '@/components/Navigation'
import { CenterContent } from '@/components/CenterContent'
import { ServiceCards } from '@/components/ServiceCards'

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false)

  return (
    <main className="w-full h-screen bg-black overflow-hidden relative">
      {/* Loading Screen */}
      {!loadingComplete && (
        <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      )}

      {/* Hero Section */}
      <div className="relative w-full h-screen">
        {/* Background Split with Parallax */}
        <BackgroundSplit />

        {/* Navigation */}
        <Navigation />

        {/* Center Content */}
        <CenterContent />

        {/* Service Cards */}
        <ServiceCards />
      </div>

      {/* Footer (Optional) */}
      <footer className="fixed bottom-4 left-4 right-4 z-20 text-center">
        <p className="text-xs text-gray-medium">
          © RZHK VISUAL ENGINEERING | {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  )
}
```

---

## 📱 RESPONSIVE TAILWIND UTILITIES

### 14. Responsive Classes Reference
```typescript
// Mobile-first approach (default = mobile)
<div className="
  // Mobile (< 640px)
  text-3xl gap-4 px-4 py-6
  
  // Tablet (640px+)
  md:text-4xl md:gap-6 md:px-8 md:py-8
  
  // Desktop (1024px+)
  lg:text-5xl lg:gap-8 lg:px-12 lg:py-10
">
  Content
</div>

// Example with dynamic opacity
<button className="opacity-100 hover:opacity-60 transition-opacity duration-300" />

// Parallax container
<div className="absolute inset-0 overflow-hidden" />

// Flex center
<div className="flex items-center justify-center" />
```

---

## 🚀 DEPLOYMENT (next.config.js)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
```

---

## 📋 IMPLEMENTATION CHECKLIST

- [ ] Install dependencies: `npm install framer-motion gsap`
- [ ] Copy all files to respective directories
- [ ] Add images to `/public/images/`
- [ ] Configure Tailwind config.ts
- [ ] Add globals.css styles
- [ ] Test loading screen animation
- [ ] Test parallax on mouse move
- [ ] Test parallax on scroll
- [ ] Test service card modal open/close
- [ ] Test responsive breakpoints
- [ ] Verify performance (60fps)
- [ ] Deploy to Vercel

---

## 💡 TROUBLESHOOTING

### Parallax Feels Jittery
→ Add `transition={{ type: 'tween', ease: 'linear' }}` to motion elements

### Images Blurry
→ Ensure `quality={80}` or higher in next/image
→ Use WebP format for better compression

### Modal Not Closing on Click
→ Add `onClick={(e) => e.stopPropagation()}` to modal content

### Performance Issues
→ Use Lighthouse DevTools
→ Check for layout shifts (use `size` attribute on images)
→ Reduce number of simultaneous animations

---

**Ready to paste into Claude Code!** Follow the structure and component order for best results.

