<script>
    export let url = "";

    import {Router, Route} from "svelte-routing";
    import LandingPage from "./pages/TempLanding.svelte";
</script>

<Router {url} basepath="">
    <Route path="/" component="{LandingPage}" />
</Router>