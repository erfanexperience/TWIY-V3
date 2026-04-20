'use client';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, children, ...props }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const COLS = 38;
    const ROWS = 55;
    const SEP = 40;       // px between dots
    const R = 1.5;        // dot radius
    const AMP = 18;       // wave amplitude

    let count = 0;
    let animId: number;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const originX = (w - (COLS - 1) * SEP) / 2;
      const originY = (h - (ROWS - 1) * SEP) / 2;

      for (let ix = 0; ix < COLS; ix++) {
        for (let iy = 0; iy < ROWS; iy++) {
          const x = originX + ix * SEP;
          const y =
            originY +
            iy * SEP +
            Math.sin((ix + count) * 0.3) * AMP +
            Math.sin((iy + count) * 0.5) * AMP;

          // Fade at edges
          const dxR = Math.abs(ix - COLS / 2) / (COLS / 2);
          const dyR = Math.abs(iy - ROWS / 2) / (ROWS / 2);
          const fade = Math.max(0, 1 - Math.pow(Math.max(dxR, dyR), 2.2));

          ctx.beginPath();
          ctx.arc(x, y, R, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(45,212,191,${(0.38 * fade).toFixed(3)})`;
          ctx.fill();
        }
      }

      count += 0.04;
      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn('relative', className)} {...props}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
