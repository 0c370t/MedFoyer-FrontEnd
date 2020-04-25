<script>

</script>

<button on:click>
    <slot/>
</button>

<style lang="scss">
    button{
        padding:1em;
        background-color:transparent;
        border:1px solid;
        color:#396481;
        font-size:1.5rem;
        transition: box-shadow 1s;
    &:hover{
         box-shadow:0.2em 0.2em 20px 5px rgba(0,0,0,0.5); // Dark Blue
     }
    }
</style>