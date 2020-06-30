<script>
    export let clientHeight;
    export let headerHeight;
</script>

<aside class="uk-background-default" bind:clientHeight>
    <header class="uk-padding-small uk-padding-remove-vertical" bind:clientHeight={headerHeight}>
        <slot name="header"/>
    </header>
    <slot/>


</aside>

<style lang="scss">
    aside {
        position: relative;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 5em);
        header{

        }
    }
</style>