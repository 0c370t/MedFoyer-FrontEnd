import {gql} from 'apollo-boost';

export const GET_APPOINTMENT_OVERVIEW = gql`
query {
    listAppointments{
        appointment_id,
        status,
        covid_flag,
        appointment_time,
        clinic_location {
            latitude,
            longitude,
            address,
            clinic_location_name
        },
        patient {
            given_name,
            last_name,
            phone_number
        },
        check_in_latitude,
        check_in_longitude,
        check_in_time,
        forms
    }
}
`;

export const CREATE_NEW_APPOINTMENT = gql`
    mutation(
        $status: String!,
        $appointment_time: AWSTimestamp!,
        $patient_id: ID!,
        $clinic_location_id: ID!,
        $doctor_id: ID!)
    {    
        createAppointment(
            status: $status
            appointment_time: $appointment_time
            patient_id: $patient_id
            clinic_location_id: $clinic_location_id
            doctor_id: $doctor_id)
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