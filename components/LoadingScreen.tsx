'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Canvas needs the browser — ssr:false is fine here
const DottedSurface = dynamic(
  () => import('@/components/ui/dotted-surface').then((m) => m.DottedSurface),
  { ssr: false, loading: () => null }
);

const MIN_DURATION = 3000;

export default function LoadingScreen() {
  // true on server + first client render → overlay is in the initial HTML, no flash
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('twiy_loaded');

    if (seen) {
      // Revisit — hide instantly, no animation
      setVisible(false);
      return;
    }

    sessionStorage.setItem('twiy_loaded', '1');
    const startTime = Date.now();

    const dismiss = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_DURATION - elapsed);
      setTimeout(() => {
        setFading(true);
        // Match the CSS transition duration (900ms)
        setTimeout(() => setVisible(false), 920);
      }, remaining);
    };

    if (document.readyState === 'complete') {
      dismiss();
    } else {
      window.addEventListener('load', dismiss, { once: true });
      const fallback = setTimeout(dismiss, 6000);
      return () => {
        window.removeEventListener('load', dismiss);
        clearTimeout(fallback);
      };
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#06060A]"
      style={{
        opacity: fading ? 0 : 1,
        transition: fading ? 'opacity 0.9s cubic-bezier(0.16,1,0.3,1)' : 'none',
        pointerEvents: fading ? 'none' : undefined,
      }}
    >
      <DottedSurface className="w-full h-full">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-10">

          {/* Radial glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: '500px',
              height: '500px',
              background: 'radial-gradient(ellipse at center, rgba(45,212,191,0.07) 0%, transparent 65%)',
              filter: 'blur(20px)',
            }}
          />

          {/* Logo */}
          <div
            className="transition-[opacity,transform] duration-700 delay-200"
            style={{ opacity: fading ? 0 : 1, transform: fading ? 'translateY(-8px)' : 'translateY(0)' }}
          >
            <Image
              src="/Assets/logo v2.webp"
              alt="TWIY Health"
              width={180}
              height={60}
              className="h-12 w-auto object-contain"
              priority
            />
          </div>

          {/* Progress bar */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-40 h-[1px] bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2DD4BF] rounded-full"
                style={{
                  width: '100%',
                  transform: 'translateX(-100%)',
                  animation: 'twiy-progress 2.6s cubic-bezier(0.16,1,0.3,1) 0.3s forwards',
                }}
              />
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#2DD4BF]/60 font-medium">
              Loading
            </p>
          </div>

        </div>
      </DottedSurface>

      <style>{`
        @keyframes twiy-progress {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
