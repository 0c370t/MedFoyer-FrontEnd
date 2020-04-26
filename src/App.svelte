<script>
    import {Router, Route} from "svelte-routing";
    import LandingPage from "./pages/LandingPage.svelte";
    import LocationPage from './pages/LocationPage.svelte';
    import DataCollectionPage from './pages/DataCollectionPage.svelte';
    import FormPage from './pages/FormPage.svelte';
    import Waitlist from './pages/Waitlist.svelte';
    import Clinic from './pages/ClinicPages/Clinic.svelte';
    export let url = "";
</script>

<Router url="{url}">
    <Route path="/appt/:id" component="{DataCollectionPage}"/>
    <Route path="/" component="{LandingPage}" />
    <Route path="/:name" component="{LandingPage}"/>
    <Route path="/map" component="{LocationPage}"/>
    <Route path="/screening" component="{FormPage}"/>
    <Route path="/clinic" component="{Clinic}"/>
    <Route path="/waitlist" component="{Waitlist}"/>
</Router>

