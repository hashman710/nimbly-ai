// src/app/dashboard/dna/[id]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { BadgeCheck, CircleUserRound, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const mockDNAs = [
  {
    id: '1',
    nome: 'CRM Automático',
    descricao: 'DNA para empresas que querem escalar o atendimento com automação e integração com CRM.',
    criadoEm: '2025-03-01',
    status: 'ativo',
    criador: 'Equipe de Vendas',
    detalhes: 'Esse DNA inclui integração com sistemas como Ploomes, RD Station, e envio automático de e-mails por etapa do funil.',
    resumoExecutivo: `Este artigo apresenta, de forma metódica e detalhada, os elementos essenciais para a construção do “DNA” de uma campanha de marketing de alto impacto. Iniciamos pela definição precisa de objetivos, seguindo por um mergulho profundo no público-alvo e na elaboração de personas, avançamos para a análise do produto por meio de SWOT e desenvolvemos uma proposta de valor única. Em seguida, abordamos a seleção estratégica de canais, a criação de narrativas persuasivas e a importância de testes e otimizações contínuas. Finalizamos com um checklist de perguntas cruciais para a formulação da oferta perfeita, garantindo alinhamento entre público, produto e comunicação.`,
    respostas: {
      publico: 'Pequenas e médias empresas que valorizam agilidade, atendimento personalizado e automação sem complexidade.',
      produto: 'Reduz falhas manuais no atendimento e centraliza toda a comunicação com leads e clientes.',
      preco: 'Sim, está ajustado ao ticket médio de mercado e oferece ROI em menos de 3 meses.',
      posicionamento: 'Integração nativa com os principais CRMs do Brasil + suporte especializado por segmento.',
      urgencia: 'Gatilho de urgência baseado em perda de leads por falhas operacionais.',
      comunicacao: 'Sim, usamos a linguagem do gestor de CS e atendimento que busca performance e escalabilidade.',
      canal: 'Meta Ads para topo de funil, Google para fundo e LinkedIn para B2B estratégico.',
      metrica: 'Leads gerados, custo por lead, taxa de resposta no atendimento e tempo médio de resolução.',
      teste: 'Testes A/B com diferentes abordagens de mensagem no WhatsApp e formulário.',
      escala: 'Campanhas automatizadas e agentes de IA que ajustam a comunicação conforme volume e etapa do lead.'
    }
  },
]

export default function VisualizacaoDNA() {
  const params = useParams()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id
  const dna = mockDNAs.find((d) => d.id === id)

  if (!dna) return <div className="text-white p-8">DNA não encontrado.</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#10001f] to-black px-6 py-8 text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Sparkles className="text-purple-400 w-6 h-6" /> {dna.nome}
          </h1>
          <span className={`text-xs px-3 py-1 rounded ${dna.status === 'ativo' ? 'bg-green-600/20 text-green-400' : 'bg-yellow-600/20 text-yellow-400'}`}>
            {dna.status}
          </span>
        </div>

        <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
          <CardContent className="p-6 space-y-4">
            <p className="text-sm text-white/80">{dna.descricao}</p>
            <div className="text-xs text-white/60 flex items-center gap-2">
              <CircleUserRound className="w-4 h-4" /> Criado por <strong>{dna.criador}</strong> em <span>{new Date(dna.criadoEm).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">Resumo Executivo</h3>
            <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">{dna.resumoExecutivo}</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
          <CardContent className="p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white">Respostas Estratégicas</h3>
            <ul className="text-sm text-white/80 space-y-2">
              <li><strong>1. Público:</strong> {dna.respostas.publico}</li>
              <li><strong>2. Produto:</strong> {dna.respostas.produto}</li>
              <li><strong>3. Preço:</strong> {dna.respostas.preco}</li>
              <li><strong>4. Posicionamento:</strong> {dna.respostas.posicionamento}</li>
              <li><strong>5. Urgência:</strong> {dna.respostas.urgencia}</li>
              <li><strong>6. Comunicação:</strong> {dna.respostas.comunicacao}</li>
              <li><strong>7. Canal:</strong> {dna.respostas.canal}</li>
              <li><strong>8. Métrica:</strong> {dna.respostas.metrica}</li>
              <li><strong>9. Teste:</strong> {dna.respostas.teste}</li>
              <li><strong>10. Escala:</strong> {dna.respostas.escala}</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">Detalhes do DNA</h3>
            <p className="text-sm text-white/80 leading-relaxed">{dna.detalhes}</p>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button variant="secondary" className="text-white border border-white/20 hover:bg-purple-600/20" onClick={() => history.back()}>
            Voltar
          </Button>
        </div>
      </div>
    </div>
  )
}
