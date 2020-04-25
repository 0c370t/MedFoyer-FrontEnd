<script>
	import {Router, Route} from "svelte-routing";
	import LandingPage from "./pages/LandingPage.svelte";
	import LocationPage from './pages/LocationPage.svelte';
	export let url = "";
</script>

<Router url="{url}">
		<Route path="/" component="{LandingPage}"/>
		<Route path="/:name" component="{LandingPage}"/>
		<Route path="/map" component="{LocationPage}"/>
</Router>

