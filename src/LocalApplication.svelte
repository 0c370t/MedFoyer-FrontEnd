<script>
    import {Router} from "svelte-routing";
    import ClinicApp from "./ClinicSite/ClinicApp.svelte";
    import PublicApp from "./PublicSite/PublicApp.svelte";
    import PatientApp from "./PatientSite/PatientApp.svelte";


    export let url = '';
</script>

<Router basepath="/" {url}>
    <ClinicApp/>
    <PublicApp/>
    <PatientApp/>
</Router>


<style>

</style>