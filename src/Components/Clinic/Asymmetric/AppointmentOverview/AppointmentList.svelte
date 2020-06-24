<script>
    import AppointmentItem from "./AppointmentItem.svelte";
    import Spinner from "../../../Spinner/Spinner.svelte";
    import Drop from "../../../Drop/Drop.svelte";
    import Icon from "../../../Icon/Icon.svelte";

    export let selectAppointment = () => {
    };
    export let selectedAppointmentId = {};
    export let appointments = [];
    export let title = "";
    export let loading = false;
</script>
<div class="container uk-flex uk-flex-column">
    <div class="uk-background-default uk-width-1-1 uk-margin-remove uk-padding-small uk-padding-remove-right uk-flex uk-flex-between"
         id="not-checked-in-header">
        <h3 class="uk-margin-remove uk-flex uk-flex-middle">
            {title}
        </h3>
        <slot name="header">
            <span></span>
        </slot>
    </div>
    <div class="appointment-container uk-background-primary uk-position-relative">
        <Spinner show={loading}/>
        {#each appointments as appointment, i}
            <AppointmentItem appt="{appointment}" active="{appointment.appointment_id === selectedAppointmentId}"
                             on:click={()=>selectAppointment(appointment.appointment_id)} index={i}/>
        {/each}
    </div>

</div>

<style>
    div.container {
        flex: 1;
    }

    .appointment-container {
        overflow-y: scroll;
        flex:1;
    }
    .inherit-color{
        color:inherit;
    }
</style>