// src/app/dashboard/dna/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { BadgeCheck, CircleUserRound, Sparkles, FileEdit, Search, Bot, Pencil } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

const mockDNAs = [
  {
    id: '1',
    nome: 'CRM Automático',
    descricao: 'DNA para empresas que querem escalar o atendimento com automação e integração com CRM.',
    criadoEm: '2025-03-01',
    status: 'ativo',
    criador: 'Equipe de Vendas'
  },
  {
    id: '2',
    nome: 'E-commerce Express',
    descricao: 'DNA focado em aumentar conversão em lojas virtuais com funis otimizados.',
    criadoEm: '2025-03-12',
    status: 'rascunho',
    criador: 'Ana Paula'
  },
  {
    id: '3',
    nome: 'SaaS Performance',
    descricao: 'DNA de performance para SaaS B2B com foco em CAC e LTV.',
    criadoEm: '2025-04-01',
    status: 'ativo',
    criador: 'Pedro Sales'
  },
]

export default function TodosDNAsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'todos' | 'ativo' | 'rascunho'>('todos')

  const filteredDNAs = mockDNAs.filter(dna => {
    const matchesSearch = dna.nome.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'todos' || dna.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-12 bg-gradient-to-br from-black via-[#10001f] to-black min-h-screen px-6 py-8">
      <section>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
          <h2 className="text-2xl font-bold text-white">Todos os DNAs</h2>
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
            <div className="flex gap-2">
              {['todos', 'ativo', 'rascunho'].map(status => (
                <Button
                  key={status}
                  variant={filterStatus === status ? 'default' : 'ghost'}
                  className={`text-white text-xs ${filterStatus !== status ? 'bg-white/5' : ''}`}
                  onClick={() => setFilterStatus(status as typeof filterStatus)}
                >
                  {status === 'todos' ? 'Todos' : status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">Criar Novo DNA</Button>
                </DialogTrigger>
                <DialogContent className="bg-[#0e001a] border border-white/10 text-white max-w-md w-full">
                  <h3 className="text-lg font-semibold mb-4">Como deseja criar o DNA?</h3>
                  <div className="grid gap-4">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push('/dashboard/dna/criar/chat')}
                      className="cursor-pointer p-4 border border-white/10 rounded-xl bg-white/5 hover:border-purple-500 backdrop-blur-xl"
                    >
                      <div className="flex items-center gap-3">
                        <Bot className="w-6 h-6 text-purple-400" />
                        <div>
                          <h4 className="text-md font-medium">Criador com IA</h4>
                          <p className="text-sm text-white/70">Deixe que a IA conduza o processo de forma inteligente.</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push('/dashboard/dna/form')}
                      className="cursor-pointer p-4 border border-white/10 rounded-xl bg-white/5 hover:border-purple-500 backdrop-blur-xl"
                    >
                      <div className="flex items-center gap-3">
                        <Pencil className="w-6 h-6 text-purple-400" />
                        <div>
                          <h4 className="text-md font-medium">Criar Manualmente</h4>
                          <p className="text-sm text-white/70">Preencha um formulário completo para montar seu DNA.</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDNAs.map((dna, i) => (
            <motion.div
              key={dna.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(168, 85, 247, 0.25)' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => router.push(`/dashboard/dna/${dna.id}`)}
              className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white shadow-lg cursor-pointer hover:border-purple-500"
            >
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" /> {dna.nome}
                  </h3>
                  {dna.status === 'ativo' ? (
                    <span className="text-xs px-2 py-0.5 rounded bg-green-600/20 text-green-400">ativo</span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 rounded bg-yellow-600/20 text-yellow-400">rascunho</span>
                  )}
                </div>
                <p className="text-sm text-white/80 leading-relaxed min-h-[60px]">{dna.descricao}</p>
                <div className="flex items-center justify-between text-xs text-white/50 pt-2">
                  <span className="flex items-center gap-1">
                    <CircleUserRound className="w-3.5 h-3.5" /> {dna.criador}
                  </span>
                  <span className="flex items-center gap-1">
                    <BadgeCheck className="w-3.5 h-3.5" /> {new Date(dna.criadoEm).toLocaleDateString()}
                  </span>
                </div>
                <div className="pt-2 flex justify-end">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white/70 hover:text-white hover:bg-purple-600/10"
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/dashboard/dna/${dna.id}/editar`)
                    }}
                  >
                    <FileEdit className="w-4 h-4 mr-1" /> Editar
                  </Button>
                </div>
              </CardContent>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
