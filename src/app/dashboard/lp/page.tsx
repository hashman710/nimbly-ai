// src/app/page.tsx
'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1b1b1b] to-[#0f0f0f] text-white px-6 md:px-20 py-16 font-sans">
      
      {/* HERO */}
      <section className="text-center max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-purple-500"
        >
          A agência de marketing 100% IA que trabalha por você
        </motion.h1>
        <p className="text-lg text-gray-300 mt-6">
          O Nimbly.ai é sua equipe de marketing automatizada. Gere leads, campanhas, conteúdo e relatórios sem esforço — com agentes inteligentes que fazem tudo por você.
        </p>
        <form className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
          <div className="relative w-full max-w-md">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <Input
              placeholder="Seu e-mail profissional"
              className="pl-10 pr-4 py-6 bg-white/10 border border-white/20 backdrop-blur text-white"
            />
          </div>
          <Button className="bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-4 rounded-xl transition">
            Agendar uma demo
          </Button>
        </form>
      </section>

      {/* BENEFÍCIOS */}
      <section className="mt-32 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
        {[
          { title: 'Criação de campanhas', desc: 'Anuncie no Meta Ads e Google Ads com apenas um clique.' },
          { title: 'Gestão de leads', desc: 'Organize e qualifique todos os seus contatos em um CRM visual e simples.' },
          { title: 'Agentes inteligentes', desc: 'A IA executa tarefas como um time: rápido, automatizado e sem erros.' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 backdrop-blur rounded-2xl p-8"
          >
            <h3 className="text-xl font-semibold mb-2 text-green-400">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* COMO FUNCIONA */}
      <section className="mt-32 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-green-400">
          Como funciona?
        </h2>
        <ol className="space-y-6 text-gray-300 text-left">
          <li><strong className="text-green-400">1.</strong> Você preenche o DNA com dados do seu produto.</li>
          <li><strong className="text-green-400">2.</strong> A IA analisa tudo e cria um plano de marketing completo.</li>
          <li><strong className="text-green-400">3.</strong> Os agentes executam suas tarefas diariamente.</li>
          <li><strong className="text-green-400">4.</strong> Você recebe relatórios e otimizações automáticas.</li>
        </ol>
      </section>

      {/* DEPOIMENTOS */}
      <section className="mt-32 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10 text-white">Empresas que testaram o Nimbly.ai</h2>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {[
            { nome: "João, CEO da LoggiX", texto: "O Nimbly reduziu nosso custo de lead em 38% no primeiro mês. É como ter uma agência 24/7." },
            { nome: "Beatriz, Fundadora da EduPro", texto: "A IA realmente entende meu público e cria campanhas muito mais rápido do que minha equipe anterior." },
            { nome: "Carlos, COO na FinLog", texto: "Conseguimos escalar sem contratar. Isso aqui é o futuro." },
          ].map((dep, i) => (
            <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/10">
              <p className="italic text-gray-300 mb-4">"{dep.texto}"</p>
              <p className="text-green-400 font-bold">{dep.nome}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mt-32 text-center">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-purple-400 mb-6">
          Pronto para ter um time de marketing que nunca dorme?
        </h2>
        <Button className="text-black bg-green-500 hover:bg-green-400 text-lg px-8 py-4 rounded-xl font-semibold transition">
          Agendar minha demonstração gratuita
        </Button>
        <p className="text-sm text-gray-500 mt-2">Sem cartão de crédito. Sem enrolação.</p>
      </section>
    </main>
  )
}
