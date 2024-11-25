import { getProfile } from "../../profiles/getprofile.mjs";
import { renderProfileBanner } from "../profiles/renderprofilebanner.mjs";
import { renderProfileAvatar } from "../profiles/renderprofileavatar.mjs";
import { renderProfileName } from "../profiles/renderprofilename.mjs";
import { renderProfileBio } from "../profiles/renderprofilebio.mjs";
import { renderFollowers } from "../profiles/renderfollowers.mjs";
import { renderFollowing } from "../profiles/renderfollowing.mjs";
import { renderErrors } from "../../ui/rendererrors.mjs";
import { renderPosts } from "../../../ui/feed/renderposts.mjs";
import { setupEditButtons } from "../profiles/setupeditbuttons.mjs";
import { setupFollowButton } from "../profiles/setupfollowbutton.mjs";

/**
 * Renders the profile page.
 * @returns {Promise<void>} A promise that resolves when the profile page is rendered.
 * @example
 * ```javascript
 * await renderProfile();
 * ```
 */
export async function renderProfile() {
    document.addEventListener("DOMContentLoaded", async () => {
        const urlParams = new URLSearchParams(window.location.search);
        let profileName = urlParams.get("profile");
        if (profileName === null) {
            profileName = undefined;
        }

        try {
            const { data: profile } = await getProfile(profileName);
            if (document.title === "Profile | ConnectSphere") {
                renderProfileBanner(profile);
                renderProfileAvatar(profile);
                renderProfileName(profile);
                renderProfileBio(profile);
                await renderFollowers(profile);
                await renderFollowing(profile);
                await renderPosts(profile.name);

                setupEditButtons(profile);
                setupFollowButton(profile);

            }
        } catch (error) {
            renderErrors(new Error("An error occurred while loading the profile page"));
            console.error("Error rendering profile data:", error);
        }
    });
}

