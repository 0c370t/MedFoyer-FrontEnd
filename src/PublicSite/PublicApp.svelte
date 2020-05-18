<script>
    import {Router, Route} from "svelte-routing";
    import LandingPage from "./pages/TempLanding.svelte";
    export let url = '';
</script>

<Router basepath="/" {url}>
    <Route path="/" component="{LandingPage}" />
</Router>