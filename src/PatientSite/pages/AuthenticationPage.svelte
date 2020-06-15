<script>
    import MobileHeader from "../../Components/Layout/MobileHeader.svelte";
    import Icon from "../../Components/Icon/Icon.svelte";
    import Button from "../../Components/Button/Button.svelte";
    import {navigate} from "svelte-routing";
    import {patient_meta} from "../../helpers/stores";
    import {getAuthToken} from "../../API/patient.API";
    import {toAWSDate} from "../../helpers/datetime";

    let value;
    let validationText = "";
    let loading = false;
    const onSubmit = async () => {
        loading = true;
        if (!value) {
            validationText = "Please provide your birthday";
        } else {
            try {
                let response = await getAuthToken(toAWSDate(new Date(value)), $patient_meta.token.id);
                if(!response.ok){
                    response.json().then(r => {
                        validationText = r;
                        loading = false;
                    });
                } else {
                    response.json().then(r => {
                        $patient_meta.jwt = r;
                        $patient_meta.state = "GPS";
                        navigate("/patient/map");
                    });
                }
            } catch (e) {
                console.log(e);
                validationText = "An error has occurred";
                loading = false;
            }
        }

    }
</script>

<MobileHeader/>
<main class="uk-container uk-container-small uk-margin-large-top uk-text-center">
    <h3 class="uk-heading-medium">Verification</h3>
    <hr/>
    <p>
        MedFoyer uses your birthday to make sure nobody else checks in for you, please enter it below. </p>
    <label class="uk-text-danger">{validationText}</label>
    <input type="date" class="uk-input" bind:value name="" required="true" title="Your birthday"/>
    <Button fullwidth="true" _class="uk-margin-medium-top" on:click={onSubmit} {loading}>
        <span class="uk-margin-small-right">Submit</span>
        <Icon options={{icon:"check"}}/>
    </Button>
</main>
<style>

</style>