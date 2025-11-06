import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

interface BusStopProps {
    map: mapboxgl.Map;
    position: [number, number];
    color: string;
    name: string;
    fillColor?: string;
}

export function BusStop({ map, position, color, name, fillColor = "#fff" }: BusStopProps) {

    useEffect(() => {
        const sourceId = `${name}-source`;
        const layerId = `${name}-layer`;

        if (map.getSource(sourceId)) return;

        map.addSource(sourceId, {
            type: "geojson",
            data: {
                type: "Feature",
                properties: { name },
                geometry: {
                    type: "Point",
                    coordinates: position
                }
            }
        });

        const buildingLayer = map.getStyle().layers?.find(l => l.id.includes("building"));
        const beforeId = buildingLayer ? buildingLayer.id : undefined;

        map.addLayer(
            {
                id: layerId,
                type: "circle",
                source: sourceId,
                paint: {
                    "circle-radius": 8,
                    "circle-pitch-scale": "viewport",
                    "circle-stroke-width": 3,
                    "circle-color": fillColor,
                    "circle-stroke-color": color
                },
                minzoom: 13,
            },
            beforeId
        );

        console.log(`Adding bus stop layer ${layerId}...`);

        const handleClick = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
            // Popup par défaut si aucun callback n'est fourni
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(`<strong>Arrêt :</strong> ${name}`)
                .addTo(map);
        };

        map.on("click", layerId, handleClick);

        return () => {
            console.debug(`Removing bus stop layer ${layerId}...`);
            if (map.getLayer(layerId)) map.removeLayer(layerId);
            if (map.getSource(sourceId)) map.removeSource(sourceId);
        };

    }, [map, position, color, name, fillColor]);

    return null;
}
