"use client"

import { Button } from "@/components/ui/button"
import { Lock, ArrowRight, Calendar, FileText, AlertTriangle, Clock, Building2, Pill, Target, Users, ChevronDown, ExternalLink, Filter, X, RefreshCw, TrendingUp, Zap, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useMemo } from "react"

interface StakeholderPerson {
  name: string
  title: string
  linkedin: string
  company: string
}

interface Company {
  rank: number
  ticker: string
  company: string
  domain: string
  drug: string
  indication: string
  milestone: string
  expectedDate: string
  signalType: string
  signalDetail: string
  urgency: string
  therapeuticArea: string
  sources: {
    sec: string
    clinicalTrials: string
    fda: string
    primarySource?: string
  }
  stakeholders: {
    count: number
    locked: boolean
    preview: string[]
    people?: StakeholderPerson[]
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
    stakeholdersLocked: boolean
  }
  companies: Company[]
}

function UrgencyBadge({ urgency }: { urgency: string }) {
  const styles: Record<string, string> = {
    Critical: "bg-red-500/10 text-red-400 border-red-500/20",
    High: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider ${styles[urgency] || styles.Medium}`}>
      {urgency === "Critical" && <AlertTriangle className="h-2.5 w-2.5" />}
      {urgency}
    </span>
  )
}

function MilestoneBadge({ milestone }: { milestone: string }) {
  const styles: Record<string, string> = {
    "PDUFA": "bg-primary/10 text-primary border-primary/20",
    "PDUFA priority review": "bg-primary/10 text-primary border-primary/20",
    "NDA Filing": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "BLA Filing": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "sNDA Filing": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  }
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider ${styles[milestone] || "bg-muted text-muted-foreground border-border"}`}>
      {milestone}
    </span>
  )
}

