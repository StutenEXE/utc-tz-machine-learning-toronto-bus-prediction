import React from "react";
import mapboxgl from "mapbox-gl";
import { BusLine } from "./BusLine.tsx";
import {Weather} from "./Weather.tsx";
import {BusLineService} from "../services/BusLineServices.tsx";

export default function MapToronto() {
    const mapContainerRef = React.useRef<HTMLDivElement>(null);
    const mapRef = React.useRef<mapboxgl.Map | null>(null);
    const [isMapReady, setIsMapReady] = React.useState(false);
    const [busStops, setBusStops] = React.useState<[number, number][] | null>(null);

    React.useEffect(() => {
        if (mapRef.current) return;

        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

        console.debug("Creating map...");
        const map = new mapboxgl.Map({
            container: mapContainerRef.current!,
            style: "mapbox://styles/clementmartins/cmh0o7rch000e01s7g2psbnz8",
            center: [-79.3832, 43.6532],
            zoom: 12
        });


        map.on("load", () => {
            mapRef.current = map;
            setIsMapReady(true);
        });

        BusLineService.getAllLines().then(lines => {
            BusLineService.getLineDetails(lines[0].id).then(details => {
                if(details) {
                    setBusStops(details.path);
                }
            });
        })

        return () => {
            console.debug("Removing map...");
            map.remove();
            mapRef.current = null;
            setIsMapReady(false);
        };
    }, []);

    return (
        <>
            <div ref={mapContainerRef} style={{width: "100vw", height: "100vh"}}/>

            {isMapReady && mapRef.current && (
                <>
                    {busStops && (
                        <BusLine
                            map={mapRef.current!}
                            coordinates={busStops}
                            color="blue"
                            name={`bus-stop-$`}
                            id={`bus-stop-}`}
                        />
                    )}
                    <Weather map={mapRef.current} temperature={22} condition="rain"/>
                </>
            )}
        </>
    );
}
