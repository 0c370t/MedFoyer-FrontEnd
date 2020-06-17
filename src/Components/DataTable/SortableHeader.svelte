<script>
    import Icon from "../Icon/Icon.svelte";
    export let label = "";
    export let sort;
    export let path;
    export let sortedAttribute;
    export let desc;
    export let style;
</script>

<th on:click={()=>sort(path)} {style}>
    {label}
    {#if path === sortedAttribute}
        {#if desc}
            <Icon icon="chevron-down"/>
        {:else}
            <Icon icon="chevron-up"/>
        {/if}
    {/if}
</th>

<style>
    th{
        cursor:pointer;
        user-select:none;
    }
</style>