import "core-js/stable";
import "regenerator-runtime/runtime";

import App from './ClinicApp.svelte';
import Auth from '@aws-amplify/auth';
import {awsconfig} from '../../conf/amplify.config';


Auth.configure(awsconfig.Auth);




const app = new App({
    target: document.body,
});

export default app;