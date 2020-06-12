<script>
    import {getClient, query} from "svelte-apollo";
    import Spinner from "../../../Spinner/Spinner.svelte";
    import {GET_ALL_PATIENTS} from "../../../../API/queries/patients.GQL";
    import Button from "../../../Button/Button.svelte";
    import Icon from "../../../Icon/Icon.svelte";

    const client = getClient();

    let patients = query(client, {query: GET_ALL_PATIENTS})

    const orderBy = (attribute) => {
        console.log("Attempting to sort by " + attribute);
        debugger;
        if(!$patients.data) return;
        if(!Object.keys($patients.data.listPatients[0]).includes(attribute)) return;
        $patients.data.listPatients = $patients.data.listPatients.sort(attribute);
    }
</script>

<table class="uk-table uk-position-relative uk-table-striped">
    <tr class="uk-child-width-1-6">
        <th on:click={()=>orderBy("given_name")}>First Name</th>
        <th>Last name</th>
        <th>Date of Birth</th>
        <th>Phone Number</th>
        <th>Doctors</th>
        <th></th>
    </tr>
    {#await $patients}
        <Spinner show={true}/>
    {:then result}
        {#each result.data.listPatients as patient (patient.patient_id)}
        <tr>
            <td>
                {patient.given_name}
            </td>
            <td>
                {patient.last_name}
            </td>
            <td>
                {patient.birth_date}
            </td>
            <td>
                {patient.phone_number}
            </td>
            <td>
                No Doctors!
            </td>
            <td class="uk-flex uk-flex-around">
                <Button disabled="{true}">
                    <Icon icon="pencil"/>
                </Button>
                <Button>
                    <Icon icon="trash"/>
                </Button>
            </td>
        </tr>
        {/each}

    {:catch err}
        <tr>
            <td colspan="6"><h3>An error has occurred.</h3></td>
        </tr>
    {/await}

</table>

<style>

</style>