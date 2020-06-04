<script>
    import Logo from "../../svg/Logo.svelte";
    import Icon from "../Icon/Icon.svelte";
    import Button from "../Button/Button.svelte";
    import Modal from "../Modal/Modal.svelte";
    import Form from "../Forms/Form.svelte";
    import {postAppointment} from "../../API/appointments.API";
    import {new_appointment} from "../../helpers/questions";
    import {lookupAddress} from "../../API/mapbox.API";

    export let updateAppointments;

    let formLoading = false;
    let showAppointmentModal = false;
    let formElement;
    let apptForm = new_appointment;

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


</script>

<Modal bind:open={showAppointmentModal} id="apptCreateModal">
    <h3 slot="header">Add Appointment</h3>
    <Form form="{apptForm}" onSubmit="{submit}" loading="{formLoading}" bind:formElement
          buttonText="Create Appointment"/>
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
        grid-area: header;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1em 3em;
        border-bottom: 1px solid gray;

        div.left {
            height: 3em;
            display: flex;
            align-items: center;
        }

        div.logo {
            height: 3em;
            margin-right: 1ch;
        }
    }
</style>