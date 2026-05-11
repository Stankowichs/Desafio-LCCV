from schemas.buckling import BucklingTable, BucklingPlotData, BucklingParameters
import requests

pipeapi_multiple_points_url = "https://dev.subweb.com.br/app/pipeapi/api/buckling"
pipeapi_table_url = "https://dev.subweb.com.br/app/pipeapi/api/buckling/table"
pipeapi_plot_data_url = "https://dev.subweb.com.br/app/pipeapi/api/buckling/plot_data"


def get_buckling_multiple_points(payload: BucklingParameters):
    response = requests.post(
        pipeapi_multiple_points_url,
        json = payload.model_dump(), #converte modelo pydantic para dicionario python
        timeout=30,
    )

    return response.json()


def get_buckling_table(payload: BucklingTable):
    response = requests.post(
        pipeapi_table_url,
        json = payload.model_dump(),
        timeout=30,
    )

    return response.json()


def get_buckling_plot_data(payload: BucklingPlotData):
    response = requests.post(
        pipeapi_plot_data_url,
        json = payload.model_dump(),
        timeout=30,
    )

    return response.json()
