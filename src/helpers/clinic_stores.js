import {writable} from 'svelte/store';
import {new_appointment} from './forms/create_appointment'
import {cloneForm} from "./forms/form-utils";

export const appointmentModalData = writable(cloneForm(new_appointment));