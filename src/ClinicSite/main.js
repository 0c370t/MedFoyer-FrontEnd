import App from './ClinicApp.svelte';
import Amplify, {Auth} from 'aws-amplify';
import {awsconfig} from '../../conf/amplify.config';

Amplify.configure(awsconfig);
import "core-js/stable";
import "regenerator-runtime/runtime";

const app = new App({
    target: document.body,
});

export default app;