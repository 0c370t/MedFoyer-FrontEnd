<script>
    import {Router, Route} from "svelte-routing";
    import ClinicApp from "./ClinicSite/ClinicApp.svelte";
    import PatientApp from "./PatientSite/PatientApp.svelte";
    import PublicApp from "./PublicSite/PublicApp.svelte";
    import {createClient} from "./API/init";
    import {setClient} from "svelte-apollo";

    const client = createClient();
    setClient(client);

</script>

<Router>
    <ClinicApp />
    <PatientApp/>
    <PublicApp />
</Router>