<script>
    export let options = {};
    import Uikit from 'uikit';
    import UikitIcons from 'uikit/dist/js/uikit-icons.min';
    UikitIcons(Uikit);
    import {onMount} from 'svelte';
    let target;

    onMount(()=>{
        if(!target) console.log("Too soon bro!");
        console.log(target);
        let newOptions = options;

        let x = Uikit.icon(target, newOptions);
    })

</script>


<span bind:this={target}/>