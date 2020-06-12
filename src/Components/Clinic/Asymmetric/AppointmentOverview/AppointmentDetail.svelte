<script>
    import {formatForDisplay, formatTime} from "../../../../helpers/datetime";
    import Button from "../../../Button/Button.svelte";
    import Icon from "../../../Icon/Icon.svelte";
    import UIkit from "uikit";
    import {deleteAppointment} from "../../../../API/appointments.API";
    import ClinicStaticMap from "../../../Map/ClinicStaticMap.svelte";
    import AsymmetricMain from "../AsymmetricMain.svelte";

    export let appointment;
    export let updateAppointments;

    const deleteAppointmentHandler = () => {
        UIkit.modal.confirm('Are you sure you want to delete this appointment?', {status: "danger"}).then(() => {
            deleteAppointment(appointment.id).then(updateAppointments);
        }).catch(e => undefined)
    };
    const summonPatientPhoneNumber = () => {
        UIkit.modal.alert(`The patient's contact phone number is ${appointment.phone_num}`);
    }
</script>
<AsymmetricMain emptyMessage="Please select an appointment" hasContent={appointment}>
    <header class="uk-flex uk-flex-between uk-child-width-1-3 uk-container uk-container-expand">
        <div class="uk-flex uk-flex-left uk-flex-wrap">
            <h2 class="uk-width-1-1">{appointment.patient ? appointment.patient.given_name : "Unnamed"} @ {formatTime(appointment.appointment_time)}</h2>
            <a href="{window.location.protocol}//{window.location.host}/appt/{appointment.appointment_id}" target="_blank"
               class="uk-margin-small-right" title="This functionality is for internal testing only!">
                <Button>Patient Link
                    <Icon options={{icon:"link"}}/>
                </Button>
            </a>
            <Button on:click={summonPatientPhoneNumber}>Contact Patient
                <Icon options={{icon:"phone"}}/>
            </Button>
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
                            {:else if q.options}
                                <dd>{q.options.filter(q1 => q1.value === q.value)[0].label}</dd>
                            {:else}
                                <dd>{q.value}</dd>
                            {/if}

                        {/if}
                    {/each}
                </dl>
            {:else}
                <p>
                    {appointment.patient ? appointment.patient.given_name + " " + appointment.patient.last_name : "Unnamed"} has not completed their COVID-19 screening yet. </p>
            {/if}
        </div>
        <div class="uk-width-2-5 uk-section uk-section-primary uk-padding-small uk-flex uk-flex-column uk-preserve-color">
            <!-- Map -->
            <div>
                <div class="uk-card uk-card-body uk-box-shadow-small uk-background-default uk-margin-small-bottom">
                    <h3>Appointment Information:</h3>
                    <hr/>
                    <dl class="uk-description-list uk-description-list-divider">
                        <dt>Appointment Time:</dt>
                        <dd>{formatForDisplay(appointment.appointment_time)}
                            at {formatTime(appointment.appointment_time)}</dd>

                        <dt>Patient Phone Number:</dt>
                        <dd>{appointment.phone_num ? appointment.phone_num : "Not available"}</dd>
                        <dt>Check-in Time:</dt>
                        {#if appointment.checkin_time}
                            <dd>{formatTime(new Date(appointment.checkin_time))}</dd>
                        {:else}
                            <dd>{appointment.patient ? appointment.patient.given_name + " " + appointment.patient.last_name : "Unnamed"} has not checked in yet.</dd>
                        {/if}
                    </dl>
                </div>
                {#if appointment.patient_location}
                    <div class="uk-card uk-card-body uk-box-shadow-small uk-background-default uk-margin-small-bottom">
                        <h3>Check-in Location:</h3>
                        <hr/>
                        <ClinicStaticMap clinicPosition="{[appointment.long, appointment.lat]}"
                                         userPosition="{[appointment.patient_location[1], appointment.patient_location[0]]}"/>
                    </div>
                {/if}

            </div>
        </div>
    </div>
</AsymmetricMain>
<style lang="scss">
    main {
        grid-area: main;

        header {
            padding-top: 1em;
        }
    }
</style>