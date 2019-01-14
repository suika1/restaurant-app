export const AUTH_SIGNED_IN = 'AUTH_SIGNED_IN';
export const AUTH_SIGNED_OUT = 'AUTH_SIGNED_OUT';
export const AUTH_INITIALIZED = 'AUTH_INITIALIZED';

const STORAGE_AUTH_KEY = 'auth_date';

export const saveAuthDataToStorage = (data) => localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(data));

export const loadAuthDataFromStorage = () => JSON.parse(localStorage.getItem(STORAGE_AUTH_KEY));

export const removeAuthDataFromStorage = () => localStorage.removeItem(STORAGE_AUTH_KEY);

/* eslint-disable no-undef */

/* Action creators */

export const authInitialized = () => {
    return {
        type: AUTH_INITIALIZED,
    }
};

export const authSignedIn = user => {
    saveAuthDataToStorage(user);
    return {
        type: AUTH_SIGNED_IN,
        user: user,
    }
};

export const authSignedOut = () => {
    removeAuthDataFromStorage();
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
            'clientId': '250951134431-44ianb9v3ks5gf368fsk6ppn3f3o2p85.apps.googleusercontent.com',
            'scope': SCOPE
        }).then(() => {
            GoogleAuth = gapi.auth2.getAuthInstance();

            // Listen for sign-in state changes.
            GoogleAuth.isSignedIn.listen(setSigninStatus(dispatch));
        });
    }
}

//handles sign-in\sign-out clicks
export function handleAuthClick() {
    try {
        if(GoogleAuth) {
            if (GoogleAuth.isSignedIn.get()) {
                // User is authorized and has clicked 'Sign out' button.
                GoogleAuth.disconnect();
            } else {
                // User is not signed in. Start Google auth flow.
                GoogleAuth.signIn();
            }
        }
    } catch (e) {
        console.warn(`auth error:`) || console.warn(e);
    }

}

//Listens for changes in authorization status
const setSigninStatus = dispatch => () => {
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
};

//callback, when script for Google JS API is loaded
export function triggerGoogleLoaded() {
    return dispatch => {
        dispatch(authInitialized());
        gapi.load('client:auth2', initClient(dispatch));
    }
}
