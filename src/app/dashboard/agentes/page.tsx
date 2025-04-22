// src/app/dashboard/agentes/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { BadgeCheck, CircleUserRound, Bot, FileEdit, Search, Info, Store, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent } from '@/components/ui/dialog'

const mockAgentes = Array.from({ length: 24 }).map((_, i) => {
  const tipos = ['padrao', 'comunidade', 'usuario']
  const areas = ['Copywriting', 'Performance', 'CRM', 'SEO', 'Mídia Paga', 'Design', 'Relatórios', 'WhatsApp']
  const tipo = tipos[Math.floor(i / 8)]
  return {
    id: `${i + 1}`,
    tipo,
    nome: `Agente ${areas[i % areas.length]}`,
    descricao: `Agente especializado em ${areas[i % areas.length].toLowerCase()}.`,
    criadoEm: `2025-04-${(i % 30 + 1).toString().padStart(2, '0')}`,
    status: i % 3 === 0 ? 'rascunho' : 'ativo',
    criador: tipo === 'padrao' ? 'Sistema' : tipo === 'comunidade' ? 'Comunidade Tough' : 'Usuário',
    tags: [areas[i % areas.length], i % 2 === 0 ? 'Automação' : 'Criação'],
    llm: 'GPT-4 Turbo',
    ferramentas: ['Notion', 'Zapier', 'Hubspot'],
    detalhes: 'Este agente ajuda a executar tarefas específicas de forma autônoma com base em fluxos pré-configurados.'
  }
})

export default function AgentesIAPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'todos' | 'ativo' | 'rascunho'>('todos')
  const [agenteSelecionado, setAgenteSelecionado] = useState<any>(null)
  const [openMarketplace, setOpenMarketplace] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState<Record<string, number>>({})

  const filteredAgentes = mockAgentes.filter(agente => {
    const matchesSearch = agente.nome.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'todos' || agente.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const tipos = [
    { key: 'padrao', label: 'Padrão' },
    { key: 'comunidade', label: 'Comunidade' },
    { key: 'usuario', label: 'Meus Agentes' },
  ]

  const handleNext = (tipoKey: string, total: number) => {
    setCarouselIndex((prev) => ({
      ...prev,
      [tipoKey]: Math.min((prev[tipoKey] || 0) + 1, Math.floor((total - 1) / 3))
    }))
  }

  const handlePrev = (tipoKey: string) => {
    setCarouselIndex((prev) => ({
      ...prev,
      [tipoKey]: Math.max((prev[tipoKey] || 0) - 1, 0)
    }))
  }

  return (
    <div className="space-y-12 bg-gradient-to-br from-black via-[#10001f] to-black min-h-screen px-6 py-8 overflow-x-hidden w-full">
      <section className="overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
          <h2 className="text-2xl font-bold text-white">Agentes IA</h2>
          <div className="flex flex-wrap gap-3 w-full lg:w-auto items-center">
            <div className="relative">
              <Search className="absolute w-4 h-4 left-3 top-1/2 -translate-y-1/2 text-white/60" />
              <Input
                type="text"
                placeholder="Buscar por nome..."
                className="pl-9 text-sm w-64 bg-white/10 border-white/20 text-white placeholder-white/40"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="ghost" className="text-white text-xs" onClick={() => setOpenMarketplace(true)}>
              <Store className="w-4 h-4 mr-1" /> Marketplace
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Criar Novo Agente</Button>
            <Button variant="outline" className="text-white border-white/20"> <MessageSquare className="w-4 h-4 mr-1" /> Falar com Suporte </Button>
          </div>
        </div>

        {tipos.map(tipo => {
          const cards = filteredAgentes.filter(a => a.tipo === tipo.key)
          const currentIndex = carouselIndex[tipo.key] || 0
          const visibleCards = cards.slice(currentIndex * 3, currentIndex * 3 + 3)

          return (
            <div key={tipo.key} className="space-y-4">
              <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-1 flex justify-between items-center">
                {tipo.label}
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handlePrev(tipo.key)}>
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleNext(tipo.key, cards.length)}>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </Button>
                </div>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {visibleCards.map((agente, i) => (
                  <motion.div
                    key={agente.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white shadow-lg cursor-pointer hover:border-purple-500"
                  >
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Bot className="w-4 h-4 text-purple-400" /> {agente.nome}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          agente.status === 'ativo' ? 'bg-green-600/20 text-green-400' : 'bg-yellow-600/20 text-yellow-400'
                        }`}>{agente.status}</span>
                      </div>
                      <p className="text-sm text-white/80 leading-relaxed min-h-[60px]">{agente.descricao}</p>
                      <div className="flex flex-wrap gap-2">
                        {agente.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-purple-800/30 text-purple-300 px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-white/50 pt-2">
                        <span className="flex items-center gap-1">
                          <CircleUserRound className="w-3.5 h-3.5" /> {agente.criador}
                        </span>
                        <span className="flex items-center gap-1">
                          <BadgeCheck className="w-3.5 h-3.5" /> {new Date(agente.criadoEm).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="pt-2 flex justify-between items-center">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white/70 hover:text-white hover:bg-purple-600/10"
                          onClick={() => setAgenteSelecionado(agente)}
                        >
                          <Info className="w-4 h-4 mr-1" /> Saiba mais
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white/70 hover:text-white hover:bg-purple-600/10"
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/dashboard/agentes/${agente.id}/editar`)
                          }}
                        >
                          <FileEdit className="w-4 h-4 mr-1" /> Editar
                        </Button>
                      </div>
                    </CardContent>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      <Dialog open={!!agenteSelecionado} onOpenChange={() => setAgenteSelecionado(null)}>
        <DialogContent className="bg-[#0e001a] text-white max-w-lg w-full">
          {agenteSelecionado && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-400" /> {agenteSelecionado.nome}
              </h2>
              <p className="text-sm text-white/80">{agenteSelecionado.descricao}</p>
              <div>
                <h4 className="text-sm font-semibold text-purple-300">LLM utilizada:</h4>
                <p className="text-sm">{agenteSelecionado.llm}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-purple-300">Ferramentas conectadas:</h4>
                <ul className="list-disc list-inside text-sm text-white/80">
                  {agenteSelecionado.ferramentas.map((f: string, idx: number) => <li key={idx}>{f}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-purple-300">O que o agente faz:</h4>
                <p className="text-sm text-white/80">{agenteSelecionado.detalhes}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openMarketplace} onOpenChange={setOpenMarketplace}>
        <DialogContent className="bg-[#0e001a] text-white max-w-lg w-full">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Store className="w-5 h-5 text-purple-400" /> Marketplace
          </h2>
          <p className="text-sm text-white/80">Explore os agentes da comunidade, destaque seus favoritos e instale novos fluxos prontos com um clique.</p>
        </DialogContent>
      </Dialog>
    </div>
  )
}