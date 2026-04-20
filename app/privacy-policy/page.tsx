import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — TWIY Health',
  description: 'TWIY Health Privacy Policy. Learn how we collect, use, and protect your information, including our A2P SMS program terms.',
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

function SMSBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[#2DD4BF]/20 bg-[#2DD4BF]/[0.04] p-6 space-y-3 text-sm text-[#94A3B8] leading-relaxed">
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4">
      <span className="text-[#2DD4BF] font-medium shrink-0 min-w-[220px]">{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-[#64748B] text-sm">
              Effective date: April 8, 2026 &nbsp;·&nbsp; Last updated: April 15, 2026
            </p>
            <div className="mt-6 p-4 rounded-lg bg-white/[0.02] border border-white/[0.05] text-[11px] text-[#64748B] leading-relaxed">
              <strong className="text-[#94A3B8]">Public verification (A2P 10DLC):</strong>{' '}
              This Policy is published at{' '}
              <span className="text-[#2DD4BF]">https://twiyhealth.com/privacy-policy</span>.
              Our Terms of Service (including SMS terms) are at{' '}
              <Link href="/terms-and-conditions" className="text-[#2DD4BF] hover:text-[#5EEAD4] transition-colors">
                https://twiyhealth.com/terms-and-conditions
              </Link>
              . Carrier and Twilio reviewers may use these URLs to verify our call to action, consent methods, and required disclosures.
            </div>
          </div>

          {/* Intro */}
          <p className="text-[#94A3B8] text-sm leading-relaxed mb-10">
            This Privacy Policy explains how TWIY Health (&ldquo;TWIY,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, discloses, and safeguards information when you interact with our company — including when you visit this website, request information, book a consultation, or contact us by phone or SMS. TWIY is a U.S.-based business focused on surgical distribution partnerships and related coordination.
          </p>

          {/* Section 1 */}
          <Section title="1. Information we collect">
            <p>Depending on how you choose to interact with us, we may collect:</p>
            <ul className="list-disc list-outside ml-5 space-y-2">
              <li><strong className="text-[#CBD5E1]">Identifiers and contact details</strong> — such as your name, organization, work email, phone number, and similar information you submit through forms or messages.</li>
              <li><strong className="text-[#CBD5E1]">Professional and operational details</strong> — information you share about territories, case support needs, scheduling, manufacturer partnerships, or other business topics relevant to distribution or intake coordination.</li>
              <li><strong className="text-[#CBD5E1]">Communications content</strong> — the content of emails, SMS, phone notes (where permitted), and other messages you send us when you initiate contact or respond to our replies.</li>
              <li><strong className="text-[#CBD5E1]">Technical data</strong> — basic device and log information commonly collected by websites (such as browser type, general geographic region derived from IP address, and pages visited) to operate and secure our site.</li>
            </ul>
            <p>We collect sensitive categories of information only where you choose to provide them and where lawful.</p>
          </Section>

          {/* Section 2 */}
          <Section title="2. How we use information">
            <p>We use information to operate our business and serve requests you initiate, including to:</p>
            <ul className="list-disc list-outside ml-5 space-y-2">
              <li>Respond to inquiries, consultation requests, and intake-related communications.</li>
              <li>Coordinate logistics, follow-ups, clarifications, and transactional updates tied to an active request.</li>
              <li>Operate, maintain, and improve our website and internal processes; detect fraud or abuse.</li>
              <li>Comply with law, regulation, court orders, or enforceable governmental requests.</li>
            </ul>
            <p className="mt-3">
              <strong className="text-[#CBD5E1]">No marketing SMS.</strong> We do not send promotional or advertising SMS campaigns to numbers collected through our intake line. SMS are limited to transactional or relationship messages directly tied to a request you started with us (for example, confirmations, scheduling clarifications, or status updates).
            </p>
          </Section>

          {/* Section 3 — SMS */}
          <Section title="3. SMS program: message flow, consent, and your choices">
            <SMSBox>
              <p className="text-[#2DD4BF] font-semibold text-xs uppercase tracking-[0.2em] mb-4">SMS Program — A2P 10DLC</p>
              <Row label="a) Brand / legal name:" value="TWIY Health" />
              <Row label="b) Program purpose:" value="Transactional and relationship SMS tied to healthcare case intake coordination; no marketing or promotional messages." />
              <Row label="c) Published intake number:" value={<a href="tel:+17542311006" className="text-[#2DD4BF]">(754) 231-1006</a>} />
              <Row label="d) Opt-in method #1 — Text-in:" value="You consent by sending any text message (including START or any natural first message) to (754) 231-1006 from your mobile phone." />
              <Row label="e) Opt-in method #2 — Call-in:" value="You consent by calling (754) 231-1006 and agreeing during the call to receive SMS for scheduling or coordination." />
              <Row label="f) Website browsing:" value="Browsing this website alone does not enroll you in SMS." />
              <Row label="g) Message frequency:" value="Varies based on your request; not a fixed recurring schedule." />
              <Row label="h) Rates:" value="Message and data rates may apply." />
              <Row label="i) Opt-out:" value="Reply STOP at any time to cancel SMS from this number." />
              <Row label="j) Help:" value={<>Reply HELP for assistance or contact us at <a href="mailto:contact@twiyhealth.com" className="text-[#2DD4BF]">contact@twiyhealth.com</a>.</>} />
              <Row label="k) No purchase required:" value="Consent is not a condition of purchasing any goods or services." />
              <Row label="l) Carrier disclaimer:" value="Carriers are not liable for delayed or undelivered messages." />
              <Row label="m) Policies:" value={<><Link href="/privacy-policy" className="text-[#2DD4BF] hover:text-[#5EEAD4]">Privacy Policy</Link> | <Link href="/terms-and-conditions" className="text-[#2DD4BF] hover:text-[#5EEAD4]">Terms &amp; Conditions</Link></>} />
            </SMSBox>

            <SubSection title="3.1 Brand identification">
              <p>Brand / legal name: TWIY Health. Program purpose: Transactional and relationship SMS tied to business intake, consultation coordination, and follow-up you request with us — not mass marketing.</p>
            </SubSection>

            <SubSection title="3.2 Public call to action — how you opt in (all methods we use)">
              <p>You are not enrolled in SMS by browsing this website alone. Consent is collected only through affirmative, user-initiated contact with our published number or channel, as follows:</p>
              <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
                <li><strong className="text-[#CBD5E1]">Text-in (mobile originated):</strong> You send a text message from your mobile phone to (754) 231-1006. That includes any natural first message or a keyword such as START. Sending that message means you are asking TWIY Health to reply by SMS about your inquiry.</li>
                <li><strong className="text-[#CBD5E1]">Call-in:</strong> You call (754) 231-1006. If, during the call, you agree to receive SMS (for example to confirm details, schedule, or continue the conversation by text), that agreement is your consent for SMS for that coordination thread.</li>
                <li><strong className="text-[#CBD5E1]">Website context:</strong> The same number appears on our public website (footer and contact-related areas). Before you text or call, you can read this Privacy Policy and our <Link href="/terms-and-conditions" className="text-[#2DD4BF] hover:text-[#5EEAD4]">Terms</Link>.</li>
              </ul>
              <p className="mt-2">Consent is not a condition of purchase of any good or service.</p>
            </SubSection>

            <SubSection title="3.3 What we send and message frequency">
              <p><strong className="text-[#CBD5E1]">Message types:</strong> SMS may include intake acknowledgments, confirmations, clarifications, scheduling or logistics coordination, status updates, and other operational content directly related to a request or conversation you started with us.</p>
              <p><strong className="text-[#CBD5E1]">Frequency:</strong> This is a conversational / transactional program, not a recurring subscription marketing campaign. Message frequency varies based on your needs and the status of your request; there is no fixed daily or weekly schedule.</p>
            </SubSection>

            <SubSection title="3.4 Required disclosures: rates, opt-out, help, and policies">
              <ul className="list-disc list-outside ml-5 space-y-2">
                <li>Message and data rates may apply. Check your carrier plan.</li>
                <li><strong className="text-[#CBD5E1]">Opt-out:</strong> Reply STOP at any time to cancel SMS from this number/program.</li>
                <li><strong className="text-[#CBD5E1]">Help:</strong> Reply HELP for assistance, or contact us using the Contact section below.</li>
                <li>Privacy Policy: <span className="text-[#2DD4BF]">https://twiyhealth.com/privacy-policy</span></li>
                <li>Terms &amp; Conditions: <span className="text-[#2DD4BF]">https://twiyhealth.com/terms-and-conditions</span></li>
              </ul>
            </SubSection>

            <SubSection title="3.5 Example first reply">
              <p>An initial automated or manual reply may include: brand name (TWIY Health), that message frequency varies, that message and data rates may apply, how to opt out (STOP), how to get help (HELP or our contact information), and links or short references to our Terms and Privacy Policy.</p>
            </SubSection>

            <SubSection title="3.6 Carriers and delivery partners">
              <p>SMS may be delivered through telecommunications carriers and messaging platforms (such as Twilio). Carriers are not liable for delayed or undelivered messages. Delivery depends on your device, carrier coverage, and network conditions.</p>
            </SubSection>
          </Section>

          {/* Section 4 */}
          <Section title="4. Disclosures to third parties">
            <p>We do not sell personal information. We do not sell or share mobile numbers or SMS opt-in data for third-party marketing or promotional purposes.</p>
            <p>We may disclose information to:</p>
            <ul className="list-disc list-outside ml-5 space-y-2">
              <li><strong className="text-[#CBD5E1]">Service providers</strong> — such as hosting, communications (including telephony/SMS carriers and platforms like Twilio), email, analytics, and CRM tools that process data under contract for us.</li>
              <li><strong className="text-[#CBD5E1]">Legal and safety</strong> — when we believe disclosure is required by law or necessary to protect rights, safety, or security.</li>
              <li><strong className="text-[#CBD5E1]">Business transfers</strong> — in connection with a merger, acquisition, or asset sale, subject to appropriate safeguards.</li>
            </ul>
          </Section>

          {/* Section 5 */}
          <Section title="5. Retention and security">
            <p>We retain information only as long as reasonably necessary for the purposes described above, including to meet legal, accounting, or reporting requirements. We use reasonable administrative, technical, and organizational safeguards designed to protect information. No online or electronic transmission is completely secure.</p>
          </Section>

          {/* Section 6 */}
          <Section title="6. Your choices and rights">
            <p>Depending on where you live, you may have rights to access, correct, delete, or restrict certain processing of your personal information, or to opt out of certain disclosures. To exercise rights, contact us using the details below. We will respond in line with applicable law.</p>
          </Section>

          {/* Section 7 */}
          <Section title="7. Children's privacy">
            <p>Our services are directed to business professionals and are not intended for children under 13. We do not knowingly collect personal information from children.</p>
          </Section>

          {/* Section 8 */}
          <Section title="8. Changes to this Policy">
            <p>We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at the top will change when we do. Where required, we will provide additional notice. Continued use of our website or SMS program after updates means you acknowledge the revised Policy.</p>
          </Section>

          {/* Section 9 */}
          <Section title="9. Contact us">
            <p>Questions about this Privacy Policy, our data practices, or this SMS program may be directed to:</p>
            <div className="mt-4 space-y-2">
              <p><strong className="text-[#CBD5E1]">Email:</strong>{' '}
                <a href="mailto:contact@twiyhealth.com" className="text-[#2DD4BF] hover:text-[#5EEAD4] transition-colors">contact@twiyhealth.com</a>
              </p>
              <p><strong className="text-[#CBD5E1]">Phone:</strong>{' '}
                <a href="tel:+17542311006" className="text-[#2DD4BF] hover:text-[#5EEAD4] transition-colors">(754) 231-1006</a>
              </p>
              <p><strong className="text-[#CBD5E1]">Intake / SMS line:</strong>{' '}
                <a href="tel:+17542311006" className="text-[#2DD4BF] hover:text-[#5EEAD4] transition-colors">(754) 231-1006</a>
              </p>
              <p className="mt-3 text-[#64748B]">TWIY Health · United States</p>
            </div>
            <p className="mt-6">
              For Terms &amp; Conditions (Terms of Service), including additional SMS terms, please see our{' '}
              <Link href="/terms-and-conditions" className="text-[#2DD4BF] hover:text-[#5EEAD4] transition-colors">
                Terms &amp; Conditions page
              </Link>.
            </p>
          </Section>

        </div>
      </main>
      <Footer />
    </>
  );
}
