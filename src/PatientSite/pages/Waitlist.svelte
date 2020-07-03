<script>
    import Logo from "../../svg/Logo.svelte";
    import MobileHeader from "../../Components/Layout/MobileHeader.svelte";
    import {patient_meta, waitlist_data} from "../../helpers/stores";
    import Button from "../../Components/Button/Button.svelte";
    import {_} from "svelte-i18n";

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
        <h3 class="uk-heading-small">{$_("WaitlistPage.waiting.header")}</h3>
        {#if $patient_meta.covid_flag === "NORMAL"}
            <img src="/assets/img/undraw_confirmed_81ex.svg" class="uk-height-small uk-margin-small"/>
        {:else}
            <img src="/assets/img/caution.svg" class="uk-height-small uk-margin-small"/>
        {/if}

        <div class="uk-text-large uk-margin-remove uk-flex uk-flex-around uk-width-1-1 uk-flex-middle">
            <span class="uk-flex-1 uk-text-right">{$_("WaitlistPage.waiting.youAre")}</span>
            <span class="uk-heading-small uk-margin-remove uk-text-center uk-width-1-4">
            # {waitlist.position}
            </span>
            <span class="uk-flex-1 uk-text-left">{$_("WaitlistPage.waiting.inLine")}.</span>
        </div>
        <p class="uk-text-center uk-text-large uk-margin-remove">
            {$_("WaitlistPage.waiting.estimate")} <span
                class="uk-text-emphasis">{waitlist.expected_wait_time / 60} </span> {$_("WaitlistPage.waiting.minutes")}
            . </p>
        <hr class="uk-divider-icon uk-width-medium uk-align-center uk-margin-remove uk-margin-small"/>
        <p class="uk-text-center uk-margin-small">
            {$_("WaitlistPage.waiting.text")}
            {#if $patient_meta.covid_flag === "NORMAL"}
                {$_("WaitlistPage.waiting.successText")}
            {:else}
                {$_("WaitlistPage.waiting.atRiskText")}
            {/if}
        </p>
        <p class="uk-text-large">
            {$_("WaitlistPage.waiting.seeYouSoon")} </p>
    {:else}
        <div class="uk-text-large uk-margin-remove uk-flex uk-flex-around uk-width-1-1 uk-flex-middle">
            <span class="uk-heading-small">{$_("WaitlistPage.summoned")}</span>
        </div>
        {#if $patient_meta.covid_flag === "NORMAL"}
            <img src="/assets/img/undraw_confirmed_81ex.svg" class="uk-height-small uk-margin-small"/>
        {/if}
        <hr class="uk-width-3-4"/>
        {#if waitlist.telehealth_link}
            <p class="uk-text-center uk-text-large uk-margin-remove">
                {$_("WaitlistPage.telehealth")}
            </p>
            {#if waitlist.telehealth_link === "no_link"}
                {$_("WaitlistPage.waiting.telehealth_nolink")}
            {:else}
                <Button>
                    <a href="{waitlist.telehealth_link}" target="_blank">
                        {$_("WaitlistPage.telehealth_open")}
                    </a>
                </Button>
            {/if}
        {:else}
            <p class="uk-text-center uk-text-large uk-margin-remove">
                {$_("WaitlistPage.comeIn")}
            </p>
        {/if}
    {/if}

</main>