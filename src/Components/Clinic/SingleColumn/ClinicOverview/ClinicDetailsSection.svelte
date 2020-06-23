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

<section class="uk-container">
    <h3>Clinic Details</h3>
        <div class="uk-container">
            <Form form={inner_form} buttonText="Update Details" fullwidth={false}/>
        </div>
</section>

<style>

</style>