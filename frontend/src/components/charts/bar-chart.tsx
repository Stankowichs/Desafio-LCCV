"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const outputData = [
  { output: "Max Stress", value: 342.5 },
  { output: "Critical Temp.", value: 468.3 },
  { output: "Safety Margin", value: 1.38 },
  { output: "Axial Force", value: 182.6 },
]

export function OutputBarChart() {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-slate-800">
          Output Comparison
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={outputData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis
                dataKey="output"
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
              <Bar dataKey="value" fill="#0D5C63" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
