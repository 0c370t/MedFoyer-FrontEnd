<script>
    import {slide, fade} from 'svelte/transition';
    import {Link, navigate} from 'svelte-routing';
    import Button from "../../Components/Button/Button.svelte";
    import AnimatedLogo from "../../svg/AnimatedLogo.svelte";
    import Mount from "../../Components/Abstract/Mount.svelte";
    import Icon from "../../Components/Icon/Icon.svelte";
    import {patient_meta} from '../../helpers/stores';

    const headerFade = {
        duration: 500,
        delay: 1500,
    };
    const mainSlide = {
        duration: 500,
        delay: 2000,
    };
    let appointmentExists = Object.keys($patient_meta).length > 0;
    const advance = () => {
        $patient_meta.state = "VERIFICATION";
        navigate("/patient/auth");
    }
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

                        <Button on:click={advance}>
                    <span class="uk-text-large">
                        Tap to get started <Icon options="{{icon:'sign-in',ratio:2}}"/>
                            </span>
                        </Button>

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