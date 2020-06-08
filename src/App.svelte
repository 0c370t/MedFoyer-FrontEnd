<script>
    import {Router, Route} from "svelte-routing";
    import ClinicApp from "./ClinicSite/ClinicApp.svelte";
    import PatientApp from "./PatientSite/PatientApp.svelte";
    import PublicApp from "./PublicSite/PublicApp.svelte";

    export let url = "";
</script>

<Router>
    <ClinicApp />
    <PatientApp/>
    <PublicApp />
</Router>