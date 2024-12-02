import { getPosts } from "../../API/feed/getposts.mjs";
import { getPostsbyUser } from "../../API/feed/getpostsbyuser.mjs";

let nextPage;
let isLastPage = false;

/**
 * Fetches posts for a given profile or all posts if no profile is specified.
 * @param {string} [profileName] - The name of the profile.
 * @returns {Promise<Object>} A promise that resolves to the posts data.
 * @example
 * ```javascript
 * const posts = await fetchPosts("john_doe");
 * console.log(posts);
 * ```
 */
export async function fetchPosts(profileName, tag) {

    if (!nextPage) nextPage = 1;

    const queryParams = new URLSearchParams({
        _author: "true",
        _comments: "true",
        limit: "10",
        page: nextPage,
    });

    if (tag) {
        queryParams.append("_tag", tag);
        queryParams.delete("page");
    }

    let posts;
    if (!profileName) {
        posts = await getPosts(queryParams);
    } else {
        queryParams.delete("limit");
        posts = await getPostsbyUser(profileName, queryParams);
    }

    isLastPage = posts.meta.isLastPage;
    nextPage = posts.meta.nextPage;

    return posts;
}