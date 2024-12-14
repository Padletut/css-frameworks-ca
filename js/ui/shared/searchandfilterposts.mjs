import { renderErrors } from "./rendererrors.mjs";
import { getPosts } from "../../API/feed/getposts.mjs";
import { getPostsbyUser } from "../../API/feed/getpostsbyuser.mjs";
import { createPostCard } from "../feed/createpostcard.mjs";
import { fetchSearch } from "../../API/utils/fetchsearch.mjs";
import { renderSearchResults } from "./rendersearchresults.mjs";
import { createShowMoreButton } from "./createshowmorebutton.mjs";

/**
 * Filters posts based on the selected tags.
 * @param {string} profileName - The name of the profile.
 * @param {Array<string>} selectedTags - The selected tags to filter posts by.
 * @param {HTMLElement} feedContainer - The container to render the posts in.
 * @param {HTMLElement} filterDropdown - The dropdown element to update the text.
 * @param {string} filterText - The text to update the dropdown with.
 * @returns {Promise<void>}
 * @example
 * ```javascript
 * filterPosts("john_doe", ["tag1", "tag2"], feedContainer, filterDropdown, "Filter by tags");
 * ```
 **/
export class SearchAndFilterPosts {
    constructor(profileName, feedContainer) {
        this.profileName = profileName;
        this.feedContainer = feedContainer;
        this.selectedTags = [];
        this.uniquePosts = [];
        this.currentPage = 1;
        this.isLastPage = false;
        this.filterDropdown = document.getElementById('filterDropdown');
        this.dropdownItems = document.querySelectorAll('.dropdown-item');
        this.searchForm = document.querySelector('.search-form');
        this.searchInput = document.querySelector('.search-form input[type="search"]');

        this.setupFilterListeners();
        this.setupSearchListener();
    }

    createQueryParams(additionalParams = {}) {
        return new URLSearchParams({
            _author: "true",
            _comments: "true",
            limit: "10",
            ...additionalParams,
        });
    }

    async fetchPage(queryParams, profileName, page) {
        queryParams.set('page', page);
        const response = profileName ? await getPostsbyUser(profileName, queryParams) : await getPosts(queryParams);
        if (response && response.data) {
            this.isLastPage = response.meta.isLastPage;
            this.currentPage = response.meta.nextPage;
            return response.data;
        } else {
            this.isLastPage = true;
            return [];
        }
    }

    async rerenderPosts() {
        try {
            const queryParams = this.createQueryParams();
            const posts = await this.fetchPage(queryParams, this.profileName, this.currentPage);

            this.feedContainer.innerHTML = "";
            posts.forEach(post => createPostCard(post, this.profileName, this.feedContainer));

            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (!this.isLastPage) {
                createShowMoreButton(this.fetchNextPage.bind(this));
            }
        } catch (error) {
            renderErrors(new Error("Failed to load posts " + error));
            console.error("Error rendering posts:", error);
        }
    }

    async handleFilterClick(event) {
        event.preventDefault();
        const tagsAttribute = event.target.getAttribute('data-tag');
        const filterText = event.target.textContent.trim();
        this.selectedTags = tagsAttribute ? tagsAttribute.split(',') : null;
        this.currentPage = 1;
        this.isLastPage = false;

        if (this.selectedTags) {
            await this.fetchAndRenderFilteredPosts();
        } else {
            await this.rerenderPosts();
        }
        this.filterDropdown.textContent = filterText;
    }

    async fetchAndRenderFilteredPosts() {
        let allPosts = [];
        try {
            const fetchPromises = this.selectedTags.map(async (tag) => {
                const queryParams = this.createQueryParams({ _tag: tag });
                const posts = await this.fetchPage(queryParams, this.profileName, this.currentPage);
                allPosts = [...allPosts, ...posts];
            });

            await Promise.all(fetchPromises);

            this.uniquePosts = Array.from(new Set(allPosts.map(post => post.id)))
                .map(id => allPosts.find(post => post.id === id));

            this.feedContainer.innerHTML = "";
            this.uniquePosts.forEach(post => createPostCard(post, this.profileName, this.feedContainer));

            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (!this.isLastPage) {
                createShowMoreButton(this.fetchNextPage.bind(this));
            }

        } catch (error) {
            renderErrors(new Error("Failed to load posts " + error));
            console.error("Error rendering posts:", error);
        }
    }

    async fetchNextPage() {
        let allPosts = [];
        try {
            const fetchPromises = this.selectedTags.map(async (tag) => {
                const queryParams = this.createQueryParams({ _tag: tag, limit: "100" });
                const posts = await this.fetchPage(queryParams, this.profileName, this.currentPage);
                allPosts = [...allPosts, ...posts];
            });

            await Promise.all(fetchPromises);

            const newPosts = Array.from(new Set(allPosts.map(post => post.id)))
                .map(id => allPosts.find(post => post.id === id));

            newPosts.forEach(post => createPostCard(post, this.profileName, this.feedContainer));

            if (!this.isLastPage) {
                createShowMoreButton(this.fetchNextPage.bind(this));
            }

        } catch (error) {
            renderErrors(new Error("Failed to load more posts " + error));
            console.error("Error fetching next page:", error);
        }
    }

    setupFilterListeners() {
        this.dropdownItems.forEach(item => {
            item.addEventListener('click', this.handleFilterClick.bind(this));
        });
    }

    async handleSearchSubmit(event) {
        event.preventDefault();

        const query = event.target.querySelector('input[type="search"]').value;

        try {
            if (this.selectedTags && this.uniquePosts.length > 0) {
                const filteredPosts = this.uniquePosts.filter(post =>
                    post.title.includes(query) || post.body.includes(query)
                );
                renderSearchResults(filteredPosts);
            } else {
                await fetchSearch(query);
            }
        } catch (error) {
            renderErrors(new Error("Failed to load search results"));
            console.error("Error searching posts:", error);
        }
    }

    async handleSearchInput(event) {
        const query = event.target.value;

        if (!query) {
            this.currentPage = 1;
            this.isLastPage = false;
            await this.rerenderPosts();
        }
    }

    setupSearchListener() {
        if (this.searchForm) {
            this.searchForm.addEventListener('submit', this.handleSearchSubmit.bind(this));
        }
        if (this.searchInput) {
            this.searchInput.addEventListener('input', this.handleSearchInput.bind(this));
        }
    }
}