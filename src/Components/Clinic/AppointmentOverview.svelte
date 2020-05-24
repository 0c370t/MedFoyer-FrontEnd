<script>
    import {formatTime} from "../../helpers/datetime";
    import Button from "../Button/Button.svelte";
    import Icon from "../Icon/Icon.svelte";
    import UIkit from "uikit";
    import {deleteAppointment} from "../../API/appointments.API";
    import ClinicStaticMap from "../Map/ClinicStaticMap.svelte";

    export let appointment;
    export let updateAppointments;

    console.log(appointment);

    const deleteAppointmentHandler = () => {
        UIkit.modal.confirm('Are you sure you want to delete this appointment?', {status: "danger"}).then(() => {
            deleteAppointment(appointment.id).then(updateAppointments);
        }).catch(e => undefined)
    }

</script>

<main class="uk-width-1-1">
    <header class="uk-flex uk-flex-between uk-child-width-1-3 uk-container uk-container-expand">
        <div class="uk-flex uk-flex-left uk-flex-wrap">
            <h2 class="uk-width-1-1">{appointment.name} @ {formatTime(appointment.appointment_time)}</h2>
            <a href="{window.location.protocol}//{window.location.host}/appt/{appointment.id}" target="_blank"
               title="This functionality is for internal testing only!">
                <Button>Patient Link</Button>
            </a>
        </div>
        <div class="uk-flex uk-flex-right uk-flex-top">
            <Button on:click={deleteAppointmentHandler}>Cancel Appointment
                <Icon options={{icon:"trash"}}/>
            </Button>
        </div>
    </header>
    <div class="uk-container uk-margin-medium-top uk-flex uk-container-expand">
        <div class="uk-width-3-5 uk-section uk-section-muted uk-padding uk-flex uk-flex-top">
            {#if appointment.form}
                <dl class="uk-description-list">
                    <h3>COVID-19 Screening Results:</h3>
                    {#each appointment.form as q, i}
                        {#if q.type !== "label"}
                            <dt>{q.label}</dt>
                            {#if q.value === true}
                                <dd>Yes</dd>
                            {:else if q.value === false}
                                <dd>No</dd>
                            {:else}
                                <dd>{q.value}</dd>
                            {/if}

                        {/if}
                    {/each}
                </dl>
            {:else}
                <p>
                    {appointment.name} has not completed their COVID-19 screening yet. </p>
            {/if}
        </div>
        <div class="uk-width-2-5 uk-section uk-section-primary uk-padding-small uk-flex uk-flex-column uk-preserve-color">
            <!-- Map -->
            <div>
                {#if appointment.patient_location}
                    <div class="uk-card uk-card-body uk-box-shadow-small uk-background-default">
                        <h3>Check-in Location:</h3>
                        <hr/>
                        <ClinicStaticMap clinicPosition="{[appointment.long, appointment.lat]}" userPosition="{[appointment.patient_location[1], appointment.patient_location[0]]}"/>
                    </div>
                {:else}
                    <p class="uk-light">
                        {appointment.name} has not checked in yet.
                    </p>
                {/if}

            </div>
        </div>
    </div>

</main>

<style lang="scss">
    main {
        grid-area: main;

        header {
            padding-top: 1em;
        }
    }
</style>