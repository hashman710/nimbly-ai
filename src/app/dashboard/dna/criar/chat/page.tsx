// src/app/dashboard/dna/criar/chat/page.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'

const perguntas = [
  '1. Quem é seu cliente ideal e o que ele mais valoriza?',
  '2. Que problema crítico seu produto resolve?',
  '3. O valor está adequado à percepção do cliente?',
  '4. Como você se diferencia dos concorrentes?',
  '5. Existe um gatilho de escassez ou urgência?',
  '6. A mensagem fala a mesma linguagem do seu público?',
  '7. Você está usando o canal certo para cada etapa do funil?',
  '8. Quais KPIs indicarão se você está no caminho certo?',
  '9. Como você pode testar e validar cada hipótese?',
  '10. O que você precisa para amplificar resultados?',
]

export default function CriadorDnaChat() {
  const [mensagens, setMensagens] = useState<{ texto: string; tipo: 'bot' | 'user' }[]>([{
    texto: 'Vamos criar um DNA?',
    tipo: 'bot'
  }])
  const [input, setInput] = useState('')
  const [indice, setIndice] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const enviar = () => {
    if (!input.trim()) return
    setMensagens((prev) => [...prev, { texto: input, tipo: 'user' }])
    setTimeout(() => {
      setMensagens((prev) => [...prev, { texto: perguntas[indice], tipo: 'bot' }])
      setIndice((prev) => prev + 1)
    }, 500)
    setInput('')
  }

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' })
  }, [mensagens])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#10001f] to-black px-4 py-8 text-white">
      <div className="max-w-2xl mx-auto flex flex-col h-[90vh]">
        <h1 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Sparkles className="text-purple-400 w-5 h-5" /> Criador de DNA via Chat
        </h1>

        <Card className="flex-1 overflow-y-auto bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl space-y-4" ref={containerRef}>
          {mensagens.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[75%] px-4 py-2 rounded-xl text-sm whitespace-pre-line ${
                msg.tipo === 'bot'
                  ? 'bg-purple-600/30 self-start rounded-bl-none'
                  : 'bg-white/10 self-end rounded-br-none'
              }`}
            >
              {msg.texto}
            </div>
          ))}
        </Card>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            enviar()
          }}
          className="mt-4 flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua resposta..."
            className="bg-white/10 border-white/20 text-white"
          />
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Enviar</Button>
        </form>
      </div>
    </div>
  )
}
