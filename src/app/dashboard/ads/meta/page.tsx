// src/app/dashboard/ads/meta/page.tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Plus, Filter, Settings2, Layers3, Folder, LayoutGrid, Monitor, Check, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Resizable } from 're-resizable'

const mockCampanhas = Array.from({ length: 4 }, (_, i) => ({
  id: `cmp${i + 1}`,
  nome: `Campanha ${i + 1}`,
  status: i % 2 === 0 ? 'ativo' : 'pausado',
  estrategia: 'Custo por Clique',
  orcamento: `R$ ${100 + i * 50},00 / dia`,
  atribuicao: 'Clique de 7 dias',
  metricas: {
    'Alcance': 1000 + i * 100,
    'Impressões': 2000 + i * 150,
    'Frequência': (1.5 + i * 0.2).toFixed(2),
    'Resultados': 300 + i * 50,
    'Custo por Resultado': `R$ ${(10 + i * 2).toFixed(2)}`
  }
}))

const mockConjuntos = mockCampanhas.flatMap((campanha, idx) =>
  Array.from({ length: 2 }, (_, j) => ({
    id: `conj${idx + 1}-${j + 1}`,
    nome: `Conjunto ${j + 1} - ${campanha.nome}`,
    campanhaId: campanha.id,
    orcamento: `R$ ${50 + j * 10},00 / dia`,
    metricas: campanha.metricas
  }))
)

const mockAnuncios = mockCampanhas.flatMap((campanha, idx) =>
  Array.from({ length: 3 }, (_, j) => ({
    id: `ad${idx + 1}-${j + 1}`,
    nome: `Anúncio ${j + 1} - ${campanha.nome}`,
    campanhaId: campanha.id,
    status: j % 2 === 0 ? 'Ativo' : 'Pausado',
    metricas: campanha.metricas
  }))
)

const metricColumns = {
  'Desempenho Geral': ['Alcance', 'Impressões', 'Frequência', 'Resultados', 'Custo por Resultado'],
  Conversão: ['Conversões', 'Valor de Conversão', 'Custo por Conversão'],
  Engajamento: ['Curtidas', 'Comentários', 'Compartilhamentos'],
  Vídeo: ['Visualizações 3s', 'Visualizações 50%', 'Tempo Médio'],
  App: ['Instalações do App', 'Custo por Instalação'],
  'E-commerce': ['Adições ao Carrinho'],
  Leads: ['Leads', 'Custo por Lead'],
  Mensagens: ['Cliques WhatsApp', 'Mensagens Iniciadas'],
  Qualidade: ['Pontuação de Qualidade'],
  Demografia: ['Idade', 'Gênero', 'Dispositivo']
}

