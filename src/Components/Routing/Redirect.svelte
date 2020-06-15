<script>
    import {navigate} from "svelte-routing";

    export let to;
    window.location.href = to;
</script>