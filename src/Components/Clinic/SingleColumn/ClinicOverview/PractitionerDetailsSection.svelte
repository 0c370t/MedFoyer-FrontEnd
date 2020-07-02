<script>
    import Spinner from "../../../Spinner/Spinner.svelte";
    import Button from "../../../Button/Button.svelte";
    import {onMount} from "svelte";
    import {getClient, mutate, query} from "svelte-apollo";
    import {
        CREATE_PRACTITIONER, DELETE_PRACTITIONER,
        GET_ALL_PRACTITIONERS,
        UPDATE_PRACTITIONER
    } from "../../../../API/queries/practitioners.GQL";
    import Icon from "../../../Icon/Icon.svelte";
    import Modal from "../../../Modal/Modal.svelte";
    import Form from "../../../Forms/Form.svelte";
    import {create_practitioner} from "../../../../helpers/forms/create_practitioner";
    import {
        addHiddenField,
        cloneForm,
        containsField,
        getFieldValue,
        setFieldValue
    } from "../../../../helpers/forms/form-utils";
    import {operation_not_supported} from "../../../../helpers/notify";
    import uikit from 'uikit';

    const client = getClient();
    let result = query(client, {query: GET_ALL_PRACTITIONERS});
    let loading = false;
    let data = [];

    let showCreateModal = false;
    let create_form = cloneForm(create_practitioner);
    let createFormElement;

    let showEditModal = false;
    let edit_form = cloneForm(create_practitioner);
    let editFormElement;

    onMount(async () => {
        loading = true;
        let x = await $result;
        data = x.data.listPractitioners;
        loading = false;
    });
    const update = async () => {
        loading = true;
        await result.refetch();
        let x = await $result;
        data = x.data.listPractitioners;
        loading = false;
    };
    const create = async () => {
        if (createFormElement.reportValidity()) {
            loading = true;
            showCreateModal = false;
            let name = getFieldValue(create_form, "practitioner_name");
            let title = getFieldValue(create_form, "title");
            let telehealth_link = getFieldValue(create_form, "telehealth_link");
            await mutate(client, {
                mutation: CREATE_PRACTITIONER,
                variables: {
                    practitioner: {
                        name,
                        title,
                        telehealth_link
                    }
                }
            });
            await update();
        }
    };
    const openEdit = async (practitioner) => {
        setFieldValue(edit_form, "practitioner_name", practitioner.name);
        setFieldValue(edit_form, "title", practitioner.title);
        setFieldValue(edit_form, "telehealth_link", practitioner.telehealth_link || "");
        if(containsField(edit_form, "practitioner_id"))
            setFieldValue(edit_form, "practitioner_id", practitioner.id);
        else
            addHiddenField(edit_form, "practitioner_id", practitioner.id);
        edit_form = edit_form;
        showEditModal = true;
    };
    const edit = async () => {
        if (editFormElement.reportValidity()) {
            loading = true;
            showEditModal = false;
            let name = getFieldValue(edit_form, "practitioner_name");
            await mutate(client, {
                mutation: UPDATE_PRACTITIONER,
                variables: {
                    practitioner: {
                        name
                    },
                    practitioner_id: getFieldValue(edit_form, "practitioner_id")
                }
            });
        }
        operation_not_supported();
        await update();
    };
    const remove = async (name, id) => {
        try {
            await uikit.modal.confirm(`Are you sure you want to delete ${name}?`);
            loading = true;
            await mutate(client, {
                mutation: DELETE_PRACTITIONER,
                variables: {
                    practitioner_id: id
                }
            });
            await update();
        } catch(e) {
            loading = false;
        } // Ignore exception, user closed modal
    }
</script>

<section class="uk-container uk-position-relative">
    <Spinner show="{loading}"/>
    <h3>Practitioners</h3>
    <div class="">
        <hr class="uk-margin-remove"/>
        {#each data as prac, i (prac.practitioner_id)}
            <div class="uk-flex uk-flex-between uk-flex-middle uk-tile uk-tile-muted uk-tile-xsmall">
                <h4 class="uk-margin-remove uk-flex-1">{prac.name} {prac.title}</h4>
                <div class="uk-flex uk-flex-right uk-flex-1">
                    <Button on:click={()=>openEdit(prac)} _class="uk-margin-small-right">
                        <Icon icon="pencil"/>
                    </Button>
                    <Button on:click={()=>remove(prac.name, prac.practitioner_id)}>
                        <Icon icon="trash"/>
                    </Button>
                </div>
            </div>
            <hr class="uk-margin-remove"/>
        {/each}
        <div class="uk-tile uk-tile-muted uk-tile-xsmall uk-flex uk-flex-between uk-flex-middle">
            <h4 class="uk-margin-remove">
                Add new practitioner </h4>
            <div class="uk-flex uk-flex-right">
                <Button on:click={()=>showCreateModal=true}>
                    <Icon icon="plus"/>
                </Button>
            </div>
        </div>
        <hr class="uk-margin-remove"/>
    </div>
</section>

<Modal id="AddPractitionerModal" header="Add new Practitioner" showClose={true} bind:open={showCreateModal}>
    <Form form={create_form} fullwidth={true} onSubmit={create} buttonText="Create Practitioner"
          bind:formElement={createFormElement}/>
</Modal>
<Modal id="EditPractitionerModal" header="Add new Practitioner" showClose={true} bind:open={showEditModal}>
    <Form form={edit_form} fullwidth={true} onSubmit={edit} buttonText="Update Practitioner"
          bind:formElement={editFormElement}/>
</Modal>

<style>

</style>