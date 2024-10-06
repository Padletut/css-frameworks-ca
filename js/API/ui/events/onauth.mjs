import { login } from "../../auth/login.mjs";
import { register } from "../../auth/register.mjs";

export async function onAuth(event) {

    const form = event.target.closest("form");
    const name = form.firstName ? form.firstName.value : null;


    if (form.signInButton) {
        const email = form.Email.value;
        const password = form.Password.value;
        await login(email, password);
    } else {
        const email = form.signUpEmail.value;
        const password = form.signUpPassword.value;
        await register(name, email, password);
        await login(email, password);
    }
}