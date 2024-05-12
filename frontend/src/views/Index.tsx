import mapboxgl from 'mapbox-gl'
import React, { useRef, useEffect, useState } from 'react'

mapboxgl.accessToken = 'pk.eyJ1Ijoid29yZHNvZm1vdXRoIiwiYSI6ImNrMmZ2MTNiZDBqczczY3A1azVxdnZsdDEifQ.l3j6LDp3rtjSRIKUonA7zg';


export default function index() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(151.2093);
    const [lat, setLat] = useState(-33.7);
    const [zoom, setZoom] = useState(11);


    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom,

        });
        setTimeout(100)

        map.current.on("load", () => {
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
                    "line-color": "#0047AB",
                    "line-width": 4,
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
                            'text-field': ['get', 'name'],
                            "text-size": 16,
                            "text-offset": [0, -1.5],
                        },
                        paint: {
                            "text-color": "#1d1485",
                            "text-halo-color": "#ffffff",
                            "text-halo-width": 0.5,
                        },
                    })
                })
        })
    });



    return (<>

        <div ref={mapContainer} className="map-container h-svh	" />

        <p>hi</p>
    </>)
}