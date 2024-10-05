import { validateInputs } from "./validateinputs.mjs";

export function handleFormSubmission(buttonElement, formId, redirectUrl) {
    if (buttonElement) {
        buttonElement.addEventListener("click", function (event) {
            event.preventDefault();
            const form = document.getElementById(formId);
            if (validateInputs(form)) {
                setTimeout(() => {
                    form.reset();
                }, 2000);
                window.location.href = redirectUrl;
            } else {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
            }
        });
    }
}