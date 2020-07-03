<script>
    export let id;
    import {navigate} from "svelte-routing";
    import {patient_meta} from '../../helpers/stores/patient';

    if (id) {
        patient_meta.set({
            token: {
                id: id
            },
            state:"TOS"
        });

    } else {
        patient_meta.set({});
    }
    window.location.href = "/patient/appt";

</script>