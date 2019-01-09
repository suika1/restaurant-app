export const AUTH_SIGNED_IN = 'AUTH_SIGNED_IN';
export const AUTH_SIGNED_OUT = 'AUTH_SIGNED_OUT';
export const AUTH_INITIALIZED = 'AUTH_INITIALIZED';

/* eslint-disable no-undef */

/* Action creators */

export const authInitialized = () => {
    return {
        type: AUTH_INITIALIZED,
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

let GoogleAuth;
const SCOPE = 'profile email'; //Giving access to basic data like name\email\avatar

//initializes client with Google JS API
function initClient(dispatch) {
    return () => {
        // Initialize the gapi.client object, which app uses to make API requests.
        // Get API key and client ID from API Console.
        // 'scope' field specifies space-delimited list of access scopes.
        gapi.client.init({
            'apiKey': 'AIzaSyBc0yLsAhKiyU2Cys9LVy0N4yA_t7AqF5E',
            'discoveryDocs': [],
            'clientId': '250951134431-g9p7it2597lak6pov1do3684u4s7cj36.apps.googleusercontent.com',
            'scope': SCOPE
        }).then(() => {
            GoogleAuth = gapi.auth2.getAuthInstance();

            // Listen for sign-in state changes.
            GoogleAuth.isSignedIn.listen(setSigninStatus(dispatch));

            // Handle initial sign-in state. (Determine if user is already signed in.)
            setSigninStatus(dispatch)();
        });
    }
}

//handles sign-in\sign-out clicks
export function handleAuthClick() {
    try {
        if (GoogleAuth.isSignedIn.get()) {
            // User is authorized and has clicked 'Sign out' button.
            GoogleAuth.disconnect();
        } else {
            // User is not signed in. Start Google auth flow.
            GoogleAuth.signIn();
        }
    } catch(e) {
        console.warn(`auth error:`) || console.warn(e);
    }
}

//Listens for changes in authorization status
function setSigninStatus(dispatch) {
    return () => {
        let user = GoogleAuth.currentUser.get();
        let isAuthorized = user.hasGrantedScopes(SCOPE);
        if (isAuthorized) {
            //setting profile data for dispatching
            let basicProfile = user.getBasicProfile();
            let profile = {
                name: basicProfile.getGivenName(),
                familyName: basicProfile.getFamilyName(),
                fullName: basicProfile.getName(),
                imageUrl: basicProfile.getImageUrl(),
                email: basicProfile.getEmail(),
            };
            dispatch(authSignedIn(profile));
        } else {
            dispatch(authSignedOut());
        }
    }
}

//just log user data
// eslint-disable-next-line no-unused-vars
function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    let profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    let id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
}

//callback, when script for Google JS API is loaded
export function triggerGoogleLoaded() {
    return dispatch => {
        dispatch(authInitialized());
        gapi.load('client:auth2', initClient(dispatch));
    }
}
