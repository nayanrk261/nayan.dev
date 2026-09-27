import { useState } from "react";
import { ExternalLink, Github, Lock, Maximize2, X } from "lucide-react";
import type { Project } from "@/types";
import lexlocalImg from "@/assets/lexlocal.png";

interface ProjectsSectionProps {
  darkMode: boolean;
}

const LEXLOCAL_PROJECT: Project = {
  id: "lexlocal",
  title: "LexLocal",
  subtitle: "AI-Powered Multilingual Civic Rights & Legal Assistant",
  category: "Featured Work",
  description:
    "LexLocal is an AI-powered civic rights and legal assistant supporting English, Hindi, and Marathi. It empowers Pune citizens to query official government legal documents (UDCPR 2025, DCPR 2017, MMC Act, RTI Act 2005) via natural language using Claude API, featuring a PDF ingestion pipeline for MongoDB vector search and automated PMC-format complaint letter generation.",
  tags: ["Next.js 14", "Node.js", "Express.js", "MongoDB", "Claude API", "Tailwind CSS"],
  image: lexlocalImg,
  githubUrl: "https://github.com/nayanrk261/Lexlocal",
  liveUrl: "https://lexlocal-wine.vercel.app/",
};

export default function ProjectsSection({ darkMode }: ProjectsSectionProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);

  return (
    <section id="projects" className="relative px-6 py-20 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="reveal mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="mono text-[11px] uppercase tracking-[0.22em] text-orange-400 font-semibold">
              03 — SELECTED WORK
            </span>
            <h2 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
              Things I've <span className="serif italic font-normal text-amber-300">built.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-stone-400 leading-relaxed">
            Projects spanning AI workflows, legal regulation queries, and civic accessibility — click to explore live features.
          </p>
        </div>

        {/* Featured Project Showcase Card */}
        <div className="reveal group relative rounded-3xl p-4 sm:p-6 md:p-8 bg-[#0d0d10] border border-amber-500/25 hover:border-amber-400/50 transition-all duration-300 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Column: Browser Window Frame with Actual Website Screenshot */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-[#0f0f13] border border-white/12 shadow-2xl group/browser">
              {/* Browser Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#16161c] border-b border-white/10 select-none">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>

                {/* URL Bar */}
                <div className="flex-1 max-w-sm mx-3 px-3 py-1 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center gap-2 text-stone-400 text-xs mono">
                  <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="truncate text-[11px] text-stone-300">
                    https://lexlocal-wine.vercel.app/
                  </span>
                </div>

                <button
                  onClick={() => setIsImageModalOpen(true)}
                  title="Expand screenshot"
                  className="p-1 rounded-md text-stone-400 hover:text-amber-400 hover:bg-white/10 transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Website Screenshot Display */}
              <div
                onClick={() => setIsImageModalOpen(true)}
                className="relative cursor-pointer overflow-hidden group/img aspect-[16/10] bg-black/60"
              >
                <img
                  src={lexlocalImg}
                  alt="LexLocal Website Screenshot"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                />

                {/* Subtle Hover Overlay with Action Button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                  <span className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs mono uppercase tracking-wider flex items-center gap-1.5 shadow-xl">
                    <Maximize2 className="w-3.5 h-3.5" />
                    Enlarge Image
                  </span>
                  <a
                    href={LEXLOCAL_PROJECT.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs mono uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md shadow-xl transition-all"
                  >
                    <span>Visit Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Details & Actions */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-5xl font-black text-white/10 select-none">01</span>
                  <span className="mono text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                    FEATURED WORK
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                  {LEXLOCAL_PROJECT.title}
                </h3>

                <p className="text-sm md:text-base text-stone-300 leading-relaxed mb-6">
                  {LEXLOCAL_PROJECT.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {LEXLOCAL_PROJECT.tags.map((tag) => (
                    <span
                      key={tag}
                      className="mono text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-stone-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={LEXLOCAL_PROJECT.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-xs mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-[1.02]"
                >
                  <span>lexlocal-wine.vercel.app</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                {LEXLOCAL_PROJECT.githubUrl && (
                  <a
                    href={LEXLOCAL_PROJECT.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/12 text-stone-200 font-semibold text-xs mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Screenshot Lightbox Modal */}
      {isImageModalOpen && (
        <div
          onClick={() => setIsImageModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[#0d0d10] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#141418]">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-stone-100 text-base">LexLocal Website</span>
                <span className="mono text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                  Live App
                </span>
              </div>
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="p-4 overflow-auto max-h-[calc(90vh-80px)] flex justify-center bg-black/40">
              <img
                src={lexlocalImg}
                alt="LexLocal Website Full View"
                className="w-full max-w-4xl h-auto rounded-lg shadow-2xl border border-white/10 object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
