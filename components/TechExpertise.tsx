'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { CheckCircle } from '@phosphor-icons/react';

const bullets = [
  'Transparent reporting and territory performance analytics',
  'Structured growth strategy aligned with manufacturer partners',
  'Boutique-level service and OR presence across the Southeast',
];

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export default function TechExpertise() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  // Parallax: image drifts up as section scrolls into view
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-44 overflow-hidden"
      aria-labelledby="tech-heading"
    >
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[6fr_5fr] gap-12 lg:gap-20 items-center">

          {/* ── Left: Content ── */}
          <div className="flex flex-col">
            <motion.div
              variants={item}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-medium bg-[#2DD4BF]/[0.08] text-[#2DD4BF] ring-1 ring-[#2DD4BF]/20 mb-6">
                What we deliver — Technology
              </span>
            </motion.div>

            <motion.h2
              id="tech-heading"
              variants={item}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-none text-[#F0EEE8] mb-8"
            >
              Advanced foot & ankle technology expertise
            </motion.h2>

            <motion.div
              variants={item}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
              className="space-y-5 max-w-[56ch] mb-10"
            >
              <p className="text-[#CBD5E1] text-base leading-relaxed">
                We are building a high-performance surgical distribution platform
                designed to scale across multiple territories while maintaining
                boutique-level service and OR presence.
              </p>
              <p className="text-[#CBD5E1] text-base leading-relaxed">
                Our focus is long-term growth, surgeon loyalty, and measurable
                revenue expansion for our manufacturing partners.
              </p>
            </motion.div>

            {/* Bullet list — staggered */}
            <div className="space-y-4">
              {bullets.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.22 + i * 0.1 }}
                  className="flex items-start gap-3 list-none"
                >
                  <CheckCircle
                    size={18}
                    weight="light"
                    className="text-[#2DD4BF] flex-shrink-0 mt-[2px]"
                  />
                  <span className="text-sm text-[#CBD5E1] leading-relaxed">{b}</span>
                </motion.li>
              ))}
            </div>
          </div>

          {/* ── Right: Image with parallax ── */}
          <motion.div
            variants={item}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
            className="order-last"
            style={{ y: imgY }}
          >
            <div className="rounded-[2rem] bg-white/[0.015] ring-1 ring-white/[0.06] p-1.5">
              <div className="rounded-[1.5rem] overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] relative bg-[#0A0A10]">
                <Image
                  src="/Assets/4-2.webp"
                  alt="Foot and ankle X-ray for surgical planning — TWIY Health technology expertise"
                  width={720}
                  height={900}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06060A]/60 via-[#06060A]/10 to-transparent" />
                <div className="absolute inset-0 mix-blend-color bg-[#2DD4BF]/[0.04]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
