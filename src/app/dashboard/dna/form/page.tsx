// src/app/dashboard/dna/criar/formulario/page.tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'

const perguntas = [
  {
    id: 'publico',
    label: '1. Quem é seu cliente ideal e o que ele mais valoriza?'
  },
  {
    id: 'produto',
    label: '2. Que problema crítico seu produto resolve?'
  },
  {
    id: 'preco',
    label: '3. O valor está adequado à percepção do cliente?'
  },
  {
    id: 'posicionamento',
    label: '4. Como você se diferencia dos concorrentes?'
  },
  {
    id: 'urgencia',
    label: '5. Existe um gatilho de escassez ou urgência?'
  },
  {
    id: 'comunicacao',
    label: '6. A mensagem fala a mesma linguagem do seu público?'
  },
  {
    id: 'canal',
    label: '7. Você está usando o canal certo para cada etapa do funil?'
  },
  {
    id: 'metrica',
    label: '8. Quais KPIs indicarão se você está no caminho certo?'
  },
  {
    id: 'teste',
    label: '9. Como você pode testar e validar cada hipótese?'
  },
  {
    id: 'escala',
    label: '10. O que você precisa para amplificar resultados?'
  },
]

export default function CriadorDnaFormulario() {
  const [respostas, setRespostas] = useState<Record<string, string>>({})

  const handleChange = (id: string, value: string) => {
    setRespostas((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = () => {
    console.log('DNA gerado:', respostas)
    alert('DNA gerado com sucesso! Veja o console para detalhes.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#10001f] to-black text-white px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="text-purple-400 w-5 h-5" /> Criador de DNA por Formulário
        </h1>

        <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
          <CardContent className="p-6 space-y-6">
            {perguntas.map((pergunta) => (
              <div key={pergunta.id} className="space-y-2">
                <label htmlFor={pergunta.id} className="text-sm font-semibold text-white">
                  {pergunta.label}
                </label>
                <Textarea
                  id={pergunta.id}
                  className="resize-none text-sm"
                  rows={3}
                  value={respostas[pergunta.id] || ''}
                  onChange={(e) => handleChange(pergunta.id, e.target.value)}
                />
              </div>
            ))}

            <div className="pt-4">
              <Button variant="secondary" onClick={handleSubmit}>Gerar DNA</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
