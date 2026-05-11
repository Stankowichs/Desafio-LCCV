"use client"

import { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const simulationModules = [
  {
    key: "thermo-buckling",
    label: "Thermo Buckling",
    parameters: [
      { id: "di", label: "di", unit: "mm", defaultValue: 139.7 },
      { id: "t", label: "t", unit: "mm", defaultValue: 12.7, step: 0.1 },
      { id: "t_cra", label: "t_cra", unit: "mm", defaultValue: 0 },
      { id: "w_sub_empty", label: "w_sub_empty", unit: "kN/m", defaultValue: 0.1, step: 0.1 },
      { id: "rho_content", label: "rho_content", unit: "kg/m3", defaultValue: 30 },
      { id: "mu_lateral", label: "mu_lateral", defaultValue: 0.5, step: 0.1 },
      { id: "mu_axial", label: "mu_axial", defaultValue: 0.2, step: 0.1 },
      { id: "vas", label: "vas", unit: "m/s", defaultValue: 1000 },
      { id: "h_sleeper", label: "h_sleeper", unit: "m", defaultValue: 0, step: 0.1 },
      { id: "mu_sleeper", label: "mu_sleeper", defaultValue: 0, step: 0.1 },
      { id: "de_rating", label: "de_rating", unit: "%", defaultValue: 50 },
    ],
  },
  {
    key: "thermo-fatigue",
    label: "Thermo Fatigue",
    parameters: [
      { id: "di", label: "di", unit: "mm", defaultValue: 139.7 },
      { id: "t", label: "t", unit: "mm", defaultValue: 12.7, step: 0.1 },
      { id: "t_cra", label: "t_cra", unit: "mm", defaultValue: 0 },
      { id: "w_sub_empty", label: "w_sub_empty", unit: "kN/m", defaultValue: 0.1, step: 0.1 },
      { id: "rho_content", label: "rho_content", unit: "kg/m3", defaultValue: 30 },
      { id: "mu_lateral", label: "mu_lateral", defaultValue: 0.5, step: 0.1 },
      { id: "mu_axial", label: "mu_axial", defaultValue: 0.2, step: 0.1 },
      { id: "vas", label: "vas", unit: "m/s", defaultValue: 1000 },
      { id: "h_sleeper", label: "h_sleeper", unit: "m", defaultValue: 0, step: 0.1 },
      { id: "mu_sleeper", label: "mu_sleeper", defaultValue: 0, step: 0.1 },
      { id: "t_design", label: "t_design", unit: "C", defaultValue: 50 },
      { id: "p_design", label: "p_design", unit: "MPa", defaultValue: 22 },
    ],
  },
  {
    key: "buckling",
    label: "Buckling",
    parameters: [
      { id: "di", label: "di", unit: "mm", defaultValue: 139.7 },
      { id: "t", label: "t", unit: "mm", defaultValue: 12.7, step: 0.1 },
      { id: "w_sub", label: "w_sub", unit: "kN/m", defaultValue: 0.4 },
      { id: "t_cra", label: "t_cra", unit: "mm", defaultValue: 0 },
      { id: "temperature", label: "temperature", unit: "C", defaultValue: 40 },
      { id: "h_sleeper", label: "h_sleeper", unit: "m", defaultValue: 0, step: 0.1 },
      { id: "u_sleeper", label: "u_sleeper", unit: "m", defaultValue: 0, step: 0.1 },
    ],
  },
] as const;

type SimulationModuleKey = (typeof simulationModules)[number]["key"];

const moduleByKey = Object.fromEntries(
  simulationModules.map((module) => [module.key, module]),
) as Record<SimulationModuleKey, (typeof simulationModules)[number]>;


export function DashboardSidebar() {
  const [selectedModule, setSelectedModule] = useState<SimulationModuleKey>('thermo-buckling');
  const [selectedQueryMode, setSelectedQueryMode] = useState('Table');
  const selectedModuleConfig = moduleByKey[selectedModule];


  const handleModule = (module: SimulationModuleKey) => {
    setSelectedModule(module)
  }

  const handleQueryMode = (module: string) => {
    setSelectedQueryMode(module)
  }

  return (
    <aside className="max-h-screen w-[280px] overflow-y-auto border-r border-slate-200 bg-white p-4">
      <div className="mb-6">
        <h2 className="text-sm font-bold uppercase text-slate-700">
          PipeAPI Dashboard
        </h2>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase text-slate-400">
          Simulation Modules
        </p>

        {simulationModules.map((module) => (
          <Button
            key={module.key}
            variant={selectedModule === module.key ? undefined : "ghost"}
            className={selectedModule === module.key
              ? "w-full justify-start bg-[#0D5C63] hover:bg-[#004F55]"
              : "w-full justify-start"
            }
            onClick={() => handleModule(module.key)}
          >
            {module.label}
          </Button>
        ))}
      </div>

      <Separator className="my-5" />

      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase text-slate-400">
          Query Mode
        </p>

        <div className="grid grid-cols-1 gap-2">
          <Button
            variant={selectedQueryMode === "Table" ? undefined : "ghost"}
            className={selectedQueryMode === "Table"
              ? "justify-start bg-[#0D5C63] hover:bg-[#004F55]"
              : "justify-start"
            }
            onClick={() => handleQueryMode('Table')}
          >
            Table
          </Button>
          <Button
            variant={selectedQueryMode === "Plot Data" ? undefined : "ghost"}
            className={selectedQueryMode === "Plot Data"
              ? "justify-start bg-[#0D5C63] hover:bg-[#004F55]"
              : "justify-start"
            }
            onClick={() => handleQueryMode('Plot Data')}
          >
            Plot Data
          </Button>
          <Button
            variant={selectedQueryMode === "Multiple Points" ? undefined : "ghost"}
            className={selectedQueryMode === "Multiple Points"
              ? "justify-start bg-[#0D5C63] hover:bg-[#004F55]"
              : "justify-start"
            }
            onClick={() => handleQueryMode('Multiple Points')}
          >
            Multiple Points
          </Button>
        </div>
      </div>

      <Separator className="my-5" />

      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase text-slate-400">
          Entity Parameters
        </p>

        <div className="grid grid-cols-2 gap-3">
          {selectedModuleConfig.parameters.map((parameter) => (
            <div key={`${selectedModule}-${parameter.id}`} className="space-y-1">
              <Label htmlFor={parameter.id} className="text-xs">
                {"unit" in parameter && parameter.unit
                  ? `${parameter.label} (${parameter.unit})`
                  : parameter.label}
              </Label>
              <Input
                id={parameter.id}
                type="number"
                defaultValue={parameter.defaultValue}
                step={"step" in parameter ? parameter.step : undefined}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <Button className="w-full bg-[#0D5C63] hover:bg-[#0b4f55]">
          Run Simulation
        </Button>
        <Button variant="secondary" className="w-full">
          Reset Parameters
        </Button>
      </div>
    </aside>
  );
}