function TherapeuticBadge({ area }: { area: string }) {
  const colors: Record<string, string> = {
    "Oncology": "bg-rose-500/8 text-rose-400 border-rose-500/15",
    "Neurology": "bg-violet-500/8 text-violet-400 border-violet-500/15",
    "Endocrinology & Metabolic": "bg-amber-500/8 text-amber-400 border-amber-500/15",
    "Ophthalmology": "bg-cyan-500/8 text-cyan-400 border-cyan-500/15",
    "Rare Disease": "bg-pink-500/8 text-pink-400 border-pink-500/15",
    "Nephrology": "bg-teal-500/8 text-teal-400 border-teal-500/15",
    "Psychiatry": "bg-indigo-500/8 text-indigo-400 border-indigo-500/15",
    "Immunology & Inflammation": "bg-orange-500/8 text-orange-400 border-orange-500/15",
    "Infectious Disease": "bg-lime-500/8 text-lime-400 border-lime-500/15",
    "Cardiovascular": "bg-red-500/8 text-red-400 border-red-500/15",
    "Respiratory": "bg-sky-500/8 text-sky-400 border-sky-500/15",
    "Reproductive Health": "bg-fuchsia-500/8 text-fuchsia-400 border-fuchsia-500/15",
  }
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-mono tracking-wider ${colors[area] || "bg-muted/50 text-muted-foreground border-border"}`}>
      {area}
    </span>
  )
}

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

function CompanyLogo({ domain, company, size = 32 }: { domain: string; company: string; size?: number }) {
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

function DaysAwayBadge({ expectedDate }: { expectedDate: string }) {
  const daysUntil = useMemo(() => {
    const d = new Date(expectedDate)
    const now = new Date()
    return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  }, [expectedDate])

  if (daysUntil <= 0) {
    return (
      <span className="inline-flex items-center gap-1 font-mono text-xs text-red-400 font-semibold">
        <Zap className="h-3 w-3" />
        Imminent
      </span>
    )
  }
  
  if (daysUntil > 180) return null

  const color = daysUntil <= 30 
    ? "text-red-400 font-semibold" 
    : daysUntil <= 60 
    ? "text-orange-400" 
    : "text-yellow-400/70"

  return (
    <span className={`inline-flex items-center gap-1 font-mono text-xs ${color}`}>
      <Clock className="h-3 w-3" />
      {daysUntil}d away
    </span>
  )
}

function CompanyCard({ company }: { company: Company }) {
  return (
    <div className="group flex flex-col border border-border rounded-lg hover:border-foreground/20 transition-all duration-200 hover:shadow-[0_0_20px_rgba(90,197,58,0.04)] bg-background">
      {/* Card header */}
      <div className="p-4 pb-3">
        <div className="flex items-start gap-3">
          <CompanyLogo domain={company.domain} company={company.company} size={36} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-serif text-sm font-semibold leading-tight">{company.company}</span>
              <span className="font-mono text-[11px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">{company.ticker}</span>
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Pill className="h-3 w-3 shrink-0 text-muted-foreground/60" />
              <span className="truncate">{company.drug}</span>
            </div>
          </div>
        </div>
        
        {/* Indication */}
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {company.indication}
        </p>
        
        {/* Badges row */}
        <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
          <MilestoneBadge milestone={company.milestone} />
          <TherapeuticBadge area={company.therapeuticArea} />
          <UrgencyBadge urgency={company.urgency} />
        </div>
        
        {/* Date + countdown */}
        <div className="mt-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span className="font-mono">{company.expectedDate}</span>
          </div>
          <DaysAwayBadge expectedDate={company.expectedDate} />
        </div>
      </div>
      
      {/* Signal detail — the value */}
      <div className="mx-4 mb-3 rounded-md border border-border bg-muted/20 p-3">
        <div className="flex items-center gap-1.5 mb-1.5">
          <FileText className="h-3 w-3 text-primary" />
          <span className="font-mono text-[9px] text-primary uppercase tracking-wider font-semibold">Signal</span>
        </div>
        <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-3">
          {company.signalDetail}
        </p>
        {company.sources.primarySource && (
          <a 
            href={company.sources.primarySource} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-[11px] text-primary hover:text-primary/80 font-medium transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Primary Source <ExternalLink className="h-2.5 w-2.5" />
          </a>
        )}
      </div>
      
      {/* Stakeholders */}
      {company.stakeholders.locked ? (
        <div className="mx-4 mb-4 rounded-md border border-dashed border-border bg-muted/10 p-3">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <Users className="h-3 w-3 text-muted-foreground/60" />
              <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
                {company.stakeholders.count} Stakeholders
              </span>
            </div>
            <Lock className="h-3 w-3 text-muted-foreground/40" />
          </div>
          <div className="flex flex-wrap gap-1">
            {company.stakeholders.preview.map((title, i) => (
              <span key={i} className="inline-flex items-center rounded bg-muted/50 px-1.5 py-0.5 text-[10px] text-muted-foreground blur-[2px] select-none">
                {title}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-4 mb-4 rounded-md border border-primary/20 bg-primary/5 p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Users className="h-3 w-3 text-primary" />
              <span className="font-mono text-[9px] text-primary uppercase tracking-wider font-semibold">
                {company.stakeholders.count} Stakeholders
              </span>
            </div>
            <span className="font-mono text-[8px] text-primary bg-primary/10 px-1.5 py-0.5 rounded-full uppercase tracking-wider">Unlocked</span>
          </div>
          <div className="space-y-1.5">
            {company.stakeholders.people?.map((person, i) => (
              <div key={i} className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[12px] font-medium text-foreground truncate">{person.name}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{person.title}</div>
                </div>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  title={`${person.name} on LinkedIn`}
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MidPageCTA({ price, companyCount }: { price: number; companyCount: number }) {
  return (
    <div className="col-span-full my-2">
      <div className="border border-primary/20 bg-primary/5 rounded-lg p-5 text-center">
        <p className="text-sm text-muted-foreground mb-3">
          You&apos;re previewing <strong className="text-foreground">{companyCount} companies</strong> with signal intelligence, regulatory timelines, and urgency scoring.
          <br />
          <span className="text-primary font-medium">Unlock stakeholder maps with names, titles, LinkedIn &amp; emails.</span>
        </p>
        <a href="https://forms.gle/N5MYpSt1p5kiYUUZ9" target="_blank" rel="noopener noreferrer">
          <Button className="rounded-none font-mono bg-foreground text-background hover:bg-foreground/90 px-6 py-5 text-sm cursor-pointer">
            Get Full Access — ${price}/refresh
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </a>
      </div>
    </div>
  )
}

export default function SubmissionSprintPage() {
  const [data, setData] = useState<PackData | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [milestoneFilter, setMilestoneFilter] = useState<string | null>(null)
  const [urgencyFilter, setUrgencyFilter] = useState<string | null>(null)
  const [taFilter, setTaFilter] = useState<string | null>(null)

  useEffect(() => {
    fetch("/data/pack-submission-sprint.json")
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const filteredCompanies = useMemo(() => {
    if (!data) return []
    return data.companies.filter(c => {
      if (milestoneFilter && c.milestone !== milestoneFilter) return false
      if (urgencyFilter && c.urgency !== urgencyFilter) return false
      if (taFilter && c.therapeuticArea !== taFilter) return false
      return true
    })
  }, [data, milestoneFilter, urgencyFilter, taFilter])

  const hasFilters = milestoneFilter || urgencyFilter || taFilter

  const counts = useMemo(() => {
    if (!data) return { milestones: {}, urgencies: {}, tas: {} }
    const m: Record<string, number> = {}
    const u: Record<string, number> = {}
    const t: Record<string, number> = {}
    for (const c of data.companies) {
      m[c.milestone] = (m[c.milestone] || 0) + 1
      u[c.urgency] = (u[c.urgency] || 0) + 1
      t[c.therapeuticArea] = (t[c.therapeuticArea] || 0) + 1
    }
    return { milestones: m, urgencies: u, tas: t }
  }, [data])

  // Compute stats for hero
  const stats = useMemo(() => {
    if (!data) return { criticalCount: 0, avgDays: 0, taCount: 0 }
    let criticalCount = 0
    let totalDays = 0
    let countWithDays = 0
    const now = new Date()
    for (const c of data.companies) {
      if (c.urgency === "Critical") criticalCount++
      const d = new Date(c.expectedDate)
      const days = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      if (days > 0 && days <= 365) {
        totalDays += days
        countWithDays++
      }
    }
    return {
      criticalCount,
      avgDays: countWithDays > 0 ? Math.round(totalDays / countWithDays) : 0,
      taCount: Object.keys(counts.tas).length
    }
  }, [data, counts.tas])

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground font-mono text-sm">Loading pack data...</div>
      </div>
    )
  }

  const visibleCompanies = showAll ? filteredCompanies : filteredCompanies.slice(0, 12)
  const activeFilterCount = [milestoneFilter, urgencyFilter, taFilter].filter(Boolean).length
  const pricePerLead = Math.round(data.pack.price / data.pack.totalCompanies)

  return (
    <div className="min-h-screen bg-background">
      <div className="h-1 w-full bg-gradient-to-r from-[#5ac53a] via-[#d5fd51] via-[#f6c86a] to-[#eb5d2a]" />
      
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          ← Back to Pistachio AI
        </Link>
        
        {/* Hero — benefit-first messaging */}
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
              <h1 className="font-serif text-2xl md:text-4xl font-semibold mb-3">
                Submission Sprint
              </h1>
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
                <strong>{data.pack.totalCompanies} pharma &amp; biotech companies</strong> with imminent FDA submissions — complete with regulatory signals, filing timelines, and decision-maker contacts.
              </p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Their regulatory teams are under deadline pressure and actively evaluating tools. You get the company, the signal, and the people to call.
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="font-mono text-3xl font-bold">${data.pack.price}</div>
              <div className="text-xs text-muted-foreground">per refresh · {data.pack.refreshCadence}</div>
              <a href="https://forms.gle/N5MYpSt1p5kiYUUZ9" target="_blank" rel="noopener noreferrer" className="mt-3 block">
                <Button className="rounded-none font-mono bg-foreground text-background hover:bg-foreground/90 px-6 py-5 text-sm cursor-pointer w-full">
                  Get Access
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
          
          {/* ROI-focused stats — persona C fix */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <div className="rounded-lg border border-border p-3 text-center">
              <div className="font-mono text-xl md:text-2xl font-bold">{data.pack.totalCompanies}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Pre-Qualified Companies</div>
            </div>
            <div className="rounded-lg border border-border p-3 text-center">
              <div className="font-mono text-xl md:text-2xl font-bold text-primary">${pricePerLead}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Per Company</div>
            </div>
            <div className="rounded-lg border border-border p-3 text-center">
              <div className="font-mono text-xl md:text-2xl font-bold text-red-400">{stats.criticalCount}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Critical Urgency</div>
            </div>
            <div className="rounded-lg border border-border p-3 text-center">
              <div className="font-mono text-xl md:text-2xl font-bold">{stats.taCount}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Therapeutic Areas</div>
            </div>
          </div>
        </div>

        {/* ROI callout — persona C fix */}
        <div className="border border-primary/20 bg-primary/5 rounded-lg p-4 mb-4 flex items-start gap-3">
          <TrendingUp className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">
              ${pricePerLead} per pre-qualified lead. If even 1 of {data.pack.totalCompanies} converts, this pays for itself 100x.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Every company has an active FDA filing timeline — these aren&apos;t cold leads, they&apos;re companies under regulatory pressure right now.
            </p>
          </div>
        </div>

        {/* What you get — clear value breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="flex items-start gap-3 rounded-lg border border-border p-3">
            <Building2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium">Company Intelligence</div>
              <div className="text-xs text-muted-foreground">Drug name, indication, phase, filing type, expected date</div>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-border p-3">
            <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium">Signal Intelligence</div>
              <div className="text-xs text-muted-foreground">Filing details, trial results, urgency scoring with sources</div>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-border p-3 relative overflow-hidden">
            <Lock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium">Stakeholder Maps</div>
              <div className="text-xs text-muted-foreground">Names, titles, LinkedIn, verified emails — with purchase</div>
            </div>
            <div className="absolute top-0 right-0 bg-primary/10 text-primary text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl">
              Paid
            </div>
          </div>
        </div>

        {/* Built for callout */}
        <div className="border border-dashed border-foreground/15 bg-muted/30 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <Target className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="font-mono text-[10px] text-primary uppercase tracking-wider font-semibold mb-1">Built For</div>
              <p className="text-sm text-muted-foreground">
                Startups selling regulatory document AI, submission automation, or medical writing tools to pharma.
                We combine regulatory signals + buying intent + decision-maker contacts — so you don&apos;t have to spend weeks on manual research.
              </p>
            </div>
          </div>
        </div>

        {/* Data sources — credibility for persona B */}
        <div className="flex items-center gap-2 flex-wrap mb-4 px-1">
          <Shield className="h-3 w-3 text-muted-foreground/40" />
          <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-wider">Verified Sources:</span>
          <a href="https://www.fda.gov/drugs/development-approval-process-drugs/drug-and-biologic-approval-and-ind-activity-reports" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
            FDA.gov <ExternalLink className="h-2 w-2" />
          </a>
          <span className="text-muted-foreground/20">·</span>
          <a href="https://clinicaltrials.gov" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
            ClinicalTrials.gov <ExternalLink className="h-2 w-2" />
          </a>
          <span className="text-muted-foreground/20">·</span>
          <a href="https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
            SEC EDGAR <ExternalLink className="h-2 w-2" />
          </a>
          <span className="text-muted-foreground/20">·</span>
          <span className="text-[11px] text-muted-foreground">Public press releases</span>
        </div>

        {/* Filter bar */}
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
                  onClick={(e) => { e.stopPropagation(); setMilestoneFilter(null); setUrgencyFilter(null); setTaFilter(null); }}
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
                <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1.5">Milestone</div>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(counts.milestones).sort((a, b) => b[1] - a[1]).map(([m, count]) => (
                    <FilterChip 
                      key={m} 
                      label={m} 
                      count={count} 
                      active={milestoneFilter === m}
                      onClick={() => setMilestoneFilter(milestoneFilter === m ? null : m)} 
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1.5">Urgency</div>
                <div className="flex flex-wrap gap-1.5">
                  {["Critical", "High", "Medium"].map(u => (
                    <FilterChip 
                      key={u} 
                      label={u} 
                      count={counts.urgencies[u] || 0}
                      active={urgencyFilter === u}
                      onClick={() => setUrgencyFilter(urgencyFilter === u ? null : u)} 
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1.5">Therapeutic Area</div>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(counts.tas).sort((a, b) => b[1] - a[1]).map(([ta, count]) => (
                    <FilterChip 
                      key={ta} 
                      label={ta} 
                      count={count}
                      active={taFilter === ta}
                      onClick={() => setTaFilter(taFilter === ta ? null : ta)} 
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Company count header */}
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {filteredCompanies.length} {hasFilters ? "matching" : ""} companies · Sorted by date
          </span>
        </div>
        
        {/* Card grid */}
        {filteredCompanies.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground border border-border rounded-lg">
            No companies match the selected filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleCompanies.flatMap((company, index) => {
              const items = [
                <CompanyCard key={`card-${company.rank}`} company={company} />
              ]
              if (index === 5 && !showAll && filteredCompanies.length > 6) {
                items.push(
                  <MidPageCTA key="mid-cta" price={data.pack.price} companyCount={data.pack.totalCompanies} />
                )
              }
              return items
            })}
          </div>
        )}
        
        {!showAll && filteredCompanies.length > 12 && (
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
        
        {/* Bottom CTA */}
        <div className="mt-8 text-center border border-border p-6 md:p-8 bg-muted/10 rounded-lg">
          <h2 className="font-serif text-xl md:text-2xl font-semibold mb-2">Unlock the full pack</h2>
          <p className="text-muted-foreground text-sm mb-1 max-w-lg mx-auto">
            Get stakeholder maps with names, titles, LinkedIn profiles, and verified emails for all {data.companies.length} companies — plus biweekly refreshes as filings progress.
          </p>
          <p className="text-sm text-primary font-medium mb-4">
            That&apos;s ${pricePerLead}/company for pre-qualified, time-sensitive leads.
          </p>
          <a href="https://forms.gle/N5MYpSt1p5kiYUUZ9" target="_blank" rel="noopener noreferrer">
            <Button className="rounded-none font-mono bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-base cursor-pointer">
              Request Access — ${data.pack.price}/refresh
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </a>
          <p className="text-xs text-muted-foreground mt-3">
            Limited availability · Cancel anytime
          </p>
        </div>
        
        {/* Methodology — credibility for persona B */}
        <div className="mt-6 border border-border rounded-lg p-5 text-sm">
          <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">Methodology</h3>
          <div className="space-y-2 text-muted-foreground text-xs leading-relaxed">
            <p><strong className="text-foreground">Signal sourcing:</strong> Regulatory events are aggregated from FDA.gov (PDUFA dates, designations, approval actions), ClinicalTrials.gov (trial status, phase transitions), SEC EDGAR (funding disclosures, material events), and verified company press releases.</p>
            <p><strong className="text-foreground">Urgency scoring:</strong> Critical = PDUFA/decision date within 30 days. High = within 90 days or active NDA/BLA filing. Medium = filing anticipated within 6 months.</p>
            <p><strong className="text-foreground">Refresh cadence:</strong> This pack is refreshed every two weeks. New companies are added as filings emerge; resolved events (approved/rejected) are archived.</p>
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
