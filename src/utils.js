const poiLocations = [
    { stopNum: 1, name: "Innovation Square", lat: 43.15447789767281, lon: -77.60505248322582 },
    { stopNum: 2, name: "Legacy Tower", lat: 43.15438831343367, lon: -77.60622384769805 },
    { stopNum: 3, name: "View of Kodak", lat: 43.15638436640531, lon: -77.61009447910666 },
    { stopNum: 4, name: "ITX Corp.", lat: 43.15646653270117, lon: -77.60622208016815 },
    { stopNum: 5, name: "Envative", lat: 43.15914267683912, lon: -77.59787487198305 },
    { stopNum: 6, name: "MLK Park", lat: 43.154013805527256, lon: -77.6018083032324 },
];



const setupMap = (route, zoom = 15) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoianJqODI1MCIsImEiOiJjbTk3OG9mMWcwNTIyMmpxMmp5ZzNzdWFiIn0.EkdpGr7grUZ8_9FN3l047g';

    const getMidpoint = (arrayOfPOIs) => {
        const totalPOIs = arrayOfPOIs.length;
        let avgLat = 0;
        let avgLon = 0;
        for (const poi of route) {
            avgLat += poi.lat;
            avgLon += poi.lon;
        }
        avgLat /= totalPOIs;
        avgLon /= totalPOIs;

        return {
            lat: avgLat,
            lon: avgLon
        }
    }

    const midpointCoords = getMidpoint(route);

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [midpointCoords.lon, midpointCoords.lat],
        zoom: zoom,
        interactive: true
    });

    const fetchData = async (url) => {
        const response = await fetch(url);
        const data = response.json();
        return data;
    };

    const getRoute = async () => {
        let stringOfCoords = '';
        for (const poi of route) {
            stringOfCoords += `${poi.lon},${poi.lat};`;
        }
        stringOfCoords = stringOfCoords.slice(0, -1);
        const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${stringOfCoords}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;
        try {
            const json = await fetchData(url);
            const data = json.routes[0];
            console.log(data);
            const route = data.geometry;
            const geojson = {
                'type': 'Feature',
                'properties': {},
                'geometry': data.geometry
            };
    
            if (map.getSource('route')) {
                map.getSource('route').setData(geojson);
            } else {
                map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: geojson
                    },
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#3b9ddd',
                        'line-width': 4,
                        'line-opacity': 0.75
                    }
                });
            }
        } catch (err) {
            console.log('Error fetching data:', err);
        }
    }

    map.on('load', () => {
        for (const poi of route) {
            map.addLayer({
                'id': `poi-${poi.name}-marker`,
                'type': 'circle',
                'source': {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [
                            {
                                'type': 'Feature',
                                'properties': {},
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [poi.lon, poi.lat]
                                }
                            }
                        ]
                    }
                },
                'paint': {
                    'circle-radius': 10,
                    'circle-color': '#f30'
                }
            });
        }

        // make an initial directions request on load
        getRoute();
    });
}

export { poiLocations, setupMap, };