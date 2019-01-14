/* eslint-disable no-undef */
export const GET_RESTAURANTS_REQUEST = 'GET_RESTAURANTS_REQUEST';
export const GET_RESTAURANTS_SUCCESS = 'GET_RESTAURANTS_SUCCESS';
export const GET_RESTAURANTS_ERROR = 'GET_RESTAURANTS_ERROR';

export const SCRIPT_UPLOAD_ERROR = 'SCRIPT_UPLOAD_ERROR';

export const MAP_INITIALIZED = 'MAP_INITIALIZED';
export const MAP_NEEDS_GEOLOCATION = 'MAP_NEEDS_GEOLOCATION';
export const MAP_CHANGE_CENTER = 'MAP_CHANGE_CENTER';

/* Action creators */

export const scriptUploadError = () => {
    return {
        type:  SCRIPT_UPLOAD_ERROR,
    }
};

const getRestaurantsRequest = () => {
    return {
        type: GET_RESTAURANTS_REQUEST,
    }
};

const getRestaurantsSuccess = restaurants => {
    return {
        type: GET_RESTAURANTS_SUCCESS,
        restaurants: restaurants,
    }
};

const getRestaurantsError = error => {
    return {
        type: GET_RESTAURANTS_ERROR,
        error: error
    }
};

export const getRestaurants = () => {
    return dispatch => {
        dispatch(getRestaurantsRequest());
        //fetch some data
        dispatch(getRestaurantsSuccess())
    }
};

export const mapInitialized = () => {
    return {
        type: MAP_INITIALIZED,
    }
};

const mapChangeCenter = (lat, lng) => {
    return{
        type: MAP_CHANGE_CENTER,
        center: {lat: lat, lng: lng}
    }
};

export const mapNeedsGeolocation = () => {
    return {
        type: MAP_NEEDS_GEOLOCATION
    }
};

/*--------------------------------*/

//Styles for map
const STYLES = {
    style: [
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#1e1e1e"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#dadada"
                }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "color": "#616161"
                },
                {
                    "lightness": -10
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#5e2435"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#e3e8f9"
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#781fda"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#c9bac2"
                },
                {
                    "weight": 2.5
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "weight": 0.5
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffff88"
                },
                {
                    "weight": 0.5
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#737373"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#e4c6fd"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#2b044a"
                },
                {
                    "weight": 2
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
    ]
};


/*--------------------------------*/

//when maps api script loaded - dispatch appropriate info about user location (& do restaurants search, if possible)
export const triggerMapLoaded = () => {
    return dispatch => {
        dispatch(mapInitialized());
        let options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(
            mapSuccess(dispatch),
            mapError(dispatch),
            options
        );
    }
};

//search restaurants nearby, if user gave access to his location
const mapSuccess = dispatch => pos => {
    let crd = pos.coords;
    doNearbySearch( crd.latitude, crd.longitude, dispatch);
};

//ask user to choose location by clicking on map
const mapError = dispatch => () => {
    dispatch(mapNeedsGeolocation());
};

//do search nearby to user location and save to store
const doNearbySearch = (lat, lng, dispatch) => {
    let center = {lat: lat, lng: lng};
    let MAP = new google.maps.Map(document.getElementById('map-invis'), {
        center: center,
        zoom: 8
    });
    let service = new google.maps.places.PlacesService(MAP);
    service.nearbySearch({
        location: center,
        radius: 5000,
        type: ['restaurant']
    }, searchRestaurantsStep(dispatch));
};

//every step of getting restaurants
const searchRestaurantsStep = dispatch => (results, status, pagination) => {
    dispatch(getRestaurantsRequest());
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        // if (pagination.hasNextPage){
        //     console.log(`nextPage`);
        //     setTimeout(() => {
        //         dispatch(getRestaurantsSuccess(results));
        //         pagination.nextPage();
        //     }, 2000);
        // }else {
            //save to store restaurants
            dispatch(getRestaurantsSuccess(results));
        //}
    }else{
        dispatch(getRestaurantsError('get restaurants error'));
    }
};

//user had chosen needed location, so save it to store and do nearby search
export const setNewCenterByClick = (map) => dispatch => {
    google.maps.event.addListener(map, 'click',  event => {
        let lat = event.latLng.lat(), lng = event.latLng.lng();
        dispatch(mapChangeCenter(lat, lng));
        doNearbySearch(lat, lng, dispatch);
        google.maps.event.clearListeners(map, 'click');
    });
};

//When dialog with additional info opened - ask google for additional info like reviews & number
export const getAdditionalInfo = (placeId, callback) => {
    let service = new google.maps.places.PlacesService(new google.maps.Map(document.getElementById('map-invis'), {
        center: {lat: 0, lng: 0},
        zoom: 8
    }));
    service.getDetails({
        placeId: placeId
    }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            callback({
                reviews: place.reviews,
                phoneNum: place.international_phone_number,
            });
        }
    });
};

//creates google map by id of document node & given coords of center
export const createMap = (id, center) => {
    let map = new google.maps.Map(document.getElementById(id), {
        center: center,
        zoom: 8
    });
    map.setOptions({styles: STYLES.style});
    return map;
};

//attach markers to some map by given places
export const createMarkers = (places, map, callback) => {
    let bounds = new google.maps.LatLngBounds();
// eslint-disable-next-line no-cond-assign
    for (let i = 0, place; place = places[i]; i++) {
        let image = {
            url: '/img/noun_Restaurant_368075.png',
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        };

        let marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            reference: place.reference,
            position: place.geometry.location
        });

        marker.addListener('click', () => {
            callback(places.find(a => marker.reference === a.reference));
        });

        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
};
