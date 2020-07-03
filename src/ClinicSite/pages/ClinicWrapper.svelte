<script>
    import CreatePatientModel from "../../Components/Clinic/Modals/CreatePatientModel.svelte";
    import CreateAppointmentModal from "../../Components/Clinic/Modals/CreateAppointmentModal.svelte";
    import {appointmentModalData, user} from "../../helpers/stores/clinic";
    import {navigate} from "svelte-routing";
    import Auth from '@aws-amplify/auth';
    import {onMount} from "svelte";
    import {setFieldValue} from "../../helpers/forms/form-utils";

    export let component;
    export let admin_only = false;

    let showAppointmentModal = false;
    let showPatientModal = false;
    let child = {};

    const openApptModal = (e) => {
        if(e.detail){
            setFieldValue($appointmentModalData, "patient_id", e.detail.patient_id);
        }
        showAppointmentModal = true;
    };
    const openPatientModal = (e) => {
        showPatientModal = true;
    };

    onMount(async () => {
        await $user.loading;
        if(admin_only && !$user.admin){ window.location.href = "/clinic" }
    });

    let update = child.update;
    $: update = child.update || (() => {});
</script>
<svelte:component this={component} on:create-appointment={openApptModal} on:create-patient={openPatientModal} bind:this={child}/>


<CreatePatientModel bind:shown={showPatientModal} on:updatepatients={update} on:create-appointment={openApptModal}/>
<CreateAppointmentModal bind:shown={showAppointmentModal} on:updateappts={update}/>