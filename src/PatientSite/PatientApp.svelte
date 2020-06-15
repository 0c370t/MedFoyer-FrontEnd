<script>
    import PatientWrapper from "./pages/PatientWrapper.svelte";

    export let url = "";

    import {Router, Route} from "svelte-routing";

    import LandingPage from "./pages/LandingPage.svelte";
    import LocationPage from './pages/LocationPage.svelte';
    import DataCollectionPage from './pages/DataCollectionPage.svelte';
    import AuthenticationPage from './pages/AuthenticationPage.svelte';
    import FormPage from './pages/FormPage.svelte';
    import Waitlist from './pages/Waitlist.svelte';
</script>

<Router {url}>
    <Route path="/patient/*"><PatientWrapper component={LandingPage}/></Route>
    <Route path="/patient/appt/:id" component={DataCollectionPage}/>
    <Route path="/patient/appt"><PatientWrapper component={LandingPage}/></Route>
    <Route path="/patient/auth"><PatientWrapper component={AuthenticationPage}/></Route>
    <Route path="/patient/map"><PatientWrapper component={LocationPage}/></Route>
    <Route path="/patient/screening"><PatientWrapper component={FormPage}/></Route>
    <Route path="/patient/waitlist"><PatientWrapper component={Waitlist}/></Route>
</Router>