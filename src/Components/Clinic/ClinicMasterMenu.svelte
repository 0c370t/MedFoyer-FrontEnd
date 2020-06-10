<script>
    import Drop from "../Drop/Drop.svelte";
    import Icon from "../Icon/Icon.svelte";
    import CreateAppointmentModal from "./Modals/CreateAppointmentModal.svelte";
    import {Auth} from 'aws-amplify';
    import {navigate} from "svelte-routing";
    import Spinner from "../Spinner/Spinner.svelte";
    import CreatePatientModel from "./Modals/CreatePatientModel.svelte";

    let showAppointmentModal = false;
    let showPatientModal = false;

    let loading = false;

    let hide = () => {};

    const signOut = async () => {
        loading = true;
        try {
            let x = await Auth.signOut();
            navigate("/clinic/login");
        } catch (e) {
            console.log(e);
        }

        loading = false;
    }
</script>
<Spinner show={loading}/>
<CreatePatientModel bind:shown={showPatientModal}/>
<CreateAppointmentModal bind:shown={showAppointmentModal}/>

<Drop mode="hover" pos="bottom-right" boundary="" bind:hide>
    <span slot="button">
            <Icon icon="plus"/>
            Menu
    </span>
    <ul class="uk-dropdown-nav uk-padding-small">
        <li class="uk-nav-header">Management</li>
        <li>
            <button class="uk-button uk-button-text" on:click={() => {showPatientModal = true; hide()}}>
                <Icon icon="user"/>
                <span>Add a Patient</span>
            </button>
        </li>
        <li>
            <button class="uk-button uk-button-text" on:click={() => {showAppointmentModal = true; hide()}}>
                <Icon icon="calendar"/>
                <span>Add an Appointment</span>
            </button>
        </li>
        <li class="uk-nav-divider"></li>
        <li>
            <button class="uk-button uk-button-text" on:click={signOut}>
                <Icon icon="sign-out"/>
                <span>Sign-Out</span>
            </button>
        </li>
    </ul>
</Drop>

<style>

</style>