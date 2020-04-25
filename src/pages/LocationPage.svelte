<script>
    import mapboxgl from 'mapbox-gl/dist/mapbox-gl'

    import Button from '../Components/Button/Button.svelte';
    import GpsPermissionModal from "../Components/GpsPermissionModal.svelte";
    import Logo from "../svg/Logo.svelte";

    let position = [-94.5512, 39.1495];
    let description = "North Kansas City Hospital";
    const renderMap = () => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYmRvbmFsZG1mIiwiYSI6ImNrOWY0eGtqeTA5MTEzZnA5ZWdudHd0ZTUifQ.RhjKb2SBHSf5KTQnVbdTUA';
        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v10',
            center: position, // Long Lat because reasons?
            zoom: 13,
            interactive: false
        });
        let marker = new mapboxgl.Marker()
                .setLngLat(position)
                .setDraggable(false)
                .addTo(map);
        mapIsRendered = true;
    };

    const supportsGps = Boolean(navigator.geolocation);
    let needsConfirmation;
    let mapIsRendered = false;
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
            <h1 class="uk-margin-remove uk-heading-large">MedFoyer</h1>
        {/if}

    </header>
    <main id="map">

    </main>
    <footer class="uk-position-bottom-center">
        <Button>Verify Location</Button>
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
            align-items:center;
            font-size: 1.3em;
            top: 2em;
            background-color: rgba(255,255,255,0.5);
            height:6em;
            z-index:1;

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
        }
    }

</style>