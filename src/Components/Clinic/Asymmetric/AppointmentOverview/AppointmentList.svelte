<script>
    import AppointmentItem from "./AppointmentItem.svelte";
    import Spinner from "../../../Spinner/Spinner.svelte";
    import Drop from "../../../Drop/Drop.svelte";
    import Icon from "../../../Icon/Icon.svelte";

    export let selectAppointment = () => {
    };
    export let selectedAppointment = {};
    export let appointments = [];
    export let title = "";
    export let loading = false;
    export let notShownToday = 0;
    export let notShownTotal = 0;
</script>
<div class="container uk-flex uk-flex-column">
    <div class="uk-background-default uk-width-1-1 uk-margin-remove uk-padding-small uk-padding-remove-right uk-flex uk-flex-between"
         id="not-checked-in-header">
        <h3 class="uk-margin-remove uk-flex uk-flex-middle">
            {title}
            <Drop mode="hover" pos="right" padsize="small" _class="uk-width-auto uk-card-secondary">
                <span slot="full-button" class="uk-margin-small-left">
                    <Icon icon="info"/>
                </span>
                <table class="uk-table uk-table-small uk-text-small uk-table-shrink uk-table-divider uk-light">
                    <tr>
                        <th colspan="2" class="uk-text-center inherit-color">
                            Appointments Not Shown
                        </th>
                    </tr>
                    <tr>
                        <th class="inherit-color">Today</th>
                        <td class="inherit-color">{notShownToday}</td>
                    </tr>
                    <tr>
                        <th class="inherit-color">Total</th>
                        <td class="inherit-color">{notShownTotal}</td>
                    </tr>
                </table>
            </Drop>
        </h3>
        <slot name="header">
            <span></span>
        </slot>
    </div>
    <div class="appointment-container uk-background-primary uk-position-relative">
        <Spinner show={loading}/>
        {#each appointments as appointment, i}
            <AppointmentItem appt="{appointment}" active="{appointment === selectedAppointment}"
                             on:click={()=>selectAppointment(appointment)} index={i}/>
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