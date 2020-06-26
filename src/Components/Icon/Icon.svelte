<script>
    export let options = {};
    export let icon = false;
    export let _class = '';
    export let title = "";
    import Uikit from 'uikit';
    import UikitIcons from 'uikit/dist/js/uikit-icons.min';
    UikitIcons(Uikit);
    import {onMount} from 'svelte';
    let target;

    onMount(()=>{
        let newOptions = options;
        if(icon)
            options['icon'] = icon;


        let x = Uikit.icon(target, newOptions);
    })

</script>


<span class={_class} bind:this={target} on:click {title}/>