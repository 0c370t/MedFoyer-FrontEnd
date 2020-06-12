<script>
    import ClinicHeader from '../../Components/Clinic/Header/ClinicHeader.svelte'
    import AppointmentOverview from "../../Components/Clinic/Asymmetric/AppointmentOverview/AppointmentDetail.svelte";
    import {onMount, setContext} from 'svelte';
    import {appt} from '../../helpers/stores';

    import AppointmentAside from "../../Components/Clinic/Asymmetric/AppointmentOverview/AppointmentAside.svelte";
    import {getFilterFunction} from "../../helpers/appointments";

    import {getClient, query} from 'svelte-apollo';
    import {GET_APPOINTMENT_OVERVIEW} from "../../API/queries/appointments.GQL";
    import AsymmetricLayout from "../../Components/Clinic/Asymmetric/AsymmetricLayout.svelte";

    const client = getClient();

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
    let result__ = query(client, {query: GET_APPOINTMENT_OVERVIEW});
    $result__.then(r => {
        loading = false;
        appointments = r.data.listAppointments;
        return r;
    });
    const updateAppointments = async () => {
        loading = true;
        await result__.refetch();
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
    };
    setContext("updateAppointments", updateAppointments);

    const updateFilters = (e) => {
        filterValues = e.detail;
        updateAppointments();
    };

    const applyFilters = () => {
        appointments = appointments.filter(getFilterFunction(filterValues));
        loading = false;
    };

    onMount(updateAppointments);
    onMount(() => appt.set({}));
    let loading = true;
</script>

<AsymmetricLayout>
    <ClinicHeader on:updateappts={updateAppointments} on:create-appointment on:create-patient/>
    <AppointmentAside {appointments} bind:selectedAppointment {updateAppointments} {filterValues} on:filter={updateFilters} {loading}/>
    <AppointmentOverview appointment="{selectedAppointment}" {updateAppointments}/>
</AsymmetricLayout>