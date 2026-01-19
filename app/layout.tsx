import type React from "react"
import type { Metadata } from "next"
import { Instrument_Serif, IBM_Plex_Mono, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
})

const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
})

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Pistachio AI - Find the Right Life Sciences Accounts",
  description: "Pistachio helps life sciences BD and commercial teams identify who to target, when to reach out, and why now — using what's actually changing inside companies.",
  keywords: ["life sciences", "BD", "business development", "pharma", "biotech", "AI", "sales intelligence"],
  authors: [{ name: "Pistachio AI" }],
  openGraph: {
    title: "Pistachio AI - Find the Right Life Sciences Accounts",
    description: "Pistachio helps life sciences BD and commercial teams identify who to target, when to reach out, and why now.",
    url: "https://pistachiohq.ai",
    siteName: "Pistachio AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pistachio AI - Find the Right Life Sciences Accounts",
    description: "Pistachio helps life sciences BD and commercial teams identify who to target, when to reach out, and why now.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fontSerif.variable} ${fontMono.variable} ${fontSans.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
