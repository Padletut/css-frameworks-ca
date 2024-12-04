/**
 * 
 * @param {*} date 
 * @returns 
 *
 * @example
 * ```javascript
 * const date = new Date();
 * const formattedDate = formatDate(date);
 * console.log(formattedDate);
 * ```
 */
export function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
}