"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const stressData = [
  { temperature: 20, axialStress: 118, allowableStress: 450 },
  { temperature: 100, axialStress: 154, allowableStress: 438 },
  { temperature: 200, axialStress: 203, allowableStress: 420 },
  { temperature: 300, axialStress: 249, allowableStress: 390 },
  { temperature: 400, axialStress: 288, allowableStress: 340 },
  { temperature: 500, axialStress: 312, allowableStress: 295 },
  { temperature: 600, axialStress: 266, allowableStress: 230 },
]

export function StressLineChart() {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-slate-800">
          Stress Distribution
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis
                dataKey="temperature"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748B", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748B", fontSize: 12 }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="axialStress"
                stroke="#0D5C63"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="allowableStress"
                stroke="#4A5568"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
