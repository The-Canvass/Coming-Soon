# The Canvas — Coming Soon 🚀

A high-performance, single-screen **Coming Soon** teaser web application for **The Canvas** educational platform. Built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS**, styled in **Dark Mode Only** matching The Canvas brand identity, color palette, fonts, and assets.

---

## 🎨 Design & Brand Identity

- **Theme:** Dark Mode Only (Midnight Obsidian `#070a13` & `#0c1220`)
- **Brand Colors:**
  - **The Canvas Navy:** `#143363` (Dark: `#0c2146`, Light: `#1f4585`)
  - **Macaw Blue (Electric Cyan):** `#1cb0f6` (Dark: `#1899d6`)
  - **Brand Soft:** `#a9bde6`
  - **Brand Wash:** `#1e2a44`
- **Typography:**
  - **American Typewriter** (`/fonts/American-Typewriter-Regular.ttf`) for signature highlighted phrases.
  - **Inter** for headings.
  - **Nunito** / **Plus Jakarta Sans** for body and tactile controls.
- **Visual Features:**
  - Dynamic ambient constellation particle canvas with mouse interaction.
  - Glowing multi-layered ambient mesh gradients.
  - Tactile physical-feel 3D buttons (`border-b-4`, active spring press).
  - Real-time precision countdown clock (Days, Hours, Minutes, Seconds).
  - VIP Early Access Waitlist with role selection (Student, Parent, Educator, School), local storage ticket pass generation (`#TCA-XXXX`), and built-in confetti explosion.
  - Curriculum pillars marquee.
  - 4 Interactive feature sneak-peek cards with 3D tilt effects.
  - Development milestone roadmap.
  - Interactive FAQ accordion.
  - Web Audio API tactile sound synthesizer (opt-in audio toggle).

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Single Page)
- **UI & React:** React 19, TypeScript
- **Styling:** Tailwind CSS 3.4
- **Icons:** Lucide React
- **Animation & Effects:** Canvas Confetti, Custom WebGL/2D Canvas particles

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 🌐 Deploy to Your Domain

### Option A: Vercel (Recommended)
1. Push this repository to GitHub (`https://github.com/The-Canvass/Coming-Soon.git`).
2. Import the repository in [Vercel](https://vercel.com).
3. Connect your custom domain in **Project Settings > Domains**.

### Option B: Cloudflare Pages / Netlify
1. Connect the GitHub repository.
2. Build command: `npm run build`
3. Output directory: `.next` (or standard Next.js preset).

---

## 📄 License

&copy; The Canvas Academy. All rights reserved.
