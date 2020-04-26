<script>
    import ClinicHeader from '../../Components/Clinic/ClinicHeader.svelte'
    import {getAppointments} from "../../API/appointments.API";
    import AppointmentItem from "../../Components/Clinic/AppointmentItem.svelte";
    import AppointmentOverview from "../../Components/Clinic/AppointmentOverview.svelte";
    import {onMount} from 'svelte';
    let appointments;
    let selectedAppointment = false;

    const updateAppointments = () => {
        getAppointments().then(result => appointments = result);
    };

    const selectAppointment = (appt) => {
        selectedAppointment = appt;
    };
    onMount(updateAppointments)

</script>

<div>
    <ClinicHeader {updateAppointments}/>

    <aside>
        {#if appointments}
            {#each appointments as appointment}
                <AppointmentItem appt="{appointment}" active="{appointment === selectedAppointment}" on:click={()=>selectAppointment(appointment)}/>
            {/each}
        {/if}

    </aside>
    {#if selectedAppointment}
        <AppointmentOverview appointment="{selectedAppointment}"/>
    {:else}
        <main></main>
    {/if}
</div>
<style lang="scss">
    div {
        height: 100vh;
        display: grid;
        grid-template-columns: 25% 75%;
        grid-template-rows: 5em 1fr;
        grid-template-areas: "header header" "aside main";
    }

    aside {
        background-color: rgba(0, 0, 0, 0.2);
    }

    main {
        grid-area: main;
    }
</style>