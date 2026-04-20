'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, CheckCircle, MapPin, Buildings, Handshake, ChartLineUp } from '@phosphor-icons/react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { MagneticButton } from '@/components/ui/MagneticButton';

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      variants={item}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const values = [
  {
    icon: CheckCircle,
    title: 'Accountability',
    body: 'We show up for every case, every surgeon, every time. Our model is built around consistent execution and transparent performance reporting.',
  },
  {
    icon: ChartLineUp,
    title: 'Scalability',
    body: 'Designed from the ground up to grow — expanding into new territories while maintaining the boutique-level service each partner expects.',
  },
  {
    icon: Handshake,
    title: 'Partnership',
    body: 'We operate as true partners, not vendors. Long-term alignment with surgeons, ASCs, hospital systems, and manufacturers drives everything we do.',
  },
  {
    icon: MapPin,
    title: 'Southeast Focus',
    body: 'Deep roots and dedicated resources across the Southeast mean we understand the markets, the surgeons, and the clinical landscape better than anyone.',
  },
];

const partners = [
  { src: '/Assets/log 1.png', alt: 'Medline' },
  { src: '/Assets/log 2.png', alt: 'OSSIO' },
  { src: '/Assets/log 3.png', alt: 'Acera Surgical' },
  { src: '/Assets/log 4.png', alt: 'BoneSupport' },
  { src: '/Assets/log 5.png', alt: 'BioPoly' },
];

