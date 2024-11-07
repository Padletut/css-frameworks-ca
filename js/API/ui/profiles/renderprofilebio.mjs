// Render profile bio

export function renderProfileBio(profile) {
    const bioContainer = document.getElementById("profile-bio");
    const bio = document.createElement("p");
    bio.textContent = profile.data.bio;
    bioContainer.appendChild(bio);
}