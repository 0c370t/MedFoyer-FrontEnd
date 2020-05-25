<script>
    import {onMount} from 'svelte';
    import {getCookies, setCookie} from '../helpers/cookies';
    import Uikit from 'uikit';

    import Icon from '../Components/Icon/Icon.svelte';
    import Modal from "../Components/Modal/Modal.svelte";
    import Button from '../Components/Button/Button.svelte';
    import {getLatLong} from "../helpers/geolocation";

    export let supportsGps = false;
    export let promptForPermission = false;

    onMount(() => {
        let cookies = getCookies();
        if (!Object.keys(cookies).includes("locationPermissionGiven")) {
            promptForPermission = true;
        }
    });

    let errorContent = "";
    let notification = null;

    const checkForErrors = (result) => {
        if(notification && notification.hasOwnProperty("close")){
            notification.close()
        }
        if (typeof (result) === "string") {
            notification = Uikit.notification({
                message: result,
                status: "danger",
                group: "gps-alerts",
            });
        } else {
            notification = Uikit.notification({
                message: "Thank you!",
                status: "success",
                group: "gps-alerts",
            });
            setCookie("locationPermissionGiven", true);
            promptForPermission = false;

        }
    };

    const getGpsPermission = () => {
        getLatLong(checkForErrors);
    };

    const refresh = () => window.location.reload();
</script>
{#if supportsGps}
    <Modal open={promptForPermission} id="locationModal" showClose={false}>
        <h3 slot="header">We need your permission</h3>
        <p>
            MedFoyer uses GPS to ensure you are at your doctor's office before checking in, when tapping okay, you will
            be prompted to give MedFoyer permission. </p>
        <span class="modalButton" slot="footer">
            <Button on:click={getGpsPermission}>Okay <span><Icon options="{{icon:"check"}}"/></span></Button>
        </span>
    </Modal>
{:else}
    <Modal open={true} id="gpsUnavailable" showClose={false}>
        <h3 slot="header">GPS Unavailable</h3>
        <p>
            MedFoyer uses GPS to ensure you are at your destination before checking in, but it looks like your device
            does not currently support GPS. </p>
        <span class="modalButton" slot="footer">
            <Button on:click={refresh}>Reload <span class="uk-icon" uk-icon="icon: reload; ratio:2"/></Button>
        </span>
    </Modal>
{/if}
