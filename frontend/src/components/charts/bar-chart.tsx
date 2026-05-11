"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { BarChartModel } from "@/lib/chart.config"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

type OutputBarChartProps = {
  model: BarChartModel;
};

export function OutputBarChart({ model }: OutputBarChartProps) {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-slate-800">
          {model.title}
        </CardTitle>
        <p className="text-sm text-slate-500">
          {model.subtitle}
        </p>
      </CardHeader>

      <CardContent>
        {model.data.length > 0 ? (
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={model.data}>
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
        ) : (
          <div className="flex h-[320px] items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 px-6 text-center text-sm text-slate-500">
            {model.emptyMessage}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
