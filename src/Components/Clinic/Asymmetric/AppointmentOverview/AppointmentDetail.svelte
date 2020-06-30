<script>
    import {formatForDisplay, formatTime} from "../../../../helpers/datetime";
    import Button from "../../../Button/Button.svelte";
    import Icon from "../../../Icon/Icon.svelte";
    import UIkit from "uikit";
    import AsymmetricMain from "../AsymmetricMain.svelte";
    import {
        DELETE_APPOINTMENT,
        RESEND_CHECKIN_LINK,
        SEND_TELEHEALTH_LINK,
        SUMMON_PATIENT,
        GET_APPOINTMENT_DETAIL, UPDATE_APPOINTMENT,
    } from "../../../../API/queries/appointments.GQL";
    import {getClient, mutate, query} from "svelte-apollo";
    import {getContext, onMount} from "svelte";
    import Modal from "../../../Modal/Modal.svelte";
    import Form from "../../../Forms/Form.svelte";
    import {
        addHiddenField,
        cloneForm,
        containsField, getFieldValue,
        questionIsFlagged,
        setFieldValue
    } from "../../../../helpers/forms/form-utils";
    import DetailCards from "./Details/DetailCards.svelte";
    import Spinner from "../../../Spinner/Spinner.svelte";
    import {new_appointment} from "../../../../helpers/forms/create_appointment";
    import {operation_not_supported} from "../../../../helpers/notify";

    const updateAppointments = getContext("updateAppointments");
    const client = getClient();

    export let appointment = false;
    export let appointment_id;
    let message = "Please select an appointment";
    let loading = false;
    let response;
    let edit_form = cloneForm(new_appointment);


    let mutateButtonsDisabled;
    let mutateButtonsDisabledReason;
    $: if(appointment){
        if(appointment.check_in_time){
            mutateButtonsDisabled = true;
            mutateButtonsDisabledReason = "Cannot change appointment after a patient has checked in";
        }
    }

    const updateSelf = async () => {
        message = "Please select an appointment";
        if (appointment_id) {
            loading = true;
            try {
                 response = await query(client, {
                    query: GET_APPOINTMENT_DETAIL,
                    variables: {
                        appointment_id
                    },
                    fetchPolicy: 'no-cache'
                });
                let result = await $response;
                if (result.data && result.data.getAppointment) {
                    appointment = result.data.getAppointment;
                } else {
                    throw "Appointment Not Found!";
                }
            } catch (e) {
                message = "An error has occurred.";
                console.log(e);
                appointment = false;
            }
            loading = false;
        }
    };
    $: if(appointment_id) updateSelf();


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
        actionButtonsLoading = true;
        await mutate(client, {
            mutation: SUMMON_PATIENT,
            variables: {
                appointment_id: appointment.appointment_id
            }
        });
        UIkit.modal.alert("Notification Sent");
        updateAppointments();
        actionButtonsLoading = false;
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
    };
    const sendTelehealthLink = async () => {
        actionButtonsLoading = true;
        await mutate(client, {
            mutation: SEND_TELEHEALTH_LINK,
            variables: {
                appointment_id: appointment.appointment_id
            }
        });
        UIkit.modal.alert("Telehealth link sent");
        updateAppointments();
        actionButtonsLoading = false;
    };

    let showEditModal = false;
    let editFormElement;
    const openEdit = async () => {
        setFieldValue(edit_form, "patient_id", appointment.patient.patient_id);
        setFieldValue(edit_form, "appointment_location", appointment.clinic_location.clinic_location_id);
        setFieldValue(edit_form, "practitioner", appointment.practitioner.practitioner_id);
        setFieldValue(edit_form, "appointment_time", new Date(appointment.appointment_time));
        if(containsField(edit_form, "appointment_id"))
            setFieldValue(edit_form, "appointment_id", appointment.appointment_id);
        else
            addHiddenField(edit_form, "appointment_id", appointment.appointment_id);
        edit_form = edit_form;
        showEditModal = true;
    };
    const edit = async () => {
        if (editFormElement.reportValidity()) {
            loading = true;
            showEditModal = false;
            let patient_id = getFieldValue(edit_form, "patient_id");
            let clinic_location_id = getFieldValue(edit_form, "appointment_location");
            let practitioner_id = getFieldValue(edit_form, "practitioner");
            let appointment_time = getFieldValue(edit_form, "appointment_time").getTime();
            let response = await mutate(client, {
                mutation: UPDATE_APPOINTMENT,
                variables: {
                    appointment: {
                        status: appointment.status,
                        covid_flag: appointment.covid_flag,
                        reminder_status: appointment.reminder_status,
                        appointment_time,
                        clinic_location_id,
                        patient_id,
                        practitioner_id
                    },
                    appointment_id
                }
            });
            debugger;
            if(response.hasOwnProperty("data") && response.data.hasOwnProperty("updateAppointment") && response.data.updateAppointment){
                appointment = response.data.updateAppointment;
            } else {
                await updateSelf();
            }
        }
        operation_not_supported();
        loading = false;
    };

    let actionButtonsLoading = false;
    let actionButtonsDisabled;
    $: if (appointment) actionButtonsDisabled = Boolean(!appointment.check_in_time)          // Patient is not checked in
            || appointment.status === "SUMMONED"   // patient is already interacting with doctor
            || appointment.status === "TELEHEALTH"
            || actionButtonsLoading;         // button is loading
    let actionButtonsDisabledReason;
    $: if (appointment) actionButtonsDisabledReason = Boolean(!appointment.check_in_time)
            ? "Patient must check in first!"
            : appointment.status === "SUMMONED" || appointment.status === "TELEHEALTH"
                    ? "Patient has already been taken off the wait list"
                    : "";
