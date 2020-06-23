<script>
    import CenterColumn from "../CenterColumn.svelte";
    import ClinicDetailsSection from "./ClinicDetailsSection.svelte";
    import PractitionerDetailsSection from "./PractitionerDetailsSection.svelte";
    import {fly} from 'svelte/transition';
</script>

<CenterColumn>
    <header class="uk-container uk-container-medium">
        <h2>Manage Clinic</h2>
        <hr/>
    </header>

    <div class="uk-flex uk-flex-wrap uk-child-width-1-2@l uk-child-width-1-1 uk-container uk-container-medium uk-margin-auto uk-margin-medium-top">
        <div in:fly={{x: -100, duration:500}} out:fly={{x: 100, duration:500}} class="uk-padding-small">
            <ClinicDetailsSection/>
        </div>
        <div in:fly={{x: 100, duration:500}} out:fly={{x: -100, duration:500}} class="uk-padding-small">
            <PractitionerDetailsSection/>
        </div>
    </div>


</CenterColumn>

<style>

</style>