import type { QueryMode, SavedSimulationResult, SimulationModuleKey } from "@/lib/simulation";

export type ChartAxisKey =
  | "temperature"
  | "pressure"
  | "t_operational"
  | "p_operational"
  | "feed_in"
  | "u_lateral"
  | "bending_moment__kNm"
  | "compressive_strain__%"
  | "compressive_stress__MPa"
  | "effective_axial_force__kN"
  | "lateral_displacement__m"
  | "tensile_strain__%"
  | "tensile_stress__MPa"
  | "max_delta_tension_cycle_3__MPa"
  | "max_tension__MPa";

export type ChartAxisOption = {
  key: ChartAxisKey;
  label: string;
  unit: string;
  description: string;
};

export type ChartSeriesOption = {
  key: ChartAxisKey | "run";
  label: string;
  description: string;
};

export type ModuleChartConfig = {
  title: string;
  description: string;
  xAxisOptions: ChartAxisOption[];
  yAxisOptions: ChartAxisOption[];
  seriesOptions: ChartSeriesOption[];
  defaults: Record<QueryMode, {
    xAxis: ChartAxisKey;
    yAxis: ChartAxisKey;
    seriesBy: ChartSeriesOption["key"];
  }>;
};

export type LineChartPoint = {
  x: number | string;
  run: string;
  createdAt: string;
  [series: string]: number | string | null;
};

export type LineChartModel = {
  title: string;
  subtitle: string;
  emptyMessage: string;
  xAxis: ChartAxisOption;
  yAxis: ChartAxisOption;
  seriesKeys: string[];
  data: LineChartPoint[];
};

export type BarChartModel = {
  title: string;
  subtitle: string;
  emptyMessage: string;
  data: Array<{
    output: string;
    value: number;
    unit: string;
  }>;
};

type TableRowData = Record<string, unknown>;
type MeshAxes = {
  x: ChartAxisKey;
  y: ChartAxisKey;
};
type MeshData = {
  x: unknown[][];
  y: unknown[][];
  z: unknown[][];
};

const bucklingOutputs: ChartAxisOption[] = [
  {
    key: "bending_moment__kNm",
    label: "Bending moment",
    unit: "kNm",
    description: "Momento fletor calculado para a condicao simulada.",
  },
  {
    key: "compressive_strain__%",
    label: "Compressive strain",
    unit: "%",
    description: "Deformacao compressiva resultante.",
  },
  {
    key: "compressive_stress__MPa",
    label: "Compressive stress",
    unit: "MPa",
    description: "Tensao compressiva resultante.",
  },
  {
    key: "effective_axial_force__kN",
    label: "Effective axial force",
    unit: "kN",
    description: "Forca axial efetiva calculada pela simulacao.",
  },
  {
    key: "lateral_displacement__m",
    label: "Lateral displacement",
    unit: "m",
    description: "Deslocamento lateral resultante.",
  },
  {
    key: "tensile_strain__%",
    label: "Tensile strain",
    unit: "%",
    description: "Deformacao trativa resultante.",
  },
  {
    key: "tensile_stress__MPa",
    label: "Tensile stress",
    unit: "MPa",
    description: "Tensao trativa resultante.",
  },
];

const plotDataMeshAxes = {
  "thermo-buckling": {
    x: "temperature",
    y: "pressure",
  },
  "thermo-fatigue": {
    x: "t_operational",
    y: "p_operational",
  },
  buckling: {
    x: "feed_in",
    y: "u_lateral",
  },
} as const satisfies Record<SimulationModuleKey, MeshAxes>;

