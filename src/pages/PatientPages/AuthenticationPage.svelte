<script>
    import MobileHeader from "../../Components/Layout/MobileHeader.svelte";
    import Icon from "../../Components/Icon/Icon.svelte";
    import Button from "../../Components/Button/Button.svelte";
    import {appt} from "../../helpers/stores";
    import {navigate} from "svelte-routing";

    let value;
    let validationText = "";
    const onSubmit = () => {
        if (!value) {
            validationText = "Please provide your birthday";
        } else {
            if (value === $appt.dob) {
                navigate("/map");
            } else {
                validationText = "Incorrect Information Provided";
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
    <Button fill="true" _class="uk-margin-medium-top" on:click={onSubmit}>
        <span class="uk-margin-small-right">Submit</span>
        <Icon options={{icon:"check"}}/>
    </Button>
</main>
<style>

</style>