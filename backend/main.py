from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.thermo_fatigue import get_thermo_fatigue_table, get_thermo_fatigue_plot_data
from schemas.thermo_fatigue import ThermoFatigueTable, ThermoFatiguePlotData

from schemas.thermo_buckling import ThermoBucklingTable, ThermoBucklingPlotData
from services.thermo_buckling import get_thermo_buckling_table, get_thermo_buckling_plot_data

from schemas.buckling import BucklingTable, BucklingPlotData, BucklingParameters
from services.buckling import get_buckling_table, get_buckling_plot_data, get_buckling_multiple_points

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#Thermo Buckling
@app.post(
    "/api/thermo-buckling/table",
    tags=["Thermo. Buckling"]          
)
def thermo_buckling_table(payload: ThermoBucklingTable):
    return get_thermo_buckling_table(payload)

@app.post(
    "/api/thermo-buckling/plot_data",
    tags=["Thermo. Buckling"]
)
def thermo_buckling_plot_data(payload: ThermoBucklingPlotData):
    return get_thermo_buckling_plot_data(payload)



#Thermo Fatigue
@app.post(
    "/api/thermo-fatigue/table",
    tags=["Thermo. Fatigue"]          
)
def thermo_fatigue_table(payload: ThermoFatigueTable):
    return get_thermo_fatigue_table(payload)

@app.post(
        "/api/thermo-fatigue/plot_data",
        tags=["Thermo. Fatigue"]
)
def thermo_fatigue_plot_data(payload: ThermoFatiguePlotData):
    return get_thermo_fatigue_plot_data(payload)



#Buckling 
@app.post(
    "/api/buckling/",
    tags=["Buckling"],
)
def buckling_multiple_points(payload: BucklingParameters):
    return get_buckling_multiple_points(payload)

@app.post( 
    "/api/buckling/table",
    tags=["Buckling"],
)
def buckling_table(payload: BucklingTable):
    return get_buckling_table(payload)

@app.post(
    "/api/buckling/plot_data",
    tags=["Buckling"],
)
def buckling_plot_data(payload: BucklingPlotData):
    return get_buckling_plot_data(payload)

