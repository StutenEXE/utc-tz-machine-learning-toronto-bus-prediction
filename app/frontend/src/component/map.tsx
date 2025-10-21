import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet/Marker'
import { BusLine } from './BusLine'
import { Popup } from 'react-leaflet/Popup'
import 'leaflet/dist/leaflet.css';

import type {LatLngExpression} from "leaflet";

export default function MapToronto() {
    // Toronto coordinates
    const torontoPosition: LatLngExpression = [43.6532, -79.3832]; // [latitude, longitude]

    const busLineCoordinates: LatLngExpression[] = [
        [43.6532, -79.3832], // Point de départ
        [43.6572, -79.3872], // Arrêt intermédiaire
        [43.6612, -79.3912], // Arrêt intermédiaire
        [43.6652, -79.3952], // Point d'arrivée
    ];

    return (
        <div style={{ height: '500px', width: '500px' }}>
            <MapContainer center={torontoPosition} zoom={12} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={torontoPosition}>
                    <Popup>
                        Toronto, Canada
                    </Popup>
                </Marker>
                {/* Affichage de la ligne de bus */}
                <BusLine coordinates={busLineCoordinates} color="red" onClick={() => {console.log('et')}} />
            </MapContainer>
        </div>
    );
}
