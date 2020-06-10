import ApolloClient from 'apollo-boost';

export const createClient = () =>{
    const client = new ApolloClient({
        uri: "https://by23dyjfujazvo37ez7a3dpomy.appsync-api.us-west-2.amazonaws.com/graphql",
        headers: {
            'X-Api-Key': 'da2-ljusedm3urdzxc6cujjfvqtvt4'
        }
    });
    return client;
};