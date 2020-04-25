<script>
    import {onMount} from 'svelte';
    import {getCookies, setCookie} from '../helpers/cookies';
    import Uikit from 'uikit';

    import Modal from "../Components/Modal/Modal.svelte";
    import Button from '../Components/Button/Button.svelte';
    import Icon from 'svelte-awesome';
    import {check} from 'svelte-awesome/icons';
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

    const checkForErrors = (result) => {
        if(typeof(result) === "string"){
            Uikit.notification({
                message: result,
                status: "danger",
                group:"gps-alerts",
            });
        }
        else {
            Uikit.notification({
                message: "Thank you!",
                status: "success",
                group:"gps-alerts",
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
        <h3 slot="header">We need permission</h3>
        <p>
            MedFoyer uses GPS to ensure you are at your destination before checking in, we need permission from your
            device to do so.
        </p>
        <span class="modalButton" slot="footer">
            <Button on:click={getGpsPermission}>Okay <span><Icon data={check}/></span></Button>
        </span>
    </Modal>
{:else}
    <Modal open={true} id="gpsUnavailable" showClose={false}>
        <h3 slot="header">GPS Unavailable</h3>
        <p>
            MedFoyer uses GPS to ensure you are at your destination before checking in, but it looks like your device
            does not support GPS.
        </p>
        <span class="modalButton" slot="footer">
            <Button on:click={refresh}>Reload <span class="uk-icon" uk-icon="icon: reload; ratio:2"/></Button>
        </span>
    </Modal>
{/if}
