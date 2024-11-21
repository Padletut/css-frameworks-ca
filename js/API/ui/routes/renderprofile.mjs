import { getProfile } from "../../profiles/getprofile.mjs";
import { renderProfileBanner } from "../profiles/renderprofilebanner.mjs";
import { renderProfileAvatar } from "../profiles/renderprofileavatar.mjs";
import { renderProfileName } from "../profiles/renderprofilename.mjs";
import { renderProfileBio } from "../profiles/renderprofilebio.mjs";
import { renderPosts } from "../../../ui/feed/renderposts.mjs";
import { editProfileBanner } from "../profiles/editprofile.mjs";
import { editProfileAvatarAndBio } from "../profiles/editprofile.mjs";

export async function renderProfile() {
    document.addEventListener("DOMContentLoaded", async () => {
        const urlParams = new URLSearchParams(window.location.search);
        let profileName = urlParams.get("profile");
        if (profileName === null) {
            profileName = undefined;
        }

        try {
            const profile = await getProfile(profileName);
            if (document.title === "Profile | ConnectSphere") {
                renderProfileBanner(profile);
                renderProfileAvatar(profile);
                renderProfileName(profile);
                renderProfileBio(profile);
                await renderPosts(profile);

                setupEditButtons(profile);
            }
        } catch (error) {
            console.error("Error rendering profile data:", error);
        }
    });
}

function setupEditButtons(profile) {
    const editCoverButton = document.querySelector('[name="edit-cover"]');
    const editProfileButton = document.querySelector('[name="edit-profile"]');

    if (editCoverButton) {
        editCoverButton.addEventListener("click", async () => {
            await editProfileBanner(profile);
        });
    }

    if (editProfileButton) {
        editProfileButton.addEventListener("click", async () => {
            await editProfileAvatarAndBio(profile);
        });
    }
}