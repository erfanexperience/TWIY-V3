'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import ThemeToggle from '@/components/ThemeToggle';

const navLinks = [
  { label: 'About Us', href: '/about' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const linkVariants = {
    closed: { opacity: 0, y: 16 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50" role="banner">
        <div className="max-w-[1280px] mx-auto px-8 lg:px-12 h-20 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" aria-label="TWIY Health — Home" className="flex-shrink-0">
            <Image
              src="/Assets/logo.png"
              alt="TWIY Health"
              width={110}
              height={36}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop: links + CTA */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium tracking-wide text-white/70 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}

            <ThemeToggle />

            <MagneticButton>
              <Link
                href="/book-consultation"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#2DD4BF] text-[#06060A] px-5 py-2.5 text-sm font-semibold tracking-wide hover:bg-[#5EEAD4] transition-colors duration-500 active:scale-[0.98]"
              >
                Book Consultation
                <span className="w-5 h-5 rounded-full bg-[#06060A]/10 flex items-center justify-center group-hover:translate-x-[1px] group-hover:-translate-y-[1px] transition-transform duration-300">
                  <ArrowUpRight size={10} weight="bold" />
                </span>
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-white/70 hover:text-white transition-colors duration-200"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <div className="relative w-5 h-[14px]">
              <span className={`absolute left-0 h-[1.5px] bg-current transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? 'top-[6px] w-5 rotate-45' : 'top-0 w-5'}`} />
              <span className={`absolute left-0 top-[6px] h-[1.5px] bg-current transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? 'opacity-0 w-0' : 'w-3 opacity-100'}`} />
              <span className={`absolute left-0 h-[1.5px] bg-current transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? 'top-[6px] w-5 -rotate-45' : 'top-[13px] w-5'}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 lg:hidden flex flex-col justify-center px-8 bg-[#06060A]/95 backdrop-blur-3xl"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-4 text-4xl font-semibold tracking-tighter text-[#F0EEE8] border-b border-white/[0.06] hover:text-[#2DD4BF] transition-colors duration-300 block"
                >
                  <motion.span
                    custom={i}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="block"
                  >
                    {link.label}
                  </motion.span>
                </Link>
              ))}
              <motion.a
                href="/book-consultation"
                onClick={() => setOpen(false)}
                custom={navLinks.length}
                variants={linkVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#2DD4BF] text-[#06060A] px-6 py-3.5 text-sm font-semibold tracking-wide w-fit"
              >
                Book Consultation
                <span className="w-6 h-6 rounded-full bg-[#06060A]/10 flex items-center justify-center">
                  <ArrowUpRight size={12} weight="bold" />
                </span>
              </motion.a>
              <div className="mt-6">
                <ThemeToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
