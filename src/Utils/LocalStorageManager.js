export const getTokenFromLocalStorage = (key, value) => {
    return localStorage.getItem(key);
};
export const setTokenFromLocalStorage = (key, value) => {
    return localStorage.setItem(key, value);
};
export const removeTokenFromLocalStorage = (key, value) => {
    return localStorage.removeItem(key);
};
