<script>
    import AppointmentItem from "./AppointmentItem.svelte";
    import Spinner from "../../../Spinner/Spinner.svelte";

    export let selectAppointment = () => {
    };
    export let selectedAppointment = {};
    export let appointments = [];
    export let title = "";
    export let loading = false;
</script>
<div class="container">
    <div class="uk-background-default uk-width-1-1 uk-margin-remove uk-padding-small uk-padding-remove-right uk-flex uk-flex-between"
         id="not-checked-in-header">
        <h3 class="uk-margin-remove">{title}</h3>
        <slot name="header"/>
    </div>
    <div class="appointment-container uk-background-primary uk-position-relative">
        <Spinner show={loading}/>
        {#each appointments as appointment}
            <AppointmentItem appt="{appointment}" active="{appointment === selectedAppointment}"
                             on:click={()=>selectAppointment(appointment)}/>
        {/each}
    </div>

</div>

<style>
    div.container {
        flex: 1;
    }

    .appointment-container {
        overflow-y: scroll;
        height: calc(100% - 4em);
    }
</style>