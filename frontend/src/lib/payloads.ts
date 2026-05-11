const bucklingOutputs = [
  "bending_moment__kNm",
  "compressive_strain__%",
  "compressive_stress__MPa",
  "effective_axial_force__kN",
  "lateral_displacement__m",
  "tensile_strain__%",
  "tensile_stress__MPa",
] as const;

const thermoFatigueOutputs = [
  "max_delta_tension_cycle_3__MPa",
  "max_tension__MPa",
] as const;

export const payloadDefault = {
  bucklingMultiplePoints: {
    di: 139.7,
    t: 12.7,
    w_sub: 0.4,
    t_cra: 0,
    temperature: 40,
    h_sleeper: 0,
    u_sleeper: 0,
    u_lateral_values: [0.5],
    feed_in_values: [0.1],
  },

  bucklingTable: {
    entity: {
      di: 139.7,
      t: 12.7,
      w_sub: 0.4,
      t_cra: 0,
      temperature: 40,
      h_sleeper: 0,
      u_sleeper: 0,
    },
    xy_pairs: [
      {
        u_lateral: 0.5,
        feed_in: 0.1,
      },
    ],
  },

  bucklingPlotData: {
    entity: {
      di: 139.7,
      t: 12.7,
      w_sub: 0.4,
      t_cra: 0,
      temperature: 40,
      h_sleeper: 0,
      u_sleeper: 0,
    },
    feed_in_range: {
      start: 0.1,
      stop: 4,
      step: 0.1,
    },
    u_lateral_range: {
      start: 0.5,
      stop: 2,
      step: 0.1,
    },
    outputs: [...bucklingOutputs],
  },

  thermoBucklingTable: {
    entity: {
      di: 139.7,
      t: 12.7,
      t_cra: 0,
      w_sub_empty: 0.1,
      rho_content: 30,
      mu_lateral: 0.5,
      mu_axial: 0.2,
      vas: 1000,
      h_sleeper: 0,
      mu_sleeper: 0,
      de_rating: 50,
    },
    xy_pairs: [
      {
        temperature: 20,
        pressure: 20,
      },
    ],
  },

  thermoBucklingPlotData: {
    entity: {
      di: 139.7,
      t: 12.7,
      t_cra: 0,
      w_sub_empty: 0.1,
      rho_content: 30,
      mu_lateral: 0.5,
      mu_axial: 0.2,
      vas: 1000,
      h_sleeper: 0,
      mu_sleeper: 0,
      de_rating: 50,
    },
    temperature_range: {
      start: 30,
      stop: 90,
      step: 10,
    },
    pressure_range: {
      start: 30,
      stop: 60,
      step: 10,
    },
    outputs: [...bucklingOutputs],
  },

  thermoFatigueTable: {
    entity: {
      di: 139.7,
      t: 12.7,
      t_cra: 0,
      w_sub_empty: 0.1,
      rho_content: 30,
      mu_lateral: 0.5,
      mu_axial: 0.2,
      vas: 1000,
      h_sleeper: 0,
      mu_sleeper: 0,
      t_design: 50,
      p_design: 22,
    },
    xy_pairs: [
      {
        t_operational: 20,
        p_operational: 20,
      },
    ],
  },

  thermoFatiguePlotData: {
    entity: {
      di: 139.7,
      t: 12.7,
      t_cra: 0,
      w_sub_empty: 0.1,
      rho_content: 30,
      mu_lateral: 0.5,
      mu_axial: 0.2,
      vas: 1000,
      h_sleeper: 0,
      mu_sleeper: 0,
      t_design: 50,
      p_design: 22,
    },
    t_operational_range: {
      start: 30,
      stop: 90,
      step: 10,
    },
    p_operational_range: {
      start: 30,
      stop: 60,
      step: 10,
    },
    outputs: [...thermoFatigueOutputs],
  },
} as const;

export type PayloadKey = keyof typeof payloadDefault;
export type PayloadDefault = typeof payloadDefault;
type EditablePayload<TPayload> = TPayload extends number
  ? number
  : TPayload extends string
    ? string
    : TPayload extends boolean
      ? boolean
      : TPayload extends readonly (infer TItem)[]
        ? EditablePayload<TItem>[]
        : TPayload extends object
          ? { -readonly [TKey in keyof TPayload]: EditablePayload<TPayload[TKey]> }
          : TPayload;

export type PayloadByKey<TPayloadKey extends PayloadKey> =
  EditablePayload<PayloadDefault[TPayloadKey]>;

export const payloadLabel = {
  bucklingMultiplePoints: "Buckling - Multiple Points",
  bucklingTable: "Buckling - Table",
  bucklingPlotData: "Buckling - Plot Data",
  thermoBucklingTable: "Thermo Buckling - Table",
  thermoBucklingPlotData: "Thermo Buckling - Plot Data",
  thermoFatigueTable: "Thermo Fatigue - Table",
  thermoFatiguePlotData: "Thermo Fatigue - Plot Data",
} satisfies Record<PayloadKey, string>;

export function getPayloadDefault<TPayloadKey extends PayloadKey>(
  payloadKey: TPayloadKey,
): PayloadByKey<TPayloadKey> {
  return clonePayload(payloadDefault[payloadKey]) as PayloadByKey<TPayloadKey>;
}

export function clonePayloadDefault<TPayloadKey extends PayloadKey>(
  payloadKey: TPayloadKey,
): PayloadByKey<TPayloadKey> {
  return getPayloadDefault(payloadKey);
}

function clonePayload<TPayload>(payload: TPayload): TPayload {
  return JSON.parse(JSON.stringify(payload)) as TPayload;
}
