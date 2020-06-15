<script>
    import {formatTime} from "../../../../helpers/datetime";
    import {fly} from "svelte/transition";

    export let appt;
    export let active = false;
    export let index = 0;
    const at_risk = appt.covid_flag && appt.covid_flag !== "NORMAL";
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
    <p class="uk-margin-remove">
        {appt.status}
    </p>
    {#if at_risk}
        <span class="uk-badge danger">AT RISK</span>
    {:else if appt.check_in_time && appt.status != "FILLING_FORMS"}
        <span class="uk-badge success">OK</span>
    {/if}
</div>

<style lang="scss">
    div {
        height: 6em;
        padding: 1em;
        background-color: rgba(255, 255, 255, 0.7);
        cursor: pointer;

        &.at_risk {
            border-right: #fd3636 10px solid;
        }

        &:nth-child(odd) {
            background-color: rgba(255, 255, 255, 0.5);
        }

        &.active {
            background-color: hsl(204, 61%, 80%);
        }

    }

    span.uk-badge {
        bottom: 1em;
        right: 1em;
        position: absolute;
        padding: .5em;
        color: white;

        &.danger {
            background-color: #fd3636;
        }

        &.success {
            background-color: #32d296;
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