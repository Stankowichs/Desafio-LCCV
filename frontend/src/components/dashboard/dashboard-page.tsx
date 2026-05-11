"use client"

import { useState } from "react";

import { DashboardSidebar } from "./dashboard-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StressLineChart } from "@/components/charts/line-chart";
import { OutputBarChart } from "@/components/charts/bar-chart";
import { DashboardTable } from "./dashboard-table";
import { runSimulation, type SimulationFormValues, type SimulationResult, } from "@/lib/simulation";

export function DashboardPage() {
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [isSimulationLoading, setIsSimulationLoading] = useState(false);
  const [simulationError, setSimulationError] = useState<string | null>(null);

  const handleRunSimulation = async (formValues: SimulationFormValues) => {
    setIsSimulationLoading(true);
    setSimulationError(null);

    try {
      const result = await runSimulation(formValues);

      setSimulationResult(result);
    } catch (error) {
      setSimulationError(error instanceof Error ? error.message : "Erro ao executar simulacao");
    } finally {
      setIsSimulationLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F6F8F8] text-slate-900">
      <div className="flex min-h-screen">
        <DashboardSidebar
          errorMessage={simulationError}
          isLoading={isSimulationLoading}
          onRunSimulation={handleRunSimulation}
        />

        <section className="flex-1 p-6">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-normal">
                Análise de Dados PipeAPI
              </h1>
              <p className="text-sm text-slate-500">
                Simulações em tempo real para o desafio fullstack do PipeAPI
              </p>
            </div>
          </header>
          
          <div className="flex gap-12" >
            <Card className="mb-6 w-full max-w-sm border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Max Stress
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold leading-none text-slate-900">
                    342.5
                  </span>
                  <span className="pb-1 text-sm font-medium text-slate-500">
                    MPa
                  </span>
                </div>

                <p className="mt-3 text-xs font-medium text-red-600">
                  92% of yield strength
                </p>
              </CardContent>
            </Card>

            <Card className="mb-6 w-full max-w-sm border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Max Stress
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold leading-none text-slate-900">
                    342.5
                  </span>
                  <span className="pb-1 text-sm font-medium text-slate-500">
                    MPa
                  </span>
                </div>

                <p className="mt-3 text-xs font-medium text-red-600">
                  92% of yield strength
                </p>
              </CardContent>
            </Card>


            <Card className="mb-6 w-full max-w-sm border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Max Stress
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold leading-none text-slate-900">
                    342.5
                  </span>
                  <span className="pb-1 text-sm font-medium text-slate-500">
                    MPa
                  </span>
                </div>

                <p className="mt-3 text-xs font-medium text-red-600">
                  92% of yield strength
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_1fr]">
            <StressLineChart />
            <OutputBarChart />
          </div>

          <div className="mt-10 grid">
            <DashboardTable result={simulationResult} />
          </div>

        </section>
      </div>
    </main>
  );
}
