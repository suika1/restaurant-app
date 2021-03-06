import {
    AUTH_SIGNED_IN,
    AUTH_SIGNED_OUT,
    AUTH_INITIALIZED
} from '../action-types/user'

import {
    SCRIPT_UPLOAD_ERROR
} from "../action-types/map-restaurants";

const defaultState = {
    error: '',
    initialized: false,
    name: '',
    familyName: '',
    fullName: '',
    imageUrl: '',
    email: '',
};

export default function auth(state = defaultState, action) {
    switch (action.type) {
        case AUTH_INITIALIZED:
            return {
                ...state,
                initialized: true,
            };
        case AUTH_SIGNED_IN: {
            const {
                name,
                familyName,
                fullName,
                imageUrl,
                email,
            } = action.user;
            return {
                ...state,
                error: '',
                name: name,
                familyName: familyName,
                fullName: fullName,
                imageUrl: imageUrl,
                email: email,
                isSignedIn: true,
            }
        }
        case AUTH_SIGNED_OUT:
            return {
                ...defaultState,
                initialized: state.initialized,
            };
        case SCRIPT_UPLOAD_ERROR:
            return {
                ...defaultState,
                initialized: state.initialized,
                error: SCRIPT_UPLOAD_ERROR,
            };
        default:
            return state
    }
}
