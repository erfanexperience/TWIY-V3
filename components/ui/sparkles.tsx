'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SparklesProps {
  density?: number;
  speed?: number;
  color?: string;
  opacity?: number;
  size?: number;
  className?: string;
  // unused legacy props kept for API compat
  minSize?: number | null;
  minSpeed?: number | null;
  minOpacity?: number | null;
  opacitySpeed?: number;
  background?: string;
  options?: Record<string, unknown>;
}

export function Sparkles({
  density = 800,
  speed = 1,
  color = '#ffffff',
  opacity = 1,
  size = 1,
  className,
}: SparklesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    // Parse hex color once
    const r = parseInt(color.replace('#', '').slice(0, 2), 16);
    const g = parseInt(color.replace('#', '').slice(2, 4), 16);
    const b = parseInt(color.replace('#', '').slice(4, 6), 16);

    type Particle = {
      x: number; y: number;
      sz: number; alpha: number;
      twinkle: number; twinkleSpeed: number;
      vy: number;
    };

    const makeParticle = (startY?: number): Particle => ({
      x: Math.random() * w,
      y: startY ?? Math.random() * h,
      sz: (Math.random() * 0.8 + 0.6) * size,
      alpha: Math.random() * opacity,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.025 + 0.01,
      vy: (Math.random() * 0.4 + 0.2) * speed,
    });

    const count = Math.max(40, Math.floor((w * h * density) / 1_000_000));
    const particles: Particle[] = Array.from({ length: count }, () => makeParticle());

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.twinkle += p.twinkleSpeed;
        const a = (Math.sin(p.twinkle) * 0.5 + 0.5) * p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(3)})`;
        ctx.fill();
        p.y -= p.vy * 0.4;
        if (p.y < -4) Object.assign(p, makeParticle(h + 4));
      }
      animId = requestAnimationFrame(draw);
    };

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', resize);
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [density, speed, color, opacity, size]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 w-full h-full', className)}
    />
  );
}
