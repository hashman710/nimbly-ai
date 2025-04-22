// src/app/dashboard/crm/contatos/page.tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Filter, UserRound, Mail, Phone, CircleUserRound } from 'lucide-react'
import { motion } from 'framer-motion'

const mockContatos = Array.from({ length: 30 }, (_, i) => ({
  id: `c${i + 1}`,
  nome: `Contato ${i + 1}`,
  email: `contato${i + 1}@email.com`,
  telefone: '(11) 90000-0000',
  empresa: `Empresa ${i % 5 + 1}`,
  criadoEm: new Date().toISOString(),
  tags: i % 2 === 0 ? ['cliente'] : ['lead']
}))

export default function ContatosPage() {
  const [busca, setBusca] = useState('')
  const [empresaFiltro, setEmpresaFiltro] = useState('')
  const [tagFiltro, setTagFiltro] = useState('')
  const [filtroDialogAberto, setFiltroDialogAberto] = useState(false)

  const contatosFiltrados = mockContatos.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase()) &&
    (empresaFiltro ? c.empresa.toLowerCase().includes(empresaFiltro.toLowerCase()) : true) &&
    (tagFiltro ? c.tags.includes(tagFiltro) : true)
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="p-6 min-h-screen bg-gradient-to-br from-black via-[#10001f] to-black text-white space-y-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <motion.h1
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold"
        >
          Contatos
        </motion.h1>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3"
        >
          <Dialog open={filtroDialogAberto} onOpenChange={setFiltroDialogAberto}>
            <DialogTrigger asChild>
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                <Filter className="mr-2 w-4 h-4" /> Filtros
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0e001a] text-white">
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
            </DialogContent>
          </Dialog>

          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Plus className="mr-2 w-4 h-4" /> Adicionar Contato
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 rounded-xl p-4 overflow-auto shadow-lg backdrop-blur-xl"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-white/10 text-white/60">
              <th className="p-3">Nome</th>
              <th className="p-3">Email</th>
              <th className="p-3">Telefone</th>
              <th className="p-3">Empresa</th>
              <th className="p-3">Tags</th>
              <th className="p-3">Criado em</th>
            </tr>
          </thead>
          <tbody>
            {contatosFiltrados.map((c, i) => (
              <motion.tr
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="border-b border-white/5 hover:bg-white/10 transition"
              >
                <td className="p-3 flex items-center gap-2"><UserRound className="w-4 h-4 text-purple-300" /> {c.nome}</td>
                <td className="p-3"><Mail className="w-4 h-4 inline mr-1" /> {c.email}</td>
                <td className="p-3"><Phone className="w-4 h-4 inline mr-1" /> {c.telefone}</td>
                <td className="p-3"><CircleUserRound className="w-4 h-4 inline mr-1" /> {c.empresa}</td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-2">
                    {c.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-purple-800/30 text-purple-300">{tag}</span>
                    ))}
                  </div>
                </td>
                <td className="p-3 text-xs text-white/50">{new Date(c.criadoEm).toLocaleDateString()}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  )
}