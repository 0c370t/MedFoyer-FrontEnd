<script>
    import Logo from "../../../svg/Logo.svelte";
    import {user} from "../../../helpers/clinic_stores";
    import ClinicMasterMenu from "./ClinicMasterMenu.svelte";
    import Button from "../../Button/Button.svelte";
</script>

<header class="uk-padding-small" id="master-header">
    <div class="left">
        <div class="logo uk-margin-small-right">
            <Logo/>
        </div>
        <h1 class="uk-margin-remove"> MedFoyer </h1>
    </div>
    <div class="right uk-flex">
        <Button disabled={true} _class="uk-margin-small-right">
            Welcome, {$user.username || ""}
        </Button>
        <ClinicMasterMenu on:updateappts on:create-appointment on:create-patient/>
    </div>
</header>


<style lang="scss">
    header {
        background-color:white;
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