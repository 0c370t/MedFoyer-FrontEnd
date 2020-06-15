<script>
    import Icon from "../../Icon/Icon.svelte";

    export let validationMessage = "";
    export let message = "BUTTON";
    export let icon = false;
</script>
<div class="uk-margin-bottom uk-text-center">
    <span class="uk-text-danger uk-text-emphasis">{validationMessage}</span>
    <div class="uk-inline uk-width-1-1">
        {#if icon}
            <Icon {icon} _class="uk-form-icon uk-form-icon-flip"/>
        {/if}
        <button type="button" class="uk-button uk-button-default uk-border-pill uk-width-1-1" on:click>
            {message}
        </button>
    </div>
</div>