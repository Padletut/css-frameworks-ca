import { authSwitchTabs } from "./ui/bootstrap/authswitchtabs.mjs";
import { handleFormSubmission } from "./ui/bootstrap/handleformsubmission.mjs";
import { setBodyPadding } from "./ui/bootstrap/setbodypadding.mjs";
import { checkAuth } from "./ui/checkauth.mjs";
import { logout } from "./API/auth/logout.mjs";
import { renderProfile } from "./API/ui/routes/renderprofile.mjs";
import { renderPosts } from "./ui/feed/renderposts.mjs";
import { loadStorage } from "./storage/loadstorage.mjs";
import { loadModals } from "./ui/bootstrap/loadmodals.mjs";
import { setFeedProfilePosition } from "./ui/shared/setfeedprofileposition.mjs";

// Check if user is logged in
let isLoggedIn = checkAuth();

const profileName = loadStorage("profile");


if (isLoggedIn && profileName) {
    loadModals(profileName.name);
}

authSwitchTabs();

// Eventlistener Sign in and Sign up
const signInButton = document.getElementById("signInButton");

handleFormSubmission(signInButton, "signInForm", "profile/index.html");


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

// if <title>Feed | ConnectSphere</title> fetch all posts
if (document.title === "Feed | ConnectSphere") {
    await renderPosts();
}

// Render profile data
if (document.title === "Profile | ConnectSphere") {
    await renderProfile();
}

// Calculate .feed-profile position on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(setFeedProfilePosition, 1000);
});

// Recalculate .feed-profile position on window resize
window.addEventListener('resize', setFeedProfilePosition);

// Recalculate .feed-profile position on scroll
window.addEventListener('scroll', setFeedProfilePosition);
