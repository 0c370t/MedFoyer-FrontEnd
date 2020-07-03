<script>
    import {onDestroy, onMount} from "svelte";

    export let question;
    export let i18n = false;
    let unsub = ()=>{};
    let _ = ()=>{};
    onMount(async () => {
        if (i18n) {
            unsub = (await import("svelte-i18n"))._.subscribe(v => _ = v);
        }
    });
    onDestroy(()=>unsub());
</script>
<label for="{question.name}">
    {#if question.required}<span class="uk-text-danger">*</span>{/if}
    {#if i18n}
        {_(`form.${question.name}`)}
    {:else}
        {question.label}
    {/if}
</label>

<style lang="scss">
    @import '../forms';
</style>