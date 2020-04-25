<script>
    import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
    import Uikit from 'uikit';
    import {subscribe, withinDistance} from '../helpers/geolocation';
    import pulsingDot from '../helpers/mapping/pulsingDot';

    import Button from '../Components/Button/Button.svelte';
    import GpsPermissionModal from "../Components/GpsPermissionModal.svelte";
    import Logo from "../svg/Logo.svelte";
    import {appt} from '../helpers/stores';

    if(Object.keys($appt).length === 0){
        window.location.href = "/";
    }
    let clinicPosition = [parseFloat($appt.long), parseFloat($appt.lat)]; // TODO: Collect from API
    let userPosition = [0, 0];
    let description = "North Kansas City Hospital";
    const supportsGps = Boolean(navigator.geolocation);
    let needsConfirmation;
    let mapIsRendered = false;
    let map = null;
    let withinBounds = false;

    let clinicMarker = new mapboxgl.Marker({color: "#396481"})
            .setLngLat(clinicPosition)
            .setDraggable(false);

    const updateUserPosition = (pos) => {
        if (typeof (result) === "string") {
            Uikit.notification({
                message: result,
                status: "danger",
                group: "gps-alerts",
            });
        } else {
            userPosition = [pos.coords.longitude, pos.coords.latitude];
            withinBounds = withinDistance(userPosition, clinicPosition, 1000);
        }
    };
    $: {
        if(map){
            let source = map.getSource("points");
            if(source){
                source.setData({
                    "type": "Point",
                    "coordinates": userPosition
                });
            }
        }
    }
    if (supportsGps) {
        subscribe(updateUserPosition)
    }


    const renderMap = () => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYmRvbmFsZG1mIiwiYSI6ImNrOWY0eGtqeTA5MTEzZnA5ZWdudHd0ZTUifQ.RhjKb2SBHSf5KTQnVbdTUA';
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v10',
            center: clinicPosition, // Long Lat because reasons?
            zoom: 13,
            interactive: false
        });
        map.on("load", function () {
            map.addImage('pulsing-dot', pulsingDot(map), {pixelRatio: 2});
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
            clinicMarker.addTo(map);
            mapIsRendered = true;
        });
    }

</script>

<svelte:head>
    <link href='https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css' rel='stylesheet'/>
</svelte:head>
<GpsPermissionModal {supportsGps} bind:promptForPermission={needsConfirmation}/>

<div class="container">
    <header class="uk-position-top-center">
        {#if !mapIsRendered}
            <Button on:click={renderMap}>Render Map</Button>
        {:else}
            <Logo/>
            <h1 class="uk-margin-remove uk-heading-medium">MedFoyer</h1>
        {/if}

    </header>
    <main id="map">

    </main>
    <footer class="uk-position-bottom-center">
        <p class="uk-text-small uk-margin-remove uk-width-1-1 uk-text-center uk-text-danger">
{#if !withinBounds}
    You are too far away, please check in when you have arrived.
    {/if}
        </p>
        <Button disabled="{!withinBounds}">Verify Location</Button>
    </footer>
</div>
<style lang="scss">
    div.container {
        display: grid;
        height: 100vh;
        max-height: 100vh;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;

        header {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.3em;
            top: 2em;
            background-color: rgba(255, 255, 255, 0.5);
            height: 6em;
            z-index: 1;

        }

        main#map {
            background: green;
        }

        footer {
            background-color: white;
            bottom: 3em;
            display: flex;
            justify-content: center;
            font-size: 1.3em;
            flex-direction:column;
            width:80%;
        }
    }

</style>