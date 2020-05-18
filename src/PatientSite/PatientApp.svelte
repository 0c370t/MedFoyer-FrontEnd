<script>
    import {Router, Route} from "svelte-routing";
    import LandingPage from "./pages/LandingPage.svelte";
    import LocationPage from './pages/LocationPage.svelte';
    import DataCollectionPage from './pages/DataCollectionPage.svelte';
    import FormPage from './pages/FormPage.svelte';
    import Waitlist from './pages/Waitlist.svelte';

</script>

<Router basepath="/patient">
    <Route path="/" component="{LandingPage}" />
    <Route path="/appt/:id" component="{DataCollectionPage}"/>
    <Route path="/map" component="{LocationPage}"/>
    <Route path="/screening" component="{FormPage}"/>
    <Route path="/waitlist" component="{Waitlist}"/>
</Router>