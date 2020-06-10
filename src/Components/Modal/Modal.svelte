<script>
    export let showClose = true;
    export let open = false;
    export let id = "my-modal";

    import {onMount} from 'svelte';
    import Uikit from 'uikit';

    let modalElement;
    onMount(()=>{
        Uikit.modal(modalElement, { bgClose: showClose, escClose: showClose, modal: showClose, keyboard:showClose});
    });

    $: {
        if(open && modalElement){
            Uikit.modal(modalElement).show();
        } else if (!open && modalElement){
            Uikit.modal(modalElement).hide();
        }
    }
</script>

<div {id} class="uk-flex-top container" class:uk-open={open} bind:this={modalElement} on:hidden={() => open = false} on:shown={() => open = true} on:beforeshow on:show on:shown on:beforehide on:hide on:hidden>
    <div class="uk-modal-dialog uk-margin-auto-vertical">
        {#if showClose}
            <button class="uk-modal-close-default" type="button" uk-close></button>
        {/if}
        <div class="uk-modal-header">
            <slot name="header"/>
        </div>
        <div class="uk-modal-body">
            <slot/>
        </div>
        <div class="uk-modal-footer">
            <slot name="footer"/>
        </div>
    </div>
</div>

<style lang="scss">
    .container{
        /* The modal will be on top. Always. Forever. */
        z-index:499999 !important;
    }
</style>