<script>
    import {Router, Route} from "svelte-routing";
    import AppointmentDashboard from './pages/AppointmentDashboard.svelte';

    console.log("TEST");
    export let url = '';
</script>

<Router basepath="/clinic" url="{url}">
    <Route path="/*" component="{AppointmentDashboard}"/>
</Router>
