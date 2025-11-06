// src/services/bus.service.ts
export async function getAllLines() {
    return [
        { id: "1", name: "Line 1", color: "red" },
        { id: "2", name: "Line 2", color: "blue" }
    ];
}

export async function getLineDetails(id: string) {
    const apiKey = process.env.MAPBOX_ACCESS_TOKEN;
    const query = await fetch('https://api.mapbox.com/directions/v5/mapbox/driving/-79.395,43.662;-79.370,43.650?geometries=geojson&access_token=' + apiKey);
    const data = await query.json();
    if(data && data.code == 'Ok') {
        return {
            id,
            name: `Line ${id}`,
            color: id === "1" ? "red" : "blue",
            path: data.routes[0].geometry.coordinates,
        }
    }else{
        console.error("Error fetching route from Mapbox:", data);
        return null;
    }
}
