import "core-js/stable";
import "regenerator-runtime/runtime";

import App from './App.svelte';
import Amplify, {Auth} from 'aws-amplify';
import {awsconfig} from '../conf/amplify.config';

Amplify.configure(awsconfig);

const app = new App({
	target: document.body,
	hydrate: true,
	props: {
		url: window.location.href
	}
});

export default app;