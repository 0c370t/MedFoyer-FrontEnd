<script>
    import Icon from "../Icon/Icon.svelte";

    import {sortByAppointmentTime, sortByCheckInTime} from '../../helpers/appointments';
    import {formatForDisplay} from '../../helpers/datetime';
    import AppointmentList from "./AppointmentList.svelte";
    import FilterPanel from "./FilterPanel.svelte";

    export let appointments = [];
    export let selectedAppointment = false;
    export let updateAppointments = () => {};
    export let filterValues;

    const selectAppointment = (a) => selectedAppointment = a;

    let checkedInAppointments = [];
    let notCheckedInAppointments = [];
    $: checkedInAppointments = appointments.filter(a => a.patient_location).sort(sortByCheckInTime);
    $: notCheckedInAppointments = appointments.filter(a => !a.patient_location).sort(sortByAppointmentTime);



</script>

<aside class="uk-background-default">
    <div class="uk-flex uk-flex-middle uk-flex-column uk-text-center">
        <h2 class="uk-margin-remove uk-width-1-1">Appointment Overview</h2>
        <span class="uk-text-meta">{formatForDisplay(filterValues.date)}</span>
    </div>


    <AppointmentList title="Checked In" appointments={checkedInAppointments} {selectedAppointment} {selectAppointment}>
        <div slot="header">
            <button class="uk-button uk-button-default" on:click={updateAppointments}>
                <Icon options={{icon: "refresh"}}/>
            </button>
                <FilterPanel on:filter {filterValues}/>

        </div>
    </AppointmentList>

    <AppointmentList title="Not Checked In" appointments={notCheckedInAppointments} {selectedAppointment}
                     {selectAppointment}/>


</aside>

<style lang="scss">
    aside {
        position: relative;
        display: flex;
        flex-direction: column;

    }
</style>