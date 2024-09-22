// Function to load HTML content into a container
export function loadHTML(url, containerId, callback) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${url}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(containerId).innerHTML += data;
            // Call the callback function if provided
            if (callback) {
                callback();
            }
        })
        .catch(error => {
            console.error('Error loading HTML:', error);
        });
}