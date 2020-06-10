<script>
    import Logo from "../../svg/Logo.svelte";
    import Icon from "../Icon/Icon.svelte";
    import {Auth} from 'aws-amplify';
    import Button from "../Button/Button.svelte";
    import Modal from "../Modal/Modal.svelte";
    import Form from "../Forms/Form.svelte";
    import {postAppointment} from "../../API/appointments.API";
    import {lookupAddress} from "../../API/mapbox.API";
    import Drop from "../Drop/Drop.svelte";
    import ClinicMasterMenu from "./ClinicMasterMenu.svelte";

    export let updateAppointments;
</script>

<header>
    <div class="left">
        <div class="logo">
            <Logo/>
        </div>
        <h1 class="uk-margin-remove">
            MedFoyer </h1>
    </div>
    <div class="right">
        <ClinicMasterMenu/>
    </div>
</header>


<style lang="scss">
    header {
        grid-area: header;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1em 3em;
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