export const chartConfig = {
  "thermo-buckling": {
    title: "Thermo Buckling",
    description: "Analisa respostas estruturais variando temperatura e pressao.",
    xAxisOptions: [
      {
        key: "temperature",
        label: "Temperature",
        unit: "C",
        description: "Temperatura operacional usada como parametro de entrada.",
      },
      {
        key: "pressure",
        label: "Pressure",
        unit: "MPa",
        description: "Pressao operacional usada como parametro de entrada.",
      },
    ],
    yAxisOptions: bucklingOutputs,
    seriesOptions: [
      {
        key: "pressure",
        label: "Pressure",
        description: "Cada linha representa uma pressao fixa.",
      },
      {
        key: "temperature",
        label: "Temperature",
        description: "Cada linha representa uma temperatura fixa.",
      },
      {
        key: "run",
        label: "Saved run",
        description: "Cada linha representa uma chamada salva no historico.",
      },
    ],
    defaults: {
      Table: {
        xAxis: "temperature",
        yAxis: "effective_axial_force__kN",
        seriesBy: "run",
      },
      "Plot Data": {
        xAxis: "temperature",
        yAxis: "effective_axial_force__kN",
        seriesBy: "pressure",
      },
    },
  },
  "thermo-fatigue": {
    title: "Thermo Fatigue",
    description: "Analisa respostas de fadiga variando temperatura e pressao operacionais.",
    xAxisOptions: [
      {
        key: "t_operational",
        label: "Operational temperature",
        unit: "C",
        description: "Temperatura operacional usada como parametro de entrada.",
      },
      {
        key: "p_operational",
        label: "Operational pressure",
        unit: "MPa",
        description: "Pressao operacional usada como parametro de entrada.",
      },
    ],
    yAxisOptions: [
      {
        key: "max_delta_tension_cycle_3__MPa",
        label: "Max delta tension cycle 3",
        unit: "MPa",
        description: "Maior variacao de tensao no ciclo 3.",
      },
      {
        key: "max_tension__MPa",
        label: "Max tension",
        unit: "MPa",
        description: "Maior tensao calculada para a condicao simulada.",
      },
    ],
    seriesOptions: [
      {
        key: "p_operational",
        label: "Operational pressure",
        description: "Cada linha representa uma pressao operacional fixa.",
      },
      {
        key: "t_operational",
        label: "Operational temperature",
        description: "Cada linha representa uma temperatura operacional fixa.",
      },
      {
        key: "run",
        label: "Saved run",
        description: "Cada linha representa uma chamada salva no historico.",
      },
    ],
    defaults: {
      Table: {
        xAxis: "t_operational",
        yAxis: "max_tension__MPa",
        seriesBy: "run",
      },
      "Plot Data": {
        xAxis: "t_operational",
        yAxis: "max_tension__MPa",
        seriesBy: "p_operational",
      },
    },
  },
  buckling: {
    title: "Buckling",
    description: "Analisa respostas estruturais variando deslocamento lateral e feed-in.",
    xAxisOptions: [
      {
        key: "feed_in",
        label: "Feed-in",
        unit: "m",
        description: "Feed-in usado como parametro de entrada.",
      },
      {
        key: "u_lateral",
        label: "Lateral displacement input",
        unit: "m",
        description: "Deslocamento lateral imposto como parametro de entrada.",
      },
    ],
    yAxisOptions: bucklingOutputs,
    seriesOptions: [
      {
        key: "u_lateral",
        label: "Lateral displacement input",
        description: "Cada linha representa um deslocamento lateral fixo.",
      },
      {
        key: "feed_in",
        label: "Feed-in",
        description: "Cada linha representa um feed-in fixo.",
      },
      {
        key: "run",
        label: "Saved run",
        description: "Cada linha representa uma chamada salva no historico.",
      },
    ],
    defaults: {
      Table: {
        xAxis: "feed_in",
        yAxis: "compressive_stress__MPa",
        seriesBy: "run",
      },
      "Plot Data": {
        xAxis: "feed_in",
        yAxis: "compressive_stress__MPa",
        seriesBy: "u_lateral",
      },
    },
  },
} as const satisfies Record<SimulationModuleKey, ModuleChartConfig>;

export function getChartConfig(module: SimulationModuleKey) {
  return chartConfig[module];
}

export function getDefaultChartSelection(module: SimulationModuleKey, queryMode: QueryMode) {
  return chartConfig[module].defaults[queryMode];
}

