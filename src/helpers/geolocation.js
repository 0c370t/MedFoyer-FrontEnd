import getDistance from 'geolib/es/getDistance';

export function getErrorCode(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            return "MedFoyer cannot function if you block GPS.";
        case error.POSITION_UNAVAILABLE:
            return "We are unable to determine your location.";
        case error.TIMEOUT:
            return "Getting your location took too long, please try again!";
        case error.UNKNOWN_ERROR:
            return "An unknown error occurred. Please contact MedFoyer support.";
    }
}

export function getLatLong(callback){
    navigator.geolocation.getCurrentPosition(callback, function(e){callback(getErrorCode(e))});
}
export function subscribe(callback){
    navigator.geolocation.watchPosition(callback, function(e){callback(getErrorCode(e))});
}
export function withinDistance(patientLocation, drLocation, threshold){
    patientLocation = {
        "latitude": patientLocation[1],
        "longitude": patientLocation[0],
    };
    drLocation = {
        "latitude": drLocation[1],
        "longitude": drLocation[0],
    };
    return getDistance(patientLocation, drLocation) < threshold;
}