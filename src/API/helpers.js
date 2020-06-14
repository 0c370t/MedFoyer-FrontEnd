export function getHost(){
    if(window.location.host.includes("dev") || window.location.host.includes("local") || window.location.host.includes("192.168")) {
        return "https://api.medfoyer.com/sandbox"
    } else {
        return "https://api.medfoyer.com/prod"
    }
}