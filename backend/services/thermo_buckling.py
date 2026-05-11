from schemas.thermo_buckling import ThermoBucklingTable, ThermoBucklingPlotData
import requests

pipeapi_table_url = "https://dev.subweb.com.br/app/pipeapi/api/thermo-buckling/table"
pipeapi_plot_data_url = "https://dev.subweb.com.br/app/pipeapi/api/thermo-buckling/plot_data"


def get_thermo_buckling_table(payload: ThermoBucklingTable):
    response = requests.post(
        pipeapi_table_url,
        json = payload.model_dump(), #converte modelo pydantic para dicionario python
        timeout=30,
    )

    return response.json()

def get_thermo_buckling_plot_data(payload: ThermoBucklingPlotData):
    response = requests.post(
        pipeapi_plot_data_url,
        json = payload.model_dump(),
        timeout=30,
    )

    return response.json()