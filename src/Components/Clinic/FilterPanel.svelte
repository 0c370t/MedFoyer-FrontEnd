<script>
    import {createEventDispatcher} from 'svelte';
    import Drop from "../Drop/Drop.svelte";
    import Icon from "../Icon/Icon.svelte";
    import {getCurrentDateForInput} from "../../helpers/datetime";
    import DatePicker from "../DatePicker/DatePicker.svelte";
    import TimePicker from "../TimePicker/TimePicker.svelte";

    export let filterValues = {

        'to-time': '17:00',
        'date': new Date()
    };
    let element;

    let internalValues = Object.assign({}, filterValues);

    const dispatch = createEventDispatcher();
    const validation = () => {
        if (element.reportValidity()) {
            dispatch('filter', internalValues);
        }
    };
    const resetFilters = () => {
        internalValues = Object.assign({}, filterValues);
    };

</script>

<Drop on:hidden={resetFilters}>
    <span slot="button"><Icon icon="settings"/></span>
    <form action="#" bind:this={element}>
        <legend class="uk-legend">Filters</legend>
        <div class="uk-fieldset">
            <label for="from-time" class="uk-form-label uk-display-block">From:</label>
            <div class="uk-flex">
                <DatePicker bind:value={internalValues['from']} required={true}/>
                <TimePicker bind:value={internalValues['from']}/>
            </div>
            <label for="to-time" class="uk-form-label uk-display-block">To:</label>
            <div class="uk-flex">
                <DatePicker bind:value={internalValues['to']} required={true}/>
                <TimePicker bind:value={internalValues['to']}/>
            </div>

        </div>
        <button type="button" class="uk-margin-small uk-button-primary uk-button" on:click={validation}>Apply</button>
    </form>
</Drop>

<style>

</style>