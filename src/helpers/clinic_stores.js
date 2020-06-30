import {readable, writable} from 'svelte/store';
import {new_appointment} from './forms/create_appointment';
import {cloneForm} from "./forms/form-utils";
import Auth from '@aws-amplify/auth';

export const appointmentModalData = writable(cloneForm(new_appointment));


// wait_for_prop enables us to wait for the first load of user data
let outer_resolve;
let wait_for_prop = new Promise((resolve, reject)=>{ outer_resolve = resolve } );
export const user = readable(
    {admin:false, loading:wait_for_prop}, set => {
        (async () => {
            try{
                let temp_user = await Auth.currentAuthenticatedUser();
                let groups = temp_user.signInUserSession.accessToken.payload["cognito:groups"] || [];
                if(groups.includes("medfoyer-admins")){
                    user.admin = true;
                }
                set(Object.assign({}, temp_user, {
                    groups,
                    admin: groups.includes("medfoyer-admins")
                }));
            } catch {
                set(false);
            }
            if(outer_resolve){
                outer_resolve();
                outer_resolve = false;
            }
        })();
        return () => {};
    }
);