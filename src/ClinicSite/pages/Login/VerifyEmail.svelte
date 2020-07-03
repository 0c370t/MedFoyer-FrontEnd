<script>
    import SplashLayout from "../../../Components/Clinic/Splash/SplashLayout.svelte";
    import {user} from "../../../helpers/stores/clinic";
    import {onMount} from "svelte";
    import Auth from '@aws-amplify/auth';
    import SplashInput from "../../../Components/Clinic/Splash/SplashInput.svelte";
    import SplashButton from "../../../Components/Clinic/Splash/SplashButton.svelte";
    import {navigate} from "svelte-routing";
    import uikit from 'uikit';

    let loading = false;
    let codeSent = false;
    let email;
    let code;
    let codeSendError;
    let codeSubmitError;
    onMount(async () => {
        loading = true;
        await $user.loading;
        if (!$user) window.href.location = "/clinic/login";
        else {
            email = Object.assign(email, {value: $user.attributes.email});
        }
        loading = false;
    });

    const sendCode = async () => {
        codeSendError = "";
        try {
            await Auth.verifyCurrentUserAttribute("email");
            codeSent = true;
        } catch (err) {
            console.log(err);
            codeSendError = "An error has occurred";
        }
    };
    const submitCode = async () => {
        codeSubmitError = "";
        try {
            await Auth.verifyCurrentUserAttributeSubmit("email", code.value);
            navigate("/clinic");
        } catch (e){
            switch(e.code){
                case "SerializationException":
                    codeSubmitError = "Invalid Code!";
                    break;
                case "CodeMismatchException":
                    codeSubmitError = "Incorrect Code!";
                    break;
            }
        }
    };
    const skip = async () => {
        uikit.modal.confirm("Proceeding without a verified email will prevent you from recovering your password in the future. Are you sure you wish to skip?").then(()=>{
            navigate("/clinic");
        }).catch(undefined);
    }
</script>


<SplashLayout {loading}>
    <h3 class="uk-text-center">Verify Email</h3>
    <hr/>
    <SplashInput bind:input={email} type="text" placeholder="E-Mail Address" icon="mail"/>
    <SplashButton message="Send Code" icon="reply" on:click={sendCode} validationMessage={codeSendError}/>
    {#if codeSent}
        <hr/>
        <p class="uk-margin-small-bottom uk-text-center">Code Sent</p>
        <SplashInput bind:input={code} type="text" placeholder="Code" icon="lock" disabled={!codeSent}/>
        <SplashButton message="Submit Code" icon="reply" on:click={submitCode} validationMessage={codeSubmitError}
                      disabled={!codeSent}/>
    {/if}
    <hr/>
    <SplashButton message="Skip" icon="forward" on:click={skip}/>
</SplashLayout>