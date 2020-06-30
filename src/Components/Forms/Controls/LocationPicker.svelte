<script>
    import {getClient, query} from "svelte-apollo";
    import {onMount} from "svelte";
    import {GET_CLINIC_LOCATIONS_FOR_PICKER} from '../../../API/queries/clinic_locations.GQL';

    export let name = "";
    export let label = "";
    export let required = false;
    export let type = "";
    export let value = "";
    export let includeAll = false;
    const client = getClient();

    const locations = query(client, {query: GET_CLINIC_LOCATIONS_FOR_PICKER});
    onMount(() => {
        locations.refetch();
    })

</script>

{#if label}
<label for="{name}">
    {#if required}<span class="uk-text-danger">*</span>{/if}
    {label}
</label>
{/if}
<select name="{name}" class="uk-select input {type} uk-flex-1" bind:value={value} required="{required}">
    {#await $locations}
        <option value="">Loading...</option>
    {:then result}
        {#if includeAll}
            <option value="ALL">All Locations</option>
        {:else}
            <option value=""></option>
        {/if}

        {#each result.data.getClinicLocations as location}
            <option value="{location.clinic_location_id}" selected={value === location.clinic_location_id}>{location.clinic_location_name}</option>
        {/each}
    {:catch}
        <option value="">An error has occured.</option>
    {/await}
</select>


<style lang="scss">
    @import '../forms';
</style>