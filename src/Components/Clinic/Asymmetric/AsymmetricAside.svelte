<script>

</script>

<aside class="uk-background-default">
    <header class="uk-padding-small uk-padding-remove-vertical">
        <slot name="header"/>
    </header>
    <slot/>


</aside>

<style lang="scss">
    aside {
        position: relative;
        display: flex;
        flex-direction: column;
        header{

        }
    }
</style>