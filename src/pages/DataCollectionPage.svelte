<script>
    import {getAppointment} from '../API/appointments.API';
    export let id;
    import {navigate} from "svelte-routing";
    import {appt} from '../helpers/stores';

    getAppointment(id).then(appointmentData => {
        appt.set(appointmentData);
        navigate("/");
    });
</script>