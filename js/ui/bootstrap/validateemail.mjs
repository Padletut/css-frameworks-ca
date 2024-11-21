/**
 * Validates if an email input ends with @noroff.no or @stud.noroff.no.
 * @param {HTMLFormElement} form - The form element containing the email input.
 * @param {HTMLInputElement} emailInput - The email input element to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 * @example
 * ```javascript
 * const form = document.getElementById("signUpForm");
 * const emailInput = form.querySelector("#signUpEmail");
 * const isValid = validateEmail(form, emailInput);
 * console.log(isValid); // true or false
 * ```
 */
export function validateEmail(form, emailInput) {
    const emailPattern = /^[^\s@]+@(noroff\.no|stud\.noroff\.no)$/;
    const isValid = emailPattern.test(emailInput.value);

    console.log(`Validating email: ${emailInput.value}`);
    console.log(`Email is valid: ${isValid}`);

    if (!isValid) {
        emailInput.setCustomValidity('Sorry, only users with email ending @noroff.no or @stud.noroff.no can register');
        throw new Error('Sorry, only users with email ending @noroff.no or @stud.noroff.no can register');
    } else {
        emailInput.setCustomValidity('');
    }

    return isValid;
}