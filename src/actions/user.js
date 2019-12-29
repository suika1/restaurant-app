import * as AT from '../action-types/user';

const STORAGE_AUTH_KEY = 'auth_date';

export const saveAuthDataToStorage = (data) => localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(data));

export const loadAuthDataFromStorage = () => JSON.parse(localStorage.getItem(STORAGE_AUTH_KEY));

export const removeAuthDataFromStorage = () => localStorage.removeItem(STORAGE_AUTH_KEY);

export const authInitialized = () => ({
    type: AT.AUTH_INITIALIZED,
});

export const authSignedIn = user => {
    saveAuthDataToStorage(user);
    return {
        type: AT.AUTH_SIGNED_IN,
        user: user,
    }
};

export const authSignedOut = () => {
    removeAuthDataFromStorage();
    return {
        type: AT.AUTH_SIGNED_OUT,
    }
};
