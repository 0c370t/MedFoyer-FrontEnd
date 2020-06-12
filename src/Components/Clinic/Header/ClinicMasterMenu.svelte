<script>
    import Drop from "../../Drop/Drop.svelte";
    import Icon from "../../Icon/Icon.svelte";
    import CreateAppointmentModal from "../Modals/CreateAppointmentModal.svelte";
    import Auth from '@aws-amplify/auth';
    import {navigate} from "svelte-routing";
    import Spinner from "../../Spinner/Spinner.svelte";
    import CreatePatientModel from "../Modals/CreatePatientModel.svelte";
    import {createEventDispatcher, onMount} from "svelte";
    import Uikit from 'uikit';

    let navElement;

    let showAppointmentModal = false;
    let showPatientModal = false;
    let loading = false;
    let hide = () => {};
    let user = {
        admin: false
    };
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

    onMount(async()=>{
        let tempuser = await Auth.currentAuthenticatedUser();
        let groups = tempuser.signInUserSession.accessToken.payload["cognito:groups"];
        if(groups.includes("medfoyer-admins")){
            user.admin = true;
        }
        Uikit.nav(navElement);
    });

    const dispatch = createEventDispatcher();
    const updateAppts = () => {
        dispatch("updateappts");
    }
</script>
<Spinner show={loading}/>
<CreatePatientModel bind:shown={showPatientModal}/>
<CreateAppointmentModal bind:shown={showAppointmentModal} on:hide={updateAppts}/>

<Drop mode="hover" pos="bottom-right" boundary="#master-header" animation="uk-animation-slide-top-small" bind:hide _class="uk-background-secondary uk-light" padsize="small">
    <span slot="button" class="uk-flex uk-flex-middle uk-flex-around">
        <span class="uk-margin-small-right">Menu</span>
        <Icon icon="chevron-down"/>
    </span>
    <ul class="uk-dropdown-nav uk-padding-small" bind:this={navElement}>
        <li class="uk-parent">
            <a class="uk-button uk-button-default uk-button-small uk-text-left uk-margin-small-bottom"><Icon icon="users" _class="uk-margin-small-left"/> Patients</a>
            <ul>
                <li class="uk-margin-small">
                    <button class="uk-button uk-button-default uk-button-small uk-text-left" on:click={() => {showPatientModal = true; hide()}}>
                        <Icon icon="user"/>
                        <span>Create a Patient</span>
                    </button>
                </li>
                <li class="uk-margin-small">
                    <button class="uk-button uk-button-default uk-button-small" on:click={() => navigate("/clinic/patients")}>
                        <Icon icon="users"/>
                        <span>Manage Patients</span>
                    </button>
                </li>
            </ul>
        </li>
        <li class="uk-nav-divider uk-margin-small"></li>
        <li class="uk-parent">
            <a class="uk-button uk-button-default uk-button-small uk-text-left uk-margin-small-bottom"><Icon icon="calendar" _class="uk-margin-small-left"/> Appointments</a>
            <ul>
                <li class="uk-margin-small">
                    <button class="uk-button uk-button-default uk-button-small" on:click={() => {showAppointmentModal = true; hide()}}>
                        <Icon icon="calendar"/>
                        <span>Create Appointment</span>
                    </button>
                </li>
                <li class="uk-margin-small">
                    <button class="uk-button uk-button-default uk-button-small" on:click={() => navigate("/clinic")}>
                        <Icon icon="home"/>
                        <span>Manage Appointments</span>
                    </button>
                </li>
            </ul>
        </li>
        <li class="uk-nav-divider uk-margin-small"></li>
        {#if user.admin}
            <li class="uk-nav-header uk-margin-small">Administration</li>
            <li class="uk-margin-small">
                <button class="uk-button uk-button-default uk-button-small" on:click={() => {hide()}}>
                    <Icon icon="settings"/>
                    <span>Modify Clinic Details</span>
                </button>
            </li>
            <li class="uk-nav-divider uk-margin-small"></li>
        {/if}

        <li class="uk-margin-small">
            <button class="uk-button uk-button-default uk-button-small" on:click={signOut}>
                <Icon icon="sign-out"/>
                <span>Sign-Out</span>
            </button>
        </li>
        <li class="uk-nav-divider uk-margin-small"></li>
        <li class="uk-margin-small">
            <button class="uk-button uk-button-default uk-button-small">
                <Icon icon="lifesaver"/>
                <span>Support</span>
            </button>
        </li>
    </ul>
</Drop>

<style>
    .uk-nav-header{
        color: currentColor;
    }
</style>