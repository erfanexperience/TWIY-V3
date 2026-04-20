'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ChartBar, Users } from '@phosphor-icons/react';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

export default function GrowthDiscipline() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  // Cards subtly drift upward as you scroll through the section
  const cardsY = useTransform(scrollYProgress, [0, 1], ['3%', '-3%']);

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-44 bg-[#0A0A10] overflow-hidden"
      aria-labelledby="growth-heading"
    >
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* ── Header — left aligned ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20 max-w-xl"
        >
          <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-medium bg-[#2DD4BF]/[0.08] text-[#2DD4BF] ring-1 ring-[#2DD4BF]/20 mb-5">
            Growth strategy
          </span>
          <h2
            id="growth-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-none text-[#F0EEE8] mb-5"
          >
            Structured expansion with measurable operating discipline
          </h2>
          <p className="text-[#CBD5E1] text-base leading-relaxed max-w-[55ch]">
            Territory development, surgeon alignment, operational discipline, and
            reliable execution — built to scale across the Southeast.
          </p>
        </motion.div>

        {/*
          TRUE asymmetric bento — 12 column grid
          Row 1-2: col-span-7 tall (Territory image) | col-span-5 short ×2 stacked
          Row 3:   col-span-12 full-width banner (Partnership)
        */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ y: cardsY }}
          className="grid grid-cols-12 grid-rows-[auto_auto_auto] gap-4"
        >
          {/* ── Card 1: Territory — tall image ── */}
          <motion.div
            variants={cardItem}
            className="col-span-12 md:col-span-7 md:row-span-2"
          >
            <div className="group h-full rounded-[1.75rem] bg-white/[0.015] ring-1 ring-white/[0.06] p-1.5 hover:ring-[#2DD4BF]/15 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] min-h-[420px] md:min-h-[560px]">
              <div className="relative h-full rounded-[1.375rem] overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <Image
                  src="/Assets/5a.webp"
                  alt="Southeast US at night — TWIY Health territory coverage"
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06060A]/90 via-[#06060A]/30 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#2DD4BF] mb-3 font-medium">
                    01 — Territory
                  </p>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-3">
                    Southeast territory development
                  </h3>
                  <p className="text-sm text-[#CBD5E1] leading-relaxed max-w-[46ch]">
                    Structured expansion into high-volume foot and ankle markets
                    throughout the Southeast — prioritizing surgeons and ASCs with
                    demonstrated clinical excellence.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Card 2: Biologics — image top-right ── */}
          <motion.div
            variants={cardItem}
            className="col-span-12 md:col-span-5"
          >
            <div className="group h-full rounded-[1.75rem] bg-white/[0.015] ring-1 ring-white/[0.06] p-1.5 hover:ring-[#2DD4BF]/15 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] min-h-[260px]">
              <div className="relative h-full rounded-[1.375rem] overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <Image
                  src="/Assets/3b.webp"
                  alt="Precision titanium fixation hardware — TWIY Health biologics portfolio"
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06060A]/85 via-[#06060A]/20 to-transparent" />
                <div className="absolute bottom-7 left-7 right-7">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#2DD4BF] mb-2 font-medium">
                    02 — Portfolio
                  </p>
                  <h3 className="text-base font-semibold tracking-tight text-white mb-2">
                    Biologics & fixation portfolio
                  </h3>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    Advanced biologics and fixation technologies matched to each
                    surgeon's clinical philosophy.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Card 3: Operations — typography bottom-right ── */}
          <motion.div
            variants={cardItem}
            className="col-span-12 md:col-span-5"
          >
            {/* Double-bezel */}
            <div className="group h-full rounded-[1.75rem] bg-white/[0.015] ring-1 ring-white/[0.06] p-1.5 hover:ring-[#2DD4BF]/15 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <div className="h-full rounded-[1.375rem] bg-[#0E0E14] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-7 flex flex-col gap-5 min-h-[260px] group-hover:-translate-y-[2px] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                <div className="inline-flex w-10 h-10 rounded-xl bg-[#2DD4BF]/[0.08] ring-1 ring-[#2DD4BF]/[0.15] items-center justify-center">
                  <ChartBar size={18} weight="light" className="text-[#2DD4BF]" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#94A3B8] mb-2 font-medium">
                    03 — Infrastructure
                  </p>
                  <h3 className="text-base font-semibold tracking-tight text-white mb-3">
                    Operational infrastructure & reporting
                  </h3>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    Standardized case protocols, real-time inventory tracking, and
                    transparent analytics giving manufacturer partners complete
                    visibility into territory performance.
                  </p>
                </div>
                {/* Abstract data bars */}
                <div className="flex gap-1.5 items-end h-8 mt-auto">
                  {[35, 55, 45, 72, 58, 84, 68, 90].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-[#2DD4BF]/[0.15]"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Card 4: Partnership — full-width horizontal banner ── */}
          <motion.div
            variants={cardItem}
            className="col-span-12"
          >
            {/* Double-bezel */}
            <div className="group rounded-[1.75rem] bg-white/[0.015] ring-1 ring-white/[0.06] p-1.5 hover:ring-[#2DD4BF]/15 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <div className="rounded-[1.375rem] bg-[#0E0E14] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-7 md:p-8 group-hover:-translate-y-[2px] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                  <div className="inline-flex w-11 h-11 rounded-xl bg-[#2DD4BF]/[0.08] ring-1 ring-[#2DD4BF]/[0.15] items-center justify-center flex-shrink-0">
                    <Users size={20} weight="light" className="text-[#2DD4BF]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#94A3B8] mb-2 font-medium">
                      04 — Partnership
                    </p>
                    <h3 className="text-base font-semibold tracking-tight text-white mb-2">
                      Partnership model & surgeon alignment
                    </h3>
                    <p className="text-xs text-[#CBD5E1] leading-relaxed max-w-[60ch]">
                      Targeted onboarding of high-performing surgeons and ASC
                      networks, with quarterly growth strategy meetings and
                      transparent reporting aligned to long-term manufacturer success.
                    </p>
                  </div>
                  {/* Tag cluster */}
                  <div className="flex flex-wrap gap-2 md:flex-col md:items-end md:gap-2 flex-shrink-0">
                    {['Surgeon alignment', 'ASC networks', 'Quarterly reviews'].map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.14em] font-medium bg-[#2DD4BF]/[0.06] text-[#CBD5E1] ring-1 ring-white/[0.06]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
