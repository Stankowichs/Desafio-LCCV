from schemas.thermo_fatigue import ThermoFatigueTable, ThermoFatiguePlotData
import requests

pipeapi_table_url = "https://dev.subweb.com.br/app/pipeapi/api/thermo-fatigue/table"
pipeapi_plot_data_url = "https://dev.subweb.com.br/app/pipeapi/api/thermo-fatigue/plot_data"


def get_thermo_fatigue_table(payload: ThermoFatigueTable):
    response = requests.post(
        pipeapi_table_url,
        json=payload.model_dump(), #converte modelo pydantic para dicionario python
        timeout=30,
    )

    return response.json()

def get_thermo_fatigue_plot_data(payload: ThermoFatiguePlotData):
    response = requests.post(
        pipeapi_plot_data_url,
        json=payload.model_dump(),
        timeout=30
    )

    return response.json()

