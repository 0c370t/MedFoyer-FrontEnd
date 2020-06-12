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
        }
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