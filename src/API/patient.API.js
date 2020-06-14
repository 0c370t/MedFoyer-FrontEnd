import {getHost} from "./helpers";

export const postCheckIn = async (lat, long, jwt) => {
    let url = getHost() + "/CheckInAppointment";
    let response = await fetch(url, {
        method: 'post',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-Auth-Token": `Basic ${jwt}`
        },
        body: JSON.stringify({
            latitude: lat,
            longitude: long,
            checkin_time: new Date().getTime(),
        })
    });
    return response.json();
};

export const postScreeningResult = async (form, jwt) => {
    let url = getHost() + "/SubmitAppointmentForm";
    let response = await fetch(url, {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-Auth-Token": `Basic ${jwt}`
        },
        body: JSON.stringify({
            form: JSON.stringify(form)
        })
    });
    return response.json();
}

export const getAuthToken = async (birth_date, token) => {
    let url = getHost() + "/AuthAppointment";
    return await fetch(url, {
        method: "post",
        body: JSON.stringify({
            birth_date,
            token
        })
    });
};

export const getClinicLocation = async (jwt) => {
    let url = getHost() + "/ClinicLocation";
    let response = await fetch (url, {
        method: "GET",
        headers: {
            "X-Auth-Token": `Basic ${jwt}`
        }
    });
    return await response.json();
};