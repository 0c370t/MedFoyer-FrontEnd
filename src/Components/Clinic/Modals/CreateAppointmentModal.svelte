<script>
    export let shown = false;
    import {new_appointment} from "../../../helpers/forms/create_appointment";
    import {getContext} from "svelte";
    import Modal from "../../Modal/Modal.svelte";
    import Form from "../../Forms/Form.svelte";

    const updateAppointments = getContext("updateAppointments");

    const submit = async () => {
        formLoading = true;
        if (apptForm[apptForm.length - 1].type === "validation-message") apptForm.pop();

        if (formElement.reportValidity()) {
            let clonedForm = apptForm.flatMap(x => Object.assign({}, x));
            let date = new Date();

            date.setHours(clonedForm[3].value.split(":")[0]);
            date.setMinutes(clonedForm[3].value.split(":")[1]);
            clonedForm[3].value = date.getTime();
            let longLat;
            try {
                longLat = await lookupAddress(clonedForm[4].value, clonedForm[5].value, clonedForm[6].value, clonedForm[7].value);
                clonedForm.push({"name": "long", "value": longLat[0]});
                clonedForm.push({"name": "lat", "value": longLat[1]});
                await postAppointment({form: JSON.stringify(clonedForm)});
                showAppointmentModal = false;
                updateAppointments();
                apptForm = new_appointment;
            } catch (e) {
                apptForm.push({
                    "label": e.message,
                    "type": "validation-message"
                });
                apptForm = [...apptForm];
            }

        }
        formLoading = false;
    }

    let formElement;
    let apptForm = new_appointment;
    let formLoading = false;

</script>


<Modal bind:open={shown} id="apptCreateModal">
    <h3 slot="header">Add Appointment</h3>
    <Form form="{apptForm}" onSubmit="{submit}" loading="{formLoading}" bind:formElement
          buttonText="Create Appointment"/>
</Modal>