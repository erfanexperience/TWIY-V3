'use client';

import { useState, useEffect } from 'react';

const BLUE_CSS = `
  html[data-theme="blue"],
  html[data-theme="blue"] body {
    background-color: #03060F !important;
  }
  html[data-theme="blue"] body::before {
    background:
      radial-gradient(ellipse 80% 60% at 8% 12%, rgba(37,99,235,0.10) 0%, transparent 70%),
      radial-gradient(ellipse 60% 50% at 92% 88%, rgba(37,99,235,0.07) 0%, transparent 70%) !important;
  }
  html[data-theme="blue"] .text-\\[\\#2DD4BF\\] { color: #3B82F6 !important; }
  html[data-theme="blue"] .bg-\\[\\#2DD4BF\\] { background-color: #2563EB !important; }
  html[data-theme="blue"] .hover\\:bg-\\[\\#5EEAD4\\]:hover { background-color: #3B82F6 !important; }
  html[data-theme="blue"] .border-\\[\\#2DD4BF\\] { border-color: #2563EB !important; }
  html[data-theme="blue"] .bg-\\[\\#06060A\\] { background-color: #03060F !important; }
  html[data-theme="blue"] .bg-\\[\\#030306\\] { background-color: #02040C !important; }
  html[data-theme="blue"] .bg-\\[\\#070709\\] { background-color: #040810 !important; }
  html[data-theme="blue"] .bg-\\[\\#0A0A10\\] { background-color: #060A15 !important; }
  html[data-theme="blue"] .bg-\\[\\#0E0E14\\] { background-color: #080D1A !important; }
  html[data-theme="blue"] .bg-\\[\\#13131C\\] { background-color: #0A1020 !important; }
  html[data-theme="blue"] .bg-\\[radial-gradient\\(circle_at_bottom_center\\,\\#2DD4BF\\,transparent_65\\%\\)\\] {
    background: radial-gradient(circle at bottom center, #2563EB, transparent 65%) !important;
  }
  html[data-theme="blue"] .ring-\\[\\#2DD4BF\\]\\/25 { --tw-ring-color: rgba(37,99,235,0.25) !important; }
  html[data-theme="blue"] .hover\\:ring-\\[\\#2DD4BF\\]\\/25:hover { --tw-ring-color: rgba(37,99,235,0.25) !important; }
`;

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'teal' | 'blue'>('teal');

  useEffect(() => {
    const saved = (localStorage.getItem('twiy-theme') as 'teal' | 'blue') || 'teal';
    setTheme(saved);
    apply(saved);
  }, []);

  function apply(t: 'teal' | 'blue') {
    const html = document.documentElement;
    if (t === 'blue') {
      html.setAttribute('data-theme', 'blue');
    } else {
      html.removeAttribute('data-theme');
    }
    let el = document.getElementById('twiy-theme-css') as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement('style');
      el.id = 'twiy-theme-css';
      document.head.appendChild(el);
    }
    el.textContent = t === 'blue' ? BLUE_CSS : '';
  }

  function pick(t: 'teal' | 'blue') {
    setTheme(t);
    localStorage.setItem('twiy-theme', t);
    apply(t);
  }

  return (
    <div className="flex items-center gap-1 rounded-full bg-white/[0.06] ring-1 ring-white/[0.08] p-1">
      <button
        onClick={() => pick('teal')}
        title="Theme 1 — Teal"
        className={`w-6 h-6 rounded-full text-[10px] font-bold transition-all duration-300 ${
          theme === 'teal'
            ? 'bg-[#2DD4BF] text-[#06060A]'
            : 'text-white/40 hover:text-white/70'
        }`}
      >
        1
      </button>
      <button
        onClick={() => pick('blue')}
        title="Theme 2 — Blue"
        className={`w-6 h-6 rounded-full text-[10px] font-bold transition-all duration-300 ${
          theme === 'blue'
            ? 'bg-[#2563EB] text-white'
            : 'text-white/40 hover:text-white/70'
        }`}
      >
        2
      </button>
    </div>
  );
}
