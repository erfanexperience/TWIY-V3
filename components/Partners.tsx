'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Sparkles } from '@/components/ui/sparkles';

const logos = [
  { src: '/Assets/log 1.png', alt: 'Manufacturer partner 1' },
  { src: '/Assets/log 2.png', alt: 'Manufacturer partner 2' },
  { src: '/Assets/log 3.png', alt: 'Manufacturer partner 3' },
  { src: '/Assets/log 4.png', alt: 'Manufacturer partner 4' },
  { src: '/Assets/log 5.png', alt: 'Manufacturer partner 5' },
];

export default function Partners() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative bg-[#06060A] overflow-hidden"
      aria-label="Manufacturer partners"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-24 md:pt-32">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-[11px] uppercase tracking-[0.28em] font-medium text-[#2DD4BF] mb-5">
            Trusted by leading manufacturers
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter leading-tight text-white mb-5">
            Trusted by leaders.<br />Used by the experts.
          </h2>
          <p className="text-[#CBD5E1] text-base leading-relaxed max-w-[50ch] mx-auto">
            Exclusive distribution partnerships with the innovators
            defining modern foot and ankle surgical care across the Southeast.
          </p>
        </motion.div>

        {/* ── Logo row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="flex flex-wrap justify-center gap-4 items-center md:grid md:grid-cols-5 md:justify-items-center"
        >
          {logos.map((logo, i) => (
            <motion.div
              key={logo.src}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.07 }}
              className="w-full flex items-center justify-center"
            >
              <div className="group rounded-xl bg-white/[0.03] ring-1 ring-white/[0.08] px-6 py-7 w-full flex items-center justify-center hover:ring-[#2DD4BF]/25 hover:bg-white/[0.06] transition-all duration-500">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={400}
                  height={140}
                  className="h-20 w-auto object-contain opacity-75 group-hover:opacity-100 transition-opacity duration-500 brightness-0 invert"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Sparkles arc — exact original demo structure ── */}
      <div className="relative -mt-8 h-80 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">

        {/* Purple/teal radial glow at bottom center */}
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#2DD4BF,transparent_65%)] before:opacity-25" />

        {/* Globe — large oval that creates the curved horizon */}
        <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-white/[0.1] bg-[#06060A]" />

        {/* Sparkles — high density white particles, masked radially */}
        <Sparkles
          density={1200}
          speed={0.8}
          color="#ffffff"
          opacity={0.9}
          size={1.2}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </div>
    </section>
  );
}
