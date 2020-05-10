<script>
    import {Router, Route} from "svelte-routing";
    import LandingPage from "./pages/PatientPages/LandingPage.svelte";
    import LocationPage from './pages/PatientPages/LocationPage.svelte';
    import DataCollectionPage from './pages/PatientPages/DataCollectionPage.svelte';
    import FormPage from './pages/PatientPages/FormPage.svelte';
    import Waitlist from './pages/PatientPages/Waitlist.svelte';
    import TempLanding from './pages/PublicPages/TempLanding.svelte';
    import Clinic from './pages/ClinicPages/Clinic.svelte';

    export let url = "";
</script>

<Router url="{url}">
    <Route path="/appt/:id" component="{DataCollectionPage}"/>
    <Route path="/" component="{TempLanding}" />
    <Route path="/:name" component="{LandingPage}"/>
    <Route path="/map" component="{LocationPage}"/>
    <Route path="/screening" component="{FormPage}"/>
    <Route path="/clinic" component="{Clinic}"/>
    <Route path="/waitlist" component="{Waitlist}"/>
</Router>