export default function MetaAdsPage() {
  const [selectedBM, setSelectedBM] = useState('BM Principal')
  const [selectedConta, setSelectedConta] = useState('Conta 1')
  const [colunaDialogOpen, setColunaDialogOpen] = useState(false)
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([])
  const [selectedCampanhas, setSelectedCampanhas] = useState<string[]>([])
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({})
  const [view, setView] = useState('campanhas')

  const toggleMetric = (metric: string) => {
    setSelectedMetrics(prev => prev.includes(metric) ? prev.filter(m => m !== metric) : [...prev, metric])
  }

  const toggleCampanha = (id: string) => {
    setSelectedCampanhas(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id])
  }

  const handleResize = (metric: string, size: number) => {
    setColumnWidths(prev => ({ ...prev, [metric]: size }))
  }

  const conjuntosFiltrados = selectedCampanhas.length
    ? mockConjuntos.filter(c => selectedCampanhas.includes(c.campanhaId))
    : mockConjuntos

  const anunciosFiltrados = selectedCampanhas.length
    ? mockAnuncios.filter(a => selectedCampanhas.includes(a.campanhaId))
    : mockAnuncios

  const renderTable = (data: any[]) => (
    <div className="overflow-x-auto max-w-full">
      <table className="table-auto w-full text-sm">
        <thead className="text-white/60 text-left">
          <tr>
            <th className="p-2">Nome</th>
            {selectedMetrics.map(metric => (
              <th key={metric} className="p-2 whitespace-nowrap">
                <Resizable
                  defaultSize={{ width: columnWidths[metric] || 140, height: 'auto' }}
                  enable={{ right: true }}
                  handleStyles={{
                    right: { background: '#7c3aed', width: '4px', cursor: 'col-resize' }
                  }}
                  onResizeStop={(_, __, ref) => handleResize(metric, parseInt(ref.style.width))}
                >
                  <div className="px-2 font-medium">{metric}</div>
                </Resizable>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id} className="border-b border-white/10">
              <td className="p-2 text-white whitespace-nowrap">{row.nome}</td>
              {selectedMetrics.map(metric => (
                <td key={metric} className="p-2 text-white/80 whitespace-nowrap">{row.metricas?.[metric] || '-'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen p-6 bg-gradient-to-br from-black via-[#0c0017] to-black text-white">
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <div className="space-y-1">
          <span className="text-sm text-white/60">Business Manager</span>
          <Select value={selectedBM} onValueChange={setSelectedBM}>
            <SelectTrigger className="w-[200px] bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Selecione uma BM" />
            </SelectTrigger>
            <SelectContent className="bg-[#0f001d] text-white">
              <SelectItem value="BM Principal">BM Principal</SelectItem>
              <SelectItem value="BM Secundária">BM Secundária</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <span className="text-sm text-white/60">Conta de Anúncio</span>
          <Select value={selectedConta} onValueChange={setSelectedConta}>
            <SelectTrigger className="w-[200px] bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Selecione uma conta" />
            </SelectTrigger>
            <SelectContent className="bg-[#0f001d] text-white">
              <SelectItem value="Conta 1">Conta 1</SelectItem>
              <SelectItem value="Conta 2">Conta 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="ml-auto flex gap-2">
          <Button onClick={() => setColunaDialogOpen(true)} className="bg-white/10 hover:bg-white/20 text-white">
            <Settings2 className="w-4 h-4 mr-2" /> Personalizar Colunas
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" /> Criar Campanha
          </Button>
        </div>
      </div>

      <Tabs defaultValue="campanhas" className="mb-6" onValueChange={setView}>
        <TabsList className="bg-white/5 text-white rounded-xl">
          <TabsTrigger value="campanhas" className="data-[state=active]:bg-purple-600 px-4 py-2">Campanhas</TabsTrigger>
          <TabsTrigger value="conjuntos" className="data-[state=active]:bg-purple-600 px-4 py-2">Conjuntos</TabsTrigger>
          <TabsTrigger value="anuncios" className="data-[state=active]:bg-purple-600 px-4 py-2">Anúncios</TabsTrigger>
        </TabsList>

        <TabsContent value="campanhas">
          {renderTable(mockCampanhas)}
        </TabsContent>
        <TabsContent value="conjuntos">
          {renderTable(conjuntosFiltrados)}
        </TabsContent>
        <TabsContent value="anuncios">
          {renderTable(anunciosFiltrados)}
        </TabsContent>
      </Tabs>

      {/* Dialog de Colunas */}
      <Dialog open={colunaDialogOpen} onOpenChange={setColunaDialogOpen}>
        <DialogContent className="bg-[#0f001d] text-white max-h-[80vh] overflow-auto w-full max-w-5xl rounded-xl border border-white/10 shadow-xl">
          <h2 className="text-lg font-semibold mb-4">Selecionar Colunas Personalizadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Accordion type="single" collapsible className="space-y-2">
              {Object.entries(metricColumns).map(([categoria, metricas]) => (
                <AccordionItem key={categoria} value={categoria}>
                  <AccordionTrigger className="text-white/90 font-medium bg-white/5 px-4 py-2 rounded-md">{categoria}</AccordionTrigger>
                  <AccordionContent className="space-y-2 mt-2">
                    {metricas.map(metric => (
                      <button
                        key={metric}
                        onClick={() => toggleMetric(metric)}
                        className={`w-full flex items-center justify-between px-4 py-2 border rounded-lg transition text-left ${selectedMetrics.includes(metric) ? 'bg-purple-600 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-white/80'}`}
                      >
                        <span>{metric}</span>
                        {selectedMetrics.includes(metric) && <Check className="w-4 h-4 text-white" />}
                      </button>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div>
              <h3 className="text-white/70 font-semibold mb-2">Métricas Selecionadas</h3>
              <div className="space-y-2">
                {selectedMetrics.map(metric => (
                  <div key={metric} className="flex items-center justify-between px-4 py-2 bg-white/10 rounded-lg text-sm">
                    <span>{metric}</span>
                    <Button size="icon" variant="ghost" onClick={() => toggleMetric(metric)} className="text-white/50 hover:text-white">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button className="bg-purple-600 hover:bg-purple-700">Aplicar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
