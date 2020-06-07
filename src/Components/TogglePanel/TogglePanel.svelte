<script>
    import Icon from "../Icon/Icon.svelte";
    let shown = false;
</script>
<div class="uk-padding-large">
{#if shown}
    <div class="uk-height-large uk-width-large uk-background-default">
        <button class="uk-button uk-button-default" on:click={()=>shown = false}>
            <Icon options={{icon:"close"}}/>
        </button>
    </div>
{:else}
    <button class="uk-button uk-button-default uk-box-shadow-hover-small" on:click={()=>shown = true}>
        <Icon options={{icon:"more"}}/>
    </button>
{/if}
</div>


<style>

</style>