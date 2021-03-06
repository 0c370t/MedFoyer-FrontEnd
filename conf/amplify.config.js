export const awsconfig = {
    Auth: {
        // REQUIRED - Amazon Cognito Region
        region: 'us-west-2',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: process.env.AMP_USER_POOL,

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: process.env.AMP_USER_POOL_CLIENT,

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true,

        cookieStorage: {
            domain: process.env.AMP_DOMAIN,
            secure: !process.env.AMP_DOMAIN.includes("192.168") && !process.env.AMP_DOMAIN.includes("local"),
            path: '/'
        },

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        authenticationFlowType: 'USER_PASSWORD_AUTH',

    }
};