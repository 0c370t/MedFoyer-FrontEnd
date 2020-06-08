<script>
    export let url = "";

    import {Router, Route} from "svelte-routing";

    import Clinic from './pages/Clinic.svelte';
    import Login from './pages/Login.svelte';

</script>

<Router {url}>
    <Route path="/clinic" component="{Clinic}"/>
    <Route path="/clinic/login" component="{Login}"/>
</Router>