<script>
    import Logo from "../../svg/Logo.svelte";
    import MobileHeader from "../../Components/Layout/MobileHeader.svelte";

</script>
<MobileHeader/>
    <main class="container uk-container uk-container-small uk-text-center uk-margin-small-top">
        <h3 class="uk-heading-medium">Thank you for checking in!</h3>
        <p class="uk-text-large uk-text-center uk-margin-remove">
            You are
            <span class="uk-heading-small uk-display-block uk-margin-remove">
                5th
            </span>
            in line
        </p>
        <hr class="uk-divider-icon uk-width-medium uk-align-center uk-margin-small"/>
        <p class="uk-text-center uk-margin-small uk-text-large">
            Approximate wait time: <span class="uk-text-emphasis">20 minutes</span>
        </p>
        <p class="uk-text-center uk-margin-small">
            We'll text you when your doctor is ready. Please wait in your car or your favorite nearby cafe. See you soon.
        </p>

    </main>
<style lang="scss">

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    header {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.3em;
        top: 2em;
        background-color: rgba(255, 255, 255, 0.5);
        height: 6em;
        z-index: 1;
        margin-bottom:2em;
    }
    main{
        display:flex;
        flex-direction: column;
        align-items:center;
    }

</style>