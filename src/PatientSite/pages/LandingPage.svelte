<script>
    import {slide, fade} from 'svelte/transition';
    import {Link, navigate} from 'svelte-routing';
    import Button from "../../Components/Button/Button.svelte";
    import AnimatedLogo from "../../svg/AnimatedLogo.svelte";
    import Mount from "../../Components/Abstract/Mount.svelte";
    import Icon from "../../Components/Icon/Icon.svelte";
    import {patient_meta} from '../../helpers/stores';
    import {_, locale, locales} from 'svelte-i18n';

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
    };
    $: console.log($locale);
    $: console.log($locales);
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
                <h2 class="uk-heading-medium uk-margin-remove">{$_('LandingPage.header')}</h2>
                <hr class="uk-divider-icon uk-margin-small"/>
                <div class="uk-margin-small">
                    <label>
                        <select class="uk-select" bind:value={$locale} on:blur={(e)=>locale.set(e.target.value)}>
                            <option value="en">English</option>
                            <option value="es">Español</option>
                        </select>
                    </label>
                </div>
                <div class="uk-margin-small">
                    <Button on:click={advance} fullwidth={true}>
                        <span class="uk-text-large uk-margin-remove">
                            {$_('LandingPage.text')}
                            <Icon options="{{icon:'sign-in',ratio:2}}"/>
                        </span>
                    </Button>
                </div>
                <div>
                    <span class="uk-text-meta">
                        {$_('LandingPage.disclaimer')}<a href="/_patient/terms_and_conditions.txt" target="_blank"
                                                         class="uk-display-block">MedFoyer Terms and Conditions</a>
                    </span>
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