<script>


    import Icon from "../../../Icon/Icon.svelte";
    import AppointmentList from "./AppointmentList.svelte";
    import FilterPanel from "./AppointmentFilterPanel.svelte";
    import {formatForDisplay, isToday} from "../../../../helpers/datetime";
    import {sortByAppointmentTime, sortByCheckInTime} from "../../../../helpers/appointments";
    import AsymmetricAside from "../AsymmetricAside.svelte";
    import Spinner from "../../../Spinner/Spinner.svelte";
    import {getContext} from "svelte";

    export let appointments = [];
    export let all_appointments = [];
    export let loading = false;
    export let selectedAppointment = false;
    const updateAppointments = getContext("updateAppointments");
    export let filterValues;

    const selectAppointment = (a) => selectedAppointment = a;

    let checkedInAppointments = [];
    let countCheckedInAppointmentsToday = 0;
    let countCheckedInAppointmentsTotal = 0;
    let notCheckedInAppointments = [];
    let countNotCheckedInAppointmentsToday = 0;
    let countNotCheckedInAppointmentsTotal = 0;
    $: checkedInAppointments = appointments.filter(a => a.check_in_time).sort(sortByCheckInTime);
    $: notCheckedInAppointments = appointments.filter(a => !a.check_in_time).sort(sortByAppointmentTime);

    $: countCheckedInAppointmentsToday = all_appointments.filter(a => a.check_in_time && isToday(a.appointment_time) && !checkedInAppointments.includes(a)).length;
    $: countNotCheckedInAppointmentsToday = all_appointments.filter(a => !a.check_in_time && isToday(a.appointment_time)  && !notCheckedInAppointments.includes(a)).length;
    $: countCheckedInAppointmentsTotal = all_appointments.filter(a => a.check_in_time  && !checkedInAppointments.includes(a)).length;
    $: countNotCheckedInAppointmentsTotal = all_appointments.filter(a => !a.check_in_time  && !notCheckedInAppointments.includes(a)).length;


</script>


<AsymmetricAside>
        <h2 class="uk-margin-remove uk-width-1-1" slot="header">Appointment Overview</h2>
        <span class="uk-text-meta" slot="header">{formatForDisplay(filterValues.from, true)} - {formatForDisplay(filterValues.to, true)}</span>

    <AppointmentList title="Checked In" appointments={checkedInAppointments} {selectedAppointment} {selectAppointment} {loading} notShownToday={countCheckedInAppointmentsToday} notShownTotal={countCheckedInAppointmentsTotal}>
        <div slot="header">
            <button class="uk-button uk-button-default" on:click={updateAppointments}>
                <Icon options={{icon: "refresh"}}/>
            </button>
            <FilterPanel on:filter {filterValues}/>
        </div>
    </AppointmentList>

    <AppointmentList title="Not Checked In" appointments={notCheckedInAppointments} {selectedAppointment} {selectAppointment} {loading} notShownToday={countNotCheckedInAppointmentsToday} notShownTotal={countNotCheckedInAppointmentsTotal}>
        <div slot="header">

        </div>
    </AppointmentList>


</AsymmetricAside>