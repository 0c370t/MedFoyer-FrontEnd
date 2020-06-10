<script>
    import Drop from "../Drop/Drop.svelte";
    import Icon from "../Icon/Icon.svelte";
    import {padMinutes} from "../../helpers/datetime";

    export let value = new Date();
    export let step = 1;

    const hours = [...Array(12).keys()].map(h => h + 1);
    const minutes = [...Array(60 / step).keys()].map(m => padMinutes(m * step));
    $: if (value) {
        refreshHour();
        refreshMinute();
        refreshPm();
    }
    let hour;
    let minute;
    let pm;
    const refreshHour = () => hour = hours[((value.getHours() % 12) + 11) % 12]
    const refreshMinute = () => minute = minutes[Math.floor(value.getMinutes() / step)];
    const refreshPm = () => pm = value.getHours() >= 12;
    const setHour = () => {
        // We need to handle the 12pm/12am separately because 12 > 11 but 12pm < 11pm
        // Time is amazing.
        if(hour === 12){
            pm ? value.setHours(12)
               : value.setHours(0);
        } else {
            pm ? value.setHours(hour + 12)
               : value.setHours(hour);
        }
        value = value;
    };
    const setMinute = () => {value.setMinutes(minute); value=value}
</script>

<Drop block={true} padsize="small">
    <span slot="button" class="uk-flex uk-flex-middle">
        <Icon icon="clock" _class="uk-margin-small-right"/>
        {#if value}
            <span>{hour}:{minute} {pm ? "pm" : "am"}</span>
        {:else}
            <span>Select a time</span>
        {/if}
    </span>
    <div class="uk-flex uk-flex-center uk-text-center">
        <span class="uk-flex uk-flex-column uk-flex-1 uk-flex-middle">
                <label class="uk-form-label">Hour</label>
                <select class="uk-select uk-form-width-xsmall uk-form-blank" bind:value={hour} on:change={setHour}>
                    {#each hours as hour}
                        <option value="{hour}">{hour}</option>
                    {/each}
                </select>
        </span>
        <span class="uk-flex uk-flex-column uk-flex-1 uk-flex-middle">
            <label class="uk-form-label">Minute</label>
            <select class="uk-select uk-form-width-xsmall uk-form-blank uk-flex-1" bind:value={minute} on:change={setMinute}>
                {#each minutes as minute}
                    <option value="{minute}">{minute}</option>
                {/each}
            </select>
        </span>
        <span class="uk-flex uk-flex-column uk-flex-1 uk-flex-middle">
            <label class="uk-form-label">PM</label>
            <span style="height:40px;" class="uk-flex uk-flex-middle">
                <input type="checkbox" class="uk-checkbox" bind:checked={pm} on:change={setHour}>
            </span>
        </span>
    </div>
</Drop>

<style>
    .uk-form-label {
        border-bottom: 1px solid #5FA8D8;
    }
</style>