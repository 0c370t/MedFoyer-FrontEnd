<script>
    import {getClient, query} from "svelte-apollo";
    import {GET_ALL_PATIENTS} from '../../../API/queries/patients.GQL';
    import {onMount} from "svelte";

    export let name = "";
    export let label = "";
    export let required = false;
    export let type = "";
    export let value = "";
    export let includeAll = false;

    const client = getClient();

    const patients = query(client, {query: GET_ALL_PATIENTS});

    onMount(() => {
        patients.refetch();
    })

</script>

{#if label}
    <label for="{name}">
        {#if required}<span class="uk-text-danger">*</span>{/if}
        {label}
    </label>
{/if}
<select name="{name}" class="uk-select input {type} uk-flex-1" bind:value={value} required="{required}">
    {#await $patients}
        <option value="">Loading...</option>
    {:then result}
        <option value=""></option>
        {#each result.data.listPatients as patient}
            <option selected={value === patient.patient_id} value="{patient.patient_id}">{patient.name}</option>
        {/each}
    {/await}
</select>

<style lang="scss">
    @import '../forms';
</style>