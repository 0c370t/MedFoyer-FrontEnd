<script>
    import {onMount} from 'svelte';
    import {getCookies, setCookie} from '../helpers/cookies';
    import Uikit from 'uikit';

    import Icon from '../Components/Icon/Icon.svelte';
    import Modal from "../Components/Modal/Modal.svelte";
    import Button from '../Components/Button/Button.svelte';
    import {getLatLong} from "../helpers/geolocation";
    import {getMobileOperatingSystem} from "../helpers/useragent";
    import {_} from 'svelte-i18n';

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
        debugger;
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
        debugger;
        getLatLong(checkForErrors);
    };

    const refresh = () => window.location.reload();
    const device_type = getMobileOperatingSystem();
</script>
{#if supportsGps}
    <Modal open={promptForPermission} id="locationModal" showClose={false} header={$_("LocationPage.modal.title")}>
        <p>
            {$_("LocationPage.modal.text")}
        </p>
        {#if device_type === "iOS" && showIosHelp}
            <hr/>
            <div>
                <p>
                    {$_("LocationPage.modal.instructions_1")}
                </p>
                <p>
                    {$_("LocationPage.modal.instructions_2")} </p>
                <p class="uk-margin-left">
                    {$_("LocationPage.modal.steps.settings")}
                    <Icon icon="chevron-double-right"/>
                    {$_("LocationPage.modal.steps.privacy")}
                    <Icon icon="chevron-double-right"/>
                    {$_("LocationPage.modal.steps.locationServices")}
                    <Icon icon="chevron-double-right"/>
                    {$_("LocationPage.modal.steps.safariWebsites")}
                </p>
                <p>
                    {$_("LocationPage.modal.steps.instructions_3")} </p>

                <Button _class="uk-align-center uk-margin-small-top uk-margin-remove-bottom">
                    <a href="App-prefs://prefs:root=LOCATION_SERVICES">
                        <Icon _class="uk-margin-small-right" icon="cog"/>
                        {$_("LocationPage.modal.openSettings")}
                    </a>
                </Button>

            </div>
        {/if}
        <span class="modalButton" slot="footer">
            <Button _class="uk-position-relative" color="primary" on:click={getGpsPermission} {loading}>
                <span>{$_("okay")}</span>
                <span><Icon options={{icon:"check"}}/></span>
            </Button>
        </span>
    </Modal>
{:else}
    <Modal open={true} id="gpsUnavailable" showClose={false} header="GPS Unavailable">
        <p>
            {$_("LocationPage.modal.notSupported")}
        </p>
        <span class="modalButton" slot="footer">
            <Button on:click={refresh}>{$_("reload")} <span class="uk-icon" uk-icon="icon: reload; ratio:2"/></Button>
        </span>
    </Modal>
{/if}
