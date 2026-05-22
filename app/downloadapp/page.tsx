'use client';

import Image from 'next/image';

export default function DownloadApp() {
  return (
    <main className="min-h-[100dvh] bg-[#07090F] flex flex-col items-center justify-center px-6 py-12">
      <div className="mb-10">
        <Image
          src="/Assets/TWIY v2.webp"
          alt="TWIY Health"
          width={160}
          height={48}
          className="h-9 w-auto object-contain mx-auto"
          priority
        />
      </div>

      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-white mb-2 text-center">App Downloads</h1>
        <p className="text-[#94A3B8] text-xs text-center mb-8 tracking-wide uppercase">TWIY Health — iOS</p>

        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#2DD4BF]/10 flex items-center justify-center shrink-0">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-base">TWIY Health</p>
              <p className="text-[#94A3B8] text-xs mt-0.5">iOS App · v0.1.0</p>
            </div>
          </div>

          <a
            href="itms-services://?action=download-manifest&url=https://twiyhealth.com/downloadapp/manifest.plist"
            className="w-full bg-[#2DD4BF] hover:bg-[#22B5A0] active:bg-[#1A9E8F] text-[#07090F] font-semibold text-base py-4 rounded-2xl transition-colors text-center block min-h-[52px] flex items-center justify-center"
          >
            Install on iPhone
          </a>

          <p className="text-[#475569] text-xs text-center leading-relaxed">
            Tap the button above on your iPhone to install.
            This is an enterprise app — tap <strong className="text-[#64748B]">Allow</strong> when prompted.
          </p>
        </div>
      </div>
    </main>
  );
}
