<script>
    export let disabled = false;
    export let fullwidth = false;
    export let _class = "";
    export let loading = false;
    export let color = "default";
    const allowed_colors = [
        "default","primary","secondary","danger","text","link"
    ];
    if(!allowed_colors.includes(color)) color = "default";
    if (loading) {
        disabled = loading;
    }
</script>

<button on:click type="button" class:fullwidth disabled={loading || disabled}
        class={`uk-button uk-button-${color} uk-box-shadow-hover-large ${_class}`}>
    <span uk-spinner class:uk-hidden={!loading} class="uk-overlay uk-position-center"></span>
    <slot/>
</button>

<style lang="scss">
    @import '../../scss/variables';
    button {
        background-color: white;
        border: 1px solid;
        color: $primary-color;
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