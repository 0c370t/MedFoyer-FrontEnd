<script>
    import AnimatedLogo from "../../svg/AnimatedLogo.svelte";
    import Icon from "../../Components/Icon/Icon.svelte";
    import {getPicture} from '../../API/pexels.API';
    import {onMount} from "svelte";

    onMount(async () => {
        let result = await getPicture("Mountain", 50);
        let baseUrl = result.photos[Math.floor(Math.random() * 50)].src["original"];
        imageSrc = `${baseUrl}?auto=compress&cs=tinysrgb&fit=crop&h=${window.innerHeight}&w=${window.innerWidth}`;
    });

    let imageSrc;


</script>

<div class="uk-cover-container uk-background-default uk-flex uk-flex-center uk-flex-middle uk-height-viewport uk-overflow-hidden"
     style={`
        background-image: url(${imageSrc});
        background-position: center;
        background-repeat: no-repeat;`}>
    <div class="uk-position-cover uk-overlay-primary"></div>
    <main class="uk-width-medium uk-padding-small uk-position-z-index uk-scrollspy-inview uk-animation-fade uk-overlay-default uk-border-rounded">
        <header class="uk-flex uk-flex-column uk-flex-middle uk-flex-center uk-margin-medium-bottom">
            <span class="logo-wrapper"><AnimatedLogo/></span>
            <h1 class="uk-margin-remove">MedFoyer</h1>
        </header>

        <form class="toggle-class" action="#">
            <fieldset class="uk-fieldset">
                <div class="uk-margin-small">
                    <div class="uk-inline uk-width-1-1">
                        <Icon _class="uk-form-icon uk-form-icon-flip" icon="user"/>
                        <input class="uk-input uk-border-pill" required placeholder="Username" type="text">
                    </div>
                </div>
                <div class="uk-margin-small">
                    <div class="uk-inline uk-width-1-1">
                        <Icon _class="uk-form-icon uk-form-icon-flip" icon="lock"/>
                        <input class="uk-input uk-border-pill" required placeholder="Password" type="password">
                    </div>
                </div>
                <div class="uk-margin-small">
                    <label><input class="uk-checkbox" type="checkbox"> Keep me logged in</label>
                </div>
                <div class="uk-margin-bottom">
                    <button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1">
                        LOG IN
                    </button>
                </div>
            </fieldset>
        </form>
    </main>
</div>


<style lang="scss">
    header {
        height: 10em;

        .logo-wrapper {
            height: 8em;
        }
    }

    .uk-cover-container {

    }

</style>