import {gql} from 'apollo-boost';

export const GET_ALL_PRACTITIONERS = gql`
query{
    listPractitioners{
        practitioner_id, 
        name,
        title
    }
}
`;

export const CREATE_PRACTITIONER = gql`
mutation($practitioner: PractitionerInput){
    createPractitioner(practitioner: $practitioner){
        practitioner_id
    }
}  
`;

export const UPDATE_PRACTITIONER = gql`
mutation($practitioner: PractitionerInput, $practitioner_id: ID!){
    updatePractitioner(practitioner: $practitioner, practitioner_id: $practitioner_id){
        practitioner_id
    }
}  
`;

export const DELETE_PRACTITIONER = gql`
mutation($practitioner_id: ID!){
    deletePractitioner(practitioner_id: $practitioner_id){
        practitioner_id
    }
}  
`;