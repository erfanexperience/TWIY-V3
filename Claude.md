# TWIY Health — Landing Page Build

## Project Context

I'm building a production landing page for TWIY Health, a specialized 
surgical distribution firm focused exclusively on foot and ankle solutions 
across the Southeastern United States. They represent leading technologies 
from Medline, OSSIO, BoneSupport, Acera Surgical, and Biopoly.

Target audience: foot and ankle surgeons, ASC (ambulatory surgical center) 
networks, hospital administrators, and manufacturer partners.

Brand tone: premium, clinical, trustworthy, precise, confident, 
cinematic. Reminiscent of Stryker, Arthrex, Medtronic, and Johnson & 
Johnson MedTech brand films — NOT generic medical stock imagery.

## Design Skill Setup

Before building anything, install and use the taste-skill for design 
quality:

1. Check if the taste-skill is already installed
2. If not, install it from: https://github.com/Leonxlnx/taste-skill
3. Read the skill's documentation and apply its design principles 
   throughout the entire build

Every design decision — typography, spacing, color, motion, hierarchy 
— must go through the taste-skill lens. This is a premium medical 
brand, not a generic SaaS site.

## Assets Available

All assets are in the `Assets/` folder (already prepared):

- `Assets/Hero-Image.webp` — dark cinematic background for hero section
- `Assets/Hero-Video.mp4` — scroll-expand hero video (titanium implant 
  on foot skeleton, dark background)
