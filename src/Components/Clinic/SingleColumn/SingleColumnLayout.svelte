<script>

</script>

<div class="layout">
    <slot/>
</div>


<style lang="scss">
    @import '../../../scss/variables.scss';
    div.layout {
        min-height: 100vh;
        display:grid;
        grid-template-rows: 5em 1fr;
        grid-template-columns: 1fr 60% 1fr;
        grid-template-areas:
                "header header header"
                ".      center .";
        position:relative;
        background-color: $primary-color;
    }
</style>