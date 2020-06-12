<script>
    import CreatePatientModel from "../../Components/Clinic/Modals/CreatePatientModel.svelte";
    import CreateAppointmentModal from "../../Components/Clinic/Modals/CreateAppointmentModal.svelte";
    import {appointmentModalData} from "../../helpers/clinic_stores";

    export let component;
    let showAppointmentModal = false;
    let showPatientModal = false;

    const openApptModal = (e) => {
        if(e.detail){
            console.log(e.detail);
            $appointmentModalData[2].value = e.detail.patient_id
        }
        showAppointmentModal = true;
    }
    const openPatientModal = (e) => {
        showPatientModal = true;
    }
</script>

<svelte:component this={component} on:create-appointment={openApptModal} on:create-patient={openPatientModal}/>


<CreatePatientModel bind:shown={showPatientModal}/>
<CreateAppointmentModal bind:shown={showAppointmentModal}/>