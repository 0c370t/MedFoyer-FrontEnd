<script>
    import {paths} from "./newlogo.2.paths";

    import {fade, draw} from "svelte/transition";
    import Mount from "../Components/Abstract/Mount.svelte";

    export let speed = 1000;
</script>
<Mount>
    <svg viewBox="0 0 252.71 246.67" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px">
        <g id="fills">
            <path class="fill" id="phone_fill" d={paths.phone_bezel}
            in:fade={{duration:speed/2, delay: speed*3}}
            ></path>
            <path class="fill" id="pin_fill" d={paths.pin_body}
              in:fade={{duration:speed/2, delay: speed*3}}
            ></path>
            <path class="fill" id="pin_cross_fill" d={paths.pin_cross}
              in:fade={{duration:speed/2, delay: speed*3}}
            ></path>
        </g>
        <g id="strokes">
            <path class="stroke" id="phone_stroke" d={paths.phone_bezel}
                  in:draw={{duration:speed*2, delay: speed}}
            ></path>
            <path class="stroke" id="pin_stroke" d={paths.pin_body}
                  in:draw={{duration:speed*2, delay: speed}}
            ></path>
            <path class="stroke" id="pin_cross_stroke" d={paths.pin_cross}
                  in:draw={{duration:speed*2, delay: speed}}
            ></path>
        </g>

        <!--  White Elements -->
        <path class="fill white" id="phone_screen" d={paths.phone_screen}></path>
        <path class="fill white" id="phone_button" d={paths.phone_button}></path>
        <path class="fill white" id="pin_white" d={paths.pin_white}></path>
    </svg>
</Mount>
<style lang="scss">
    @import '../scss/variables';
    svg {
        height: 100%;
        width:auto;
    }
    path {
        stroke-width:5;
        stroke-miterlimit: 10;
    }
    path.fill {
        stroke: none;
        fill: $primary-color;
    }
    path.fill.white {
        fill: white;
    }
    path.stroke {
        stroke: $primary-color;
        fill: none;
    }
</style>