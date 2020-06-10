import {gql} from 'apollo-boost';

export const GET_APPOINTMENT_OVERVIEW = gql`
query {
    listAppointments{
        status,
        covid_flag,
        appointment_time,
        clinic_location {
            latitude,
            longitude,
            address
        }
    }
}
`;