"use client"

import type { PayloadByKey } from "./payloads"

const url = "http://127.0.0.1:8000"

async function apiGeneralPost (endpoint: string, payload: unknown) {
    const response = await fetch( `${url}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(payload)
    });

    if(!response.ok) {
        throw new Error("Erro ao buscar dados da API");
    }

    return response.json() 
}


// Thermo Buckling API
export function getThermoBucklingTable(payload: PayloadByKey<"thermoBucklingTable">){
    return apiGeneralPost("/api/thermo-buckling/table", payload)
}

export function getThermoBucklingPlotData(payload: PayloadByKey<"thermoBucklingPlotData">){
    return apiGeneralPost("/api/thermo-buckling/plot_data", payload)
}


// Thermo Fatigue API
export function getThermoFatigueTable(payload: PayloadByKey<"thermoFatigueTable">){
    return apiGeneralPost("/api/thermo-fatigue/table", payload)
}

export function getThermoFatiguePlotData(payload: PayloadByKey<"thermoFatiguePlotData">){
    return apiGeneralPost("/api/thermo-fatigue/plot_data", payload)
}


// Buckling API
export function getBucklingMultiplePoints(payload: PayloadByKey<"bucklingMultiplePoints">){
    return apiGeneralPost("/api/buckling/", payload)
}

export function getBucklingTable(payload: PayloadByKey<"bucklingTable">){
    return apiGeneralPost("/api/buckling/table", payload)
}

export function getBucklingPlotData(payload: PayloadByKey<"bucklingPlotData">){
    return apiGeneralPost("/api/buckling/plot_data", payload)
}
