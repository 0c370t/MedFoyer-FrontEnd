<script>
    import SplashBackground from "./SplashBackground.svelte";
    import Spinner from "../../Spinner/Spinner.svelte";
    import AnimatedLogo from "../../../svg/AnimatedLogo.svelte";
    import {fly} from 'svelte/transition';
    export let loading = false;
</script>
<SplashBackground>
    <Spinner show={loading}/>
    <main class="uk-width-medium uk-padding-small uk-position-z-index uk-scrollspy-inview uk-animation-fade uk-border-rounded uk-position-relative">
        <header class="uk-flex uk-flex-column uk-flex-middle uk-flex-center uk-margin-medium-bottom">
            <span class="logo-wrapper"><AnimatedLogo/></span>
            <h1 class="uk-margin-remove">MedFoyer</h1>
        </header>
        <div transition:fly={{duration:500, y: 150, delay:500}}>
            <slot />
        </div>
    </main>
</SplashBackground>
<style lang="scss">
    main {
        background: rgba(0, 0, 0, 0.4);
    }

    header {
        height: 10em;

        .logo-wrapper {
            height: 8em;
        }
    }
</style>