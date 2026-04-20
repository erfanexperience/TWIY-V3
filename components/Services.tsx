'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Stethoscope,
  Stack,
  Package,
  BookOpen,
} from '@phosphor-icons/react';

const services = [
  {
    icon: Stethoscope,
    title: 'Surgical case coverage',
    body: 'In-room case support for precise, dependable execution from pre-case prep through post-case follow-through.',
    span: 'col-span-12 md:col-span-7',
    tall: true,
  },
  {
    icon: Stack,
    title: 'Biologics & fixation solutions',
    body: 'Advanced biologics and fixation technologies from Medline, OSSIO, BoneSupport, Acera Surgical, and Biopoly — matched precisely to each case.',
    span: 'col-span-12 md:col-span-5',
    tall: false,
  },
  {
    icon: Package,
    title: 'Inventory & logistics management',
    body: 'Standardized case protocols, inventory tracking systems, and on-time delivery coordination for high-volume surgical environments.',
    span: 'col-span-12 md:col-span-5',
    tall: false,
  },
  {
    icon: BookOpen,
    title: 'Surgeon education & clinical support',
    body: 'Ongoing surgical technique and clinical education for surgeons adopting new technologies, ensuring confident outcomes.',
    span: 'col-span-12 md:col-span-7',
    tall: true,
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Services() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  // Parallax on the background image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32 md:py-44 overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <Image
          src="/Assets/8.webp"
          alt="TWIY Health surgical services background"
          fill
          className="object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Dark overlays — same layered approach as FinalCTA */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#06060A]/90 via-[#06060A]/80 to-[#06060A]/70" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#06060A]/80 via-transparent to-[#06060A]/60" />

      {/* Content */}
      <div ref={ref} className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20 max-w-xl"
        >
          <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-medium bg-[#2DD4BF]/[0.1] text-[#2DD4BF] ring-1 ring-[#2DD4BF]/25 mb-5 backdrop-blur-sm">
            Our services
          </span>
          <h2
            id="services-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-none text-white mb-5"
          >
            Comprehensive surgical support, built for scale
          </h2>
          <p className="text-[#CBD5E1] text-base leading-relaxed max-w-[55ch]">
            Precision, urgency, and long-term value — from pre-operative planning
            and logistics coordination to in-room execution and post-case
            follow-through across the Southeast.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-12 gap-4"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardItem}
                className={service.span}
              >
                {/* Outer shell — double-bezel with slight glass effect */}
                <div className="group h-full rounded-[1.75rem] bg-white/[0.04] ring-1 ring-white/[0.1] p-1.5 hover:ring-[#2DD4BF]/30 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] backdrop-blur-sm">
                  {/* Inner core */}
                  <div className={`h-full rounded-[1.375rem] bg-[#06060A]/70 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] flex flex-col gap-6 p-7 md:p-8 group-hover:-translate-y-[2px] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${service.tall ? 'min-h-[240px]' : 'min-h-[200px]'}`}>
                    {/* Icon */}
                    <div className="inline-flex w-11 h-11 rounded-xl bg-[#2DD4BF]/[0.1] ring-1 ring-[#2DD4BF]/[0.2] items-center justify-center flex-shrink-0 group-hover:bg-[#2DD4BF]/[0.18] transition-colors duration-500">
                      <Icon size={20} weight="light" className="text-[#2DD4BF]" />
                    </div>
                    {/* Content */}
                    <div className="flex-1 flex flex-col gap-3">
                      <h3 className="text-base font-semibold tracking-tight text-white">
                        {service.title}
                      </h3>
                      <p className="text-sm text-[#CBD5E1] leading-relaxed max-w-[52ch]">
                        {service.body}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
