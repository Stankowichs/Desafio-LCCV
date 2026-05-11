from pydantic import BaseModel, Field

#Thermo fatigue table data
class FatigueEntity(BaseModel):
    di: float = Field(..., ge=139.7, le=215.9)
    t: float = Field(..., ge=12.7, le=27)
    t_cra: float = Field(ge = 0, le= 3, default = 0)
    w_sub_empty: float = Field(..., ge= 0.1, le= 1.5)
    rho_content: int = Field(..., ge=30, le=1050)
    mu_lateral: float = Field(..., ge= 0.5, le= 1.5)
    mu_axial: float = Field(..., ge= 0.2, le= 0.81)
    vas: int = Field(..., ge=1000, le=2000)
    h_sleeper: float = Field(..., ge= 0, le= 1)
    mu_sleeper: float = Field(..., ge= 0, le= 0.3)
    t_design: float = Field(..., ge=50, le=90)
    p_design: float = Field(..., ge=22, le=62)

class TPOperationalPair(BaseModel):
    t_operational: float = Field(..., ge=20, le=90)
    p_operational: float = Field(..., ge=20, le=62)

class ThermoFatigueTable(BaseModel):
    entity: FatigueEntity
    xy_pairs: list[TPOperationalPair]


#Thermo fatigue plot data
class TemperatureRange(BaseModel):
    start: float = Field(ge=20, le=90, default=30)
    stop: float = Field(ge=20, le=90, default=90)
    step: float = Field(gt=0, default=10)


class PressureRange(BaseModel):
    start: float = Field(ge=20, le=90, default=30)
    stop: float = Field(ge=20, le=90, default=60)
    step: float = Field(gt=0, default=10)


class ThermoFatiguePlotData(BaseModel):
    entity: FatigueEntity
    t_operational_range: TemperatureRange
    p_operational_range: PressureRange
    outputs: list[str] = [
        "max_delta_tension_cycle_3__MPa",
        "max_tension__MPa",
    ]
