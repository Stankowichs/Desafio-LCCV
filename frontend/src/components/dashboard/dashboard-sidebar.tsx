"use client"

import { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";


export function DashboardSidebar() {
  const [selectedModule, setSelectedModule] = useState('thermo-buckling');
  const [selectedQueryMode, setSelectedQueryMode] = useState('Table');


  const handleModule = (module: string) => {
    setSelectedModule(module)
  }

  const handleQueryMode = (module: string) => {
    setSelectedQueryMode(module)
  }

  return (
    <aside className="w-[280px] border-r border-slate-200 bg-white p-4">
      <div className="mb-6">
        <h2 className="text-sm font-bold uppercase text-slate-700">
          PipeAPI Dashboard
        </h2>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase text-slate-400">
          Simulation Modules
        </p>

        <Button 
            variant={selectedModule === "thermo-buckling" ? undefined : "ghost"}
            className={selectedModule === "thermo-buckling" 
              ? "w-full justify-start bg-[#0D5C63] hover:bg-[#004F55]" 
              : "w-full justify-start"
            } 
            onClick={() => handleModule('thermo-buckling')}
        >
          Thermo Buckling
        </Button>
        <Button 
            variant={selectedModule === "thermo-fatigue" ? undefined : "ghost"}
            className={selectedModule === "thermo-fatigue" 
              ? "w-full justify-start bg-[#0D5C63] hover:bg-[#004F55]" 
              : "w-full justify-start"
            } 
                onClick={() => handleModule('thermo-fatigue')}      
        >
          Thermo Fatigue
        </Button>
        <Button 
            variant={selectedModule === "buckling" ? undefined : "ghost"}
            className={selectedModule === "buckling" 
              ? "w-full justify-start bg-[#0D5C63] hover:bg-[#004F55]" 
              : "w-full justify-start"
            } 
                onClick={() => handleModule('buckling')} 
        >
          Buckling
        </Button>
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
          <div className="space-y-1">
            <Label htmlFor="di">di (mm)</Label>
            <Input id="di" defaultValue="139.7" />
          </div>
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

