import {readable, writable} from 'svelte/store';
import {new_appointment} from './forms/create_appointment';
import {cloneForm} from "./forms/form-utils";
import Auth from '@aws-amplify/auth';

export const appointmentModalData = writable(cloneForm(new_appointment));


// wait_for_prop enables us to wait for the first load of user data
let wait_for_prop = new Promise(()=>{});
export const user = readable(
    {admin:false, loading:wait_for_prop}, set => {
        (async () => {

            let temp_user = await Auth.currentAuthenticatedUser();
            let groups = temp_user.signInUserSession.accessToken.payload["cognito:groups"];
            if(groups.includes("medfoyer-admins")){
                user.admin = true;
            }
            set(Object.assign({}, temp_user, {
                groups,
                admin: groups.includes("medfoyer-admins")
            }));
            if(wait_for_prop.hasOwnProperty("resolve")) wait_for_prop.resolve();
        })();
        return () => {};
    }
);