export function buildLineChartModel( results: SavedSimulationResult[], module: SimulationModuleKey, queryMode: QueryMode, ): LineChartModel {
  const config = getChartConfig(module);
  const selection = getDefaultChartSelection(module, queryMode);
  const xAxis = getAxisOption(config.xAxisOptions, selection.xAxis);
  const yAxis = getAxisOption(config.yAxisOptions, selection.yAxis);
  const seriesBy = selection.seriesBy;
  const pointsByX = new Map<string, LineChartPoint>();
  const seriesKeys = new Set<string>();
  const chronologicalResults = [...results].reverse();

  chronologicalResults.forEach((result, resultIndex) => {
    const runLabel = `Run ${resultIndex + 1}`;
    const meshRows = queryMode === "Plot Data"
      ? getPlotDataRows(result.data, module, xAxis.key, yAxis.key, selection.seriesBy, runLabel)
      : [];
    const rows = getRows(result.data);

    if (meshRows.length > 0) {
      meshRows.forEach(({ x, y, seriesKey }) => {
        const pointKey = `${x}`;
        const currentPoint = pointsByX.get(pointKey) ?? {
          x,
          run: runLabel,
          createdAt: new Date(result.createdAt).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        };

        currentPoint[seriesKey] = y;
        pointsByX.set(pointKey, currentPoint);
        seriesKeys.add(seriesKey);
      });
      return;
    }

    rows.forEach((row, rowIndex) => {
      const x = getNumericValue(row[xAxis.key]) ?? getPayloadNumber(result.payload, xAxis.key);
      const y = getNumericValue(row[yAxis.key]);

      if (x === null || y === null) {
        return;
      }

      const seriesKey = getSeriesKey({
        row,
        result,
        seriesBy,
        queryMode,
        runLabel,
      });
      const pointKey = `${x}-${rowIndex}`;
      const currentPoint = pointsByX.get(pointKey) ?? {
        x,
        run: runLabel,
        createdAt: new Date(result.createdAt).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };

      currentPoint[seriesKey] = y;
      pointsByX.set(pointKey, currentPoint);
      seriesKeys.add(seriesKey);
    });
  });

  const seriesList = Array.from(seriesKeys);

  return {
    title: `${yAxis.label} vs ${xAxis.label}`,
    subtitle: `${config.title} - ${getQuestionText(xAxis, yAxis, selection.seriesBy)}`,
    emptyMessage: `Run simulations for ${config.title} - ${queryMode} to plot ${yAxis.label} against ${xAxis.label}.`,
    xAxis,
    yAxis,
    seriesKeys: seriesList,
    data: Array.from(pointsByX.values()).sort((a, b) => Number(a.x) - Number(b.x)),
  };
}

export function buildBarChartModel(
  results: SavedSimulationResult[],
  module: SimulationModuleKey,
  queryMode: QueryMode,
): BarChartModel {
  const config = getChartConfig(module);
  const latestResult = results[0];

  if (!latestResult) {
    return {
      title: "Latest outputs",
      subtitle: `${config.title} - ${queryMode}`,
      emptyMessage: "Run a simulation to compare the latest numeric outputs.",
      data: [],
    };
  }

  const rows = getRows(latestResult.data);
  const values = config.yAxisOptions.flatMap((axis) => {
    const mesh = getOutputMesh(latestResult.data, axis.key);

    if (mesh) {
      const meshValues = flattenMatrix(mesh.z)
        .map(getNumericValue)
        .filter((value): value is number => value !== null);

      if (meshValues.length === 0) {
        return [];
      }

      return [{
        output: axis.label,
        value: Math.max(...meshValues.map((value) => Math.abs(value))),
        unit: axis.unit,
      }];
    }

    const numericValues = rows
      .map((row) => getNumericValue(row[axis.key]))
      .filter((value): value is number => value !== null);

    if (numericValues.length === 0) {
      return [];
    }

    return [{
      output: axis.label,
      value: Math.max(...numericValues.map((value) => Math.abs(value))),
      unit: axis.unit,
    }];
  });

  return {
    title: "Latest outputs",
    subtitle: `${config.title} - latest saved run`,
    emptyMessage: "The latest API response does not include numeric outputs supported by the chart config.",
    data: values,
  };
}

function getPlotDataRows(
  data: unknown,
  module: SimulationModuleKey,
  xAxisKey: ChartAxisKey,
  yAxisKey: ChartAxisKey,
  seriesBy: ChartSeriesOption["key"],
  runLabel: string,
) {
  const mesh = getOutputMesh(data, yAxisKey);

  if (!mesh) {
    return [];
  }

  const meshAxes = plotDataMeshAxes[module];
  const rows: Array<{ x: number; y: number; seriesKey: string }> = [];

  mesh.z.forEach((zRow, rowIndex) => {
    zRow.forEach((zValue, columnIndex) => {
      const outputValue = getNumericValue(zValue);
      const meshXValue = getNumericValue(mesh.x[rowIndex]?.[columnIndex]);
      const meshYValue = getNumericValue(mesh.y[rowIndex]?.[columnIndex]);

      if (outputValue === null || meshXValue === null || meshYValue === null) {
        return;
      }

      const xValue = xAxisKey === meshAxes.y ? meshYValue : meshXValue;
      const seriesValue = seriesBy === meshAxes.x
        ? meshXValue
        : seriesBy === meshAxes.y
          ? meshYValue
          : null;
      const seriesKey = seriesBy === "run" || seriesValue === null
        ? runLabel
        : `${seriesBy}: ${seriesValue}`;

      rows.push({
        x: xValue,
        y: outputValue,
        seriesKey,
      });
    });
  });

  return rows;
}

