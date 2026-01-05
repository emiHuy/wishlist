/**
 * Helper function to make API requests.
 * @param {string} url - URL to request. 
 * @param {object} options - Fetch options (method, headers, body, etc.).
 * @returns {Promise<any|null>} - Parsed JSON data or null for empty responses.
 * @throws {Error} - Throws if response status is not ok.
 */
export async function request(url, options={}) {
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

// Helper to get token and attach Authorization header
export function getAuthHeaders(withContentType = false) {
    const token = sessionStorage.getItem('token');
    if (!token) throw new Error('User is not authenticated');
    const headers = { 'Authorization': `Bearer ${token}` };
    if (withContentType) {
        headers['Content-Type'] = 'application/json';
    }
    return headers;
}