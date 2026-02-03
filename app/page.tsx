"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Target, TrendingUp, Users, Zap, ExternalLink, Calendar, Briefcase, MessageCircle, Database, Linkedin, FileText, Mail, ThumbsUp, MessageSquare, Clock, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

// Stakeholder data with source evidence
const stakeholders = [
  {
    id: 1,
    name: "David Lam",
    title: "VP Data Science",
    company: "AstraZeneca",
    logo: "https://img.logo.dev/astrazeneca.com?token=pk_bUM9Jb7fRFSsD3V1KHoDxg",
    fitScore: 94,
    signals: [
      { 
        icon: "linkedin", 
        text: "Confirmed attending Bio-IT World", 
        highlight: true,
        source: {
          type: "linkedin",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
          name: "David Lam",
          handle: "@davidlam_az",
          content: "Excited to be heading to Boston next week for #BioITWorld! Looking forward to connecting with others working on ML infrastructure for drug discovery. DMs open 🧬",
          likes: 847,
          comments: 92,
          time: "3 days ago"
        }
      },
      { 
        icon: "file", 
        text: "5 publications on ML in drug discovery", 
        highlight: false,
        source: {
          type: "publication",
          title: "Scaling Molecular Representations for High-Throughput Drug Screening",
          journal: "Nature Machine Intelligence",
          date: "Oct 2025",
          citations: 127,
          coauthors: "Chen, S., Patel, R., et al."
        }
      },
      { 
        icon: "trending", 
        text: "2 posts on AI workflows this month", 
        highlight: false,
        source: {
          type: "linkedin",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
          name: "David Lam",
          handle: "@davidlam_az",
          content: "Our team just hit a wall scaling molecular embeddings past 10M compounds. Anyone else dealing with this? Current infra just can't keep up with the compute demands...",
          likes: 234,
          comments: 56,
          time: "5 days ago"
        }
      },
    ],
    whyRelevant: "His team is actively scaling ML infrastructure for molecular representations — exactly the problem your platform solves.",
    opener: "Saw your post on scaling molecular representations — we've been working with teams hitting similar limits. Compare notes at Bio-IT?",
    action: { type: "connect", label: "Connect on LinkedIn", icon: "linkedin" },
    timeSaved: {
      hours: "2.5",
      freshSignal: "LinkedIn post 3 days ago",
      manualEffort: "Daily LinkedIn monitoring"
    },
  },
  {
    id: 2,
    name: "Sarah Chen",
    title: "Head of Computational Bio",
    company: "Roche",
    logo: "https://img.logo.dev/roche.com?token=pk_bUM9Jb7fRFSsD3V1KHoDxg",
    fitScore: 89,
    signals: [
      { 
        icon: "briefcase", 
        text: "Team hiring 5 roles in AI/ML", 
        highlight: true,
        source: {
          type: "jobs",
          roles: [
            { title: "Senior ML Engineer", location: "Basel, CH", posted: "2 days ago" },
            { title: "AI Research Scientist", location: "Basel, CH", posted: "1 week ago" },
            { title: "Data Platform Lead", location: "South SF, CA", posted: "1 week ago" },
          ],
          totalOpen: 5
        }
      },
      { 
        icon: "users", 
        text: "She leads the team they're building", 
        highlight: false,
        source: {
          type: "org",
          teamSize: 23,
          reportsTo: "VP R&D Informatics",
          directReports: 5,
          recentHires: 3
        }
      },
      { 
        icon: "calendar", 
        text: "Spoke at AACR on target ID", 
        highlight: false,
        source: {
          type: "event",
          eventName: "AACR Annual Meeting 2025",
          talkTitle: "ML-Driven Target Identification: Lessons from Oncology",
          date: "April 2025",
          attendees: "~21,000"
        }
      },
    ],
    whyRelevant: "Teams scaling up AI/ML often need external platforms to accelerate — your timing is perfect as she builds.",
    opener: "Noticed your team is scaling up AI/ML — happy to share what's worked for similar buildouts. Free for coffee at Bio-IT?",
    action: { type: "email", label: "Send Intro Email", icon: "mail" },
    timeSaved: {
      hours: "3",
      freshSignal: "Job posting 2 days ago",
      manualEffort: "Weekly careers page checks"
    },
  },
  {
    id: 3,
    name: "Michael Torres",
    title: "Dir. External Innovation",
    company: "Novartis",
    logo: "https://img.logo.dev/novartis.com?token=pk_bUM9Jb7fRFSsD3V1KHoDxg",
    fitScore: 91,
    signals: [
      { 
        icon: "calendar", 
        text: "Hosting AI in Pharma Partnerships panel", 
        highlight: true,
        source: {
          type: "event",
          eventName: "Bio-IT World Conference",
          talkTitle: "AI in Pharma Partnerships: What's Working",
          date: "Jan 14, 2:00 PM",
          venue: "Marriott Marquis, Grand Ballroom",
          role: "Moderator"
        }
      },
      { 
        icon: "trending", 
        text: "3 deals closed in 2025 with AI biotechs", 
        highlight: false,
        source: {
          type: "deals",
          deals: [
            { company: "Recursion", type: "Partnership", value: "$30M", date: "Sep 2025" },
            { company: "Insilico Medicine", type: "License", value: "Undisclosed", date: "Jun 2025" },
            { company: "Exscientia", type: "Collaboration", value: "$25M", date: "Mar 2025" },
          ]
        }
      },
      { 
        icon: "database", 
        text: "Actively scouting AI platforms", 
        highlight: false,
        source: {
          type: "linkedin",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
          name: "Michael Torres",
          handle: "@mtorres_nvs",
          content: "Great conversations at Bio-IT World last week. Always looking to meet early-stage AI/ML companies pushing boundaries in drug discovery. If that's you, let's connect!",
          likes: 412,
          comments: 78,
          time: "2 weeks ago"
        }
      },
    ],
    whyRelevant: "He's the decision-maker for AI partnerships and has a track record of closing deals with companies like yours.",
    opener: "Looking forward to your panel — we've helped accelerate a few AI partnerships in this space. Would love to connect after.",
    action: { type: "event", label: "RSVP to Panel", icon: "calendar" },
    timeSaved: {
      hours: "4",
      freshSignal: "Panel announced last week",
      manualEffort: "Conference agenda tracking"
    },
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Pistachio AI",
  applicationCategory: "BusinessApplication",
  description: "Commercial intelligence platform for life sciences BD and commercial teams. Find the right accounts, stakeholders, and timing signals using real-time data from clinical trials, publications, conferences, and hiring activity.",
  url: "https://trypistachio.ai",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/LimitedAvailability",
    description: "Private alpha access",
  },
  creator: {
    "@type": "Organization",
    name: "Pistachio AI",
    url: "https://trypistachio.ai",
  },
}

