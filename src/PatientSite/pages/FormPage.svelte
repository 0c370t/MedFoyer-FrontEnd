<script>
    import {severe_symptoms, other_symptoms} from '../../helpers/forms/default-covid-screen';
    import {patient_meta} from '../../helpers/stores';
    import Form from "../../Components/Forms/Form.svelte";

    import {navigate} from "svelte-routing";
    import MobileHeader from "../../Components/Layout/MobileHeader.svelte";
    import {postScreeningResult} from "../../API/patient.API";

    let formIndex = 0;
    let finalFormObject = [];
    let currentFormElement;
    let forms = [{
        questions: severe_symptoms,
        handler: function () {
            let obj = forms[formIndex];
            if (currentFormElement.reportValidity()) {
                finalFormObject = [...finalFormObject, ...obj.questions];
                formIndex = 1;
            }
        }
    }, {
        questions: other_symptoms,
        handler: async function () {
            let obj = forms[formIndex];
            if (currentFormElement.reportValidity()) {
                finalFormObject = [...finalFormObject, ...obj.questions];

                let result = await postScreeningResult(finalFormObject, $patient_meta.jwt);
                $patient_meta.state = "CHECKED_IN";
                $patient_meta.covid_flag = result.covid_flag;
                navigate("/patient/waitlist");
                formIndex = 2;
            }
        }
    }];
</script>
<MobileHeader/>
<div class="container uk-container uk-container-small">
    {#if formIndex < forms.length}
        <Form form="{forms[formIndex].questions}" onSubmit="{forms[formIndex].handler}" bind:formElement={currentFormElement} buttonText="Continue"/>
    {/if}
</div>
<style lang="scss">
    div.container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    header {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.3em;
        top: 2em;
        background-color: rgba(255, 255, 255, 0.5);
        height: 6em;
        z-index: 1;
    }

</style>