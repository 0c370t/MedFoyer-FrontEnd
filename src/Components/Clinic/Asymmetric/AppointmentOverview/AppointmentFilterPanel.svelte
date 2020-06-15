<script>
    import {createEventDispatcher} from 'svelte';
    import Drop from "../../../Drop/Drop.svelte";
    import Icon from "../../../Icon/Icon.svelte";
    import DatePicker from "../../../DatePicker/DatePicker.svelte";
    import TimePicker from "../../../TimePicker/TimePicker.svelte";
    import Callout from "../../../Callout/Callout.svelte";
    import LocationPicker from "../../../Forms/Controls/LocationPicker.svelte";

    export let filterValues;
    export let loading = false;
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
<Drop on:hidden={resetFilters} _class="uk-width-large" wait={loading}>
    <span slot="button"><Icon icon="search"/></span>
    <legend class="uk-legend">Filters</legend>
    <div class="uk-grid uk-child-width-1-2 uk-grid-gap-medium">
        <div class="uk-fieldset">
            <label for="from-time" class="uk-form-label uk-display-block">From:</label>
            <div class="uk-flex uk-flex-column">
                <DatePicker bind:value={internalValues['from']} required={true} fullwidth={true}
                            end={internalValues.to} _class="uk-margin-small"/>
                <TimePicker bind:value={internalValues['from']} fullwidth={true} step="5" _class="uk-margin-small"/>
            </div>
            <label for="to-time" class="uk-form-label uk-display-block">To:</label>
            <div class="uk-flex uk-flex-column">
                <DatePicker bind:value={internalValues.to} required={true} fullwidth={true}
                            start={internalValues['from']} _class="uk-margin-small"/>
                <TimePicker bind:value={internalValues.to} fullwidth={true} step="5" _class="uk-margin-small"/>
            </div>
        </div>
        <div class="uk-fieldset">
            <label for="location" class="uk-form-label uk-display-block">
                Location:
            </label>
            <div>
                <LocationPicker includeAll="true" bind:value={internalValues.location}/>
            </div>
        </div>
    </div>
    <div class="uk-inline uk-margin-small-top">
        <button type="button" class="uk-margin-small uk-button-primary uk-button" on:click={validation}>Apply</button>
        <Callout position="bottom" visible={message}>
            {message}
        </Callout>
    </div>
</Drop>

<style>

</style>