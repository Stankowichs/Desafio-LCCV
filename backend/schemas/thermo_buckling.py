from pydantic import BaseModel, Field

#Thermo buckling table data
class ThermoBucklingEntity(BaseModel):
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
    de_rating: int = Field(..., ge=50, le=90)

class ThermoBucklingPressurePair(BaseModel):
    temperature: int = Field(..., ge=20, le=90)
    pressure: int = Field(..., ge=20, le=62)

class ThermoBucklingTable(BaseModel):
    entity: ThermoBucklingEntity
    xy_pairs: list[ThermoBucklingPressurePair]




#Thermo buckling plot data
class TemperatureRange(BaseModel):
    start: float = Field(ge=20, le=90, default=30)
    stop: float = Field(ge=20, le=90, default=90)
    step: float = Field(..., gt=0)


class PressureRange(BaseModel):
    start: float = Field(ge=20, le=90, default=30)
    stop: float = Field(ge=20, le=90, default=60)
    step: float = Field(..., gt=0)


class ThermoBucklingPlotData(BaseModel):
    entity: ThermoBucklingEntity
    temperature_range: TemperatureRange
    pressure_range: PressureRange
    outputs: list[str] = [
        "bending_moment__kNm",
        "compressive_strain__%",
        "compressive_stress__MPa",
        "effective_axial_force__kN",
        "lateral_displacement__m",
        "tensile_strain__%",
        "tensile_stress__MPa",
    ]