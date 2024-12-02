import { fetchSearch } from '../../../ui/shared/fetchsearch.mjs';

export function searchFormListener(query, selectedTags = null) {

    const searchForm = document.querySelector('.search-form');

    if (searchForm) {
        searchForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const query = event.target.querySelector('input[type="search"]').value;

            if (selectedTags) {
                try {

                    await fetchSearch(query, ...selectedTags);
                } catch (error) {
                    renderErrors(new Error("Failed to load search results"));
                    console.error("Error searching posts:", error);
                }
            } else {
                await fetchSearch(query);
            }
        });
    }
}