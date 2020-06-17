import {readable, writable} from 'svelte/store';
import {new_appointment} from './forms/create_appointment';
import {cloneForm} from "./forms/form-utils";
import Auth from '@aws-amplify/auth';

export const appointmentModalData = writable(cloneForm(new_appointment));

export const user = readable(
    {admin:false}, set => {
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
        })();
        return () => {};
    }
);