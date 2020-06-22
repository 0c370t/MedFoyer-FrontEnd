<script>
    import {getClient, mutate, query} from "svelte-apollo";
    import {DELETE_APPOINTMENT, GET_APPOINTMENT_DASHBOARD} from "../../../../API/queries/appointments.GQL";
    import Button from "../../../Button/Button.svelte";
    import Icon from "../../../Icon/Icon.svelte";
    import DataTable, {buildAttribute} from "../../../DataTable/DataTable.svelte";
    import Uikit from 'uikit';
    import {createEventDispatcher, onMount, setContext} from "svelte";
    import {formatForDisplay} from "../../../../helpers/datetime";
    import Modal from "../../../Modal/Modal.svelte";
    import AppointmentDetail from "../../Asymmetric/AppointmentOverview/AppointmentDetail.svelte";

    const client = getClient();
    const attributes = [
        buildAttribute("covid_flag", "COVID Risk Level", true, true, true, (x) => x || "Unknown"),
        buildAttribute("patient.given_name", "Patient First Name", true, true, true),
        buildAttribute("patient.last_name", "Patient Last Name", true, true, true),
        buildAttribute("appointment_time", "Appointment Time", false, true, true, (x) => formatForDisplay(x, true)),
        buildAttribute("clinic_location.clinic_location_name", "Location", false, true, true)
    ];
    let appointments__ = query(client, {query: GET_APPOINTMENT_DASHBOARD});

    const dispatch = createEventDispatcher();

    const confirmDelete = (appointment_id) => {
        // Can safely assume patient_id exists because this is a callback on a patient.
        // Yes I'll take "words I'll probably eat in a month for 200" please
        Uikit.modal.confirm('Are you sure you want to delete this appointment?', {status: "danger"}).then(async () => {
            await mutate(client, {
                mutation: DELETE_APPOINTMENT,
                variables: {
                    appointment_id: appointment_id
                }
            });
            update();
        }).catch(e => console.log(e))
    };
    export const update = () => table.shim(appointments__.refetch());
    onMount(update);

    setContext("updateAppointments", update);
    let table;
    let selected = false;
</script>
<DataTable data_promise={$appointments__} {attributes} data_attribute="listAppointments" data_key="appointment_id"
           bind:this={table}>
    <div slot="buttons" let:id let:object={appointment} class="uk-flex uk-flex-around">
        <Button disabled="{true}" title="Coming Soon">
            <Icon icon="pencil"/>
        </Button>
        <Button on:click={()=> selected = appointment}>
            <Icon icon="expand"/>
        </Button>
        <Button on:click={()=>confirmDelete(id)}>
            <Icon icon="trash"/>
        </Button>
    </div>
</DataTable>
{#if selected}
    <Modal open={selected} id="AppointmentTableModal" full={true} on:hide={()=>selected = false}>
        <AppointmentDetail appointment={selected}/>
    </Modal>
{/if}