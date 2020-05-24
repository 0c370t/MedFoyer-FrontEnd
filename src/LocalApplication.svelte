<script>
    import {Router, Route} from "svelte-routing";
    import ClinicApp from "./ClinicSite/ClinicApp.svelte";
    import PublicApp from "./PublicSite/PublicApp.svelte";
    import PatientApp from "./PatientSite/PatientApp.svelte";


    export let url = '';
</script>

<Router basepath="/" {url}>
    <Route path="/clinic*" component="{ClinicApp}"/>
    <Route path="/*" component="{PublicApp}"/>
    <Route path="/patient*" component="{PatientApp}"/>
</Router>


<style>

</style>