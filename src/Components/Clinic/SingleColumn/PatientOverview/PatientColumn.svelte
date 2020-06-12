<script>
    import PatientTable from './PatientTable.svelte';
</script>

<main class="container uk-section">
    <header class="uk-container uk-container-medium">
        <h2>Patient Overview</h2>
    </header>

    <section class="uk-container uk-margin-medium">
        <hr/>
        <PatientTable on:create-appointment/>
    </section>
</main>

<style>
    .container {
        background-color: white;
        grid-area: body;
    }
</style>