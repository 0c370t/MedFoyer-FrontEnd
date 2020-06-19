<script>
    import {formatForDisplay, formatTime} from "../../../../helpers/datetime";
    import Button from "../../../Button/Button.svelte";
    import Icon from "../../../Icon/Icon.svelte";
    import UIkit from "uikit";
    import ClinicStaticMap from "../../../Map/ClinicStaticMap.svelte";
    import AsymmetricMain from "../AsymmetricMain.svelte";
    import {DELETE_APPOINTMENT, RESEND_CHECKIN_LINK, SUMMON_PATIENT} from "../../../../API/queries/appointments.GQL";
    import {getClient, mutate} from "svelte-apollo";
    import {getContext} from "svelte";
    import Modal from "../../../Modal/Modal.svelte";
    import {questionIsFlagged} from "../../../../helpers/forms/form-utils";

    export let appointment;
    const updateAppointments = getContext("updateAppointments");
    const client = getClient();
    let summonPatientButtonLoading = false;
    const deleteAppointmentHandler = () => {
        UIkit.modal.confirm('Are you sure you want to delete this appointment?', {status: "danger"}).then(async () => {
            await mutate(client, {
                mutation: DELETE_APPOINTMENT,
                variables: {
                    appointment_id: appointment.appointment_id
                }
            });
            updateAppointments();
        }).catch(e => console.log(e))
    };
    const summonPatient = async () => {
        summonPatientButtonLoading = true;
        await mutate(client, {
            mutation: SUMMON_PATIENT,
            variables: {
                appointment_id: appointment.appointment_id
            }
        });
        UIkit.modal.alert("Notification Sent");
        updateAppointments();
        summonPatientButtonLoading = false;
    };
    const resendCheckInLink = async () => {
        let message = "";
        switch (appointment.reminder_status) {
            case "NONE_SENT":
            default:
                message = `${appointment.patient.given_name} has not yet been notified via MedFoyer. Would you like to send their check-in link now?`;
                break;
            case "FIRST_REMINDER_SENT":
                message = `${appointment.patient.given_name} has been reminded of their appointment already. Would you like to send their check-in link now?`
                break;
            case "CHECK_IN_REMINDER_SENT":
                message = `${appointment.patient.given_name} has already received their check-in link. Would you like to send it again?`;
                break;
            case "OPT_OUT":
                UIkit.modal.alert(`${appointment.patient.given_name} has opted out of receiving SMS Messages!`);
                return;
        }
        UIkit.modal.confirm(message).then(e => {
            mutate(client, {
                mutation: RESEND_CHECKIN_LINK,
                variables: {
                    appointment_id: appointment.appointment_id
                }
            })
        }).catch(e => undefined);


    }
</script>
<AsymmetricMain emptyMessage="Please select an appointment" hasContent={appointment}>
    <header class="uk-container uk-container-expand">
        <div class="uk-flex uk-flex-between uk-child-width-1-3 ">

            <div class="uk-flex uk-flex-left uk-flex-wrap">
                <h2 class="uk-width-1-1">{appointment.patient ? appointment.patient.given_name : "Unnamed"}
                    @ {formatTime(appointment.appointment_time)}</h2>
            </div>
            <div class="uk-flex uk-flex-right uk-flex-top">
                <Button on:click={deleteAppointmentHandler}>
                    Cancel Appointment
                    <Icon options={{icon:"trash"}}/>
                </Button>
            </div>
        </div>
        <div class="uk-width-1-1 uk-margin-remove uk-flex">
            <Button _class="uk-margin-small-right" on:click={resendCheckInLink}
                    disabled={appointment.status === "SUMMONED"}>
                Resend Patient Link
                <Icon options={{icon:"link"}}/>
            </Button>
            <Button on:click={summonPatient}
                    disabled={Boolean(!appointment.check_in_time) || appointment.status === "SUMMONED" || summonPatientButtonLoading}
                    title={Boolean(!appointment.check_in_time) ? "Patient must check in first!" : ""}>
                Summon Patient
                <Icon options={{icon:"phone"}}/>
            </Button>
        </div>
    </header>
    <div class="uk-container uk-margin-medium-top uk-flex uk-container-expand">
        <div class="uk-width-3-5 uk-section uk-section-muted uk-padding uk-flex uk-flex-top">
            {#if appointment.forms.length > 0}
                <dl class="uk-description-list">
                    <h3>COVID-19 Screening Results:</h3>
                    {#each JSON.parse(appointment.forms[0]) as q, i}
                        {#if q.type !== "label"}
                            <dt>{q.label}</dt>
                            <dd class:uk-text-bold={questionIsFlagged(q)} class:uk-text-danger={questionIsFlagged(q)}>
                                {#if q.value === true}
                                    Yes
                                {:else if q.value === false}
                                    No
                                {:else if q.options}
                                    {q.options.filter(q1 => q1.value === q.value)[0].label}
                                {:else}
                                    {q.value}
                                {/if}
                            </dd>
                        {/if}
                    {/each}
                </dl>
            {:else}
                <p>
                    {appointment.patient ? appointment.patient.given_name + " " + appointment.patient.last_name : "Unnamed"}
                    has not completed their COVID-19 screening yet. </p>
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
                        <dd>{appointment.patient.phone_number ? appointment.patient.phone_number : "Not available"}</dd>
                        <dt>Check-in Time:</dt>
                        {#if appointment.check_in_time}
                            <dd>{formatTime(new Date(appointment.check_in_time))}</dd>
                        {:else}
                            <dd>{appointment.patient ? appointment.patient.given_name + " " + appointment.patient.last_name : "Unnamed"}
                                has not checked in yet.
                            </dd>
                        {/if}
                        {#if appointment.wait_list_priority}
                            <dt>Position on waitlist</dt>
                            <dd>{appointment.wait_list_priority}</dd>
                        {/if}
                    </dl>
                </div>
                {#if appointment.check_in_time}
                    <div class="uk-card uk-card-body uk-box-shadow-small uk-background-default uk-margin-small-bottom">
                        <h3>Check-in Location:</h3>
                        <hr/>
                        <ClinicStaticMap
                                clinicPosition="{[appointment.clinic_location.longitude, appointment.clinic_location.latitude]}"
                                userPosition="{[appointment.check_in_longitude, appointment.check_in_latitude]}"/>
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