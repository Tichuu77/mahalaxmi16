import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Mahalaxmi Infra",
  description: "Mahalaxmi  Infra - NMRDA & RL Residential Plotted Project",
  generator: "v0.app",
  icons: "/Mahalaxmi Infra new Logo.png",
  keywords: [
  // Brand
  'Mahalaxmi Infra', 'Mahalaxmi Infra Nagpur Projects',
  // General Nagpur
  'Property in Nagpur for sale', 'Best real estate developers in Nagpur',
  'Residential plots in Nagpur', 'NMRDA Sanctioned Plots', 'RERA Approved Projects',
  'Commercial Plots in Nagpur',
  // Samruddhi Mahamarg
  'Plots near Samruddhi Mahamarg', 'Investment near Nagpur Expressway',
  'Samruddhi Mahamarg entrance plots', 'Investment plots near Samruddhi Mahamarg', 'Samruddhi Circle Plots',
  // Wardha Road / Jamtha / MIHAN
  'Plots near MIHAN Nagpur', 'Residential plots in Jamtha', 'Property near Wardha Road',
  'Plots near VCA Stadium Jamtha', 'Wardha Road Plots', 'Jamtha Plots',
  'Gated community plots in Jamtha Nagpur', 'Ready to construct plots near Wardha Road',
  // Koradi Road
  'NMRDA plots in Koradi Road', 'Residential property near Koradi Temple',
  '2 BHK 3 BHK plots Koradi', 'Koradi Road Plots',
  // Katol Road
  'Plots in Katol Road Nagpur', 'Future investment plots Katol Road',
  'Affordable plots Nagpur West', 'Katol Road Plots',
  // Umred Road
  'Industrial and Residential plots Umred Road', 'Plots near Dighori Umred Road',
  'Low cost plots in Nagpur', 'Umred Road Plots',
  // Other Locations
  'Besa Plots', 'Beltarodi Plots', 'Shankarpur Plots', 'Prime Locations in Nagpur',
  // Long-Tail
  'Best plots for investment in Nagpur 2026',
  'NMRDA sanctioned plots with bank loan facility',
],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
