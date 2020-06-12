import {gql} from 'apollo-boost';

export const GET_CLINIC_LOCATIONS_FOR_PICKER = gql`
    query {
        getClinicLocations{
            clinic_location_name,
            clinic_location_id
        }
    }
    `;