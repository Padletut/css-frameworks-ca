export function loadStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}