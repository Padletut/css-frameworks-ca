import { FilterPosts } from "../../../ui/shared/filterposts.mjs";

export function filterPostsListener(profileName = null, feedContainer) {
    new FilterPosts(profileName, feedContainer);
}