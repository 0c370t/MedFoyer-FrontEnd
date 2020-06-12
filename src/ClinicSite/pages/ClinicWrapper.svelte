<script>
    import CreatePatientModel from "../../Components/Clinic/Modals/CreatePatientModel.svelte";
    import CreateAppointmentModal from "../../Components/Clinic/Modals/CreateAppointmentModal.svelte";
    import {appointmentModalData, user} from "../../helpers/clinic_stores";
    import {navigate} from "svelte-routing";
    import {onMount} from "svelte";

    export let component;
    export let admin_only = false;

    let showAppointmentModal = false;
    let showPatientModal = false;

    const openApptModal = (e) => {
        if(e.detail){
            console.log(e.detail);
            $appointmentModalData[2].value = e.detail.patient_id
        }
        showAppointmentModal = true;
    };
    const openPatientModal = (e) => {
        showPatientModal = true;
    };

    onMount(() => {
        // TODO: Wait for user information to become available
        if(admin_only && !$user.admin){ window.location.href = "/clinic" }
    })
</script>

<svelte:component this={component} on:create-appointment={openApptModal} on:create-patient={openPatientModal}/>


<CreatePatientModel bind:shown={showPatientModal}/>
<CreateAppointmentModal bind:shown={showAppointmentModal}/>