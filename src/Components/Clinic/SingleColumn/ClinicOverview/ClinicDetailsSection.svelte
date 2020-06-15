<script>
    import Form from '../../../Forms/Form.svelte';
    import {clinic_details} from "../../../../helpers/forms/clinic_details";
    import {cloneForm} from "../../../../helpers/forms/form-utils";
    import {query, getClient} from 'svelte-apollo';
    import {GET_CLINIC} from '../../../../API/queries/clinics.GQL';

    const client = getClient();
    let inner_form = cloneForm(clinic_details);

    const details = query(client, {query: GET_CLINIC});
    let result = {};
    $details.then(r => result = r.data.getClinic);

    $: if (result) {
        inner_form.forEach(q => {
            if (Object.keys(result).includes(q.name)) {
                q.value = result[q.name];
            }
        });
        inner_form = inner_form;
    }
    ;
</script>

<section class="uk-container uk-margin-medium ">
    <hr/>
    <h3>Clinic Details</h3>
    <div class="uk-child-width-1-2">
        <div class="uk-container uk-width-1-2 uk-container-expand-left">
            <Form form={inner_form} buttonText="Update Details" fullwidth={false}/>
        </div>
        <div>

        </div>
    </div>
</section>

<style>

</style>