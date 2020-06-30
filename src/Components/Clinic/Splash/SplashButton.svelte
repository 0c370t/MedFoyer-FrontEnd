<script>
    import Icon from "../../Icon/Icon.svelte";

    export let validationMessage = "";
    export let message = "BUTTON";
    export let icon = false;
    export let disabled = false;
</script>
<div class="uk-margin-small-bottom uk-text-center">
    <p class="uk-text-danger uk-text-emphasis uk-margin-small-bottom">{validationMessage}</p>
    <div class="uk-inline uk-width-1-1">
        {#if icon}
            <Icon {icon} _class="uk-form-icon uk-form-icon-flip"/>
        {/if}
        <button type="button" class="uk-button uk-button-default uk-border-pill uk-width-1-1" on:click {disabled} class:uk-disabled={disabled}>
            {message}
        </button>
    </div>
</div>