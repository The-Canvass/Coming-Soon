"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

export default function ComingSoonPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Ambient Starfield & Constellation Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Particle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
      baseAlpha: number;
      alpha: number;
    }

    const particles: Particle[] = [];

    const setupCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    setupCanvas();

    const particleCount = width < 768 ? 40 : 80;
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
      const isBlue = Math.random() > 0.45;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.6,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        color: isBlue ? "28, 176, 246" : "148, 163, 184",
        baseAlpha: Math.random() * 0.35 + 0.15,
        alpha: Math.random() * 0.35 + 0.15,
      });
    }

    const handleResize = () => {
      setupCanvas();
    };
    window.addEventListener("resize", handleResize);

    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 130,
    };

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
      ctx.clearRect(0, 0, width, height);

      // Render & update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        let currentAlpha = p.baseAlpha;
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            currentAlpha = Math.min(0.85, p.baseAlpha + (1 - dist / mouse.radius) * 0.5);
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 95;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(28, 176, 246, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main className="relative min-h-[100dvh] h-[100dvh] w-full bg-[#06080e] text-foreground flex items-center justify-center selection:bg-macaw-blue/30 selection:text-white overflow-hidden p-6 select-none">
      
      {/* Background Interactive Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-70"
        aria-hidden="true"
      />

      {/* Top Overhead Spotlight */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] pointer-events-none z-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(28,176,246,0.12),transparent_75%)] blur-2xl" 
        aria-hidden="true" 
      />

      {/* Center Atmospheric Ambient Aura */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(28,176,246,0.18)_0%,rgba(20,51,99,0.08)_50%,transparent_70%)] blur-[90px] animate-pulse-glow" />
      </div>

      {/* Subtle Depth Grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_50%,black_20%,transparent_85%)]"
        aria-hidden="true"
      />

      {/* Viewport Edge Vignette */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(4,6,10,0.85)_100%)]" 
        aria-hidden="true" 
      />

      {/* Central Content Box - Minimalist, Perfectly Balanced */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md sm:max-w-lg mx-auto">
        
        {/* Subtle Brand Tag Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md mb-6 sm:mb-8 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-macaw-blue animate-pulse" />
          <span className="text-[10.5px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-slate-300 font-display">
            The Canvas
          </span>
        </div>

        {/* The Canvas Emblem Logo with Smooth Gentle Levitation */}
        <div className="relative mb-6 sm:mb-8 flex justify-center items-center animate-float-gentle">
          <div className="relative z-10">
            <Image
              src="/brand/the-canvas-vertical-logo.png"
              alt="The Canvas Academy"
              width={320}
              height={670}
              priority
              quality={100}
              className="h-36 xs:h-44 sm:h-52 md:h-60 w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] drop-shadow-[0_8px_20px_rgba(28,176,246,0.12)] select-none pointer-events-none transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* Coming Soon Headline with Refined Shimmer Gradient */}
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight font-display mb-3 shimmer-text">
          Coming Soon
        </h1>

        {/* Minimalist Subtitle */}
        <p className="text-xs sm:text-sm md:text-[15px] text-slate-400 font-normal tracking-wide max-w-xs sm:max-w-sm leading-relaxed">
          Something extraordinary is in the making.
        </p>

      </div>
    </main>
  );
}
