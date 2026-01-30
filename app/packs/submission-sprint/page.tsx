"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, ArrowRight, Calendar, FileText, AlertTriangle, Clock, Building2, Pill, Target, Users, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface Company {
  rank: number
  ticker: string
  company: string
  drug: string
  indication: string
  milestone: string
  expectedDate: string
  signalType: string
  signalDetail: string
  urgency: string
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
    "Regulatory Decision": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  }
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider ${styles[milestone] || "bg-muted text-muted-foreground border-border"}`}>
      {milestone}
    </span>
  )
}

function CompanyRow({ company, index }: { company: Company; index: number }) {
  const [expanded, setExpanded] = useState(false)
  
  const daysUntil = (() => {
    const d = new Date(company.expectedDate)
    const now = new Date()
    const diff = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  })()

  return (
    <div className="group border-b border-border last:border-b-0">
      <div 
        className="flex items-start gap-4 p-4 cursor-pointer hover:bg-muted/30 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Rank */}
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-xs font-medium text-muted-foreground">
          {company.rank}
        </div>
        
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs text-muted-foreground">{company.ticker}</span>
            <span className="font-serif text-base font-semibold">{company.company}</span>
            <UrgencyBadge urgency={company.urgency} />
          </div>
          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Pill className="h-3 w-3" />
              {company.drug}
            </span>
            <span className="text-border">·</span>
            <span>{company.indication}</span>
          </div>
        </div>
        
        {/* Right side */}
        <div className="flex flex-col items-end gap-1 shrink-0">
          <MilestoneBadge milestone={company.milestone} />
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {company.expectedDate}
            {daysUntil > 0 && daysUntil <= 90 && (
              <span className={`ml-1 font-mono ${daysUntil <= 30 ? "text-red-400" : daysUntil <= 60 ? "text-orange-400" : "text-yellow-400"}`}>
                ({daysUntil}d)
              </span>
            )}
          </div>
        </div>
        
        <div className="shrink-0 text-muted-foreground">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </div>
      
      {/* Expanded detail */}
      {expanded && (
        <div className="px-4 pb-4 pl-15">
          <div className="ml-11 space-y-3">
            {/* Signal detail */}
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-3.5 w-3.5 text-primary" />
                <span className="font-mono text-xs text-primary uppercase tracking-wider font-semibold">Signal Intelligence</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{company.signalDetail}</p>
            </div>
            
            {/* Stakeholders (locked) */}
            <div className="rounded-lg border border-dashed border-border bg-muted/10 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    {company.stakeholders.count} Key Stakeholders
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
              <div className="mt-2 text-center">
                <span className="text-xs text-muted-foreground">
                  Names, titles, and LinkedIn URLs available with pack purchase
                </span>
              </div>
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

  useEffect(() => {
    fetch("/data/pack-submission-sprint.json")
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground font-mono text-sm">Loading pack data...</div>
      </div>
    )
  }

  const visibleCompanies = showAll ? data.companies : data.companies.slice(0, 10)
  const urgencyCounts = {
    critical: data.companies.filter(c => c.urgency === "Critical").length,
    high: data.companies.filter(c => c.urgency === "High").length,
    medium: data.companies.filter(c => c.urgency === "Medium").length,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#5ac53a] via-[#d5fd51] via-[#f6c86a] to-[#eb5d2a]" />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          ← Back to Pistachio AI
        </Link>
        
        {/* Pack header */}
        <div className="relative border border-border rounded-none p-6 md:p-8 mb-6">
          <div className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-foreground -translate-x-px -translate-y-px" />
          <div className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-foreground translate-x-px -translate-y-px" />
          <div className="absolute left-0 bottom-0 h-3 w-3 border-l-2 border-b-2 border-foreground -translate-x-px translate-y-px" />
          <div className="absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-foreground translate-x-px translate-y-px" />
          
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">Pack #1</span>
                <span className="font-mono text-xs text-muted-foreground">Updated {data.pack.lastUpdated}</span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-2">
                🟢 {data.pack.name}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {data.pack.tagline}
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="font-mono text-3xl font-bold">${data.pack.price}</div>
              <div className="text-xs text-muted-foreground">per refresh · {data.pack.refreshCadence}</div>
            </div>
          </div>
          
          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <div className="rounded-lg border border-border p-3 text-center">
              <div className="font-mono text-2xl font-bold">{data.pack.totalCompanies}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Companies</div>
            </div>
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-center">
              <div className="font-mono text-2xl font-bold text-red-400">{urgencyCounts.critical}</div>
              <div className="text-[10px] text-red-400/70 uppercase tracking-wider mt-0.5">Critical</div>
            </div>
            <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-3 text-center">
              <div className="font-mono text-2xl font-bold text-orange-400">{urgencyCounts.high}</div>
              <div className="text-[10px] text-orange-400/70 uppercase tracking-wider mt-0.5">High Urgency</div>
            </div>
            <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3 text-center">
              <div className="font-mono text-2xl font-bold text-yellow-400">{urgencyCounts.medium}</div>
              <div className="text-[10px] text-yellow-400/70 uppercase tracking-wider mt-0.5">Medium</div>
            </div>
          </div>
        </div>
        
        {/* Target buyer callout */}
        <div className="border border-dashed border-primary/30 bg-primary/5 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Target className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="font-mono text-xs text-primary uppercase tracking-wider font-semibold mb-1">Who This Pack Is For</div>
              <p className="text-sm text-muted-foreground">
                Startups selling regulatory document AI, submission automation, or medical writing tools to pharma.
                Every company in this pack has an imminent FDA filing — their regulatory teams are maxed and actively looking for tools to move faster.
              </p>
            </div>
          </div>
        </div>
        
        {/* What's included */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="flex items-center gap-2 rounded-lg border border-border p-3">
            <Building2 className="h-4 w-4 text-primary" />
            <div>
              <div className="text-sm font-medium">Company Intelligence</div>
              <div className="text-xs text-muted-foreground">Drug, indication, phase, timeline</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border p-3">
            <Clock className="h-4 w-4 text-primary" />
            <div>
              <div className="text-sm font-medium">Temporal Signals</div>
              <div className="text-xs text-muted-foreground">PDUFA dates, filing status, urgency</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border p-3 opacity-60">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">Stakeholder Maps</div>
              <div className="text-xs text-muted-foreground">Names, titles, LinkedIn — with purchase</div>
            </div>
          </div>
        </div>
        
        {/* Company list */}
        <div className="border border-border rounded-none">
          <div className="border-b border-border bg-muted/30 px-4 py-3 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {data.companies.length} Companies · Sorted by urgency
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              Click any row to expand
            </span>
          </div>
          
          {visibleCompanies.map((company, i) => (
            <CompanyRow key={company.rank} company={company} index={i} />
          ))}
          
          {!showAll && data.companies.length > 10 && (
            <div className="p-4 text-center border-t border-border bg-muted/10">
              <Button 
                variant="outline" 
                className="rounded-none font-mono text-xs"
                onClick={() => setShowAll(true)}
              >
                Show all {data.companies.length} companies
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </div>
          )}
        </div>
        
        {/* CTA */}
        <div className="mt-8 text-center border border-border rounded-none p-8 bg-muted/10">
          <h2 className="font-serif text-2xl font-semibold mb-2">Get the full pack</h2>
          <p className="text-muted-foreground text-sm mb-4 max-w-lg mx-auto">
            Unlock stakeholder maps with names, titles, and LinkedIn URLs for all {data.companies.length} companies.
            Plus get biweekly refreshes with new signals.
          </p>
          <a href="https://forms.gle/N5MYpSt1p5kiYUUZ9" target="_blank" rel="noopener noreferrer">
            <Button className="rounded-none font-mono bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-base">
              Request Access — ${data.pack.price}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </a>
          <p className="text-xs text-muted-foreground mt-3">
            Private alpha · Includes {data.pack.refreshCadence.toLowerCase()} refreshes
          </p>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>Data sourced from FDA.gov, ClinicalTrials.gov, SEC EDGAR, and public press releases.</p>
          <p className="mt-1">© 2026 Pistachio AI · <Link href="/" className="underline hover:text-foreground">pistachiohq.ai</Link></p>
        </div>
      </div>
      
      <div className="h-3 w-full bg-gradient-to-r from-[#5ac53a] via-[#d5fd51] via-[#f6c86a] to-[#eb5d2a] mt-8" />
    </div>
  )
}
