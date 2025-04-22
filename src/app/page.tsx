"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
} from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { format, parse, startOfWeek, getDay } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"

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

const events = [
  {
    title: "Finalizar Campanha Abril",
    start: new Date(),
    end: new Date(),
    allDay: true,
  },
  {
    title: "Reunião com Vendas",
    start: new Date(new Date().setHours(14, 0)),
    end: new Date(new Date().setHours(15, 0)),
  },
]

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-white">
          📅 Agenda & Tarefas
        </h2>
        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 text-white shadow-lg">
          <CardContent className="p-5 h-[420px]">
            <BigCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%", background: "transparent", color: "white" }}
              views={["month", "week", "day"]}
              messages={{
                month: "Mês",
                week: "Semana",
                day: "Dia",
                today: "Hoje",
                previous: "←",
                next: "→",
                agenda: "Agenda",
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
