<script>
    export let title = "Dashboard Item";
    export let pillText = "Test";

    export let active = false;

    const defaultClickHandler = () => active = !active;
</script>

<article class="uk-card uk-card-small uk-card-secondary uk-margin-small-right uk-card-hover uk-margin-small-left uk-padding-small uk-text-small increase-specificity" on:click={defaultClickHandler} class:active>
    <div class="uk-card-title">
        <h3>{title}</h3>
    </div>
    <div>
        <slot />
    </div>
    <div class="uk-card-badge uk-label">
        {pillText}
    </div>
</article>

<style lang="scss">
    article.increase-specificity{
        margin-top:1em;


        &.active{
            background-color:#2b3d47;
        }
        &:hover{
            background-color:#2b3d47;
        }
    }
</style>