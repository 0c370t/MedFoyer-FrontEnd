<script>
    import PatientTable from './PatientTable.svelte';
    import CenterColumn from "../CenterColumn.svelte";
</script>

<CenterColumn>
    <header class="uk-container uk-container-medium">
        <h2>Patient Overview</h2>
    </header>

    <section class="uk-container uk-margin-medium">
        <hr/>
        <PatientTable on:create-appointment/>
    </section>
</CenterColumn>