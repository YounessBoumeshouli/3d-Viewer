export const setItem = (key, value) => {
    localStorage.setItem(key, value);
    window.dispatchEvent(new Event('local-storage'));
};

export const getItem = (key) => {
    return localStorage.getItem(key);
};
