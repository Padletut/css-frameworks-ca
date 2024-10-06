import { login } from "../../auth/login.mjs";

export async function onAuth(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (event.submitter.dataset.auth === "login") {
        await login(email, password);
    } else {
        await register(name, email, password);
        await login(email, password);
    }
}