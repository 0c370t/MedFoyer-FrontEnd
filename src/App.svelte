<script>
	import {Router, Route} from "svelte-routing";
	import LandingPage from "./pages/LandingPage.svelte";
	import NewLogo from "./svg/NewLogo.svelte";

	export let url = "";
</script>

<header>
	<NewLogo/>
	<h1>MedFoyer</h1>
</header>

<Router url="{url}">
	<div>
		<Route path="/" component="{LandingPage}"/>
		<Route path="/:name" component="{LandingPage}"/>
	</div>
</Router>

<style lang="scss">
	header{
		width:100vw;
		display:flex;
		justify-content: center;
		align-items:center;
		height:6rem;
		margin-top:1rem;
		h1{
			font-size:3rem;
			letter-spacing:0.1em;
		}
		img{
			margin-right:1em;
		}
	}
</style>