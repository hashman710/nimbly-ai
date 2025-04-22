'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { UploadCloud } from 'lucide-react'

export default function ConfiguracoesPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    nome: '',
    username: '',
    email: '',
    avatar: ''
  })
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (user) {
        setUserId(user.id)
        const { data } = await supabase
          .from('usuarios')
          .select('*')
          .eq('id', user.id)
          .single()

        if (data) {
          setFormData({
            nome: data.nome || '',
            username: data.username || '',
            email: data.email || '',
            avatar: data.avatar || ''
          })
        }
      }
    }

    fetchUser()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    if (!userId) return

    const { error } = await supabase
      .from('usuarios')
      .update(formData)
      .eq('id', userId)

    if (!error) alert('Dados atualizados com sucesso!')
    else alert('Erro ao atualizar dados')
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      const file = e.target.files?.[0]
      if (!file || !userId) return

      const ext = file.name.split('.').pop()
      const path = `${userId}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('avatars').getPublicUrl(path)
      const publicUrl = data.publicUrl

      setFormData(prev => ({ ...prev, avatar: publicUrl }))

      await supabase.from('usuarios').update({ avatar: publicUrl }).eq('id', userId)
    } catch (err) {
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">Configurações da Conta</h1>

      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-6">
          <div>
            {formData.avatar ? (
              <img src={formData.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover border" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground border">
                Sem avatar
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label>Alterar Avatar</Label>
            <Input type="file" accept="image/*" onChange={handleAvatarUpload} disabled={uploading} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" value={formData.username} onChange={handleChange} />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
        </div>

        <Button onClick={handleSave}>Salvar alterações</Button>
      </Card>
    </div>
  )
}
