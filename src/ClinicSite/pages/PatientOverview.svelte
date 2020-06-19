<script>
    import SingleColumnLayout from "../../Components/Clinic/SingleColumn/SingleColumnLayout.svelte";
    import ClinicHeader from "../../Components/Clinic/Header/ClinicHeader.svelte";
    import PatientColumn from "../../Components/Clinic/SingleColumn/PatientOverview/PatientColumn.svelte";
    export let update;
    let column;
    $: update = (column && column.update) || (()=>{})

</script>
<svelte:options accessors/>

<SingleColumnLayout>
    <ClinicHeader on:create-appointment on:create-patient/>
    <PatientColumn on:create-appointment bind:this={column}/>
</SingleColumnLayout>