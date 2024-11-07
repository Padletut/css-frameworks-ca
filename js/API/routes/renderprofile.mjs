import { getProfile } from "../profiles/getprofile.mjs";
import { renderProfileBanner } from "../ui/profiles/renderprofilebanner.mjs";
import { renderProfileAvatar } from "../ui/profiles/renderprofileavatar.mjs";
import { renderProfileName } from "../ui/profiles/renderprofilename.mjs";
import { renderProfileBio } from "../ui/profiles/renderprofilebio.mjs";

export async function renderProfile() {
    document.addEventListener("DOMContentLoaded", async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const profileName = urlParams.get("profile");

        if (profileName) {
            try {
                const profile = await getProfile(profileName);
                if (document.title === "Profile | ConnectSphere") {
                    renderProfileBanner(profile);
                    renderProfileAvatar(profile);
                    renderProfileName(profile);
                    renderProfileBio(profile);
                }
            } catch (error) {
                console.error("Error rendering profile data:", error);
            }
        } else {
            console.error("Profile name not found in URL");
        }
    });
}