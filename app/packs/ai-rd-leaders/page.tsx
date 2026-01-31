"use client"

import { Button } from "@/components/ui/button"
import { Lock, ArrowRight, ExternalLink, Filter, X, ChevronDown, Target, TrendingUp, Shield, Users, Building2, Zap, Brain, Linkedin as LinkedinIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useMemo, useRef } from "react"

/* ── Types ── */
interface Signal {
  type: string
  date: string
  title: string
  url: string
  summary: string
}

interface Leader {
  rank: number
  name: string
  title: string
  company: string
  domain: string
  linkedin: string
  activityScore: string
  recentSignals: Signal[]
}

interface PackData {
  pack: {
    name: string
    tagline: string
    description: string
    targetBuyer: string
    price: number
    refreshCadence: string
    lastUpdated: string
    totalCompanies: number
    totalStakeholders: number
    stakeholdersLocked: boolean
  }
  leaders: Leader[]
}

/* ── Signal type config ── */
const SIGNAL_ICONS: Record<string, { emoji: string; label: string; color: string }> = {
  deal:     { emoji: "💰", label: "Deal",       color: "text-emerald-400" },
  hiring:   { emoji: "👥", label: "Hiring",     color: "text-blue-400" },
  news:     { emoji: "📰", label: "Press",      color: "text-amber-400" },
  linkedin: { emoji: "💬", label: "LinkedIn",   color: "text-sky-400" },
  speaking: { emoji: "🎤", label: "Conference", color: "text-purple-400" },
}

function getSignalMeta(type: string) {
  return SIGNAL_ICONS[type] || SIGNAL_ICONS.news
}

