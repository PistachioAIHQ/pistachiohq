"use client"

import { Button } from "@/components/ui/button"
import { Lock, ArrowRight, Calendar, FileText, AlertTriangle, Clock, Building2, Pill, Target, Users, ChevronDown, ChevronUp, ExternalLink, Filter, X, RefreshCw } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useMemo } from "react"

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

function CompanyLogo({ domain, company }: { domain: string; company: string }) {
  const [error, setError] = useState(false)
  
  if (!domain || error) {
    return (
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-[10px] font-mono font-bold text-muted-foreground">
        {company.charAt(0)}
      </div>
    )
  }

  return (
    <Image
      src={`https://img.logo.dev/${domain}?token=pk_JBbN5IBfSNmUyE2Gj2LiiA&retina=true`}
      alt={company}
      width={28}
      height={28}
      className="shrink-0 rounded-md bg-white/10"
      onError={() => setError(true)}
      unoptimized
    />
  )
}

function CompanyRow({ company }: { company: Company }) {
  const [expanded, setExpanded] = useState(false)
  
  const daysUntil = useMemo(() => {
    const d = new Date(company.expectedDate)
    const now = new Date()
    return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  }, [company.expectedDate])

  return (
    <div className="group border-b border-border last:border-b-0">
      <div 
        className="flex items-start gap-3 md:gap-4 p-3 md:p-4 cursor-pointer hover:bg-muted/30 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <CompanyLogo domain={company.domain} company={company.company} />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs text-muted-foreground">{company.ticker}</span>
            <span className="font-serif text-sm md:text-base font-semibold">{company.company}</span>
            <UrgencyBadge urgency={company.urgency} />
          </div>
          <div className="mt-1 flex items-center gap-2 flex-wrap text-xs md:text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Pill className="h-3 w-3 shrink-0" />
              <span className="truncate max-w-[200px]">{company.drug}</span>
            </span>
            <span className="text-border hidden md:inline">·</span>
            <span className="hidden md:inline">{company.indication}</span>
          </div>
          <div className="mt-1.5 flex items-center gap-2 flex-wrap">
            <MilestoneBadge milestone={company.milestone} />
            <TherapeuticBadge area={company.therapeuticArea} />
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-1 shrink-0">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span className="font-mono">{company.expectedDate}</span>
          </div>
          {daysUntil > 0 && daysUntil <= 180 && (
            <span className={`font-mono text-xs ${daysUntil <= 30 ? "text-red-400 font-semibold" : daysUntil <= 60 ? "text-orange-400" : "text-yellow-400/70"}`}>
              {daysUntil}d away
            </span>
          )}
        </div>
        
        <div className="shrink-0 text-muted-foreground mt-1">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </div>
      
      {expanded && (
        <div className="px-3 md:px-4 pb-4">
          <div className="ml-10 space-y-3">
            {/* Signal detail */}
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-3.5 w-3.5 text-primary" />
                <span className="font-mono text-[10px] text-primary uppercase tracking-wider font-semibold">Signal Intelligence</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{company.signalDetail}</p>
              
              {/* Primary source link only */}
              {company.sources.primarySource && (
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border/50">
                  <a 
                    href={company.sources.primarySource} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Primary Source <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                </div>
              )}
            </div>
            
            {/* Stakeholders (locked) */}
            <div className="rounded-lg border border-dashed border-border bg-muted/10 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    {company.stakeholders.count} Key Stakeholders Identified
                  </span>
                </div>
                <Lock className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {company.stakeholders.preview.map((title, i) => (
                  <span key={i} className="inline-flex items-center rounded-md bg-muted/50 px-2 py-0.5 text-[11px] text-muted-foreground blur-[2px] select-none">
                    {title}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground/60 text-center">
                Names, titles, LinkedIn profiles, and email addresses included with pack purchase
              </p>
            </div>
          </div>
        </div>
      )}
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

  // Counts for filter chips
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

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground font-mono text-sm">Loading pack data...</div>
      </div>
    )
  }

  const visibleCompanies = showAll ? filteredCompanies : filteredCompanies.slice(0, 10)
  const activeFilterCount = [milestoneFilter, urgencyFilter, taFilter].filter(Boolean).length

  return (
    <div className="min-h-screen bg-background">
      <div className="h-1 w-full bg-gradient-to-r from-[#5ac53a] via-[#d5fd51] via-[#f6c86a] to-[#eb5d2a]" />
      
      <div className="container mx-auto px-4 py-6 md:py-8">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          ← Back to Pistachio AI
        </Link>
        
        {/* Pack header */}
        <div className="relative border border-border p-5 md:p-8 mb-6">
          <div className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-foreground -translate-x-px -translate-y-px" />
          <div className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-foreground translate-x-px -translate-y-px" />
          <div className="absolute left-0 bottom-0 h-3 w-3 border-l-2 border-b-2 border-foreground -translate-x-px translate-y-px" />
          <div className="absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-foreground translate-x-px translate-y-px" />
          
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">Signal Pack</span>
                <span className="font-mono text-xs text-muted-foreground">Updated {data.pack.lastUpdated}</span>
              </div>
              <h1 className="font-serif text-2xl md:text-4xl font-semibold mb-2">
                Submission Sprint
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
                Companies with imminent FDA submissions — their regulatory teams are under pressure and actively evaluating tools to move faster.
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="font-mono text-3xl font-bold">${data.pack.price}</div>
              <div className="text-xs text-muted-foreground">per refresh · {data.pack.refreshCadence}</div>
            </div>
          </div>
          
          {/* Value stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <div className="rounded-lg border border-border p-3 text-center">
              <div className="font-mono text-xl md:text-2xl font-bold">{data.pack.totalCompanies}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Companies</div>
            </div>
            <div className="rounded-lg border border-border p-3 text-center">
              <div className="font-mono text-xl md:text-2xl font-bold">{Object.keys(counts.tas).length}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Therapeutic Areas</div>
            </div>
            <div className="rounded-lg border border-border p-3 text-center">
              <div className="font-mono text-xl md:text-2xl font-bold">${data.pack.price}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Per Refresh</div>
            </div>
            <div className="rounded-lg border border-border p-3 text-center">
              <div className="flex items-center justify-center gap-1.5">
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-xl md:text-2xl font-bold">2wk</span>
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Update Cadence</div>
            </div>
          </div>
        </div>

        {/* Data sources */}
        <div className="flex items-center gap-2 flex-wrap mb-4 px-1">
          <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-wider">Sources:</span>
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

        {/* Compact collapsible filter bar */}
        <div className="border border-border rounded-lg mb-4">
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
              {filtersOpen ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />}
            </div>
          </button>
          
          {filtersOpen && (
            <div className="px-4 pb-4 pt-1 space-y-3 border-t border-border">
              {/* Milestone filters */}
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
              
              {/* Urgency filters */}
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
              
              {/* Therapeutic area filters */}
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

        {/* Target buyer callout */}
        <div className="border border-dashed border-primary/30 bg-primary/5 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <Target className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="font-mono text-[10px] text-primary uppercase tracking-wider font-semibold mb-1">Built For</div>
              <p className="text-sm text-muted-foreground">
                Startups selling regulatory document AI, submission automation, or medical writing tools to pharma.
                Every company in this pack has an imminent FDA filing — their regulatory teams are under pressure and evaluating new tools.
              </p>
            </div>
          </div>
        </div>
        
        {/* What's included */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="flex items-center gap-2 rounded-lg border border-border p-3">
            <Building2 className="h-4 w-4 text-primary shrink-0" />
            <div>
              <div className="text-sm font-medium">Company Intelligence</div>
              <div className="text-xs text-muted-foreground">Drug, indication, phase, timeline</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border p-3">
            <Clock className="h-4 w-4 text-primary shrink-0" />
            <div>
              <div className="text-sm font-medium">Temporal Signals</div>
              <div className="text-xs text-muted-foreground">PDUFA dates, filing status, urgency</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border p-3 opacity-60">
            <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
            <div>
              <div className="text-sm font-medium">Stakeholder Maps</div>
              <div className="text-xs text-muted-foreground">Names, titles, LinkedIn — with purchase</div>
            </div>
          </div>
        </div>
        
        {/* Company list */}
        <div className="border border-border">
          <div className="border-b border-border bg-muted/30 px-4 py-3 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {filteredCompanies.length} {hasFilters ? "matching" : ""} companies · Sorted by date
            </span>
            <span className="font-mono text-[10px] text-muted-foreground/50">
              Click to expand
            </span>
          </div>
          
          {visibleCompanies.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No companies match the selected filters.
            </div>
          ) : (
            visibleCompanies.map((company) => (
              <CompanyRow key={company.rank} company={company} />
            ))
          )}
          
          {!showAll && filteredCompanies.length > 10 && (
            <div className="p-4 text-center border-t border-border bg-muted/10">
              <Button 
                variant="outline" 
                className="rounded-none font-mono text-xs cursor-pointer"
                onClick={() => setShowAll(true)}
              >
                Show all {filteredCompanies.length} companies
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </div>
          )}
        </div>
        
        {/* CTA */}
        <div className="mt-8 text-center border border-border p-6 md:p-8 bg-muted/10">
          <h2 className="font-serif text-xl md:text-2xl font-semibold mb-2">Unlock the full pack</h2>
          <p className="text-muted-foreground text-sm mb-4 max-w-lg mx-auto">
            Get stakeholder maps with names, titles, LinkedIn profiles, and verified emails for all {data.companies.length} companies — plus biweekly refreshes with new signals as filings progress.
          </p>
          <a href="https://forms.gle/N5MYpSt1p5kiYUUZ9" target="_blank" rel="noopener noreferrer">
            <Button className="rounded-none font-mono bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-base cursor-pointer">
              Request Access — ${data.pack.price}/refresh
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </a>
          <p className="text-xs text-muted-foreground mt-3">
            Private alpha · Cancel anytime
          </p>
        </div>
        
        {/* Methodology */}
        <div className="mt-6 border border-border p-5 text-sm">
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
