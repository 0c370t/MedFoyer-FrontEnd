<script>
    export let disabled = false;
    export let fill = false;
    export let _class = "";
    export let loading = false;
    if(loading){
        disabled = loading;
    }
</script>

<button on:click type="button" class:fill disabled={loading || disabled} class={"uk-button uk-button-default uk-box-shadow-hover-large " + _class}>
    <div uk-spinner class:uk-hidden={!loading} class="uk-overlay uk-position-center"/>
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
        display: flex;
        align-items: center;
        justify-content: center;

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