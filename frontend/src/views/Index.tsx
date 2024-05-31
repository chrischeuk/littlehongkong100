import axios from 'axios';
import mapboxgl from 'mapbox-gl'
import React, { useRef, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client';

mapboxgl.accessToken = 'pk.eyJ1Ijoid29yZHNvZm1vdXRoIiwiYSI6ImNrMmZ2MTNiZDBqczczY3A1azVxdnZsdDEifQ.l3j6LDp3rtjSRIKUonA7zg';
var currentMarkers = [];

// const players = [
//     {
//         name: "JJ",
//         coordinates: [151.17, -33.5975],
//         description: "hello JJ"
//     },
//     {
//         name: "DD",
//         coordinates: [151.2093, -33.6],
//         description: "hello DD"
//     }
// ]

export default function index() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(151.2093);
    const [lat, setLat] = useState(-33.7);
    const [zoom, setZoom] = useState(11);
    const [players, setPlayers] = useState([{
        name: "JJ",
        longitude: 151.17,
        latitude: -33.5975,
        description: "hello JJ"
    },
    {
        name: "DD",
        longitude: 151.2093,
        latitude: -33.5975,
        description: "hello DD"
    }])

    const Marker = ({ onClick, children, player }) => {
        const _onClick = () => {
            onClick(player.description);
        };

        return (
            <div onClick={_onClick} className="marker  relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                {children}
            </div>
        );
    };
    const markerClicked = (title) => {
        window.alert(title);
    };

    useEffect(() => {
        const api = async () => {
            try {
                const response = await axios.get("https://live-location-app-a5fivvjqma-ts.a.run.app/positions/all");
                setPlayers(response.data)
                console.log(response.data)
            } catch (err) {
                console.log(err)
            }

        }
        api()
    }, [])

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
            center: [lng, lat],
            zoom: zoom,
            pitch: 60

        });


        map.current.on("load", () => {
            map.current.addSource('mapbox-dem', {
                'type': 'raster-dem',
                'url': 'mapbox://mapbox.terrain-rgb',
                'tileSize': 512,
                'maxzoom': 14
            });
            map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 2.5 });
            map.current.addSource("100km", {
                type: "vector",
                url: "mapbox://wordsofmouth.46lv3lxu",
            })
            map.current.addLayer({
                id: "100km-fill",
                type: "line",
                source: "100km",
                "source-layer": "tracks",
                paint: {
                    "line-color": "#ed0a3f",
                    "line-width": 3,
                    'line-dasharray': [1, 1]
                },
            })
            map.current.loadImage(
                'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
                (error, image) => {
                    if (error) throw error;
                    map.current.addImage('custom-marker', image);
                    map.current.addLayer({
                        id: "100km-waypoint",
                        type: "symbol",
                        source: "100km",
                        "source-layer": "waypoints",
                        layout: {
                            'icon-image': 'custom-marker',
                            'icon-size': 0.5,
                            'text-field': ['get', 'name'],
                            "text-size": 16,
                            "text-offset": [0, -2],
                        },
                        paint: {
                            "text-color": "#1d1485",
                            "text-halo-color": "#ffffff",
                            "text-halo-width": 1,
                        },
                    })
                })
            map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

            // const marker1 = new mapboxgl.Marker()
            //     .setLngLat([151.2093, -33.7])
            //     .addTo(map.current)


            // // Render custom marker components
            // players.forEach((player) => {
            //     // Create a React ref
            //     const ref = React.createRef();
            //     // Create a new DOM node and save it to the React ref
            //     ref.current = document.createElement('div');
            //     // Render a Marker Component on our new DOM node
            //     createRoot(ref.current).render(
            //         <Marker onClick={markerClicked} player={player} />
            //     );

            //     // Create a Mapbox Marker at our new DOM node
            //     var oneMarker = new mapboxgl.Marker(ref.current)
            //         .setLngLat(player.coordinates)
            //         .addTo(map.current);
            //     currentMarkers.push(oneMarker);
            // });
        })

        // return () => { map.current.remove() };
    });
    useEffect(() => {
        map.current.on("load", () => {

            // Render custom marker components
            players.forEach((player) => {
                // Create a React ref
                const ref = React.createRef();
                // Create a new DOM node and save it to the React ref
                ref.current = document.createElement('div');
                // Render a Marker Component on our new DOM node
                createRoot(ref.current).render(
                    <Marker onClick={markerClicked} player={player} />
                );

                // Create a Mapbox Marker at our new DOM node
                console.log([player.longitude, player.latitude])
                var oneMarker = new mapboxgl.Marker(ref.current)
                    .setLngLat([player.longitude, player.latitude])
                    .addTo(map.current);
                currentMarkers.push(oneMarker);
            });
        })

        // return () => { map.current.remove() };
    }, [players]);



    return (<>

        <div ref={mapContainer} className="map-container h-svh	" />

        <p>hi</p>
    </>)
}