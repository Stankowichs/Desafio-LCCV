from pydantic import BaseModel, Field


#Buckling table data
class BucklingEntity(BaseModel):
    di: float = Field(..., ge=139.7, le=215.9)
    t: float = Field(..., ge=12.7)
    w_sub: float = Field(default=0.4)
    t_cra: float = Field(ge=0, le=3, default=0)
    temperature: float = Field(default=40, ge=40, le=110)
    h_sleeper: float = Field(default=0, ge=0, le=1)
    u_sleeper: float = Field(default=0, ge=0, le=0.3)


class ULateralFeedInPair(BaseModel):
    u_lateral: float = Field(..., ge=0.5, le=2.0)
    feed_in: float = Field(..., ge=0.1, le=4.0)


class BucklingTable(BaseModel):
    entity: BucklingEntity
    xy_pairs: list[ULateralFeedInPair]


#Buckling parameters data
class BucklingParameters(BaseModel):
    di: float = Field(..., ge=139.7, le=215.9)
    t: float = Field(..., ge=12.7)
    w_sub: float = Field(default=0.4)
    t_cra: float = Field(ge=0, le=3, default=0)
    temperature: float = Field(default=40, ge=40, le=110)
    h_sleeper: float = Field(default=0, ge=0, le=1)
    u_sleeper: float = Field(default=0, ge=0, le=0.3)

    u_lateral_values: list[float] = Field(default=[0.5])
    feed_in_values: list[float] = Field(default=[0.1])


#Buckling plot data
class Range(BaseModel):
    start: float
    stop: float
    step: float = Field(..., gt=0)


class BucklingPlotData(BaseModel):
    entity: BucklingEntity
    feed_in_range: Range
    u_lateral_range: Range
    outputs: list[str] = [
        "bending_moment__kNm",
        "compressive_strain__%",
        "compressive_stress__MPa",
        "effective_axial_force__kN",
        "lateral_displacement__m",
        "tensile_strain__%",
        "tensile_stress__MPa",
    ]
