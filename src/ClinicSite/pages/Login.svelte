<script>
    import AnimatedLogo from "../../svg/AnimatedLogo.svelte";
    import Icon from "../../Components/Icon/Icon.svelte";
    import {getPicture} from '../../API/pexels.API';
    import {onMount} from "svelte";
    import {navigate} from "svelte-routing";
    import {Auth} from 'aws-amplify';

    onMount(async () => {
        let result = await getPicture("Mountain", 50);
        selectedImage = result.photos[Math.floor(Math.random() * 50)];
    });

    const doLogin = () => {
        try{
            // Auth.signIn(username, password)
        } catch(err){
            // Do things
        }
        navigate("/clinic")
    };

    let username;
    let password;
    let selectedImage;

    let imageSrc;
    let height;
    let width;
    let photographer = "";
    $: if(selectedImage) imageSrc = `${selectedImage.src["original"]}?auto=compress&cs=tinysrgb&fit=crop&h=${height}&w=${width}`;
    $: if(selectedImage) photographer = selectedImage.photographer;



</script>

<div class="uk-cover-container uk-background-default uk-flex uk-flex-center uk-flex-middle uk-height-viewport uk-overflow-hidden uk-light"
     style={`
        background-image: url(${imageSrc});
        background-position: center;
        background-repeat: no-repeat;`}
        bind:clientHeight={height}
        bind:clientWidth={width}>
    <div class="uk-position-cover uk-overlay-primary"></div>
    <main class="uk-width-medium uk-padding-small uk-position-z-index uk-scrollspy-inview uk-animation-fade uk-border-rounded">
        <header class="uk-flex uk-flex-column uk-flex-middle uk-flex-center uk-margin-medium-bottom">
            <span class="logo-wrapper"><AnimatedLogo/></span>
            <h1 class="uk-margin-remove">MedFoyer</h1>
        </header>

        <form class="toggle-class" action="#">
            <fieldset class="uk-fieldset">
                <div class="uk-margin-small">
                    <div class="uk-inline uk-width-1-1">
                        <Icon _class="uk-form-icon uk-form-icon-flip" icon="user"/>
                        <input class="uk-input uk-border-pill" required placeholder="Username" type="text" bind:value={username}>
                    </div>
                </div>
                <div class="uk-margin-small">
                    <div class="uk-inline uk-width-1-1">
                        <Icon _class="uk-form-icon uk-form-icon-flip" icon="lock"/>
                        <input class="uk-input uk-border-pill" required placeholder="Password" type="password" bind:value={password}>
                    </div>
                </div>
                <div class="uk-margin-small">
                    <label><input class="uk-checkbox" type="checkbox"> Keep me logged in</label>
                </div>
                <div class="uk-margin-bottom">
                    <button type="button" class="uk-button uk-button-primary uk-border-pill uk-width-1-1" on:click={doLogin}>
                        LOG IN
                    </button>
                </div>
            </fieldset>
        </form>
    </main>

    <div class="uk-position-bottom-center uk-position-small uk-visible@m uk-position-z-index">
        <span class="uk-text-meta uk-text-small">Picture taken by {photographer}. Provided by <a class="uk-link-text" href="https://pexels.com" target="_blank">Pexels</a></span>
    </div>
</div>


<style lang="scss">
    header {
        height: 10em;

        .logo-wrapper {
            height: 8em;
        }
    }
    main{
        background: rgba(0,0,0,0.4);
    }
</style>