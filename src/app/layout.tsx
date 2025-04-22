// src/app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Nimbly Dashboard",
  description: "Plataforma de automação de marketing digital com IA",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white font-sans antialiased">
        <div className="p-6">
          {children}
        </div>
      </body>
    </html>
  )
}
