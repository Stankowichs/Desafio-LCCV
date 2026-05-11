"use client"

import { useState } from "react";

import { DashboardSidebar } from "./dashboard-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StressLineChart } from "@/components/charts/line-chart";
import { OutputBarChart } from "@/components/charts/bar-chart";
import { DashboardTable } from "./dashboard-table";
import {
  runSimulation,
  type QueryMode,
  type SavedSimulationResult,
  type SimulationFormValues,
  type SimulationModuleKey,
} from "@/lib/simulation";

const maxSavedSimulations = 6;

type SimulationHistory = Record<SimulationModuleKey, Record<QueryMode, SavedSimulationResult[]>>;

const emptySimulationHistory: SimulationHistory = {
  "thermo-buckling": {
    Table: [],
    "Plot Data": [],
  },
  "thermo-fatigue": {
    Table: [],
    "Plot Data": [],
  },
  buckling: {
    Table: [],
    "Plot Data": [],
  },
};

export function DashboardPage() {
  const [selectedModule, setSelectedModule] = useState<SimulationModuleKey>("thermo-buckling");
  const [selectedQueryMode, setSelectedQueryMode] = useState<QueryMode>("Table");
  const [simulationHistory, setSimulationHistory] = useState<SimulationHistory>(emptySimulationHistory);
  const [isSimulationLoading, setIsSimulationLoading] = useState(false);
  const [simulationError, setSimulationError] = useState<string | null>(null);
  const selectedHistory = simulationHistory[selectedModule][selectedQueryMode];

  const handleRunSimulation = async (formValues: SimulationFormValues) => {
    setIsSimulationLoading(true);
    setSimulationError(null);

    try {
      const result = await runSimulation(formValues);
      const savedResult: SavedSimulationResult = {
        ...result,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };

      setSimulationHistory((currentHistory) => ({
        ...currentHistory,
        [result.module]: {
          ...currentHistory[result.module],
          [result.queryMode]: [
            savedResult,
            ...currentHistory[result.module][result.queryMode],
          ].slice(0, maxSavedSimulations),
        },
      }));
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
          selectedModule={selectedModule}
          selectedQueryMode={selectedQueryMode}
          onModuleChange={setSelectedModule}
          onQueryModeChange={setSelectedQueryMode}
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
            <DashboardTable
              results={selectedHistory}
              selectedModule={selectedModule}
              selectedQueryMode={selectedQueryMode}
            />
          </div>

        </section>
      </div>
    </main>
  );
}
