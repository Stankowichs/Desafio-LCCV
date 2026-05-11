import { getBucklingPlotData, getBucklingTable, getThermoBucklingPlotData, getThermoBucklingTable, getThermoFatiguePlotData, 
  getThermoFatigueTable } from "@/lib/api";
import { clonePayloadDefault } from "@/lib/payloads";

export type SimulationModuleKey = "thermo-buckling" | "thermo-fatigue" | "buckling";
export type QueryMode = "Table" | "Plot Data";
export type FieldValues = Record<string, number>;

export type SimulationFormValues = {
  module: SimulationModuleKey;
  queryMode: QueryMode;
  values: FieldValues;
};

export type SimulationResult = {
  module: SimulationModuleKey;
  queryMode: QueryMode;
  payload: unknown;
  data: unknown;
};

export type SavedSimulationResult = SimulationResult & {
  id: string;
  createdAt: string;
};

const entityFields = {
  "thermo-buckling": [
    "di",
    "t",
    "t_cra",
    "w_sub_empty",
    "rho_content",
    "mu_lateral",
    "mu_axial",
    "vas",
    "h_sleeper",
    "mu_sleeper",
    "de_rating",
  ],
  "thermo-fatigue": [
    "di",
    "t",
    "t_cra",
    "w_sub_empty",
    "rho_content",
    "mu_lateral",
    "mu_axial",
    "vas",
    "h_sleeper",
    "mu_sleeper",
    "t_design",
    "p_design",
  ],
  buckling: [
    "di",
    "t",
    "w_sub",
    "t_cra",
    "temperature",
    "h_sleeper",
    "u_sleeper",
  ],
} as const satisfies Record<SimulationModuleKey, readonly string[]>;

export async function runSimulation({ module, queryMode, values }: SimulationFormValues): Promise<SimulationResult> {
  const payload = buildPayload(module, queryMode, values);
  const data = await postSimulation(module, queryMode, payload);

  return {
    module,
    queryMode,
    payload,
    data,
  };
}

function buildPayload(module: SimulationModuleKey, queryMode: QueryMode, values: FieldValues) {
  if (module === "thermo-buckling") {
    if (queryMode === "Table") {
      const payload = clonePayloadDefault("thermoBucklingTable");
      applyEntityValues(payload.entity, module, values);
      payload.xy_pairs = [{ temperature: values.temperature, pressure: values.pressure }];
      return payload;
    }

    const payload = clonePayloadDefault("thermoBucklingPlotData");
    applyEntityValues(payload.entity, module, values);
    payload.temperature_range = {
      start: values.temperature_range_start,
      stop: values.temperature_range_stop,
      step: values.temperature_range_step,
    };
    payload.pressure_range = {
      start: values.pressure_range_start,
      stop: values.pressure_range_stop,
      step: values.pressure_range_step,
    };
    return payload;
  }

  if (module === "thermo-fatigue") {
    if (queryMode === "Table") {
      const payload = clonePayloadDefault("thermoFatigueTable");
      applyEntityValues(payload.entity, module, values);
      payload.xy_pairs = [{ t_operational: values.t_operational, p_operational: values.p_operational }];
      return payload;
    }

    const payload = clonePayloadDefault("thermoFatiguePlotData");
    applyEntityValues(payload.entity, module, values);
    payload.t_operational_range = {
      start: values.t_operational_range_start,
      stop: values.t_operational_range_stop,
      step: values.t_operational_range_step,
    };
    payload.p_operational_range = {
      start: values.p_operational_range_start,
      stop: values.p_operational_range_stop,
      step: values.p_operational_range_step,
    };
    return payload;
  }

  if (queryMode === "Table") {
    const payload = clonePayloadDefault("bucklingTable");
    applyEntityValues(payload.entity, module, values);
    payload.xy_pairs = [{ u_lateral: values.u_lateral, feed_in: values.feed_in }];
    return payload;
  }

  const payload = clonePayloadDefault("bucklingPlotData");
  applyEntityValues(payload.entity, module, values);
  payload.u_lateral_range = {
    start: values.u_lateral_range_start,
    stop: values.u_lateral_range_stop,
    step: values.u_lateral_range_step,
  };
  payload.feed_in_range = {
    start: values.feed_in_range_start,
    stop: values.feed_in_range_stop,
    step: values.feed_in_range_step,
  };
  return payload;
}

function applyEntityValues(entity: Record<string, number>, module: SimulationModuleKey, values: FieldValues) {
  for (const field of entityFields[module]) {
    entity[field] = values[field];
  }
}

async function postSimulation(
  module: SimulationModuleKey,
  queryMode: QueryMode,
  payload: ReturnType<typeof buildPayload>,
) {
  if (module === "thermo-buckling") {
    return queryMode === "Table"
      ? getThermoBucklingTable(payload as ReturnType<typeof clonePayloadDefault<"thermoBucklingTable">>)
      : getThermoBucklingPlotData(payload as ReturnType<typeof clonePayloadDefault<"thermoBucklingPlotData">>);
  }

  if (module === "thermo-fatigue") {
    return queryMode === "Table"
      ? getThermoFatigueTable(payload as ReturnType<typeof clonePayloadDefault<"thermoFatigueTable">>)
      : getThermoFatiguePlotData(payload as ReturnType<typeof clonePayloadDefault<"thermoFatiguePlotData">>);
  }

  return queryMode === "Table"
    ? getBucklingTable(payload as ReturnType<typeof clonePayloadDefault<"bucklingTable">>)
    : getBucklingPlotData(payload as ReturnType<typeof clonePayloadDefault<"bucklingPlotData">>);
}