/* ── Activity Badge ── */
function ActivityBadge({ score }: { score: string }) {
  if (score === "HIGH") {
    return (
      <span className="relative inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-400">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        High
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-yellow-400">
      <span className="inline-flex rounded-full h-2 w-2 bg-yellow-500" />
      Medium
    </span>
  )
}

/* ── Filter chip ── */
function FilterChip({ label, active, count, onClick }: { label: string; active: boolean; count: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-mono transition-all cursor-pointer
        ${active
          ? "bg-foreground text-background border-foreground"
          : "bg-transparent text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
        }`}
    >
      {label}
      <span className={`text-[10px] ${active ? "text-background/60" : "text-muted-foreground/50"}`}>{count}</span>
      {active && <X className="h-3 w-3 ml-0.5" />}
    </button>
  )
}

/* ── Company logo with fallback ── */
function CompanyLogo({ domain, company, size = 36 }: { domain: string; company: string; size?: number }) {
  const [error, setError] = useState(false)

  if (!domain || error) {
    return (
      <div
        className="flex shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-mono font-bold text-muted-foreground"
        style={{ width: size, height: size }}
      >
        {company.charAt(0)}
      </div>
    )
  }

  return (
    <Image
      src={`https://img.logo.dev/${domain}?token=pk_JBbN5IBfSNmUyE2Gj2LiiA&retina=true`}
      alt={company}
      width={size}
      height={size}
      className="shrink-0 rounded-lg bg-white/10"
      onError={() => setError(true)}
      unoptimized
    />
  )
}

/* ── Signal row ── */
function SignalRow({ signal }: { signal: Signal }) {
  const meta = getSignalMeta(signal.type)
  const displayDate = signal.date
    ? new Date(signal.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : null

  return (
    <div className="flex items-start gap-2 py-1.5 group/sig">
      <span className="text-sm mt-0.5 shrink-0" title={meta.label}>{meta.emoji}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          {displayDate && (
            <span className="font-mono text-[10px] text-muted-foreground/60 shrink-0">[{displayDate}]</span>
          )}
          {signal.url ? (
            <a
              href={signal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-foreground/80 hover:text-primary transition-colors leading-tight line-clamp-2 inline-flex items-start gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="line-clamp-2">{signal.title}</span>
              <ExternalLink className="h-2.5 w-2.5 shrink-0 mt-0.5 opacity-0 group-hover/sig:opacity-60 transition-opacity" />
            </a>
          ) : (
            <span className="text-[12px] text-foreground/80 leading-tight line-clamp-2">{signal.title}</span>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Leader card (unlocked) ── */
function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <div className="group flex flex-col border border-border rounded-lg hover:border-foreground/20 transition-all duration-200 hover:shadow-[0_0_20px_rgba(90,197,58,0.04)] bg-background">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start gap-3">
          <CompanyLogo domain={leader.domain} company={leader.company} size={36} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-serif text-sm font-semibold leading-tight">{leader.name}</span>
              <ActivityBadge score={leader.activityScore} />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 leading-snug line-clamp-2">{leader.title}</p>
            <p className="text-xs text-muted-foreground/70 mt-0.5">{leader.company}</p>
          </div>
        </div>

        {/* LinkedIn link */}
        <a
          href={leader.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-2.5 text-[11px] text-sky-400 hover:text-sky-300 font-medium transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <LinkedinIcon className="h-3 w-3" />
          LinkedIn Profile
          <ExternalLink className="h-2.5 w-2.5" />
        </a>
      </div>

      {/* Signals — the star of the card */}
      <div className="mx-4 mb-4 rounded-md border border-primary/20 bg-primary/5 p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Zap className="h-3 w-3 text-primary" />
            <span className="font-mono text-[9px] text-primary uppercase tracking-wider font-semibold">Recent Signals</span>
          </div>
          <span className="font-mono text-[8px] text-primary bg-primary/10 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
            {leader.recentSignals.length} tracked
          </span>
        </div>
        <div className="divide-y divide-border/50">
          {leader.recentSignals.map((signal, i) => (
            <SignalRow key={i} signal={signal} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Leader card (locked) ── */
function LockedLeaderCard({ leader }: { leader: Leader }) {
  return (
    <div className="flex flex-col border border-border rounded-lg bg-background opacity-80">
      {/* Header — visible */}
      <div className="p-4 pb-3">
        <div className="flex items-start gap-3">
          <CompanyLogo domain={leader.domain} company={leader.company} size={36} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-serif text-sm font-semibold leading-tight">{leader.name}</span>
              <ActivityBadge score={leader.activityScore} />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 leading-snug line-clamp-1">{leader.title}</p>
            <p className="text-xs text-muted-foreground/70 mt-0.5">{leader.company}</p>
          </div>
        </div>
      </div>

      {/* Locked signals */}
      <div className="mx-4 mb-4 rounded-md border border-dashed border-border bg-muted/10 p-3 relative overflow-hidden">
        {/* Blurred content */}
        <div className="blur-[6px] select-none pointer-events-none space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">💰</span>
            <div className="h-3 w-full rounded bg-muted/60" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">📰</span>
            <div className="h-3 w-4/5 rounded bg-muted/60" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">🎤</span>
            <div className="h-3 w-3/5 rounded bg-muted/60" />
          </div>
        </div>
        {/* Lock overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[1px]">
          <Lock className="h-4 w-4 text-muted-foreground/50 mb-1" />
          <span className="text-[10px] text-muted-foreground font-mono">{leader.recentSignals.length} signals</span>
          <span className="text-[9px] text-muted-foreground/60">Unlock with purchase</span>
        </div>
      </div>
    </div>
  )
}

/* ── Evidence strip (scrolling headlines) ── */
function EvidenceStrip({ leaders }: { leaders: Leader[] }) {
  const stripRef = useRef<HTMLDivElement>(null)

  // Collect the best headlines with dates
  const headlines = useMemo(() => {
    const items: { title: string; date: string; url: string }[] = []
    for (const l of leaders) {
      for (const s of l.recentSignals) {
        if (s.date && s.url && s.title && s.title.length > 15) {
          items.push({ title: s.title, date: s.date, url: s.url })
        }
      }
    }
    // Sort by date descending
    items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return items.slice(0, 12)
  }, [leaders])

  return (
    <div className="relative overflow-hidden border border-border rounded-lg mb-6 bg-muted/10">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </span>
        <span className="font-mono text-[10px] text-primary uppercase tracking-wider font-semibold">Live Market Signals</span>
        <span className="font-mono text-[10px] text-muted-foreground/50 ml-auto">Scroll →</span>
      </div>
      <div
        ref={stripRef}
        className="flex gap-4 overflow-x-auto py-3 px-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {headlines.map((h, i) => {
          const d = new Date(h.date)
          const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
          return (
            <a
              key={i}
              href={h.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 shrink-0 rounded-md border border-border bg-background px-3 py-2 hover:border-primary/40 transition-colors max-w-xs"
            >
              <span className="font-mono text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded shrink-0">{label}</span>
              <span className="text-xs text-foreground/80 line-clamp-1 whitespace-nowrap">{h.title}</span>
              <ExternalLink className="h-2.5 w-2.5 text-muted-foreground/40 shrink-0" />
            </a>
          )
        })}
      </div>
    </div>
  )
}

/* ── Mid-page CTA ── */
function MidPageCTA({ price, leaderCount }: { price: number; leaderCount: number }) {
  return (
    <div className="col-span-full my-2">
      <div className="border border-primary/20 bg-primary/5 rounded-lg p-5 text-center">
        <p className="text-sm text-muted-foreground mb-3">
          You&apos;re previewing <strong className="text-foreground">{leaderCount} AI/ML leaders</strong> with activity signals, sources, and LinkedIn profiles.
          <br />
          <span className="text-primary font-medium">Unlock all signals, links, and monthly refreshes.</span>
        </p>
        <a href="https://forms.gle/N5MYpSt1p5kiYUUZ9" target="_blank" rel="noopener noreferrer">
          <Button className="rounded-none font-mono bg-foreground text-background hover:bg-foreground/90 px-6 py-5 text-sm cursor-pointer">
            Get Full Access — ${price}/month
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </a>
      </div>
    </div>
  )
}

/* ── Main page ── */
export default function AIRDLeadersPage() {
  const [data, setData] = useState<PackData | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [companyFilter, setCompanyFilter] = useState<string | null>(null)
  const [activityFilter, setActivityFilter] = useState<string | null>(null)

  useEffect(() => {
    fetch("/data/pack-ai-rd-leaders.json")
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const filteredLeaders = useMemo(() => {
    if (!data) return []
    return data.leaders.filter(l => {
      if (companyFilter && l.company !== companyFilter) return false
      if (activityFilter && l.activityScore !== activityFilter) return false
      return true
    })
  }, [data, companyFilter, activityFilter])

  const hasFilters = companyFilter || activityFilter

  const counts = useMemo(() => {
    if (!data) return { companies: {} as Record<string, number>, activities: {} as Record<string, number> }
    const c: Record<string, number> = {}
    const a: Record<string, number> = {}
    for (const l of data.leaders) {
      c[l.company] = (c[l.company] || 0) + 1
      a[l.activityScore] = (a[l.activityScore] || 0) + 1
    }
    return { companies: c, activities: a }
  }, [data])

  const stats = useMemo(() => {
    if (!data) return { highCount: 0, signalCount: 0, companyCount: 0 }
    let highCount = 0
    let signalCount = 0
    const companySet = new Set<string>()
    for (const l of data.leaders) {
      if (l.activityScore === "HIGH") highCount++
      signalCount += l.recentSignals.length
      companySet.add(l.company)
    }
    return { highCount, signalCount, companyCount: companySet.size }
  }, [data])

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground font-mono text-sm">Loading pack data...</div>
      </div>
    )
  }

  const PREVIEW_COUNT = 8
  const activeFilterCount = [companyFilter, activityFilter].filter(Boolean).length
  const pricePerLead = Math.round(data.pack.price / data.pack.totalStakeholders)
  const visibleLeaders = showAll ? filteredLeaders : filteredLeaders.slice(0, 15)

  return (
    <div className="min-h-screen bg-background">
      <div className="h-1 w-full bg-gradient-to-r from-[#5ac53a] via-[#d5fd51] via-[#f6c86a] to-[#eb5d2a]" />

      <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          ← Back to Pistachio AI
        </Link>

        {/* ════ Hero ════ */}
        <div className="relative border border-border p-5 md:p-8 mb-6">
          <div className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-foreground -translate-x-px -translate-y-px" />
          <div className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-foreground translate-x-px -translate-y-px" />
          <div className="absolute left-0 bottom-0 h-3 w-3 border-l-2 border-b-2 border-foreground -translate-x-px translate-y-px" />
          <div className="absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-foreground translate-x-px translate-y-px" />

          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">Signal Pack</span>
                <span className="font-mono text-xs text-muted-foreground">Updated {data.pack.lastUpdated}</span>
              </div>
              <h1 className="font-serif text-2xl md:text-4xl font-semibold mb-3 flex items-center gap-3">
                <Brain className="h-7 w-7 md:h-9 md:w-9 text-primary" />
                AI R&D Leaders
              </h1>
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
                <strong>{data.pack.totalStakeholders} pharma AI/ML decision-makers</strong> who are actively building, hiring, and investing — with proof.
              </p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Every leader comes with verified activity signals showing they&apos;re investing in AI right now. Not a generic list — real evidence, real links, real dates.
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="font-mono text-3xl font-bold">${data.pack.price}</div>
              <div className="text-xs text-muted-foreground">per month · {data.pack.refreshCadence.toLowerCase()}</div>
              <a href="https://forms.gle/N5MYpSt1p5kiYUUZ9" target="_blank" rel="noopener noreferrer" className="mt-3 block">
                <Button className="rounded-none font-mono bg-foreground text-background hover:bg-foreground/90 px-6 py-5 text-sm cursor-pointer w-full">
                  Get Access
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <div className="rounded-lg border border-border p-3 text-center">
              <div className="font-mono text-xl md:text-2xl font-bold">{data.pack.totalStakeholders}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">AI/ML Leaders</div>
            </div>
            <div className="rounded-lg border border-border p-3 text-center">
              <div className="font-mono text-xl md:text-2xl font-bold">{stats.companyCount}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Companies</div>
            </div>
            <div className="rounded-lg border border-border p-3 text-center">
              <div className="font-mono text-xl md:text-2xl font-bold text-emerald-400">{stats.highCount}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">High Activity</div>
            </div>
            <div className="rounded-lg border border-border p-3 text-center">
              <div className="font-mono text-xl md:text-2xl font-bold">{stats.signalCount}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Signals Tracked</div>
            </div>
          </div>
        </div>

        {/* ════ Evidence strip ════ */}
        <EvidenceStrip leaders={data.leaders} />

        {/* ════ ROI callout ════ */}
        <div className="border border-primary/20 bg-primary/5 rounded-lg p-4 mb-4 flex items-start gap-3">
          <TrendingUp className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">
              ~${pricePerLead} per verified leader. Each comes with activity signals proving they&apos;re actively investing in AI right now.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              If even 1 of {data.pack.totalStakeholders} leads to a conversation, this pays for itself 100x.
            </p>
          </div>
        </div>

        {/* ════ What you get ════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="flex items-start gap-3 rounded-lg border border-border p-3">
            <Users className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium">Leader Profiles</div>
              <div className="text-xs text-muted-foreground">Name, title, company, LinkedIn — verified decision-makers</div>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-border p-3">
            <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium">Activity Signals</div>
              <div className="text-xs text-muted-foreground">Deals, hiring, press, LinkedIn posts, conference talks — with dates &amp; links</div>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-border p-3">
            <Building2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium">Activity Scoring</div>
              <div className="text-xs text-muted-foreground">HIGH / MEDIUM based on recency, signal strength, and volume</div>
            </div>
          </div>
        </div>

        {/* ════ Built for ════ */}
        <div className="border border-dashed border-foreground/15 bg-muted/30 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <Target className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="font-mono text-[10px] text-primary uppercase tracking-wider font-semibold mb-1">Built For</div>
              <p className="text-sm text-muted-foreground">
                {data.pack.targetBuyer}. We combine people intelligence + activity signals + source evidence — so you know exactly who to talk to and why they&apos;ll care.
              </p>
            </div>
          </div>
        </div>

        {/* ════ Sources ════ */}
        <div className="flex items-center gap-2 flex-wrap mb-4 px-1">
          <Shield className="h-3 w-3 text-muted-foreground/40" />
          <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-wider">Sources:</span>
          <span className="text-[11px] text-muted-foreground">LinkedIn profiles</span>
          <span className="text-muted-foreground/20">·</span>
          <span className="text-[11px] text-muted-foreground">Press releases &amp; news</span>
          <span className="text-muted-foreground/20">·</span>
          <span className="text-[11px] text-muted-foreground">Job postings</span>
          <span className="text-muted-foreground/20">·</span>
          <span className="text-[11px] text-muted-foreground">Deal announcements</span>
          <span className="text-muted-foreground/20">·</span>
          <span className="text-[11px] text-muted-foreground">Conference agendas</span>
        </div>

        {/* ════ Filter bar ════ */}
        <div className="border border-border rounded-lg mb-5">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-muted/20 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Filter</span>
              {activeFilterCount > 0 && (
                <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-primary text-[10px] font-mono font-bold text-primary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {hasFilters && (
                <span
                  onClick={(e) => { e.stopPropagation(); setCompanyFilter(null); setActivityFilter(null) }}
                  className="text-xs text-primary hover:underline cursor-pointer"
                >
                  Clear all
                </span>
              )}
              <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
            </div>
          </button>

          {filtersOpen && (
            <div className="px-4 pb-4 pt-1 space-y-3 border-t border-border">
              <div>
                <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1.5">Activity Score</div>
                <div className="flex flex-wrap gap-1.5">
                  {["HIGH", "MEDIUM"].map(a => (
                    <FilterChip
                      key={a}
                      label={a}
                      count={counts.activities[a] || 0}
                      active={activityFilter === a}
                      onClick={() => setActivityFilter(activityFilter === a ? null : a)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1.5">Company</div>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(counts.companies).sort((a, b) => b[1] - a[1]).map(([comp, count]) => (
                    <FilterChip
                      key={comp}
                      label={comp}
                      count={count}
                      active={companyFilter === comp}
                      onClick={() => setCompanyFilter(companyFilter === comp ? null : comp)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ════ Count header ════ */}
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {filteredLeaders.length} {hasFilters ? "matching" : ""} leaders · Sorted by activity
          </span>
        </div>

        {/* ════ Card grid ════ */}
        {filteredLeaders.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground border border-border rounded-lg">
            No leaders match the selected filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleLeaders.flatMap((leader, index) => {
              const isPreview = leader.rank <= PREVIEW_COUNT
              const items = [
                isPreview
                  ? <LeaderCard key={`card-${leader.rank}`} leader={leader} />
                  : <LockedLeaderCard key={`card-${leader.rank}`} leader={leader} />
              ]
              // Insert mid-page CTA after the preview cards
              if (index === PREVIEW_COUNT - 1) {
                items.push(
                  <MidPageCTA key="mid-cta" price={data.pack.price} leaderCount={data.pack.totalStakeholders} />
                )
              }
              return items
            })}
          </div>
        )}

        {!showAll && filteredLeaders.length > 15 && (
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              className="rounded-none font-mono text-xs cursor-pointer px-8 py-5"
              onClick={() => setShowAll(true)}
            >
              Show all {filteredLeaders.length} leaders
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </div>
        )}

        {/* ════ Bottom CTA ════ */}
        <div className="mt-8 text-center border border-border p-6 md:p-8 bg-muted/10 rounded-lg">
          <h2 className="font-serif text-xl md:text-2xl font-semibold mb-2">Unlock the full pack</h2>
          <p className="text-muted-foreground text-sm mb-1 max-w-lg mx-auto">
            Get all {data.pack.totalStakeholders} AI/ML leader profiles with signals, LinkedIn links, and activity scoring — refreshed monthly as the market moves.
          </p>
          <p className="text-sm text-primary font-medium mb-4">
            That&apos;s ~${pricePerLead}/leader for pre-qualified, signal-verified contacts.
          </p>
          <a href="https://forms.gle/N5MYpSt1p5kiYUUZ9" target="_blank" rel="noopener noreferrer">
            <Button className="rounded-none font-mono bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-base cursor-pointer">
              Request Access — ${data.pack.price}/month
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </a>
          <p className="text-xs text-muted-foreground mt-3">
            Limited availability · Cancel anytime
          </p>
        </div>

        {/* ════ Methodology ════ */}
        <div className="mt-6 border border-border rounded-lg p-5 text-sm">
          <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">Methodology</h3>
          <div className="space-y-2 text-muted-foreground text-xs leading-relaxed">
            <p>
              <strong className="text-foreground">People sourcing:</strong> Leaders are identified via LinkedIn based on AI/ML-relevant titles at top pharma and biotech companies, then cross-referenced with public news and deal activity to verify involvement.
            </p>
            <p>
              <strong className="text-foreground">Signal collection:</strong> Activity signals are aggregated from press releases, LinkedIn posts, job postings, deal announcements, and conference agendas. Each signal includes a date, source, and link for verification.
            </p>
            <p>
              <strong className="text-foreground">Activity scoring:</strong> HIGH = multiple recent signals (deals, hiring, speaking) within 90 days. MEDIUM = active signals within 6 months. Scoring reflects both recency and signal strength.
            </p>
            <p>
              <strong className="text-foreground">Refresh cadence:</strong> This pack is refreshed monthly. New leaders are added as they emerge; inactive leaders are deprioritized.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>© 2026 Pistachio AI · <Link href="/" className="underline hover:text-foreground">pistachiohq.ai</Link></p>
        </div>
      </div>

      <div className="h-3 w-full bg-gradient-to-r from-[#5ac53a] via-[#d5fd51] via-[#f6c86a] to-[#eb5d2a] mt-8" />
    </div>
  )
}
