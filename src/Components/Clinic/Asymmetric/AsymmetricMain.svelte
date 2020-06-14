<script>
    export let emptyMessage;
    export let hasContent = true;
</script>

{#if hasContent}
    <main class="uk-width-1-1">
        <slot/>
    </main>
{:else}
    <main class="uk-text-center uk-padding">
        <h3>{emptyMessage}</h3>
    </main>
{/if}

<style lang="scss">
    main {
        grid-area: main;
        overflow-y: scroll;
        padding-top:2em;
    }
</style>