function getOutputMesh(data: unknown, outputKey: ChartAxisKey): MeshData | null {
  if (!isRecord(data)) {
    return null;
  }

  const outputData = data[outputKey];

  if (!isRecord(outputData)) {
    return null;
  }

  const { x, y, z } = outputData;

  if (!isMatrix(x) || !isMatrix(y) || !isMatrix(z)) {
    return null;
  }

  return { x, y, z };
}

function isMatrix(value: unknown): value is unknown[][] {
  return Array.isArray(value) && value.every(Array.isArray);
}

function flattenMatrix(matrix: unknown[][]) {
  return matrix.flatMap((row) => row);
}

function getAxisOption(options: readonly ChartAxisOption[], key: ChartAxisKey) {
  return options.find((option) => option.key === key) ?? options[0];
}

function getQuestionText(
  xAxis: ChartAxisOption,
  yAxis: ChartAxisOption,
  seriesBy: ChartSeriesOption["key"],
) {
  const seriesText = seriesBy === "run"
    ? "saved calls connected as chart points"
    : `${seriesBy} represented by series`;

  return `shows how ${yAxis.label} changes as ${xAxis.label} varies, with ${seriesText}.`;
}

function getSeriesKey({
  row,
  result,
  seriesBy,
  queryMode,
  runLabel,
}: {
  row: TableRowData;
  result: SavedSimulationResult;
  seriesBy: ChartSeriesOption["key"];
  queryMode: QueryMode;
  runLabel: string;
}) {
  if (queryMode === "Table" || seriesBy === "run") {
    return queryMode === "Table" ? "Saved calls" : runLabel;
  }

  const seriesValue = getNumericValue(row[seriesBy]) ?? getPayloadNumber(result.payload, seriesBy);

  return seriesValue === null ? runLabel : `${seriesBy}: ${seriesValue}`;
}

function getRows(data: unknown): TableRowData[] {
  if (Array.isArray(data)) {
    return data.map((item, index) => normalizeRow(item, index));
  }

  if (isRecord(data)) {
    const entries = Object.entries(data);
    const arrayEntries = entries.filter((entry): entry is [string, unknown[]] => Array.isArray(entry[1]));

    if (arrayEntries.length === entries.length && arrayEntries.length > 0) {
      const rowCount = Math.max(...arrayEntries.map(([, values]) => values.length));

      return Array.from({ length: rowCount }, (_, index) => {
        const row: TableRowData = {};

        for (const [key, values] of arrayEntries) {
          row[key] = values[index];
        }

        return row;
      });
    }

    const firstArray = arrayEntries[0]?.[1];

    if (firstArray) {
      return firstArray.map((item, index) => normalizeRow(item, index));
    }

    return [data];
  }

  return [];
}

function normalizeRow(item: unknown, index: number): TableRowData {
  if (isRecord(item)) {
    return item;
  }

  return {
    index: index + 1,
    value: item,
  };
}

function isRecord(value: unknown): value is TableRowData {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getNumericValue(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsedValue = Number(value);

    return Number.isFinite(parsedValue) ? parsedValue : null;
  }

  return null;
}

function getPayloadNumber(payload: unknown, key: string): number | null {
  if (!isRecord(payload)) {
    return null;
  }

  const entityValue = getNestedNumber(payload, ["entity", key]);
  const tablePairValue = getNestedNumber(payload, ["xy_pairs", 0, key]);

  return entityValue ?? tablePairValue;
}

function getNestedNumber(value: unknown, path: Array<string | number>) {
  let currentValue = value;

  for (const pathItem of path) {
    if (Array.isArray(currentValue) && typeof pathItem === "number") {
      currentValue = currentValue[pathItem];
      continue;
    }

    if (isRecord(currentValue) && typeof pathItem === "string") {
      currentValue = currentValue[pathItem];
      continue;
    }

    return null;
  }

  return getNumericValue(currentValue);
}
