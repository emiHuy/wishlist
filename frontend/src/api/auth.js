import { request, getAuthHeaders } from "./utils";
const BASE_URL = 'http://localhost:5000/auth';

/**
 * Signup a new user.
 * @param {Object} data - { email, name, password }.
 * @returns {Promise<Object>} - User data + token.
 */
async function signup(data) {
    return request(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
}

/**
 * Login user.
 * @param {Object} data - { email, password }.
 * @returns {Promise<Object>} - Logged-in user info + token.
 */
async function login(data) {
    return request(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
}

/**
 * Get current user info (protected).
 * @returns {Promise<Object>} - User info.
 */
async function getUser() {
    return request(`${BASE_URL}/me`, {
        method: 'GET',
        headers: getAuthHeaders(false),
    });
}

/**
 * Delete current user.
 * @returns {Promise<null>} - Null on success.
 * @throws {Error} - Throws if request fails.
 */
async function deleteUser() {
    return request(`${BASE_URL}/me`, {
        method: 'DELETE',
        headers: getAuthHeaders(false)
    });
}

export { signup, login, getUser, deleteUser };