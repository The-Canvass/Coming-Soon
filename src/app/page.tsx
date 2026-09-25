"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Share2,
  Volume2,
  VolumeX,
  Copy,
  ChevronDown,
  Compass,
  Check,
  Award,
  Layers,
  Zap,
  Target,
  GraduationCap,
} from "lucide-react";

// ==========================================================================
// TYPES & CONSTANTS
// ==========================================================================
type UserRole = "Student" | "Parent" | "Educator" | "School";

interface VipPass {
  email: string;
  role: UserRole;
  ticketId: string;
  timestamp: string;
}

const ROLES: { id: UserRole; label: string; icon: string }[] = [
  { id: "Student", label: "Student / Learner", icon: "🎓" },
  { id: "Parent", label: "Parent", icon: "👨‍👩‍👧" },
  { id: "Educator", label: "Teacher / Tutor", icon: "👩‍🏫" },
  { id: "School", label: "School / Academy", icon: "🏫" },
];

const CURRICULUM_SUBJECTS = [
  { emoji: "📐", name: "Math & Logic" },
  { emoji: "📚", name: "English & Literature" },
  { emoji: "🔬", name: "Science Experiments" },
  { emoji: "🌍", name: "World Languages" },
  { emoji: "💻", name: "Code & AI Foundations" },
  { emoji: "🎨", name: "Creative Design & Arts" },
];

const FEATURES = [
  {
    icon: Target,
    title: "Bite-Sized Quests",
    desc: "Complex academic topics broken down into 5-minute interactive quest steps that make difficult concepts click effortlessly.",
    badge: "Active Learning",
  },
  {
    icon: Zap,
    title: "Tactile Workspaces",
    desc: "Fluid digital scratchpads, live formula builders, and interactive sandboxes designed for hands-on experimentation.",
    badge: "Kinesthetic UI",
  },
  {
    icon: Award,
    title: "Proof of Mastery",
    desc: "Earn unlockable avatar cosmetics, dynamic mastery streaks, and verifiable certificates accredited for school standards.",
    badge: "Gamified Progress",
  },
  {
    icon: Layers,
    title: "Multi-Tenant Academy",
    desc: "Bespoke customized branded environments for tutoring academies, private schools, and individual master educators.",
    badge: "Enterprise SaaS",
  },
];

const FAQS = [
  {
    q: "When will The Canvas be available?",
    a: "We are currently in active closed alpha testing. VIP Waitlist members will receive priority onboarding invites in early 2027 before the public launch.",
  },
  {
    q: "Is joining the waitlist free?",
    a: "Yes, 100% free! Early waitlist members also receive lifetime Founding Member perks, including free bonus quest packs and exclusive avatar flairs.",
  },
  {
    q: "Can schools and tutoring academies use The Canvas?",
    a: "Yes! The Canvas is built on a multi-tenant enterprise architecture that allows schools, learning centers, and individual educators to host their own customized academies with bespoke branding.",
  },
  {
    q: "What grade levels and subjects are covered?",
    a: "The Canvas spans Elementary, Middle, and High School standards, featuring comprehensive tracks in Mathematics, English & Literature, Sciences, World Languages, and Coding.",
  },
];

