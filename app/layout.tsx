import type React from "react"
import type { Metadata } from "next"
import { Instrument_Serif, IBM_Plex_Mono, Inter } from "next/font/google"
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
  title: "Pistachio AI - Alpha Access",
  description: "One platform for all of AI. Limited alpha seats remaining.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fontSerif.variable} ${fontMono.variable} ${fontSans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
