import {writable, readable} from "svelte/store";
import {getWaitlistInfo} from "../API/patient.API";

export const patient_meta = writable(JSON.parse(localStorage.getItem("patient_meta")) || {});
patient_meta.subscribe(val => localStorage.setItem("patient_meta", JSON.stringify(val)));

export const user = writable(false);

export const waitlist_data = readable({position: "", expected_wait_time: 0}, (set) => {
    let meta;
    let meta_unsub = patient_meta.subscribe(v => meta = v);
    let update = async () => {
        let value = await getWaitlistInfo(meta.jwt);
        set(value);
    };
    update();
    const interval = setInterval(update, 10000);


    return () => {
        meta_unsub();
        clearInterval(interval);
    }
});