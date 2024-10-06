import { validateInputs } from "./validateinputs.mjs";
import { login } from "../../API/auth/login.mjs";
import { register } from "../../API/auth/register.mjs";

export function handleFormSubmission(buttonElement, formId, redirectUrl) {
    if (buttonElement) {
        buttonElement.addEventListener("click", function (event) {
            event.preventDefault();
            const form = document.getElementById(formId);
            if (validateInputs(form)) {
                if (formId === "signInForm") {
                    login(form.Email.value, form.Password.value);
                } else {
                    register(form.firstName.value, form.signUpEmail.value, form.signUpPassword.value);
                }
                setTimeout(() => {
                    form.reset();
                }, 2000);
                //   window.location.href = redirectUrl;
            } else {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
            }
        });
    }
}