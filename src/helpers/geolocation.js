export function getErrorCode(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            return "MedFoyer cannot function if you block GPS";
        case error.POSITION_UNAVAILABLE:
            return "We are unable to determine your location.";
        case error.TIMEOUT:
            return "Getting your location took too long, please try again!.";
        case error.UNKNOWN_ERROR:
            return "An unknown error occurred.";
    }
}

export function getLatLong(callback){

    navigator.geolocation.getCurrentPosition(callback, function(e){callback(getErrorCode(e))});
}