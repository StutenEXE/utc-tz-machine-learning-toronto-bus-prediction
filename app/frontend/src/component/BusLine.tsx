import { Polyline } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';

interface BusLineProps {
    coordinates: LatLngExpression[];
    color?: string;
    onClick?: () => void;
}

export function BusLine({ coordinates, color = 'blue', onClick }: BusLineProps) {
    return (
        <Polyline
            positions={coordinates}
            color={color}
            weight={14}
            eventHandlers={{
                click: onClick,
            }}
        />
    );
}
