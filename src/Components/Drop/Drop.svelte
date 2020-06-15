<script>
    import Button from "../Button/Button.svelte";
    import UIKit from 'uikit';
    // UIKit component options
    export let pos = "bottom-center";
    export let mode = "click";
    export let delayShow = 0;
    export let delayHide = 800;
    export let flip = true;
    export let offset = 0;
    export let animation = false;
    export let duration = 200;
    export let boundary = "body";
    export let boundaryAlign = true;
    export let padsize = "normal";
    export let _class = "";
    export let wait = false;
    const padsizings = ["normal", "small", "large", "remove"];
    if (!padsizings.includes(padsize)) {
        padsize = "";
    } else {
        if (padsize === "normal") {
            padsize = "";
        } else {
            padsize = "-" + padsize;
        }
    }

    export let block = false;


    const id = Math.floor(Math.random() * 10000);

    let wrapperElement;

    $: if (wrapperElement) {
        const options = {
            pos, flip, offset, animation, duration, boundary, mode,
            "delay-show": delayShow, "delay-hide": delayHide, "boundary-align": boundaryAlign
        };
        UIKit.drop(wrapperElement, options)
    }

    export const hide = (delay) => UIKit.drop(wrapperElement).hide(delay);
    export const show = () => UIKit.drop(wrapperElement).show();


</script>


<div class="uk-inline">
    <slot name="full-button">
        <Button _class={`uk-button uk-button-default mf-drop-${id} ${block ? "uk-display-block" : ""}`} disabled={wait}>
            <slot name="button">Drop</slot>
        </Button>
    </slot>

    <div bind:this={wrapperElement} class={`uk-card uk-card-default uk-padding${padsize} ${_class}`} on:toggle on:beforeshow
         on:show on:shown on:beforehide on:hide on:hidden on:stack>

        <slot/>
    </div>
</div>
<style>
    .uk-card{
        max-width:unset;
    }
    .uk-card{
        z-index:1000000;
    }
</style>