<script>
    import SplashLayout from "../../Components/Clinic/Splash/SplashLayout.svelte";
    import SplashInput, {inputTemplate, validateMany} from "../../Components/Clinic/Splash/SplashInput.svelte";
    import SplashButton from "../../Components/Clinic/Splash/SplashButton.svelte";
    import Auth from '@aws-amplify/auth';
    import {user} from '../../helpers/stores';
    import {navigate} from "svelte-routing";
    import {onMount} from "svelte";

    onMount(() => {
        if (!$user) navigate("/clinic/login");
    });

    let newPassword = inputTemplate();
    let confirmPassword = inputTemplate();
    let email = inputTemplate();
    const changePassword = async () => {
        loading = true;
        if (!validateMany([newPassword, confirmPassword, email])) {
            loading = false;
            return;
        }
        if(newPassword.value !== confirmPassword.value){
            newPassword.message = "Passwords must match";
            newPassword.valid = false;
            confirmPassword.message = "Passwords must match";
            confirmPassword.valid = false;
            return;
        }
        try {
            let response = await Auth.completeNewPassword($user, newPassword.value, {email: email.value});
            navigate("/clinic");
        } catch (e) {
            console.log(e);
            validationMessage = e.message;
        }

        loading = false;
    };
    let loading = false;
    let validationMessage = "";
</script>

<SplashLayout {loading}>
    <h3 class="uk-text-center">Complete Your Profile</h3>
    <hr/>
    <SplashInput bind:input={newPassword} type="password" placeholder="New Password" icon="lock"/>
    <SplashInput bind:input={confirmPassword} type="password" placeholder="Confirm Password" icon="lock"/>
    <SplashInput bind:input={email} type="email" placeholder="Email" icon="mail"/>
    <hr/>
    <SplashButton message="Change Password" on:click={changePassword} {validationMessage}/>
</SplashLayout>

<style>

</style>