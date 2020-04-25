export async function getAppointment(id){
    let url;
    if(window.location.host.includes("dev") || window.location.host.includes("localhost")){
        url = `https://api.dev.medfoyer.com/appointment/${id}`
    } else {
        url = `https://api.medfoyer.com/appointment/${id}`
    }
    let response = await fetch(url);
    return response.json();
}