<script>
    import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
    import {onMount} from "svelte";
    import pulsingDot from '../../helpers/mapping/pulsingDot';

    let mapElem;
    let map;
    let mapHeight = "100px";
    export let clinicPosition;
    export let userPosition;

    onMount(()=>{
        mapboxgl.accessToken = 'pk.eyJ1IjoiYmRvbmFsZG1mIiwiYSI6ImNrOWY0eGtqeTA5MTEzZnA5ZWdudHd0ZTUifQ.RhjKb2SBHSf5KTQnVbdTUA';
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v10',
            center: clinicPosition, // Long Lat because reasons?
            zoom: 13,
            interactive: true
        });
        map.on("load", function () {
            map.addImage('pulsing-dot', pulsingDot(map), {pixelRatio: 5});
            map.addSource('points', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': userPosition
                            }
                        }
                    ]
                }
            });
            map.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'points',
                'layout': {
                    'icon-image': 'pulsing-dot'
                }
            });

            let clinicMarker = new mapboxgl.Marker({color: "#396481"})
                    .setLngLat(["-94.65516","39.282445"])
                    .addTo(map);
            // clinicMarker.addTo(map);
        });
    });
    $: if(mapElem) mapHeight = mapElem.clientWidth;
</script>

<svelte:head>
    <link href='https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css' rel='stylesheet'/>
</svelte:head>

<div id="map" bind:this={mapElem} height={mapHeight}/>

<style>
    div{
        font-size:0.5em;
        width:100%;
        height:25em;
    }
</style>