export default function Page() {
  const [showCards, setShowCards] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredSignal, setHoveredSignal] = useState<string | null>(null)
  const [hoveredContext, setHoveredContext] = useState(false)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowCards(true)
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '-50px 0px 0px 0px'
      }
    )

    if (cardsRef.current) {
      observer.observe(cardsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="h-1 w-full bg-gradient-to-r from-[#5ac53a] via-[#d5fd51] via-[#f6c86a] to-[#eb5d2a]" />

      <div className="container mx-auto px-4 pt-4 pb-0">
        <header className="relative border border-border bg-transparent">
          {/* Top-left corner bracket */}
          <div className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-foreground -translate-x-px -translate-y-px" />
          {/* Top-right corner bracket */}
          <div className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-foreground translate-x-px -translate-y-px" />
          {/* Bottom-left corner bracket */}
          <div className="absolute left-0 bottom-0 h-3 w-3 border-l-2 border-b-2 border-foreground -translate-x-px translate-y-px" />
          {/* Bottom-right corner bracket */}
          <div className="absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-foreground translate-x-px translate-y-px" />

          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-sm bg-primary" />
              <span className="font-serif font-medium text-xl">Pistachio AI</span>
            </div>
            <a href="https://forms.gle/N5MYpSt1p5kiYUUZ9" target="_blank" rel="noopener noreferrer" className="hidden sm:block">
              <Button size="sm" className="font-mono bg-foreground text-background hover:bg-foreground/90">
                Request alpha access
              </Button>
            </a>
          </div>
        </header>
      </div>

      <div className="container mx-auto px-4">
        <div
          className="h-5 w-full"
          style={{
            background:
              "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(31,33,35,0.15) 4px, rgba(31,33,35,0.15) 6px)",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-0 pb-4">
        <div className="relative border border-border bg-transparent px-6 py-12">
          {/* Top-left corner bracket */}
          <div className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-foreground -translate-x-px -translate-y-px" />
          {/* Top-right corner bracket */}
          <div className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-foreground translate-x-px -translate-y-px" />
          {/* Bottom-left corner bracket */}
          <div className="absolute left-0 bottom-0 h-3 w-3 border-l-2 border-b-2 border-foreground -translate-x-px translate-y-px" />
          {/* Bottom-right corner bracket */}
          <div className="absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-foreground translate-x-px translate-y-px" />

          <div className="mb-3 flex items-center gap-2">
            <span className="font-mono inline-block rounded-full px-3 py-1 text-xs font-medium text-accent-foreground bg-secondary">
              Private alpha · 5 seats remaining
            </span>
          </div>

          <h1 className="font-serif mb-2 max-w-4xl text-4xl leading-tight text-balance md:text-5xl lg:text-6xl">
            Find the right life sciences accounts
          </h1>

          <h2 className="font-serif mb-4 max-w-4xl text-3xl leading-tight text-balance md:text-4xl lg:text-5xl">
            and the <span className="text-primary">signal</span> that makes them ready now.
          </h2>

          <p className="mb-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Pistachio helps life sciences BD and commercial teams identify who to target, when to reach out, and why now
            — using real-time signals from clinical trials, publications, conferences, and hiring activity.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a href="https://forms.gle/N5MYpSt1p5kiYUUZ9" target="_blank" rel="noopener noreferrer">
              <Button className="font-mono bg-foreground text-background hover:bg-foreground/90">
                Request alpha access
              </Button>
            </a>
            <Button 
              variant="outline" 
              className="font-mono gap-2 bg-transparent"
              onClick={() => document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See how it works <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Company Logo Avatar Group */}
          <div className="mt-8 flex items-center gap-4">
            <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Tracking signals from</span>
            <div className="flex items-center -space-x-2">
              {[
                { name: "Pfizer", domain: "pfizer.com" },
                { name: "Roche", domain: "roche.com" },
                { name: "Novartis", domain: "novartis.com" },
                { name: "AstraZeneca", domain: "astrazeneca.com" },
                { name: "Merck", domain: "merck.com" },
                { name: "Johnson & Johnson", domain: "jnj.com" },
                { name: "Sanofi", domain: "sanofi.com" },
                { name: "GSK", domain: "gsk.com" },
              ].map((company, i) => (
                <div 
                  key={company.domain}
                  className="h-9 w-9 rounded-full border-2 border-background bg-white shadow-sm flex items-center justify-center overflow-hidden transition-transform hover:scale-110 hover:z-10"
                  style={{ zIndex: 8 - i }}
                  title={company.name}
                >
                  <img
                    src={`https://img.logo.dev/${company.domain}?token=pk_bUM9Jb7fRFSsD3V1KHoDxg`}
                    alt={company.name}
                    className="h-5 w-5 object-contain"
                  />
                </div>
              ))}
              <div className="h-9 w-9 rounded-full border-2 border-background bg-neutral-100 shadow-sm flex items-center justify-center text-xs font-mono text-neutral-500 font-semibold">
                +200
              </div>
            </div>
          </div>

          {/* Priority Stakeholders Showcase - App Frame */}
          <div ref={cardsRef} className="mt-16 relative">
            {/* Background container with image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-300">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/life-sciences-data-visualization.jpg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

              {/* Browser Chrome */}
              <div className="relative">
                <div className="flex items-center justify-between border-b border-neutral-200/50 bg-white/90 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#ff5f57]" />
                      <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#febc2e]" />
                      <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#28c840]" />
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="hidden sm:flex items-center gap-2 bg-neutral-100 rounded-lg px-4 py-1.5">
                      <div className="h-3 w-3 rounded-sm bg-[#5ac53a]" />
                      <span className="font-mono text-xs text-neutral-600">trypistachio.ai/dashboard</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#5ac53a] animate-pulse" />
                    <span className="font-mono text-[10px] text-neutral-500">Live</span>
                  </div>
                </div>

                {/* App Content */}
                <div className="relative p-6 md:p-8">
                  {/* Section Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-[#5ac53a] shadow-lg shadow-[#5ac53a]/30">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl md:text-2xl font-semibold text-neutral-900">Priority Stakeholders</h3>
                      <span className="text-sm text-neutral-600 mt-0.5 block">
                        Surfaced from 1,200+ signals across{' '}
                        <span 
                          className="relative inline-block"
                          onMouseEnter={() => setHoveredContext(true)}
                          onMouseLeave={() => setHoveredContext(false)}
                        >
                          <span className="inline-flex items-center gap-1 text-neutral-800 cursor-pointer font-semibold hover:text-neutral-900 transition-colors group">
                            <span className="underline decoration-dotted decoration-neutral-400 underline-offset-2 group-hover:decoration-neutral-600">your target market</span>
                            <svg className="h-3 w-3 opacity-50 group-hover:opacity-80 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          </span>
                          
                          {/* Context Popover */}
                          {hoveredContext && (
                            <span className="absolute left-0 top-full mt-2 z-50 w-72 p-4 bg-white rounded-xl shadow-xl border border-neutral-200 animate-in fade-in slide-in-from-top-2 duration-200 block">
                              <span className="flex items-center gap-2 mb-3 pb-2 border-b border-neutral-100">
                                <span className="h-6 w-6 rounded-lg bg-[#d5fd51] flex items-center justify-center">
                                  <Database className="h-3.5 w-3.5 text-[#5ac53a]" />
                                </span>
                                <span className="text-xs font-semibold text-neutral-900">Your Inputs</span>
                              </span>
                              
                              <span className="space-y-2.5 text-[11px] block">
                                <span className="flex items-start gap-2">
                                  <span className="text-neutral-400 w-16 shrink-0">Market</span>
                                  <span className="text-neutral-700 font-medium">Top 50 Pharma & Mid-size Biotech</span>
                                </span>
                                <span className="flex items-start gap-2">
                                  <span className="text-neutral-400 w-16 shrink-0">Product</span>
                                  <span className="text-neutral-700 font-medium">AI platform for molecular discovery</span>
                                </span>
                                <span className="flex items-start gap-2">
                                  <span className="text-neutral-400 w-16 shrink-0">Focus</span>
                                  <span className="text-neutral-700 font-medium">Q1 conference outreach</span>
                                </span>
                                <span className="flex items-start gap-2">
                                  <span className="text-neutral-400 w-16 shrink-0">Goal</span>
                                  <span className="text-neutral-700 font-medium">Book 15 qualified meetings</span>
                                </span>
                              </span>
                              
                              <span className="mt-3 pt-2 border-t border-neutral-100 flex items-center gap-1.5 text-[10px] text-neutral-400">
                                <Sparkles className="h-3 w-3 text-[#5ac53a]" />
                                <span>Pistachio uses these to rank stakeholders</span>
                              </span>
                            </span>
                          )}
                        </span>
                      </span>
                    </div>
                  </div>

            {/* Stakeholder Cards Grid */}
            <div className="grid gap-4 md:gap-5 lg:grid-cols-3 items-stretch">
              {stakeholders.map((person, index) => (
                <div
                  key={person.id}
                  className={`group relative rounded-xl border bg-white overflow-hidden transition-all duration-700 ease-out
                    ${showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                    ${hoveredCard === person.id ? 'border-[#5ac53a] shadow-lg shadow-[#5ac53a]/10 scale-[1.02]' : 'border-neutral-200 hover:border-[#5ac53a]/40'}
                  `}
                  style={{ 
                    transitionDelay: showCards ? `${index * 150}ms` : '0ms',
                  }}
                  onMouseEnter={() => setHoveredCard(person.id)}
                  onMouseLeave={() => { setHoveredCard(null); setHoveredSignal(null); }}
                >
                  {/* Animated gradient border on hover */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-[#5ac53a] via-[#d5fd51] to-[#5ac53a] opacity-0 transition-opacity duration-300 ${hoveredCard === person.id ? 'opacity-100' : ''}`} style={{ padding: '1px' }}>
                    <div className="absolute inset-[1px] rounded-[11px] bg-white" />
                  </div>

                  <div className="relative p-4 md:p-5 flex flex-col h-full">
                    {/* Header with Avatar & Fit Score */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={person.logo}
                            alt={person.company}
                            className="h-11 w-11 rounded-lg object-contain bg-neutral-50 p-1.5 border border-neutral-100 transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white transition-all duration-300 ${hoveredCard === person.id ? 'scale-125' : ''} bg-[#5ac53a]`} />
                        </div>
                        <div>
                          <p className="font-serif text-base md:text-lg text-neutral-900 font-semibold group-hover:text-[#5ac53a] transition-colors">{person.name}</p>
                          <p className="text-xs md:text-sm text-neutral-500">{person.title} · {person.company}</p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 bg-[#5ac53a]/10 transition-all duration-300 ${hoveredCard === person.id ? 'scale-105' : ''}`}>
                        <span className="text-lg font-bold text-[#5ac53a] font-mono leading-none">{person.fitScore}</span>
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#5ac53a]/70">fit</span>
                      </div>
                    </div>

                    {/* How We Found Them - Signals with Hover Cards */}
                    <div className="mb-4">
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <Sparkles className="h-3 w-3 text-[#5ac53a]" />
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">Signals detected</span>
                      </div>
                      <div className="space-y-1.5">
                        {person.signals.map((signal, i) => (
                          <div 
                            key={i} 
                            className="relative"
                            onMouseEnter={() => setHoveredSignal(`${person.id}-${i}`)}
                            onMouseLeave={() => setHoveredSignal(null)}
                          >
                            <div 
                              className={`flex items-center gap-2 text-xs transition-all duration-300 cursor-pointer rounded-md px-1.5 py-1 -mx-1.5 hover:bg-neutral-50`}
                            >
                              <div className={`flex items-center justify-center h-5 w-5 rounded-full shrink-0 transition-colors ${signal.highlight ? 'bg-[#5ac53a]/10' : 'bg-neutral-100'}`}>
                                {signal.icon === 'linkedin' && <Linkedin className={`h-2.5 w-2.5 ${signal.highlight ? 'text-[#5ac53a]' : 'text-neutral-400'}`} />}
                                {signal.icon === 'file' && <FileText className={`h-2.5 w-2.5 ${signal.highlight ? 'text-[#5ac53a]' : 'text-neutral-400'}`} />}
                                {signal.icon === 'trending' && <TrendingUp className={`h-2.5 w-2.5 ${signal.highlight ? 'text-[#5ac53a]' : 'text-neutral-400'}`} />}
                                {signal.icon === 'briefcase' && <Briefcase className={`h-2.5 w-2.5 ${signal.highlight ? 'text-[#eb5d2a]' : 'text-neutral-400'}`} />}
                                {signal.icon === 'users' && <Users className={`h-2.5 w-2.5 ${signal.highlight ? 'text-[#5ac53a]' : 'text-neutral-400'}`} />}
                                {signal.icon === 'calendar' && <Calendar className={`h-2.5 w-2.5 ${signal.highlight ? 'text-[#5ac53a]' : 'text-neutral-400'}`} />}
                                {signal.icon === 'database' && <Database className={`h-2.5 w-2.5 ${signal.highlight ? 'text-[#5ac53a]' : 'text-neutral-400'}`} />}
                              </div>
                              <span className={`${signal.highlight ? 'text-neutral-900 font-medium' : 'text-neutral-600'} border-b border-dashed border-neutral-300`}>{signal.text}</span>
                            </div>

                            {/* Source Evidence Hover Card */}
                            {hoveredSignal === `${person.id}-${i}` && signal.source && (() => {
                              const src = signal.source as Record<string, unknown>;
                              return (
                              <div className="absolute left-0 top-full mt-1 z-50 w-72 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="bg-white rounded-lg shadow-xl border border-neutral-200 overflow-hidden">
                                  {/* LinkedIn Post Source */}
                                  {src.type === 'linkedin' && (
                                    <div className="p-3">
                                      <div className="flex items-center gap-2 mb-2">
                                        <img src={src.avatar as string} alt="" className="w-8 h-8 rounded-full object-cover" />
                                        <div className="flex-1 min-w-0">
                                          <p className="text-xs font-semibold text-neutral-900 truncate">{src.name as string}</p>
                                          <p className="text-[10px] text-neutral-400">{src.handle as string}</p>
                                        </div>
                                        <Linkedin className="h-4 w-4 text-[#0077b5]" />
                                      </div>
                                      <p className="text-xs text-neutral-700 leading-relaxed mb-2">{src.content as string}</p>
                                      <div className="flex items-center gap-4 text-[10px] text-neutral-400">
                                        <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" /> {src.likes as number}</span>
                                        <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {src.comments as number}</span>
                                        <span className="flex items-center gap-1 ml-auto"><Clock className="h-3 w-3" /> {src.time as string}</span>
                                      </div>
                                    </div>
                                  )}

                                  {/* Publication Source */}
                                  {src.type === 'publication' && (
                                    <div className="p-3">
                                      <div className="flex items-start gap-2 mb-2">
                                        <FileText className="h-5 w-5 text-[#5ac53a] shrink-0 mt-0.5" />
                                        <div>
                                          <p className="text-xs font-semibold text-neutral-900 leading-tight">{src.title as string}</p>
                                          <p className="text-[10px] text-neutral-500 mt-1">{src.journal as string} · {src.date as string}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-3 text-[10px] text-neutral-500 bg-neutral-50 rounded px-2 py-1.5">
                                        <span className="flex items-center gap-1"><Award className="h-3 w-3 text-[#f6c86a]" /> {src.citations as number} citations</span>
                                        <span className="text-neutral-300">|</span>
                                        <span className="truncate">{src.coauthors as string}</span>
                                      </div>
                                    </div>
                                  )}

                                  {/* Jobs Source */}
                                  {src.type === 'jobs' && (
                                    <div className="p-3">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Briefcase className="h-4 w-4 text-[#eb5d2a]" />
                                        <span className="text-xs font-semibold text-neutral-900">{src.totalOpen as number} Open Roles</span>
                                      </div>
                                      <div className="space-y-1.5">
                                        {(src.roles as { title: string; location: string; posted: string }[]).map((role, j: number) => (
                                          <div key={j} className="flex items-center justify-between text-[11px] bg-neutral-50 rounded px-2 py-1.5">
                                            <span className="font-medium text-neutral-800">{role.title}</span>
                                            <span className="text-neutral-400">{role.posted}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Org Source */}
                                  {src.type === 'org' && (
                                    <div className="p-3">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Users className="h-4 w-4 text-[#5ac53a]" />
                                        <span className="text-xs font-semibold text-neutral-900">Team Structure</span>
                                      </div>
                                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                                        <div className="bg-neutral-50 rounded px-2 py-1.5">
                                          <span className="text-neutral-400">Team Size</span>
                                          <p className="font-semibold text-neutral-800">{src.teamSize as number} people</p>
                                        </div>
                                        <div className="bg-neutral-50 rounded px-2 py-1.5">
                                          <span className="text-neutral-400">Recent Hires</span>
                                          <p className="font-semibold text-[#5ac53a]">+{src.recentHires as number} this quarter</p>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Event Source */}
                                  {src.type === 'event' && (
                                    <div className="p-3">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="h-4 w-4 text-[#5ac53a]" />
                                        <span className="text-xs font-semibold text-neutral-900">{src.eventName as string}</span>
                                      </div>
                                      <div className="bg-gradient-to-br from-[#5ac53a]/5 to-[#d5fd51]/10 rounded-lg p-2 border border-[#5ac53a]/20">
                                        <p className="text-xs font-medium text-neutral-800 mb-1">{src.talkTitle as string}</p>
                                        <div className="flex items-center gap-2 text-[10px] text-neutral-500">
                                          <span>{src.date as string}</span>
                                          {typeof src.venue === 'string' && <span>· {src.venue}</span>}
                                        </div>
                                        {typeof src.role === 'string' && (
                                          <span className="inline-block mt-1.5 text-[9px] font-mono uppercase bg-[#5ac53a]/10 text-[#5ac53a] px-1.5 py-0.5 rounded">{src.role}</span>
                                        )}
                                      </div>
                                    </div>
                                  )}

                                  {/* Deals Source */}
                                  {src.type === 'deals' && (
                                    <div className="p-3">
                                      <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp className="h-4 w-4 text-[#5ac53a]" />
                                        <span className="text-xs font-semibold text-neutral-900">Recent Deals</span>
                                      </div>
                                      <div className="space-y-1.5">
                                        {(src.deals as { company: string; type: string; value: string; date: string }[]).map((deal, j: number) => (
                                          <div key={j} className="flex items-center justify-between text-[11px] bg-neutral-50 rounded px-2 py-1.5">
                                            <div>
                                              <span className="font-medium text-neutral-800">{deal.company}</span>
                                              <span className="text-neutral-400 ml-1">· {deal.type}</span>
                                            </div>
                                            <span className="font-mono text-[#5ac53a]">{deal.value}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              );
                            })()}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Why They're Relevant */}
                    <div className="mb-4 p-3 rounded-lg bg-gradient-to-br from-neutral-50 to-[#d5fd51]/5 border border-neutral-100">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Zap className="h-3 w-3 text-[#f6c86a]" />
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">Why now</span>
                      </div>
                      <p className="text-xs text-neutral-700 leading-relaxed">{person.whyRelevant}</p>
                        </div>

                    {/* Suggested Opener */}
                    <div className="p-3 rounded-lg bg-[#d5fd51]/15 border-l-[3px] border-[#5ac53a] flex-1 flex flex-col">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <MessageCircle className="h-3 w-3 text-[#5ac53a]" />
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">Suggested opener</span>
                      </div>
                      <p className="text-xs text-neutral-700 italic leading-relaxed mb-3 flex-1">"{person.opener}"</p>
                      
                      {/* Time Saved Indicator */}
                      <div className="mb-3 py-2 px-2.5 rounded-md bg-neutral-50 border border-neutral-100">
                        <div className="flex flex-col gap-1.5 text-[10px]">
                          <div className="flex items-center gap-1.5 text-neutral-500">
                            <Clock className="h-3 w-3 shrink-0" />
                            <span>{person.timeSaved.freshSignal}</span>
                          </div>
                          <div className="flex items-center gap-1 pl-[18px]">
                            <span className="text-neutral-400">Saved</span>
                            <span className="font-bold text-neutral-700">{person.timeSaved.hours}h</span>
                            <span className="text-neutral-400">of</span>
                            <span className="text-neutral-500">{person.timeSaved.manualEffort.toLowerCase()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold transition-all duration-300
                        ${hoveredCard === person.id 
                          ? 'bg-[#5ac53a] text-white shadow-md shadow-[#5ac53a]/20' 
                          : 'bg-neutral-900 text-white hover:bg-[#5ac53a]'
                        }
                      `}>
                        {person.action.icon === 'linkedin' && <Linkedin className="h-3.5 w-3.5" />}
                        {person.action.icon === 'mail' && <Mail className="h-3.5 w-3.5" />}
                        {person.action.icon === 'calendar' && <Calendar className="h-3.5 w-3.5" />}
                        <span>{person.action.label}</span>
                        <ExternalLink className="h-3 w-3 opacity-60" />
                      </button>
                    </div>
                  </div>

                  {/* Hover shimmer effect */}
                  <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${hoveredCard === person.id ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
                  </div>
                </div>
              ))}
              </div>

                  {/* Time savings summary */}
                  <div className="mt-6 mb-3 text-center">
                    <p className="text-xs text-neutral-500">
                      <span className="font-semibold text-neutral-700">9.5 hours</span> of research saved on this page alone — 
                      <span className="text-[#5ac53a] font-medium">signals updated in real-time</span>
                    </p>
                  </div>

                  {/* Footer note */}
                  <div className="flex items-center justify-center gap-2 text-xs text-neutral-600">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#5ac53a] animate-pulse" />
                    <span>Updated 2 hours ago · 34 more stakeholders available</span>
                    <button className="font-medium text-[#5ac53a] hover:underline">View all</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div
          className="h-5 w-full"
          style={{
            background:
              "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(31,33,35,0.15) 4px, rgba(31,33,35,0.15) 6px)",
          }}
        />
      </div>

      {/* Workflow Section */}
      <section id="workflow" className="container mx-auto px-4 py-8">
        <div className="relative border border-border bg-transparent">
          {/* Corner brackets */}
          <div className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-foreground -translate-x-px -translate-y-px" />
          <div className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-foreground translate-x-px -translate-y-px" />
          <div className="absolute left-0 bottom-0 h-3 w-3 border-l-2 border-b-2 border-foreground -translate-x-px translate-y-px" />
          <div className="absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-foreground translate-x-px translate-y-px" />

          <div className="p-6 md:p-10">
            <div className="mb-8">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">The workflow</span>
              <h2 className="font-serif text-2xl md:text-3xl mt-2">How teams use Pistachio</h2>
            </div>

            {/* Framework Diagram - Overlapping Ovals like Notion */}
            <div className="mb-12 py-8">
              {/* CSS-based overlapping pills - exactly like Notion diagram */}
              <div className="hidden md:block relative w-full max-w-5xl mx-auto px-4">
                <div className="relative flex items-center justify-center" style={{ height: '180px' }}>
                  {/* Pill 1 - Right Time (outer border + inner white pill) */}
                  <div 
                    className="absolute flex items-center justify-center"
                    style={{
                      left: '0%',
                      width: '280px',
                      height: '160px',
                      borderRadius: '80px',
                      backgroundColor: 'transparent',
                      border: '8px solid rgba(90, 197, 58, 0.25)',
                    }}
                  >
                    <div 
                      className="flex items-center justify-center"
                      style={{
                        width: '256px',
                        height: '136px',
                        borderRadius: '68px',
                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        border: '2px solid rgba(90, 197, 58, 0.35)',
                      }}
                    >
                      <span className="font-serif text-lg font-semibold text-foreground">Right Time</span>
                    </div>
                  </div>

                  {/* Pill 2 - Right Account (outer border + inner white pill) */}
                  <div 
                    className="absolute flex items-center justify-center"
                    style={{
                      left: '22%',
                      width: '280px',
                      height: '160px',
                      borderRadius: '80px',
                      backgroundColor: 'transparent',
                      border: '8px solid rgba(213, 253, 81, 0.35)',
                    }}
                  >
                    <div 
                      className="flex items-center justify-center"
                      style={{
                        width: '256px',
                        height: '136px',
                        borderRadius: '68px',
                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        border: '2px solid rgba(213, 253, 81, 0.5)',
                      }}
                    >
                      <span className="font-serif text-lg font-semibold text-foreground">Right Account</span>
                    </div>
                  </div>

                  {/* Pill 3 - Right Stakeholder (outer border + inner white pill) */}
                  <div 
                    className="absolute flex items-center justify-center"
                    style={{
                      left: '44%',
                      width: '280px',
                      height: '160px',
                      borderRadius: '80px',
                      backgroundColor: 'transparent',
                      border: '8px solid rgba(246, 200, 106, 0.35)',
                    }}
                  >
                    <div 
                      className="flex items-center justify-center"
                      style={{
                        width: '256px',
                        height: '136px',
                        borderRadius: '68px',
                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        border: '2px solid rgba(246, 200, 106, 0.5)',
                      }}
                    >
                      <span className="font-serif text-lg font-semibold text-foreground">Right Stakeholder</span>
                    </div>
                  </div>

                  {/* Pill 4 - Right Messaging (outer border + inner white pill) */}
                  <div 
                    className="absolute flex items-center justify-center"
                    style={{
                      left: '66%',
                      width: '280px',
                      height: '160px',
                      borderRadius: '80px',
                      backgroundColor: 'transparent',
                      border: '8px solid rgba(235, 93, 42, 0.25)',
                    }}
                  >
                    <div 
                      className="flex items-center justify-center"
                      style={{
                        width: '256px',
                        height: '136px',
                        borderRadius: '68px',
                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        border: '2px solid rgba(235, 93, 42, 0.4)',
                      }}
                    >
                      <span className="font-serif text-lg font-semibold text-foreground">Right Messaging</span>
                    </div>
                  </div>

                  {/* Diamond intersection markers with arrows */}
                  {/* Diamond 1 - between pill 1 and 2 */}
                  <div 
                    className="absolute flex items-center justify-center z-10"
                    style={{
                      left: 'calc(11% + 140px - 16px)',
                      width: '32px',
                      height: '32px',
                      transform: 'rotate(45deg)',
                      backgroundColor: 'rgba(90, 197, 58, 0.5)',
                      border: '2px solid rgba(90, 197, 58, 0.7)',
                    }}
                  >
                    <span style={{ transform: 'rotate(-45deg)', color: '#5ac53a', fontSize: '14px' }}>→</span>
                  </div>

                  {/* Diamond 2 - between pill 2 and 3 */}
                  <div 
                    className="absolute flex items-center justify-center z-10"
                    style={{
                      left: 'calc(33% + 140px - 16px)',
                      width: '32px',
                      height: '32px',
                      transform: 'rotate(45deg)',
                      backgroundColor: 'rgba(213, 253, 81, 0.6)',
                      border: '2px solid rgba(213, 253, 81, 0.8)',
                    }}
                  >
                    <span style={{ transform: 'rotate(-45deg)', color: '#a0b800', fontSize: '14px' }}>→</span>
                  </div>

                  {/* Diamond 3 - between pill 3 and 4 */}
                  <div 
                    className="absolute flex items-center justify-center z-10"
                    style={{
                      left: 'calc(55% + 140px - 16px)',
                      width: '32px',
                      height: '32px',
                      transform: 'rotate(45deg)',
                      backgroundColor: 'rgba(246, 200, 106, 0.6)',
                      border: '2px solid rgba(246, 200, 106, 0.8)',
                    }}
                  >
                    <span style={{ transform: 'rotate(-45deg)', color: '#d4a020', fontSize: '14px' }}>→</span>
                  </div>
                </div>

              </div>

              {/* Mobile version - stacked cards with double pill effect */}
              <div className="md:hidden space-y-4 px-4">
                <div className="rounded-[2rem] bg-[#5ac53a]/25 border-3 border-[#5ac53a]/50 p-1">
                  <div className="rounded-[1.5rem] bg-white/95 border-2 border-[#5ac53a]/30 py-4 px-6 text-center">
                    <h3 className="font-serif text-lg font-semibold text-foreground">Right Time</h3>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-8 h-8 rotate-45 bg-[#5ac53a]/50 border-2 border-[#5ac53a]/70 flex items-center justify-center">
                    <span className="-rotate-45 text-[#5ac53a] text-sm">↓</span>
                  </div>
                </div>
                <div className="rounded-[2rem] bg-[#d5fd51]/30 border-3 border-[#d5fd51]/60 p-1">
                  <div className="rounded-[1.5rem] bg-white/95 border-2 border-[#d5fd51]/40 py-4 px-6 text-center">
                    <h3 className="font-serif text-lg font-semibold text-foreground">Right Account</h3>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-8 h-8 rotate-45 bg-[#d5fd51]/60 border-2 border-[#d5fd51]/80 flex items-center justify-center">
                    <span className="-rotate-45 text-[#a0b800] text-sm">↓</span>
                  </div>
                </div>
                <div className="rounded-[2rem] bg-[#f6c86a]/30 border-3 border-[#f6c86a]/60 p-1">
                  <div className="rounded-[1.5rem] bg-white/95 border-2 border-[#f6c86a]/40 py-4 px-6 text-center">
                    <h3 className="font-serif text-lg font-semibold text-foreground">Right Stakeholder</h3>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-8 h-8 rotate-45 bg-[#f6c86a]/60 border-2 border-[#f6c86a]/80 flex items-center justify-center">
                    <span className="-rotate-45 text-[#d4a020] text-sm">↓</span>
                  </div>
                </div>
                <div className="rounded-[2rem] bg-[#eb5d2a]/20 border-3 border-[#eb5d2a]/40 p-1">
                  <div className="rounded-[1.5rem] bg-white/95 border-2 border-[#eb5d2a]/30 py-4 px-6 text-center">
                    <h3 className="font-serif text-lg font-semibold text-foreground">Right Messaging</h3>
                  </div>
                </div>
              </div>

            </div>

            {/* 4-step workflow grid */}
            <div className="grid gap-8 md:grid-cols-2">
              {/* Step 1 */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    1
                  </span>
                  <h3 className="font-serif text-lg md:text-xl">Narrow the market to accounts that matter</h3>
                </div>
                <div className="ml-11 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-mono text-xs uppercase tracking-wider text-destructive">The problem:</span> As
                    an early team, everyone could be a customer — which means no one is a priority.
                  </p>
                  <p className="text-sm">
                    <span className="font-mono text-xs uppercase tracking-wider text-primary">Pistachio:</span> Helps
                    startups narrow a broad pharma and biotech landscape into a focused list of accounts most likely to
                    be receptive right now, based on real activity.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    2
                  </span>
                  <h3 className="font-serif text-lg md:text-xl">Understand why an account would care today</h3>
                </div>
                <div className="ml-11 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-mono text-xs uppercase tracking-wider text-destructive">The problem:</span>{" "}
                    Cold outreach sounds generic because timing is unclear.
                  </p>
                  <p className="text-sm">
                    <span className="font-mono text-xs uppercase tracking-wider text-primary">Pistachio:</span> For each
                    prioritized account, provides clear context on what has changed recently — giving founders a
                    concrete reason to reach out now.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    3
                  </span>
                  <h3 className="font-serif text-lg md:text-xl">Focus on stakeholders who own the problem</h3>
                </div>
                <div className="ml-11 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-mono text-xs uppercase tracking-wider text-destructive">The problem:</span>{" "}
                    Reaching the wrong team wastes your best early shots.
                  </p>
                  <p className="text-sm">
                    <span className="font-mono text-xs uppercase tracking-wider text-primary">Pistachio:</span> Connects
                    account activity to the teams and roles most likely to feel the pain, helping focus on stakeholders
                    who can evaluate and champion a new product.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    4
                  </span>
                  <h3 className="font-serif text-lg md:text-xl">Reach out with relevance — not a generic pitch</h3>
                </div>
                <div className="ml-11 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-mono text-xs uppercase tracking-wider text-destructive">The problem:</span>{" "}
                    Early outreach feels risky when every message is a guess.
                  </p>
                  <p className="text-sm">
                    <span className="font-mono text-xs uppercase tracking-wider text-primary">Pistachio:</span> With
                    account focus, timing context, and stakeholder clarity, teams can reach out with messages that feel
                    informed and relevant — increasing reply rates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div
          className="h-5 w-full"
          style={{
            background:
              "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(31,33,35,0.15) 4px, rgba(31,33,35,0.15) 6px)",
          }}
        />
      </div>

      {/* Signal Packs Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="relative border border-border bg-transparent">
          <div className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-foreground -translate-x-px -translate-y-px" />
          <div className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-foreground translate-x-px -translate-y-px" />
          <div className="absolute left-0 bottom-0 h-3 w-3 border-l-2 border-b-2 border-foreground -translate-x-px translate-y-px" />
          <div className="absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-foreground translate-x-px translate-y-px" />

          <div className="p-6 md:p-10">
            <div className="mb-6">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Ready-made intelligence</span>
              <h2 className="font-serif text-2xl md:text-3xl mt-2">Signal Packs</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
                Pre-built, research-backed lists of companies and decision-makers — with verified activity signals, sources, and contact info. Updated on a schedule so you always have fresh leads.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {/* Submission Sprint Pack */}
              <Link href="/packs/submission-sprint" className="group block rounded-lg border border-border p-5 hover:border-foreground/20 transition-all hover:shadow-[0_0_20px_rgba(90,197,58,0.04)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">Signal Pack</span>
                </div>
                <h3 className="font-serif text-lg font-semibold group-hover:text-primary transition-colors">Submission Sprint</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  40+ pharma &amp; biotech companies with imminent FDA submissions — regulatory signals, filing timelines, and decision-maker contacts.
                </p>
                <div className="flex items-center gap-1 mt-3 text-xs text-primary font-medium">
                  View pack <ArrowRight className="h-3 w-3" />
                </div>
              </Link>

              {/* AI R&D Leaders Pack */}
              <Link href="/packs/ai-rd-leaders" className="group block rounded-lg border border-border p-5 hover:border-foreground/20 transition-all hover:shadow-[0_0_20px_rgba(90,197,58,0.04)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">Signal Pack</span>
                </div>
                <h3 className="font-serif text-lg font-semibold group-hover:text-primary transition-colors">AI R&D Leaders</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  48 pharma AI/ML decision-makers who are actively building, hiring, and investing — with verified activity signals and proof.
                </p>
                <div className="flex items-center gap-1 mt-3 text-xs text-primary font-medium">
                  View pack <ArrowRight className="h-3 w-3" />
                </div>
              </Link>

              {/* GLP-1 Pipeline Radar Pack */}
              <Link href="/packs/glp1-pipeline" className="group block rounded-lg border border-border p-5 hover:border-foreground/20 transition-all hover:shadow-[0_0_20px_rgba(90,197,58,0.04)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">Signal Pack</span>
                </div>
                <h3 className="font-serif text-lg font-semibold group-hover:text-primary transition-colors">GLP-1 Pipeline Radar</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  45 companies racing to build the next obesity blockbuster — drug candidates, clinical stages, deal signals, and BD contacts.
                </p>
                <div className="flex items-center gap-1 mt-3 text-xs text-primary font-medium">
                  View pack <ArrowRight className="h-3 w-3" />
                </div>
              </Link>

              {/* ASCO GI 2026 Pack */}
              <Link href="/packs/asco-gi-2026" className="group block rounded-lg border border-border p-5 hover:border-foreground/20 transition-all hover:shadow-[0_0_20px_rgba(90,197,58,0.04)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full">Conference Pack</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">New</span>
                </div>
                <h3 className="font-serif text-lg font-semibold group-hover:text-primary transition-colors">ASCO GI 2026</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  52 pharma companies who presented at ASCO GI 2026 — with 156 oncology decision-makers and verified conference signals.
                </p>
                <div className="flex items-center gap-1 mt-3 text-xs text-primary font-medium">
                  View pack <ArrowRight className="h-3 w-3" />
                </div>
              </Link>

              {/* AI Conference Circuit Pack */}
              <Link href="/packs/ai-conference-circuit" className="group block rounded-lg border border-border p-5 hover:border-foreground/20 transition-all hover:shadow-[0_0_20px_rgba(90,197,58,0.04)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full">Conference Pack</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">New</span>
                </div>
                <h3 className="font-serif text-lg font-semibold group-hover:text-primary transition-colors">AI Conference Circuit</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  55 pharma AI leaders who presented at AWS re:Invent, NVIDIA GTC, Google Cloud Next, Bio-IT World in 2025.
                </p>
                <div className="flex items-center gap-1 mt-3 text-xs text-primary font-medium">
                  View pack <ArrowRight className="h-3 w-3" />
                </div>
              </Link>

              {/* AI Consortium Leaders Pack */}
              <Link href="/packs/ai-consortium-leaders" className="group block rounded-lg border border-border p-5 hover:border-foreground/20 transition-all hover:shadow-[0_0_20px_rgba(90,197,58,0.04)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">Premium Pack</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">New</span>
                </div>
                <h3 className="font-serif text-lg font-semibold group-hover:text-primary transition-colors">AI Consortium Leaders</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  12 major pharmas shaping AI standards in OpenFold3/AISB & Pistoia Alliance — the decision-makers buying AI tools.
                </p>
                <div className="flex items-center gap-1 mt-3 text-xs text-primary font-medium">
                  View pack <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div
          className="h-5 w-full"
          style={{
            background:
              "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(31,33,35,0.15) 4px, rgba(31,33,35,0.15) 6px)",
          }}
        />
      </div>

      {/* CTA Section */}
      <section className="border-t border-border bg-card py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <span className="font-mono inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              PRIVATE ALPHA
            </span>
          </div>
          <h2 className="font-serif mb-4 text-3xl text-balance md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
            Don't sell to job titles.
            <br />
            <span className="text-primary">Sell to the science.</span>
          </h2>
          <p className="mb-6 max-w-xl mx-auto text-base md:text-lg text-muted-foreground">
            Join the alpha. Only 5 seats remaining.
          </p>
          <a href="https://forms.gle/N5MYpSt1p5kiYUUZ9" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="font-mono bg-foreground text-background hover:bg-foreground/90 text-base px-8 py-6">
              Request Alpha Access
            </Button>
          </a>
        </div>
      </section>

      {/* Footer with large Pistachio branding */}
      <footer className="bg-card overflow-hidden w-full">
        <p 
          className="font-serif font-bold text-neutral-200/80 dark:text-neutral-800 select-none whitespace-nowrap w-full text-center"
          style={{
            fontSize: 'calc(100vw / 5.5)',
            lineHeight: '0.85',
            letterSpacing: '-0.04em',
          }}
        >
          Pistachio AI
        </p>
      </footer>

      <div className="h-3 md:h-4 w-full bg-gradient-to-r from-[#5ac53a] via-[#d5fd51] via-[#f6c86a] to-[#eb5d2a]" />
    </div>
  )
}

