import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type SimulationResult = {
  module: string;
  queryMode: string;
  payload: unknown;
  data: unknown;
};

type DashboardTableProps = {
  result: SimulationResult | null;
};

type TableRowData = Record<string, unknown>;

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

function formatValue(value: unknown) {
  if (typeof value === "number") {
    return Number.isInteger(value) ? String(value) : value.toFixed(4);
  }

  if (typeof value === "string") {
    return value;
  }

  if (value === null || value === undefined) {
    return "-";
  }

  return JSON.stringify(value);
}

export function DashboardTable({ result }: DashboardTableProps) {
  const rows = result ? getRows(result.data) : [];
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-slate-800">
          Returned Data
        </CardTitle>
      </CardHeader>

      <CardContent>
        {result ? (
          <div className="space-y-4">
            <p className="text-sm text-slate-500">
              {result.module} - {result.queryMode}
            </p>

            {rows.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200 bg-slate-50 hover:bg-slate-50">
                      {columns.map((column) => (
                        <TableHead key={column} className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {column}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={index} className="border-slate-100">
                        {columns.map((column) => (
                          <TableCell key={column} className="max-w-[280px] truncate text-slate-600">
                            {formatValue(row[column])}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-xs text-slate-100">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            )}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            Run a simulation to show backend results here.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
