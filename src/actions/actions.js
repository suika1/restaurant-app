export const GET_RESTAURANTS_REQUEST = 'GET_RESTAURANTS_REQUEST';
export const GET_RESTAURANTS_SUCCESS = 'GET_RESTAURANTS_SUCCESS';
export const GET_RESTAURANTS_ERROR = 'GET_RESTAURANTS_ERROR';

export const AUTH_SIGNED_IN = 'AUTH_SIGNED_IN';
export const AUTH_SIGNED_OUT = 'AUTH_SIGNED_OUT';

export const RATE_RESTAURANT = 'RATE_RESTAURANT';

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


const authSignedIn = user => {
    return {
        type: AUTH_SIGNED_IN,
        user: user,
    }
};

const authSignedOut = () => {
    return {
        type: AUTH_SIGNED_OUT,
    }
};





/* eslint-disable no-undef */
//TODO:  map actions ?

let GoogleAuth;
const SCOPE = 'profile email';

function initClient(dispatch) {
    return () => {
        console.log(`hello from initClient`);
        // Retrieve the discovery document for version 3 of Google Drive API.
        // In practice, your app can retrieve one or more discovery documents.
        let discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

        // Initialize the gapi.client object, which app uses to make API requests.
        // Get API key and client ID from API Console.
        // 'scope' field specifies space-delimited list of access scopes.
        gapi.client.init({
            'apiKey': 'AIzaSyBc0yLsAhKiyU2Cys9LVy0N4yA_t7AqF5E',
            'discoveryDocs': [],
            'clientId': '250951134431-g9p7it2597lak6pov1do3684u4s7cj36.apps.googleusercontent.com',
            'scope': SCOPE
        }).then(() => {
            console.log(`then, after init`);
            GoogleAuth = gapi.auth2.getAuthInstance();

            // Listen for sign-in state changes.
            GoogleAuth.isSignedIn.listen(setSigninStatus(dispatch));

            // Handle initial sign-in state. (Determine if user is already signed in.)
            let user = GoogleAuth.currentUser.get();
            console.log(1);
            setSigninStatus(dispatch)();
        });
    }
}

export function handleAuthClick() {
    console.log(`handleAuthClick`);
    try {
        if (GoogleAuth.isSignedIn.get()) {
            // User is authorized and has clicked 'Sign out' button.
            GoogleAuth.signOut();
        } else {
            // User is not signed in. Start Google auth flow.
            GoogleAuth.signIn();
        }
    } catch(e) {
        console.log(`auth error:`) || console.log(e);
    }
}

function setSigninStatus(dispatch) {

    console.log(2);
    return () => {

        console.log(3);
        let user = GoogleAuth.currentUser.get();
        let isAuthorized = user.hasGrantedScopes(SCOPE);
        if (isAuthorized) {
            onSignIn(user);
            //setting profile data for dispatching
            let basicProfile = user.getBasicProfile();
            let profile = {
                name: basicProfile.getGivenName(),
                familyName: basicProfile.getFamilyName(),
                fullName: basicProfile.getName(),
                imageUrl: basicProfile.getImageUrl(),
                email: basicProfile.getEmail(),
            };

            console.log(4);
            dispatch(authSignedIn(profile));
            console.log('You are currently signed in and have granted access to this app.');
        } else {

            console.log(5);
            dispatch(authSignedOut());
            console.log('You have not authorized this app or you are signed out.');
        }
    }
}

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
}

export function triggerGoogleLoaded() {
    return dispatch => {
        console.log("google event loaded");
        gapi.load('client:auth2', initClient(dispatch));
    }
}
