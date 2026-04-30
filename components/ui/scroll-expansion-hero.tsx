'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  tagline?: string;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  tagline,
  children,
}: ScrollExpandMediaProps) => {
  // Only React state that causes structural DOM changes (rare — at progress thresholds)
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);

  // All animation values live in refs — zero React re-renders during scroll
  const progressRef = useRef(0);
  const expandedRef = useRef(false);   // mirror of mediaFullyExpanded for event handlers
  const mobileRef = useRef(false);
  const touchStartRef = useRef(0);

  // DOM refs for direct style mutation
  const bgRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  // Apply all visual changes directly to the DOM — no setState, no re-render
  const applyProgress = (p: number) => {
    const mobile = mobileRef.current;

    if (bgRef.current) {
      bgRef.current.style.opacity = String(Math.max(1 - p, 0));
    }

    if (videoContainerRef.current) {
      const w = 315 + p * (mobile ? 650 : 1250);
      const h = 420 + p * (mobile ? 200 : 400);
      videoContainerRef.current.style.width = `${w}px`;
      videoContainerRef.current.style.height = `${h}px`;
    }

    if (overlayRef.current) {
      overlayRef.current.style.opacity = String(Math.max(0.5 - p * 0.3, 0));
    }

    if (headingRef.current) {
      const scale = Math.max(1 - p * 0.55, 0.35);
      const ty = p * (mobile ? 120 : 180);
      const opacity = Math.max(1 - p * 1.6, 0);
      headingRef.current.style.transform = `translateY(${ty}px) scale(${scale})`;
      headingRef.current.style.opacity = String(opacity);
    }
  };

  // Set initial sizes on mount
  useEffect(() => {
    applyProgress(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Event listeners — empty deps so they never re-register during scroll
  useEffect(() => {
    const handleWheel = (e: Event) => {
      const we = e as unknown as WheelEvent;
      if (expandedRef.current && we.deltaY < 0 && window.scrollY <= 5) {
        expandedRef.current = false;
        setMediaFullyExpanded(false);
        we.preventDefault();
        return;
      }
      if (!expandedRef.current) {
        we.preventDefault();
        const next = Math.min(Math.max(progressRef.current + we.deltaY * 0.0009, 0), 1);
        progressRef.current = next;
        applyProgress(next);
        if (next >= 1) {
          expandedRef.current = true;
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (next < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: Event) => {
      touchStartRef.current = (e as TouchEvent).touches[0].clientY;
    };

    const handleTouchMove = (e: Event) => {
      const te = e as TouchEvent;
      if (!touchStartRef.current) return;
      const touchY = te.touches[0].clientY;
      const deltaY = touchStartRef.current - touchY;

      if (expandedRef.current && deltaY < -20 && window.scrollY <= 5) {
        expandedRef.current = false;
        setMediaFullyExpanded(false);
        te.preventDefault();
        touchStartRef.current = touchY;
        return;
      }
      if (!expandedRef.current) {
        te.preventDefault();
        const factor = deltaY < 0 ? 0.008 : 0.005;
        const next = Math.min(Math.max(progressRef.current + deltaY * factor, 0), 1);
        progressRef.current = next;
        applyProgress(next);
        if (next >= 1) {
          expandedRef.current = true;
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (next < 0.75) {
          setShowContent(false);
        }
        touchStartRef.current = touchY;
      }
    };

    const handleTouchEnd = () => { touchStartRef.current = 0; };

    const handleScroll = () => {
      if (!expandedRef.current) window.scrollTo(0, 0);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ← intentionally empty: all values accessed via refs

  useEffect(() => {
    const check = () => { mobileRef.current = window.innerWidth < 768; };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/* Background — opacity driven by ref, not React state */}
          <div ref={bgRef} className="absolute inset-0 z-0 h-full">
            <Image
              src={bgImageSrc}
              alt="TWIY Health — Foot & Ankle Surgical Distribution"
              width={1920}
              height={1080}
              className="w-screen h-screen object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

              {/* Expanding video container — size driven by ref */}
              <div
                ref={videoContainerRef}
                className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden"
                style={{
                  width: '315px',
                  height: '420px',
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 50px rgba(0,0,0,0.3)',
                  willChange: 'width, height',
                }}
              >
                <div className="relative w-full h-full pointer-events-none">
                  <video
                    src={mediaSrc}
                    poster={posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                    controls={false}
                    disablePictureInPicture
                    disableRemotePlayback
                  />
                  {/* Overlay — opacity driven by ref */}
                  <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-black/[0.5] pointer-events-none"
                    style={{ willChange: 'opacity' }}
                  />
                </div>
              </div>

              {/* Heading — style 4: shrinks + drops + fades on scroll, driven by ref */}
              <div className="flex flex-col items-center w-full relative z-10 px-4">
                <div
                  ref={headingRef}
                  className="relative text-center"
                  style={{
                    transformOrigin: 'center top',
                    willChange: 'transform, opacity',
                  }}
                >
                  {/* Dark radial glow halo */}
                  <div
                    className="absolute inset-0 -z-10 rounded-full pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse 110% 130% at 50% 50%, rgba(6,6,10,0.9) 0%, transparent 70%)',
                      transform: 'scale(1.8)',
                      filter: 'blur(24px)',
                    }}
                  />
                  <div className="mb-2">
                    <Image
                      src="/Assets/TWIY.webp"
                      alt="TWIY Health"
                      width={200}
                      height={60}
                      className="h-[45px] w-auto object-contain mx-auto"
                      priority
                    />
                  </div>
                  <h2
                    className="text-[1.7rem] sm:text-[2.7rem] lg:text-[4.05rem] font-black leading-[1.05] uppercase"
                    style={{
                      color: '#ffffff',
                      textShadow: '0 0 60px rgba(45,212,191,0.25), 0 2px 30px rgba(0,0,0,0.9)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {title}
                  </h2>
                  {tagline && (
                    <p
                      className="mt-3 text-[1.1rem] sm:text-[1.6rem] lg:text-[2.2rem] font-black tracking-[0.08em] uppercase"
                      style={{ color: 'rgba(255,255,255,0.85)', textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
                    >
                      {tagline}
                    </p>
                  )}
                  {/* Teal underline glow */}
                  <div
                    className="mt-4 mx-auto h-[2px] w-24 rounded-full bg-[#2DD4BF]"
                    style={{ boxShadow: '0 0 12px rgba(45,212,191,0.8), 0 0 24px rgba(45,212,191,0.4)' }}
                  />
                </div>
              </div>
            </div>

            {/* Post-expansion content */}
            <motion.section
              className="flex flex-col w-full px-8 py-10 md:px-16 lg:py-20"
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
