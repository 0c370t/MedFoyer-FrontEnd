<script>
    import {slide} from 'svelte/transition';

    export let visible = true;
    export let position = "right";
    const positions = ["top", "right", "bottom", "left"];
    if (!positions.includes(position)) position = "right";

</script>

{#if visible}
    <div class={`uk-border-rounded ${position} uk-position-z-index`} in:slide={{delay: 600}} out:slide>
        <p>
            <slot>
                This is a callout!
            </slot>
        </p>
    </div>
{/if}
<style lang="scss">
    @import '../../scss/variables';

    div {
        position: absolute;
        display: block;
        padding: 0 .5em;
        background-color: white;
        color: $primary-color;
        height: 2em;
        line-height: 2em;
        white-space: nowrap;

        &::before {
            display: block;
            content: "";
            position: absolute;
            width: 0px;
            height: 0px;
        }

        &.top {
            left: 50%;
            top: 0;
            transform: translateX(-50%) translateY(calc(-100% - .5em));

            &::before {
                left: 50%;
                bottom: 0;

                border-right: .5em transparent solid;
                border-left: .5em transparent solid;
                border-top: .5em white solid;

                transform: translateX(-50%) translateY(100%);
            }
        }

        &.bottom {
            left: 50%;
            bottom: 0;
            transform: translateX(-50%) translateY(calc(100% + .5em));

            &::before {
                left: 50%;
                top: 0;

                border-right: .5em transparent solid;
                border-left: .5em transparent solid;
                border-bottom: .5em white solid;

                transform: translateX(-50%) translateY(-100%);
            }
        }

        &.right {
            top: 50%;
            right: 0;
            transform: translateY(-50%) translateX(calc(100% + .5em));

            &::before {
                left: 0;
                top: 0;

                border-top: .5em transparent solid;
                border-bottom: .5em transparent solid;
                border-right: .5em white solid;

                transform: translateY(0.5em) translateX(-85%);
            }
        }

        &.left {
            top: 50%;
            left: 0;
            transform: translateY(-50%) translateX(calc(-100% - .5em));

            &::before {
                right: 0;
                top: 0;

                border-top: .5em transparent solid;
                border-bottom: .5em transparent solid;
                border-left: .5em white solid;

                transform: translateY(.5em) translateX(85%);
            }
        }
    }

</style>