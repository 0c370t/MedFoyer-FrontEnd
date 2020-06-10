<script>
    import {getClient, query} from "svelte-apollo";
    import {GET_ALL_PATIENTS} from '../../../API/queries/patients.GQL';

    export let question;

    const client = getClient();

    const patients = query(client, {query: GET_ALL_PATIENTS})
</script>

<label for="{question.name}">{question.label} </label>
<select name="{question.name}" class="uk-select input {question.type} uk-flex-1">
    {#await $patients}
        <option>Loading...</option>
    {:then result}
        {#each result.data.listPatients as patient (patient.id)}
            <option value="{patient.patient_id}">{patient.last_name}, {patient.given_name}</option>
        {/each}
    {:catch error}
    {/await}
</select>

<style lang="scss">
    @import '../forms';
</style>