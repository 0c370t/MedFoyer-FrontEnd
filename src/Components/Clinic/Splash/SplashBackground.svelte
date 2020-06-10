<script>
    import {onMount} from "svelte";
    import {getPicture} from "../../../API/pexels.API";


    onMount(async () => {
        let result = await getPicture("Mountain", 50);
        selectedImage = result.photos[Math.floor(Math.random() * 50)];
    });
    let selectedImage;

    let imageSrc;
    let height;
    let width;
    let photographer = "";

    $: if (selectedImage) imageSrc = `${selectedImage.src["original"]}?auto=compress&cs=tinysrgb&fit=crop&h=${height}&w=${width}`;
    $: if (selectedImage) photographer = selectedImage.photographer;
</script>


<div class="uk-cover-container uk-background-default uk-flex uk-flex-center uk-flex-middle uk-height-viewport uk-overflow-hidden uk-light"
     style={`
        background-image: url(${imageSrc});
        background-position: center;
        background-repeat: no-repeat;`}
     bind:clientHeight={height}
     bind:clientWidth={width}>
    <div class="uk-position-cover uk-overlay-primary"></div>
    <slot>

    </slot>

    <div class="uk-position-bottom-center uk-position-small uk-visible@m uk-position-z-index">
        <span class="uk-text-meta uk-text-small">Picture taken by {photographer}. Provided by <a class="uk-link-text" href="https://pexels.com" target="_blank">Pexels</a></span>
    </div>
</div>

<style>

</style>