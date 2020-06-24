<script>


    import Icon from "../../../Icon/Icon.svelte";
    import AppointmentList from "./AppointmentList.svelte";
    import FilterPanel from "./AppointmentFilterPanel.svelte";
    import {formatForDisplay, isToday} from "../../../../helpers/datetime";
    import {sortByAppointmentTime, sortByCheckInTime} from "../../../../helpers/appointments";
    import AsymmetricAside from "../AsymmetricAside.svelte";
    import {getContext} from "svelte";
    import Button from "../../../Button/Button.svelte";

    export let appointments = [];
    export let loading = false;
    export let selectedAppointmentId = false;
    const updateAppointments = getContext("updateAppointments");
    export let filterValues;

    const selectAppointment = (a) => selectedAppointmentId = a;

    let checkedInAppointments = [];
    let notCheckedInAppointments = [];
    $: checkedInAppointments = appointments.filter(a => a.check_in_time).sort(sortByCheckInTime);
    $: notCheckedInAppointments = appointments.filter(a => !a.check_in_time).sort(sortByAppointmentTime);
</script>


<AsymmetricAside>
        <h2 class="uk-margin-remove uk-width-1-1" slot="header">Appointment Overview</h2>
        <span class="uk-text-meta" slot="header">{formatForDisplay(filterValues.from, true)} - {formatForDisplay(filterValues.to, true)}</span>

    <AppointmentList title="Checked In" appointments={checkedInAppointments} {selectedAppointmentId} {selectAppointment} {loading}>
        <div slot="header" class="uk-flex">
            <Button on:click={updateAppointments} disabled={loading} _class="uk-margin-small-right">
                <Icon options={{icon: "refresh"}}/>
            </Button>
            <FilterPanel on:filter {filterValues} {loading}/>
        </div>
    </AppointmentList>

    <AppointmentList title="Not Checked In" appointments={notCheckedInAppointments} {selectedAppointmentId} {selectAppointment} {loading}>
        <div slot="header">

        </div>
    </AppointmentList>


</AsymmetricAside>