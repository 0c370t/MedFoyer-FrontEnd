<script>
    import {createClient} from "../API/init";
    import {setClient} from "svelte-apollo";
    import {Router, Route} from "svelte-routing";
    import Clinic from './pages/Clinic.svelte';
    import Login from './pages/Login.svelte';
    import CompleteProfile from './pages/CompleteProfile.svelte'
    import {CheckSession} from "../helpers/auth/ClinicAuthentication";
    export let url = "";

    const client = createClient();
    setClient(client);

    if(!window.location.pathname.includes("login")){
        CheckSession();
    }

</script>

<Router {url}>
    <Route path="/clinic" component="{Clinic}"/>
    <Route path="/clinic/login" component="{Login}"/>
    <Route path="/clinic/login/complete_profile" component="{CompleteProfile}"/>
</Router>