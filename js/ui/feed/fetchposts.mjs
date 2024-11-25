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
export async function fetchPosts(profileName) {
    const queryParams = new URLSearchParams({
        _author: "true",
        _comments: "true",
        limit: "10",
    });

    if (!nextPage) nextPage = 1;

    let posts;
    if (!profileName) {
        posts = await getPosts(nextPage, queryParams);
    } else {
        posts = await getPostsbyUser(profileName, nextPage);
    }

    isLastPage = posts.meta.isLastPage;
    nextPage = posts.meta.nextPage;

    return posts;
}