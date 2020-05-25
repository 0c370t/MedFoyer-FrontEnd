<script>
    import ClinicHeader from '../../Components/Clinic/ClinicHeader.svelte'
    import {getAppointments} from "../../API/appointments.API";
    import AppointmentItem from "../../Components/Clinic/AppointmentItem.svelte";
    import AppointmentOverview from "../../Components/Clinic/AppointmentOverview.svelte";
    import {onMount} from 'svelte';
    import {sortByAppointmentTime,sortByCheckInTime} from '../../helpers/appointments';
    let appointments = [];
    let selectedAppointment = false;

    const updateAppointments = () => {
        getAppointments().then(result => {
            appointments = result;
            appointments.forEach(a => {
                // Ensure dates are dates
                if(!(a.appointment_time instanceof Date)){
                    console.log(a.appointment_time);
                    a.appointment_time = new Date(a.appointment_time);
                }
            });
            selectedAppointment = false;
        });
    };

    const selectAppointment = (appt) => {
        selectedAppointment = appt;
    };

    onMount(updateAppointments);
    let checkedInAppointments = [];
    let notCheckedInAppointments = [];
    $: checkedInAppointments = appointments.filter(a => a.patient_location);
    $: notCheckedInAppointments = appointments.filter(a => !a.patient_location);

</script>

<div class="layout">
    <ClinicHeader {updateAppointments}/>

    <aside>
        {#if appointments}
        <div id="checked-in">
            <div class="uk-background-default uk-width-1-1 uk-margin-remove uk-padding-small uk-padding-remove-right">
                <h3 class="uk-margin-remove">Checked In</h3>
            </div>
            <div class="appts">
                {#each checkedInAppointments.sort(sortByCheckInTime) as appointment}
                    <AppointmentItem appt="{appointment}" active="{appointment === selectedAppointment}" on:click={()=>selectAppointment(appointment)}/>
                {/each}
            </div>
        </div>

        <div id="not-checked-in">
            <div class="uk-background-default uk-width-1-1 uk-margin-remove uk-padding-small uk-padding-remove-right">
                <h3 class="uk-margin-remove">Not Checked In</h3>
            </div>
            <div class="appts">
                {#each notCheckedInAppointments.sort(sortByAppointmentTime) as appointment}
                    <AppointmentItem appt="{appointment}" active="{appointment === selectedAppointment}" on:click={()=>selectAppointment(appointment)}/>
                {/each}
            </div>
        </div>
        {/if}

    </aside>
    {#if selectedAppointment}
    <main>
        <AppointmentOverview appointment="{selectedAppointment}" {updateAppointments}/>
    </main>
    {:else}
        <main class="uk-text-center uk-padding">
            <h3>Please select an appointment</h3>
        </main>
    {/if}
</div>
<style lang="scss">
    div.layout {
        height: 100vh;
        display: grid;
        grid-template-columns: 25% 75%;
        grid-template-rows: 5em 1fr;
        grid-template-areas: "header header" "aside main";
        position:relative;
    }

    aside {
        background-color: rgba(0, 0, 0, 0.2);
        position:relative;
        height:100%;
        #checked-in{

            height:50%;
        }
        #not-checked-in{

            height:50%;
        }
        .appts{
            overflow-y:scroll;
            height:calc(100% - (2.1em + 30px));
        }
    }

    main {
        grid-area: main;
        overflow-y:scroll;
    }
</style>