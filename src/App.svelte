<script>
    import {Router, Route} from "svelte-routing";
    import LandingPage from "./pages/PatientPages/LandingPage.svelte";
    import LocationPage from './pages/PatientPages/LocationPage.svelte';
    import DataCollectionPage from './pages/PatientPages/DataCollectionPage.svelte';
    import FormPage from './pages/PatientPages/FormPage.svelte';
    import Waitlist from './pages/PatientPages/Waitlist.svelte';
    import TempLanding from './pages/PublicPages/TempLanding.svelte';
    import Clinic from './pages/ClinicPages/Clinic.svelte';
    import AuthenticationPage from './pages/PatientPages/AuthenticationPage.svelte';
    import Login from './pages/ClinicPages/Login.svelte';
    export let url = "";
</script>

<Router {url}>
    <Route path="/appt/:id" component="{DataCollectionPage}"/>
    <Route path="/" component="{TempLanding}" />
    <Route path="/appt" component="{LandingPage}"/>
    <Route path="/auth" component="{AuthenticationPage}"/>
    <Route path="/map" component="{LocationPage}"/>
    <Route path="/screening" component="{FormPage}"/>
    <Route path="/clinic" component="{Clinic}"/>
    <Route path="/waitlist" component="{Waitlist}"/>
    <Route path="/login" component="{Login}"/>
</Router>

