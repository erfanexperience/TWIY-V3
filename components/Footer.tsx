import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'About us', href: '#about' },
  { label: 'Book consultation', href: '/book-consultation', internal: true },
];

export default function Footer() {
  return (
    <footer
      className="bg-[#030306] border-t border-white/[0.05]"
      role="contentinfo"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-16 pb-10">

        {/* ── Three-column layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-14">

          {/* Left: Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <a href="#" aria-label="TWIY Health — Home">
              <Image
                src="/Assets/logo.png"
                alt="TWIY Health"
                width={96}
                height={32}
                className="h-7 w-auto object-contain mb-5 opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </a>
            <p className="text-[#64748B] text-sm leading-relaxed max-w-[32ch]">
              Driving surgical growth across the Southeast.
            </p>
          </div>

          {/* Middle: Navigation */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-[10px] uppercase tracking-[0.22em] font-medium text-[#64748B] mb-6">
              Navigation
            </p>
            <ul className="flex flex-col gap-3 items-center md:items-start">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.internal ? (
                    <Link
                      href={link.href}
                      className="text-sm text-[#CBD5E1] hover:text-[#F0EEE8] transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-[#CBD5E1] hover:text-[#F0EEE8] transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-[10px] uppercase tracking-[0.22em] font-medium text-[#64748B] mb-6">
              Contact
            </p>
            <ul className="flex flex-col gap-3 text-sm items-center md:items-start">
              <li>
                <a
                  href="mailto:sales@twiyhealth.com"
                  className="text-[#CBD5E1] hover:text-[#F0EEE8] transition-colors duration-300 inline-flex items-center gap-1.5 group"
                >
                  sales@twiyhealth.com
                  <ArrowUpRight
                    size={11}
                    weight="light"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </a>
              </li>
              <li>
                <a
                  href="mailto:sales@twiyhealth.com"
                  className="text-[#CBD5E1] hover:text-[#F0EEE8] transition-colors duration-300 inline-flex items-center gap-1.5 group"
                >
                  sales@twiyhealth.com
                  <ArrowUpRight
                    size={11}
                    weight="light"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </a>
              </li>
              <li>
                <a
                  href="tel:+17542311006"
                  className="text-[#CBD5E1] hover:text-[#F0EEE8] transition-colors duration-300"
                >
                  (754) 231-1006
                </a>
              </li>
              <li className="text-[#64748B]">TWIY Health, United States</li>
              <li className="pt-2 border-t border-white/[0.05] mt-1">
                <p className="text-[10px] text-[#3D4A5C] leading-relaxed">
                  SMS: Text (754) 231-1006 · Msg &amp; data rates may apply · Reply STOP to cancel ·{' '}
                  <a href="/privacy-policy" className="underline underline-offset-2 hover:text-[#64748B] transition-colors">Privacy Policy</a>
                  {' '}|{' '}
                  <a href="/terms-and-conditions" className="underline underline-offset-2 hover:text-[#64748B] transition-colors">Terms</a>
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[#64748B]">
            &copy; 2026 TWIY Health. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-[11px] text-[#64748B]">
            <a
              href="/privacy-policy"
              className="hover:text-[#CBD5E1] transition-colors duration-300"
            >
              Privacy policy
            </a>
            <span className="text-white/[0.06]">|</span>
            <a
              href="/terms-and-conditions"
              className="hover:text-[#CBD5E1] transition-colors duration-300"
            >
              Terms &amp; conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
