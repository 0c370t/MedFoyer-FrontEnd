<script>
    import MobileHeader from "../../Components/Layout/MobileHeader.svelte";
    import Icon from "../../Components/Icon/Icon.svelte";
    import Button from "../../Components/Button/Button.svelte";
    import {navigate} from "svelte-routing";
    import {patient_meta} from "../../helpers/stores";
    import {getAuthToken} from "../../API/patient.API";
    import {padMinutes, toAWSDate} from "../../helpers/datetime";

    let day, month, year;
    let validationText = "";
    let loading = false;
    const onSubmit = async () => {
        loading = true;
        if (!day || !month || !year) {
            validationText = "Please provide your birthday";
        } else {
            try {
                let response = await getAuthToken(`${year}-${padMinutes(month)}-${padMinutes(day)}`, $patient_meta.token.id);
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
        loading = false;
    }
</script>

<MobileHeader/>
<main class="uk-container uk-container-small uk-margin-large-top uk-text-center">
    <h3 class="uk-heading-medium">Verification</h3>
    <hr/>
    <p>
        MedFoyer uses your birthday to make sure nobody else checks in for you, please enter it below. </p>
    <label class="uk-text-danger">{validationText}</label>
    <div class="uk-flex uk-width-3-4 uk-align-center">
        <input type="number" class="uk-input uk-width-1-4" bind:value={month} name="" required="true" placeholder="MM" min="1" max="2"/>
        <input type="number" class="uk-input uk-width-1-4" bind:value={day} name="" required="true" placeholder="DD" min="1" max="2"/>
        <input type="number" class="uk-input uk-flex-1" bind:value={year} name="" required="true" placeholder="YYYY" min="4" max="4"/>
    </div>
    <Button fullwidth="true" _class="uk-margin-medium-top" on:click={onSubmit} {loading}>
        <span class="uk-margin-small-right">Submit</span>
        <Icon options={{icon:"check"}}/>
    </Button>
</main>
<style>

</style>