import {
    AUTH_SIGNED_IN,
    AUTH_SIGNED_OUT,
} from '../actions/actions'

const defaultState = {
    error: '',
    user: {
        name: '',
        familyName: '',
        fullName: '',
        imageUrl: '',
        email: '',
    }
};

export default function restaurants(state = defaultState, action) {
    switch (action.type) {
        case AUTH_SIGNED_IN: {
            let {name, familyName, fullName, imageUrl, email} = action.user;
            return {
                error: '',
                user: {
                    name: name,
                    familyName: familyName,
                    fullName: fullName,
                    imageUrl: imageUrl,
                    email: email,
                }
            }
        }
        case AUTH_SIGNED_OUT:
            return { defaultState };
        default:
            return state
    }
}