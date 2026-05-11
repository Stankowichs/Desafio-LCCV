"use client"

import { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { FieldValues, QueryMode, SimulationFormValues, SimulationModuleKey } from "@/lib/simulation";

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

const moduleByKey = Object.fromEntries(
  simulationModules.map((module) => [module.key, module]),
) as Record<SimulationModuleKey, (typeof simulationModules)[number]>;

const queryModeFields = {
  "thermo-buckling": {
    Table: [
      { id: "temperature", label: "temperature", unit: "C", defaultValue: 20 },
      { id: "pressure", label: "pressure", unit: "MPa", defaultValue: 20 },
    ],
    "Plot Data": [
      { id: "temperature_range_start", label: "temperature start", unit: "C", defaultValue: 30 },
      { id: "temperature_range_stop", label: "temperature stop", unit: "C", defaultValue: 90 },
      { id: "temperature_range_step", label: "temperature step", unit: "C", defaultValue: 10 },
      { id: "pressure_range_start", label: "pressure start", unit: "MPa", defaultValue: 30 },
      { id: "pressure_range_stop", label: "pressure stop", unit: "MPa", defaultValue: 60 },
      { id: "pressure_range_step", label: "pressure step", unit: "MPa", defaultValue: 10 },
    ],
  },
  "thermo-fatigue": {
    Table: [
      { id: "t_operational", label: "t_operational", unit: "C", defaultValue: 20 },
      { id: "p_operational", label: "p_operational", unit: "MPa", defaultValue: 20 },
    ],
    "Plot Data": [
      { id: "t_operational_range_start", label: "t_operational start", unit: "C", defaultValue: 30 },
      { id: "t_operational_range_stop", label: "t_operational stop", unit: "C", defaultValue: 90 },
      { id: "t_operational_range_step", label: "t_operational step", unit: "C", defaultValue: 10 },
      { id: "p_operational_range_start", label: "p_operational start", unit: "MPa", defaultValue: 30 },
      { id: "p_operational_range_stop", label: "p_operational stop", unit: "MPa", defaultValue: 60 },
      { id: "p_operational_range_step", label: "p_operational step", unit: "MPa", defaultValue: 10 },
    ],
  },
  buckling: {
    Table: [
      { id: "u_lateral", label: "u_lateral", unit: "m", defaultValue: 0.5, step: 0.1 },
      { id: "feed_in", label: "feed_in", unit: "m", defaultValue: 0.1, step: 0.1 },
    ],
    "Plot Data": [
      { id: "u_lateral_range_start", label: "u_lateral start", unit: "m", defaultValue: 0.5, step: 0.1 },
      { id: "u_lateral_range_stop", label: "u_lateral stop", unit: "m", defaultValue: 2, step: 0.1 },
      { id: "u_lateral_range_step", label: "u_lateral step", unit: "m", defaultValue: 0.1, step: 0.1 },
      { id: "feed_in_range_start", label: "feed_in start", unit: "m", defaultValue: 0.1, step: 0.1 },
      { id: "feed_in_range_stop", label: "feed_in stop", unit: "m", defaultValue: 4, step: 0.1 },
      { id: "feed_in_range_step", label: "feed_in step", unit: "m", defaultValue: 0.1, step: 0.1 },
    ],
  },
} as const satisfies Record<SimulationModuleKey, Record<QueryMode, readonly ParameterField[]>>;

type ParameterField = {
  id: string;
  label: string;
  unit?: string;
  defaultValue: number;
  step?: number;
};

const queryModes = ["Table", "Plot Data"] as const;

function getInitialValues(moduleKey: SimulationModuleKey, queryMode: QueryMode): FieldValues {
  const values: FieldValues = {};

  for (const parameter of moduleByKey[moduleKey].parameters) {
    values[parameter.id] = parameter.defaultValue;
  }

  for (const parameter of queryModeFields[moduleKey][queryMode]) {
    values[parameter.id] = parameter.defaultValue;
  }

  return values;
}

type DashboardSidebarProps = {
  isLoading: boolean;
  errorMessage: string | null;
  selectedModule: SimulationModuleKey;
  selectedQueryMode: QueryMode;
  onModuleChange: (module: SimulationModuleKey) => void;
  onQueryModeChange: (queryMode: QueryMode) => void;
  onRunSimulation: (formValues: SimulationFormValues) => void;
};

export function DashboardSidebar({
  isLoading,
  errorMessage,
  selectedModule,
  selectedQueryMode,
  onModuleChange,
  onQueryModeChange,
  onRunSimulation,
}: DashboardSidebarProps) {
  const [fieldValues, setFieldValues] = useState<FieldValues>(() => getInitialValues("thermo-buckling", "Table"));
  const selectedModuleConfig = moduleByKey[selectedModule];
  const selectedEntityFields = selectedModuleConfig.parameters as readonly ParameterField[];
  const selectedQueryFields = queryModeFields[selectedModule][selectedQueryMode] as readonly ParameterField[];


  const handleModule = (module: SimulationModuleKey) => {
    onModuleChange(module)
    setFieldValues(getInitialValues(module, selectedQueryMode))
  }

  const handleQueryMode = (queryMode: QueryMode) => {
    onQueryModeChange(queryMode)
    setFieldValues(getInitialValues(selectedModule, queryMode))
  }

  const handleFieldValue = (field: string, value: string) => {
    setFieldValues((currentValues) => ({
      ...currentValues,
      [field]: Number(value),
    }));
  }

  const handleRunSimulation = () => {
    onRunSimulation({
      module: selectedModule,
      queryMode: selectedQueryMode,
      values: fieldValues,
    });
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
          {queryModes.map((queryMode) => (
            <Button
              key={queryMode}
              variant={selectedQueryMode === queryMode ? undefined : "ghost"}
              className={selectedQueryMode === queryMode
                ? "justify-start bg-[#0D5C63] hover:bg-[#004F55]"
                : "justify-start"
              }
              onClick={() => handleQueryMode(queryMode)}
            >
              {queryMode}
            </Button>
          ))}
        </div>
      </div>

      <Separator className="my-5" />

      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase text-slate-400">
          Entity Parameters
        </p>

        <div className="grid grid-cols-2 gap-3">
          {selectedEntityFields.map((parameter) => (
            <div key={`${selectedModule}-${parameter.id}`} className="space-y-1">
              <Label htmlFor={parameter.id} className="text-xs">
                {"unit" in parameter && parameter.unit
                  ? `${parameter.label} (${parameter.unit})`
                  : parameter.label}
              </Label>
              <Input
                id={parameter.id}
                type="number"
                value={fieldValues[parameter.id] ?? parameter.defaultValue}
                step={"step" in parameter ? parameter.step : undefined}
                onChange={(event) => handleFieldValue(parameter.id, event.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-5" />

      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase text-slate-400">
          {selectedQueryMode === "Table" ? "XY Pair" : "XY Ranges"}
        </p>

        <div className="grid grid-cols-2 gap-3">
          {selectedQueryFields.map((parameter) => (
            <div key={`${selectedModule}-${selectedQueryMode}-${parameter.id}`} className="space-y-1">
              <Label htmlFor={parameter.id} className="text-xs">
                {parameter.unit ? `${parameter.label} (${parameter.unit})` : parameter.label}
              </Label>
              <Input
                id={parameter.id}
                type="number"
                value={fieldValues[parameter.id] ?? parameter.defaultValue}
                step={"step" in parameter ? parameter.step : undefined}
                onChange={(event) => handleFieldValue(parameter.id, event.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <Button
          className="w-full bg-[#0D5C63] hover:bg-[#0b4f55]"
          disabled={isLoading}
          onClick={handleRunSimulation}
        >
          {isLoading ? "Running..." : "Run Simulation"}
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => setFieldValues(getInitialValues(selectedModule, selectedQueryMode))}
        >
          Reset Parameters
        </Button>
        {errorMessage ? (
          <p className="text-xs font-medium text-red-600">
            {errorMessage}
          </p>
        ) : null}
      </div>
    </aside>
  );
}
