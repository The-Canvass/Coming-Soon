"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ComingSoonPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Interactive Celestial Stardust & Meteor Canvas System
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

    interface Meteor {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      life: number;
      maxLife: number;
    }

    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
    }

    interface TrailSpark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      life: number;
    }

    const particles: Particle[] = [];
    const meteors: Meteor[] = [];
    const ripples: Ripple[] = [];
    const trailSparks: TrailSpark[] = [];

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

    // Spawn ambient background stars
    const particleCount = width < 768 ? 50 : 95;
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
      const isCyan = Math.random() > 0.65;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.4,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        color: isCyan ? "28, 176, 246" : "226, 232, 240",
        baseAlpha: Math.random() * 0.35 + 0.1,
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

    let lastSparkTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setMousePos({ x: e.clientX, y: e.clientY });

      // Spawn subtle cursor stardust sparks
      const now = Date.now();
      if (now - lastSparkTime > 45 && trailSparks.length < 25) {
        lastSparkTime = now;
        trailSparks.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6 - 0.2,
          radius: Math.random() * 1.6 + 0.6,
          alpha: 0.7,
          life: 1,
        });
      }
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleClick = (e: MouseEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: Math.min(width, height) * 0.45,
        opacity: 0.6,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);

    // Shooting star spawn timer
    let nextMeteorTime = Date.now() + 2000;
    const spawnMeteor = () => {
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.2; // ~45 deg downward
      meteors.push({
        x: Math.random() * width * 0.85,
        y: Math.random() * (height * 0.35),
        length: Math.random() * 80 + 50,
        speed: Math.random() * 6 + 7,
        angle: angle,
        opacity: Math.random() * 0.6 + 0.3,
        life: 0,
        maxLife: Math.random() * 35 + 30,
      });
    };

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Check meteor spawn
      if (Date.now() > nextMeteorTime) {
        spawnMeteor();
        nextMeteorTime = Date.now() + Math.random() * 4000 + 2500;
      }

      // Render & update Click Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 3.5;
        r.opacity *= 0.965;

        if (r.radius > r.maxRadius || r.opacity < 0.01) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(28, 176, 246, ${r.opacity * 0.45})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius * 0.75, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${r.opacity * 0.25})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Render & update Cursor Trail Sparks
      for (let i = trailSparks.length - 1; i >= 0; i--) {
        const s = trailSparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.025;
        s.alpha = Math.max(0, s.life * 0.7);

        if (s.life <= 0) {
          trailSparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius * s.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.fill();
      }

      // Render & update Shooting Stars / Meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.life++;
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;

        const progress = m.life / m.maxLife;
        let currentAlpha = m.opacity;
        if (progress < 0.2) {
          currentAlpha = (progress / 0.2) * m.opacity;
        } else if (progress > 0.6) {
          currentAlpha = (1 - (progress - 0.6) / 0.4) * m.opacity;
        }

        if (m.life >= m.maxLife) {
          meteors.splice(i, 1);
          continue;
        }

        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.7, `rgba(28, 176, 246, ${currentAlpha * 0.4})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${currentAlpha})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // Meteor Head Spark
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.fill();
      }

      // Render & update background starfield particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        const breathingAlpha =
          p.baseAlpha + Math.sin(time * p.pulseSpeed * 100 + p.pulseOffset) * 0.08;
        let currentAlpha = Math.max(0.04, breathingAlpha);

        // Mouse proximity glow
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            currentAlpha = Math.min(0.85, currentAlpha + (1 - dist / mouse.radius) * 0.55);
          }
        }

        // Ripple proximity displacement
        for (const r of ripples) {
          const dx = p.x - r.x;
          const dy = p.y - r.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (Math.abs(dist - r.radius) < 20) {
            currentAlpha = Math.min(0.9, currentAlpha + 0.35);
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
            const lineAlpha = (1 - dist / maxDist) * 0.11;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(28, 176, 246, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
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
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main className="relative min-h-[100dvh] h-[100dvh] w-full bg-[#05070d] text-foreground flex items-center justify-center selection:bg-macaw-blue/30 selection:text-white overflow-hidden p-6 select-none">
      
      {/* Background Interactive Stardust & Meteor Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-80"
        aria-hidden="true"
      />

      {/* Dynamic Cursor Spotlight Beam */}
      <div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 opacity-25"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background: "radial-gradient(circle, rgba(28, 176, 246, 0.15) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Atmospheric Overhead Stage Spotlight */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] pointer-events-none z-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(28,176,246,0.12),transparent_75%)] blur-2xl" 
        aria-hidden="true" 
      />

      {/* Center Deep Ambient Aurora */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(28,176,246,0.14)_0%,rgba(20,51,99,0.06)_50%,transparent_70%)] blur-[100px] animate-aurora" />
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


      {/* Central Content Box */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto py-2">
        

        {/* The Canvas Emblem Staging with Celestial Orbital Rings, Satellites & Levitation */}
        <div className="relative mb-4 sm:mb-6 flex justify-center items-center">
          
          {/* Outer Delicate Celestial Orbital Ring with Orbiting Star Satellite */}
          <div 
            className="absolute w-[240px] h-[240px] xs:w-[280px] xs:h-[280px] sm:w-[330px] sm:h-[330px] rounded-full border border-sky-400/[0.08] border-dashed animate-spin-slow pointer-events-none"
            aria-hidden="true"
          />
          <div 
            className="absolute w-[240px] h-[240px] xs:w-[280px] xs:h-[280px] sm:w-[330px] sm:h-[330px] rounded-full pointer-events-none flex items-center justify-center animate-spin-slow"
            aria-hidden="true"
          >
            <span className="absolute -top-1 w-2 h-2 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          </div>

          {/* Inner Reverse Orbital Ring with Second Orbiting Star Satellite */}
          <div 
            className="absolute w-[190px] h-[190px] xs:w-[220px] xs:h-[220px] sm:w-[260px] sm:h-[260px] rounded-full border border-white/[0.05] animate-spin-reverse-slow pointer-events-none"
            aria-hidden="true"
          />
          <div 
            className="absolute w-[190px] h-[190px] xs:w-[220px] xs:h-[220px] sm:w-[260px] sm:h-[260px] rounded-full pointer-events-none flex items-center justify-center animate-spin-reverse-slow"
            aria-hidden="true"
          >
            <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-sky-300/70 shadow-[0_0_6px_rgba(28,176,246,0.6)]" />
          </div>

          {/* Gentle Floating Emblem Logo */}
          <div className="relative z-10 animate-float-gentle cursor-pointer">
            <Image
              src="/brand/the-canvas-vertical-logo.png"
              alt="The Canvas Academy"
              width={340}
              height={715}
              priority
              quality={90}
              className="h-32 xs:h-36 sm:h-44 md:h-52 lg:h-56 w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.65)] drop-shadow-[0_8px_25px_rgba(28,176,246,0.12)] select-none pointer-events-none transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>


        {/* Coming Soon Headline with Outfit Font, Pure Silver/Platinum Shimmer & Descender Clearance */}
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
