'use client'

import { useState } from 'react'
import { Mail, Lock, User } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import Logo from "@/assets/logo-nimbly.png"
import { supabase } from "@/utils/supabaseClient"

export default function SignupPage() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const getPasswordStrength = (password: string) => {
    if (password.length > 12 && /[A-Z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password)) {
      return { label: "Forte", color: "bg-green-500" }
    } else if (password.length > 8) {
      return { label: "Média", color: "bg-yellow-500" }
    } else if (password.length > 0) {
      return { label: "Fraca", color: "bg-red-500" }
    } else {
      return { label: "", color: "bg-transparent" }
    }
  }

  const strength = getPasswordStrength(password)

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const nome = (form.elements.namedItem("nome") as HTMLInputElement).value
    const username = (form.elements.namedItem("username") as HTMLInputElement).value
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const senha = (form.elements.namedItem("senha") as HTMLInputElement).value
    const confirmar = (form.elements.namedItem("confirmar") as HTMLInputElement).value

    if (senha !== confirmar) {
      alert("As senhas não coincidem!")
      setLoading(false)
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
    })

    if (error) {
      alert("Erro ao criar conta: " + error.message)
      setLoading(false)
      return
    }

    if (data.user) {
      await supabase.from("usuarios").insert([{
        id: data.user.id,
        nome,
        username,
        email
      }])
    }

    alert("Conta criada com sucesso! Faça login para continuar.")
    window.location.href = "/login"
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 animate-gradient-radial z-0" />
      <motion.div className="relative z-10 w-full max-w-sm bg-white/5 backdrop-blur-lg rounded-2xl shadow-lg border border-white/10 p-8">
        <Image src={Logo} alt="Logo" className="mx-auto mb-6 w-36" />
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">Criar Conta</h2>
        <form className="space-y-4" onSubmit={handleSignup}>
          <InputField icon={<User size={16} />} name="nome" placeholder="Seu nome" />
          <InputField icon={<User size={16} />} name="username" placeholder="Nome de usuário" />
          <InputField icon={<Mail size={16} />} name="email" type="email" placeholder="exemplo@email.com" />
          <InputField icon={<Lock size={16} />} name="senha" type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
          <InputField icon={<Lock size={16} />} name="confirmar" type="password" placeholder="Confirmar senha" />
          {password && <div className="text-sm text-white/70">Senha: {strength.label}</div>}
          <button disabled={loading} type="submit" className="w-full py-2 rounded bg-purple-600 hover:bg-purple-700 text-white font-semibold">
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
        <div className="flex justify-between mt-4 text-sm text-white/70">
          <Link href="/login" className="hover:underline">Já tem conta?</Link>
        </div>
      </motion.div>
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
