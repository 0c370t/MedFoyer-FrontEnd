<script>
	import {Router, Route} from "svelte-routing";
	import LandingPage from "./pages/LandingPage.svelte";

	export let url = "";
</script>

<Router url="{url}">
	<div>
		<Route path="/" component="{LandingPage}"/>
		<Route path="/:name" component="{LandingPage}"/>
	</div>
</Router>

