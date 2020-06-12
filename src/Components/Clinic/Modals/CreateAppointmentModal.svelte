<script>
    import {lookupAddress} from "../../../API/mapbox.API";

    export let shown = false;
    import {getContext} from "svelte";
    import Modal from "../../Modal/Modal.svelte";
    import Form from "../../Forms/Form.svelte";
    import {CREATE_NEW_APPOINTMENT} from "../../../API/queries/appointments.GQL";
    import {new_appointment} from "../../../helpers/forms/create_appointment";
    import {appointmentModalData} from "../../../helpers/clinic_stores";
    import {cloneForm, getFieldValue} from "../../../helpers/forms/form-utils";
    import {getClient, mutate} from "svelte-apollo";
    const client = getClient();
    const updateAppointments = getContext("updateAppointments");

    const submit = async () => {
        formLoading = true;
        validationMessage = "";
        if (!formElement.reportValidity()) {
            formLoading = false;
            return;
        }
        try {
            let patient_id = getFieldValue(apptForm, "patient_id");
            let clinic_location_id = getFieldValue(apptForm, "appointment_location");
            let appointment_time = getFieldValue(apptForm, "appointment_time").getTime();
            let response = await mutate(client, {
                mutation: CREATE_NEW_APPOINTMENT,
                variables: {
                    status: "Created",
                    appointment_time,
                    patient_id,
                    clinic_location_id,
                    doctor_id: "00000000-0000-0000-0000-000000000000"
                }
            });
            apptForm = cloneForm(new_appointment);
            shown = false;
        } catch(e){
            // TODO: Make this less likely to scare users
            validationMessage = e.message;
        }
        formLoading = false;
    };

    let formElement;
    let apptForm = cloneForm($appointmentModalData);
    let formLoading = false;
    let validationMessage = "";
    $: apptForm = $appointmentModalData;
</script>

<Modal bind:open={shown} id="apptCreateModal" on:beforeshow on:show on:shown on:beforehide on:hide on:hidden on:hidden={() => appointmentModalData.set(cloneForm(new_appointment))}>
    <h3 slot="header">Add Appointment</h3>
    <Form form="{apptForm}" onSubmit="{submit}" loading="{formLoading}" bind:formElement buttonText="Create Appointment"
          {validationMessage}/>
</Modal>