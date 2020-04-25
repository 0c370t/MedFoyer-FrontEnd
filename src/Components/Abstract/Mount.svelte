<script>
    // Cause the transitions on mount
    let display = false;
    setTimeout(() => {
        display = true
    }, 5);
</script>


{#if display}
<slot/>
{/if}