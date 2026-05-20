'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function DownloadApp() {
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

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
    <main className="min-h-screen bg-[#07090F] flex flex-col items-center justify-center px-6">
      <div className="mb-10">
        <Image
          src="/Assets/TWIY v2.webp"
          alt="TWIY Health"
          width={160}
          height={48}
          className="h-10 w-auto object-contain"
          priority
        />
      </div>

      {!unlocked ? (
        <div className="w-full max-w-sm">
          <p className="text-[#94A3B8] text-sm text-center mb-6 tracking-wide uppercase">
            Enter password to access downloads
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              placeholder="Password"
              autoFocus
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-[#2DD4BF]/50 focus:ring-1 focus:ring-[#2DD4BF]/30 transition-all"
            />
            {error && (
              <p className="text-red-400 text-xs text-center">Incorrect password. Try again.</p>
            )}
            <button
              type="submit"
              className="w-full bg-[#2DD4BF] hover:bg-[#22B5A0] text-[#07090F] font-semibold text-sm py-3 rounded-xl transition-colors"
            >
              Access Downloads
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-lg text-center">
          <h1 className="text-2xl font-semibold text-white mb-2">App Downloads</h1>

{/* Download slots — files will be added here */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-5 text-[#475569] text-sm italic">
              Downloads coming soon — check back shortly.
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
