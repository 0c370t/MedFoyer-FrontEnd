<script>
    import {navigate} from "svelte-routing";
    import {Auth} from 'aws-amplify';
    import {user} from '../../helpers/stores';
    import SplashLayout from "../../Components/Clinic/Splash/SplashLayout.svelte";
    import SplashInput, {inputTemplate, validateMany} from "../../Components/Clinic/Splash/SplashInput.svelte";
    import SplashButton from "../../Components/Clinic/Splash/SplashButton.svelte";
    import {fly} from 'svelte/transition';

    const doLogin = async () => {
        loading = true;
        masterValidation = "";


        if (!validateMany([username, password])) {
            loading = false;
            return;
        }
        try {
            let message = await Auth.signIn(username.value, password.value);
            if (message.challengeName) {
                switch (message.challengeName) {
                    case "NEW_PASSWORD_REQUIRED":
                        $user = message;
                        navigate("/clinic/login/complete_profile");
                        return;
                }
            }
            window.location.href = "/clinic";

        } catch (err) {
            console.log(err);
            // Do things
            masterValidation = err.message;
        }
        loading = false;
    };

    let username = inputTemplate();
    let password = inputTemplate();
    let masterValidation = "";
    let loading = false;


</script>

<SplashLayout {loading}>
    <h3 class="uk-text-center">Log In</h3>
    <hr/>
    <SplashInput bind:input={username} type="text" placeholder="Username" icon="user"/>
    <SplashInput bind:input={password} type="password" placeholder="Password" icon="lock"/>
    <hr/>
    <SplashButton on:click={doLogin} message="LOG IN" validationMessage="{masterValidation}" icon="sign-in"/>
</SplashLayout>