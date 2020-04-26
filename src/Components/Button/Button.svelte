<script>
    export let disabled = false;
    export let fill = false;
</script>

<button on:click type="button" class:fill {disabled} class="uk-button uk-button-default uk-box-shadow-hover-large">
    <slot/>
</button>

<style lang="scss">
    button {
        background-color:white;
        border: 1px solid;
        color: #396481;
        padding:1em;
        line-height:1em;
        font-size:inherit;
        &:disabled:hover{
            box-shadow:none;
        }
        &:focus {
            outline-offset: 20px;
            outline-color: #5FA8D8;
            outline-width: thick;
        }
        &.fill{
            width:100%;
        }
    }
</style>