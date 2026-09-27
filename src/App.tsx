import { useState, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { ArrowDown, Terminal, Menu, X, FileText, ChevronLeft, ChevronRight, GraduationCap, Trophy, Users, Mail, Github, Linkedin, Code, ExternalLink, Flame, CheckCircle2, Copy, Check } from "lucide-react";

import { getTechCategories } from "@/data/techStack";
import { getSocials } from "@/data/socials";
import ProjectsSection from "@/components/ProjectsSection";
import CodingActivitySection from "@/components/CodingActivitySection";
import AchievementsSection from "@/components/AchievementsSection";

/* ─── global CSS ─────────────────────────────────────────────────────────── */
const PORTFOLIO_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }
body { font-family: 'Syne', sans-serif; }
code, .mono { font-family: 'DM Mono', monospace; }
.serif { font-family: 'Instrument Serif', serif; font-style: italic; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-up   { animation: fadeUp 0.7s ease both; }
.fade-up-1 { animation-delay: 0.08s; }
.fade-up-2 { animation-delay: 0.18s; }
.fade-up-3 { animation-delay: 0.30s; }
.fade-up-4 { animation-delay: 0.42s; }
.fade-up-5 { animation-delay: 0.54s; }

@keyframes blink-soft {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.35; }
}
.blink-dot { animation: blink-soft 2s ease-in-out infinite; }

@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.shimmer-text {
  background-size: 200% auto;
  animation: shimmer 6s linear infinite;
}

.noise-bg::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: -1;
  opacity: 0.6;
}

.glass-dark {
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(16px) saturate(1.4);
  border: 1px solid rgba(255,255,255,0.08);
}
.glass-light {
  background: rgba(255,255,255,0.65);
  backdrop-filter: blur(16px) saturate(1.6);
  border: 1px solid rgba(255,255,255,0.5);
}

.grid-lines {
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 48px 48px;
}

.tech-tile {
  position: relative;
  transition: transform 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
}
.tech-tile::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(249,115,22,0.7), rgba(239,68,68,0.5));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
}
.tech-tile:hover { transform: translateY(-3px); }
.tech-tile:hover::after { opacity: 1; }

