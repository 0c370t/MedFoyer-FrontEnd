<script>
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

    const id = Math.floor(Math.random() * 10000);

    let wrapperElement;

    $: if (wrapperElement) {
        const options = {
            pos, flip, offset, animation, duration, boundary, mode,
            "delay-show": delayShow, "delay-hide": delayHide, "boundary-align": boundaryAlign
        };
        UIKit.drop(wrapperElement, options)
    }

</script>


<div class="uk-inline">
    <button class={`uk-button uk-button-default mf-drop-${id}`}>
        <slot name="button">Drop</slot>
    </button>

    <div bind:this={wrapperElement} class="uk-card uk-card-default uk-padding"
        on:toggle on:beforeshow on:show on:shown on:beforehide on:hide on:hidden on:stack
    >
        <slot/>
    </div>
</div>