export default function ComingSoonPage() {
  // State
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("Student");
  const [vipPass, setVipPass] = useState<VipPass | null>(null);
  const [formError, setFormError] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [vipCount, setVipCount] = useState(2842);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 14,
    minutes: 36,
    seconds: 22,
  });

  // Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Sound Synthesizer
  const playSound = (type: "click" | "success") => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      if (type === "click") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(620, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      } else if (type === "success") {
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
          gain.gain.setValueAtTime(0.09, ctx.currentTime + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.22);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.07);
          osc.stop(ctx.currentTime + idx * 0.07 + 0.22);
        });
      }
    } catch {}
  };

  // Trigger Toast Notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Load existing VIP Pass & Live Countdown
  useEffect(() => {
    const saved = localStorage.getItem("the_canvas_vip_pass");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setVipPass(parsed);
        setVipCount((prev) => prev + 1);
      } catch {}
    }

    // Target Launch Date (42 days from now)
    const targetDate = new Date(Date.now() + 42 * 24 * 60 * 60 * 1000 + 14 * 3600 * 1000);
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

    const mouse = { x: null as number | null, y: null as number | null, radius: 130 };
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

  // Handle Waitlist Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setFormError("Please enter a valid email address.");
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const passData: VipPass = {
      email: email.trim(),
      role: selectedRole,
      ticketId: `#TCA-${randomNum}`,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("the_canvas_vip_pass", JSON.stringify(passData));
    setVipPass(passData);
    setVipCount((prev) => prev + 1);

    // Confetti burst
    confetti({
      particleCount: 110,
      spread: 70,
      origin: { y: 0.65 },
      colors: ["#1cb0f6", "#143363", "#4a6db3", "#38bdf8", "#fbbf24", "#ffffff"],
    });

    playSound("success");
    triggerToast("You are officially on The Canvas VIP Priority List!");
  };

  // Copy Referral / Share Link
  const handleCopyLink = () => {
    playSound("click");
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      triggerToast("Invitation link copied to clipboard!");
    }
  };

  // Share on X
  const handleShareX = () => {
    playSound("click");
    if (typeof window !== "undefined") {
      const text = encodeURIComponent(
        "I just claimed my VIP Early Access to The Canvas — the next-generation educational platform! Join the waitlist: "
      );
      const url = encodeURIComponent(window.location.href);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070a13] text-foreground flex flex-col selection:bg-macaw-blue/30 selection:text-white overflow-hidden">
      
      {/* Background Interactive Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-65"
        aria-hidden="true"
      />

      {/* Ambient Mesh Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[15%] left-[10%] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,#1cb0f6_0%,rgba(20,51,99,0)_70%)] blur-[95px] opacity-25 animate-pulse-glow" />
        <div className="absolute top-[35%] -right-[10%] w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,#1f4585_0%,rgba(12,33,70,0)_70%)] blur-[100px] opacity-30 animate-pulse-glow" />
        <div className="absolute bottom-[5%] left-[20%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,#3b82f6_0%,rgba(20,51,99,0)_70%)] blur-[90px] opacity-20" />
      </div>

      {/* Ambient Subtle Grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_30%,black_20%,transparent_85%)]"
        aria-hidden="true"
      />

      {/* Main Container Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Sticky Tactile Top Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#070a13]/80 border-b border-white/5 transition-all">
          <div className="canvas-container h-16 sm:h-[72px] flex items-center justify-between">
            
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <div className="relative h-8 sm:h-9 w-auto flex items-center">
                <Image
                  src="/brand/Navbar.png"
                  alt="The Canvas Logo"
                  width={160}
                  height={40}
                  priority
                  className="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_2px_10px_rgba(28,176,246,0.25)]"
                />
              </div>
            </div>

            {/* Top Action Items */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              
              {/* Status Pill */}
              <div className="hidden md:inline-flex items-center gap-2 bg-macaw-blue/10 border border-macaw-blue/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-macaw-blue opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-macaw-blue" />
                </span>
                <span>Launching Soon &bull; Q1 2027</span>
              </div>

              {/* Sound Toggle */}
              <button
                type="button"
                onClick={() => {
                  const next = !soundEnabled;
                  setSoundEnabled(next);
                  triggerToast(next ? "Sound Effects: ON" : "Sound Effects: MUTED");
                  if (next) playSound("click");
                }}
                className="w-9 h-9 sm:w-10 sm:h-10 inline-flex items-center justify-center rounded-tactile bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-macaw-blue/50 hover:bg-white/10 transition-all active:scale-95 cursor-pointer"
                aria-label={soundEnabled ? "Mute sounds" : "Enable sound effects"}
                title={soundEnabled ? "Sound: ON" : "Sound: MUTED"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-macaw-blue" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Top Share Button */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="w-9 h-9 sm:w-10 sm:h-10 inline-flex items-center justify-center rounded-tactile bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-macaw-blue/50 hover:bg-white/10 transition-all active:scale-95 cursor-pointer"
                aria-label="Share page"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
              </button>

              {/* Quick Jump CTA */}
              <a
                href="#waitlist-section"
                onClick={() => playSound("click")}
                className="btn-tactile-primary px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm"
              >
                VIP Access
              </a>
            </div>

          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1">
          <section className="relative pt-10 sm:pt-14 pb-12 sm:pb-16 text-center">
            <div className="canvas-container max-w-4xl">
              
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-canvas-navy/60 border border-brand-soft/40 backdrop-blur-md shadow-lg shadow-black/30 mb-6 sm:mb-8 text-xs font-extrabold uppercase tracking-wider text-brand-soft">
                <Sparkles className="w-3.5 h-3.5 text-macaw-blue animate-spin" style={{ animationDuration: "6s" }} />
                <span>Architected for the Future of Learning</span>
              </div>

              {/* Floating Hero Mascot */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 mx-auto mb-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-macaw-blue/20 blur-xl animate-pulse-glow" />
                <div className="relative z-10 animate-hero-float">
                  <Image
                    src="/brand/hero-pencil-logo-lg.png"
                    alt="The Canvas Mascot"
                    width={140}
                    height={180}
                    priority
                    className="h-28 sm:h-32 w-auto object-contain drop-shadow-[0_12px_24px_rgba(28,176,246,0.35)]"
                  />
                </div>
              </div>

              {/* Display Headline */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tightest leading-[1.12] mb-6">
                Something Extraordinary is Taking Shape on{" "}
                <span className="font-typewriter text-macaw-blue drop-shadow-[0_0_25px_rgba(28,176,246,0.45)] inline-block">
                  The Canvas
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
                An all-in-one educational platform engineered for effortless understanding. From bite-sized interactive quests and tactile math workspaces to creative labs and accredited mastery badges.
              </p>

              {/* Precision Countdown Timer */}
              <div className="max-w-2xl mx-auto mb-12" aria-label="Countdown to Launch">
                <div className="grid grid-cols-4 gap-2.5 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-midnight/90 border border-brand/30 shadow-2xl backdrop-blur-xl">
                  
                  {/* Days */}
                  <div className="p-3 sm:p-5 rounded-tactile bg-gradient-to-b from-canvas-navy/50 to-midnight-card/80 border border-brand-soft/20 text-center relative overflow-hidden group hover:border-macaw-blue/50 transition-all">
                    <span className="block font-display text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                      {String(timeLeft.days).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-macaw-blue mt-1 block">
                      Days
                    </span>
                  </div>

                  {/* Hours */}
                  <div className="p-3 sm:p-5 rounded-tactile bg-gradient-to-b from-canvas-navy/50 to-midnight-card/80 border border-brand-soft/20 text-center relative overflow-hidden group hover:border-macaw-blue/50 transition-all">
                    <span className="block font-display text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-macaw-blue mt-1 block">
                      Hours
                    </span>
                  </div>

                  {/* Minutes */}
                  <div className="p-3 sm:p-5 rounded-tactile bg-gradient-to-b from-canvas-navy/50 to-midnight-card/80 border border-brand-soft/20 text-center relative overflow-hidden group hover:border-macaw-blue/50 transition-all">
                    <span className="block font-display text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-macaw-blue mt-1 block">
                      Minutes
                    </span>
                  </div>

                  {/* Seconds */}
                  <div className="p-3 sm:p-5 rounded-tactile bg-gradient-to-b from-canvas-navy/50 to-midnight-card/80 border border-brand-soft/20 text-center relative overflow-hidden group hover:border-macaw-blue/50 transition-all">
                    <span className="block font-display text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-macaw-blue mt-1 block">
                      Seconds
                    </span>
                  </div>

                </div>
              </div>

              {/* VIP Early Access Card */}
              <div
                id="waitlist-section"
                className="max-w-xl mx-auto rounded-3xl p-6 sm:p-9 bg-gradient-to-b from-midnight-card/90 via-midnight/90 to-midnight/95 border border-brand/40 shadow-2xl backdrop-blur-2xl relative"
              >
                
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
                    Claim Your VIP Priority Access
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300">
                    Lock in lifetime Founding Member status, zero-fee access, and early preview builds.
                  </p>
                </div>

                {!vipPass ? (
                  <>
                    {/* Role Picker */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6" role="radiogroup">
                      {ROLES.map((role) => (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => {
                            playSound("click");
                            setSelectedRole(role.id);
                          }}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer select-none ${
                            selectedRole === role.id
                              ? "bg-macaw-blue/20 border-2 border-macaw-blue text-macaw-blue shadow-lg shadow-macaw-blue/20"
                              : "bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <span>{role.icon}</span> <span className="ml-1">{role.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Waitlist Form */}
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address..."
                          required
                          className="flex-1 h-12 sm:h-14 px-4 rounded-tactile bg-slate-950/80 border-2 border-brand/40 text-white placeholder-slate-500 focus:outline-none focus:border-macaw-blue focus:ring-4 focus:ring-macaw-blue/20 transition-all text-sm sm:text-base"
                        />
                        <button
                          type="submit"
                          className="btn-tactile-cyan h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base"
                        >
                          <span>Join VIP List</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                      {formError && (
                        <p className="text-xs sm:text-sm font-semibold text-rose-400 text-center">
                          {formError}
                        </p>
                      )}
                    </form>
                  </>
                ) : (
                  /* Holographic VIP Ticket Pass */
                  <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-canvas-navy/60 to-midnight/90 border-2 border-dashed border-macaw-blue text-left animate-in fade-in zoom-in-95 duration-300">
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                          Official Priority Ticket
                        </span>
                        <span className="text-lg sm:text-xl font-black text-macaw-blue tracking-wider">
                          {vipPass.ticketId}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 text-xs font-extrabold">
                        <Check className="w-3.5 h-3.5" /> CONFIRMED
                      </span>
                    </div>

                    <div className="mb-5">
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                        Welcome to The Canvas Vanguard!
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300">
                        Registered as <strong className="text-macaw-blue">{vipPass.role}</strong> &bull; Priority invitation will be dispatched directly to your inbox upon beta rollout.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-tactile bg-white/5 border border-white/10 text-xs font-bold text-slate-200 hover:text-macaw-blue hover:border-macaw-blue/40 transition-all active:scale-95 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copy Invite Link
                      </button>
                      <button
                        type="button"
                        onClick={handleShareX}
                        className="btn-tactile-primary px-4 py-2 text-xs font-bold"
                      >
                        Share on X
                      </button>
                    </div>
                  </div>
                )}

                {/* Social Proof Strip with Real Avatars */}
                <div className="flex items-center justify-center gap-3.5 mt-7 pt-5 border-t border-white/5">
                  <div className="flex -space-x-2.5">
                    <Image
                      src="/avatars/astro_fox.jpg"
                      alt="Student Avatar"
                      width={34}
                      height={34}
                      className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover"
                    />
                    <Image
                      src="/avatars/canvas_ninja.jpg"
                      alt="Student Avatar"
                      width={34}
                      height={34}
                      className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover"
                    />
                    <Image
                      src="/avatars/creative_artist.jpg"
                      alt="Student Avatar"
                      width={34}
                      height={34}
                      className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover"
                    />
                    <Image
                      src="/avatars/scholar_owl.jpg"
                      alt="Student Avatar"
                      width={34}
                      height={34}
                      className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover"
                    />
                    <Image
                      src="/avatars/super_student.jpg"
                      alt="Student Avatar"
                      width={34}
                      height={34}
                      className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 font-semibold">
                    Joined by <strong className="text-white font-extrabold">{vipCount.toLocaleString()}</strong> students, parents & educators
                  </p>
                </div>

              </div>

            </div>
          </section>

          {/* Curriculum Subjects Marquee Strip */}
          <section className="py-6 sm:py-8 border-y border-white/5 bg-slate-950/40" aria-label="Subjects">
            <div className="canvas-container">
              <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3.5">
                {CURRICULUM_SUBJECTS.map((sub, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-midnight-card/80 border border-slate-800 text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-300 hover:text-white hover:border-macaw-blue/60 hover:bg-macaw-blue/10 transition-all shadow-sm select-none"
                  >
                    <span className="text-base">{sub.emoji}</span>
                    <span>{sub.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Feature Sneak Peek Section */}
          <section className="py-16 sm:py-24">
            <div className="canvas-container">
              
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-xs font-extrabold uppercase tracking-widest text-macaw-blue block mb-2">
                  Sneak Peek
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
                  What Makes The Canvas Different?
                </h2>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                  We reimagined online education from the ground up — replacing passive video lectures with active, hands-on discovery and tactile problem-solving.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {FEATURES.map((feat, idx) => {
                  const Icon = feat.icon;
                  return (
                    <div
                      key={idx}
                      className="card-tactile p-6 sm:p-7 relative group flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-12 h-12 rounded-tactile bg-macaw-blue/10 border border-macaw-blue/30 flex items-center justify-center text-macaw-blue mb-5 group-hover:scale-110 group-hover:bg-macaw-blue/20 transition-all">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-soft block mb-1">
                          {feat.badge}
                        </span>
                        <h3 className="text-lg font-bold text-white mb-2.5">
                          {feat.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </section>

          {/* Development Roadmap */}
          <section className="py-12 sm:py-20 border-t border-white/5 bg-slate-950/30">
            <div className="canvas-container">
              
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-extrabold uppercase tracking-widest text-macaw-blue block mb-2">
                  Flight Plan
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
                  Development Milestones
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Our engineering team is actively building and fine-tuning every aspect of The Canvas platform.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                
                <div className="p-5 rounded-tactile bg-emerald-500/5 border border-emerald-500/30">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider mb-3">
                    Phase 01 &bull; Complete
                  </span>
                  <h3 className="text-base font-bold text-white mb-1.5">Architecture & Design Core</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Clean architecture backend, PostgreSQL schema, tactile design system, and multi-tenant foundation completed.
                  </p>
                </div>

                <div className="p-5 rounded-tactile bg-macaw-blue/10 border border-macaw-blue/40 shadow-lg shadow-macaw-blue/10">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-macaw-blue/20 text-macaw-blue text-[10px] font-extrabold uppercase tracking-wider mb-3">
                    Phase 02 &bull; Active
                  </span>
                  <h3 className="text-base font-bold text-white mb-1.5">Closed Alpha Testing</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Testing interactive quest engine, real-time video delivery, and tactile problem solvers with select founding educators.
                  </p>
                </div>

                <div className="p-5 rounded-tactile bg-white/[0.03] border border-white/10">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-white/10 text-slate-400 text-[10px] font-extrabold uppercase tracking-wider mb-3">
                    Phase 03 &bull; Next
                  </span>
                  <h3 className="text-base font-bold text-white mb-1.5">VIP Early Access Beta</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Opening the gates to priority waitlist members for exclusive course catalog exploration and early feedback.
                  </p>
                </div>

                <div className="p-5 rounded-tactile bg-white/[0.03] border border-white/10">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-white/10 text-slate-400 text-[10px] font-extrabold uppercase tracking-wider mb-3">
                    Phase 04 &bull; Launch
                  </span>
                  <h3 className="text-base font-bold text-white mb-1.5">Global Public Launch</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Full worldwide rollout across web and mobile with hundreds of certified masterclasses and school curricula.
                  </p>
                </div>

              </div>

            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="py-16 sm:py-24">
            <div className="canvas-container max-w-3xl">
              
              <div className="text-center mb-12">
                <span className="text-xs font-extrabold uppercase tracking-widest text-macaw-blue block mb-2">
                  Got Questions?
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className={`rounded-tactile border transition-all ${
                      openFaq === idx
                        ? "bg-midnight-card/90 border-macaw-blue/60"
                        : "bg-midnight/70 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        playSound("click");
                        setOpenFaq(openFaq === idx ? null : idx);
                      }}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white cursor-pointer select-none"
                      aria-expanded={openFaq === idx}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-macaw-blue flex-shrink-0 transition-transform duration-200 ${
                          openFaq === idx ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-200">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </section>

        </main>

        {/* Structured Tactical Footer */}
        <footer className="border-t border-white/10 bg-[#05070e] py-10">
          <div className="canvas-container flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            
            <div className="flex items-center gap-3">
              <Image
                src="/brand/Main Wordmark White.png"
                alt="The Canvas"
                width={140}
                height={32}
                className="h-7 w-auto object-contain"
              />
            </div>

            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} The Canvas Academy. All rights reserved. &bull; Engineered for excellence.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-tactile bg-white/5 border border-white/10 inline-flex items-center justify-center text-slate-400 hover:text-white hover:border-macaw-blue transition-all"
                aria-label="Twitter"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-tactile bg-white/5 border border-white/10 inline-flex items-center justify-center text-slate-400 hover:text-white hover:border-macaw-blue transition-all"
                aria-label="Discord"
              >
                <Compass className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/The-Canvass"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-tactile bg-white/5 border border-white/10 inline-flex items-center justify-center text-slate-400 hover:text-white hover:border-macaw-blue transition-all"
                aria-label="GitHub"
              >
                <GraduationCap className="w-4 h-4" />
              </a>
            </div>

          </div>
        </footer>

      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-tactile bg-midnight-card/95 border-2 border-macaw-blue text-white text-xs sm:text-sm font-bold shadow-2xl backdrop-blur-xl animate-in slide-in-from-right duration-300 flex items-center gap-2">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
