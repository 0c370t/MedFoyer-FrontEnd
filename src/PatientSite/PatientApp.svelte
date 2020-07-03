<script>
    import {onDestroy, onMount} from "svelte";

    export let url = "";
    import {Router, Route} from "svelte-routing";

    import PatientWrapper from "./pages/PatientWrapper.svelte";
    import LandingPage from "./pages/LandingPage.svelte";
    import LocationPage from './pages/LocationPage.svelte';
    import DataCollectionPage from './pages/DataCollectionPage.svelte';
    import AuthenticationPage from './pages/AuthenticationPage.svelte';
    import FormPage from './pages/FormPage.svelte';
    import Waitlist from './pages/Waitlist.svelte';

    import {patient_meta} from "../helpers/stores/patient";

    import {addMessages, init, getLocaleFromNavigator, locale} from 'svelte-i18n';
    import en from '../I18N/en.json';
    import es from '../I18N/es.json';
    import {getCachedLocale, withCachedLocale} from "../helpers/stores/localization";

    addMessages('en', en);
    addMessages('es', es);
    let unsub_cached_locale;
    console.log(getCachedLocale());
    init({fallbackLocale: 'en', initialLocale: getCachedLocale()});
    onMount(() => {
        locale.set(getCachedLocale());
        unsub_cached_locale = withCachedLocale();
    })
    onDestroy(unsub_cached_locale);
</script>

<Router {url}>
    <Route path="/patient/*">
        <PatientWrapper component={LandingPage}/>
    </Route>
    <Route path="/patient/appt/:id" component={DataCollectionPage}/>
    <Route path="/patient/appt">
        <PatientWrapper component={LandingPage}/>
    </Route>
    <Route path="/patient/auth">
        <PatientWrapper component={AuthenticationPage}/>
    </Route>
    <Route path="/patient/map">
        <PatientWrapper component={LocationPage}/>
    </Route>
    <Route path="/patient/screening">
        <PatientWrapper component={FormPage}/>
    </Route>
    <Route path="/patient/waitlist">
        <PatientWrapper component={Waitlist}/>
    </Route>
</Router>