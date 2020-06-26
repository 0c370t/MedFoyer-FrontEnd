import {gql} from 'apollo-boost';
import {getDefaultFromTo} from "../../helpers/datetime";

let [defaultFrom, defaultTo] = getDefaultFromTo();

export const GET_APPOINTMENT_DASHBOARD = gql`
query(
        $start_time: AWSTimestamp = ${defaultFrom.getTime()},
        $end_time: AWSTimestamp = ${defaultTo.getTime()},
        $clinic_location_id: ID = ""
    ) {
    listAppointments(start_time: $start_time, end_time: $end_time, clinic_location_id: $clinic_location_id){
        appointment_id,
        status,
        covid_flag,
        appointment_time,
        clinic_location {
            clinic_location_id,
            clinic_location_name,
        },
        patient {
            given_name,
            last_name,
        },
        practitioner{
            name,
            title,
        },
        check_in_time,
    }
}
`;

export const GET_APPOINTMENT_DETAIL = gql`
query($appointment_id: ID!){
    getAppointment(appointment_id: $appointment_id){
        appointment_id,
        status,
        reminder_status,
        covid_flag,
        appointment_time,
        clinic_location {
            latitude,
            longitude,
            address,
            clinic_location_name,
            clinic_location_id
        },
        patient {
            given_name,
            last_name,
            phone_number
        },
        practitioner{
            name,
            practitioner_id,
            title,
            telehealth_link
        },
        check_in_latitude,
        check_in_longitude,
        check_in_time,
        forms(dummy: "value")
    }
}
`;

export const CREATE_NEW_APPOINTMENT = gql`
    mutation(
        $status: String!,
        $appointment_time: AWSTimestamp!,
        $patient_id: ID!,
        $clinic_location_id: ID!,
        $practitioner_id: ID!)
    {    
        createAppointment(
            status: $status
            appointment_time: $appointment_time
            patient_id: $patient_id
            clinic_location_id: $clinic_location_id
            practitioner_id: $practitioner_id)
            {
                status
            }
    }
    `;

export const DELETE_APPOINTMENT = gql`
    mutation($appointment_id: ID!){
        deleteAppointment(appointment_id: $appointment_id){appointment_id}
    }
    `;
export const SUMMON_PATIENT = gql`
    mutation($appointment_id: ID!){
        summonPatient(appointment_id: $appointment_id){appointment_id}
    }
    `;
export const RESEND_CHECKIN_LINK = gql`
    mutation($appointment_id: ID!){
        sendCheckInText(appointment_id: $appointment_id)
    }
    `;
export const SEND_TELEHEALTH_LINK = gql`
    mutation($appointment_id: ID!){
        sendTelehealthText(appointment_id: $appointment_id)
    }
    `;