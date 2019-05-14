import * as actions from '../actions/map-restaurants';
import { STYLES } from '../constants';

//when maps api script loaded - dispatch appropriate info about user location (& do restaurants search, if possible)
export const triggerMapLoaded = () => {
  return dispatch => {
      dispatch(actions.mapInitialized());
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
  dispatch(actions.mapNeedsGeolocation());
};

//do search nearby to user location and save to store
const doNearbySearch = (lat, lng, dispatch) => {
  let center = {lat: lat, lng: lng};
  let MAP = new window.window.google.maps.Map(document.getElementById('map-invis'), {
      center: center,
      zoom: 8
  });
  let service = new window.google.maps.places.PlacesService(MAP);
  service.nearbySearch({
      location: center,
      radius: 5000,
      type: ['restaurant']
  }, searchRestaurantsStep(dispatch));
};

//every step of getting restaurants
const searchRestaurantsStep = dispatch => (results, status, pagination) => {
  dispatch(actions.getRestaurantsRequest());
  if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      // if (pagination.hasNextPage){
      //     console.log(`nextPage`);
      //     setTimeout(() => {
      //         dispatch(getRestaurantsSuccess(results));
      //         pagination.nextPage();
      //     }, 2000);
      // }else {
          //save to store restaurants
          dispatch(actions.getRestaurantsSuccess(results));
      //}
  }else{
      dispatch(actions.getRestaurantsError('get restaurants error'));
  }
};

//user had chosen needed location, so save it to store and do nearby search
export const setNewCenterByClick = (map) => dispatch => {
  window.google.maps.event.addListener(map, 'click',  event => {
      let lat = event.latLng.lat(), lng = event.latLng.lng();
      dispatch(actions.mapChangeCenter(lat, lng));
      doNearbySearch(lat, lng, dispatch);
      window.google.maps.event.clearListeners(map, 'click');
  });
};

//When dialog with additional info opened - ask google for additional info like reviews & number
export const getAdditionalInfo = (placeId, callback) => {
  let service = new window.google.maps.places.PlacesService(new window.google.maps.Map(document.getElementById('map-invis'), {
      center: {lat: 0, lng: 0},
      zoom: 8
  }));
  service.getDetails({
      placeId: placeId
  }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          callback({
              reviews: place.reviews,
              phoneNum: place.international_phone_number,
          });
      }
  });
};

//creates google map by id of document node & given coords of center
export const createMap = (id, center) => {
  let map = new window.google.maps.Map(document.getElementById(id), {
      center: center,
      zoom: 8
  });
  map.setOptions({styles: STYLES.style});
  return map;
};

//attach markers to some map by given places
export const createMarkers = (places, map, callback) => {
  let bounds = new window.google.maps.LatLngBounds();
// eslint-disable-next-line no-cond-assign
  for (let i = 0, place; place = places[i]; i++) {
      let image = {
          url: '/img/noun_Restaurant_368075.png',
          size: new window.google.maps.Size(71, 71),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(17, 34),
          scaledSize: new window.google.maps.Size(45, 45)
      };

      let marker = new window.google.maps.Marker({
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
