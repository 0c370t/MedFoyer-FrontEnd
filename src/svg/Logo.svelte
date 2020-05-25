<script>
    import {paths} from './newlogo.paths';

</script>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 250 400" xml:space="preserve">
    <path class="outer-shape stroke" d="{paths.outerShape}"></path>
    <path class="inner-shape stroke" d="{paths.innerShape}"></path>
    <path class="inner-shape fill" d="{paths.innerShape}"></path>
    <path class="cross stroke" d="{paths.cross}"></path>
</svg>

<style>
    svg {
        height: 100%;
        width:auto;
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