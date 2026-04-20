'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Phone } from '@phosphor-icons/react';
import { MagneticButton } from '@/components/ui/MagneticButton';

export default function FinalCTA() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-[680px] flex items-center py-32 md:py-44 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image
          src="/Assets/7.webp"
          alt="Hospital exterior at blue hour — TWIY Health Southeast operations"
          fill
          className="object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Layered gradient overlay — dark enough for legibility, not flat black */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#06060A]/85 via-[#06060A]/65 to-[#06060A]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06060A]/80 via-transparent to-transparent" />

      {/* Content — left-aligned, NOT centered */}
      <div ref={ref} className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-medium bg-[#2DD4BF]/[0.1] text-[#2DD4BF] ring-1 ring-[#2DD4BF]/25 mb-7 backdrop-blur-sm">
            Ready to partner?
          </span>

          <h2
            id="cta-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-none text-[#F0EEE8] mb-6"
          >
            Partner with the Southeast&rsquo;s focused surgical distribution team
          </h2>

          <p className="text-[#CBD5E1] text-base leading-relaxed mb-12 max-w-[50ch]">
            Built for long-term manufacturer growth, surgeon loyalty, and
            measurable territory performance — across the Southeast.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <MagneticButton>
              <Link
                href="/book-consultation"
                className="group inline-flex items-center gap-3 rounded-full bg-[#2DD4BF] text-[#06060A] px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-[#5EEAD4] transition-colors duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
              >
                Book Consultation
                <span className="w-7 h-7 rounded-full bg-[#06060A]/10 flex items-center justify-center group-hover:translate-x-[1px] group-hover:-translate-y-[1px] transition-transform duration-300">
                  <ArrowUpRight size={14} weight="bold" />
                </span>
              </Link>
            </MagneticButton>

            <div className="flex flex-col gap-2">
              <a
                href="tel:+17542311006"
                className="inline-flex items-center gap-2.5 py-1 text-sm text-[#CBD5E1] hover:text-white transition-colors duration-300 tracking-wide"
              >
                <Phone size={14} weight="light" />
                (754) 231-1006
              </a>
              <p className="text-[10px] text-white/40 leading-relaxed max-w-[46ch]">
                By texting or calling this number, you consent to receive transactional SMS from TWIY Health related to your intake request. Msg frequency varies. Msg &amp; data rates may apply. Reply STOP to cancel, HELP for help. Consent is not a condition of purchase.{' '}
                <a href="/privacy-policy" className="underline underline-offset-2 hover:text-white/70 transition-colors">Privacy Policy</a>
                {' '}|{' '}
                <a href="/terms-and-conditions" className="underline underline-offset-2 hover:text-white/70 transition-colors">Terms &amp; Conditions</a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
