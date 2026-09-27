import React, { useState, useEffect, useRef, useMemo } from "react";
import { Github, Code, ExternalLink, RefreshCw, AlertCircle, Flame, Trophy } from "lucide-react";

/* ─── Types for API Responses ─── */
export interface GitHubContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubApiResponse {
  total: {
    lastYear?: number;
    [year: string]: number | undefined;
  };
  contributions: GitHubContributionDay[];
}

export interface LeetCodeApiResponse {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  submissionCalendar?: Record<string, number> | string;
}

export interface HeatmapDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface TooltipState {
  visible: boolean;
  content: string;
  x: number;
  y: number;
}

interface ContributionHeatmapProps {
  daysList: HeatmapDay[];
  onMouseEnter: (e: React.MouseEvent, text: string) => void;
  onMouseLeave: () => void;
  formatDate: (dateStr: string) => string;
}

/* Real LeetCode submission calendar data for @nayank_2616 */
const REAL_LEETCODE_CALENDAR: Record<string, number> = {
  "1766361600": 1, "1766620800": 1, "1767312000": 2, "1767398400": 6, "1767484800": 1, "1767571200": 1,
  "1767657600": 2, "1767830400": 1, "1767916800": 2, "1768608000": 1, "1768694400": 2, "1768780800": 1,
  "1768867200": 1, "1768953600": 1, "1769040000": 1, "1769126400": 2, "1769212800": 1, "1769385600": 2,
  "1769472000": 2, "1769558400": 1, "1769731200": 1, "1769817600": 1, "1769990400": 2, "1770076800": 1,
  "1770422400": 1, "1770595200": 1, "1770681600": 1, "1770854400": 1, "1773878400": 4, "1773964800": 1,
  "1774051200": 1, "1774137600": 2, "1774224000": 1, "1774310400": 1, "1774483200": 1, "1774656000": 1,
  "1775347200": 2, "1775433600": 1, "1775520000": 2, "1775606400": 1, "1775692800": 1, "1775779200": 1,
  "1775865600": 1, "1775952000": 1, "1776038400": 2, "1776124800": 2, "1776211200": 3, "1776297600": 1,
  "1776384000": 2, "1776470400": 3, "1776556800": 1, "1776643200": 2, "1776729600": 3, "1776816000": 1,
  "1776902400": 1, "1777075200": 1, "1777248000": 1, "1777334400": 1, "1777420800": 1, "1778630400": 2,
  "1778976000": 1, "1779062400": 1, "1779148800": 1, "1779408000": 1, "1779494400": 1, "1779667200": 3,
  "1779926400": 2, "1780099200": 1, "1780185600": 1, "1780358400": 1, "1783728000": 1, "1784246400": 1,
  "1784332800": 1, "1784419200": 1, "1784505600": 2, "1784851200": 1, "1784937600": 1, "1785024000": 2,
  "1785110400": 1, "1785196800": 2, "1785283200": 3, "1785369600": 2, "1785456000": 1, "1785542400": 1,
  "1785628800": 1, "1785715200": 1, "1785801600": 1, "1785888000": 1, "1785974400": 2, "1786060800": 1,
  "1786147200": 1, "1786233600": 1, "1786320000": 1, "1786406400": 1, "1786492800": 1, "1786924800": 2,
  "1787011200": 1, "1787097600": 1, "1787184000": 1, "1787270400": 1, "1787529600": 1, "1787961600": 1,
  "1788048000": 1, "1788220800": 1, "1788307200": 2, "1788393600": 1, "1788480000": 1, "1788566400": 2,
  "1788739200": 1, "1788825600": 2, "1788912000": 1, "1788998400": 1, "1789171200": 1, "1789430400": 1,
  "1789516800": 1, "1789689600": 2, "1789776000": 1, "1789862400": 2, "1789948800": 2, "1790035200": 3,
  "1790121600": 1, "1790208000": 2, "1790294400": 1, "1790380800": 1
};

/* Helper to parse YYYY-MM-DD date safely in local time */
function parseLocalDate(dateStr: string): Date {
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  }
  return new Date(dateStr);
}

