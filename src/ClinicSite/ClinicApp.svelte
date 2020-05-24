<script>
    import {Router, Route} from "svelte-routing";
    // import AppointmentDashboard from './pages/AppointmentDashboard.svelte';
    import ClinicHome from './pages/ClinicHome.svelte';
    
    export let url = '';
</script>

<Router basepath="/clinic" url="{url}">
    <Route path="/*" component="{ClinicHome}"/>
</Router>
