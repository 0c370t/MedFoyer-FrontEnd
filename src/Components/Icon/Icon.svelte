<script>
    export let options = {};
    export let icon = false;
    export let _class = '';

    import Uikit from 'uikit';
    import UikitIcons from 'uikit/dist/js/uikit-icons.min';
    UikitIcons(Uikit);
    import {onMount} from 'svelte';
    let target;

    onMount(()=>{
        if(!target) console.log("Too soon bro!");
        let newOptions = options;
        if(icon)
            options['icon'] = icon;


        let x = Uikit.icon(target, newOptions);
    })

</script>


<span class={_class} bind:this={target}/>