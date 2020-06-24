<script>
    import ClinicHeader from '../../Components/Clinic/Header/ClinicHeader.svelte';
    import AppointmentDetail from "../../Components/Clinic/Asymmetric/AppointmentOverview/AppointmentDetail.svelte";
    import {onMount, setContext} from 'svelte';

    import AppointmentAside from "../../Components/Clinic/Asymmetric/AppointmentOverview/AppointmentAside.svelte";
    import {getFilterFunction} from "../../helpers/appointments";

    import {getClient, query} from 'svelte-apollo';
    import {GET_APPOINTMENT_DASHBOARD} from "../../API/queries/appointments.GQL";
    import AsymmetricLayout from "../../Components/Clinic/Asymmetric/AsymmetricLayout.svelte";
    import {getDefaultFromTo} from "../../helpers/datetime";

    const client = getClient();
    let all_appointments = [];
    let appointments = [];
    let selectedAppointmentId = false;
    let [defaultFrom, defaultTo] = getDefaultFromTo();
    let filterValues = {
        from: defaultFrom,
        to: defaultTo,
        location: "ALL",
        practitioner: "ALL",
        includeSummoned: false
    };
    let result__ = query(client, {
        query: GET_APPOINTMENT_DASHBOARD,
        variables: {
            start_time: filterValues.from.getTime(),
            end_time: filterValues.to.getTime(),
            clinic_location_id: filterValues.location === "ALL" ? "" : filterValues.location
        }
    });
    $: $result__.then(r => {
        loading = false;
        all_appointments = r.data.listAppointments;
        return r;
    });
    export const update = async () => {
        loading = true;
        let r = await result__.refetch({
            start_time: filterValues.from.getTime(),
            end_time: filterValues.to.getTime(),
            clinic_location_id: filterValues.location === "ALL" ? "" : filterValues.location
        });
        all_appointments = r.data.listAppointments;
        all_appointments.forEach(a => {
            // Ensure dates are dates
            if (!(a.appointment_time instanceof Date)) {
                a.appointment_time = new Date(a.appointment_time);
            }
        });
        all_appointments = all_appointments;
        applyFilters();
        if (!selectedAppointmentId || !appointments.filter(a => a.appointment_id === selectedAppointmentId)) {
            selectedAppointmentId = false;
        }

    };
    setContext("updateAppointments", update);

    const updateFilters = (e) => {
        filterValues = e.detail;
        update();
    };

    const applyFilters = () => {
        appointments = all_appointments.filter(getFilterFunction(filterValues));
        loading = false;
    };

    onMount(update);
    let loading = true;
</script>

<AsymmetricLayout>
    <ClinicHeader on:updateappts={update} on:create-appointment on:create-patient/>
    <AppointmentAside {appointments} bind:selectedAppointmentId {filterValues}
                      on:filter={updateFilters} {loading}/>
    <AppointmentDetail appointment_id="{selectedAppointmentId}"/>
</AsymmetricLayout>