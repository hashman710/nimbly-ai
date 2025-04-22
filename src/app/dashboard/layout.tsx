// src/app/layout.tsx
"use client"

import "./globals.css"
import { ReactNode, useState } from "react"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/context/ThemeProvider"
import { Sidebar } from "@/components/sidebar"

export default function RootLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn("font-sans antialiased bg-background text-foreground transition-colors")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main className={cn(
              "transition-all duration-300 px-6 py-6 w-full",
              sidebarOpen ? "ml-64" : "ml-20"
            )}>
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
