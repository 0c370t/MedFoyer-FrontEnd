<script>
    import Drop from "../../Drop/Drop.svelte";
    import Icon from "../../Icon/Icon.svelte";
    import CreateAppointmentModal from "../Modals/CreateAppointmentModal.svelte";
    import Auth from '@aws-amplify/auth';
    import {navigate, Link} from "svelte-routing";
    import Spinner from "../../Spinner/Spinner.svelte";
    import CreatePatientModel from "../Modals/CreatePatientModel.svelte";
    import {createEventDispatcher, onMount} from "svelte";
    import {user} from '../../../helpers/clinic_stores';
    import Uikit from 'uikit';

    let navElement;

    let loading = false;
    const signOut = async () => {
        loading = true;
        try {
            let x = await Auth.signOut();
            navigate("/clinic/login");
        } catch (e) {
            console.log(e);
        }
        loading = false;
    };

    onMount(async () => {
        Uikit.nav(navElement);
    });

    const dispatch = createEventDispatcher();
    let dropElem;
</script>
<Spinner show={loading}/>

<Drop mode="hover" pos="bottom-right" boundary="#master-header" animation="uk-animation-slide-top-small"
      bind:this={dropElem} _class="uk-background-secondary uk-light" padsize="small">
    <span slot="button" class="uk-flex uk-flex-middle uk-flex-around">
        <span class="uk-margin-small-right">Menu</span>
        <Icon icon="chevron-down"/>
    </span>
    <ul class="uk-dropdown-nav uk-padding-small" bind:this={navElement}>
        <li class="uk-parent">
            <a class="uk-button uk-button-default uk-button-small uk-text-left uk-margin-small-bottom">
                <Icon icon="users" _class="uk-margin-small-left"/>
                Patients</a>
            <ul>
                <li class="uk-margin-small">
                    <button class="uk-button uk-button-default uk-button-small uk-text-left"
                            on:click={() => {dispatch("create-patient");dropElem.hide(0);}}>
                        <Icon icon="user"/>
                        <span>Create a Patient</span>
                    </button>
                </li>
                <li class="uk-margin-small">
                    <Link to="/clinic/patients">
                        <button class="uk-button uk-button-default uk-button-small">
                            <Icon icon="users"/>
                            <span>Manage Patients</span>
                        </button>
                    </Link>
                </li>
            </ul>
        </li>
        <li class="uk-nav-divider uk-margin-small"></li>
        <li class="uk-parent">
            <a class="uk-button uk-button-default uk-button-small uk-text-left uk-margin-small-bottom">
                <Icon icon="calendar" _class="uk-margin-small-left"/>
                Appointments</a>
            <ul>
                <li class="uk-margin-small">
                    <button class="uk-button uk-button-default uk-button-small"
                            on:click={() => {dispatch("create-appointment");dropElem.hide(0);}}>
                        <Icon icon="calendar"/>
                        <span>Create Appointment</span>
                    </button>
                </li>
                <li class="uk-margin-small">
                    <Link to="/clinic">
                        <button class="uk-button uk-button-default uk-button-small">
                            <Icon icon="home"/>
                            <span>Manage Appointments</span>
                        </button>
                    </Link>
                </li>
            </ul>
        </li>
        <li class="uk-nav-divider uk-margin-small"></li>
        {#if $user.admin}
            <li class="uk-parent">
                <a class="uk-button uk-button-default uk-button-small uk-text-left uk-margin-small-bottom">
                    <Icon icon="cog" _class="uk-margin-small-left"/>
                    Administration</a>
                <ul>
                    <li class="uk-margin-small">
                        <button class="uk-button uk-button-default uk-button-small"
                                on:click={() => {navigate("/clinic/admin");dropElem.hide(0)}}>
                            <Icon icon="settings"/>
                            <span>Modify Clinic Details</span>
                        </button>
                    </li>
                </ul>
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
    .uk-nav-header {
        color: currentColor;
    }
</style>