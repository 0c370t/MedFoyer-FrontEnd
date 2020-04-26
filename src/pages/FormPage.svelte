<script>

    import {severe_symptoms, other_symptoms} from '../helpers/questions';
    import {appt} from '../helpers/stores';

    import Logo from "../svg/Logo.svelte";
    import Form from "../Components/Forms/Form.svelte";
    import {postScreeningResult} from "../API/appointments.API";
    import {navigate} from "svelte-routing";
    let formIndex = 0;
    let finalFormObject = [];
    let currentFormElement;
    let forms = [{
        questions: severe_symptoms,
        handler: function() {
            let obj = forms[formIndex];
            if(currentFormElement.reportValidity()){
                finalFormObject = [...finalFormObject, ...obj.questions];
                formIndex = 1;
            }
        }
    }, {
        questions: other_symptoms,
        handler: function() {
            let obj = forms[formIndex];
            if(currentFormElement.reportValidity()){
                finalFormObject = [...finalFormObject, ...obj.questions];

                postScreeningResult($appt.id, {form: JSON.stringify(finalFormObject)}).then((newAppt)=>{
                    appt.set(newAppt);
                    navigate("/waitlist");
                });
                formIndex = 2;
            }
        }
    }];
</script>
<div class="container uk-container uk-container-small">
    <header>
        <Logo/>
        <h1 class="uk-margin-remove uk-heading-medium">MedFoyer</h1>
    </header>
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