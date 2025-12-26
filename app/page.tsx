"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"

export default function Page() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [showBriefing, setShowBriefing] = useState(false)
  const briefingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Observer for showing the prompt (when section first enters viewport)
    const promptObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !showBriefing) {
          setShowPrompt(true)
        }
      },
      { 
        threshold: 0.15,
        rootMargin: '-50px 0px 0px 0px'
      }
    )

    // Observer for showing the briefing (when user scrolls deeper into section)
    const briefingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowPrompt(false)
          setShowBriefing(true)
        }
      },
      { 
        threshold: 0.4,
        rootMargin: '-150px 0px 0px 0px'
      }
    )

    if (briefingRef.current) {
      promptObserver.observe(briefingRef.current)
      briefingObserver.observe(briefingRef.current)
    }

    return () => {
      promptObserver.disconnect()
      briefingObserver.disconnect()
    }
  }, [showBriefing])

  return (
    <div className="min-h-screen bg-background">
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
            <Button size="sm" className="font-mono bg-foreground text-background hover:bg-foreground/90">
              Request alpha access
            </Button>
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
            — using what's actually changing inside companies.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button className="font-mono bg-foreground text-background hover:bg-foreground/90">
              Request alpha access
            </Button>
            <Button variant="outline" className="font-mono gap-2 bg-transparent">
              See how it works <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Hero Image with Briefing */}
          <div className="relative mt-16 overflow-hidden rounded-xl border border-border/50 min-h-[600px] md:min-h-[800px] flex items-center justify-center">
            <Image
              src="/life-sciences-data-visualization.jpg"
              alt="Life sciences signal intelligence platform"
              fill
              className="object-cover opacity-90"
              priority
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent z-10" />

            <div 
              ref={briefingRef}
              className="relative z-20 w-full flex items-center justify-center p-4 md:p-8 pb-6 md:pb-10 pt-[42px] md:pt-[42px] gap-[50px]"
            >
              {/* Initial Prompt Bubble */}
              <div className={`absolute inset-0 flex items-start justify-center pt-12 md:pt-16 z-50 transition-all duration-700 ${showPrompt ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <div className="bg-white/95 backdrop-blur-md border border-[#5ac53a]/30 rounded-2xl p-6 shadow-2xl flex items-center gap-4 max-w-md mx-4">
                  <div className="h-10 w-10 rounded-full bg-[#5ac53a] flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#5ac53a]/20">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-medium text-foreground leading-snug">"Hey Pistachio — help me prep for JPM26."</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <Sparkles className="h-3 w-3 text-[#5ac53a] animate-pulse" />
                      <span className="text-[10px] text-[#5ac53a] font-mono uppercase tracking-wider font-semibold">Processing signals...</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`relative w-full max-w-6xl overflow-hidden rounded-lg bg-white/95 backdrop-blur-md shadow-2xl transition-all duration-1000 ${showBriefing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 scale-[0.98]'}`}>
                {/* Browser chrome */}
                <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  </div>
                  <span className="font-mono text-[10px] text-neutral-400">pistachio.ai/briefing/jpm-2026</span>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5ac53a] animate-pulse" />
                    <span className="font-mono text-[9px] text-neutral-400">Live</span>
                  </div>
                </div>

                {/* Briefing content - 2 column layout */}
                <div className="px-3 md:px-6 pt-6 md:pt-5 pb-3 md:pb-6">
                  {/* Header with personalization */}
                  <div className="mb-3 md:mb-4 flex items-start justify-between border-b border-neutral-100 pb-2 md:pb-3">
                    <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                      <div className="flex h-7 w-7 md:h-9 md:w-9 items-center justify-center rounded-full bg-[#5ac53a] text-white text-xs md:text-sm font-medium shrink-0">
                        M
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-serif text-sm md:text-lg text-neutral-900 font-semibold">JPM 2026 Briefing for Mike</p>
                        <p className="text-[9px] md:text-[11px] text-neutral-400 mt-0.5">Generated Dec 22, 2025</p>
                        <p className="hidden md:block text-xs md:text-sm text-neutral-600 leading-relaxed mt-3 font-normal">
                          Based on your focus areas, we've reviewed attendee activity, speaking
                          schedules, and recent announcements to surface the highest-value meetings for your team.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0 ml-2">
                      <span className="rounded bg-[#d5fd51]/30 px-1.5 py-0.5 text-[8px] md:text-[10px] font-mono text-neutral-600">
                        PDF
                      </span>
                      <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[8px] md:text-[10px] font-mono text-neutral-600">
                        Share
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[30%_1fr] lg:grid-cols-[28%_1fr] gap-4 md:gap-6">
                    {/* Column 1: JPM Context & Summary */}
                    <div className="space-y-3 md:space-y-4">
                      <div className="rounded-lg border border-[#5ac53a]/20 bg-gradient-to-br from-[#d5fd51]/20 to-[#5ac53a]/5 p-3 md:p-4">
                        <div className="flex items-center gap-2 mb-2 md:mb-3">
                          <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-[#5ac53a] flex items-center justify-center shrink-0">
                            <span className="text-white text-[10px] md:text-xs font-bold">JPM</span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-serif text-xs md:text-[14px] text-neutral-900 font-semibold">JP Morgan Healthcare Conference</p>
                            <p className="text-[9px] md:text-[11px] text-neutral-500 font-medium mt-0.5">Jan 13–16, 2026 · San Francisco</p>
                          </div>
                        </div>

                        <div className="hidden md:block mb-4 space-y-2.5">
                          <p className="text-[11px] md:text-[12px] text-neutral-700 leading-relaxed font-normal">
                            The largest healthcare investment conference, bringing together 450+ public and private companies, 
                            institutional investors, and industry leaders. Critical for BD teams to identify partnership opportunities 
                            and track strategic priorities.
                          </p>
                          <p className="text-[11px] md:text-[12px] text-neutral-600 leading-relaxed font-normal">
                            This year's focus areas include <span className="font-semibold text-neutral-700">AI/ML in drug discovery</span>, <span className="font-semibold text-neutral-700">computational biology platforms</span>, and 
                            <span className="font-semibold text-neutral-700"> precision medicine partnerships</span> — directly aligned with your target market.
                          </p>
                        </div>

                        {/* Key stats */}
                        <div className="grid grid-cols-2 gap-1.5 md:gap-2 mb-3 md:mb-4">
                          <div className="rounded bg-white/80 p-2 md:p-2.5 text-center border border-[#5ac53a]/10">
                            <span className="block font-serif text-lg md:text-xl text-[#5ac53a] font-semibold">37</span>
                            <span className="text-[8px] md:text-[10px] text-neutral-500 font-medium">Stakeholders</span>
                          </div>
                          <div className="rounded bg-white/80 p-2 md:p-2.5 text-center border border-[#5ac53a]/10">
                            <span className="block font-serif text-lg md:text-xl text-[#5ac53a] font-semibold">20</span>
                            <span className="text-[8px] md:text-[10px] text-neutral-500 font-medium">Accounts</span>
                          </div>
                        </div>

                        {/* Pharma Logos - Hidden on mobile */}
                        <div className="hidden md:block mb-3">
                          <p className="text-[10px] md:text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-2.5 font-semibold">
                            Key Attendees
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            <img
                              src="https://img.logo.dev/pfizer.com?token=pk_bUM9Jb7fRFSsD3V1KHoDxg"
                              alt="Pfizer"
                              className="h-8 w-full rounded bg-white p-1.5 object-contain border border-neutral-100"
                            />
                            <img
                              src="https://img.logo.dev/jnj.com?token=pk_bUM9Jb7fRFSsD3V1KHoDxg"
                              alt="Johnson & Johnson"
                              className="h-8 w-full rounded bg-white p-1.5 object-contain border border-neutral-100"
                            />
                            <img
                              src="https://img.logo.dev/merck.com?token=pk_bUM9Jb7fRFSsD3V1KHoDxg"
                              alt="Merck"
                              className="h-8 w-full rounded bg-white p-1.5 object-contain border border-neutral-100"
                            />
                            <img
                              src="https://img.logo.dev/abbvie.com?token=pk_bUM9Jb7fRFSsD3V1KHoDxg"
                              alt="AbbVie"
                              className="h-8 w-full rounded bg-white p-1.5 object-contain border border-neutral-100"
                            />
                            <img
                              src="https://img.logo.dev/bms.com?token=pk_bUM9Jb7fRFSsD3V1KHoDxg"
                              alt="Bristol Myers Squibb"
                              className="h-8 w-full rounded bg-white p-1.5 object-contain border border-neutral-100"
                            />
                            <img
                              src="https://img.logo.dev/gilead.com?token=pk_bUM9Jb7fRFSsD3V1KHoDxg"
                              alt="Gilead"
                              className="h-8 w-full rounded bg-white p-1.5 object-contain border border-neutral-100"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Relevant Events */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#f6c86a]" />
                          <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-wider text-neutral-600 font-semibold">
                            Events to prioritize
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          <div className="rounded border border-[#5ac53a]/20 bg-[#5ac53a]/5 p-2.5 md:p-3">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] md:text-[11px] font-mono text-[#5ac53a] font-semibold">Jan 13 · 2:00 PM</span>
                              <span className="text-[8px] md:text-[9px] bg-[#5ac53a] text-white px-1.5 py-0.5 rounded font-semibold">
                                3 CONTACTS
                              </span>
                            </div>
                            <p className="font-serif text-[13px] md:text-[14px] text-neutral-900 font-semibold mb-1">AI in Pharma Partnerships Panel</p>
                            <p className="text-[9px] md:text-[10px] text-neutral-500 font-medium">Marriott Marquis · Michael Torres speaking</p>
                          </div>

                          <div className="rounded border border-[#f6c86a]/30 bg-[#f6c86a]/5 p-2.5 md:p-3">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] md:text-[11px] font-mono text-[#f6c86a] font-semibold">Jan 14 · 6:30 PM</span>
                              <span className="text-[8px] md:text-[9px] bg-[#f6c86a] text-neutral-800 px-1.5 py-0.5 rounded font-semibold">
                                RSVP OPEN
                              </span>
                            </div>
                            <p className="font-serif text-[13px] md:text-[14px] text-neutral-900 font-semibold mb-1">AI Drug Discovery Dinner</p>
                            <p className="text-[9px] md:text-[10px] text-neutral-500 font-medium">Private venue · 2 priority contacts attending</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Column 2: Priority Stakeholders */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#5ac53a]" />
                        <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-wider text-neutral-600 font-semibold">
                          Priority stakeholders
                        </span>
                      </div>

                      <div className="space-y-2.5 md:space-y-3">
                        {/* Contact 1 - David Lam */}
                        <div className="rounded border border-neutral-100 p-3 md:p-3.5 hover:border-[#5ac53a]/30 transition-colors">
                          <div className="flex items-start justify-between mb-2.5">
                            <div className="flex items-center gap-2.5">
                              <img
                                src="https://img.logo.dev/astrazeneca.com?token=pk_bUM9Jb7fRFSsD3V1KHoDxg"
                                alt="AstraZeneca"
                                className="h-7 w-7 md:h-8 md:w-8 rounded object-contain bg-white"
                              />
                              <div>
                                <p className="font-serif text-[14px] md:text-[15px] text-neutral-900 font-semibold">David Lam</p>
                                <p className="text-[11px] md:text-[12px] text-neutral-500 font-medium mt-0.5">VP Data Science · AstraZeneca</p>
                              </div>
                            </div>
                            <span className="rounded bg-[#5ac53a]/10 px-1.5 py-0.5 text-[9px] md:text-[10px] font-mono text-[#5ac53a] font-semibold">
                              HIGH FIT
                            </span>
                          </div>
                          <div className="rounded bg-neutral-50 p-2 md:p-2.5 mb-2">
                            <p className="text-[10px] md:text-[11px] text-neutral-600 leading-relaxed">
                              <span className="text-[#5ac53a] font-semibold">✓ Confirmed JPM</span> via LinkedIn post ·
                              <span className="font-semibold"> 5 publications</span> on ML in drug discovery ·
                              <span className="font-semibold"> 2 posts</span> on AI workflows
                            </p>
                          </div>
                          <div className="rounded bg-[#d5fd51]/20 p-2 md:p-2.5 border-l-2 border-[#5ac53a]">
                            <p className="text-[9px] md:text-[10px] text-neutral-500 mb-1 font-mono uppercase font-semibold">Suggested opener</p>
                            <p className="text-[10px] md:text-[11px] text-neutral-700 italic leading-relaxed">
                              "Saw your post on scaling molecular representations — we've been working with teams
                              hitting similar limits. Compare notes at JPM?"
                            </p>
                          </div>
                        </div>

                        {/* Contact 2 - Sarah Chen */}
                        <div className="rounded border border-neutral-100 p-3 md:p-3.5 hover:border-[#5ac53a]/30 transition-colors">
                          <div className="flex items-start justify-between mb-2.5">
                            <div className="flex items-center gap-2.5">
                              <img
                                src="https://img.logo.dev/roche.com?token=pk_bUM9Jb7fRFSsD3V1KHoDxg"
                                alt="Roche"
                                className="h-7 w-7 md:h-8 md:w-8 rounded object-contain bg-white"
                              />
                              <div>
                                <p className="font-serif text-[14px] md:text-[15px] text-neutral-900 font-semibold">Sarah Chen</p>
                                <p className="text-[11px] md:text-[12px] text-neutral-500 font-medium mt-0.5">Head of Computational Bio · Roche</p>
                              </div>
                            </div>
                            <span className="rounded bg-[#f6c86a]/20 px-1.5 py-0.5 text-[9px] md:text-[10px] font-mono text-[#eb5d2a] font-semibold">
                              HIRING
                            </span>
                          </div>
                          <div className="rounded bg-neutral-50 p-2 md:p-2.5 mb-2">
                            <p className="text-[10px] md:text-[11px] text-neutral-600 leading-relaxed">
                              <span className="text-[#eb5d2a] font-semibold">Team hiring 5 roles</span> in AI/ML · She
                              leads the team they're building ·<span className="font-semibold"> Spoke at AACR</span> on
                              target ID
                            </p>
                          </div>
                          <div className="rounded bg-[#d5fd51]/20 p-2 md:p-2.5 border-l-2 border-[#5ac53a]">
                            <p className="text-[9px] md:text-[10px] text-neutral-500 mb-1 font-mono uppercase font-semibold">Suggested opener</p>
                            <p className="text-[10px] md:text-[11px] text-neutral-700 italic leading-relaxed">
                              "Noticed your team is scaling up AI/ML — happy to share what's worked for similar
                              buildouts. Free for coffee at JPM?"
                            </p>
                          </div>
                        </div>

                        {/* Contact 3 - Michael Torres */}
                        <div className="rounded border border-neutral-100 p-3 md:p-3.5 hover:border-[#5ac53a]/30 transition-colors">
                          <div className="flex items-start justify-between mb-2.5">
                            <div className="flex items-center gap-2.5">
                              <img
                                src="https://img.logo.dev/novartis.com?token=pk_bUM9Jb7fRFSsD3V1KHoDxg"
                                alt="Novartis"
                                className="h-7 w-7 md:h-8 md:w-8 rounded object-contain bg-white"
                              />
                              <div>
                                <p className="font-serif text-[14px] md:text-[15px] text-neutral-900 font-semibold">Michael Torres</p>
                                <p className="text-[11px] md:text-[12px] text-neutral-500 font-medium mt-0.5">Dir. External Innovation · Novartis</p>
                              </div>
                            </div>
                            <span className="rounded bg-[#5ac53a]/10 px-1.5 py-0.5 text-[9px] md:text-[10px] font-mono text-[#5ac53a] font-semibold">
                              PANEL
                            </span>
                          </div>
                          <div className="rounded bg-neutral-50 p-2 md:p-2.5 mb-2">
                            <p className="text-[10px] md:text-[11px] text-neutral-600 leading-relaxed">
                              <span className="text-[#5ac53a] font-semibold">Hosting panel</span> on AI in Pharma
                              Partnerships at JPM ·<span className="font-semibold"> 3 deals closed</span> in 2025 with AI
                              biotechs
                            </p>
                          </div>
                          <div className="rounded bg-[#d5fd51]/20 p-2 md:p-2.5 border-l-2 border-[#5ac53a]">
                            <p className="text-[9px] md:text-[10px] text-neutral-500 mb-1 font-mono uppercase font-semibold">Suggested opener</p>
                            <p className="text-[10px] md:text-[11px] text-neutral-700 italic leading-relaxed">
                              "Looking forward to your panel — we've helped accelerate a few AI partnerships in this
                              space. Would love to connect after."
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
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
      <section className="container mx-auto px-4 py-8">
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
          <Button size="lg" className="font-mono bg-foreground text-background hover:bg-foreground/90 text-base px-8 py-6">
            Request Alpha Access
          </Button>
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

