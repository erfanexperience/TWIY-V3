'use client';

import Link from 'next/link';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import { ArrowUpRight } from '@phosphor-icons/react';
import { MagneticButton } from '@/components/ui/MagneticButton';

export default function Hero() {
  return (
    <ScrollExpandMedia
      mediaType="video"
      mediaSrc="/Assets/Hero-Video-2.mp4"
      posterSrc="/Assets/Hero-Image.webp"
      bgImageSrc="/Assets/Hero-Image.webp"
      title="Surgical Excellence"
      tagline="Every case, every surgeon, every time."
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-end">
          <p className="text-lg md:text-xl text-[#CBD5E1] leading-relaxed max-w-[55ch]">
            Delivering advanced biologics and fixation technologies across the
            Southeast with precision, reliability, and unmatched case support.
          </p>
          <div className="flex flex-col sm:flex-row items-start md:items-end justify-start md:justify-end gap-4">
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
            <a
              href="#services"
              className="inline-flex items-center text-sm text-[#CBD5E1] hover:text-white transition-colors duration-300 tracking-wide py-3.5"
            >
              Explore services
            </a>
          </div>
        </div>
      </div>
    </ScrollExpandMedia>
  );
}
