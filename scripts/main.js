/**
 * THE CANVAS — COMING SOON INTERACTIVE ENGINE
 * Features:
 * - Ambient Particle & Constellation Canvas
 * - Real-Time Target Countdown Clock
 * - VIP Early Access Waitlist & Holographic Ticket Generator
 * - Built-in Canvas Confetti Cannon
 * - Web Audio API Tactile Sound Engine (Opt-in)
 * - 3D Interactive Card Parallax / Tilt
 * - Interactive Accordions & Toast Manager
 */

(function () {
  'use strict';

  // ==========================================================================
  // CONFIGURATION & CONSTANTS
  // ==========================================================================
  const CONFIG = {
    // Target Launch Date: 45 days from current date or fixed milestone
    targetDate: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000),
    storageKey: 'the_canvas_vip_pass',
    initialVipCount: 2842,
  };

  // ==========================================================================
  // AMBIENT CONSTELLATION & PARTICLE CANVAS
  // ==========================================================================
  class BackgroundCanvas {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.particleCount = window.innerWidth < 768 ? 40 : 85;
      this.mouse = { x: null, y: null, radius: 140 };

      this.init();
    }

    init() {
      this.resize();
      window.addEventListener('resize', () => this.resize());
      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      });
      window.addEventListener('mouseleave', () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });

      this.createParticles();
      this.animate();
    }

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    createParticles() {
      this.particles = [];
      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          radius: Math.random() * 2 + 0.8,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          color: Math.random() > 0.4 ? 'rgba(28, 176, 246, ' : 'rgba(74, 109, 179, ',
          baseAlpha: Math.random() * 0.5 + 0.25,
        });
      }
    }

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Update & Draw Particles
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

        // Mouse interactive repulsion / glow
        let alpha = p.baseAlpha;
        if (this.mouse.x !== null && this.mouse.y !== null) {
          const dx = this.mouse.x - p.x;
          const dy = this.mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < this.mouse.radius) {
            alpha = Math.min(0.9, p.baseAlpha + (1 - dist / this.mouse.radius) * 0.5);
          }
        }

        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color + alpha + ')';
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = '#1cb0f6';
        this.ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < this.particles.length; j++) {
          const p2 = this.particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 110;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.18;
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.strokeStyle = `rgba(28, 176, 246, ${lineAlpha})`;
            this.ctx.lineWidth = 0.8;
            this.ctx.shadowBlur = 0;
            this.ctx.stroke();
          }
        }
      }

      requestAnimationFrame(() => this.animate());
    }
  }

  // ==========================================================================
  // CONFETTI CANNON ENGINE
  // ==========================================================================
  function fireConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#1cb0f6', '#143363', '#4a6db3', '#38bdf8', '#fbbf24', '#ffffff'];
    const particles = [];

    for (let i = 0; i < 110; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 80,
        y: canvas.height * 0.65,
        w: Math.random() * 8 + 4,
        h: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 18 - 8,
        gravity: 0.5,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
      });
    }

    let frames = 0;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotSpeed;
        p.opacity -= 0.009;

        if (p.opacity > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      });

      frames++;
      if (alive && frames < 240) {
        requestAnimationFrame(render);
      } else {
        canvas.remove();
      }
    }
    render();
  }

  // ==========================================================================
  // WEB AUDIO SYNTHESIZER FOR TACTILE SOUNDS
  // ==========================================================================
  class SoundEngine {
    constructor() {
      this.enabled = false;
      this.audioCtx = null;
    }

    init() {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.audioCtx = new AudioContext();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    }

    playClick() {
      if (!this.enabled) return;
      this.init();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.audioCtx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.05);
    }

    playSuccess() {
      if (!this.enabled) return;
      this.init();
      if (!this.audioCtx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.09, this.audioCtx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + idx * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(this.audioCtx.currentTime + idx * 0.08);
        osc.stop(this.audioCtx.currentTime + idx * 0.08 + 0.25);
      });
    }
  }

  const sound = new SoundEngine();

  // ==========================================================================
  // TOAST NOTIFICATIONS
  // ==========================================================================
  function showToast(message, icon = '✨') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'all 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(60px)';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // ==========================================================================
  // COUNTDOWN TIMER CONTROLLER
  // ==========================================================================
  function initCountdown() {
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    function update() {
      const now = new Date().getTime();
      const diff = CONFIG.targetDate.getTime() - now;

      if (diff <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minsEl.textContent = '00';
        secsEl.textContent = '00';
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      daysEl.textContent = d < 10 ? '0' + d : d;
      hoursEl.textContent = h < 10 ? '0' + h : h;
      minsEl.textContent = m < 10 ? '0' + m : m;
      secsEl.textContent = s < 10 ? '0' + s : s;
    }

    update();
    setInterval(update, 1000);
  }

  // ==========================================================================
  // VIP WAITLIST & TICKET LOGIC
  // ==========================================================================
  function initWaitlist() {
    const form = document.getElementById('waitlist-form');
    const emailInput = document.getElementById('email-input');
    const feedback = document.getElementById('form-feedback');
    const ticketContainer = document.getElementById('ticket-container');
    const ticketIdEl = document.getElementById('ticket-id');
    const ticketRoleEl = document.getElementById('ticket-role');
    const roleChips = document.querySelectorAll('.role-chip');
    const vipCountEl = document.getElementById('vip-count');

    let selectedRole = 'Student';

    // Role Picker handler
    roleChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        sound.playClick();
        roleChips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        selectedRole = chip.dataset.role || chip.textContent.trim();
      });
    });

    // Check if user already registered previously
    const existingPass = localStorage.getItem(CONFIG.storageKey);
    if (existingPass) {
      try {
        const pass = JSON.parse(existingPass);
        renderTicket(pass);
      } catch (e) {}
    }

    function renderTicket(pass) {
      if (!ticketContainer) return;
      if (form) form.style.display = 'none';
      if (ticketIdEl) ticketIdEl.textContent = pass.ticketId;
      if (ticketRoleEl) ticketRoleEl.textContent = pass.role;
      ticketContainer.style.display = 'block';

      if (vipCountEl) {
        vipCountEl.textContent = (CONFIG.initialVipCount + 1).toLocaleString();
      }
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();

        // Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          feedback.textContent = '⚠️ Please enter a valid email address.';
          feedback.className = 'form-feedback error';
          feedback.style.display = 'flex';
          emailInput.focus();
          return;
        }

        // Generate VIP Pass
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const passData = {
          email: email,
          role: selectedRole,
          ticketId: `#TCA-${randomNum}`,
          timestamp: new Date().toISOString(),
        };

        localStorage.setItem(CONFIG.storageKey, JSON.stringify(passData));

        feedback.style.display = 'none';
        sound.playSuccess();
        fireConfetti();
        renderTicket(passData);
        showToast('You are officially on The Canvas VIP Priority List!', '🎉');
      });
    }

    // Copy Referral link button
    const copyLinkBtn = document.getElementById('copy-invite-btn');
    if (copyLinkBtn) {
      copyLinkBtn.addEventListener('click', () => {
        sound.playClick();
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast('Invitation link copied to clipboard!', '📋');
        });
      });
    }

    // Share on X (Twitter)
    const shareXBtn = document.getElementById('share-x-btn');
    if (shareXBtn) {
      shareXBtn.addEventListener('click', () => {
        sound.playClick();
        const text = encodeURIComponent(
          "I just claimed my VIP Early Access to The Canvas — the next-generation educational platform! Join the waitlist: "
        );
        const url = encodeURIComponent(window.location.href);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
      });
    }
  }

  // ==========================================================================
  // INTERACTIVE FAQ ACCORDIONS
  // ==========================================================================
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
      const trigger = item.querySelector('.faq-trigger');
      if (trigger) {
        trigger.addEventListener('click', () => {
          sound.playClick();
          const isOpen = item.classList.contains('open');
          // Close others
          faqItems.forEach((i) => i.classList.remove('open'));
          if (!isOpen) {
            item.classList.add('open');
          }
        });
      }
    });
  }

  // ==========================================================================
  // SOUND TOGGLE & TOP ACTIONS
  // ==========================================================================
  function initSoundToggle() {
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (!soundBtn) return;

    soundBtn.addEventListener('click', () => {
      sound.enabled = !sound.enabled;
      if (sound.enabled) {
        sound.init();
        sound.playClick();
        soundBtn.innerHTML = '🔊';
        soundBtn.setAttribute('title', 'Sound Effects: ON');
        showToast('Sound Effects Enabled', '🔊');
      } else {
        soundBtn.innerHTML = '🔇';
        soundBtn.setAttribute('title', 'Sound Effects: OFF');
        showToast('Sound Effects Muted', '🔇');
      }
    });

    const shareTopBtn = document.getElementById('share-top-btn');
    if (shareTopBtn) {
      shareTopBtn.addEventListener('click', () => {
        sound.playClick();
        if (navigator.share) {
          navigator.share({
            title: 'The Canvas — Coming Soon',
            text: 'Discover the next generation of intuitive, engaging learning.',
            url: window.location.href,
          }).catch(() => {});
        } else {
          navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('Page link copied to clipboard!', '🔗');
          });
        }
      });
    }
  }

  // ==========================================================================
  // 3D CARD TILT PARALLAX EFFECT
  // ==========================================================================
  function init3DTilt() {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // ==========================================================================
  // INITIALIZATION ON DOM CONTENT LOADED
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    new BackgroundCanvas('bg-canvas');
    initCountdown();
    initWaitlist();
    initFAQ();
    initSoundToggle();
    init3DTilt();

    // Attach click sound to general interactive buttons
    document.querySelectorAll('.btn, .subject-pill').forEach((btn) => {
      btn.addEventListener('click', () => sound.playClick());
    });
  });
})();