- `Assets/logo.png` — TWIY Health logo
- `Assets/2.webp` — medical rep walking toward OR doors (for "Surgical 
  Distribution" section)
- `Assets/3b.webp` — soft-focus titanium hardware (for Biologics card)
- `Assets/4.webp` — skeletal foot & ankle X-ray (for Tech Expertise 
  section)
- `Assets/5a.webp` — satellite view of Southeast US at night (for 
  Territory Development card)
- `Assets/7.webp` — hospital exterior at blue hour (for Final CTA 
  section)

## Tech Stack

- Next.js 15 (App Router) with TypeScript
- Tailwind CSS v4
- shadcn/ui components where appropriate
- Framer Motion for scroll-driven animations
- Lucide React for icons
- Responsive mobile-first design

## Brand System

### Colors (derive exact values from taste-skill guidance, but target these roles):
- Primary background: deep charcoal-to-near-black (#0A0E1A range)
- Secondary background: muted midnight navy
- Accent: cool cyan-blue for highlights and CTAs
- Text primary: off-white / bone-ivory
- Text secondary: muted cool grey
- Borders/dividers: very subtle cool-grey at low opacity

### Typography:
- Headings: modern sans-serif, editorial feel (e.g., Inter, Satoshi, 
  or similar — use taste-skill recommendations)
- Body: highly readable sans-serif
- Generous line-height, confident letter-spacing on headings
- Large, premium type scale — not cramped

### Spacing:
- Generous vertical rhythm between sections (min 120px desktop, 
  80px mobile)
- Max content width: ~1280px centered
- Comfortable padding inside cards and sections

## PAGE STRUCTURE

### 1. Navigation (sticky, minimal)
- Logo on left (`Assets/logo.png`)
- Center: minimal nav links — "Services", "About Us"
- Right: "Book Consultation" primary CTA button
- Transparent over hero, becomes deep charcoal with subtle border 
  after scroll
- Mobile: hamburger menu

### 2. HERO SECTION — Scroll-Expand Video
Use this component for entire Hero Section:
You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
scroll-expansion-hero.tsx
'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        // Increase sensitivity for mobile, especially when scrolling back
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005; // Higher sensitivity for scrolling back
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel as unknown as EventListener, {
      passive: false,
    });
    window.addEventListener('scroll', handleScroll as EventListener);
    window.addEventListener(
      'touchstart',
      handleTouchStart as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener(
      'touchmove',
      handleTouchMove as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener('touchend', handleTouchEnd as EventListener);

    return () => {
      window.removeEventListener(
        'wheel',
        handleWheel as unknown as EventListener
      );
      window.removeEventListener('scroll', handleScroll as EventListener);
      window.removeEventListener(
        'touchstart',
        handleTouchStart as unknown as EventListener
      );
      window.removeEventListener(
        'touchmove',
        handleTouchMove as unknown as EventListener
      );
      window.removeEventListener('touchend', handleTouchEnd as EventListener);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div
      ref={sectionRef}
      className='transition-colors duration-700 ease-in-out overflow-x-hidden'
    >
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          <motion.div
            className='absolute inset-0 z-0 h-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt='Background'
              width={1920}
              height={1080}
              className='w-screen h-screen'
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              priority
            />
            <div className='absolute inset-0 bg-black/10' />
          </motion.div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
              <div
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl'
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                }}
              >
                {mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') ? (
                    <div className='relative w-full h-full pointer-events-none'>
                      <iframe
                        width='100%'
                        height='100%'
                        src={
                          mediaSrc.includes('embed')
                            ? mediaSrc +
                              (mediaSrc.includes('?') ? '&' : '?') +
                              'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                            : mediaSrc.replace('watch?v=', 'embed/') +
                              '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                              mediaSrc.split('v=')[1]
                        }
                        className='w-full h-full rounded-xl'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      />
                      <div
                        className='absolute inset-0 z-10'
                        style={{ pointerEvents: 'none' }}
                      ></div>

                      <motion.div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <div className='relative w-full h-full pointer-events-none'>
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload='auto'
                        className='w-full h-full object-cover rounded-xl'
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div
                        className='absolute inset-0 z-10'
                        style={{ pointerEvents: 'none' }}
                      ></div>

                      <motion.div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  )
                ) : (
                  <div className='relative w-full h-full'>
                    <Image
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      width={1280}
                      height={720}
                      className='w-full h-full object-cover rounded-xl'
                    />

                    <motion.div
                      className='absolute inset-0 bg-black/50 rounded-xl'
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className='flex flex-col items-center text-center relative z-10 mt-4 transition-none'>
                  {date && (
                    <p
                      className='text-2xl text-blue-200'
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className='text-blue-200 font-medium text-center'
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                <motion.h2
                  className='text-4xl md:text-5xl lg:text-6xl font-bold text-blue-200 transition-none'
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className='text-4xl md:text-5xl lg:text-6xl font-bold text-center text-blue-200 transition-none'
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

            <motion.section
              className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20'
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;


demo.tsx
'use client';

import { useState, useEffect } from 'react';
import ScrollExpandMedia from '@/components/blocks/scroll-expansion-hero';

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContent {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

interface MediaContentCollection {
  [key: string]: MediaContent;
}

const sampleMediaContent: MediaContentCollection = {
  video: {
    src: 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1',
    poster:
      'https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg',
    background:
      'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYMNjMlBUYHaeYpxduXPVNwf8mnFA61L7rkcoS',
    title: 'Immersive Video Experience',
    date: 'Cosmic Journey',
    scrollToExpand: 'Scroll to Expand Demo',
    about: {
      overview:
        'This is a demonstration of the ScrollExpandMedia component with a video. As you scroll, the video expands to fill more of the screen, creating an immersive experience. This component is perfect for showcasing video content in a modern, interactive way.',
      conclusion:
        'The ScrollExpandMedia component provides a unique way to engage users with your content through interactive scrolling. Try switching between video and image modes to see different implementations.',
    },
  },
  image: {
    src: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=1280&auto=format&fit=crop',
    background:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop',
    title: 'Dynamic Image Showcase',
    date: 'Underwater Adventure',
    scrollToExpand: 'Scroll to Expand Demo',
    about: {
      overview:
        'This is a demonstration of the ScrollExpandMedia component with an image. The same smooth expansion effect works beautifully with static images, allowing you to create engaging visual experiences without video content.',
      conclusion:
        'The ScrollExpandMedia component works equally well with images and videos. This flexibility allows you to choose the media type that best suits your content while maintaining the same engaging user experience.',
    },
  },
};

const MediaContent = ({ mediaType }: { mediaType: 'video' | 'image' }) => {
  const currentMedia = sampleMediaContent[mediaType];

  return (
    <div className='max-w-4xl mx-auto'>
      <h2 className='text-3xl font-bold mb-6 text-black dark:text-white'>
        About This Component
      </h2>
      <p className='text-lg mb-8 text-black dark:text-white'>
        {currentMedia.about.overview}
      </p>

      <p className='text-lg mb-8 text-black dark:text-white'>
        {currentMedia.about.conclusion}
      </p>
    </div>
  );
};

export const VideoExpansionTextBlend = () => {
  const mediaType = 'video';
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const ImageExpansionTextBlend = () => {
  const mediaType = 'image';
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const VideoExpansion = () => {
  const mediaType = 'video';
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const ImageExpansion = () => {
  const mediaType = 'image';
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

const Demo = () => {
  const [mediaType, setMediaType] = useState('video');
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, [mediaType]);

  return (
    <div className='min-h-screen'>
      <div className='fixed top-4 right-4 z-50 flex gap-2'>
        <button
          onClick={() => setMediaType('video')}
          className={`px-4 py-2 rounded-lg ${
            mediaType === 'video'
              ? 'bg-white text-black'
              : 'bg-black/50 text-white border border-white/30'
          }`}
        >
          Video
        </button>

        <button
          onClick={() => setMediaType('image')}
          className={`px-4 py-2 rounded-lg ${
            mediaType === 'image'
              ? 'bg-white text-black'
              : 'bg-black/50 text-white border border-white/30'
          }`}
        >
          Image
        </button>
      </div>

      <ScrollExpandMedia
        mediaType={mediaType as 'video' | 'image'}
        mediaSrc={currentMedia.src}
        posterSrc={mediaType === 'video' ? currentMedia.poster : undefined}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType as 'video' | 'image'} />
      </ScrollExpandMedia>
    </div>
  );
};

export default Demo;

```

Install NPM dependencies:
```bash
framer-motion
```


Reference component behavior:
- Background: use `Assets/Hero-Image.webp` as the section background 
- Foreground video: use `Assets/Hero-Video.mp4` as the expanding 
  centered video
- Video must autoplay, loop, muted, playsinline
- Replace any template heading with:
  - Small uppercase eyebrow text: "TWIY HEALTH"
  - Main headline: "The Regional Leader in Foot & Ankle Surgical 
    Distribution"
  - Subheadline: "Delivering advanced biologics and fixation 
    technologies across the Southeast with precision, reliability, 
    and unmatched case support."
- Text should fade/blend with the video behavior as designed in the 
  original 21st.dev component — do not break the scroll-expand 
  interaction

### 3. COMPANY INTRO — "Surgical Distribution, Built for the Southeast"
Two-column layout (image left, content right on desktop; stacked on 
mobile).

- Left column: `Assets/2.webp` with soft rounded corners, subtle 
  shadow
- Right column:
  - Eyebrow: "WHO WE ARE — BUILT FOR THE SOUTHEAST"
  - Headline: "Surgical Distribution, Built for the Southeast"
  - Body: "We are a specialized surgical distribution firm focused 
    exclusively on foot and ankle solutions throughout the Southeast 
    region. Representing leading technologies from Medline, OSSIO, 
    BoneSupport, Acera Surgical, and Biopoly, we provide comprehensive 
    surgical support — from pre-case planning and logistics 
    coordination to in-room execution and post-case follow-through."
  - Body continued: "Our model is built for scalability, 
    accountability, and long-term manufacturer growth."

### 4. SERVICES — "Comprehensive Surgical Support, Built for Scale"
Dark section (deep charcoal background). 4-card grid (2x2 on desktop, 
stacked on mobile). Use Lucide icons, not images.

Section header:
- Eyebrow: "OUR SERVICES"
- Headline: "Comprehensive Surgical Support, Built for Scale"
- Subhead: "Our focus is intent precision, urgency, and long-term value 
  for the cases we support — from pre-operative planning and logistics 
  coordination to in-room execution and post-case follow-through across 
  the Southeast."

4 service cards (icon-based, no images):

1. **Surgical Case Coverage** (icon: `Stethoscope` or `Activity`)
   "Delivering in-room case support to ensure precise, dependable 
   execution for every procedure — from pre-case prep to post-case 
   follow-through."

2. **Biologics & Fixation Solutions** (icon: `Bone` or `Layers`)
   "Advanced biologics and fixation technologies from Medline, OSSIO, 
   BoneSupport, Acera Surgical, and Biopoly — matched precisely to 
   each case."

3. **Inventory & Logistics Management** (icon: `Package` or `Truck`)
   "Standardized case protocols, inventory tracking systems, and 
   on-time delivery coordination designed for high-volume surgical 
   environments."

4. **Surgeon Education & Clinical Support** (icon: `GraduationCap` or 
   `BookOpen`)
   "Ongoing surgical technique and clinical education support for 
   surgeons adopting new technologies, ensuring confident outcomes."

Card style: deep charcoal background, subtle cool-grey border, icon 
in cool cyan-blue at top, bold card title, body copy in muted text, 
subtle hover state (slight lift + border glow).

### 5. TECHNOLOGY EXPERTISE — "Advanced Foot & Ankle Technology Expertise"
Two-column layout (content left, image right on desktop).

- Left column:
  - Eyebrow: "WHAT WE DELIVER — TECHNOLOGY"
  - Headline: "Advanced Foot & Ankle Technology Expertise"
  - Body: "We are building a high-performance surgical distribution 
    platform designed to scale across multiple territories while 
    maintaining boutique-level service and OR presence."
  - Body: "Our focus is long-term growth, surgeon loyalty, and 
    measurable revenue expansion for our manufacturing partners. 
    With fully-integrated case support, transparent performance 
    analytics, and direct alignment to surgeon needs, we consistently 
    deliver on our promise."
  - Bullet points with checkmark icons:
    - "Transparent reporting and territory performance analytics"
    - "Structured growth strategy aligned with manufacturer partners"
    - "Boutique-level service and OR presence across the Southeast"

- Right column: `Assets/4.webp` (the foot X-ray) with soft treatment, 
  fits naturally in the dark aesthetic

### 6. GROWTH DISCIPLINE — "Structured Expansion with Measurable Operating Discipline"
Section header:
- Eyebrow: "GROWTH STRATEGY"
- Headline: "Structured Expansion with Measurable Operating 
  Discipline"
- Subhead: "Our growth model combines territory development, surgeon 
  alignment, operational discipline, and reliable execution — built 
  to scale across the Southeast while maintaining accountability to 
  every manufacturer partner."

4-card grid (2x2 desktop, stacked mobile). Mix of image cards and 
typography cards for visual rhythm.

1. **Southeast Territory Development** (image card using 
   `Assets/5a.webp`)
   "Structured expansion into high-volume foot and ankle markets 
   throughout the Southeast — prioritizing surgeons and ASCs with 
   demonstrated clinical excellence."

2. **Biologics & Fixation Portfolio** (image card using 
   `Assets/3b.webp`)
   "A curated portfolio of advanced biologics, regenerative matrices, 
   and fixation technologies — matched to each surgeon's clinical 
   philosophy and case mix."

3. **Operational Infrastructure & Reporting** (typography card — big 
   stat or strong title treatment, no image)
   "Standardized case protocols, real-time inventory tracking, and 
   transparent performance analytics — giving our manufacturer 
   partners complete visibility into territory performance."
   Small visual element: a subtle cool-cyan hairline chart icon or 
   abstract data indicator

4. **Partnership Model & Surgeon Alignment** (typography card — no 
   image)
   "Targeted onboarding of high-performing surgeons and ASC networks, 
   with quarterly growth strategy meetings and transparent reporting 
   aligned to long-term manufacturer success."
   Small visual element: subtle cool-cyan icon (e.g., `Users` or 
   `Handshake`)

### 7. EXECUTION QUALITY — "Execution Quality You Can Trust in Every Case"
Dark section, centered content, no image. Pure typography-driven.

- Eyebrow: "WHY TWIY"
- Headline: "Execution Quality You Can Trust in Every Case"
- Subhead: "We operate as a trusted in-OR and field-level distribution 
  partner to the surgeons, ASCs, and hospital systems we support. 
  Every case, every surgeon, every time."

3 stacked reason blocks with icons and text:

1. **Trusted In-Room Case Support** (icon: `CheckCircle2`)
   "Complete in-room presence across the discipline from pre-case 
   planning through to in-room support and follow-through."

2. **Reliability Under Surgical Demands** (icon: `Shield`)
   "A dependable surgical distribution partner who shows up ready, 
   case after case, surgeon after surgeon."

3. **Urgency with Clinical Precision** (icon: `Zap`)
   "Responsive delivery, precise OR-level execution, and the 
   calibrated urgency that surgeons demand."

### 8. FINAL CTA — "Partner with the Southeast's Focused Foot & Ankle Distribution Team"
Full-bleed section using `Assets/7.webp` as background image with a 
dark overlay (60-70% black gradient) for text legibility.

- Centered content:
  - Small uppercase eyebrow: "READY TO PARTNER?"
  - Large headline: "Partner with the Southeast's Focused Foot & Ankle 
    Distribution Team"
  - Subhead: "Built for long-term manufacturer growth, surgeon loyalty, 
    and measurable territory performance — across the Southeast."
  - Primary CTA button: "Book Consultation"
  - Secondary text link: "(754) 231-1006" (clickable tel: link)

### 9. FOOTER
Deep near-black background.

- Left column: TWIY logo + tagline: "Driving surgical growth across 
  the Southeast."
- Middle column: NAVIGATION heading + links: Services, About Us, Book 
  Consultation
- Right column: CONTACT heading
  - Email: contact@twiyhealth.com
  - Email: info@twiyhealth.com
  - Phone: (754) 231-1006
  - SMS / Help: (754) 231-1006
  - TWIY Health, United States
- Bottom bar: small print "© 2026 TWIY Health. All rights reserved." 
  + right-aligned links: Privacy Policy | Terms & Conditions

## INTERACTION & MOTION DETAILS

- **Smooth scroll** throughout the page
- **Hero video scroll-expand**: the core animation — must feel 
  buttery smooth, never jittery. Use Framer Motion's useScroll + 
  useTransform, or the 21st.dev pattern directly.
- **Section entrance animations**: subtle fade-up on scroll-into-view 
  (opacity 0 → 1, y: 30 → 0, duration ~0.6s, ease-out). Do NOT 
  over-animate — this is a premium medical brand, not a flashy 
  marketing site.
- **Card hovers**: subtle lift (translateY -4px) + border glow in 
  cool cyan
- **Button hovers**: smooth color/background transitions, no bounce
- **Cursor**: default — do not add custom cursors

## RESPONSIVE BEHAVIOR

- Mobile-first build
- Hero video scroll-expand still works on mobile but tuned for touch 
  (the effect may be tighter)
- All 2-column layouts stack on mobile
- All 4-card grids become 1 or 2 columns on mobile
- Navigation becomes hamburger menu below lg breakpoint
- Font sizes scale down appropriately (use fluid typography or 
  responsive Tailwind classes)
- Adequate tap targets (min 44px)

## ACCESSIBILITY

- Semantic HTML (<header>, <main>, <section>, <footer>, <nav>)
- All images have meaningful alt text
- Video has proper aria attributes; autoplay + muted + playsinline
- Sufficient color contrast (WCAG AA minimum)
- Keyboard-navigable
- Focus states visible on all interactive elements
- Reduced-motion media query respected for the scroll-expand video 
  (fallback to static)

## PERFORMANCE

- Images: use Next.js <Image> component, prioritize hero image, lazy-
  load below-fold
- Video: preload="metadata", poster attribute set to Hero-Image.webp
- Font loading: use next/font for zero-layout-shift
- Minimal JS bundle
- Aim for Lighthouse score >= 90 across the board

## DELIVERABLE

Build the full landing page as a single Next.js app in a clean project 
structure:

- `app/page.tsx` — main landing page
- `components/` — all section components split cleanly 
  (Navigation.tsx, Hero.tsx, CompanyIntro.tsx, Services.tsx, 
  TechExpertise.tsx, GrowthDiscipline.tsx, ExecutionQuality.tsx, 
  FinalCTA.tsx, Footer.tsx)
- `lib/` — any shared utilities
- `public/Assets/` — move the Assets folder here
- `tailwind.config.ts` — brand colors/tokens
- `globals.css` — any global styles needed

Before you start coding, confirm:
1. The taste-skill is installed and you've read its docs
2. You understand the asset mapping (I listed each file and where it 
   goes)
3. You understand this is a PREMIUM medical brand aesthetic, not a 
   flashy tech startup

Then build.
