"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartConfig } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Check, CheckSquare, Download, LineChart, List } from "lucide-react"
import { revenueAPI } from "../../response/revenue"
import { DailyRevenue } from "@/types/revenue"

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const chartConfig = {
  pos: { label: "POS", color: "#000000" },
  eatclub: { label: "Eatclub", color: "#595BEF" },
  labour: { label: "Labour Costs", color: "#ED6529" },
  posPrev: { label: "POS Prev", color: "#BDBDBD" },
  eatclubPrev: { label: "Eatclub Prev", color: "#CACCFC" },
  labourPrev: { label: "Labour Prev", color: "#F8CFBD" },
} satisfies ChartConfig

const AnimatedBarShape = ({ x, y, width, height, fill }: any) => (
  <motion.rect
    x={x}
    y={y}
    width={width}
    height={height}
    fill={fill}
    rx={1}
    initial={false} // không dùng initial = {width:0}, tránh co lại
    animate={{ width }}
    transition={{ duration: 0.5, ease: "easeIn" }}
  />
)

export default function ChartRevenueVsCost() {
  const [chartData, setChartData] = useState<any[]>([])
  const [chartDataPrev, setChartDataPrev] = useState<any[]>([])
  const [displayedData, setDisplayedData] = useState<any[]>([])

  const [showPOS, setShowPOS] = useState(true)
  const [showEatclub, setShowEatclub] = useState(true)
  const [showLabour, setShowLabour] = useState(true)
  const [showPrev, setShowPrev] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await revenueAPI.getDashboard({ date: new Date().toISOString().split('T')[0] })
      const current = res.payload.weeklyData || []
      const prev = res.payload.prevWeeklyData || []

      const mergedCurrent = dayNames.map((day, idx) => {
        const dayNum = idx + 1
        const currDay = current.find((d: DailyRevenue) => d.dayOfWeek === dayNum) as Partial<DailyRevenue> || {}
        return {
          day,
          pos: currDay.pos || 0,
          eatclub: currDay.eatclub || 0,
          labour: currDay.labour || 0,
        }
      })

      const mergedPrev = dayNames.map((day, idx) => {
        const dayNum = idx + 1
        const prevDay = prev.find((d: DailyRevenue) => d.dayOfWeek === dayNum) as Partial<DailyRevenue> || {}
        return {
          day,
          posPrev: prevDay.pos || 0,
          eatclubPrev: prevDay.eatclub || 0,
          labourPrev: prevDay.labour || 0,
        }
      })

      setChartData(mergedCurrent)
      setChartDataPrev(mergedPrev)
      setDisplayedData(mergedCurrent.map((d, idx) => ({ ...d, ...mergedPrev[idx] })))
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (showPrev) {
      const merged = chartData.map((d, idx) => ({ ...d, ...chartDataPrev[idx] }))
      setDisplayedData([...merged])
    } else {
      setDisplayedData([...chartData])
    }
  }, [showPrev, chartData, chartDataPrev])


  const barCategoryGap = showPrev ? "10%" : "20%"
  const barGap = showPrev ? 4 : 6

  return (
    <Card className="p-4 max-w-[90%] mx-auto rounded-2xl border border-neutral-200 mt-4">
<div className="flex justify-between items-start mb-3">

      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">
          Revenue & Labour This Week vs Previous
        </h2>
        <div className="flex gap-2 mt-1 flex-wrap">
          <Button
            variant={showPOS ? "default" : "outline"}
            size="sm"
            onClick={() => setShowPOS(!showPOS)}
            className="flex items-center gap-1"
          >
            {showPOS ? <Check size={16} /> : <CheckSquare size={16} />} POS
          </Button>

          <Button
            variant={showEatclub ? "default" : "outline"}
            size="sm"
            onClick={() => setShowEatclub(!showEatclub)}
            className="flex items-center gap-1"
          >
            {showEatclub ? <Check size={16} /> : <CheckSquare size={16} />} Eatclub
          </Button>

          <Button
            variant={showLabour ? "default" : "outline"}
            size="sm"
            onClick={() => setShowLabour(!showLabour)}
            className="flex items-center gap-1"
          >
            {showLabour ? <Check size={16} /> : <CheckSquare size={16} />} Labour
          </Button>
        </div>
      </div>


      <div className="flex gap-2">
        <Button size="sm" onClick={() => setShowPrev(!showPrev)} className="flex items-center gap-1">
          <LineChart size={16} />
          {showPrev ? "Hide Previous" : "Compare Previous"}
        </Button>

        <Button size="sm" variant="outline" className="flex items-center gap-1">
          <Download size={16} />
          Export
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="flex items-center gap-1"
          onClick={() => (window.location.href = "/admin/revenue")}
        >
          <List size={16} />
          List View
        </Button>
      </div>
    </div>


      <CardContent className="p-2">
        <ChartContainer config={chartConfig} className="h-[380px] w-full">
          <BarChart data={displayedData} barCategoryGap={barCategoryGap} barGap={barGap}>
            <CartesianGrid strokeDasharray="5 5" stroke="#cccccc" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#333", fontSize: 16, fontWeight: 500 }}/>
            <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} width={55} tick={{ fill: "#333", fontSize: 16, fontWeight: 500 }}/>
            <ChartLegend content={<ChartLegendContent />} />

            {/* Current stacked: POS + Eatclub */}
            {showPOS && <Bar dataKey="pos" stackId="revenue" fill={chartConfig.pos.color} shape={<AnimatedBarShape />} />}
            {showEatclub && <Bar dataKey="eatclub" stackId="revenue" fill={chartConfig.eatclub.color} shape={<AnimatedBarShape />} />}
            {showLabour && <Bar dataKey="labour" fill={chartConfig.labour.color} shape={<AnimatedBarShape />} />}

            {/* Previous bars: khi compare */}
            {showPrev && showPOS && <Bar dataKey="posPrev" stackId="revenuePrev" fill={chartConfig.posPrev.color} />}
            {showPrev && showEatclub && <Bar dataKey="eatclubPrev" stackId="revenuePrev" fill={chartConfig.eatclubPrev.color} />}
            {showPrev && showLabour && <Bar dataKey="labourPrev" fill={chartConfig.labourPrev.color} />}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
