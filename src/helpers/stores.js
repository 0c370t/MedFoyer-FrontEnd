import {writable} from "svelte/store";

export const appt = writable(JSON.parse(localStorage.getItem("appointmentMeta")) || {});
appt.subscribe(val => localStorage.setItem("appointmentMeta", JSON.stringify(val)));
