<script>
    import SingleColumnLayout from "../../Components/Clinic/SingleColumn/SingleColumnLayout.svelte";
    import ClinicHeader from "../../Components/Clinic/Header/ClinicHeader.svelte";
    import AppointmentColumn from "../../Components/Clinic/SingleColumn/AppointmentOverview/AppointmentColumn.svelte";
    export let update;
    let column;
    $: update = (column && column.update) || (()=>{})
</script>
<svelte:options accessors/>

<SingleColumnLayout>
    <ClinicHeader on:create-appointment on:create-patient/>
    <AppointmentColumn on:create-appointment bind:this={column}/>
</SingleColumnLayout>