<script>
    import {getClient, query} from "svelte-apollo";
    import {GET_ALL_PATIENTS} from '../../../API/queries/patients.GQL';
    import {onMount} from "svelte";

    export let question;

    const client = getClient();

    const patients = query(client, {query: GET_ALL_PATIENTS});

    onMount(()=>{
        patients.refetch();
    })

</script>

<label for="{question.name}">{question.label} </label>
<select name="{question.name}" class="uk-select input {question.type} uk-flex-1" bind:value={question.value} required="{question.required}">
    {#await $patients}
        <option value="">Loading...</option>
    {:then result}
        <option value=""></option>
        {#each result.data.listPatients as patient}
            <option selected={question.value === patient.patient_id} value="{patient.patient_id}">{patient.last_name}, {patient.given_name}</option>
        {/each}
    {/await}
</select>

<style lang="scss">
    @import '../forms';
</style>