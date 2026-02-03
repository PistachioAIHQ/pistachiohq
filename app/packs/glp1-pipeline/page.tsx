"use client"

import { Button } from "@/components/ui/button"
import { Lock, ArrowRight, ExternalLink, Filter, X, ChevronDown, Target, TrendingUp, Shield, Users, Building2, Zap, FlaskConical, Linkedin as LinkedinIcon, Pill, Beaker, Syringe, TestTube } from "lucide-react"
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

interface Stakeholder {
  name: string
  title: string
  linkedin: string
}

interface Company {
  rank: number
  company: string
  ticker: string | null
  domain: string
  stage: string
  drugCandidate: string
  modality: string
  indication: string
  recentSignals: Signal[]
  stakeholders: {
    count: number
    locked: boolean
    people: Stakeholder[]
  }
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
  }
  companies: Company[]
}

/* ── Signal type config ── */
const SIGNAL_ICONS: Record<string, { emoji: string; label: string; color: string }> = {
  deal:          { emoji: "💰", label: "Deal",          color: "text-emerald-400" },
  clinical:      { emoji: "🧬", label: "Clinical",      color: "text-purple-400" },
  hiring:        { emoji: "👥", label: "Hiring",        color: "text-blue-400" },
  manufacturing: { emoji: "🏭", label: "Manufacturing", color: "text-amber-400" },
  regulatory:    { emoji: "📋", label: "Regulatory",    color: "text-sky-400" },
  partnership:   { emoji: "🤝", label: "Partnership",   color: "text-teal-400" },
  news:          { emoji: "📰", label: "Press",         color: "text-amber-400" },
}

function getSignalMeta(type: string) {
  return SIGNAL_ICONS[type] || SIGNAL_ICONS.news
}

/* ── Stage badge ── */
const STAGE_CONFIG: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  "Phase 3":     { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30", dot: "bg-emerald-500" },
  "Phase 2":     { bg: "bg-blue-500/10",    text: "text-blue-400",    border: "border-blue-500/30",    dot: "bg-blue-500" },
  "Phase 1":     { bg: "bg-amber-500/10",   text: "text-amber-400",   border: "border-amber-500/30",   dot: "bg-amber-500" },
  "Preclinical": { bg: "bg-gray-500/10",    text: "text-gray-400",    border: "border-gray-500/30",    dot: "bg-gray-500" },
}

function StageBadge({ stage }: { stage: string }) {
  const cfg = STAGE_CONFIG[stage] || STAGE_CONFIG["Preclinical"]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${cfg.border} ${cfg.bg} px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider ${cfg.text}`}>
      <span className={`inline-flex rounded-full h-2 w-2 ${cfg.dot}`} />
      {stage}
    </span>
  )
}

/* ── Modality badge ── */
function ModalityBadge({ modality }: { modality: string }) {
  const lower = modality.toLowerCase()
  const isOral = lower.includes("oral")
  const isPeptide = lower.includes("peptide")
  const isBiologic = lower.includes("biologic") || lower.includes("antibod") || lower.includes("mrna")

  let label = "Other"
  let classes = "border-gray-500/20 bg-gray-500/5 text-gray-400"

  if (isOral && isPeptide) {
    label = "Oral + Peptide"
    classes = "border-violet-500/20 bg-violet-500/5 text-violet-400"
  } else if (isOral) {
    label = "Oral SM"
    classes = "border-cyan-500/20 bg-cyan-500/5 text-cyan-400"
  } else if (isPeptide) {
    label = "Peptide"
    classes = "border-orange-500/20 bg-orange-500/5 text-orange-400"
  } else if (isBiologic) {
    label = "Biologic"
    classes = "border-pink-500/20 bg-pink-500/5 text-pink-400"
  }

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border ${classes} px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider`}>
      {label}
    </span>
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

