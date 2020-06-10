<script>
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
    <Route path="/patient/appt/:id" component="{DataCollectionPage}"/>
    <Route path="/patient/appt" component="{LandingPage}"/>
    <Route path="/patient/auth" component="{AuthenticationPage}"/>
    <Route path="/patient/map" component="{LocationPage}"/>
    <Route path="/patient/screening" component="{FormPage}"/>
    <Route path="/patient/waitlist" component="{Waitlist}"/>
</Router>