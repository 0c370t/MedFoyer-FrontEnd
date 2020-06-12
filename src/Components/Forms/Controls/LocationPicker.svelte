<script>
    import {getClient, query} from "svelte-apollo";
    import {onMount} from "svelte";
    import {GET_CLINIC_LOCATIONS_FOR_PICKER} from '../../../API/queries/clinic_locations.GQL';

    export let question;
    const client = getClient();

    const locations = query(client, {query: GET_CLINIC_LOCATIONS_FOR_PICKER});
    onMount(()=>{
        locations.refetch();
    })

</script>

<label for="{question.name}">{question.label} </label>
<select name="{question.name}" class="uk-select input {question.type} uk-flex-1" bind:value={question.value}>
    {#await $locations}
        <option>Loading...</option>
    {:then result}
        {#each result.data.getClinicLocations as location}
            <option value="{location.clinic_location_id}">{location.clinic_location_name}</option>
        {/each}
    {/await}
</select>


<style lang="scss">
    @import '../forms';
</style>