/* ── Company card (unlocked) ── */
function CompanyCard({ company }: { company: Company }) {
  return (
    <div className="group flex flex-col border border-border rounded-lg hover:border-foreground/20 transition-all duration-200 hover:shadow-[0_0_20px_rgba(90,197,58,0.04)] bg-background">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start gap-3">
          <CompanyLogo domain={company.domain} company={company.company} size={36} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-serif text-sm font-semibold leading-tight">{company.company}</span>
              {company.ticker && (
                <span className="font-mono text-[10px] text-muted-foreground/50">${company.ticker}</span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
              <StageBadge stage={company.stage} />
              <ModalityBadge modality={company.modality} />
            </div>
          </div>
        </div>

        {/* Drug candidate */}
        <div className="mt-3 flex items-center gap-2">
          <FlaskConical className="h-3 w-3 text-primary/60" />
          <span className="text-xs text-foreground/80 font-medium">{company.drugCandidate}</span>
        </div>
        <p className="text-[11px] text-muted-foreground/60 mt-1 ml-5">{company.modality}</p>
        <p className="text-[11px] text-muted-foreground/60 ml-5">{company.indication}</p>

        {/* Stakeholders */}
        {company.stakeholders.people.length > 0 && (
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Users className="h-3 w-3 text-muted-foreground/50" />
              <span className="font-mono text-[9px] text-muted-foreground/60 uppercase tracking-wider">Key Contacts</span>
            </div>
            {company.stakeholders.people.slice(0, 3).map((person, i) => (
              <div key={i} className="flex items-center gap-2 ml-4">
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] text-foreground/80 font-medium">{person.name}</span>
                  {person.title && (
                    <span className="text-[10px] text-muted-foreground/50 ml-1">· {person.title}</span>
                  )}
                </div>
                {person.linkedin && (
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-sky-400 hover:text-sky-300 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <LinkedinIcon className="h-3 w-3" />
                  </a>
                )}
              </div>
            ))}
            {company.stakeholders.count > 3 && (
              <span className="text-[10px] text-muted-foreground/40 ml-4">+{company.stakeholders.count - 3} more</span>
            )}
          </div>
        )}
      </div>

      {/* Signals */}
      {company.recentSignals.length > 0 && (
        <div className="mx-4 mb-4 rounded-md border border-primary/20 bg-primary/5 p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Zap className="h-3 w-3 text-primary" />
              <span className="font-mono text-[9px] text-primary uppercase tracking-wider font-semibold">Recent Signals</span>
            </div>
            <span className="font-mono text-[8px] text-primary bg-primary/10 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
              {company.recentSignals.length} tracked
            </span>
          </div>
          <div className="divide-y divide-border/50">
            {company.recentSignals.map((signal, i) => (
              <SignalRow key={i} signal={signal} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Company card (locked) ── */
function LockedCompanyCard({ company }: { company: Company }) {
  return (
    <div className="flex flex-col border border-border rounded-lg bg-background opacity-80">
      {/* Header — visible */}
      <div className="p-4 pb-3">
        <div className="flex items-start gap-3">
          <CompanyLogo domain={company.domain} company={company.company} size={36} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-serif text-sm font-semibold leading-tight">{company.company}</span>
              {company.ticker && (
                <span className="font-mono text-[10px] text-muted-foreground/50">${company.ticker}</span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
              <StageBadge stage={company.stage} />
              <ModalityBadge modality={company.modality} />
            </div>
          </div>
        </div>

        {/* Drug candidate */}
        <div className="mt-3 flex items-center gap-2">
          <FlaskConical className="h-3 w-3 text-primary/60" />
          <span className="text-xs text-foreground/80 font-medium">{company.drugCandidate}</span>
        </div>
      </div>

      {/* Locked stakeholders + signals */}
      <div className="mx-4 mb-4 rounded-md border border-dashed border-border bg-muted/10 p-3 relative overflow-hidden">
        <div className="blur-[6px] select-none pointer-events-none space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">👤</span>
            <div className="h-3 w-full rounded bg-muted/60" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">💰</span>
            <div className="h-3 w-4/5 rounded bg-muted/60" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">🧬</span>
            <div className="h-3 w-3/5 rounded bg-muted/60" />
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[1px]">
          <Lock className="h-4 w-4 text-muted-foreground/50 mb-1" />
          <span className="text-[10px] text-muted-foreground font-mono">{company.stakeholders.count} contacts · {company.recentSignals.length} signals</span>
          <span className="text-[9px] text-muted-foreground/60">Unlock with purchase</span>
        </div>
      </div>
    </div>
  )
}

/* ── Evidence strip (scrolling deal headlines) ── */
function EvidenceStrip({ companies }: { companies: Company[] }) {
  const headlines = useMemo(() => {
    const items: { title: string; date: string; url: string }[] = []
    for (const c of companies) {
      for (const s of c.recentSignals) {
        if (s.date && s.url && s.title && s.title.length > 15 && (s.type === "deal" || s.type === "partnership" || s.type === "clinical")) {
          items.push({ title: s.title, date: s.date, url: s.url })
        }
      }
    }
    items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return items.slice(0, 12)
  }, [companies])

  return (
    <div className="relative overflow-hidden border border-border rounded-lg mb-6 bg-muted/10">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </span>
        <span className="font-mono text-[10px] text-primary uppercase tracking-wider font-semibold">Pipeline Deal Flow & Clinical Updates</span>
        <span className="font-mono text-[10px] text-muted-foreground/50 ml-auto">Scroll →</span>
      </div>
      <div
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
              className="flex items-center gap-2 shrink-0 rounded-md border border-border bg-background px-3 py-2 hover:border-primary/40 transition-colors max-w-sm"
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

/* ── Stage distribution bar ── */
function StageDistribution({ companies }: { companies: Company[] }) {
  const stages = useMemo(() => {
    const counts: Record<string, number> = { "Phase 3": 0, "Phase 2": 0, "Phase 1": 0, "Preclinical": 0 }
    companies.forEach(c => { counts[c.stage] = (counts[c.stage] || 0) + 1 })
    return counts
  }, [companies])

  const total = companies.length
  const order = ["Phase 3", "Phase 2", "Phase 1", "Preclinical"]

  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex items-center gap-2 mb-3">
        <Beaker className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Pipeline Stage Distribution</span>
      </div>
      <div className="flex rounded-full overflow-hidden h-3 mb-3">
        {order.map(stage => {
          const cfg = STAGE_CONFIG[stage]
          const pct = (stages[stage] / total) * 100
          return pct > 0 ? (
            <div
              key={stage}
              className={`${cfg.dot} transition-all`}
              style={{ width: `${pct}%` }}
              title={`${stage}: ${stages[stage]}`}
            />
          ) : null
        })}
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        {order.map(stage => {
          const cfg = STAGE_CONFIG[stage]
          return (
            <div key={stage} className="flex items-center gap-1.5">
              <span className={`inline-flex rounded-full h-2 w-2 ${cfg.dot}`} />
              <span className={`text-[11px] ${cfg.text} font-mono`}>{stage}: {stages[stage]}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Modality breakdown ── */
function ModalityBreakdown({ companies }: { companies: Company[] }) {
  const breakdown = useMemo(() => {
    let oral = 0, peptide = 0, biologic = 0, other = 0, dual = 0
    companies.forEach(c => {
      const m = c.modality.toLowerCase()
      if (m.includes("oral") && m.includes("peptide")) dual++
      else if (m.includes("oral")) oral++
      else if (m.includes("peptide")) peptide++
      else if (m.includes("biologic") || m.includes("antibod") || m.includes("mrna")) biologic++
      else other++
    })
    return { oral, peptide, biologic, dual, other }
  }, [companies])

  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex items-center gap-2 mb-3">
        <Pill className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Modality Breakdown</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {[
          { label: "Oral SM", count: breakdown.oral, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
          { label: "Peptide", count: breakdown.peptide, color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
          { label: "Oral+Peptide", count: breakdown.dual, color: "text-violet-400 bg-violet-500/10 border-violet-500/20" },
          { label: "Biologic", count: breakdown.biologic, color: "text-pink-400 bg-pink-500/10 border-pink-500/20" },
          { label: "Other", count: breakdown.other, color: "text-gray-400 bg-gray-500/10 border-gray-500/20" },
        ].map(item => (
          <div key={item.label} className={`rounded-lg border ${item.color} p-2 text-center`}>
            <div className="font-mono text-lg font-bold">{item.count}</div>
            <div className="text-[9px] font-mono uppercase tracking-wider opacity-70">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Mid-page CTA ── */
function MidPageCTA({ price, companyCount }: { price: number; companyCount: number }) {
  return (
    <div className="col-span-full my-2">
      <div className="border border-primary/20 bg-primary/5 rounded-lg p-5 text-center">
        <p className="text-sm text-muted-foreground mb-3">
          You&apos;re previewing <strong className="text-foreground">{companyCount} pipeline companies</strong> with drug candidates, clinical stage, signals, and key contacts.
          <br />
          <span className="text-primary font-medium">Unlock all contacts, signals, and monthly refreshes.</span>
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
export default function GLP1PipelinePage() {
  const [data, setData] = useState<PackData | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [stageFilter, setStageFilter] = useState<string | null>(null)
  const [modalityFilter, setModalityFilter] = useState<string | null>(null)

  useEffect(() => {
    fetch("/data/pack-glp1-pipeline.json")
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const getModalityCategory = (modality: string) => {
    const m = modality.toLowerCase()
    if (m.includes("oral") && m.includes("peptide")) return "Dual"
    if (m.includes("oral")) return "Oral"
    if (m.includes("peptide")) return "Peptide"
    if (m.includes("biologic") || m.includes("antibod") || m.includes("mrna")) return "Biologic"
    return "Other"
  }

  const filteredCompanies = useMemo(() => {
    if (!data) return []
    return data.companies.filter(c => {
      if (stageFilter && c.stage !== stageFilter) return false
      if (modalityFilter && getModalityCategory(c.modality) !== modalityFilter) return false
      return true
    })
  }, [data, stageFilter, modalityFilter])

  const hasFilters = stageFilter || modalityFilter

  const counts = useMemo(() => {
    if (!data) return { stages: {} as Record<string, number>, modalities: {} as Record<string, number> }
    const s: Record<string, number> = {}
    const m: Record<string, number> = {}
    for (const c of data.companies) {
      s[c.stage] = (s[c.stage] || 0) + 1
      const cat = getModalityCategory(c.modality)
      m[cat] = (m[cat] || 0) + 1
    }
    return { stages: s, modalities: m }
  }, [data])

  const stats = useMemo(() => {
    if (!data) return { phase3Count: 0, signalCount: 0, oralCount: 0 }
    let phase3Count = 0
    let signalCount = 0
    let oralCount = 0
    for (const c of data.companies) {
      if (c.stage === "Phase 3") phase3Count++
      signalCount += c.recentSignals.length
      if (c.modality.toLowerCase().includes("oral")) oralCount++
    }
    return { phase3Count, signalCount, oralCount }
  }, [data])

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground font-mono text-sm">Loading pack data...</div>
      </div>
    )
  }

  const PREVIEW_COUNT = 8
  const activeFilterCount = [stageFilter, modalityFilter].filter(Boolean).length
  const pricePerCompany = Math.round(data.pack.price / data.pack.totalCompanies)
  const visibleCompanies = showAll ? filteredCompanies : filteredCompanies.slice(0, 15)

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
                <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">New</span>
                <span className="font-mono text-xs text-muted-foreground">Updated {data.pack.lastUpdated}</span>
              </div>
              <h1 className="font-serif text-2xl md:text-4xl font-semibold mb-3 flex items-center gap-3">
                <Syringe className="h-7 w-7 md:h-9 md:w-9 text-primary" />
                GLP-1 Pipeline Radar
              </h1>
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
                <strong>{data.pack.totalCompanies} companies</strong> racing to build the next obesity blockbuster — with {data.pack.totalStakeholders} decision-maker contacts and live pipeline signals.
              </p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {data.pack.tagline}. Every company includes clinical stage, drug candidate, modality, recent signals, and key BD/C-suite contacts.
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
              <div className="font-mono text-xl md:text-2xl font-bold">{data.pack.totalCompanies}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Pipeline Companies</div>
            </div>
            <div className="rounded-lg border border-border p-3 text-center">
              <div className="font-mono text-xl md:text-2xl font-bold">{data.pack.totalStakeholders}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Decision-Makers</div>
            </div>
            <div className="rounded-lg border border-border p-3 text-center">
              <div className="font-mono text-xl md:text-2xl font-bold text-emerald-400">{stats.phase3Count}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Phase 3 Programs</div>
            </div>
            <div className="rounded-lg border border-border p-3 text-center">
              <div className="font-mono text-xl md:text-2xl font-bold">{stats.signalCount}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Signals Tracked</div>
            </div>
          </div>
        </div>

        {/* ════ Evidence strip ════ */}
        <EvidenceStrip companies={data.companies} />

        {/* ════ Stage & Modality breakdown ════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <StageDistribution companies={data.companies} />
          <ModalityBreakdown companies={data.companies} />
        </div>

        {/* ════ ROI callout ════ */}
        <div className="border border-primary/20 bg-primary/5 rounded-lg p-4 mb-4 flex items-start gap-3">
          <TrendingUp className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">
              ~${pricePerCompany} per pipeline company. Each comes with drug candidate details, clinical stage, decision-maker contacts, and live signals.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              If even 1 of {data.pack.totalCompanies} companies becomes a customer, this pays for itself 100x.
            </p>
          </div>
        </div>

        {/* ════ What you get ════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="flex items-start gap-3 rounded-lg border border-border p-3">
            <FlaskConical className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium">Pipeline Intelligence</div>
              <div className="text-xs text-muted-foreground">Drug candidate, clinical stage, modality, and indication for every company</div>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-border p-3">
            <Users className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium">Decision-Maker Contacts</div>
              <div className="text-xs text-muted-foreground">CEO, CBO, CSO, Head of BD — with LinkedIn profiles for direct outreach</div>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-border p-3">
            <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium">Live Signals</div>
              <div className="text-xs text-muted-foreground">Deals, clinical data, partnerships, regulatory filings — with dates &amp; source links</div>
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
                {data.pack.targetBuyer}. Know which companies are advancing, who&apos;s doing deals, and exactly who to call — before your competitors do.
              </p>
            </div>
          </div>
        </div>

        {/* ════ Sources ════ */}
        <div className="flex items-center gap-2 flex-wrap mb-4 px-1">
          <Shield className="h-3 w-3 text-muted-foreground/40" />
          <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-wider">Sources:</span>
          <span className="text-[11px] text-muted-foreground">ClinicalTrials.gov</span>
          <span className="text-muted-foreground/20">·</span>
          <span className="text-[11px] text-muted-foreground">SEC filings &amp; press releases</span>
          <span className="text-muted-foreground/20">·</span>
          <span className="text-[11px] text-muted-foreground">FDA/EMA databases</span>
          <span className="text-muted-foreground/20">·</span>
          <span className="text-[11px] text-muted-foreground">Deal announcements</span>
          <span className="text-muted-foreground/20">·</span>
          <span className="text-[11px] text-muted-foreground">LinkedIn profiles</span>
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
                  onClick={(e) => { e.stopPropagation(); setStageFilter(null); setModalityFilter(null) }}
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
                <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1.5">Clinical Stage</div>
                <div className="flex flex-wrap gap-1.5">
                  {["Phase 3", "Phase 2", "Phase 1", "Preclinical"].map(s => (
                    <FilterChip
                      key={s}
                      label={s}
                      count={counts.stages[s] || 0}
                      active={stageFilter === s}
                      onClick={() => setStageFilter(stageFilter === s ? null : s)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1.5">Modality</div>
                <div className="flex flex-wrap gap-1.5">
                  {["Oral", "Peptide", "Dual", "Biologic", "Other"].map(m => (
                    <FilterChip
                      key={m}
                      label={m}
                      count={counts.modalities[m] || 0}
                      active={modalityFilter === m}
                      onClick={() => setModalityFilter(modalityFilter === m ? null : m)}
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
            {filteredCompanies.length} {hasFilters ? "matching" : ""} companies · Sorted by pipeline stage
          </span>
        </div>

        {/* ════ Card grid ════ */}
        {filteredCompanies.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground border border-border rounded-lg">
            No companies match the selected filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleCompanies.flatMap((company, index) => {
              const isPreview = company.rank <= PREVIEW_COUNT
              const items = [
                isPreview
                  ? <CompanyCard key={`card-${company.rank}`} company={company} />
                  : <LockedCompanyCard key={`card-${company.rank}`} company={company} />
              ]
              if (index === PREVIEW_COUNT - 1) {
                items.push(
                  <MidPageCTA key="mid-cta" price={data.pack.price} companyCount={data.pack.totalCompanies} />
                )
              }
              return items
            })}
          </div>
        )}

        {!showAll && filteredCompanies.length > 15 && (
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              className="rounded-none font-mono text-xs cursor-pointer px-8 py-5"
              onClick={() => setShowAll(true)}
            >
              Show all {filteredCompanies.length} companies
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </div>
        )}

        {/* ════ Bottom CTA ════ */}
        <div className="mt-8 text-center border border-border p-6 md:p-8 bg-muted/10 rounded-lg">
          <h2 className="font-serif text-xl md:text-2xl font-semibold mb-2">Unlock the full pipeline</h2>
          <p className="text-muted-foreground text-sm mb-1 max-w-lg mx-auto">
            Get all {data.pack.totalCompanies} pipeline companies with drug candidates, contacts, signals, and monthly updates — everything you need to track the GLP-1/obesity landscape.
          </p>
          <p className="text-sm text-primary font-medium mb-4">
            That&apos;s ~${pricePerCompany}/company for comprehensive pipeline intelligence with contacts.
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
              <strong className="text-foreground">Company sourcing:</strong> Companies are identified via clinical trial databases, SEC/regulatory filings, deal announcements, and industry publications. We track both public and private companies with active GLP-1, incretin, or metabolic drug programs.
            </p>
            <p>
              <strong className="text-foreground">Pipeline intelligence:</strong> Drug candidates, clinical stages, and modalities are verified against ClinicalTrials.gov, company IR pages, and FDA/EMA databases. Each program includes the specific target, mechanism, and current development phase.
            </p>
            <p>
              <strong className="text-foreground">Signal collection:</strong> Activity signals are aggregated from press releases, deal announcements, clinical data readouts, regulatory filings, and partnership news. Each signal includes a date, source, and direct link for verification.
            </p>
            <p>
              <strong className="text-foreground">Stakeholder identification:</strong> Decision-makers (CEO, CBO, CSO, Head of BD) are identified via LinkedIn and cross-referenced with company filings. Contact information is verified for accuracy.
            </p>
            <p>
              <strong className="text-foreground">Refresh cadence:</strong> This pack is refreshed monthly as new clinical data, deals, and regulatory updates emerge. New companies are added as they enter the pipeline.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>© 2026 Pistachio AI · <Link href="/" className="underline hover:text-foreground">trypistachio.ai</Link></p>
        </div>
      </div>

      <div className="h-3 w-full bg-gradient-to-r from-[#5ac53a] via-[#d5fd51] via-[#f6c86a] to-[#eb5d2a] mt-8" />
    </div>
  )
}
