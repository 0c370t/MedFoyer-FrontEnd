<script>
    import Logo from "../../svg/Logo.svelte";
    import Icon from "../../Components/Icon/Icon.svelte";
    import Button from "../../Components/Button/Button.svelte";
    import Modal from "../../Components/Modal/Modal.svelte";
    import Form from "../../Components/Forms/Form.svelte";
    import {postAppointment} from "../../API/appointments.API";

    export let updateAppointments;

    // TODO: Add Appointment Modal
    let showAppointmentModal = false;
    let formElement;
    let apptForm = [
        {
            "label":"Patient Name",
            "type":"text",
            "name":"name",
            "required": true
        },
        {
            "label":"Appointment Time",
            "type":"time",
            "name":"appointment_time",
            "required": true
        },
        {
            "label":"Clinic Address",
            "type":"text",
            "name":"display_address",
            "required": true
        },
        {
            "label":"Latitude",
            "type":"number",
            "name":"lat",
            "required": true
        },
        {
            "label":"Longitude",
            "type":"number",
            "name":"long",
            "required": true
        }
    ];
    const submit = () => {
        let date = new Date();
        date.setHours(apptForm[1].value.split(":")[0]);
        date.setMinutes(apptForm[1].value.split(":")[1]);
        apptForm[1].value = date.getTime();
        postAppointment({form: JSON.stringify(apptForm)}).then(response => {
            showAppointmentModal = false;
            updateAppointments();
        })
    }

</script>

<Modal bind:open={showAppointmentModal} id="apptCreateModal">
    <h3 slot="header">Add Appointment</h3>
    <Form form="{apptForm}" onSubmit="{submit}" bind:formElement buttonText="Create Appointment"/>
</Modal>

<header>
    <div class="left">
        <div class="logo">
            <Logo/>
        </div>
        <h1 class="uk-margin-remove">
            MedFoyer </h1>
    </div>
    <div class="right">
        <Button on:click={() => showAppointmentModal = true}>
            <Icon options={{icon:'plus'}}/>
            Add a new appointment
        </Button>
    </div>
</header>


<style lang="scss">
    header {
        grid-area:header;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1em 3em;
        border-bottom:1px solid gray;
        div.left{
            height:3em;
            display:flex;
            align-items:center;
        }
        div.logo {
            height: 3em;
            margin-right:1ch;
        }
    }
</style>