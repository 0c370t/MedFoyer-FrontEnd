<script>
    import Logo from "../../svg/Logo.svelte";
    import MobileHeader from "../../Components/Layout/MobileHeader.svelte";
    import {patient_meta, waitlist_data} from "../../helpers/stores";

    let summoned = false;
    let waitlist;
    let unsub = waitlist_data.subscribe(v => waitlist = v);

    $: if (waitlist.summoned) {
        summoned = waitlist.summoned;
        unsub();
    }
    // TODO: Make this page make users feel emotions again
</script>
<MobileHeader/>
<main class="uk-container uk-container-xsmall uk-text-center uk-margin-small-top uk-flex uk-flex-column uk-flex-middle">
    {#if !summoned}
        <h3 class="uk-heading-small">You're all set!</h3>
        {#if $patient_meta.covid_flag === "NORMAL"}
            <img src="/assets/img/undraw_confirmed_81ex.svg" class="uk-height-small uk-margin-small"/>
        {/if}

        <div class="uk-text-large uk-margin-remove uk-flex uk-flex-around uk-width-1-1 uk-flex-middle">
            <span class="uk-flex-1 uk-text-right">You are</span>
            <span class="uk-heading-small uk-margin-remove uk-text-center uk-width-1-4">
            #{waitlist.position}
            </span>
            <span class="uk-flex-1 uk-text-left">in line.</span>
        </div>
        <p class="uk-text-center uk-text-large uk-margin-remove">
            Estimated wait <span class="uk-text-emphasis">{waitlist.expected_wait_time / 60} </span> minutes. </p>
        <hr class="uk-divider-icon uk-width-medium uk-align-center uk-margin-remove uk-margin-small"/>
        <p class="uk-text-center uk-margin-small">
            We'll let you know you when your doctor is ready. Please wait in your car or your favorite nearby cafe. </p>
        <p class="uk-text-large">
            See you soon. </p>
    {:else}
        <div class="uk-text-large uk-margin-remove uk-flex uk-flex-around uk-width-1-1 uk-flex-middle">
            <span class="uk-heading-small">You're up!</span>
        </div>
        {#if $patient_meta.covid_flag === "NORMAL"}
            <img src="/assets/img/undraw_confirmed_81ex.svg" class="uk-height-small uk-margin-small"/>
        {/if}
        <hr class="uk-width-3-4"/>
        <p class="uk-text-center uk-text-large uk-margin-remove">
            Please proceed inside and check in with the front desk. </p>
    {/if}

</main>