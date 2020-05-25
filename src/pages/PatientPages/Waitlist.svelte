<script>
    import Logo from "../../svg/Logo.svelte";
    import MobileHeader from "../../Components/Layout/MobileHeader.svelte";

</script>
<MobileHeader/>
<div class="container uk-container uk-container-small uk-text-center uk-margin-medium-top">
    <main>
        <h3 class="uk-heading-divider uk-heading-small">Thank you for checking in!</h3>
        <p class="uk-text-large uk-text-center">
            You are
            <span class="uk-heading-small uk-display-block uk-margin-remove">
                5th
            </span>
            in line
        </p>

    </main>
</div>
<style lang="scss">

    div.container {
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