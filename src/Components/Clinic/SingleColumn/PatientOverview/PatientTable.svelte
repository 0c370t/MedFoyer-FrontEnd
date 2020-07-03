<script>
    import {getClient, mutate, query} from "svelte-apollo";
    import {DELETE_PATIENT, GET_ALL_PATIENTS, UPDATE_PATIENT} from "../../../../API/queries/patients.GQL";
    import Button from "../../../Button/Button.svelte";
    import Icon from "../../../Icon/Icon.svelte";
    import {phoneClean} from "../../../../helpers/phone_numbers";
    import DataTable, {buildAttribute} from "../../../DataTable/DataTable.svelte";
    import Uikit from 'uikit';
    import {createEventDispatcher, onMount} from "svelte";
    import {
        addHiddenField,
        cloneForm,
        containsField,
        getFieldValue,
        setFieldValue
    } from "../../../../helpers/forms/form-utils";
    import {patientForm} from "../../../../helpers/forms/create_patient";
    import Modal from "../../../Modal/Modal.svelte";
    import Form from "../../../Forms/Form.svelte";
    import {operation_not_supported} from "../../../../helpers/notify";
    import {fromAWSDate, toAWSDate} from "../../../../helpers/datetime";

    const client = getClient();
    const attributes = [
        buildAttribute("name", "Name", true, true, true),
        buildAttribute("birth_date", "Date of Birth", true, true, true),
        buildAttribute("phone_number", "Phone Number", true, true, true, phoneClean),
    ];
    let patients__ = query(client, {query: GET_ALL_PATIENTS});
    let patients;
    const dispatch = createEventDispatcher();

    const confirmDelete = (patient_id) => {
        // Can safely assume patient_id exists because this is a callback on a patient.
        // Yes I'll take "words I'll probably eat in a month for 200" please
        let patient = patients.filter(p => p.patient_id === patient_id)[0];

        Uikit.modal.confirm(`Are you sure you want to delete ${patient.name}?`).then(
                async () => {
                    await mutate(client, {
                        mutation: DELETE_PATIENT,
                        variables: {
                            patient_id
                        }
                    });
                    update();
                },
                () => {
                }
        );
    };
    const createAppointment = (patient_id) => {
        dispatch('create-appointment', {
            patient_id
        })
    };

    // TODO: Edit Patients
    let edit_form = cloneForm(patientForm);
    let showEditModal = false;
    let editFormElement;
    const openEdit = async (patient) => {
        setFieldValue(edit_form, "given_name", patient.given_name);
        setFieldValue(edit_form, "last_name", patient.last_name);
        setFieldValue(edit_form, "dob", fromAWSDate(patient.birth_date));
        setFieldValue(edit_form, "phone_num", patient.phone_number);
        if (containsField(edit_form, "patient_id"))
            setFieldValue(edit_form, "patient_id", patient.patient_id);
        else
            addHiddenField(edit_form, "patient_id", patient.patient_id);
        edit_form = edit_form;
        showEditModal = true;
    };
    const edit = async () => {
        if (editFormElement.reportValidity()) {
            showEditModal = false;
            let given_name = getFieldValue(edit_form, "given_name");
            let last_name = getFieldValue(edit_form, "last_name");
            let birth_date = toAWSDate(getFieldValue(edit_form, "dob"));
            let phone_number = getFieldValue(edit_form, "phone_num");
            let patient_id = getFieldValue(edit_form, "patient_id");
            await mutate(client, {
                mutation: UPDATE_PATIENT,
                variables: {
                    patient: {
                        given_name,
                        last_name,
                        birth_date,
                        phone_number,
                        phone_number_country_code: 1
                    },
                    patient_id
                }
            });
            await update();
        }
    };


    export const update = () => {
        table.shim(patients__.refetch());
        $patients__.then(i => {
            patients = i.data.listPatients;
            return i;
        });
    };
    onMount(update);
    let table;
</script>

<DataTable data_promise={$patients__} {attributes} data_attribute="listPatients" data_key="patient_id"
           bind:this={table}>
    <div slot="buttons" let:id let:object={patient} class="uk-flex uk-flex-around">
        <Button on:click={()=>openEdit(patient)}>
            <Icon icon="pencil"/>
        </Button>
        <Button on:click={()=>createAppointment(id)}>
            <Icon icon="calendar"/>
        </Button>
        <Button on:click={()=>confirmDelete(id)}>
            <Icon icon="trash"/>
        </Button>
    </div>
</DataTable>

<Modal id="EditPatientModal" header="Edit Patient" showClose={true} bind:open={showEditModal}>
    <Form form={edit_form} fullwidth={true} onSubmit={edit} buttonText="Update Patient"
          bind:formElement={editFormElement}/>
</Modal>