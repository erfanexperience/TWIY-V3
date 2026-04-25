import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms & Conditions — TWIY Health',
  description: 'TWIY Health Terms & Conditions and Terms of Service, including A2P SMS program terms, consent, opt-out, and governing law.',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-[#F0EEE8] mb-4 pb-3 border-b border-white/[0.07]">
        {title}
      </h2>
      <div className="space-y-4 text-[#94A3B8] text-sm leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-base font-semibold text-[#CBD5E1] mb-2">{title}</h3>
      <div className="space-y-2 text-[#94A3B8] text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function CTABox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[#2DD4BF]/20 bg-[#2DD4BF]/[0.04] p-6 space-y-3 text-sm text-[#94A3B8] leading-relaxed">
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4">
      <span className="text-[#2DD4BF] font-medium shrink-0 min-w-[280px]">{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#06060A] pt-32 pb-24">
        <div className="max-w-[860px] mx-auto px-6 lg:px-10">

          {/* Header */}
          <div className="mb-14">
            <p className="text-[11px] uppercase tracking-[0.28em] font-medium text-[#2DD4BF] mb-5">
              Legal
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-[#F0EEE8] mb-5">
              Terms &amp; Conditions
            </h1>
            <p className="text-[#64748B] text-sm">
              Effective date: April 8, 2026 &nbsp;·&nbsp; Last updated: April 15, 2026
            </p>
            <div className="mt-6 p-4 rounded-lg bg-white/[0.02] border border-white/[0.05] text-[11px] text-[#64748B] leading-relaxed">
              These Terms also serve as our Terms of Service where that label is required by carriers or platforms (including A2P 10DLC).{' '}
              <strong className="text-[#94A3B8]">Public verification (A2P 10DLC):</strong>{' '}
              These Terms are published at{' '}
              <span className="text-[#2DD4BF]">https://twiyhealth.com/terms-and-conditions</span>.
              Our Privacy Policy is at{' '}
              <Link href="/privacy-policy" className="text-[#2DD4BF] hover:text-[#5EEAD4] transition-colors">
                https://twiyhealth.com/privacy-policy
              </Link>
              . Together they document how users opt in to SMS, message frequency, rates, opt-out and help, and program scope for carrier review.
            </div>
          </div>

          {/* Intro */}
          <p className="text-[#94A3B8] text-sm leading-relaxed mb-10">
            These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the public website operated by TWIY Health (&ldquo;TWIY,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), and your communications with us — including phone and SMS to the intake number published on this site. By contacting us or using this site, you agree to these Terms and our{' '}
            <Link href="/privacy-policy" className="text-[#2DD4BF] hover:text-[#5EEAD4] transition-colors">Privacy Policy</Link>.
            If you do not agree, do not use this site or our messaging channels.
          </p>

          {/* Section 1 */}
          <Section title="1. What TWIY does">
            <p>TWIY Health provides surgical distribution–related services in the United States, including partnership, territory, and operational coordination with healthcare professionals and manufacturers. We may provide intake, scheduling, or follow-up coordination by phone, email, or SMS when you request it.</p>
            <p>TWIY is not a clinic or hospital and does not provide medical diagnosis, treatment, emergency services, or legal advice. Information we share is for business coordination unless separately governed by a written agreement between you and TWIY. <strong className="text-[#CBD5E1]">In a medical emergency, call 911 (or your local emergency number).</strong></p>
          </Section>

          {/* Section 2 */}
          <Section title="2. Eligibility and acceptable use">
            <p>This site and our communication lines are intended for adults engaging in good-faith business discussions. You agree not to misuse the site or SMS/phone channels — including by transmitting unlawful, harassing, fraudulent, or malicious content, attempting unauthorized access to our systems, or impersonating another party.</p>
          </Section>

          {/* Section 3 — SMS */}
          <Section title="3. SMS program terms (A2P 10DLC)">
            <p>The following applies to SMS messages sent by TWIY Health in connection with inquiries or coordination you initiate. Our published intake number for calls and texts is{' '}
              <a href="tel:+17542311006" className="text-[#2DD4BF]">(754) 231-1006</a>.
            </p>

            <SubSection title="3.1 Message flow / call to action (summary for registration)">
              <CTABox>
                <p className="text-[#2DD4BF] font-semibold text-xs uppercase tracking-[0.2em] mb-4">Call to Action &amp; Opt-In Summary — A2P 10DLC Carrier Review</p>
                <Row label="Brand:" value="TWIY Health" />
                <Row label="Intake number (calls):" value={<a href="tel:+17542311006" className="text-[#2DD4BF]">(754) 231-1006</a>} />
                <Row label="Intake number (SMS):" value={<a href="tel:+17542311006" className="text-[#2DD4BF]">(754) 231-1006</a>} />
                <Row label="CTA / Opt-in method #1 — Web form (primary):" value="Submit the consultation form at https://twiyhealth.com/book-consultation with your phone number and check the unchecked SMS consent box. Submitting with that box checked is your express written consent for transactional SMS. A separate optional checkbox covers promotional SMS." />
                <Row label="CTA / Opt-in method #2 — Text-in:" value="Text us at (754) 231-1006 from your mobile phone — any first message or a keyword such as START constitutes your request for us to respond by SMS about your inquiry." />
                <Row label="CTA / Opt-in method #3 — Call-in:" value="Call us at (754) 231-1006; if you agree during the call to receive text messages for scheduling or coordination, that is your consent for SMS for that purpose." />
                <Row label="Website browsing:" value="Browsing this website alone does not enroll you in SMS." />
                <Row label="Consent:" value="Not a condition of purchase of any good or service." />
                <Row label="Message types:" value="Transactional/relationship messages related to your request (confirmations, clarifications, scheduling updates)." />
                <Row label="Frequency:" value="Varies with your conversation; not a fixed recurring marketing schedule." />
                <Row label="Rates:" value="Message and data rates may apply." />
                <Row label="Opt-out:" value="Reply STOP at any time to cancel SMS from this number." />
                <Row label="Help:" value={<>Reply HELP for help or contact us at <a href="mailto:sales@twiyhealth.com" className="text-[#2DD4BF]">sales@twiyhealth.com</a>.</>} />
                <Row label="Carrier disclaimer:" value="Carriers are not liable for delayed or undelivered messages." />
                <Row label="Policies:" value={<><Link href="/privacy-policy" className="text-[#2DD4BF] hover:text-[#5EEAD4]">Privacy Policy</Link> | <Link href="/terms-and-conditions" className="text-[#2DD4BF] hover:text-[#5EEAD4]">Terms &amp; Conditions</Link></>} />
              </CTABox>
            </SubSection>

            <SubSection title="3.2 Consent — detailed">
              <p>You consent to receive SMS from us when you affirmatively initiate contact using one of three methods: (1) submitting our consultation form at https://twiyhealth.com/book-consultation with the SMS consent box checked, (2) texting our published number (including &ldquo;START&rdquo; or any ordinary first message), or (3) calling and agreeing to SMS where offered. Browsing the website alone does not enroll you. Consent is not a condition of purchase of any good or service where that distinction applies under applicable law.</p>
            </SubSection>

            <SubSection title="3.3 Use of mobile information">
              <p>Mobile opt-in and consent-related information are not sold or shared with third parties for their marketing. We use phone numbers and message content to operate this program and our business, subject to our{' '}
                <Link href="/privacy-policy" className="text-[#2DD4BF] hover:text-[#5EEAD4]">Privacy Policy</Link>{' '}
                and lawful disclosures.
              </p>
            </SubSection>

            <SubSection title="3.4 Message scope — no unrelated marketing">
              <p>Messages are transactional and relationship in nature — for example intake acknowledgments, clarifications, scheduling or coordination updates tied to your request. We do not send unrelated promotional SMS blasts to numbers collected through this intake flow.</p>
            </SubSection>

            <SubSection title="3.5 Frequency, rates, carrier disclaimer">
              <p>Message frequency varies with your interaction and the status of your request; this is not a recurring subscription marketing program with a fixed cadence. Message and data rates may apply. Carriers are not liable for delayed or undelivered messages.</p>
            </SubSection>

            <SubSection title="3.6 Opt-out, help, and human support">
              <p>Reply <strong className="text-[#CBD5E1]">STOP</strong> to cancel SMS from this number/program. Reply <strong className="text-[#CBD5E1]">HELP</strong> for help. You may also contact us using the information in Section 10 below. We will process opt-out and help requests as required by applicable rules.</p>
            </SubSection>

            <SubSection title="3.7 Alignment with message content">
              <p>Your live message samples and autoresponders should remain consistent with this section — including brand name, variable frequency, rates disclosure, STOP/HELP, and references to these Terms and the{' '}
                <Link href="/privacy-policy" className="text-[#2DD4BF] hover:text-[#5EEAD4]">Privacy Policy</Link>.
              </p>
            </SubSection>
          </Section>

          {/* Section 4 */}
          <Section title="4. Intellectual property">
            <p>Content on this site (text, branding, layout, graphics) is owned by TWIY or its licensors and is protected by applicable intellectual property laws. You may not copy, scrape, or reuse it for commercial purposes without our prior written permission, except as allowed by law.</p>
          </Section>

          {/* Section 5 */}
          <Section title="5. Disclaimer of warranties">
            <p>This site and our communications are provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; To the fullest extent permitted by law, we disclaim implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant uninterrupted or error-free transmission of SMS or email.</p>
          </Section>

          {/* Section 6 */}
          <Section title="6. Limitation of liability">
            <p>To the maximum extent permitted by applicable law, TWIY and its officers, employees, contractors, and affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages, or loss of profits or data, arising from your use of the site, SMS, or phone services — including delays or failures caused by carriers or third-party platforms.</p>
            <p>Our aggregate liability for any claim arising from these Terms or related services is limited to the greater of (a) one hundred U.S. dollars (US $100) or (b) amounts you paid TWIY for the specific services giving rise to the claim in the twelve (12) months before the claim, if any.</p>
          </Section>

          {/* Section 7 */}
          <Section title="7. Indemnity">
            <p>You agree to indemnify and hold harmless TWIY from claims, losses, and expenses (including reasonable attorneys&rsquo; fees) arising from your violation of these Terms, misuse of our communications, or violation of others&rsquo; rights — except to the extent caused by our willful misconduct.</p>
          </Section>

          {/* Section 8 */}
          <Section title="8. Governing law and venue">
            <p>These Terms are governed by the laws of the United States and the State of Florida, without regard to conflict-of-law rules that would apply another jurisdiction&rsquo;s law. You agree that courts in Florida, USA, have exclusive jurisdiction over disputes arising from these Terms or your use of our services, and you consent to personal jurisdiction there, subject to any non-waivable rights you may have under consumer protection laws in your home jurisdiction.</p>
          </Section>

          {/* Section 9 */}
          <Section title="9. Changes">
            <p>We may modify these Terms at any time by posting an updated version on this site and updating the &ldquo;Last updated&rdquo; date. Material changes may require additional notice where required by law. Your continued use after updates constitutes acceptance unless law requires express consent.</p>
          </Section>

          {/* Section 10 */}
          <Section title="10. Contact">
            <p>For questions about these Terms or the SMS program:</p>
            <div className="mt-4 space-y-2">
              <p><strong className="text-[#CBD5E1]">Email:</strong>{' '}
                <a href="mailto:sales@twiyhealth.com" className="text-[#2DD4BF] hover:text-[#5EEAD4] transition-colors">sales@twiyhealth.com</a>
              </p>
              <p><strong className="text-[#CBD5E1]">Phone:</strong>{' '}
                <a href="tel:+17542311006" className="text-[#2DD4BF] hover:text-[#5EEAD4] transition-colors">(754) 231-1006</a>
              </p>
              <p><strong className="text-[#CBD5E1]">Intake / SMS:</strong>{' '}
                <a href="tel:+17542311006" className="text-[#2DD4BF] hover:text-[#5EEAD4] transition-colors">(754) 231-1006</a>
              </p>
              <p className="mt-3 text-[#64748B]">TWIY Health · United States</p>
            </div>
          </Section>

        </div>
      </main>
      <Footer />
    </>
  );
}
