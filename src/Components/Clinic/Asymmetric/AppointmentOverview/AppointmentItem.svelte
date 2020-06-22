<script>
    import {formatTime} from "../../../../helpers/datetime";
    import {fly} from "svelte/transition";

    export let appt;
    export let active = false;
    export let index = 0;
    let at_risk = Boolean(appt.covid_flag) && appt.covid_flag !== "NORMAL";
    $: at_risk = Boolean(appt.covid_flag) && appt.covid_flag !== "NORMAL";
</script>

<div class="uk-box-shadow-hover-medium uk-position-relative" on:click class:active class:at_risk
     in:fly={{delay: index*50, duration:200, x: -50}} out:fly={{delay: index*50, duration:200, x: 50}}>
    <span class="uk-flex uk-flex-between uk-flex-middle">
        <h4 class="uk-margin-remove">
            {#if appt.patient}
                {appt.patient.given_name} {appt.patient.last_name}
            {:else}
                Unnamed
            {/if}
        </h4>
        <span class="uk-text-small">
            {appt.clinic_location ? appt.clinic_location.clinic_location_name : ""}
        </span>
    </span>
    <p class="uk-margin-remove">
        {formatTime(appt.appointment_time)}
        {#if appt.check_in_time}
            | Checked In: {formatTime(new Date(appt.check_in_time))}
        {/if}
    </p>
    {#if at_risk}

        {#if appt.covid_flag === "AT_RISK"}
            <p class="uk-margin-small uk-position-absolute uk-position-bottom-right">
                <span class="uk-label uk-label-warning">AT RISK | {appt.status === "SUMMONED" ? "SUMMONED" : "WAITING"}</span>
            </p>
        {:else}
            <p class="uk-margin-small uk-position-absolute uk-position-bottom-right" style="right:-10px;">
                <span class="uk-label uk-label-danger">HIGH RISK | {appt.status === "SUMMONED" ? "SUMMONED" : "WAITING"}</span>
            </p>
        {/if}

    {:else if appt.check_in_time}
        <p class="uk-margin-small uk-position-absolute uk-position-bottom-right">

            {#if appt.status === "SUMMONED"}
                <span class="uk-label uk-label-success">SUMMONED</span>
            {:else if appt.status === "FILLING_FORMS"}
                <span class="uk-label uk-label-default">FILLING PAPERWORK</span>
            {:else}
                <span class="uk-label uk-label-default">WAITING</span>
            {/if}
        </p>
    {/if}
</div>

<style lang="scss">
    div {
        height: 6em;
        padding: 1em;
        background-color: rgba(255, 255, 255, 0.7);
        cursor: pointer;

        &.at_risk {
            border-right: #f0506e 10px solid;
        }

        &:nth-child(odd) {
            background-color: rgba(255, 255, 255, 0.5);
        }

        &.active {
            background-color: hsl(204, 61%, 80%);
        }

    }

    p {
        height: 1em;
    }

    hr {
        margin-top: 2em;
        margin-bottom: 0;
    }
</style>