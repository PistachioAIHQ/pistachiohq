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
  metadataBase: new URL("https://trypistachio.ai"),
  title: {
    default: "Pistachio AI — Commercial Intelligence for Life Sciences",
    template: "%s | Pistachio AI",
  },
  description: "Pistachio AI helps life sciences BD and commercial teams find the right accounts, stakeholders, and timing signals — using real-time data from clinical trials, publications, conferences, and hiring activity.",
  keywords: ["Pistachio AI", "life sciences", "business development", "pharma", "biotech", "AI", "sales intelligence", "commercial intelligence", "BD intelligence", "life sciences AI", "pharma sales", "biotech BD"],
  authors: [{ name: "Pistachio AI" }],
  creator: "Pistachio AI",
  publisher: "Pistachio AI",
  alternates: {
    canonical: "https://trypistachio.ai",
  },
  openGraph: {
    title: "Pistachio AI — Commercial Intelligence for Life Sciences",
    description: "Find the right accounts, the right stakeholders, and the signal that makes them ready now. Built for life sciences BD teams.",
    url: "https://trypistachio.ai",
    siteName: "Pistachio AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.trypistachio.ai/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pistachio AI — Commercial Intelligence for Life Sciences",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pistachio AI — Commercial Intelligence for Life Sciences",
    description: "Find the right accounts, the right stakeholders, and the signal that makes them ready now. Built for life sciences BD teams.",
    creator: "@DataMadan",
    images: ["https://www.trypistachio.ai/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
