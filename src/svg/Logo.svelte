<script>
    import {draw, fade} from 'svelte/transition';
    import {path} from './logo';
    import Mount from "../Components/Abstract/Mount.svelte";

    const drawSettings = {
        delay: 300,
        duration: 1500
    };
    const fillSettings = {
        delay: 1000,
        duration: 200
    };
</script>
<Mount>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="-5 -5 105 105" xml:space="preserve">
    <path class="stroke" d="{path}" transition:draw={drawSettings}></path>
        <path class="fill" d="{path}" transition:fade={fillSettings}></path>
</svg>
</Mount>

<style>
    svg {
        height: 5em;
        width:5em;
    }

    path.stroke {
        stroke: blue;
        fill: none;
    }

    path.fill {
        stroke: none;
        fill: blue;
    }
</style>