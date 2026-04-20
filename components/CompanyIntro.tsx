'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export default function CompanyIntro() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  // Parallax: image drifts up slightly as you scroll through
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 md:py-44 overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-10 lg:gap-16 items-center">

          {/* ── Left: Image with parallax ── */}
          <motion.div
            variants={item}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: imgY }}
          >
            <div className="rounded-[2rem] bg-white/[0.02] ring-1 ring-white/[0.06] p-1.5">
              <div className="rounded-[1.5rem] overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] bg-[#0A0A10]">
                <Image
                  src="/Assets/2.webp"
                  alt="TWIY Health medical representative approaching the operating room"
                  width={720}
                  height={960}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          {/* ── Right: Editorial content block ── */}
          <div className="flex flex-col lg:pl-4">
            <motion.div
              variants={item}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-medium bg-[#2DD4BF]/[0.08] text-[#2DD4BF] ring-1 ring-[#2DD4BF]/20 mb-6">
                For surgeons & manufacturers — Built for the Southeast
              </span>
            </motion.div>

            <motion.h2
              id="about-heading"
              variants={item}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-none text-[#F0EEE8] mb-8"
            >
              Surgical distribution, built for the Southeast
            </motion.h2>

            <motion.div
              variants={item}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
              className="space-y-5 max-w-[58ch]"
            >
              <p className="text-[#CBD5E1] text-base leading-relaxed">
                We partner directly with{' '}
                <span className="text-white font-medium">
                  foot and ankle surgeons, ASCs, and hospital systems
                </span>{' '}
                across the Southeast — providing the in-room presence, logistics
                coordination, and clinical support that busy surgical practices
                demand. We also serve as a growth-focused distribution partner for
                leading manufacturers including{' '}
                <span className="text-white font-medium">
                  Medline, OSSIO, BoneSupport, Acera Surgical, and Biopoly
                </span>.
              </p>
              <p className="text-[#CBD5E1] text-base leading-relaxed">
                Whether you are a surgeon looking for a reliable OR partner or a
                manufacturer seeking structured territory expansion, our model is
                built for accountability, scalability, and long-term growth.
              </p>
            </motion.div>

            {/* Stat strip */}
            <motion.div
              variants={item}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="mt-10 pt-8 border-t border-white/[0.06] grid grid-cols-3 gap-6"
            >
              {[
                { value: '5', label: 'Manufacturer partners' },
                { value: 'SE', label: 'United States coverage' },
                { value: '360°', label: 'Case support model' },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.38 + i * 0.08 }}
                >
                  <p className="text-2xl font-semibold tracking-tighter text-[#2DD4BF] tabular">
                    {s.value}
                  </p>
                  <p className="text-[11px] text-[#94A3B8] mt-1 leading-tight uppercase tracking-[0.12em]">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
