import { validateEmail } from './validateemail.mjs';

export function validateInputs(form) {
    'use strict';

    if (!form) {
        console.error('Form element is not provided');
        return false;
    }

    let isValid = form.checkValidity();

    const emailInput = form.querySelector("#signUpEmail");
    if (emailInput) {
        // Validate email input
        isValid = validateEmail(form, emailInput) && isValid;

        if (!isValid) {
            form.classList.add('was-validated');
        } else {
            form.classList.remove('was-validated');
        }
    }
    return isValid;
}