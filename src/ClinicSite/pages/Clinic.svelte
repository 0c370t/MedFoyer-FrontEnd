<script>
    import ClinicHeader from '../../Components/Clinic/ClinicHeader.svelte'
    import {getAppointments} from "../../API/appointments.API";
    import AppointmentOverview from "../../Components/Clinic/AppointmentOverview.svelte";
    import {onMount, setContext} from 'svelte';
    import {appt} from '../../helpers/stores';

    import ClinicAside from "../../Components/Clinic/ClinicAside.svelte";
    import {getFilterFunction} from "../../helpers/appointments";
    import {getCurrentDateForInput, toAWSDate} from "../../helpers/datetime";

    import {getClient, mutate, query} from 'svelte-apollo';
    import {GET_APPOINTMENT_OVERVIEW} from "../../API/queries/appointments.GQL";
    import {CREATE_PATIENT} from '../../API/queries/patients.GQL';
    import Button from "../../Components/Button/Button.svelte";

    const client = getClient();

    let graph_appointments = query(client, {query: GET_APPOINTMENT_OVERVIEW});
    let appointments = [];
    let selectedAppointment = false;
    let defaultFrom = new Date();
    defaultFrom.setHours(8);
    defaultFrom.setMinutes(0);
    let defaultTo = new Date();
    defaultTo.setHours(17);
    defaultTo.setMinutes(0);
    let filterValues = {
        from: defaultFrom,
        to: defaultTo,
    };

    const updateAppointments = () => {
        /*getAppointments().then(result => {
            appointments = result;
            appointments.forEach(a => {
                // Ensure dates are dates
                if (!(a.appointment_time instanceof Date)) {
                    a.appointment_time = new Date(a.appointment_time);
                }
            });

            if (!selectedAppointment || !appointments.filter(a => a.id === selectedAppointment.id)) {
                selectedAppointment = false;
            } else {
                selectedAppointment = appointments.filter(a => a.id === selectedAppointment.id)[0];
            }
            applyFilters();
        });*/
    };
    setContext("updateAppointments", updateAppointments);

    const updateFilters = (e) => {
        filterValues = e.detail;
        updateAppointments();
    };

    const applyFilters = () => {
        appointments = appointments.filter(getFilterFunction(filterValues));
    };

    onMount(updateAppointments);
    onMount(() => appt.set({}));
    onMount(async () => {
        let x = await $graph_appointments;
    });
</script>
<div class="layout">
    <ClinicHeader {updateAppointments}/>
    <ClinicAside {appointments} bind:selectedAppointment {updateAppointments} {filterValues} on:filter={updateFilters}/>

    {#if selectedAppointment}
        <main>
            <AppointmentOverview appointment="{selectedAppointment}" {updateAppointments}/>
        </main>
    {:else}
        <main class="uk-text-center uk-padding">
            <h3>Please select an appointment</h3>
        </main>
    {/if}
</div>
<style lang="scss">
    div.layout {
        height: 100vh;
        display: grid;
        grid-template-columns: 25% 75%;
        grid-template-rows: 5em 1fr;
        grid-template-areas: "header header" "aside main";
        position: relative;
    }

    main {
        grid-area: main;
        overflow-y: scroll;
    }
</style>