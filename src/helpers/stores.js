import {writable} from "svelte/store";

export const patient_meta = writable(JSON.parse(localStorage.getItem("patient_meta")) || {});
patient_meta.subscribe(val => localStorage.setItem("patient_meta", JSON.stringify(val)));

export const user = writable(false);