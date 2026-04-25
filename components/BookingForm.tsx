'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, CheckCircle } from '@phosphor-icons/react';

const DottedSurface = dynamic(
  () => import('@/components/ui/dotted-surface').then((m) => m.DottedSurface),
  { ssr: false, loading: () => null }
);

const roles = [
  'Foot & Ankle Surgeon',
  'ASC Administrator',
  'Hospital Administrator',
  'Manufacturer / Partner',
  'Other',
];

const interests = [
  'Surgical Case Coverage',
  'Biologics & Fixation Solutions',
  'Inventory & Logistics',
  'Surgeon Education & Support',
  'General Partnership',
];

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  role: string;
  interest: string;
  message: string;
  consentTransactional: boolean;
  consentNotMarketing: boolean;
}

const empty: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  organization: '',
  role: '',
  interest: '',
  message: '',
  consentTransactional: false,
  consentNotMarketing: false,
};

export default function BookingForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [consentError, setConsentError] = useState(false);

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const setCheck = (field: 'consentTransactional' | 'consentNotMarketing') => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.checked }));
    if (field === 'consentTransactional') setConsentError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.phone && !form.consentTransactional) {
      setConsentError(true);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
    } catch {
      alert('Something went wrong. Please email us directly at sales@twiyhealth.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#06060A] flex flex-col">
      {/* Animated dot background */}
      <DottedSurface className="fixed inset-0 pointer-events-none" />

      {/* Radial glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 15% 20%, rgba(45,212,191,0.06) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 85% 80%, rgba(45,212,191,0.04) 0%, transparent 60%)',
        }}
      />

      {/* Nav bar */}
      <header className="relative z-20 border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-18 py-5 flex items-center justify-between">
          <Link href="/" aria-label="TWIY Health — Home">
            <Image
              src="/Assets/logo.png"
              alt="TWIY Health"
              width={110}
              height={36}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft size={14} />
            Back to site
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 flex-1 flex items-start justify-center px-6 lg:px-10 py-16 md:py-24">
        <div className="w-full max-w-[1100px]">
          <AnimatePresence mode="wait">
            {submitted ? (
              /* ── Success state ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center py-20"
              >
                <div className="w-16 h-16 rounded-full bg-[#2DD4BF]/10 ring-1 ring-[#2DD4BF]/30 flex items-center justify-center mb-8">
                  <CheckCircle size={32} weight="light" className="text-[#2DD4BF]" />
                </div>
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-4">
                  We&apos;ll be in touch.
                </h1>
                <p className="text-[#CBD5E1] text-lg leading-relaxed max-w-[42ch] mb-10">
                  Thank you for reaching out. A member of the TWIY Health team
                  will contact you within one business day.
                </p>
                <Link
                  href="/"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#2DD4BF] text-[#06060A] px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-[#5EEAD4] transition-colors duration-500"
                >
                  Back to home
                  <ArrowUpRight size={14} weight="bold" />
                </Link>
              </motion.div>
            ) : (
              /* ── Form ── */
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start"
              >
                {/* Left: copy */}
                <div className="lg:sticky lg:top-24">
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-medium bg-[#2DD4BF]/[0.08] text-[#2DD4BF] ring-1 ring-[#2DD4BF]/20 mb-6">
                    Book a consultation
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-semibold tracking-tighter leading-[1.1] text-white mb-6">
                    Let&apos;s talk about your surgical needs.
                  </h1>
                  <p className="text-[#CBD5E1] text-base leading-relaxed mb-10 max-w-[38ch]">
                    Whether you&apos;re a surgeon, ASC, or manufacturer partner —
                    we&apos;re ready to discuss how TWIY Health can support your
                    goals across the Southeast.
                  </p>

                  {/* Contact info */}
                  <div className="space-y-4 border-t border-white/[0.06] pt-8">
                    {[
                      { label: 'Email', value: 'sales@twiyhealth.com', href: 'mailto:sales@twiyhealth.com' },
                      { label: 'Phone / SMS', value: '(754) 231-1006', href: 'tel:+17542311006' },
                      { label: 'Coverage', value: 'Southeastern United States', href: null },
                    ].map((item) => (
                      <div key={item.label}>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#64748B] mb-1">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm text-[#CBD5E1] hover:text-white transition-colors duration-300"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-[#CBD5E1]">{item.value}</p>
                        )}
                      </div>
                    ))}
                    <p className="text-[10px] text-[#3D4A5C] leading-relaxed pt-1">
                      By texting or calling (754) 231-1006, you consent to receive transactional SMS from TWIY Health. Msg &amp; data rates may apply. Reply STOP to cancel.{' '}
                      <a href="/privacy-policy" className="underline underline-offset-2 hover:text-[#64748B] transition-colors">Privacy Policy</a>
                      {' '}|{' '}
                      <a href="/terms-and-conditions" className="underline underline-offset-2 hover:text-[#64748B] transition-colors">Terms</a>
                    </p>
                  </div>
                </div>

                {/* Right: form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="First name" required>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={set('firstName')}
                        placeholder="Jason"
                        required
                      />
                    </Field>
                    <Field label="Last name" required>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={set('lastName')}
                        placeholder="Smith"
                        required
                      />
                    </Field>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Email address" required>
                      <input
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        placeholder="jason@hospital.com"
                        required
                      />
                    </Field>
                    <Field label="Phone number">
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={set('phone')}
                        placeholder="(555) 000-0000"
                      />
                    </Field>
                  </div>

                  {/* Organization */}
                  <Field label="Organization / Hospital" required>
                    <input
                      type="text"
                      value={form.organization}
                      onChange={set('organization')}
                      placeholder="Memorial Hospital, ASC of Miami, etc."
                      required
                    />
                  </Field>

                  {/* Role + Interest */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Your role">
                      <select value={form.role} onChange={set('role')}>
                        <option value="">Select a role…</option>
                        {roles.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Area of interest">
                      <select value={form.interest} onChange={set('interest')}>
                        <option value="">Select an area…</option>
                        {interests.map((i) => (
                          <option key={i} value={i}>{i}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {/* Message */}
                  <Field label="Tell us about your needs">
                    <textarea
                      value={form.message}
                      onChange={set('message')}
                      rows={5}
                      placeholder="Describe your case volume, current challenges, or any specific questions…"
                    />
                  </Field>

                  {/* Consent checkboxes */}
                  <div className="space-y-4 pt-1">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={form.consentTransactional}
                        onChange={setCheck('consentTransactional')}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border border-white/20 bg-[#0A0F1C] accent-[#B7E4FA] cursor-pointer"
                      />
                      <span className="text-[11px] text-[#64748B] leading-relaxed group-hover:text-[#94A3B8] transition-colors">
                        By providing my phone number and checking this box, I consent to receive transactional SMS messages from TWIY Health related to my consultation request (e.g., scheduling confirmations and follow-up coordination). Msg frequency varies. Msg &amp; data rates may apply. Reply STOP to cancel, HELP for help. Consent is not a condition of purchase.{' '}
                        <a href="/privacy-policy" className="underline underline-offset-2 hover:text-[#94A3B8] transition-colors">Privacy Policy</a>
                        {' '}|{' '}
                        <a href="/terms-and-conditions" className="underline underline-offset-2 hover:text-[#94A3B8] transition-colors">Terms &amp; Conditions</a>
                      </span>
                    </label>
                    {consentError && (
                      <p className="text-[11px] text-red-400 -mt-1 pl-7">
                        Please check this box to consent to SMS if you provide a phone number.
                      </p>
                    )}

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={form.consentNotMarketing}
                        onChange={setCheck('consentNotMarketing')}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border border-white/20 bg-[#0A0F1C] accent-[#B7E4FA] cursor-pointer"
                      />
                      <span className="text-[11px] text-[#64748B] leading-relaxed group-hover:text-[#94A3B8] transition-colors">
                        I understand that SMS messages from TWIY Health are for transactional and coordination purposes only. No marketing or promotional messages will be sent. I may opt out at any time by replying STOP.
                      </span>
                    </label>
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-[#2DD4BF] text-[#06060A] px-10 py-4 text-sm font-semibold tracking-wide hover:bg-[#5EEAD4] transition-colors duration-500 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-[#06060A]/30 border-t-[#06060A] animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send consultation request
                          <span className="w-7 h-7 rounded-full bg-[#06060A]/10 flex items-center justify-center group-hover:translate-x-[1px] group-hover:-translate-y-[1px] transition-transform duration-300">
                            <ArrowUpRight size={13} weight="bold" />
                          </span>
                        </>
                      )}
                    </button>
                    <p className="mt-4 text-xs text-[#64748B]">
                      We typically respond within one business day.
                    </p>
                    <p className="mt-3 text-[10px] text-[#3D4A5C] leading-relaxed max-w-[52ch]">
                      By submitting this form, you agree to our{' '}
                      <a href="/privacy-policy" className="underline underline-offset-2 hover:text-[#64748B] transition-colors">Privacy Policy</a>
                      {' '}and{' '}
                      <a href="/terms-and-conditions" className="underline underline-offset-2 hover:text-[#64748B] transition-colors">Terms &amp; Conditions</a>.
                      {' '}SMS consent is collected separately above and is not a condition of purchase.
                    </p>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/* ── Reusable field wrapper ── */
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactElement;
}) {
  const inputClass =
    'w-full bg-[#0A0F1C] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#2DD4BF]/50 focus:bg-[#0D1422] transition-all duration-300';

  const child = children as React.ReactElement<{ className?: string }>;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] uppercase tracking-[0.18em] font-medium text-[#64748B]">
        {label}
        {required && <span className="text-[#2DD4BF] ml-1">*</span>}
      </label>
      {/* Apply input styles via clone */}
      {(() => {
        const tag = child.type as string;
        const isTextarea = tag === 'textarea';
        const isSelect = tag === 'select';
        const extraClass = isTextarea
          ? 'resize-none'
          : isSelect
          ? 'appearance-none cursor-pointer'
          : '';
        return (
          <child.type
            {...child.props}
            className={`${inputClass} ${extraClass}`}
          />
        );
      })()}
    </div>
  );
}
