/**
 * wishlist.js
 * 
 * This module provides functions to interact with the Wishlist backend API.
 * Includes functions to fetch, create, update, and delete wishlist items.
 */

import { request, getAuthHeaders } from './utils';
const BASE_URL = 'http://localhost:5000/wishlist';

/**
 * Fetch all wishlist items from backend.
 * @returns {Promise<Array>} - Array of all wishlist items.
 * @throws {Error} - Throws if request fails.
 */
async function getWishlist() {
    return request(BASE_URL, { headers: getAuthHeaders(false) });
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
        headers: getAuthHeaders(true),
        body: JSON.stringify(data)
    }); 
}

/**
 * Update existing wishlist item.
 * @param {string|number} id - ID of wishlist item to update.
 * @param {Object} data - Updated data for wishlist item.
 * @returns {Promise<Object>} - Updated wishlist item.
 * @throws {Error} - Throws if request fails.
 */
async function updateWishlistItem(id, data) {
    return request(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(true),
        body: JSON.stringify(data)
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
        headers: getAuthHeaders(false)
    });
}

export { getWishlist, createWishlistItem, updateWishlistItem, deleteWishlistItem };