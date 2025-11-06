import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import {BusStop} from "./BusStop.tsx";

interface BusLineProps {
    map: mapboxgl.Map;
    coordinates: [number, number][];
    color: string;
    id: string;
    name: string;
}

export function BusLine({ map, coordinates, color, id, name }: BusLineProps) {

    const [lineReady, setLineReady] = React.useState(false);

    useEffect(() => {
        if (!map) return;

        const sourceId = `${id}-source`;
        const layerId = `${id}-layer`;

        if (map.getSource(sourceId)) return;

        map.addSource(sourceId, {
            type: "geojson",
            data: {
                type: "Feature",
                properties: { name },
                geometry: {
                    type: "LineString",
                    coordinates
                }
            }
        });

        const buildingLayer = map.getStyle().layers?.find(l => l.id.includes("building"));
        const beforeId = buildingLayer ? buildingLayer.id : undefined;

        console.debug(`Adding bus line layer ${layerId}...`);
        map.addLayer(
            {
                id: layerId,
                type: "line",
                source: sourceId,
                paint: {
                    "line-color": color,
                    "line-width": 4
                },
                layout: {
                    "line-cap": "round",
                },
                minzoom: 11,
            },
            beforeId
        );

        setLineReady(true);

        return () => {
            console.debug(`Removing bus line layer ${layerId}...`);
            if (map.getLayer(layerId)) map.removeLayer(layerId);
            if (map.getSource(sourceId)) map.removeSource(sourceId);
            setLineReady(false);
        };

    }, [map, coordinates, color, id, name]);

    return ( lineReady &&
        <BusStop position={coordinates[2]} color={color} name={'arret 1'} map={map}/>
    );
}
