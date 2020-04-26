export function getHost(){
    if(window.location.host.includes("dev") || window.location.host.includes("localhost") || window.location.host.includes("192.168")) {
        return "https://api.dev.medfoyer.com/"
    } else {
        return "https://api.medfoyer.com/"
    }
}