import AWSAppSyncClient from 'aws-appsync';
import Auth from '@aws-amplify/auth';
import {AUTH_TYPE} from 'aws-appsync-auth-link';

let client = null;

export const createClient = () => {
    if (client === null) {
        client = new AWSAppSyncClient({
            url: "https://by23dyjfujazvo37ez7a3dpomy.appsync-api.us-west-2.amazonaws.com/graphql",
            region: "us-west-2",
            auth: {
                type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
                jwtToken: async () =>
                    (await Auth.currentSession()).getIdToken().getJwtToken()
            }
        });
    }
    return client;
};