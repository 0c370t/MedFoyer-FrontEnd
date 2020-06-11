<script>
    import {createEventDispatcher} from 'svelte';
    import Drop from "../Drop/Drop.svelte";
    import Icon from "../Icon/Icon.svelte";
    import DatePicker from "../DatePicker/DatePicker.svelte";
    import TimePicker from "../TimePicker/TimePicker.svelte";
    import Callout from "../Callout/Callout.svelte";

    export let filterValues;

    let internalValues = Object.assign({}, filterValues);

    const dispatch = createEventDispatcher();
    const validation = () => {
        message = "";
        if (internalValues.from > internalValues.to) {
            message = "From must be before To!";
            return;
        }
        dispatch('filter', internalValues);
    };
    const resetFilters = () => {
        message = "";
        internalValues = Object.assign({}, filterValues);
    };
    let message = "";
</script>
<Drop on:hidden={resetFilters}>
    <span slot="button"><Icon icon="settings"/></span>
    <legend class="uk-legend">Filters</legend>
    <div class="uk-fieldset">
        <label for="from-time" class="uk-form-label uk-display-block">From:</label>
        <div class="uk-flex uk-flex-column">
            <DatePicker bind:value={internalValues['from']} required={true} fullwidth={true}
                        end={internalValues.to}/>
            <TimePicker bind:value={internalValues['from']} fullwidth={true}/>
        </div>
        <label for="to-time" class="uk-form-label uk-display-block">To:</label>
        <div class="uk-flex uk-flex-column">
            <DatePicker bind:value={internalValues.to} required={true} fullwidth={true}
                        start={internalValues['from']}/>
            <TimePicker bind:value={internalValues.to} fullwidth={true}/>
        </div>
    </div>
    <div class="uk-inline">
        <button type="button" class="uk-margin-small uk-button-primary uk-button" on:click={validation}>Apply</button>
        <Callout position="bottom" visible={message}>
            {message}
        </Callout>
    </div>
</Drop>

<style>

</style>