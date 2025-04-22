'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Logo from '@/assets/logo-nimbly.png'
import { Mail } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ email })
    // lógica para envio de email de recuperação
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 animate-gradient-radial z-0" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-sm bg-white/5 backdrop-blur-lg rounded-2xl shadow-lg border border-white/10 p-8"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex justify-center mb-6"
        >
          <Image src={Logo} alt="Logo" className="w-full h-full object-contain" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-2xl font-semibold text-center mb-6 text-white"
        >
          Recuperar senha
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
              <Mail size={16} />
            </span>
            <input
              type="email"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 text-white rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2 rounded bg-purple-600 hover:bg-purple-700 text-white font-semibold transition"
          >
            Enviar link de recuperação
          </motion.button>
        </form>

        <div className="text-center text-sm mt-4 text-white/70">
          <Link href="/login" className="hover:underline">
            Voltar para login
          </Link>
        </div>
      </motion.div>

      <style jsx>{`
        .animate-gradient-radial {
          background: radial-gradient(circle at center, #1a042f, #2e1065, #3b0a8d, #4c1d95);
          background-size: 200% 200%;
          animation: gradientBG 12s ease infinite;
        }

        @keyframes gradientBG {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  )
}
