<script>
    import Button from "../Button/Button.svelte";
    export let name = "";
</script>

<main>
    {#if name}
        <h2>Hello {name}!</h2>
    {:else}
        <h2>Hello!</h2>
    {/if}

    <div>
        <Button>Tap here to get started</Button>
    </div>
</main>

<style lang="scss">
    main{
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
        height:calc(60vh - 5rem);
        width:100vw;
        h2{
            font-size:4rem;
            margin-bottom:1rem;
        }
    }
</style>