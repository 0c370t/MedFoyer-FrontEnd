<script>
    import {draw, fade} from 'svelte/transition';
    import {paths} from './newlogo.paths';
    import Mount from "../Components/Abstract/Mount.svelte";

    const outerShapeDraw = {
        delay: 0,
        duration: 1500
    };
    const innerShapeDraw = {
        delay: 200,
        duration: 1500
    };
    const innerShapeFill = {
        delay: 1300,
        duration: 500
    };
    const crossDraw = {
        delay: 500,
        duration: 1200
    };
</script>

<Mount>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 250 400" xml:space="preserve">
        <path transition:draw={outerShapeDraw} class="outer-shape stroke" d="{paths.outerShape}"></path>
        <path transition:draw={innerShapeDraw} class="inner-shape stroke" d="{paths.innerShape}"></path>
        <path transition:fade={innerShapeFill} class="inner-shape fill" d="{paths.innerShape}"></path>
        <path transition:draw={crossDraw} class="cross stroke" d="{paths.cross}"></path>
    </svg>
</Mount>

<style>
    svg {
        height: 5em;
    }

    path {
        fill: none;
    }

    path.outer-shape.stroke {
        stroke: #396481;
        stroke-width: 5;
        stroke-miterlimit: 10;
        transition: 5s;
    }

    path.inner-shape.stroke {
        stroke: #5FA8D8;
    }

    path.inner-shape.fill {
        fill: #5FA8D8;
    }

    path.cross.stroke {
        stroke: #5FA8D8;
        stroke-width: 4;
        stroke-miterlimit: 10;
    }
</style>