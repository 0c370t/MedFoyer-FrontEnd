<script>
    import {getAppointment} from '../../API/appointments.API';

    export let id;
    import {navigate} from "svelte-routing";
    import {patient_meta} from '../../helpers/stores';

    patient_meta.set({
        appointment: {
            id: id
        }
    });
    navigate("/appt");
</script>