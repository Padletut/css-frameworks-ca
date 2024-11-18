import { loadStorage } from "../storage/loadstorage.mjs";

export function checkAuth() {
    const accessToken = loadStorage("accessToken");
    document.addEventListener("DOMContentLoaded", () => {
        const currentPath = window.location.pathname;
        const authPaths = ["/index.html", "/"]; // Add all paths that correspond to the authentication page

        if (authPaths.includes(currentPath)) {
            return;
        }

        if (!accessToken) {
            window.location.href = "/index.html"; // Ensure this path is correct
        } else {
            return true;
        }
    });
}