/**
 * 
 * @param {*} searchForm 
 * @param {*} searchInput 
 * @param {*} handleSearchSubmit 
 * @param {*} handleSearchInput 
 */
export function setupSearchListener(searchForm, searchInput, handleSearchSubmit, handleSearchInput) {
    if (searchForm) {
        // Remove previous event listener if it exists
        searchForm.removeEventListener('submit', handleSearchSubmit);
        searchForm.addEventListener('submit', handleSearchSubmit);
    }
    if (searchInput) {
        console.log('Attaching input event listener to search input');
        // Remove previous event listener if it exists
        searchInput.removeEventListener('input', handleSearchInput);
        searchInput.addEventListener('input', handleSearchInput);
    }
}