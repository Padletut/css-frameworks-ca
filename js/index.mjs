import { loadHTML } from "./ui/loadhtml.mjs";
import { authSwitchTabs } from "./ui/bootstrap/authswitchtabs.mjs";
import { handleFormSubmission } from "./ui/bootstrap/handleformsubmission.mjs";
import { setBodyPadding } from "./ui/bootstrap/setbodypadding.mjs";
import { checkAuth } from "./ui/checkauth.mjs";
import { logout } from "./API/auth/logout.mjs";
import { initializeCreatePostModal } from "./ui/bootstrap/initializecreatepostmodal.mjs";
import { renderProfile } from "./API/ui/routes/renderprofile.mjs";
import { renderPosts } from "./ui/feed/renderposts.mjs";
import { loadStorage } from "./storage/loadstorage.mjs";
import { fetchSearch } from "./ui/shared/search.mjs";

// Check if user is logged in
let isLoggedIn = checkAuth();

const profileName = loadStorage("profile");

/**
 * Loads the modals for creating posts and comments.
 * @param {string} profileName - The name of the profile.
 * @example
 * ```javascript
 * const profileName = "john_doe";
 * loadModals(profileName);
 * ```
 */
function loadModals(profileName) {
    // Load modals
    const modalsContainer = document.getElementById("modals-container");
    if (modalsContainer) {
        loadHTML('../modals/createnewpostmodal.html', 'modals-container', initializeCreatePostModal(null, profileName));
        loadHTML('../modals/commentmodal.html', 'modals-container');
    }
}

if (isLoggedIn && profileName) {
    loadModals(profileName.name);
}

authSwitchTabs();

// Eventlistener Sign in and Sign up
const signInButton = document.getElementById("signInButton");
const signUpButton = document.getElementById("signUpButton");

handleFormSubmission(signInButton, "signInForm", "profile/index.html");
handleFormSubmission(signUpButton, "signUpForm", "profile/index.html");

// Set body padding on initial load and window resize
window.addEventListener('load', setBodyPadding);
window.addEventListener('resize', setBodyPadding);

setBodyPadding();

// Eventlistener for logout button
const logoutButton = document.querySelector(".logout");
if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
        event.preventDefault();
        logout();
    });
}

// if <title>Feed | ConnectSphere</title> fetch all prosts
if (document.title === "Feed | ConnectSphere") {
    await renderPosts();
}

// Render profile data
if (document.title === "Profile | ConnectSphere") {
    await renderProfile();
}

// Event listener for search form
const searchForm = document.querySelector('.search-form');

if (searchForm) {
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = e.target.querySelector('input[type="search"]').value;
        const searchResults = await fetchSearch(query);
    });
}