<script>

</script>

<div class="layout">
    <slot/>
</div>

<style lang="scss">
    div.layout {
        height: 100vh;
        display: grid;
        grid-template-columns: 25% 75%;
        grid-template-rows: 5em 1fr;
        grid-template-areas: "header header" "aside main";
        position: relative;
    }
</style>