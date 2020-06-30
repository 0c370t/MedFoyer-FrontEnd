<script>
    import SplashLayout from "../../../Components/Clinic/Splash/SplashLayout.svelte";
    import SplashInput, {validateMany} from "../../../Components/Clinic/Splash/SplashInput.svelte";
    import {navigate} from "svelte-routing";
    import Auth from '@aws-amplify/auth';
    import SplashButton from "../../../Components/Clinic/Splash/SplashButton.svelte";

    let data = JSON.parse(localStorage.getItem("mf-reset-data"));
    if (!data) navigate("/clinic/login");
    let username = data.username;
    let code;
    let newPass;
    let confirmPass;
    let error;

    const confirmCode = async () => {
        if(!validateMany([code, newPass, confirmPass])) return;
        if(newPass.value !== confirmPass.value){
            confirmPass.message = "Passwords must match";
            confirmPass.valid = false;
        }
        try{
            await Auth.forgotPasswordSubmit(username.value, code.value, newPass.value);
            navigate("/clinic")
        } catch(e){
            switch(e.code){
                case "SerializationException":
                    error = "Invalid Code!";
                    break;
                case "CodeMismatchException":
                    error = "Incorrect Code!";
                    break;
                default:
                    error = e.message;
                    break;
            }
        }
    }
</script>

<SplashLayout>
    <h3 class="uk-text-center">Forgot Password</h3>
    <p class="uk-text-center">A code has been sent to "{data.CodeDeliveryDetails.Destination}"</p>
    <hr/>
    <SplashInput placeholder="Enter Code" bind:input={code} icon="pencil"/>
    <hr/>
    <SplashInput placeholder="New Password" bind:input={newPass} icon="lock" type="password"/>
    <SplashInput placeholder="Confirm Password" bind:input={confirmPass} icon="lock" type="password"/>
    <SplashButton message="Confirm Code" on:click={confirmCode} validationMessage={error}/>
</SplashLayout>