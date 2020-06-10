<script>
    import Modal from "../../Modal/Modal.svelte";
    import Form from "../../Forms/Form.svelte";
    import {patientForm} from '../../../helpers/forms/create_patient';
    import {getClient, mutate} from "svelte-apollo";
    import {CREATE_PATIENT} from "../../../API/queries/patients.GQL";
    import {toAWSDate} from "../../../helpers/datetime";
    import {getFieldValue} from "../../../helpers/forms/form-utils";

    const client = getClient();

    export let shown = false;
    let formLoading = false;
    let formElement = null;
    let form = [...patientForm];

    const submit = async () => {
        formLoading = true;
        if(!formElement.reportValidity()) return;
        try {
            await mutate(client, {
                mutation: CREATE_PATIENT,
                variables: {
                    patient: {
                        birth_date: getFieldValue(form, "dob"),
                        given_name: getFieldValue(form, "given_name"),
                        last_name: getFieldValue(form, "last_name")
                    }
                }
            })
        } catch (err) {
            console.error(err);
        }

        formLoading = false;
    }

</script>


<Modal bind:open={shown} id="patientCreateModal">
    <h3 slot="header">Add Appointment</h3>
    <Form {form} onSubmit="{submit}" loading="{formLoading}" bind:formElement
          buttonText="Create Patient"/>
</Modal>