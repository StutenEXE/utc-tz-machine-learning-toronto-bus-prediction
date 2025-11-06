import { Source, Layer } from 'react-map-gl/mapbox';
import {useEffect, useState} from "react";
import {BusStop} from "./BusStop.tsx";

interface BusLineProps {
    coordinates: [number, number][]; // GeoJSON-compatible coordinates
    color: string;
    onClick?: () => void;
}

export function BusLine({ coordinates, color, onClick }: BusLineProps) {
    const [routeData, setRouteData] = useState(null);

    useEffect(() => {
        const fetchRoute = async () => {
            try {
                const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates.map(coord => coord.join(',')).join(';')}?geometries=geojson&access_token=pk.eyJ1IjoiY2xlbWVudG1hcnRpbnMiLCJhIjoiY21oMGx4cHAxMDI4bDJuczhnb2N0NHd2ZSJ9.vzFXf89w1P83cru30twuAA`;
                console.log('Fetching route from URL:', url);
                const response = await fetch(url);
                const data = await response.json();
                if(data.code !== 'Ok' || data.routes.length === 0) {
                    throw new Error('No route found');
                }
                setRouteData(data.routes[0].geometry);
            } catch (error) {
                console.error('Error fetching route data:', error);
            }
        };
        fetchRoute();
    }, [coordinates]);

    return (
        <>
            {routeData!==null && (
                <Source id="bus-line" type="geojson" data={{ type: 'Feature', geometry: routeData }}>
                    <Layer
                        id="bus-line-layer"
                        type="line"
                        paint={{
                            'line-color': color,
                            'line-width': 4,
                            'line-translate-anchor': 'viewport',
                            'line-translate': [0, 0],
                        }}
                    />
                    <BusStop position={routeData.coordinates[2]} color={color} name={"BusStop1"} fillColor={'#fff'}></BusStop>
                </Source>
            )}
        </>
    );
}
