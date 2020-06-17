<script>
    import AppointmentTable from './AppointmentTable.svelte';
    import CenterColumn from "../CenterColumn.svelte";
    export let update;
    let table;
    $: update = (table && table.update) || (()=>{})
</script>
<svelte:options accessors/>

<CenterColumn>
    <header class="uk-container uk-container-medium">
        <h2>Appointment Overview</h2>
    </header>

    <section class="uk-container uk-margin-medium">
        <hr/>
        <AppointmentTable on:create-appointment bind:this={table}/>
    </section>
</CenterColumn>