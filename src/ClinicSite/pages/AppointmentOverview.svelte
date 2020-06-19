<script>
    import SingleColumnLayout from "../../Components/Clinic/SingleColumn/SingleColumnLayout.svelte";
    import ClinicHeader from "../../Components/Clinic/Header/ClinicHeader.svelte";
    import AppointmentColumn from "../../Components/Clinic/SingleColumn/AppointmentOverview/AppointmentColumn.svelte";
    export let update;
    let column;
    $: update = (column && column.update) || (()=>{})
</script>
<svelte:options accessors/>
<svelte:head>
    <link href='https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css' rel='stylesheet'/>
</svelte:head>


<SingleColumnLayout>
    <ClinicHeader on:create-appointment on:create-patient/>
    <AppointmentColumn on:create-appointment bind:this={column}/>
</SingleColumnLayout>