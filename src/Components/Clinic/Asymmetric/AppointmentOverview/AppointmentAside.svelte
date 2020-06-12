<script>


    import Icon from "../../../Icon/Icon.svelte";
    import AppointmentList from "./AppointmentList.svelte";
    import FilterPanel from "./AppointmentFilterPanel.svelte";
    import {formatForDisplay} from "../../../../helpers/datetime";
    import {sortByAppointmentTime, sortByCheckInTime} from "../../../../helpers/appointments";
    import AsymmetricAside from "../AsymmetricAside.svelte";

    export let appointments = [];
    export let selectedAppointment = false;
    export let updateAppointments = () => {
    };
    export let filterValues;

    const selectAppointment = (a) => selectedAppointment = a;

    let checkedInAppointments = [];
    let notCheckedInAppointments = [];
    $: checkedInAppointments = appointments.filter(a => a.patient_location).sort(sortByCheckInTime);
    $: notCheckedInAppointments = appointments.filter(a => !a.patient_location).sort(sortByAppointmentTime);


</script>


<AsymmetricAside>
        <h2 class="uk-margin-remove uk-width-1-1" slot="header">Appointment Overview</h2>
        <span class="uk-text-meta" slot="header">{formatForDisplay(filterValues.from, true)} - {formatForDisplay(filterValues.to, true)}</span>

    <AppointmentList title="Checked In" appointments={checkedInAppointments} {selectedAppointment} {selectAppointment}>
        <div slot="header">
            <button class="uk-button uk-button-default" on:click={updateAppointments}>
                <Icon options={{icon: "refresh"}}/>
            </button>
            <FilterPanel on:filter {filterValues}/>
        </div>
    </AppointmentList>

    <AppointmentList title="Not Checked In" appointments={notCheckedInAppointments} {selectedAppointment} {selectAppointment}/>


</AsymmetricAside>