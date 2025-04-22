// src/app/dashboard/crm/kanban/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { UserRound, Mail, Phone, Tag, CircleUserRound, ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { SortableItem } from './SortableItem'

const mockFunis = [
  {
    id: 'f1',
    nome: 'Pré-vendas Inbound',
    etapas: [
      'Reengajamento', 'Agendamento', 'Follow-up', 'Qualificação', 'Proposta Enviada',
      'Negociação', 'Fechamento', 'Pós-venda', 'Upsell', 'Encerrado'
    ]
  },
  // Adicione mais funis se necessário
]

const initialContatos = Array.from({ length: 50 }, (_, i) => ({
  id: `c${i + 1}`,
  nome: `Contato ${i + 1}`,
  email: `contato${i + 1}@empresa.com`,
  telefone: '(11) 90000-0000',
  empresa: `Empresa ${i % 5 + 1}`,
  criadoEm: new Date().toISOString(),
  etapa: mockFunis[0].etapas[i % 10],
  funilId: 'f1',
  tags: i % 3 === 0 ? ['Inbound'] : ['Outbound']
}))

export default function KanbanPage() {
  const [funilSelecionado, setFunilSelecionado] = useState(mockFunis[0])
  const [busca, setBusca] = useState('')
  const [tagFiltro, setTagFiltro] = useState('')
  const [empresaFiltro, setEmpresaFiltro] = useState('')
  const [contatoAberto, setContatoAberto] = useState<any>(null)
  const [scrollIndex, setScrollIndex] = useState(0)
  const [contatos, setContatos] = useState(initialContatos)
  const [popupFiltroAberto, setPopupFiltroAberto] = useState(false)

  const colunas = funilSelecionado.etapas
  const sensores = useSensors(useSensor(PointerSensor))

  const filtrados = contatos.filter(c => {
    return (
      c.funilId === funilSelecionado.id &&
      c.nome.toLowerCase().includes(busca.toLowerCase()) &&
      (tagFiltro ? c.tags.includes(tagFiltro) : true) &&
      (empresaFiltro ? c.empresa.toLowerCase().includes(empresaFiltro.toLowerCase()) : true)
    )
  })

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return
    const draggedId = active.id.toString()
    const newEtapa = over.id.toString()

    setContatos(prev =>
      prev.map(c =>
        c.id === draggedId ? { ...c, etapa: newEtapa } : c
      )
    )
  }

  const scrollToLeft = () => setScrollIndex((prev) => Math.max(prev - 1, 0))
  const scrollToRight = () => setScrollIndex((prev) => Math.min(prev + 1, colunas.length - 3))

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-black via-[#10001f] to-black text-white">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <select
          className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded"
          value={funilSelecionado.id}
          onChange={(e) => setFunilSelecionado(mockFunis.find(f => f.id === e.target.value)!)}
        >
          {mockFunis.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
        </select>

        <Dialog open={popupFiltroAberto} onOpenChange={setPopupFiltroAberto}>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
              <Filter className="mr-2 w-4 h-4" /> Filtros Avançados
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0e001a] text-white max-w-md w-full">
            <div className="space-y-4">
              <Input
                placeholder="Buscar por nome..."
                className="bg-white/10 border-white/20 placeholder-white/40"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
              <Input
                placeholder="Filtrar por empresa..."
                className="bg-white/10 border-white/20 placeholder-white/40"
                value={empresaFiltro}
                onChange={(e) => setEmpresaFiltro(e.target.value)}
              />
              <Input
                placeholder="Filtrar por tag..."
                className="bg-white/10 border-white/20 placeholder-white/40"
                value={tagFiltro}
                onChange={(e) => setTagFiltro(e.target.value)}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <Button variant="ghost" onClick={scrollToLeft}><ChevronLeft className="text-white" /></Button>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <Button variant="ghost" onClick={scrollToRight}><ChevronRight className="text-white" /></Button>
        </div>

        <DndContext sensors={sensores} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <div className="flex gap-4 overflow-hidden">
            {colunas.slice(scrollIndex, scrollIndex + 3).map(etapa => {
              const etapaContatos = filtrados.filter(c => c.etapa === etapa)
              return (
                <div key={etapa} className="min-w-[300px] max-w-[300px] bg-white/5 rounded-xl p-4">
                  <h3 className="text-lg font-bold mb-3 border-b border-white/10 pb-1">{etapa}</h3>
                  <SortableContext items={etapaContatos.map(c => c.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-4">
                      {etapaContatos.map(contato => (
                        <SortableItem key={contato.id} id={contato.id}>
                          <motion.div
                            className="p-3 rounded-lg bg-white/10 hover:bg-purple-900/40 transition cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setContatoAberto(contato)}
                          >
                            <h4 className="font-semibold text-sm flex items-center gap-1">
                              <UserRound className="w-4 h-4 text-purple-300" /> {contato.nome}
                            </h4>
                            <p className="text-xs text-white/60">{contato.email}</p>
                            <p className="text-xs text-white/60">{contato.telefone}</p>
                          </motion.div>
                        </SortableItem>
                      ))}
                    </div>
                  </SortableContext>
                </div>
              )
            })}
          </div>
        </DndContext>
      </div>

      <Dialog open={!!contatoAberto} onOpenChange={() => setContatoAberto(null)}>
        <DialogContent className="bg-[#0e001a] text-white max-w-md w-full">
          {contatoAberto && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <UserRound className="w-5 h-5 text-purple-400" /> {contatoAberto.nome}
              </h2>
              <p className="text-sm flex items-center gap-1"><Mail className="w-4 h-4" /> {contatoAberto.email}</p>
              <p className="text-sm flex items-center gap-1"><Phone className="w-4 h-4" /> {contatoAberto.telefone}</p>
              <p className="text-sm flex items-center gap-1"><CircleUserRound className="w-4 h-4" /> {contatoAberto.empresa}</p>
              <div>
                <h4 className="text-sm font-semibold text-purple-300">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {contatoAberto.tags.map((t: string, idx: number) => (
                    <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-purple-800/30 text-purple-300">{t}</span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-white/50">Criado em: {new Date(contatoAberto.criadoEm).toLocaleDateString()}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
