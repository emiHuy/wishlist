/**
 * wishlist.js
 * 
 * This module provides functions to interact with the Wishlist backend API.
 * Includes functions to fetch, create, update, and delete wishlist items.
 */

const BASE_URL = 'http://localhost:5000/wishlist';

/**
 * Helper function to make API requests.
 * @param {string} url - URL to request. 
 * @param {object} options - Fetch options (method, headers, body, etc.).
 * @returns {Promise<any|null>} - Parsed JSON data or null for empty responses.
 * @throws {Error} - Throws if response status is not ok.
 */
async function request(url, options={}) {
    const res = await fetch(url, options);
    if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(`Request failed: ${res.status} ${errorMessage}`);
    }
    if (res.status !== 204) { // 204 => no content
        return res.json();
    }
    return null;
}

/**
 * Fetch all wishlist items from backend.
 * @returns {Promise<Array>} - Array of all wishlist items.
 * @throws {Error} - Throws if request fails.
 */
async function getWishlist() {
    return request(BASE_URL);
}

/**
 * Create new wishlist item.
 * @param {Object} data - Data for new wishlist item.
 * @returns {Promise<Object>} - Created wishlist item.
 * @throws {Error} - Throws if request fails.
 */
async function createWishlistItem(data) {
    return request((BASE_URL), {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }); 
}

/**
 * Update existing wishlist item.
 * @param {string|number} id - ID of wishlist item to update.
 * @param {Object} data - Updated data for wishlist item.
 * @returns {Promis<Object>} - Updated wishlist item.
 * @throws {Error} - Throws if request fails.
 */
async function updateWishlistItem(id, data) {
    return request(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
}

/** 
 * Delete wishlist item.
 * @param {string|number} id - ID of wishlist item to delete.
 * @returns {Promise<null>} - Null on successful deletion.
 * @throws {Error} - Throws if request fails.
 */
async function deleteWishlistItem(id) {
    return request(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
}

export { getWishlist, createWishlistItem, updateWishlistItem, deleteWishlistItem };