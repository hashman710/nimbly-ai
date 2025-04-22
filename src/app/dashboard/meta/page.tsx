// src/app/dashboard/meta/page.tsx
'use client'

import { Card, CardContent } from "@/components/ui/card"
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'

const COLORS = ['#a855f7', '#10b981', '#38bdf8', '#facc15', '#f472b6', '#fb923c']

const generateMetaMockData = () => {
  const data = []
  for (let i = 30; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().slice(0, 10),
      leads: Math.floor(Math.random() * 50 + 20),
      cpl: parseFloat((Math.random() * 10 + 5).toFixed(2)),
      impressions: Math.floor(Math.random() * 5000 + 2000),
      clicks: Math.floor(Math.random() * 700 + 100),
      ctr: parseFloat((Math.random() * 3 + 1).toFixed(2)),
      spend: parseFloat((Math.random() * 200 + 50).toFixed(2))
    })
  }
  return data
}

const demographicData = {
  age: [
    { name: '18-24', value: 1800 },
    { name: '25-34', value: 3200 },
    { name: '35-44', value: 2500 },
    { name: '45-54', value: 1300 },
    { name: '55-64', value: 800 },
    { name: '65+', value: 400 },
  ],
  gender: [
    { name: 'Masculino', value: 5200 },
    { name: 'Feminino', value: 4900 },
    { name: 'Outros', value: 500 },
  ],
  platform: [
    { name: 'Mobile', value: 7800 },
    { name: 'Desktop', value: 2100 },
    { name: 'Tablet', value: 700 },
  ]
}

export default function MetaDashboardPage() {
  const mockData = generateMetaMockData()

  const totalLeads = mockData.reduce((acc, d) => acc + d.leads, 0)
  const totalClicks = mockData.reduce((acc, d) => acc + d.clicks, 0)
  const avgCTR = (mockData.reduce((acc, d) => acc + d.ctr, 0) / mockData.length).toFixed(2)
  const totalImpressions = mockData.reduce((acc, d) => acc + d.impressions, 0)
  const avgCPL = (mockData.reduce((acc, d) => acc + d.cpl, 0) / mockData.length).toFixed(2)
  const totalSpend = mockData.reduce((acc, d) => acc + d.spend, 0).toFixed(2)

  const metrics = [
    { title: "Leads Gerados", value: totalLeads.toString() },
    { title: "Cliques", value: totalClicks.toString() },
    { title: "CTR Médio", value: `${avgCTR}%` },
    { title: "CPL Médio", value: `R$ ${avgCPL}` },
    { title: "Investimento Total", value: `R$ ${totalSpend}` },
    { title: "Impressões", value: totalImpressions.toLocaleString() },
  ]

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold mb-4">Visão Geral - Meta Ads</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4 mb-6">
          {metrics.map((item, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 text-white shadow-lg">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CardContent className="p-5">
                  <p className="text-sm text-purple-300">{item.title}</p>
                  <p className="text-2xl font-bold mt-1">
                    <CountUp
                      end={parseFloat(item.value.replace(/[^0-9.-]+/g, ''))}
                      decimals={item.value.includes('.') ? 2 : 0}
                      duration={1.5}
                      prefix={item.value.includes('R$') ? 'R$ ' : ''}
                      suffix={item.value.includes('%') ? '%' : ''}
                    />
                  </p>
                </CardContent>
              </motion.div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Performance e Custos</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10 text-white shadow-lg">
            <CardContent className="p-5 h-64">
              <h4 className="text-sm text-white/60 mb-2">Leads por Dia</h4>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" tick={{ fill: "#ccc", fontSize: 10 }} />
                  <YAxis tick={{ fill: "#ccc", fontSize: 10 }} />
                  <Tooltip contentStyle={{ backgroundColor: "#1f1f1f" }} />
                  <Line type="monotone" dataKey="leads" stroke="#a855f7" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-xl border border-white/10 text-white shadow-lg">
            <CardContent className="p-5 h-64">
              <h4 className="text-sm text-white/60 mb-2">Impressões x Cliques</h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" tick={{ fill: "#ccc", fontSize: 10 }} />
                  <YAxis tick={{ fill: "#ccc", fontSize: 10 }} />
                  <Tooltip contentStyle={{ backgroundColor: "#1f1f1f" }} />
                  <Bar dataKey="impressions" fill="#6366f1" />
                  <Bar dataKey="clicks" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-xl border border-white/10 text-white shadow-lg col-span-1 lg:col-span-2">
            <CardContent className="p-5 h-72">
              <h4 className="text-sm text-white/60 mb-2">CPL por Dia</h4>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" tick={{ fill: "#ccc", fontSize: 10 }} />
                  <YAxis tick={{ fill: "#ccc", fontSize: 10 }} />
                  <Tooltip contentStyle={{ backgroundColor: "#1f1f1f" }} />
                  <Area type="monotone" dataKey="cpl" stroke="#38bdf8" fill="#38bdf83b" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Distribuição Demográfica</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {["age", "gender", "platform"].map((type, idx) => (
            <Card key={type} className="bg-white/5 backdrop-blur-xl border border-white/10 text-white shadow-lg">
              <CardContent className="p-5 h-72">
                <h4 className="text-sm text-white/60 mb-2">
                  {type === 'age' && 'Faixa Etária'}
                  {type === 'gender' && 'Gênero'}
                  {type === 'platform' && 'Plataforma'}
                </h4>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={demographicData[type]} dataKey="value" nameKey="name" outerRadius={70}>
                      {demographicData[type].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1f1f1f', color: '#fff' }} />
                    <Legend wrapperStyle={{ fontSize: 10, color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
