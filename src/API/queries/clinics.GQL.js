import {gql} from 'apollo-boost';

export const GET_CLINIC = gql`
    query{
      getClinic{
        clinic_name,
        clinic_locations {
            clinic_location_name,
            city,
            state,
            zip,
            address,
            latitude,
            longitude
        }
      }
    }


    `;