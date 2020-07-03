<script>
    import {navigate} from "svelte-routing";
    import Auth from '@aws-amplify/auth';
    import SplashLayout from "../../../Components/Clinic/Splash/SplashLayout.svelte";
    import SplashInput, {inputTemplate, validateMany} from "../../../Components/Clinic/Splash/SplashInput.svelte";
    import SplashButton from "../../../Components/Clinic/Splash/SplashButton.svelte";
    import {fly} from 'svelte/transition';
    import {user} from '../../../helpers/stores/patient';

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
                        user.set(message);
                        navigate("/clinic/login/complete_profile");
                        return;
                }
            }
            if(!message.attributes.hasOwnProperty("email_verified")){
                navigate("/clinic/login/verify_email");
            }
            window.location.href = "/clinic";

        } catch (err) {
            console.log(err);
            // Do things
            masterValidation = err.message;
        }
        loading = false;
    };
    const forgotPassword = async () => {
        if(!username.validate()){
            return;
        }
        try{
            let data = await Auth.forgotPassword(username.value);
            localStorage.setItem("mf-reset-data", JSON.stringify(Object.assign(data, {username})));
            navigate("/clinic/login/change_password");
        } catch(e){
            switch(e.code){
                case "UserNotFoundException":
                    masterValidation = "User not found.";
                    break;
                case "InvalidParameterException":
                    masterValidation = "You do not have a verified email, please contact your administrator for help logging in.";
                    break;
                case "LimitExceededException":
                    masterValidation = "Max attempts exceeded, please try again later";
                    break;
                default:
                    masterValidation = "An error has occurred.";
                    break;
            }
        }
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
    <SplashButton on:click={forgotPassword} message="FORGOT PASSWORD" icon="unlock"/>
</SplashLayout>