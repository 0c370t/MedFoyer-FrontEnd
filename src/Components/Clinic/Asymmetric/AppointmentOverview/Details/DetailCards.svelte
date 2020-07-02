<script>
    import {formatForDisplay, formatTime} from "../../../../../helpers/datetime";
    import ClinicStaticMap from "../../../../Map/ClinicStaticMap.svelte";

    export let appointment;
</script>

<div>
    <div class="uk-card uk-card-body uk-box-shadow-small uk-background-default uk-margin-small-bottom">
        <h3>Appointment Information:</h3>
        <hr/>
        <dl class="uk-description-list uk-description-list-divider">
            <dt>Appointment Time:</dt>
            <dd>{formatForDisplay(appointment.appointment_time)}
                at {formatTime(appointment.appointment_time)}</dd>

            <dt>Patient Phone Number:</dt>
            <dd>{appointment.patient.phone_number ? appointment.patient.phone_number : "Not available"}</dd>
            <dt>Appointment With:</dt>
            <dd>{appointment.practitioner.name} {appointment.practitioner.title}</dd>
            {#if appointment.practitioner.telehealth_link}
                <dd><a href="{appointment.practitioner.telehealth_link}" target="_blank">{appointment.practitioner.telehealth_link}</a></dd>
                {:else}
                <dd>Telehealth unavailable</dd>
            {/if}
            <dt>Check-in Time:</dt>
            {#if appointment.check_in_time}
                <dd>{formatTime(new Date(appointment.check_in_time))}</dd>
            {:else}
                <dd>{appointment.patient ? appointment.patient.name : "Unnamed"}
                    has not checked in yet.
                </dd>
            {/if}
            {#if appointment.wait_list_priority}
                <dt>Position on waitlist</dt>
                <dd>{appointment.wait_list_priority}</dd>
            {/if}
        </dl>
    </div>
    {#if appointment.check_in_time}
        <div class="uk-card uk-card-body uk-box-shadow-small uk-background-default uk-margin-small-bottom">
            <h3>Check-in Location:</h3>
            <hr/>
            <ClinicStaticMap
                    clinicPosition="{[appointment.clinic_location.longitude, appointment.clinic_location.latitude]}"
                    userPosition="{[appointment.check_in_longitude, appointment.check_in_latitude]}"/>
        </div>
    {/if}

</div>