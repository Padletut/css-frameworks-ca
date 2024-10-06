import { validateInputs } from "./validateinputs.mjs";
import { onAuth } from "../../API/ui/events/onauth.mjs";

export function handleFormSubmission(buttonElement, formId, redirectUrl) {
    if (buttonElement) {
        buttonElement.addEventListener("click", async function (event) {
            event.preventDefault();
            const form = document.getElementById(formId);
            if (validateInputs(form)) {
                try {
                    await onAuth(event);
                    window.location.href = redirectUrl;
                    setTimeout(() => {
                        form.reset();
                    }, 2000);
                } catch (error) {
                    console.error("Error during form submission:", error);
                }
            } else {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
            }
        });
    }
}