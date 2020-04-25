export function getCookies(){
    let keyValuePairs = document.cookie.split("; ").map((cookie)=> cookie.split("="));
    let output = {};
    keyValuePairs.forEach((pair)=>output[pair[0]] = pair[1]);
    return output;
}
export function setCookie(key, value){
    document.cookie = `${key}=${value}`;
}