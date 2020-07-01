<script>
    import {onMount} from 'svelte';
    import {getCookies, setCookie} from '../helpers/cookies';
    import Uikit from 'uikit';

    import Icon from '../Components/Icon/Icon.svelte';
    import Modal from "../Components/Modal/Modal.svelte";
    import Button from '../Components/Button/Button.svelte';
    import {getLatLong} from "../helpers/geolocation";
    import {getMobileOperatingSystem} from "../helpers/useragent";

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
    let showIosHelp = false;
    let loading = false;
    const checkForErrors = (result, error) => {
        if (notification && notification.hasOwnProperty("close")) {
            notification.close();
        }
        if (typeof (result) === "string") {
            notification = Uikit.notification({
                message: result,
                status: "danger",
                group: "gps-alerts",
            });
            if (typeof error !== "undefined" && error.code === error.PERMISSION_DENIED) {
                showIosHelp = true;
            }
        } else {
            notification = Uikit.notification({
                message: "Thank you!",
                status: "success",
                group: "gps-alerts",
            });
            setCookie("locationPermissionGiven", true);
            promptForPermission = false;
        }
        loading = false;
    };

    const getGpsPermission = () => {
        loading = true;
        getLatLong(checkForErrors);
    };

    const refresh = () => window.location.reload();
    const device_type = getMobileOperatingSystem();
</script>
{#if supportsGps}
    <Modal open={promptForPermission} id="locationModal" showClose={false} header="We need your permission">
        <p>
            MedFoyer uses GPS to ensure you are at your doctor's office before checking in, when tapping okay, you will
            be prompted to give MedFoyer permission. </p>
        {#if 1 === 1}
            <hr/>
            <div>
                <p>
                    You may need to provide your web browser with permission. </p>
                <p>
                    To do so, open settings, and navigate to: </p>
                <p class="uk-margin-left">
                    Settings
                    <Icon icon="chevron-double-right"/>
                    Privacy
                    <Icon icon="chevron-double-right"/>
                    Location Services
                    <Icon icon="chevron-double-right"/>
                    Safari Websites
                </p>
                <p>
                    Once there, select "While Using the App" </p>

                <Button _class="uk-align-center uk-margin-small-top uk-margin-remove-bottom">
                    <a href="App-prefs://prefs:root=LOCATION_SERVICES">
                        <Icon _class="uk-margin-small-right" icon="cog"/>
                        Tap here to open your phone settings
                    </a>
                </Button>

            </div>
        {/if}
        <span class="modalButton" slot="footer">
            <Button _class="uk-position-relative" color="primary" on:click={getGpsPermission} {loading}>
                <span>Okay</span>
                <span><Icon options={{icon:"check"}}/></span>
            </Button>
        </span>
    </Modal>
{:else}
    <Modal open={true} id="gpsUnavailable" showClose={false} header="GPS Unavailable">
        <p>
            MedFoyer uses GPS to ensure you are at your destination before checking in, but it looks like your device
            does not currently support GPS. </p>
        <span class="modalButton" slot="footer">
            <Button on:click={refresh}>Reload <span class="uk-icon" uk-icon="icon: reload; ratio:2"/></Button>
        </span>
    </Modal>
{/if}
