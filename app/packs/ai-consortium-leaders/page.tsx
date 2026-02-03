"use client"

import { Button } from "@/components/ui/button"
import { Lock, ArrowRight, FileText, Users, ChevronDown, Target, TrendingUp, Network, Shield } from "lucide-react"
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
  company: string
  ticker?: string
  domain?: string
  consortium?: string
  role?: string
  signalDetail: string
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

function CompanyLogo({ domain, company, size = 32 }: { domain?: string; company: string; size?: number }) {
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

const AVATAR_COLORS = [
  "bg-violet-500/20 text-violet-400",
  "bg-cyan-500/20 text-cyan-400",
  "bg-amber-500/20 text-amber-400",
  "bg-rose-500/20 text-rose-400",
  "bg-emerald-500/20 text-emerald-400",
]

function nameToColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
}

function PersonNode({ person }: { person: StakeholderPerson }) {
  const [imgError, setImgError] = useState(false)
  const linkedinHandle = person.linkedin?.split("/in/")[1]?.replace(/\/$/, "")
  
  return (
    <div className="flex items-center gap-2">
      {!imgError && linkedinHandle ? (
        <Image
          src={`https://unavatar.io/linkedin/${linkedinHandle}`}
          alt={person.name}
          width={28}
          height={28}
          className="rounded-full object-cover"
          onError={() => setImgError(true)}
          unoptimized
        />
      ) : (
        <div className={`flex items-center justify-center rounded-full font-mono text-[10px] font-bold w-7 h-7 ${nameToColor(person.name)}`}>
          {getInitials(person.name)}
        </div>
      )}
      <div className="min-w-0">
        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-medium text-foreground hover:text-primary transition-colors leading-tight block truncate"
        >
          {person.name}
        </a>
        <div className="text-[9px] text-muted-foreground leading-tight truncate">{person.title}</div>
      </div>
    </div>
  )
}

