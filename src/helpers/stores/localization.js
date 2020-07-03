import {getLocaleFromNavigator, locale} from 'svelte-i18n';

export function withCachedLocale(){
    return locale.subscribe(val => localStorage.setItem("locale_cache", (val || "")));
}
export function getCachedLocale(){
    return localStorage.getItem("locale_cache") || getLocaleFromNavigator();
}