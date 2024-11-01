import { loadStorage } from "../storage/loadstorage.mjs";
import { API_KEY } from "./constants.mjs";

export function headers(hasBody = false) {
    const headers = new Headers();
    const accessToken = loadStorage("accessToken");

    if (accessToken) {
        headers.append("Authorization", `Bearer ${accessToken}`);
    }

    if (API_KEY) {
        headers.append("X-Noroff-API-Key", API_KEY);
    }

    if (hasBody) {
        headers.append("Content-Type", "application/json");
    }

    return headers;
}