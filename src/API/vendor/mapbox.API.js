const access_token = 'pk.eyJ1IjoiYmRvbmFsZG1mIiwiYSI6ImNrOWY0eGtqeTA5MTEzZnA5ZWdudHd0ZTUifQ.RhjKb2SBHSf5KTQnVbdTUA';
const mapbox_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

export async function lookupAddress(street, city, state, zip){
    let response = await fetch(
        `${mapbox_url}${encodeURI(`${street} ${city} ${state} ${zip}`)}.json?types=address&access_token=${access_token}&autocomplete=false&country=US&language=en&limit=1 )`
    );
    let result = await response.json();
    if(result.features.length === 0){
        throw Error("Address not found.");
    } else {
        return result.features[0].center;
    }
}