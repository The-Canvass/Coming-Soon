"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

export default function ComingSoonPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Ethereal Stardust & Constellation Field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
      baseAlpha: number;
      pulseSpeed: number;
      pulseOffset: number;
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

    const particleCount = width < 768 ? 45 : 85;
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
      const isCyan = Math.random() > 0.55;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        color: isCyan ? "28, 176, 246" : "203, 213, 225",
        baseAlpha: Math.random() * 0.35 + 0.12,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    const handleResize = () => setupCanvas();
    window.addEventListener("resize", handleResize);

    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 140,
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

    let time = 0;
    const render = () => {
      time += 0.015;
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

        // Subtle organic breathing alpha
        const breathingAlpha =
          p.baseAlpha + Math.sin(time * p.pulseSpeed * 100 + p.pulseOffset) * 0.08;
        let currentAlpha = Math.max(0.05, breathingAlpha);

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            currentAlpha = Math.min(0.85, currentAlpha + (1 - dist / mouse.radius) * 0.5);
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
        ctx.fill();

        // Connect nearby particles with delicate constellation lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 90;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(28, 176, 246, ${lineAlpha})`;
            ctx.lineWidth = 0.65;
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
    <main className="relative min-h-[100dvh] h-[100dvh] w-full bg-[#05070d] text-foreground flex items-center justify-center selection:bg-macaw-blue/30 selection:text-white overflow-hidden p-6 select-none">
      
      {/* Background Interactive Stardust Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-75"
        aria-hidden="true"
      />

      {/* Atmospheric Overhead Spotlight */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none z-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(28,176,246,0.11),transparent_75%)] blur-2xl" 
        aria-hidden="true" 
      />

      {/* Center Deep Atmospheric Aura */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(28,176,246,0.16)_0%,rgba(20,51,99,0.06)_50%,transparent_70%)] blur-[95px] animate-pulse-glow" />
      </div>

      {/* Subtle Geometric Matrix Grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_20%,transparent_85%)]"
        aria-hidden="true"
      />

      {/* Cinematic Edge Vignette */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(3,5,9,0.88)_100%)]" 
        aria-hidden="true" 
      />

      {/* Architectural Corner Accents */}
      <div className="fixed top-6 left-6 pointer-events-none z-10 text-slate-600/40 text-[11px] font-space select-none tracking-widest hidden sm:block">
        + 01
      </div>
      <div className="fixed top-6 right-6 pointer-events-none z-10 text-slate-600/40 text-[11px] font-space select-none tracking-widest hidden sm:block">
        TCA // EXP
      </div>
      <div className="fixed bottom-6 left-6 pointer-events-none z-10 text-slate-600/40 text-[11px] font-space select-none tracking-widest hidden sm:block">
        SYS.2026
      </div>
      <div className="fixed bottom-6 right-6 pointer-events-none z-10 text-slate-600/40 text-[11px] font-space select-none tracking-widest hidden sm:block">
        +
      </div>

      {/* Central Content Box */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto py-2">
        
        {/* Minimalist Typographic Brand Badge (No LED) */}
        <div className="mb-4 sm:mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.025] border border-white/[0.07] text-[10.5px] sm:text-[11px] font-medium tracking-[0.28em] uppercase text-slate-300/80 font-space backdrop-blur-md shadow-sm">
            THE CANVAS
          </span>
        </div>

        {/* The Canvas Emblem Staging with Celestial Orbital Rings & Levitation */}
        <div className="relative mb-4 sm:mb-6 flex justify-center items-center">
          
          {/* Outer Delicate Celestial Orbital Ring */}
          <div 
            className="absolute w-[240px] h-[240px] xs:w-[280px] xs:h-[280px] sm:w-[330px] sm:h-[330px] rounded-full border border-sky-400/[0.07] border-dashed animate-spin-slow pointer-events-none"
            aria-hidden="true"
          />

          {/* Inner Reverse Orbital Ring with Fine Axis Ticks */}
          <div 
            className="absolute w-[190px] h-[190px] xs:w-[220px] xs:h-[220px] sm:w-[260px] sm:h-[260px] rounded-full border border-white/[0.04] animate-spin-reverse-slow pointer-events-none"
            aria-hidden="true"
          />

          {/* Gentle Floating Emblem Logo */}
          <div className="relative z-10 animate-float-gentle">
            <Image
              src="/brand/the-canvas-vertical-logo.png"
              alt="The Canvas Academy"
              width={340}
              height={715}
              priority
              quality={90}
              className="h-32 xs:h-36 sm:h-44 md:h-52 lg:h-56 w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.65)] drop-shadow-[0_8px_25px_rgba(28,176,246,0.12)] select-none pointer-events-none"
            />
          </div>
        </div>

        {/* Luminous Horizon Glow Line */}
        <div 
          className="w-40 sm:w-56 h-[1px] bg-gradient-to-r from-transparent via-sky-400/30 to-transparent mb-3.5 sm:mb-4 pointer-events-none"
          aria-hidden="true"
        />

        {/* Coming Soon Headline with Outfit Font, Silver Shimmer & Generous Descender Clearance */}
        <div className="flex justify-center w-full">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight font-display mb-1.5 sm:mb-2 shimmer-text">
            Coming Soon
          </h1>
        </div>

        {/* Refined Plus Jakarta Sans Subtitle */}
        <p className="text-xs sm:text-sm md:text-[15px] text-slate-400 font-sans font-normal tracking-wide max-w-xs sm:max-w-sm leading-relaxed mt-1">
          Something extraordinary is in the making.
        </p>

      </div>
    </main>
  );
}