function ConsortiumBadge({ consortium }: { consortium: string }) {
  const colors: Record<string, string> = {
    "AISB/OpenFold3": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "Pistoia Alliance": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "MELLODDY": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${colors[consortium] || "bg-muted text-muted-foreground border-border"}`}>
      <Network className="h-2.5 w-2.5" />
      {consortium}
    </span>
  )
}

function CompanyCard({ company }: { company: Company }) {
  return (
    <div className="group flex flex-col border border-border rounded-lg hover:border-foreground/20 transition-all duration-200 hover:shadow-[0_0_20px_rgba(90,197,58,0.04)] bg-background">
      <div className="p-4 pb-3">
        <div className="flex items-start gap-3">
          <CompanyLogo domain={company.domain} company={company.company} size={36} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-serif text-sm font-semibold leading-tight">{company.company}</span>
              {company.ticker && <span className="font-mono text-[11px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">{company.ticker}</span>}
            </div>
            {company.consortium && (
              <div className="mt-1.5">
                <ConsortiumBadge consortium={company.consortium} />
              </div>
            )}
          </div>
        </div>
        
        {company.role && (
          <div className="mt-2">
            <span className="inline-flex items-center gap-1 text-[11px] text-foreground/80 font-medium">
              <Shield className="h-3 w-3 text-primary" /> {company.role}
            </span>
          </div>
        )}
      </div>
      
      <div className="mx-4 mb-3 rounded-md border border-border bg-muted/20 p-3">
        <div className="flex items-center gap-1.5 mb-1.5">
          <FileText className="h-3 w-3 text-primary" />
          <span className="font-mono text-[9px] text-primary uppercase tracking-wider font-semibold">Signal</span>
        </div>
        <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-3">
          {company.signalDetail}
        </p>
      </div>
      
      {company.stakeholders.locked ? (
        <div className="mx-4 mb-4 rounded-md border border-dashed border-border bg-muted/10 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Lock className="h-3 w-3 text-muted-foreground/60" />
              <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
                {company.stakeholders.count} stakeholders
              </span>
            </div>
            <span className="text-[9px] text-muted-foreground">Unlock with purchase</span>
          </div>
        </div>
      ) : company.stakeholders.people && company.stakeholders.people.length > 0 && (
        <div className="mx-4 mb-4 rounded-md border border-primary/20 bg-primary/5 p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Users className="h-3 w-3 text-primary" />
            <span className="font-mono text-[9px] text-primary uppercase tracking-wider font-semibold">
              Key Contacts
            </span>
          </div>
          <div className="space-y-2">
            {company.stakeholders.people.slice(0, 3).map((person, i) => (
              <PersonNode key={i} person={person} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function AiConsortiumLeadersPage() {
  const [data, setData] = useState<PackData | null>(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    fetch("/data/pack-ai-consortium-leaders.json")
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const pricePerLead = useMemo(() => {
    if (!data) return 0
    return Math.round(data.pack.price / data.pack.totalCompanies)
  }, [data])

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground font-mono text-sm">Loading pack data...</div>
      </div>
    )
  }

  const visibleCompanies = showAll ? data.companies : data.companies.slice(0, 12)

  return (
    <div className="min-h-screen bg-background">
      <div className="h-1 w-full bg-gradient-to-r from-[#5ac53a] via-[#d5fd51] via-[#f6c86a] to-[#eb5d2a]" />
      
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          ← Back to Pistachio AI
        </Link>
        
        <div className="relative border border-border p-5 md:p-8 mb-6">
          <div className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-foreground -translate-x-px -translate-y-px" />
          <div className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-foreground translate-x-px -translate-y-px" />
          <div className="absolute left-0 bottom-0 h-3 w-3 border-l-2 border-b-2 border-foreground -translate-x-px translate-y-px" />
          <div className="absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-foreground translate-x-px translate-y-px" />
          
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">Premium Pack</span>
                <span className="font-mono text-xs text-muted-foreground">Updated {data.pack.lastUpdated}</span>
              </div>
              <h1 className="font-serif text-2xl md:text-4xl font-semibold mb-3">
                {data.pack.name}
              </h1>
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
                <strong>{data.pack.totalCompanies} major pharma companies</strong> actively shaping AI standards through OpenFold3/AISB, Pistoia Alliance, and other leading consortia.
              </p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {data.pack.description}
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="font-mono text-3xl font-bold">${data.pack.price}</div>
              <div className="text-xs text-muted-foreground">per refresh · {data.pack.refreshCadence}</div>
              <a href="https://forms.gle/N5MYpSt1p5kiYUUZ9" target="_blank" rel="noopener noreferrer" className="mt-3 block">
                <Button className="rounded-none font-mono bg-foreground text-background hover:bg-foreground/90 px-6 py-5 text-sm cursor-pointer w-full">
                  Get Access <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <div className="rounded-lg border border-border p-3 text-center">
              <div className="font-mono text-xl md:text-2xl font-bold">{data.pack.totalCompanies}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Companies</div>
            </div>
            <div className="rounded-lg border border-border p-3 text-center">
              <div className="font-mono text-xl md:text-2xl font-bold">{data.pack.totalStakeholders}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Stakeholders</div>
            </div>
            <div className="rounded-lg border border-border p-3 text-center">
              <div className="font-mono text-xl md:text-2xl font-bold text-primary">${pricePerLead}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Per Company</div>
            </div>
            <div className="rounded-lg border border-border p-3 text-center">
              <Network className="h-5 w-5 mx-auto text-emerald-400" />
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Consortium Verified</div>
            </div>
          </div>
        </div>

        <div className="border border-primary/20 bg-primary/5 rounded-lg p-4 mb-4 flex items-start gap-3">
          <TrendingUp className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">
              These leaders are actively shaping industry AI standards — they have both the vision AND budget authority for AI tools.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Includes participants in OpenFold3/AISB (protein structure AI) and Pistoia Alliance Agentic AI Initiative.
            </p>
          </div>
        </div>

        <div className="border border-dashed border-foreground/15 bg-muted/30 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Target className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="font-mono text-[10px] text-primary uppercase tracking-wider font-semibold mb-1">Built For</div>
              <p className="text-sm text-muted-foreground">{data.pack.targetBuyer}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 px-1">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {data.companies.length} companies
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleCompanies.map((company) => (
            <CompanyCard key={company.rank} company={company} />
          ))}
        </div>
        
        {!showAll && data.companies.length > 12 && (
          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              className="rounded-none font-mono text-xs cursor-pointer px-8 py-5"
              onClick={() => setShowAll(true)}
            >
              Show all {data.companies.length} companies
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </div>
        )}
        
        <div className="mt-8 text-center border border-border p-6 md:p-8 bg-muted/10 rounded-lg">
          <h2 className="font-serif text-xl md:text-2xl font-semibold mb-2">Unlock the full pack</h2>
          <p className="text-muted-foreground text-sm mb-4 max-w-lg mx-auto">
            Get complete stakeholder data with names, titles, LinkedIn profiles, and verified emails for all {data.companies.length} companies.
          </p>
          <a href="https://forms.gle/N5MYpSt1p5kiYUUZ9" target="_blank" rel="noopener noreferrer">
            <Button className="rounded-none font-mono bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-base cursor-pointer">
              Request Access — ${data.pack.price}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </a>
        </div>
        
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>© 2026 Pistachio AI · <Link href="/" className="underline hover:text-foreground">trypistachio.ai</Link></p>
        </div>
      </div>
      
      <div className="h-3 w-full bg-gradient-to-r from-[#5ac53a] via-[#d5fd51] via-[#f6c86a] to-[#eb5d2a] mt-8" />
    </div>
  )
}