/* Helper to build 364 days array from real submission calendar timestamps */
function build364DaysHeatmap(calendarObj: Record<string, number> = REAL_LEETCODE_CALENDAR): HeatmapDay[] {
  const targetCal = Object.keys(calendarObj).length > 0 ? calendarObj : REAL_LEETCODE_CALENDAR;
  const today = new Date();
  const daysMap = new Map<string, number>();

  Object.entries(targetCal).forEach(([ts, count]) => {
    const d = new Date(parseInt(ts, 10) * 1000);
    if (!isNaN(d.getTime())) {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;
      daysMap.set(dateStr, (daysMap.get(dateStr) || 0) + count);
    }
  });

  const daysList: HeatmapDay[] = [];
  for (let i = 363; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    const count = daysMap.get(dateStr) || 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count >= 7) level = 4;
    else if (count >= 4) level = 3;
    else if (count >= 2) level = 2;
    else if (count >= 1) level = 1;

    daysList.push({ date: dateStr, count, level });
  }

  return daysList;
}

/* ─── Contribution Heatmap Sub-Component ─── */
function ContributionHeatmap({
  daysList,
  onMouseEnter,
  onMouseLeave,
  formatDate,
}: ContributionHeatmapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Group days chronologically into month clusters
  const monthGroups = useMemo(() => {
    const monthMap = new Map<
      string,
      { monthName: string; year: number; days: (HeatmapDay & { dateObj: Date })[] }
    >();

    daysList.forEach((day) => {
      const d = parseLocalDate(day.date);
      if (isNaN(d.getTime())) return;
      const year = d.getFullYear();
      const month = d.getMonth();
      const key = `${year}-${month}`;
      if (!monthMap.has(key)) {
        const monthName = d.toLocaleDateString("en-US", { month: "short" });
        monthMap.set(key, { monthName, year, days: [] });
      }
      monthMap.get(key)!.days.push({ ...day, dateObj: d });
    });

    const groups: { monthName: string; year: number; weeks: (HeatmapDay | null)[][] }[] = [];

    monthMap.forEach((mGroup) => {
      const weeks: (HeatmapDay | null)[][] = [];
      let currentWeek: (HeatmapDay | null)[] = new Array(7).fill(null);

      mGroup.days.forEach((day) => {
        const dayOfWeek = day.dateObj.getDay();
        if (dayOfWeek === 0 && currentWeek.some((x) => x !== null)) {
          weeks.push(currentWeek);
          currentWeek = new Array(7).fill(null);
        }
        currentWeek[dayOfWeek] = day;
      });

      if (currentWeek.some((x) => x !== null)) {
        weeks.push(currentWeek);
      }

      groups.push({
        monthName: mGroup.monthName,
        year: mGroup.year,
        weeks,
      });
    });

    return groups;
  }, [daysList]);

  // Auto-scroll container to far right on load so recent contributions are shown first!
  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      const scrollToRight = () => {
        el.scrollLeft = el.scrollWidth;
      };
      scrollToRight();
      const timer = setTimeout(scrollToRight, 100);
      return () => clearTimeout(timer);
    }
  }, [monthGroups]);

  return (
    <div
      ref={containerRef}
      className="rounded-xl p-4 bg-[#141416] border border-white/10 overflow-x-auto"
    >
      <div className="flex items-start gap-2.5 min-w-max pb-1">
        {monthGroups.map((group, gIdx) => (
          <div key={`${group.year}-${group.monthName}-${gIdx}`} className="flex flex-col items-center">
            {/* 7-row Week Grid for this month */}
            <div className="flex gap-1">
              {group.weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1">
                  {week.map((day, dIdx) => {
                    if (!day) {
                      return (
                        <div
                          key={`empty-${dIdx}`}
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[3px] opacity-0"
                        />
                      );
                    }

                    const levelClass =
                      day.level === 4
                        ? "bg-[#39d353] border-[#39d353]"
                        : day.level === 3
                        ? "bg-[#26a641] border-[#26a641]"
                        : day.level === 2
                        ? "bg-[#006d32] border-[#006d32]"
                        : day.level === 1
                        ? "bg-[#0e4429] border-[#0e4429]"
                        : "bg-[#262628] border-white/5 hover:border-white/20";

                    const tooltipMsg = `${day.count === 0 ? "No" : day.count} contribution${
                      day.count === 1 ? "" : "s"
                    } on ${formatDate(day.date)}`;

                    return (
                      <div
                        key={day.date}
                        onMouseEnter={(e) => onMouseEnter(e, tooltipMsg)}
                        onMouseLeave={onMouseLeave}
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[3px] border transition-all duration-150 hover:scale-125 hover:z-20 cursor-pointer ${levelClass}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Month Label Centered Below Each Month Cluster */}
            <span className="mono text-[10px] sm:text-[11px] font-mono text-stone-400 font-medium tracking-wide mt-2">
              {group.monthName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CodingActivitySection({ darkMode }: { darkMode?: boolean }) {
  // GitHub state
  const [ghData, setGhData] = useState<GitHubApiResponse | null>(null);
  const [ghLoading, setGhLoading] = useState<boolean>(true);
  const [ghError, setGhError] = useState<boolean>(false);

  // LeetCode state - Pre-populated with real LeetCode stats & 124 real submission dates
  const [lcData, setLcData] = useState<LeetCodeApiResponse>({
    totalSolved: 85,
    easySolved: 36,
    mediumSolved: 45,
    hardSolved: 4,
  });
  const [lcHeatmap, setLcHeatmap] = useState<HeatmapDay[]>(() => build364DaysHeatmap(REAL_LEETCODE_CALENDAR));

  // Active Tooltip
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, content: "", x: 0, y: 0 });

  // 1. Fetch GitHub Contributions ONCE on mount
  useEffect(() => {
    let isMounted = true;

    async function fetchGitHub() {
      setGhLoading(true);
      setGhError(false);
      try {
        const response = await fetch("https://github-contributions-api.jogruber.de/v4/nayanrk261?y=last");
        if (!response.ok) throw new Error(`GitHub API HTTP ${response.status}`);
        const data: GitHubApiResponse = await response.json();
        if (isMounted) {
          setGhData(data);
        }
      } catch (err) {
        console.warn("GitHub contributions fetch failed:", err);
        if (isMounted) setGhError(true);
      } finally {
        if (isMounted) setGhLoading(false);
      }
    }

    fetchGitHub();
    return () => { isMounted = false; };
  }, []);

  // 2. Async Live Background Sync for LeetCode Stats
  useEffect(() => {
    let isMounted = true;

    async function fetchLeetCode() {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);
        const response = await fetch("https://leetcode-api-faisalshohag.vercel.app/nayank_2616", {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data && isMounted) {
            if (typeof data.totalSolved === "number") {
              setLcData({
                totalSolved: data.totalSolved,
                easySolved: data.easySolved || 36,
                mediumSolved: data.mediumSolved || 45,
                hardSolved: data.hardSolved || 4,
              });
            }
            const rawCal = data.submissionCalendar;
            let rawCalendarObj: Record<string, number> = {};
            if (typeof rawCal === "string") {
              try { rawCalendarObj = JSON.parse(rawCal); } catch {}
            } else if (rawCal && typeof rawCal === "object") {
              rawCalendarObj = rawCal;
            }

            if (Object.keys(rawCalendarObj).length > 0) {
              setLcHeatmap(build364DaysHeatmap(rawCalendarObj));
            }
          }
        }
      } catch {
        // Keeps real cached stats & 124 submission days if network request is blocked
      }
    }

    fetchLeetCode();
    return () => { isMounted = false; };
  }, []);

  // Show tooltip
  const handleMouseEnter = (e: React.MouseEvent, text: string) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({
      visible: true,
      content: text,
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  // Format date readable
  const formatDate = (dateStr: string) => {
    try {
      const d = parseLocalDate(dateStr);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  const totalSolvedCount = lcData.totalSolved || 85;
  const easyCount = lcData.easySolved || 36;
  const mediumCount = lcData.mediumSolved || 45;
  const hardCount = lcData.hardSolved || 4;

  return (
    <section id="activity" className="relative px-6 py-20 overflow-hidden scroll-mt-20">
      {/* Floating Tooltip */}
      {tooltip.visible && (
        <div
          className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full px-2.5 py-1.5 rounded-lg bg-stone-900/95 border border-white/15 text-stone-100 mono text-[11px] font-medium shadow-2xl backdrop-blur-md transition-opacity duration-150"
          style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
        >
          {tooltip.content}
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="reveal mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="mono text-[11px] uppercase tracking-[0.2em] text-emerald-400">
              02 — open source & problem solving
            </span>
            <h2 className="mt-2 text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Coding <span className="serif font-normal opacity-70">Activity & Stats</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-stone-400">
            Real-time GitHub contributions and LeetCode problem-solving activity.
          </p>
        </div>

        {/* 2-Column Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* ── CARD 1: GITHUB ── */}
          <div className="reveal relative rounded-2xl md:rounded-3xl p-6 md:p-8 bg-[#121215] border border-white/10 shadow-xl flex flex-col justify-between hover:border-emerald-500/30 transition-all duration-300">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white flex items-center gap-2">
                      GitHub Contributions
                    </h3>
                    <a
                      href="https://github.com/nayanrk261"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono text-xs text-stone-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                    >
                      @nayanrk261 <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <span className="mono text-[11px] font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {ghData?.total?.lastYear !== undefined
                    ? `${ghData.total.lastYear} in last year`
                    : "Live Graph"}
                </span>
              </div>

              {/* GitHub Heatmap Grid */}
              {ghLoading ? (
                <div className="h-44 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center gap-2">
                  <RefreshCw className="w-5 h-5 text-emerald-400 animate-spin" />
                  <span className="mono text-xs text-stone-400">Fetching GitHub contributions...</span>
                </div>
              ) : ghError || !ghData?.contributions?.length ? (
                <div className="rounded-xl p-4 bg-stone-950/80 border border-white/5 text-center">
                  <div className="flex items-center justify-center gap-2 text-stone-400 mono text-xs mb-3">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span>Unable to load live GitHub data directly.</span>
                  </div>
                </div>
              ) : (
                <ContributionHeatmap
                  daysList={ghData.contributions}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  formatDate={formatDate}
                />
              )}
            </div>
          </div>

          {/* ── CARD 2: LEETCODE ── */}
          <div className="reveal relative rounded-2xl md:rounded-3xl p-6 md:p-8 bg-[#121215] border border-white/10 shadow-xl flex flex-col justify-between hover:border-emerald-500/30 transition-all duration-300">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white flex items-center gap-2">
                      LeetCode Stats
                    </h3>
                    <a
                      href="https://leetcode.com/u/nayank_2616/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono text-xs text-stone-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                    >
                      @nayank_2616 <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="mono text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5" />
                    {totalSolvedCount} Solved
                  </span>
                </div>
              </div>

              {/* Solved Breakdown Progress Bars */}
              <div className="space-y-3.5 mb-6">
                {/* Overview Header Pill */}
                <div className="p-3.5 rounded-xl bg-stone-950/80 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-white">Problem Solving Stats</span>
                  </div>
                  <span className="mono text-xs text-emerald-400 font-bold">
                    {totalSolvedCount} Problems Solved
                  </span>
                </div>

                {/* Easy */}
                <div>
                  <div className="flex justify-between items-center text-xs mono mb-1">
                    <span className="text-emerald-400 font-semibold">Easy</span>
                    <span className="text-stone-200 font-bold">{easyCount} Solved</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-900 overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                      style={{ width: `${(easyCount / totalSolvedCount) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Medium */}
                <div>
                  <div className="flex justify-between items-center text-xs mono mb-1">
                    <span className="text-amber-400 font-semibold">Medium</span>
                    <span className="text-stone-200 font-bold">{mediumCount} Solved</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-900 overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-700"
                      style={{ width: `${(mediumCount / totalSolvedCount) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Hard */}
                <div>
                  <div className="flex justify-between items-center text-xs mono mb-1">
                    <span className="text-rose-400 font-semibold">Hard</span>
                    <span className="text-stone-200 font-bold">{hardCount} Solved</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-900 overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-rose-500 rounded-full transition-all duration-700"
                      style={{ width: `${(hardCount / totalSolvedCount) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* LeetCode Heatmap Grid (Renders actual 124 real submission dates) */}
              <ContributionHeatmap
                daysList={lcHeatmap}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                formatDate={formatDate}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
