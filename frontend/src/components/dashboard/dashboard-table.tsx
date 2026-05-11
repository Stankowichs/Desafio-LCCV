import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const simulationRows = [
  {
    point: "N-001",
    temperature: "20",
    pressure: "12.00",
    axialForce: "0",
    axialStress: "118.23",
    status: "OK",
  },
  {
    point: "N-002",
    temperature: "100",
    pressure: "12.00",
    axialForce: "500",
    axialStress: "154.67",
    status: "OK",
  },
  {
    point: "N-003",
    temperature: "200",
    pressure: "12.00",
    axialForce: "1000",
    axialStress: "203.44",
    status: "OK",
  },
  {
    point: "N-004",
    temperature: "300",
    pressure: "12.00",
    axialForce: "1500",
    axialStress: "249.81",
    status: "Caution",
  },
  {
    point: "N-005",
    temperature: "400",
    pressure: "12.00",
    axialForce: "1800",
    axialStress: "288.76",
    status: "OK",
  },
]

export function DashboardTable() {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-slate-800">
          Returned Data
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200 bg-slate-50 hover:bg-slate-50">
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Point
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Temperature (C)
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Pressure (MPa)
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Axial Force (kN)
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Axial Stress (MPa)
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {simulationRows.map((row) => (
              <TableRow key={row.point} className="border-slate-100">
                <TableCell className="font-medium text-slate-800">
                  {row.point}
                </TableCell>
                <TableCell className="text-slate-600">{row.temperature}</TableCell>
                <TableCell className="text-slate-600">{row.pressure}</TableCell>
                <TableCell className="text-slate-600">{row.axialForce}</TableCell>
                <TableCell className="text-slate-600">{row.axialStress}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      row.status === "OK"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-amber-200 bg-amber-50 text-amber-700"
                    }
                  >
                    {row.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
