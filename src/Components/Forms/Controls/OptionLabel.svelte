<script>
    import {onDestroy, onMount} from "svelte";

    export let option;
    export let question;
    export let i18n = false;
    let unsub = () => {};
    let _ = () => {
    };
    onMount(async () => {
        if (i18n) {
            unsub = (await import("svelte-i18n"))._.subscribe(v => _ = v);
        }
    });
    onDestroy(() => unsub());
</script>

<label>
    {#if i18n}
        {_(`form.options.${question.name}.${option.value}`)}
    {:else}
        {option.label}
    {/if}

</label>