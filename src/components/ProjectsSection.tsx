import { useState } from "react";
import { ExternalLink, Github, Lock, Maximize2, ShieldCheck, X } from "lucide-react";
import type { Project } from "@/types";
import lexlocalImg from "@/assets/lexlocal.png";

interface ProjectsSectionProps {
  darkMode: boolean;
}

const VIBECHECK_PROJECT: Project = {
  id: "vibecheck",
  title: "VibeCheck",
  subtitle: "Evidence-First AI Application Security Audits",
  category: "Featured Work",
  description:
    "VibeCheck is an evidence-first security auditing platform designed to identify vulnerabilities in AI-generated and vibe-coded applications. It scans codebases for insecure coding patterns, security misconfigurations, and potential vulnerabilities using deterministic analysis, with multi-language technology detection, comment-aware pattern matching, file-level evidence extraction, and actionable security reports.",
  tags: ["React", "Node.js", "Express.js", "MongoDB", "JavaScript", "Tailwind CSS"],
  githubUrl: "https://github.com/nayanrk261/VibeCheck",
  liveUrl: "https://vibe-check-navy.vercel.app",
};

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

const PROJECTS = [VIBECHECK_PROJECT, LEXLOCAL_PROJECT];

function VibeCheckPreview() {
  return (
    <div className="relative h-full min-h-[310px] overflow-hidden bg-[#070a09] px-5 py-6 sm:px-8">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(53,229,154,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(53,229,154,.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative mx-auto max-w-xl text-center">
        <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-400">
          <ShieldCheck className="h-3 w-3" /> AI App Security Audit
        </div>
        <h4 className="text-2xl font-black tracking-tight text-white sm:text-4xl">
          Build Faster.{" "}
          <span className="text-emerald-400">Ship Safer.</span>
        </h4>
        <p className="mx-auto mt-3 max-w-md text-[10px] leading-relaxed text-stone-400 sm:text-xs">
          Security audits for vibe-coded applications, backed by evidence.
        </p>
        <div className="mt-5 rounded-xl border border-white/10 bg-[#0d1110] p-3 text-left shadow-2xl">
          <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-3">
            <Lock className="h-3 w-3 text-emerald-400" />
            <div className="h-6 flex-1 rounded-md border border-white/10 bg-black/40 px-2 flex items-center text-[8px] text-stone-500 mono">
              https://github.com/user/project
            </div>
            <button className="rounded-md bg-emerald-400 px-3 py-2 text-[8px] font-black text-black">
              START AUDIT
            </button>
          </div>
          {["Repository discovered", "Dependencies analyzed", "Source files scanned"].map((item) => (
            <div
              key={item}
              className="mb-1.5 flex items-center justify-between rounded-md bg-white/2.5 px-2 py-1.5 text-[8px] text-stone-400"
            >
              <span>{item}</span>
              <span className="text-emerald-400">✓</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection({ darkMode }: ProjectsSectionProps) {
  void darkMode;

  const [modalProject, setModalProject] = useState<Project | null>(null);

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
              Things I've{" "}
              <span className="serif italic font-normal text-amber-300">built.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-stone-400 leading-relaxed">
            Projects spanning AI security, civic accessibility, and multilingual legal workflows — click to explore live features.
          </p>
        </div>

        {/* Featured Project Showcase Cards */}
        <div className="space-y-8">
          {PROJECTS.map((project, index) => (
            <article
              key={project.id}
              className="reveal group relative rounded-3xl p-4 sm:p-6 md:p-8 bg-[#0d0d10] border border-amber-500/25 hover:border-amber-400/50 transition-all duration-300 shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Column: Browser Window Frame with Actual Website Screenshot */}
                <div className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-[#0f0f13] border border-white/12 shadow-2xl">
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
                        {project.liveUrl ?? project.githubUrl}
                      </span>
                    </div>

                    <button
                      onClick={() => setModalProject(project)}
                      title="Expand preview"
                      className="p-1 rounded-md text-stone-400 hover:text-amber-400 hover:bg-white/10 transition-colors"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Website Screenshot Display */}
                  <div
                    onClick={() => setModalProject(project)}
                    className="relative cursor-pointer overflow-hidden group/img aspect-16/10 bg-black/60"
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`${project.title} Website Screenshot`}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                      />
                    ) : (
                      <VibeCheckPreview />
                    )}

                    {/* Subtle Hover Overlay with Action Button */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                      <span className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs mono uppercase tracking-wider flex items-center gap-1.5 shadow-xl">
                        <Maximize2 className="w-3.5 h-3.5" />
                        Enlarge
                      </span>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs mono uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md shadow-xl"
                        >
                          <span>Visit Site</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column: Details & Actions */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-5xl font-black text-white/10 select-none">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="mono text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                      {project.title}
                    </h3>

                    <p className="text-sm md:text-base text-stone-300 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
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
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-xs mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-[1.02]"
                      >
                        <span>{project.liveUrl.replace(/^https?:\/\//, "")}</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
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
            </article>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {modalProject && (
        <div
          onClick={() => setModalProject(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[#0d0d10] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#141418]">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-stone-100 text-base">
                  {modalProject.title} Website
                </span>
                <span className="mono text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                  Live App
                </span>
              </div>
              <button
                onClick={() => setModalProject(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="overflow-auto max-h-[calc(90vh-80px)] flex justify-center bg-black/40">
              {modalProject.image ? (
                <img
                  src={modalProject.image}
                  alt={`${modalProject.title} Website Full View`}
                  className="w-full h-auto rounded-none shadow-2xl object-contain"
                />
              ) : (
                <div className="w-full">
                  <VibeCheckPreview />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
