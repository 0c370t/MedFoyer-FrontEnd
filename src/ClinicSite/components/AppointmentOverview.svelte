<script>
    export let appointment;
</script>

<main>
    <h2>{appointment.name}</h2>
    <p>
        <a href="https://dev.medfoyer.com/appt/{appointment.id}" target="_blank">https://dev.medfoyer.com/appt/{appointment.id}</a>
    </p>
</main>

<style>
    main{
        grid-area:main;
    }
</style>