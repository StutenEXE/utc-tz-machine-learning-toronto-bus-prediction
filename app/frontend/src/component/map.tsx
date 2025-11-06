import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken =
    'pk.eyJ1IjoiY2xlbWVudG1hcnRpbnMiLCJhIjoiY21oMGx4cHAxMDI4bDJuczhnb2N0NHd2ZSJ9.vzFXf89w1P83cru30twuAA';

export default class MapToronto extends React.Component {
    private readonly mapRef: React.RefObject<HTMLDivElement> = React.createRef();
    private map: mapboxgl.Map | null = null;

    public static readonly torontoCoordinates: [number, number] = [-79.3832, 43.6532];

    componentDidMount() {
        if (!this.mapRef.current) return;

        // Crée la carte seulement ici (le div existe enfin)
        this.map = new mapboxgl.Map({
            container: this.mapRef.current,
            style: 'mapbox://styles/clementmartins/cmh0o7rch000e01s7g2psbnz8',
            center: MapToronto.torontoCoordinates,
            zoom: 14,
            pitch: 20,
            hash: true,
        });

        this.map.on('style.load', () => {
            console.log('Style chargé 🌧️ ajout de la pluie');

            // Helper pour ajuster l’effet selon le zoom
            const zoomBasedReveal = (value: number) => [
                'interpolate',
                ['linear'],
                ['zoom'],
                10,
                0.0,
                13,
                value,
            ];

            this.map?.setRain({
                density: zoomBasedReveal(0.1),
                intensity: 1.0,
                color: '#a8adbc',
                opacity: 0.7,
                vignette: zoomBasedReveal(1.0),
                'vignette-color': '#464646',
                direction: [0, 80],
                'droplet-size': [2.6, 18.2],
                'distortion-strength': 0.7,
                'center-thinning': 0, // pluie sur toute la carte
            });
        });
    }

    componentWillUnmount() {
        if (this.map) {
            this.map.remove();
            this.map = null;
        }
    }

    render() {
        return (
            <div
                ref={this.mapRef}
                id="map"
                style={{ width: '500px', height: '500px' }}
            />
        );
    }
}
