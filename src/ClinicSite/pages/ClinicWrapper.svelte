<script>
    import CreatePatientModel from "../../Components/Clinic/Modals/CreatePatientModel.svelte";
    import CreateAppointmentModal from "../../Components/Clinic/Modals/CreateAppointmentModal.svelte";

    export let component;
    let showAppointmentModal = false;
    let showPatientModal = false;

</script>

<svelte:component this={component}/>


<CreatePatientModel bind:shown={showPatientModal}/>
<CreateAppointmentModal bind:shown={showAppointmentModal}/>