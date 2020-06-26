<script>
    import Modal from "../../Modal/Modal.svelte";
    import Form from "../../Forms/Form.svelte";
    import {patientForm} from '../../../helpers/forms/create_patient';
    import {getClient, mutate} from "svelte-apollo";
    import {CREATE_PATIENT} from "../../../API/queries/patients.GQL";
    import {toAWSDate} from "../../../helpers/datetime";
    import {cloneForm, getFieldValue, setFieldMessage} from "../../../helpers/forms/form-utils";
    import Uikit from 'uikit';
    import {createEventDispatcher} from "svelte";
    const dispatch = createEventDispatcher();
    const client = getClient();

    export let shown = false;
    let formLoading = false;
    let formElement = null;
    let form = cloneForm(patientForm);
    const submit = async () => {
        formLoading = true;
        if (!formElement.reportValidity()) {
            formLoading = false;
            return;
        }
        try {
            let response = await mutate(client, {
                mutation: CREATE_PATIENT,
                variables: {
                    patient: {
                        birth_date: toAWSDate(getFieldValue(form, "dob")),
                        given_name: getFieldValue(form, "given_name"),
                        last_name: getFieldValue(form, "last_name"),
                        phone_number: getFieldValue(form, "phone_num"),
                        phone_number_country_code: 1
                    }
                }
            });

            shown = false;
            try{
                await Uikit.modal.confirm("Would you like to create an appointment for " + getFieldValue(form, "given_name") + "?");
                dispatch("create-appointment", {patient_id: response.data.createPatient.patient_id});
            } catch{}
            form = cloneForm(patientForm);
            shown = false;
            dispatch("updatepatients");
        } catch (err) {
            if (err.message.includes("as a valid phone number")) {
                setFieldMessage(form, "phone_num", "Invalid Phone Number");
                form = form;
            } else {
                // TODO: Make this less likely to scare users
                validationMessage = err.message;
            }
        }

        formLoading = false;
    };
    const resetForm = () => form = cloneForm(patientForm);
    let validationMessage = "";

</script>


<Modal bind:open={shown} id="patientCreateModal" on:hide={resetForm} header="Add New Patient">
    {#if shown}
        <Form {form} onSubmit="{submit}" loading="{formLoading}" bind:formElement buttonText="Create Patient"
              {validationMessage}/>
    {/if}
</Modal>