</script>

<AsymmetricMain emptyMessage={message} hasContent={appointment_id}>
    <Spinner show={loading}/>
    {#if appointment && !loading}
        <header class="uk-container uk-container-expand">
            <div class="uk-flex uk-flex-between uk-child-width-1-3 ">
                <div class="uk-flex uk-flex-left uk-flex-wrap">
                    <h2 class="uk-width-1-1">{appointment.patient ? appointment.patient.given_name : "Unnamed"}
                        @ {formatTime(appointment.appointment_time)}</h2>
                </div>
                <div class="uk-flex uk-flex-right uk-flex-top">
                    <Button _class="uk-margin-small-right" on:click={openEdit}
                            disabled={mutateButtonsDisabled} title={mutateButtonsDisabledReason}>
                        Edit
                        <Icon _class="uk-margin-small-left" options={{icon:"pencil"}}/>
                    </Button>
                    <Button _class="uk-margin-small-right" on:click={deleteAppointmentHandler}
                        disabled={mutateButtonsDisabled} title={mutateButtonsDisabledReason}>
                        Cancel
                        <Icon _class="uk-margin-small-left" options={{icon:"trash"}}/>
                    </Button>
                </div>
            </div>
            <div class="uk-width-1-1 uk-margin-remove uk-flex">
                <Button _class="uk-margin-small-right" on:click={resendCheckInLink}
                        disabled={appointment.status === "SUMMONED"} loading={actionButtonsLoading}>
                    Resend Link
                    <Icon options={{icon:"link"}}/>
                </Button>
                <Button _class="uk-margin-small-right" on:click={summonPatient} disabled={actionButtonsDisabled}
                        title={actionButtonsDisabledReason} loading={actionButtonsLoading}>
                    Summon
                    <Icon options={{icon:"sign-in"}}/>
                </Button>
                <Button on:click={sendTelehealthLink} disabled={actionButtonsDisabled} title={actionButtonsDisabledReason}
                        loading={actionButtonsLoading}>
                    Telehealth
                    <Icon options={{icon:"desktop"}}/>
                </Button>
            </div>
        </header>
        <div class="uk-container uk-margin-medium-top uk-flex uk-container-expand">
            <div class="uk-width-3-5 uk-section uk-section-muted uk-padding uk-flex uk-flex-top">
                {#if appointment.forms.length > 0}
                    <dl class="uk-description-list">
                        <h3>COVID-19 Screening Results:</h3>
                        {#each JSON.parse(appointment.forms[appointment.forms.length - 1]) as q, i}
                            {#if q.type !== "label"}
                                <dt>{q.label}</dt>
                                <dd class:uk-text-bold={questionIsFlagged(q)}
                                    class:uk-text-danger={questionIsFlagged(q)}>
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
                                {:else}
                                <hr/>
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
                <DetailCards {appointment}/>
            </div>
        </div>
    {/if}
</AsymmetricMain>

<Modal id="EditAppointmentModal" header="Edit Appointment" showClose={true} bind:open={showEditModal}>
    <Form form={edit_form} fullwidth={true} onSubmit={edit} buttonText="Update Appointment"
          bind:formElement={editFormElement}/>
</Modal>


<style lang="scss">
    main {
        grid-area: main;

        header {
            padding-top: 1em;
        }
    }
</style>