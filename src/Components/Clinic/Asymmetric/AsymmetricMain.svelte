<script>
    export let emptyMessage;
    export let hasContent = true;
</script>

{#if hasContent}
    <main class="uk-width-1-1 uk-position-relative">
        <slot/>
    </main>
{:else}
    <main class="uk-text-center uk-padding uk-position-relative">
        <h3>{emptyMessage}</h3>
    </main>
{/if}

<style lang="scss">
    main {
        grid-area: main;
        overflow-y: auto;
        padding-top:2em;
    }
</style>