.reveal {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes splash-fadeout {
  0%   { opacity: 1; visibility: visible; }
  100% { opacity: 0; visibility: hidden; }
}
.splash {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  animation: splash-fadeout 0.7s ease 1.4s forwards;
}
.splash-mark {
  font-family: 'Instrument Serif', serif;
  font-style: italic;
  font-size: clamp(48px, 10vw, 120px);
  letter-spacing: -0.02em;
  line-height: 1;
  background: linear-gradient(135deg, #fb923c, #f59e0b, #ef4444);
  -webkit-background-clip: text;
          background-clip: text;
  color: transparent;
  position: relative;
  animation: fadeUp 0.6s ease 0.05s both;
}

@keyframes menu-drop {
  from { opacity: 0; transform: translateY(-8px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
.menu-drop { animation: menu-drop 0.22s cubic-bezier(0.22, 1, 0.36, 1) both; transform-origin: top right; }

.nav-pill { position: relative; }
.nav-pill[data-active="true"]::before {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -4px;
  width: 4px;
  height: 4px;
  border-radius: 999px;
  transform: translateX(-50%);
  background: currentColor;
}
`;

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "stack", label: "Stack" },
  { id: "activity", label: "Coding Stats" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "extracurricular", label: "Extracurricular" },
  { id: "contact", label: "Contact" },
] as const;

interface NavbarProps {
  darkMode: boolean;
  active: string;
}

function Navbar({ darkMode, active }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4 pointer-events-none">
      <nav
        className="pointer-events-auto mx-auto max-w-4xl flex items-center justify-between gap-2 px-3 py-3 rounded-2xl glass-dark shadow-xl"
      >
        <a
          href="#home"
          onClick={closeMenu}
          className="mono text-xs uppercase tracking-widest px-2 py-1 rounded-lg flex items-center gap-1.5 text-orange-400"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>nayan<span className="text-orange-500">.dev</span></span>
        </a>

        <ul className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                data-active={active === l.id}
                className={`nav-pill mono text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-lg transition-colors duration-200 ${
                  active === l.id ? "text-white" : "text-stone-400 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden p-2 rounded-xl border border-white/10 bg-white/5 text-stone-200 hover:bg-white/10 cursor-pointer"
        >
          {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="menu-drop sm:hidden pointer-events-auto mx-auto max-w-4xl mt-2 rounded-2xl overflow-hidden glass-dark shadow-xl">
          <ul className="flex flex-col py-2">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={closeMenu}
                  className={`flex items-center justify-between mono text-xs uppercase tracking-widest px-5 py-3 transition-colors duration-150 ${
                    active === l.id ? "text-orange-300 bg-white/5" : "text-stone-300 hover:bg-white/5"
                  }`}
                >
                  <span>{l.label}</span>
                  <span className="opacity-50">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

/* ─── Hero Component ─── */
interface HeroProps {
  darkMode: boolean;
  socials: ReturnType<typeof getSocials>;
  onEmailClick?: (e: React.MouseEvent) => void;
}

const HERO_STATS = [
  { value: "9.21", label: "B.Tech CS CGPA" },
  { value: "1st", label: "ZenESYS Winner" },
  { value: "∞", label: "Tea & Code" },
];

function Hero({ darkMode, socials, onEmailClick }: HeroProps) {
  const accent = "from-orange-400 via-amber-300 to-red-300";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-6 pt-28 pb-20 overflow-hidden grid-lines"
    >
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-5 fade-up fade-up-1">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 blink-dot" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="mono text-xs uppercase tracking-[0.2em] text-emerald-300 font-semibold">
            Available for work · Pune, India
          </span>
        </div>

        <p className="mono text-xs sm:text-sm uppercase tracking-widest mb-3 fade-up fade-up-2 text-stone-400 font-medium">
          Hi, I'm Nayan —
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.03] tracking-tight mb-6 fade-up fade-up-2">
          <span className="text-white">I build</span>
          <br />
          <span className={`bg-clip-text text-transparent bg-gradient-to-r ${accent} shimmer-text`}>
            full-stack
          </span>
          <br />
          <span className="text-white">systems</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl max-w-2xl mb-7 leading-relaxed fade-up fade-up-3 text-stone-300 font-normal">
          3rd-year CS student who builds real things, not just assignments — C++, Java, Python, JavaScript, React, Next.js, Node.js.
        </p>

        <div className="max-w-xl mb-9 fade-up fade-up-3 pl-4 border-l-3 border-orange-400/80">
          <p className="serif text-lg sm:text-xl md:text-2xl leading-snug text-stone-100 font-medium">
            "Understand first. Build second."
          </p>
          <p className="mono text-[11px] sm:text-xs uppercase tracking-[0.2em] mt-1.5 text-stone-400">
            — find what's actually broken before you touch the code
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-10 fade-up fade-up-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-white text-slate-900 hover:bg-stone-100 transition-all duration-200 hover:scale-[1.02]"
          >
            See my work
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="https://leetcode.com/u/nayank_2616/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border border-amber-400/40 text-amber-300 hover:bg-amber-500/10 transition-all duration-200 hover:scale-[1.02]"
          >
            <Code className="w-4 h-4" />
            LeetCode Profile
          </a>
          <a
            href="https://github.com/nayanrk261"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border border-orange-400/40 text-orange-300 hover:bg-orange-500/10 transition-all duration-200 hover:scale-[1.02]"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 fade-up fade-up-5 pt-8 border-t border-white/10">
          <div className="flex items-center gap-3">
            <span className="mono text-[10px] uppercase tracking-widest text-stone-600">
              find me
            </span>
            <span className="h-px w-8 bg-white/10" />
            <div className="flex gap-2">
              <a
                href="https://github.com/nayanrk261"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/12 hover:border-orange-500/40 text-stone-200 transition-all duration-200 hover:scale-110"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://leetcode.com/u/nayank_2616/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
                className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/12 hover:border-amber-500/40 text-amber-400 transition-all duration-200 hover:scale-110"
              >
                <Code className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/nayan-khandelwal-a88504268/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/12 hover:border-orange-500/40 text-stone-200 transition-all duration-200 hover:scale-110"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:nayankhandelwal261@gmail.com"
                onClick={onEmailClick}
                aria-label="Email"
                title="Send Email: nayankhandelwal261@gmail.com"
                className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/12 hover:border-orange-500/40 text-stone-200 transition-all duration-200 hover:scale-110 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:w-auto rounded-xl overflow-hidden bg-white/[0.03] border border-white/8">
            {HERO_STATS.map((s, i) => (
              <div
                key={s.label}
                className={`px-4 py-2.5 text-center ${
                  i < HERO_STATS.length - 1 ? "border-r border-white/8" : ""
                }`}
              >
                <div className="text-base font-bold text-white">
                  {s.value}
                </div>
                <div className="mono text-[9px] uppercase tracking-wider text-stone-500 whitespace-nowrap">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 fade-up fade-up-5">
          <span className="mono text-[10px] uppercase tracking-widest text-stone-600">
            scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ─── Stack Matrix ─── */
interface TechCellProps {
  tech: { name: string; icon: string };
  darkMode: boolean;
  index: number;
}

function TechCell({ tech }: TechCellProps) {
  return (
    <div
      className="group relative rounded-xl sm:rounded-2xl flex flex-col items-center justify-center p-3 sm:p-4 bg-[#18181b]/80 border border-white/[0.08] hover:border-orange-500/40 hover:bg-[#222226] transition-all duration-200 hover:-translate-y-1 shadow-sm aspect-square cursor-default"
      title={tech.name}
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain filter drop-shadow" />
      </div>
      <span className="mono text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-stone-400 group-hover:text-stone-100 transition-colors duration-200 text-center line-clamp-1 mt-2">
        {tech.name}
      </span>
    </div>
  );
}

interface StackMatrixProps {
  darkMode: boolean;
}

function StackMatrix({ darkMode }: StackMatrixProps) {
  const categories = useMemo(() => getTechCategories(darkMode), [darkMode]);

  return (
    <section id="stack" className="relative px-6 py-20 overflow-hidden scroll-mt-20">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="reveal mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="mono text-[11px] uppercase tracking-[0.2em] text-orange-400">
              01 — toolkit
            </span>
            <h2 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              The Stack <span className="serif font-normal opacity-70">Matrix</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-stone-400">
            Organized technologies and tools used for building full-stack applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Languages & Frameworks (01) */}
          {categories[0] && (
            <div className="lg:col-span-7 reveal relative rounded-2xl md:rounded-3xl p-5 md:p-7 bg-[#121215] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#2b180d] text-orange-400 border border-orange-500/30">
                    01
                  </span>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                    {categories[0].label}
                  </h3>
                </div>
                <span className="mono text-xs text-stone-500 font-mono">
                  {categories[0].items.length}
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {categories[0].items.map((tech, i) => (
                  <TechCell key={tech.name} tech={tech} darkMode={darkMode} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* Databases (02) */}
          {categories[1] && (
            <div className="lg:col-span-5 reveal relative rounded-2xl md:rounded-3xl p-5 md:p-7 bg-[#121215] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#2b180d] text-orange-400 border border-orange-500/30">
                    02
                  </span>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                    {categories[1].label}
                  </h3>
                </div>
                <span className="mono text-xs text-stone-500 font-mono">
                  {categories[1].items.length}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {categories[1].items.map((tech, i) => (
                  <TechCell key={tech.name} tech={tech} darkMode={darkMode} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* Tools & Platforms (03) */}
          {categories[2] && (
            <div className="lg:col-span-7 reveal relative rounded-2xl md:rounded-3xl p-5 md:p-7 bg-[#121215] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#2b180d] text-orange-400 border border-orange-500/30">
                    03
                  </span>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                    {categories[2].label}
                  </h3>
                </div>
                <span className="mono text-xs text-stone-500 font-mono">
                  {categories[2].items.length}
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {categories[2].items.map((tech, i) => (
                  <TechCell key={tech.name} tech={tech} darkMode={darkMode} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}



/* ─── Extracurricular Section ─── */
function ExtracurricularSection() {
  return (
    <section id="extracurricular" className="relative px-6 py-20 overflow-hidden scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-12">
          <span className="mono text-[11px] uppercase tracking-[0.2em] text-orange-400 font-semibold">
            05 — leadership & community
          </span>
          <h2 className="mt-2 text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Extracurricular <span className="serif font-normal opacity-70">& Roles</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="reveal rounded-2xl p-6 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Vice President</h3>
                <p className="mono text-xs text-amber-400">AR/VR Club · GHRCEMP</p>
              </div>
            </div>
            <p className="text-sm text-stone-300 leading-relaxed">
              Leading club operations, strategic direction, tech events, and team initiatives for the AR/VR Club.
            </p>
            <p className="mono text-xs text-stone-500 mt-4">
              Sep 2026 – Present
            </p>
          </div>

          <div className="reveal rounded-2xl p-6 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Research Associate</h3>
                <p className="mono text-xs text-orange-400">AR/VR Club · GHRCEMP</p>
              </div>
            </div>
            <p className="text-sm text-stone-300 leading-relaxed">
              Contributing to immersive technology research initiatives and technical projects as part of the college's AR/VR Club.
            </p>
            <p className="mono text-xs text-stone-500 mt-4">
              Oct 2025 – Sep 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Splash() {
  const [mounted, setMounted] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("splash-seen");
  });

  useEffect(() => {
    if (!mounted) return;
    const t = setTimeout(() => {
      sessionStorage.setItem("splash-seen", "1");
      setMounted(false);
    }, 2200);
    return () => clearTimeout(t);
  }, [mounted]);

  if (!mounted) return null;
  return createPortal(
    <div className="splash bg-stone-950" aria-hidden="true">
      <div className="relative">
        <span className="splash-mark">nayan.dev</span>
      </div>
    </div>,
    document.body
  );
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}
function Parallax({ children, speed = 0.08, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${center * -speed}px, 0)`;
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);
  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

export default function App() {
  const darkMode = true;
  const [activeSection, setActiveSection] = useState<string>("home");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 3000);
  };

  const handleEmailClick = () => {
    navigator.clipboard.writeText("nayankhandelwal261@gmail.com");
    showToast("Email copied to clipboard! (nayankhandelwal261@gmail.com)");
  };

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const id = "portfolio-styles";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = PORTFOLIO_CSS;
      document.head.appendChild(s);
    }
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const socials = useMemo(() => getSocials(darkMode), [darkMode]);

  useScrollReveal();

  return (
    <div className="min-h-screen relative noise-bg bg-stone-950 text-stone-100 transition-colors duration-500">
      <Splash />

      <Navbar darkMode={darkMode} active={activeSection} />

      <Hero darkMode={darkMode} socials={socials} onEmailClick={handleEmailClick} />

      <StackMatrix darkMode={darkMode} />

      <CodingActivitySection />

      <div id="projects" className="scroll-mt-20">
        <ProjectsSection darkMode={darkMode} />
      </div>

      <AchievementsSection />

      <ExtracurricularSection />

      {/* footer / contact */}
      <footer id="contact" className="relative scroll-mt-20 border-t border-white/6">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="reveal text-center mb-12">
            <span className="mono text-[11px] uppercase tracking-[0.22em] text-orange-400 font-semibold">
              06 — contact
            </span>
            <h2 className="mt-3 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              Let's build <span className="serif font-normal opacity-90">something.</span>
            </h2>
            <p className="mt-4 text-base md:text-lg max-w-md mx-auto text-stone-400">
              Open to full-stack developer roles, internships, and high-impact projects.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <a
                href="mailto:nayankhandelwal261@gmail.com"
                onClick={handleEmailClick}
                className="mono text-xs tracking-widest px-4 py-2.5 rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-300 hover:bg-orange-500/20 transition-all flex items-center gap-2 font-medium"
              >
                <Mail className="w-4 h-4" />
                nayankhandelwal261@gmail.com
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("nayankhandelwal261@gmail.com");
                  showToast("Email copied to clipboard!");
                }}
                title="Copy email to clipboard"
                className="mono text-xs uppercase tracking-widest px-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-stone-300 hover:bg-white/10 hover:border-orange-400/40 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </button>
              <a
                href="https://github.com/nayanrk261"
                target="_blank"
                rel="noopener noreferrer"
                className="mono text-xs uppercase tracking-widest px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-stone-200 hover:bg-white/10 hover:border-orange-400/40 transition-all flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://leetcode.com/u/nayank_2616/"
                target="_blank"
                rel="noopener noreferrer"
                className="mono text-xs uppercase tracking-widest px-4 py-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition-all flex items-center gap-2"
              >
                <Code className="w-4 h-4" />
                LeetCode
              </a>
              <a
                href="https://www.linkedin.com/in/nayan-khandelwal-a88504268/"
                target="_blank"
                rel="noopener noreferrer"
                className="mono text-xs uppercase tracking-widest px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-stone-200 hover:bg-white/10 hover:border-orange-400/40 transition-all flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/6">
            <span className="mono text-[10px] uppercase tracking-widest text-stone-600">
              © {new Date().getFullYear()} Nayan Khandelwal. All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>

      {/* Global Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs mono shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
