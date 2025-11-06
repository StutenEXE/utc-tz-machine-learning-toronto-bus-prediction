import {Layer, Source} from "react-map-gl/mapbox";
import {useEffect} from "react";

interface BusStopProps {
    position: number[];
    color: string;
    name: string;
    fillColor?: string;
}

export function BusStop({ position, color, name, fillColor =  '#fff' }: BusStopProps) {
    const busStopMarkerProps = {
        radius: 8,
        fillColor: fillColor,
        color: color,
        weight: 3,
        opacity: 1,
        fillOpacity: 0.8,
    };

    useEffect(() => {
        console.log(`BusStop ${name} mounted at position:`, position);
    }, []);
    return (
        <Source
            id={name}
            type="geojson"
            data={{
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: position,
                },
            }}
            >
            <Layer
                id={`${name}-layer`}
                type="circle"
                paint={{
                    'circle-radius': busStopMarkerProps.radius,
                    'circle-color': busStopMarkerProps.fillColor,
                    'circle-stroke-color': busStopMarkerProps.color,
                    'circle-stroke-width': busStopMarkerProps.weight,
                    'circle-opacity': busStopMarkerProps.opacity,
                    'circle-fill-opacity': busStopMarkerProps.fillOpacity,
                }}
                //Show popup on click
            ></Layer>
        </Source>
    );
}
