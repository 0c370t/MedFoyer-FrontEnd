<script>
    import {createClient} from "../API/init";
    import {setClient} from "svelte-apollo";
    import {Router, Route} from "svelte-routing";
    import AppointmentOverview from './pages/AppointmentOverview.svelte';
    import PatientOverview from './pages/PatientOverview.svelte';
    import Login from './pages/Login.svelte';
    import CompleteProfile from './pages/CompleteProfile.svelte'
    import {CheckSession} from "../helpers/auth/ClinicAuthentication";
    import Redirect from "../Components/Routing/Redirect.svelte";
    import ClinicWrapper from "./pages/ClinicWrapper.svelte";

    export let url = "";

    const client = createClient();
    setClient(client);

    if (!window.location.pathname.includes("login")) {
        CheckSession();
    }
</script>

<Router {url}>
    <Route path="/clinic"><ClinicWrapper component="{AppointmentOverview}"/></Route>
    <Route path="/clinic/patients"><ClinicWrapper component="{PatientOverview}"/></Route>
    <Route path="/clinic/login" component="{Login}"/>
    <Route path="/clinic/login/complete_profile" component="{CompleteProfile}"/>
    <Route path="/clinic/*">
        <Redirect to="/clinic/login"/>
    </Route>
</Router>