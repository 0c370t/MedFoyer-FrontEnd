<script>
    import {slide, fade} from 'svelte/transition';
    import {Link} from 'svelte-routing';
    import Button from "../../Components/Button/Button.svelte";
    import AnimatedLogo from "../../svg/AnimatedLogo.svelte";
    import Mount from "../../Components/Abstract/Mount.svelte";
    import Icon from "../../Components/Icon/Icon.svelte";
    import {appt} from '../../helpers/stores';

    const headerFade = {
        duration: 500,
        delay: 1500,
    };
    const mainSlide = {
        duration: 500,
        delay: 2000,
    };
    let appointmentExists = Object.keys($appt).length > 0;
</script>

<Mount>
    <div class="container">
        <header>
            <span class="logo">
                <AnimatedLogo/>
            </span>
            <h1 class="uk-heading-large uk-margin-remove" in:fade={headerFade}>MedFoyer</h1>
        </header>
        {#if appointmentExists}
            <main in:slide={mainSlide} class="uk-margin-medium">
                <h2 class="uk-heading-medium uk-margin-remove">Welcome</h2>
                <hr class="uk-divider-icon uk-margin-small"/>
                <div>

                    <Link to="/auth">
                        <Button>
                    <span class="uk-text-large">
                        Tap to get started <Icon options="{{icon:'sign-in',ratio:2}}"/>
                            </span>
                        </Button>
                    </Link>

                </div>
            </main>
        {/if}
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