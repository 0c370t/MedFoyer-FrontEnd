<script>
    export let showClose = true;
    export let open = false;
    export let id = "my-modal";


    import {onMount} from 'svelte';
    import Uikit from 'uikit';

    let modalElement;
    onMount(()=>{
        Uikit.modal(modalElement, { bgClose: false, escClose: false, modal: false, keyboard:false});
    });

    $: {
        if(open && modalElement){
            Uikit.modal(modalElement).show();
        } else if (!open && modalElement){
            Uikit.modal(modalElement).hide();
        }
    }
</script>

<div {id} class="uk-flex-top" class:uk-open={open} bind:this={modalElement}>
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
</style>