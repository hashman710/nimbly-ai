'use client'

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
} from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { format, parse, startOfWeek, getDay } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const locales = {
  "pt-BR": ptBR,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
})

const generateMockLeads = () => {
  const data = []
  for (let i = 30; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().slice(0, 10),
      leads: Math.floor(Math.random() * 30 + 10),
      cpl: parseFloat((Math.random() * 15 + 5).toFixed(2)),
      impressions: Math.floor(Math.random() * 3000 + 1000),
    })
  }
  return data
}

export default function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'Tarefa',
    participants: '',
    description: '',
    start: '',
    end: '',
    color: '#8b5cf6'
  })

  const handleDateClick = (slotInfo: any) => {
    const startDate = slotInfo.start
    const endDate = slotInfo.end || slotInfo.start
    setNewEvent({ ...newEvent, start: startDate.toISOString().slice(0, 16), end: endDate.toISOString().slice(0, 16) })
    setShowModal(true)
  }

  const handleEventClick = (event: any) => {
    setSelectedEvent(event)
    setShowViewModal(true)
  }

  const handleSaveEvent = () => {
    setEvents([...events, {
      ...newEvent,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
      color: newEvent.color || '#8b5cf6'
    }])
    setShowModal(false)
    setNewEvent({
      title: '',
      type: 'Tarefa',
      participants: '',
      description: '',
      start: '',
      end: '',
      color: '#8b5cf6'
    })
  }

  const mockData = generateMockLeads()
  const totalLeads = mockData.reduce((acc, d) => acc + d.leads, 0)
  const avgCPL = (mockData.reduce((acc, d) => acc + d.cpl, 0) / mockData.length).toFixed(2)
  const totalImpressions = mockData.reduce((acc, d) => acc + d.impressions, 0)

  const metricsLeads = [
    { title: "Leads Gerados", value: totalLeads.toString() },
    { title: "Leads Qualificados", value: Math.floor(totalLeads * 0.65).toString() },
    { title: "Taxa de Conversão", value: "22.5%" },
    { title: "Leads por Dia", value: (totalLeads / 30).toFixed(0) },
  ]

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-white mb-4">📅 Agenda e Tarefas</h2>
        <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 text-white shadow-xl rounded-2xl">
          <CardContent className="p-6 h-[500px]">
            <BigCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              selectable
              popup
              dayPropGetter={() => ({ style: { minHeight: "120px" } })}
              onSelectSlot={handleDateClick}
              onSelectEvent={handleEventClick}
              style={{ height: "100%", background: "transparent", color: "white", borderRadius: "1rem", padding: "0.5rem" }}
              views={["month", "week", "day"]}
              messages={{ month: "Mês", week: "Semana", day: "Dia", today: "Hoje", previous: "←", next: "→", agenda: "Agenda" }}
              components={{
                event: ({ event }) => {
                  const start = format(new Date(event.start), 'HH:mm')
                  const end = format(new Date(event.end), 'HH:mm')
                  return <span>[{event.type}] - [{start} até {end}] - {event.title}</span>
                },
              }}
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: event.color || '#8b5cf6',
                  borderRadius: '6px',
                  color: 'white',
                  padding: '4px',
                },
              })}
            />
          </CardContent>
        </Card>
      </section>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-zinc-900 text-white border border-white/10">
          <DialogHeader>
            <DialogTitle>Criar Evento</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Input placeholder="Nome do Evento" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
            <Input placeholder="Tipo (ex: Tarefa, Reunião)" value={newEvent.type} onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })} />
            <Input type="datetime-local" value={newEvent.start} onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })} />
            <Input type="datetime-local" value={newEvent.end} onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })} />
            <Input placeholder="Participantes" value={newEvent.participants} onChange={(e) => setNewEvent({ ...newEvent, participants: e.target.value })} />
            <Textarea placeholder="Descrição" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
            <Input type="color" value={newEvent.color} onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })} />
            <Button onClick={handleSaveEvent} className="w-full mt-2 bg-purple-600 hover:bg-purple-700">Salvar Evento</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="bg-zinc-900 text-white border border-white/10">
          <DialogHeader>
            <DialogTitle>Resumo do Evento</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-2">
              <p><strong>Nome:</strong> {selectedEvent.title}</p>
              <p><strong>Tipo:</strong> {selectedEvent.type}</p>
              <p><strong>Participantes:</strong> {selectedEvent.participants}</p>
              <p><strong>Início:</strong> {format(new Date(selectedEvent.start), 'dd/MM/yyyy HH:mm')}</p>
              <p><strong>Fim:</strong> {format(new Date(selectedEvent.end), 'dd/MM/yyyy HH:mm')}</p>
              <p><strong>Descrição:</strong> {selectedEvent.description}</p>
              <Button className="bg-purple-600 hover:bg-purple-700 w-full mt-4">Editar Evento</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <section>
        <h2 className="text-3xl font-bold text-white mb-4">📈 Métricas de Leads</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {metricsLeads.map((item, index) => (
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
    </div>
  )
}