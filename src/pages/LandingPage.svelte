<script>
    import {slide, fade} from 'svelte/transition';
    import Icon from 'svelte-awesome';
    import {arrowRight} from 'svelte-awesome/icons'
    import {Link} from 'svelte-routing';
    import Button from "../Components/Button/Button.svelte";
    import AnimatedLogo from "../svg/AnimatedLogo.svelte";
    import Mount from "../Components/Abstract/Mount.svelte";

    export let name = "";
    const headerFade = {
        duration: 500,
        delay: 1500,
    };
    const mainSlide = {
        duration: 500,
        delay: 2000
    };
</script>

<Mount>
    <div class="container">
        <header>
            <span class="logo">
                <AnimatedLogo/>
            </span>
            <h1 class="uk-heading-large uk-margin-remove" transition:fade={headerFade}>MedFoyer</h1>
        </header>
        <main transition:slide={mainSlide}>
            {#if name}
                <h2 class="uk-heading-medium">Hello {name}!</h2>
            {:else}
                <h2 class="uk-heading-medium">Hello!</h2>
            {/if}
            <div>
                <Button>
                    <Link to="/map">
                    <span class="uk-text-large">
                        Tap to get started <span class="uk-icon" uk-icon="icon: sign-in; ratio: 2"/>
                    </span>
                    </Link>
                </Button>
            </div>
        </main>
    </div>
</Mount>
<style lang="scss">
    div.container {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 2rem;

        > * {
            display: block;
            margin: 0 auto;
        }

        header {

            span.logo {
                height: 8em;
                display: block;
            }
        }
    }
</style>