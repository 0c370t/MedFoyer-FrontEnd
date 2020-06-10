import {gql} from 'apollo-boost';

export const CREATE_PATIENT = gql`
    mutation CreatePatient($patient: PatientInput!){
        createPatient(patient: $patient){
            birth_date,
            given_name,
            last_name    
        }
    } 
`;

