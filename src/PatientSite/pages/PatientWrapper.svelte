<script>
    import {onMount} from "svelte";

    export let component;
    import {patient_meta} from '../../helpers/stores';
    import {navigate} from "svelte-routing";

    onMount(async () => {
        switch($patient_meta.state){
            default:
                navigate("/patient/appt");
                break;
            case "TOS":
                if(window.location.pathname !== "/patient/appt")
                    navigate("/patient/appt");
                break;
            case "VERIFICATION":
                if(window.location.pathname !== "/patient/auth")
                    navigate("/patient/auth");
                break;
            case "GPS":
                if(window.location.pathname !== "/patient/map")
                    navigate("/patient/map");
                break;
            case "FORMS":
                if(window.location.pathname !== "/patient/screening")
                    navigate("/patient/screening");
                break;
            case "CHECKED_IN":
                if(window.location.pathname !== "/patient/waitlist")
                    navigate("/patient/waitlist");
        }
    })

</script>


<svelte:component this={component} {...$$props}/>