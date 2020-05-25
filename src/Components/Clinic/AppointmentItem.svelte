<script>
    import {formatTime} from "../../helpers/datetime";

    export let appt;
    export let active = false;

    const at_risk = appt.covid_flag && appt.covid_flag !== "NORMAL";

</script>

<div class="uk-box-shadow-hover-medium uk-position-relative" on:click class:active class:at_risk>
    <h4 class="uk-margin-remove">
        {appt.name}
    </h4>
    <p class="uk-margin-remove">
        {formatTime(appt.appointment_time)}
        {#if appt.checkin_time}
            | Checked In: {formatTime(new Date(appt.checkin_time))}
        {/if}
    </p>
    <p class="uk-margin-remove">
        {appt.status}
    </p>
    {#if at_risk}
        <span class="uk-badge">AT RISK</span>
    {/if}
</div>

<style lang="scss">
    div {
        height: 6em;
        padding:1em;
        background-color:rgba(255,255,255,0.7);
        cursor:pointer;
        &.at_risk{
            border-right:#fd3636 10px solid;
        }
        &:nth-child(odd){
            background-color:rgba(255,255,255,0.5);
        }
        &.active{
            background-color: hsl(204, 61%, 80%);
        }

    }
    span.uk-badge{
        top:1em;
        right:1em;
        position:absolute;
        background-color: #fd3636;
        padding:.5em;
    }
    p{
        height:1em;
    }
    hr{
        margin-top:2em;
        margin-bottom:0;
    }
</style>