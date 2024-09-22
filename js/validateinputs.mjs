export function validateInputs(form) {
    'use strict';

    if (!form) {
        console.error('Form element is not provided');
        return false;
    }

    const isValid = form.checkValidity();
    if (!isValid) {
        form.classList.add('was-validated');
    }
    return isValid;
}