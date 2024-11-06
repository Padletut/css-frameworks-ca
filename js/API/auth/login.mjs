import * as global from "../constants.mjs";
import { saveStorage } from "../../storage/savestorage.mjs";
import { authFetch } from "./fetch.mjs";
import { handleErrors } from "../handleerrors/handleerrors.mjs";

const { API_BASE_URL, API_AUTH, API_LOGIN } = global;

export async function login(email, password) {
    const response = await authFetch(API_BASE_URL + API_AUTH + API_LOGIN, {
        method: "POST",
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        const { accessToken, ...profile } = (await response.json()).data;
        saveStorage("accessToken", accessToken);
        saveStorage("profile", profile);
        return profile;
    }

    await handleErrors(response);
}