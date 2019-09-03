import * as actions from '../actions/user';

let GoogleAuth;
const SCOPE = 'profile email'; // Giving access to basic data like name\email\avatar
// eslint-disable-no-undef
// Initializes client with Google JS API
const initClient = (dispatch) => () =>{
    // Initialize the window.gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes.
    window.gapi.client.init({
        'apiKey': 'AIzaSyBc0yLsAhKiyU2Cys9LVy0N4yA_t7AqF5E',
        'discoveryDocs': [],
        'clientId': '250951134431-48ro4cs9tmbggpndk4k5v58rvquevvt2.apps.googleusercontent.com',
        'scope': SCOPE
    }).then(() => {
        GoogleAuth = window.gapi.auth2.getAuthInstance();

        // Listen for sign-in state changes.
        GoogleAuth.isSignedIn.listen(setSigninStatus(dispatch));
    });
}

// Handles sign-in\sign-out clicks
export const handleAuthClick = () => {
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

// Listens for changes in authorization status
const setSigninStatus = dispatch => () => {
    const user = GoogleAuth.currentUser.get();
    const isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
        // Setting profile data for dispatching
        const basicProfile = user.getBasicProfile();
        const profile = {
            name: basicProfile.getGivenName(),
            familyName: basicProfile.getFamilyName(),
            fullName: basicProfile.getName(),
            imageUrl: basicProfile.getImageUrl(),
            email: basicProfile.getEmail(),
        };
        dispatch(actions.authSignedIn(profile));
    } else {
        dispatch(actions.authSignedOut());
    }
};

// Callback, when script for Google JS API is loaded
export const triggerGoogleLoaded = () => dispatch => {
    dispatch(actions.authInitialized());
    window.gapi.load('client:auth2', initClient(dispatch));
};
