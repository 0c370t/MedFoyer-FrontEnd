<script>
    import {slide, fade} from 'svelte/transition';
    import Button from "../Components/Button/Button.svelte";
    import NewLogo from "../svg/NewLogo.svelte";
    import Mount from "../Components/Abstract/Mount.svelte";

    export let name = "";
    const headerFade = {
        duration: 500,
        delay: 1500,
    };
    const mainSlide = {
        duration: 500,
        delay: 2000
    };
</script>

<Mount>
    <div class="container">
        <header>
            <span class="logo">
                <NewLogo/>
            </span>
            <h1 transition:fade={headerFade}>MedFoyer</h1>
        </header>

        <main transition:slide={mainSlide}>
            {#if name}
                <h2>Hello {name}!</h2>
            {:else}
                <h2>Hello!</h2>
            {/if}

            <div>
                <Button>Tap here to get started</Button>
            </div>
        </main>
    </div>
</Mount>
<style lang="scss">
    div.container{
        width:100vw;
        height:100vh;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        text-align:center;
        font-size:2rem;
        > *{
            margin:3rem auto;
        }
        header{
            height:8em;
            span.logo{
                height:4em;
            }
        }
    }
</style>