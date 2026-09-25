"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

export default function ComingSoonPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Ambient Constellation Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
      baseAlpha: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = window.innerWidth < 768 ? 35 : 75;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        color: Math.random() > 0.4 ? "rgba(28, 176, 246, " : "rgba(74, 109, 179, ",
        baseAlpha: Math.random() * 0.45 + 0.2,
      });
    }

    const mouse = { x: null as number | null, y: null as number | null, radius: 140 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        let alpha = p.baseAlpha;
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            alpha = Math.min(0.9, p.baseAlpha + (1 - dist / mouse.radius) * 0.5);
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + alpha + ")";
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#1cb0f6";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 110;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(28, 176, 246, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-[#070a13] text-foreground flex items-center justify-center selection:bg-macaw-blue/30 selection:text-white overflow-hidden p-6">
      
      {/* Background Interactive Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-65"
        aria-hidden="true"
      />

      {/* Ambient Mesh Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,#1cb0f6_0%,rgba(20,51,99,0)_70%)] blur-[120px] opacity-30 animate-pulse-glow" />
        <div className="absolute top-[20%] right-[15%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,#1f4585_0%,rgba(12,33,70,0)_70%)] blur-[100px] opacity-25" />
      </div>

      {/* Ambient Subtle Grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_20%,transparent_85%)]"
        aria-hidden="true"
      />

      {/* Center Minimalist Coming Soon Presentation */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
        
        {/* High-Resolution 1:1 Circular Logo with Crisp Vector-grade Scaling */}
        <div className="relative mb-8 sm:mb-10 flex justify-center items-center">
          <div className="absolute inset-0 rounded-full bg-macaw-blue/25 blur-3xl scale-125 animate-pulse-glow pointer-events-none" />
          <div className="relative z-10 animate-hero-float">
            <Image
              src="/brand/the-canvas-logo.png"
              alt="The Canvas"
              width={400}
              height={400}
              priority
              quality={100}
              className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full object-contain shadow-2xl drop-shadow-[0_20px_45px_rgba(28,176,246,0.35)] select-none pointer-events-none"
            />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.3em] text-brand-soft mb-3">
          The Canvas
        </h1>

        {/* Coming Soon Text */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tightest leading-tight font-display mb-4">
          Coming Soon
        </h2>

        {/* Subtle Tagline */}
        <p className="text-xs sm:text-sm text-slate-400 tracking-wide max-w-xs sm:max-w-sm leading-relaxed">
          Something extraordinary is in the making.
        </p>

      </div>
    </main>
  );
}
