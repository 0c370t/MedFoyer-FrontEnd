<script>
    import {getClient, query} from "svelte-apollo";
    import {GET_ALL_PATIENTS} from "../../../../API/queries/patients.GQL";
    import Button from "../../../Button/Button.svelte";
    import Icon from "../../../Icon/Icon.svelte";
    import {phoneClean} from "../../../../helpers/phone_numbers";
    import DataTable, {buildAttribute} from "../../../DataTable/DataTable.svelte";
    import ConfirmationModal from "../../../Modal/ConfirmationModal.svelte";
    import Uikit from 'uikit';
    import {createEventDispatcher} from "svelte";

    const client = getClient();
    const attributes = [
        buildAttribute("given_name", "First Name", true, true, true),
        buildAttribute("last_name", "Last Name", true, true, true),
        buildAttribute("birth_date", "Date of Birth", true, true, true),
        buildAttribute("phone_number", "Phone Number", true, true, true, phoneClean),
    ];
    let patients__ = query(client, {query: GET_ALL_PATIENTS});
    let patients;
    const dispatch = createEventDispatcher();
    $patients__.then(i => {
        patients = i.data.listPatients;
        return i;
    });
    const confirmDelete = (patient_id) => {
        // Can safely assume patient_id exists because this is a callback on a patient.
        // Yes I'll take "words I'll probably eat in a month for 200" please
        let patient = patients.filter(p => p.patient_id === patient_id)[0];
        Uikit.modal.confirm(`Are you sure you want to delete ${patient.given_name} ${patient.last_name}?`).then(
                ()=>{
                    console.log("He's dead, Jim.");
                    // TODO: DELETE PATIENT!
                },
                ()=>{}
        )
    }
    const createAppointment = (patient_id) => {
        dispatch('create-appointment', {
            patient_id
        })
    }
    // TODO: Edit Patients
</script>

<DataTable data_promise={$patients__} {attributes} data_attribute="listPatients" data_key="patient_id">
    <div slot="buttons" let:prop={id} class="uk-flex uk-flex-around">
        <Button disabled="{true}" title="Coming Soon">
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