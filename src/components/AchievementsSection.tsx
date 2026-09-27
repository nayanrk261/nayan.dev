import { Trophy, Award } from "lucide-react";

export default function AchievementsSection() {
  return (
    <section id="achievements" className="relative px-6 py-20 md:py-28 overflow-hidden scroll-mt-20">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="reveal mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="mono text-[11px] uppercase tracking-[0.2em] text-orange-400 font-semibold">
              04 — AWARDS & RECOGNITION
            </span>
            <h2 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
              Achievements <span className="serif italic font-normal text-amber-300">& Wins</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-stone-400 leading-relaxed">
            Recognized in hackathons and competitive engineering showcases for building innovative AI and full-stack solutions.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Winner - ZENESYS 2026 */}
          <div className="reveal group relative rounded-3xl p-6 sm:p-8 bg-[#0e0e11] border border-amber-500/30 hover:border-amber-400/60 transition-all duration-300 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="mono text-xs font-extrabold px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-2 shadow-sm">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  Winner 🏆
                </span>
                <span className="mono text-xs text-stone-400 font-medium">
                  Aug 2026
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1 group-hover:text-amber-300 transition-colors">
                ZENESYS 2026
              </h3>
              <p className="mono text-xs uppercase tracking-wider text-orange-400 mb-6 font-semibold">
                GHRCEM X SUITEPEDIA
              </p>

              <ul className="space-y-4 text-sm text-stone-300 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold mt-1 text-base">•</span>
                  <span>
                    Won <strong className="text-stone-100 font-bold">1st place among 50+ teams</strong> building <strong className="text-amber-300 font-semibold">FlowDesk</strong>, an AI-routed internal operations platform (leave, resources, expenses) with an AI "Manager Twin" approval feature.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold mt-1 text-base">•</span>
                  <span>
                    Selected among <strong className="text-stone-100 font-bold">Top 10 teams</strong> to represent the college at the <strong className="text-amber-300 font-semibold">Global-Level Hackathon</strong> under SUITEPEDIA.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="mono text-[10px] uppercase tracking-widest text-stone-500">
                1st Place / 50+ Teams
              </span>
              <span className="mono text-[10px] uppercase tracking-widest text-amber-400 font-semibold">
                Global Level Selected
              </span>
            </div>
          </div>

          {/* Runner-Up - ProtoVerse Hackathon 2026 */}
          <div className="reveal group relative rounded-3xl p-6 sm:p-8 bg-[#0e0e11] border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-300 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="mono text-xs font-extrabold px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-2 shadow-sm">
                  <Award className="w-4 h-4 text-emerald-400" />
                  Runner-Up 🥈
                </span>
                <span className="mono text-xs text-stone-400 font-medium">
                  Apr 2026
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1 group-hover:text-emerald-300 transition-colors">
                ProtoVerse Hackathon 2026
              </h3>
              <p className="mono text-xs uppercase tracking-wider text-emerald-400 mb-6 font-semibold">
                AISSMS COE, Pune
              </p>

              <ul className="space-y-4 text-sm text-stone-300 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold mt-1 text-base">•</span>
                  <span>
                    Secured <strong className="text-stone-100 font-bold">Runner-Up in HealthTech track</strong> among <strong className="text-stone-100 font-bold">50+ competing teams</strong> for <strong className="text-emerald-300 font-semibold">Awaaz</strong>, a voice-guided AI health survey assistant for rural ASHA workers.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="mono text-[10px] uppercase tracking-widest text-stone-500">
                HealthTech Track
              </span>
              <span className="mono text-[10px] uppercase tracking-widest text-emerald-400 font-semibold">
                Runner-Up / 50+ Teams
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
