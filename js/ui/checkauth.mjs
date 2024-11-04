import { isLoggedIn } from "../API/auth/isloggedin.mjs";

export function checkAuth() {
    document.addEventListener("DOMContentLoaded", () => {
        const currentPath = window.location.pathname;
        const authPaths = ["/index.html", "/"]; // Add all paths that correspond to the authentication page

        if (authPaths.includes(currentPath)) {
            return;
        }

        if (!isLoggedIn()) {
            window.location.href = "/index.html"; // Ensure this path is correct
        }
    });
}