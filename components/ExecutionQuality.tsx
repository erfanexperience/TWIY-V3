'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { CheckCircle, Shield, Lightning } from '@phosphor-icons/react';

const reasons = [
  {
    icon: CheckCircle,
    number: '01',
    title: 'Trusted in-room case support',
    body: 'Complete in-room presence across the discipline from pre-case planning through to in-room support and follow-through.',
  },
  {
    icon: Shield,
    number: '02',
    title: 'Reliability under surgical demands',
    body: 'A dependable surgical distribution partner who shows up ready, case after case, surgeon after surgeon.',
  },
  {
    icon: Lightning,
    number: '03',
    title: 'Urgency with clinical precision',
    body: 'Responsive delivery, precise OR-level execution, and the calibrated urgency that surgeons demand.',
  },
];

export default function ExecutionQuality() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  // Left column gently rises as you read through
  const leftY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-44 overflow-hidden"
      aria-labelledby="execution-heading"
    >
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/*
          Asymmetric layout: big header left (40%), reasons right (60%)
          NOT centered — DESIGN_VARIANCE 8
        */}
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_6fr] gap-16 lg:gap-24 items-start">

          {/* ── Left: Sticky editorial header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: leftY }}
            className="lg:sticky lg:top-32"
          >
            <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-medium bg-[#2DD4BF]/[0.08] text-[#2DD4BF] ring-1 ring-[#2DD4BF]/20 mb-6">
              Why TWIY
            </span>
            <h2
              id="execution-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-none text-[#F0EEE8] mb-6"
            >
              Execution quality you can trust in every case
            </h2>
            <p className="text-[#CBD5E1] text-base leading-relaxed max-w-[45ch]">
              A trusted in-OR and field-level distribution partner to the
              surgeons, ASCs, and hospital systems we support. Every case,
              every surgeon, every time.
            </p>
          </motion.div>

          {/* ── Right: Reason blocks ── */}
          <div className="flex flex-col">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, x: 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.14 + i * 0.12,
                  }}
                  className={`flex items-start gap-6 py-10 ${
                    i < reasons.length - 1
                      ? 'border-b border-white/[0.06]'
                      : ''
                  }`}
                >
                  {/* Number + Icon cluster */}
                  <div className="flex flex-col items-center gap-3 flex-shrink-0">
                    <span className="text-[10px] font-medium tabular text-[#94A3B8] tracking-widest">
                      {r.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#2DD4BF]/[0.08] ring-1 ring-[#2DD4BF]/[0.15] flex items-center justify-center">
                      <Icon size={18} weight="light" className="text-[#2DD4BF]" />
                    </div>
                  </div>

                  <div className="pt-1">
                    <h3 className="text-lg font-semibold tracking-tight text-white mb-3">
                      {r.title}
                    </h3>
                    <p className="text-sm text-[#CBD5E1] leading-relaxed max-w-[50ch]">
                      {r.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
