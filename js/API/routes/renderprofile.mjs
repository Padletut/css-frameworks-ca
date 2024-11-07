import { getProfile } from "../profiles/getprofile.mjs";
import { renderProfileBanner } from "../ui/profiles/renderprofilebanner.mjs";
import { renderProfileAvatar } from "../ui/profiles/renderprofileavatar.mjs";
import { renderProfileName } from "../ui/profiles/renderprofilename.mjs";
import { renderProfileBio } from "../ui/profiles/renderprofilebio.mjs";

export async function renderProfile() {
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const profile = await getProfile();
            if (document.title === "Profile | ConnectSphere") {
                renderProfileBanner(profile);
                renderProfileAvatar(profile);
                renderProfileName(profile);
                renderProfileBio(profile);
            }
        } catch (error) {
            console.error("Error rendering profile data:", error);
        }
    });
}