import {getHost} from "./helpers";

export async function postAppointment(body){
    let url = getHost() + "appointment/";
    /*return await fetch(url, {
        method: 'post',
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(body)
    });*/
}


export async function getAppointment(id){
    let url = getHost() + `appointment/${id}`;
    /*let response = await fetch(url);
    return response.json();*/
}

export async function deleteAppointment(id){
    let url = getHost() + `appointment/${id}`;
    /*return await fetch(url, {
        method:"delete"
    });*/

}

export async function getAppointments(){
    let url = getHost() + "appointment/";
    /*let response = await fetch(url);
    return response.json();*/
}

export async function postScreeningResult(id, body){
    let url = getHost() + `appointment/${id}/submitform`;
    /*let response = await fetch(url, {
        method: 'post',
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(body)
    });
    return response.json();*/
}

export async function postCheckIn(id, lat, long){
    let url = getHost() + `appointment/${id}/checkin`;
    /*let response = await fetch(url, {
        method: 'post',
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            current_lat: lat,
            current_long: long,
            checkin_time: new Date().getTime()
        })
    });
    return response.json();*/
}