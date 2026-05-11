"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LineChartModel } from "@/lib/chart.config"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const lineColors = ["#0D5C63", "#4A5568", "#2563EB", "#D97706", "#7C3AED", "#059669"];

type StressLineChartProps = {
  model: LineChartModel;
};

export function StressLineChart({ model }: StressLineChartProps) {
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
        {model.data.length > 0 && model.seriesKeys.length > 0 ? (
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={model.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  dataKey="x"
                  name={`${model.xAxis.label} (${model.xAxis.unit})`}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748B", fontSize: 12 }}
                />
                <YAxis
                  name={`${model.yAxis.label} (${model.yAxis.unit})`}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748B", fontSize: 12 }}
                />
                <Tooltip />
                {model.seriesKeys.map((seriesKey, index) => (
                  <Line
                    key={seriesKey}
                    type="monotone"
                    dataKey={seriesKey}
                    stroke={lineColors[index % lineColors.length]}
                    strokeWidth={2}
                    connectNulls
                    dot={{ r: 3 }}
                  />
                ))}
              </LineChart>
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
