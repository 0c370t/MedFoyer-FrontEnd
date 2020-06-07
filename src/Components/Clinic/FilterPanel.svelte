<script>
    import {createEventDispatcher} from 'svelte';
    import Drop from "../Drop/Drop.svelte";
    import Icon from "../Icon/Icon.svelte";
    import {getCurrentDateForInput} from "../../helpers/datetime";

    export let filterValues = {
        'from-time': '08:00',
        'to-time': '17:00',
        'date': getCurrentDateForInput()
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
    <form class="uk-form-horizontal" action="#" bind:this={element}>
        <legend class="uk-legend">Filters</legend>
        <div class="uk-fieldset">
            <label for="from-time" class="uk-form-label">From:</label>
            <input type="time" name="from-time" class="uk-input" bind:value={internalValues['from-time']} required/>
            <label for="to-time" class="uk-form-label">To:</label>
            <input type="time" name="to-time" class="uk-input" bind:value={internalValues['to-time']} required/>
            <label for="date" class="uk-form-label">Date:</label>
            <input type="date" name="date" class="uk-input" bind:value={internalValues['date']} required/>
        </div>
        <button type="button" class="uk-margin-small uk-button-primary uk-button" on:click={validation}>Apply</button>
    </form>
</Drop>

<style>

</style>