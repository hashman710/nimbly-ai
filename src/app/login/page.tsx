'use client'

import { useState, useEffect } from 'react'
import { Mail, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Logo from '@/assets/logo-nimbly.png'
import LogoMini from '@/assets/logo-mini.png'
import { supabase } from '@/utils/supabaseClient'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [formLoading, setFormLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormLoading(true)

    const form = e.currentTarget
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const senha = (form.elements.namedItem("senha") as HTMLInputElement).value

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha
    })

    if (error) {
      alert("Credenciais inválidas: " + error.message)
      setFormLoading(false)
      return
    }

    alert("Login realizado com sucesso!")
    router.push("/dashboard")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
        <div className="absolute inset-0 animate-gradient-radial z-0" />
        <div className="relative z-10 flex flex-col items-center">
          <Image src={LogoMini} alt="Loading Logo" className="w-24 h-24 mb-6 animate-pulse" />
          <div className="relative w-32 h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="absolute h-full bg-purple-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2 }}
            />
          </div>
        </div>
        <style jsx>{`
          .animate-gradient-radial {
            background: radial-gradient(circle at center, #2e1065, #3b0a8d, #4c1d95, #1a042f);
            background-size: 200% 200%;
            animation: gradientBG 12s ease infinite;
          }
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    )
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
          <Image src={Logo} alt="Logo" className="w-full h-full" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-2xl font-semibold text-center mb-6 text-white"
        >
          Bem-vindo de volta
        </motion.h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <InputField icon={<Mail size={16} />} name="email" type="email" placeholder="exemplo@email.com" />
          <InputField icon={<Lock size={16} />} name="senha" type="password" placeholder="••••••••" />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2 rounded bg-purple-600 hover:bg-purple-700 text-white font-semibold transition"
            disabled={formLoading}
          >
            {formLoading ? 'Entrando...' : 'Entrar'}
          </motion.button>
        </form>

        <div className="flex justify-between mt-4 text-sm text-white/70">
          <Link href="#" className="hover:underline">Esqueceu sua senha?</Link>
          <Link href="/signup" className="hover:underline">Criar conta</Link>
        </div>
      </motion.div>

      <style jsx>{`
        .animate-gradient-radial {
          background: radial-gradient(circle at center, #1a042f, #2e1065, #3b0a8d, #4c1d95);
          background-size: 200% 200%;
          animation: gradientBG 12s ease infinite;
        }
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}

function InputField({ icon, ...props }: any) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">{icon}</span>
      <input
        {...props}
        className="w-full pl-10 pr-4 py-2 bg-white/10 text-white rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
      />
    </div>
  )
}
