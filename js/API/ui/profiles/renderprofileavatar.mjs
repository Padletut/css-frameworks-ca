// Renders the profile banner in div with id "profile-cover"
export async function renderProfileAvatar(profileName) {
    const profileAvatar = document.getElementById("profile-image");

    if (!profileAvatar) {
        console.error("Profile avatar element not found");
        return;
    }

    try {
        const profileAvatarImage = document.createElement("img");
        profileAvatarImage.classList.add("profile-avatar-image");
        profileAvatarImage.src = profileName.data.avatar.url;
        profileAvatarImage.alt = profileName.data.avatar.alt;
        profileAvatarImage.style.width = "128px";

        profileAvatar.appendChild(profileAvatarImage);

    } catch (error) {
        console.error(error);
    }
}