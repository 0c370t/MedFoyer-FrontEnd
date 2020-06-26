<script>
    import Spinner from "../Spinner/Spinner.svelte";
    export let disabled = false;
    export let fullwidth = false;
    export let _class = "";
    export let loading = false;
    export let color = "default";
    export let title = "";
    const allowed_colors = [ "default","primary","secondary","danger","text","link" ];
    if(!allowed_colors.includes(color)) color = "default";
    if (loading) {
        disabled = loading;
    }
</script>

<button on:click type="button" class:fullwidth disabled={loading || disabled} {title}
        class={`uk-button uk-button-${color} uk-box-shadow-hover-large ${_class} uk-position-relative`}>
    <Spinner show="{loading}"/>
    <slot/>
</button>

<style lang="scss">
    @import '../../scss/variables';
    button {
        &.uk-button-default{
            background-color: white;
            color: $primary-color;
        }
        border: 1px solid currentColor;
        padding: 1em;
        line-height: 1em;
        font-size: inherit;
        display: flex;
        align-items: center;
        justify-content: center;

        &:disabled:hover {
            box-shadow: none;
        }

        &:focus {
            outline-offset: 20px;
            outline-color: $secondary-color;
            outline-width: thick;
        }

        &.fullwidth {
            width: 100%;
        }
    }
</style>