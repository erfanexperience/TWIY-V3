'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function DownloadApp() {
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Delay focus until after the loading animation finishes (~4s on first visit)
  // so the keyboard doesn't pop up during the loading screen on mobile
  useEffect(() => {
    const alreadySeen = sessionStorage.getItem('twiy_loaded');
    const delay = alreadySeen ? 300 : 4500;
    const t = setTimeout(() => inputRef.current?.focus(), delay);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/check-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: input }),
    });
    if (res.ok) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setInput('');
    }
  };

  return (
    <main className="min-h-[100dvh] bg-[#07090F] flex flex-col items-center justify-center px-6 py-12 safe-top safe-bottom">
      {/* Logo */}
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

      {!unlocked ? (
        <div className="w-full max-w-sm">
          <p className="text-[#94A3B8] text-xs text-center mb-6 tracking-[0.2em] uppercase">
            Enter password to access downloads
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              ref={inputRef}
              type="password"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              placeholder="Password"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 py-4 text-white placeholder-white/30 text-base outline-none focus:border-[#2DD4BF]/50 focus:ring-1 focus:ring-[#2DD4BF]/30 transition-all"
            />
            {error && (
              <p className="text-red-400 text-xs text-center">
                Incorrect password. Try again.
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-[#2DD4BF] hover:bg-[#22B5A0] active:bg-[#1A9E8F] text-[#07090F] font-semibold text-base py-4 rounded-2xl transition-colors min-h-[52px]"
            >
              Access Downloads
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-lg">
          <h1 className="text-2xl font-semibold text-white mb-6 text-center">
            App Downloads
          </h1>
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-6 text-[#475569] text-sm italic text-center">
              Downloads coming soon — check back shortly.
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
