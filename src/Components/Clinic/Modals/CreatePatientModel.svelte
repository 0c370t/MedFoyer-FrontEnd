<script>
    import Modal from "../../Modal/Modal.svelte";
    import Form from "../../Forms/Form.svelte";
    import {patientForm} from '../../../helpers/forms/create_patient';
    import {getClient, mutate} from "svelte-apollo";
    import {CREATE_PATIENT} from "../../../API/queries/patients.GQL";
    import {toAWSDate} from "../../../helpers/datetime";
    import {cloneForm, getFieldValue, setFieldMessage} from "../../../helpers/forms/form-utils";

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
                        birth_date: getFieldValue(form, "dob"),
                        given_name: getFieldValue(form, "given_name"),
                        last_name: getFieldValue(form, "last_name"),
                        phone_number: getFieldValue(form, "phone_num"),
                        phone_number_country_code: 1
                    }
                }
            });
            form = cloneForm(patientForm);
            shown = false;
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


<Modal bind:open={shown} id="patientCreateModal" on:hide={resetForm}>
    <h3 slot="header">Add Patient</h3>
    {#if shown}
        <Form {form} onSubmit="{submit}" loading="{formLoading}" bind:formElement buttonText="Create Patient"
              {validationMessage}/>
    {/if}
</Modal>