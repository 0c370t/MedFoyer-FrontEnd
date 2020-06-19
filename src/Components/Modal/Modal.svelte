<script>
    export let showClose = true;
    export let open = false;
    export let id = "my-modal";
    export let full = false;
    export let header;
    import {onMount} from 'svelte';
    import Uikit from 'uikit';

    let modalElement;
    onMount(() => {
        Uikit.modal(modalElement, {bgClose: showClose, escClose: showClose, modal: showClose, keyboard: showClose});
        if (open) {
            Uikit.modal(modalElement).show();
        }
    });

    $: {
        if (open && modalElement && !Uikit.modal(modalElement).isToggled()) {
            Uikit.modal(modalElement).show();
        } else if (!open && modalElement && Uikit.modal(modalElement).isToggled()) {
            Uikit.modal(modalElement).hide();
        }
    }

    let fallbackHeaderElement = false;
</script>

<div {id} class="uk-flex-top container" class:uk-open={open} bind:this={modalElement} on:hidden={() => open = false}
     class:uk-modal-full={full}
             on:shown={() => open = true} on:beforeshow on:show on:shown on:beforehide on:hide on:hidden>
    {#if open}
        <div class="uk-modal-dialog" class:uk-height-viewport={full} class:uk-margin-auto-vertical={!full}>
            {#if showClose}
                <button class:uk-modal-close-default={!full} class:uk-modal-close-full={full}
                        class:uk-close-large={full} type="button" uk-close></button>
            {/if}
            {#if header}
                <div class="uk-modal-header">
                    <h3>{header}</h3>
                </div>
            {/if}
            <div class="uk-modal-body">
                <slot/>
            </div>
            <div class="uk-modal-footer">
                <slot name="footer"/>
            </div>
        </div>
    {/if}
</div>

<style lang="scss">
    .container {
        /* The modal will be on top. Always. Forever. */
        z-index: 499999 !important;
    }
</style>