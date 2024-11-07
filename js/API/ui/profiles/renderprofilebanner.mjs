// Renders the profile banner in div with id "profile-cover"
export async function renderProfileBanner(profileName) {
    const profileBanner = document.getElementById("profile-cover");

    if (!profileBanner) {
        console.error("Profile cover element not found");
        return;
    }

    try {
        const profileBannerImage = document.createElement("img");
        profileBannerImage.classList.add("profile-banner-image");
        profileBannerImage.src = profileName.data.banner.url;
        profileBannerImage.alt = profileName.data.banner.alt;
        profileBannerImage.style.width = "100%";

        profileBanner.appendChild(profileBannerImage);

    } catch (error) {
        console.error(error);
    }
}