export default function AboutPage() {
  return (
    <div className="bg-[#06060A] min-h-screen">
      <Navigation />

      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Assets/2.webp"
            alt="TWIY Health medical representative approaching the operating room"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06060A] via-[#06060A]/60 to-[#06060A]/20" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10 pb-24 pt-40 w-full">
          <FadeIn delay={0.1}>
            <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-medium bg-[#2DD4BF]/[0.08] text-[#2DD4BF] ring-1 ring-[#2DD4BF]/20 mb-6">
              Who we are
            </span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-none text-[#F0EEE8] max-w-[16ch]">
              Built for surgical excellence across the Southeast
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-28 md:py-36">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeIn>
              <p className="text-[11px] uppercase tracking-[0.28em] font-medium text-[#2DD4BF] mb-5">
                Our mission
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter leading-tight text-[#F0EEE8] mb-8">
                Surgical distribution built on trust, precision, and long-term growth
              </h2>
              <p className="text-[#CBD5E1] text-base leading-relaxed mb-5">
                TWIY Health is a specialized surgical distribution firm operating across the Southeastern United States. We partner directly with surgeons, ambulatory surgical centers, and hospital systems — delivering the in-room presence, logistics coordination, and clinical support that demanding surgical practices require.
              </p>
              <p className="text-[#CBD5E1] text-base leading-relaxed">
                We also serve as a growth-focused distribution partner for leading manufacturers, providing structured territory development, transparent performance analytics, and deep surgeon relationships that drive measurable revenue expansion.
              </p>
            </FadeIn>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '5', label: 'Manufacturer partners' },
                { value: 'SE', label: 'US coverage territory' },
                { value: '360°', label: 'Case support model' },
                { value: '1:1', label: 'Surgeon alignment' },
              ].map((stat, i) => (
                <FadeIn key={stat.label} delay={0.1 + i * 0.07}>
                  <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.07] p-7">
                    <p className="text-4xl font-semibold tracking-tighter text-[#2DD4BF] mb-2">{stat.value}</p>
                    <p className="text-[11px] text-[#64748B] uppercase tracking-[0.14em] leading-snug">{stat.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What we do ── */}
      <section className="py-24 bg-[#070709]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <FadeIn className="mb-16">
            <p className="text-[11px] uppercase tracking-[0.28em] font-medium text-[#2DD4BF] mb-4 text-center">
              What we do
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter leading-tight text-[#F0EEE8] text-center max-w-[20ch] mx-auto">
              Two sides of the same distribution platform
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn delay={0.1}>
              <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.07] p-10 h-full">
                <div className="w-10 h-10 rounded-xl bg-[#2DD4BF]/[0.08] ring-1 ring-[#2DD4BF]/20 flex items-center justify-center mb-7">
                  <Buildings size={18} className="text-[#2DD4BF]" weight="light" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-[#F0EEE8] mb-4">For surgeons & surgical facilities</h3>
                <p className="text-[#CBD5E1] text-sm leading-relaxed mb-6">
                  We provide complete in-room case support across your surgical schedule — from pre-case planning and tray preparation to in-room execution and post-case follow-through. Foot and ankle surgeons, ASCs, and hospital systems across the Southeast rely on us as a dependable OR-level partner.
                </p>
                <ul className="space-y-3">
                  {[
                    'Pre-operative planning & logistics',
                    'In-room case coverage & support',
                    'Post-case follow-through & reporting',
                    'Surgeon education & clinical onboarding',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#CBD5E1]">
                      <CheckCircle size={16} weight="light" className="text-[#2DD4BF] flex-shrink-0 mt-[2px]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.18}>
              <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.07] p-10 h-full">
                <div className="w-10 h-10 rounded-xl bg-[#2DD4BF]/[0.08] ring-1 ring-[#2DD4BF]/20 flex items-center justify-center mb-7">
                  <ChartLineUp size={18} className="text-[#2DD4BF]" weight="light" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-[#F0EEE8] mb-4">For manufacturers & industry partners</h3>
                <p className="text-[#CBD5E1] text-sm leading-relaxed mb-6">
                  We serve as a dedicated distribution and territory development partner for leading surgical manufacturers. Our model is built for scalability — structured expansion into high-volume markets, transparent performance analytics, and surgeon alignment that drives measurable revenue growth.
                </p>
                <ul className="space-y-3">
                  {[
                    'Territory development & market expansion',
                    'Structured surgeon onboarding programs',
                    'Real-time inventory & performance tracking',
                    'Quarterly growth strategy & reporting',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#CBD5E1]">
                      <CheckCircle size={16} weight="light" className="text-[#2DD4BF] flex-shrink-0 mt-[2px]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-28 md:py-36">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <FadeIn className="mb-16">
            <p className="text-[11px] uppercase tracking-[0.28em] font-medium text-[#2DD4BF] mb-4 text-center">
              How we operate
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter leading-tight text-[#F0EEE8] text-center">
              Our operating principles
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={0.08 + i * 0.07}>
                <div className="group rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.07] p-7 hover:ring-[#2DD4BF]/25 hover:bg-white/[0.05] transition-all duration-500 h-full">
                  <div className="w-9 h-9 rounded-xl bg-[#2DD4BF]/[0.08] ring-1 ring-[#2DD4BF]/20 flex items-center justify-center mb-5">
                    <v.icon size={16} className="text-[#2DD4BF]" weight="light" />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight text-[#F0EEE8] mb-3">{v.title}</h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">{v.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section className="py-24 bg-[#070709]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <FadeIn className="mb-14 text-center">
            <p className="text-[11px] uppercase tracking-[0.28em] font-medium text-[#2DD4BF] mb-4">
              Our partners
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter leading-tight text-[#F0EEE8]">
              Representing the industry's best
            </h2>
            <p className="text-[#CBD5E1] text-base leading-relaxed max-w-[48ch] mx-auto mt-5">
              We hold exclusive distribution partnerships with manufacturers defining modern surgical care — delivering their technologies with the precision and presence each case demands.
            </p>
          </FadeIn>

          <div className="flex flex-wrap justify-center gap-4 items-center md:grid md:grid-cols-5 md:justify-items-center">
            {partners.map((logo, i) => (
              <FadeIn key={logo.src} delay={0.08 + i * 0.07}>
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
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Territory ── */}
      <section className="py-28 md:py-36">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="rounded-[2rem] bg-white/[0.02] ring-1 ring-white/[0.06] p-1.5">
                <div className="rounded-[1.5rem] overflow-hidden bg-[#0A0A10]">
                  <Image
                    src="/Assets/5a.webp"
                    alt="Southeast United States territory — TWIY Health coverage map"
                    width={720}
                    height={500}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-medium bg-[#2DD4BF]/[0.08] text-[#2DD4BF] ring-1 ring-[#2DD4BF]/20 mb-6">
                Territory
              </span>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter leading-tight text-[#F0EEE8] mb-7">
                Rooted in the Southeast. Expanding with purpose.
              </h2>
              <p className="text-[#CBD5E1] text-base leading-relaxed mb-5">
                Our territory focus is intentional. The Southeast represents one of the highest-growth markets for surgical procedures in the country — and we have built the relationships, infrastructure, and operational capacity to serve it at the highest level.
              </p>
              <p className="text-[#CBD5E1] text-base leading-relaxed">
                We prioritize high-volume surgeons and ASC networks with demonstrated clinical excellence, building lasting partnerships that benefit manufacturers, facilities, and patients alike.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Assets/7.webp"
            alt="TWIY Health — partner with us"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#06060A]/75" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10 text-center">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.28em] font-medium text-[#2DD4BF] mb-5">
              Ready to partner?
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-none text-[#F0EEE8] mb-6 max-w-[18ch] mx-auto">
              Let's build something lasting together
            </h2>
            <p className="text-[#CBD5E1] text-base leading-relaxed max-w-[44ch] mx-auto mb-10">
              Whether you are a surgeon, an ASC, or a manufacturer — we are ready to talk about how TWIY Health can deliver for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <Link
                  href="/book-consultation"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#2DD4BF] text-[#06060A] px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-[#5EEAD4] transition-colors duration-500"
                >
                  Book Consultation
                  <span className="w-7 h-7 rounded-full bg-[#06060A]/10 flex items-center justify-center group-hover:translate-x-[1px] group-hover:-translate-y-[1px] transition-transform duration-300">
                    <ArrowUpRight size={14} weight="bold" />
                  </span>
                </Link>
              </MagneticButton>
              <a
                href="tel:+17542311006"
                className="text-sm text-[#CBD5E1] hover:text-white transition-colors duration-300 tracking-wide py-3.5"
              >
                (754) 231-1006
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
