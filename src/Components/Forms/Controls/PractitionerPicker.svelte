<script>
    import {getClient, query} from "svelte-apollo";
    import {onMount} from "svelte";
    import {GET_ALL_PRACTITIONERS} from "../../../API/queries/practitioners.GQL";

    export let name = "";
    export let label = "";
    export let required = false;
    export let type = "";
    export let value = "";
    export let includeAll = false;

    const client = getClient();

    const practitioners = query(client, {query: GET_ALL_PRACTITIONERS});

    onMount(() => {
        practitioners.refetch();
    })

</script>

{#if label}
    <label for="{name}">
        {#if required}<span class="uk-text-danger">*</span>{/if}
        {label}
    </label>
{/if}
<select name="{name}" class="uk-select input {type} uk-flex-1" bind:value={value} required="{required}">
    {#await $practitioners}
        <option value="">Loading...</option>
    {:then result}
        {#if includeAll}
            <option value="ALL">All Practitioners</option>
        {:else}
            <option value=""></option>
        {/if}
        {#each result.data.listPractitioners as prac}
            <option selected={value === prac.practitioner_id} value="{prac.practitioner_id}">{prac.name}</option>
        {/each}
    {/await}
</select>

<style lang="scss">
    @import '../forms';
</style>