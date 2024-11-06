import { renderErrors } from "../ui/rendererrors.mjs";

// Function to handle authorization errors
export async function handleErrors(response) {
    if (response.ok) {
        return response;
    }

    const errorData = await response.json();

    if (response.status === 401 && errorData.errors && errorData.errors.length > 0) {
        const errorMessage = errorData.errors[0].message;
        renderErrors(new Error(errorMessage));
        throw new Error(errorMessage);
    }

    if (response.status === 400 && errorData.errors && errorData.errors.length > 0) {
        const errorMessage = errorData.errors[0].message;
        renderErrors(new Error(errorMessage));
        throw new Error(errorMessage);
    }

    renderErrors(new Error("An error occurred"));
    throw new Error("An error occurred");
}