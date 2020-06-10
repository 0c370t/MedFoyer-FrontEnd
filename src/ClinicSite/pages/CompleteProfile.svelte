<script>
    import SplashLayout from "../../Components/Clinic/Splash/SplashLayout.svelte";
    import SplashInput, {inputTemplate,validateMany} from "../../Components/Clinic/Splash/SplashInput.svelte";
    import SplashButton from "../../Components/Clinic/Splash/SplashButton.svelte";
    import {Auth} from 'aws-amplify';
    import {user} from '../../helpers/stores';
    import {navigate} from "svelte-routing";
    import {onMount} from "svelte";

    onMount(()=>{
        if(!$user) navigate("/clinic/login");
    });

    let newPassword = inputTemplate();
    let email = inputTemplate();
    const changePassword = async () => {
        loading=true;
        if(!validateMany([newPassword])){
            loading = false;
            return;
        }
        try{
            let response = await Auth.completeNewPassword($user, newPassword.value, {email:email.value});
            navigate("/clinic");
        } catch (e){
            console.log(e);
        }

        loading = false;
    };
    let loading = false;
</script>

<SplashLayout {loading}>
    <h3 class="uk-text-center">Complete Your Profile</h3>
    <hr/>
    <SplashInput bind:input={newPassword} type="password" placeholder="New Password" icon="lock"/>
    <SplashInput bind:input={email} type="email" placeholder="Email" icon="mail"/>
    <hr/>
    <SplashButton message="Change Password" on:click={changePassword}/>
</SplashLayout>

<style>

</style>