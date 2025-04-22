"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Bot,
  Users,
  ClipboardList,
  BadgeDollarSign,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  LogOut,
  Settings,
  Sun,
  Moon
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"

const menuStructure = [
  {
    label: "Dashboards",
    icon: LayoutDashboard,
    children: [
      { label: "Visão geral", href: "/dashboard" },
      { label: "Meta Ads", href: "/dashboard/meta" },
      { label: "Google Ads", href: "/dashboard/google" },
    ],
  },
  {
    label: "DNA",
    icon: FileText,
    children: [
      { label: "Todos os DNAs", href: "/dashboard/dna" },
      { label: "Criar DNA", href: "/dashboard/dna/create" },
    ],
  },
  {
    label: "Agentes",
    icon: Bot,
    children: [
      { label: "Agentes IA", href: "/dashboard/agentes" },
    ],
  },
  {
    label: "CRM",
    icon: Users,
    children: [
      { label: "Kanban", href: "/dashboard/crm/kanban" },
      { label: "Contatos", href: "/dashboard/crm/contatos" },
    ],
  },
  {
    label: "Gestor de Tráfego",
    icon: BadgeDollarSign,
    children: [
      { label: "Gerenciar Anúncios", href: "/ads/gerenciador" },
      { label: "Meta Ads", href: "/dashboard/ads/meta" },
      { label: "Google Ads", href: "/dashboard/ads/google" },
    ],
  },
  {
    label: "Tarefas",
    icon: ClipboardList,
    children: [
      { label: "Gestor de Tarefas", href: "/dashboard/tarefas" },
    ],
  },
  {
    label: "Canva",
    icon: LayoutGrid,
    children: [
      { label: "Mindmap", href: "/dashboard/canva/mind" },
      { label: "Notes", href: "/dashboard/canva/notes" },
    ],
  },
]

export function Sidebar({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (open: boolean) => void }) {
  const pathname = usePathname()
  const isOpen = sidebarOpen
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const [profileOpen, setProfileOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const [usuario, setUsuario] = useState<{
    nome: string
    username: string
    avatar?: string
  } | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("usuario")
      if (raw) {
        setUsuario(JSON.parse(raw))
      }
    }
  }, [])

  return (
    <aside
      className={cn(
        "fixed top-6 left-6 z-50 h-[calc(100vh-3rem)] transition-all duration-300 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden rounded-2xl",
        isOpen ? "w-64" : "w-20",
        "bg-black/40 hover:shadow-[0_0_16px_2px_rgba(168,85,247,0.5)]"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center justify-center w-full">
            <Image
              src={isOpen ? "https://i.ibb.co/GQrxbGYQ/Prancheta-2-1.png" : "https://i.ibb.co/LDQThScq/Prancheta-10.png"}
              alt="logo"
              width={isOpen ? 140 : 42}
              height={isOpen ? 32 : 42}
            />
          </div>
          <button onClick={toggleSidebar} className="text-white ml-2">
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Navegação */}
        <div className="flex-1 overflow-y-auto px-1 pb-6 scrollbar-none">
          <nav className="mt-2 flex flex-col gap-4">
            {menuStructure.map((section) => (
              <div key={section.label} className="flex flex-col">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-2 text-purple-300 hover:bg-white/5",
                          isOpen ? "justify-start" : "justify-center",
                          pathname.startsWith(section.children[0]?.href) && "bg-purple-600 text-white rounded-md"
                        )}
                      >
                        <section.icon size={22} />
                        {isOpen && <span className="text-sm font-medium">{section.label}</span>}
                      </div>
                    </TooltipTrigger>
                    {!isOpen && <TooltipContent side="right">{section.label}</TooltipContent>}
                  </Tooltip>
                </TooltipProvider>

                {isOpen && (
                  <div className="ml-10 mt-1 space-y-1">
                    {section.children.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "block text-sm px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all",
                          pathname === item.href ? "bg-purple-600 text-white" : "text-gray-200"
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
                {!isOpen && (
                  <div className="flex flex-col items-center gap-1 mt-2">
                    {section.children.map((item) => (
                      <TooltipProvider key={item.href} delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={item.href}
                              className={cn(
                                "p-1.5 rounded-full hover:bg-white/10 transition-all",
                                pathname === item.href ? "bg-purple-700" : ""
                              )}
                            >
                              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="right">{item.label}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Botão de alternância de tema */}
        <div className="px-4 pb-4 flex justify-center">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-yellow-400" />
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
            <Moon className="w-4 h-4 text-purple-400" />
          </div>
        </div>

        {/* Perfil do usuário */}
        <div className="px-4 pb-4">
          <Popover open={profileOpen} onOpenChange={setProfileOpen}>
            <PopoverTrigger asChild>
              <div
                className={cn("flex items-center gap-3 text-sm cursor-pointer w-full", isOpen ? "justify-start" : "justify-center")}
              >
                {usuario?.avatar ? (
                  <Image
                    src={usuario.avatar}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {usuario?.nome?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                {isOpen && (
                  <div className="leading-4 truncate">
                    <p className="text-white font-medium truncate">{usuario?.nome || "Usuário"}</p>
                    <p className="text-purple-300 text-xs truncate">@{usuario?.username || "username"}</p>
                  </div>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              align="start"
              className="w-48 bg-zinc-900 border border-white/10 text-white shadow-xl"
            >
              <Link href="/dashboard/configuracoes" className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 text-sm">
                <Settings size={16} /> Configurações
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("usuario")
                  window.location.href = "/login"
                }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 text-sm w-full"
              >
                <LogOut size={16} /> Sair
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </aside>
  )
}
