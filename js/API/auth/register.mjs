import * as constants from "../constants.mjs";
import { headers } from "../headers.mjs";
import { authFetch } from "./fetch.mjs";
import { handleErrors } from "./handleerrors.mjs";

const { API_BASE_URL, API_AUTH, API_REGISTER } = constants;

export async function register(name, email, password) {
    const response = await authFetch(API_BASE_URL + API_AUTH + API_REGISTER, {
        headers: headers(true),
        method: "POST",
        body: JSON.stringify({ name, email, password })
    });

    if (response.ok) {
        return await response.json();
    }

    await handleErrors(response);
}