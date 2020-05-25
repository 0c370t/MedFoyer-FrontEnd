<script>
    import Logo from "../../svg/Logo.svelte";
    import Icon from "../Icon/Icon.svelte";
    import Button from "../Button/Button.svelte";
    import Modal from "../Modal/Modal.svelte";
    import Form from "../Forms/Form.svelte";
    import {postAppointment} from "../../API/appointments.API";
    import {new_appointment} from "../../helpers/questions";

    export let updateAppointments;

    let showAppointmentModal = false;
    let formElement;
    let apptForm = new_appointment;
    const submit = () => {
        if(formElement.reportValidity()){
            debugger;
            let date = new Date();
            date.setHours(apptForm[3].value.split(":")[0]);
            date.setMinutes(apptForm[3].value.split(":")[1]);
            apptForm[3].value = date.getTime();
            postAppointment({form: JSON.stringify(apptForm)}).then(response => {
                showAppointmentModal = false;
                updateAppointments();
                apptForm = new_appointment;
            })
        }
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