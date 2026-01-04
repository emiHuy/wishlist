import { useState, useEffect } from 'react';
import { updateWishlistItem } from '../../../api/wishlist';
import '../../../css/wishlist-item-editor.css';

// Component for editing a wishlist item.
function WishlistItemEditor({item, onClose, refresh}) {
    // Local state for input fields.
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [url, setURL] = useState('');

    // Initialize form fields when an item is being edited.
    useEffect(() => {
        if (!item) return;
            setTitle(item.title || '');
            setPrice(item.price ?? '');
            setDescription(item.description ?? '');
            setURL(item.url ?? '');
    }, [item]);

    // Do not render editor if no item is selected.
    if (item == null) return null;

    // Handle updating the item.
    const updateItem = async () => {
        try {
            // Send updated data to server.
            await updateWishlistItem(item._id, { title, price, description, url });
            // Close and refresh wishlist.
            onClose();
            refresh();
            // Reset local state for next edit.
            setTitle('');
            setPrice('');
            setDescription('');
            setURL('');
        } catch (err) {
            console.error('Update failed:', err);
        }
    };

    return (
        <div className="editor">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                id="url"
                type="url"
                placeholder="URL"
                value={url}
                onChange={(e) => setURL(e.target.value)}
            />
            <input
                id="price"
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button type="submit" onClick={updateItem}>Update</button>
        </div>
    )
}

export default WishlistItemEditor;