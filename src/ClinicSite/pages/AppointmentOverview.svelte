<script>
    import ClinicHeader from '../../Components/Clinic/Header/ClinicHeader.svelte';
    import AppointmentDetail from "../../Components/Clinic/Asymmetric/AppointmentOverview/AppointmentDetail.svelte";
    import {onMount, setContext} from 'svelte';

    import AppointmentAside from "../../Components/Clinic/Asymmetric/AppointmentOverview/AppointmentAside.svelte";
    import {getFilterFunction} from "../../helpers/appointments";

    import {getClient, query} from 'svelte-apollo';
    import {GET_APPOINTMENT_OVERVIEW} from "../../API/queries/appointments.GQL";
    import AsymmetricLayout from "../../Components/Clinic/Asymmetric/AsymmetricLayout.svelte";

    const client = getClient();
    let all_appointments = [];
    let appointments = [];
    let selectedAppointment = false;
    let defaultFrom = new Date();
    defaultFrom.setHours(8, 0);
    let defaultTo = new Date();
    defaultTo.setHours(17, 0);
    let filterValues = {
        from: defaultFrom,
        to: defaultTo,
    };
    let result__ = query(client, {query: GET_APPOINTMENT_OVERVIEW});
    $: $result__.then(r => {
        loading = false;
        all_appointments = r.data.listAppointments;
        return r;
    });
    export const updateAppointments = async () => {
        loading = true;
        let r = await result__.refetch();
        all_appointments = r.data.listAppointments;
        all_appointments.forEach(a => {
            // Ensure dates are dates
            if (!(a.appointment_time instanceof Date)) {
                a.appointment_time = new Date(a.appointment_time);
            }
        });
        all_appointments = all_appointments;
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
        appointments = all_appointments.filter(getFilterFunction(filterValues));
        loading = false;
    };

    onMount(updateAppointments);
    let loading = true;
</script>

<AsymmetricLayout>
    <ClinicHeader on:updateappts={updateAppointments} on:create-appointment on:create-patient/>
    <AppointmentAside {appointments} {all_appointments} bind:selectedAppointment {filterValues} on:filter={updateFilters} {loading}/>
    <AppointmentDetail appointment="{selectedAppointment}"/>
</AsymmetricLayout>