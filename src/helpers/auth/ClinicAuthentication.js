import {Auth} from 'aws-amplify';
import {navigate} from "svelte-routing";

/**
 * @return {boolean}
 */
export async function CheckSession(){
    // TestUser
    // brian+testuser@medfoyer.com
    // 1@3$qWeR
    // !2#4QwEr
    try{
        let user = await Auth.currentAuthenticatedUser();
        return user;
    } catch(e){
        navigate("/clinic/login");
    }
}