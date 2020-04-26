<script>
    export let options = {};
    import Uikit from 'uikit';
    import {onMount} from 'svelte';
    let target;

    onMount(()=>{
        Uikit.icon(target, options);
    })

</script>


<span bind:this={target}/>