<script>
    import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
    import Uikit from 'uikit';
    import {subscribe, withinDistance} from '../../helpers/geolocation';
    import pulsingDot from '../../helpers/mapping/pulsingDot';
    import {onMount} from 'svelte';
    import Button from '../../Components/Button/Button.svelte';
    import GpsPermissionModal from "../../Components/GpsPermissionModal.svelte";
    import Logo from "../../svg/Logo.svelte";
    import {patient_meta} from '../../helpers/stores/patient';
    import {navigate} from "svelte-routing";
    import {getClinicLocation, postCheckIn} from "../../API/patient.API";
    import Spinner from "../../Components/Spinner/Spinner.svelte";
    import Icon from "../../Components/Icon/Icon.svelte";
    import { _ } from 'svelte-i18n';

    let clinicPosition;
    let userPosition = [0, 0];
    const supportsGps = Boolean(navigator.geolocation);
    let needsConfirmation;
    let map = null;
    let withinBounds = false;

    const updateUserPosition = (pos) => {
        if (typeof (result) === "string") {
            Uikit.notification({
                message: result,
                status: "danger",
                group: "gps-alerts",
            });
        } else {
            userPosition = [pos.coords.longitude, pos.coords.latitude];
            withinBounds = withinDistance(userPosition, clinicPosition, 1609.34);
            let source = map.getSource("points");
            if (source) {
                source.setData({
                    "type": "Point",
                    "coordinates": userPosition
                });
            }
        }
    };
    onMount(async () => {
        loading = true;

        let location = await getClinicLocation($patient_meta.jwt);
        clinicPosition = [parseFloat(location.longitude), parseFloat(location.latitude)];

        let clinicMarker = new mapboxgl.Marker({color: "#396481"})
                .setLngLat(clinicPosition)
                .setDraggable(false);

        if (supportsGps) {
            subscribe(updateUserPosition)
        }

        mapboxgl.accessToken = process.env.MAPBOX_API_KEY;
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
        });
        loading = false;
    });
    let loading = false;
    const verifyLocation = async () => {
        loading = true;
        try {
            await postCheckIn(userPosition[1], userPosition[0], $patient_meta.jwt);
            $patient_meta.state = "FORMS";
            navigate("/patient/screening");
        } catch (error) {
            console.log(error);
        }
        loading = false;
    }

</script>

<svelte:head>
    <link href='https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css' rel='stylesheet'/>
</svelte:head>
<GpsPermissionModal {supportsGps} bind:promptForPermission={needsConfirmation}/>

<div class="container">
    <header class="uk-position-top-center">
            <Logo/>
            <h1 class="uk-margin-remove uk-heading-medium">MedFoyer</h1>
    </header>
    <main id="map">

    </main>
    <footer class="uk-position-bottom-center">
        <p class="uk-text-small uk-margin-remove uk-width-1-1 uk-text-center uk-text-danger">
            {#if !withinBounds}
                {$_("LocationPage.tooFar")}
            {/if}
        </p>
        <Button color="primary" disabled="{!withinBounds}" on:click={verifyLocation}><Icon _class="uk-margin-small-right" icon="sign-in"/>{$_("LocationPage.checkIn")}</Button>
    </footer>
    <Spinner show="{loading}"/>
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

        footer {
            background-color: white;
            bottom: 3em;
            display: flex;
            justify-content: center;
            font-size: 1.3em;
            flex-direction: column;
            width: 80%;
        }
    }

</style>