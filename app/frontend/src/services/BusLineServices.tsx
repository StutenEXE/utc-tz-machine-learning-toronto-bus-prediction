// src/services/BusLineService.ts

export interface BusLineSummary {
    id: string;
    name: string;
    color?: string;
}

export interface BusLineDetails {
    id: string;
    name: string;
    stops: { id: string; name: string; coordinates: [number, number] }[];
    path: [number, number][];
    color?: string;
}

export interface TrafficInfo {
    congestionLevel: number;
    averageDelayMinutes: number;
}

export interface IncidentHistory {
    timestamp: string;
    description: string;
    severity: "low" | "medium" | "high";
}

export interface IncidentForecast {
    riskLevel: number;
    next24hIncidentsExpected: number;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export class BusLineService {

    static async getAllLines(): Promise<BusLineSummary[]> {
        const response = await fetch(`${API_BASE}/bus/lines`);
        if (!response.ok) throw new Error("Erreur lors du chargement des lignes");
        return response.json();
    }

    static async getLineDetails(id: string): Promise<BusLineDetails> {
        const response = await fetch(`${API_BASE}/bus/lines/${id}`);
        if (!response.ok) throw new Error(`Impossible de charger la ligne ${id}`);
        return response.json();
    }

    static async getLineTraffic(id: string): Promise<TrafficInfo> {
        const response = await fetch(`${API_BASE}/bus/lines/${id}/traffic`);
        if (!response.ok) throw new Error(`Impossible de récupérer le trafic de la ligne ${id}`);
        return response.json();
    }

    static async getLineIncidentHistory(id: string): Promise<IncidentHistory[]> {
        const response = await fetch(`${API_BASE}/bus/lines/${id}/incidents/history`);
        if (!response.ok) throw new Error(`Impossible de récupérer les incidents passés de la ligne ${id}`);
        return response.json();
    }

    static async getLineIncidentForecast(id: string): Promise<IncidentForecast> {
        const response = await fetch(`${API_BASE}/bus/lines/${id}/incidents/forecast`);
        if (!response.ok) throw new Error(`Impossible de récupérer les prévisions d’incidents de la ligne ${id}`);
        return response.json();
    }
}
