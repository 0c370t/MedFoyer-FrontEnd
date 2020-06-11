<script>
    import Logo from "../../../svg/Logo.svelte";
    import {Auth} from 'aws-amplify';
    import ClinicMasterMenu from "./ClinicMasterMenu.svelte";
    import {onMount} from "svelte";

    onMount(async () => {
        user = await Auth.currentUserInfo();
    });
    let user = {};

    export let updateAppointments;
</script>

<header class="uk-padding-small" id="master-header">
    <div class="left">
        <div class="logo uk-margin-small-right">
            <Logo/>
        </div>
        <h1 class="uk-margin-remove"> MedFoyer </h1>
    </div>
    <div class="right uk-flex">
        <p class="uk-button uk-button-default uk-disabled uk-margin-small-right">
            Welcome, {user.username || ""}
        </p>
        <ClinicMasterMenu/>
    </div>
</header>


<style lang="scss">
    header {
        grid-area: header;
        display: flex;
        align-items: center;
        justify-content: space-between;

        border-bottom: 1px solid gray;

        div.left {
            height: 3em;
            display: flex;
            align-items: center;
        }

        div.logo {
            height: 3em;
            margin-right: 1ch;
        }
    }
</style>