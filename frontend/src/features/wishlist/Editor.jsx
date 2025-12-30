import "../../css/editor.css";
import { useState, useEffect } from 'react';
import { updateWishlistItem } from "../../api/wishlist";

export default function Editor({item, onClose, refresh}) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [url, setURL] = useState('');

    useEffect(() => {
        if (!item) return;
            setTitle(item.title || '');
            setPrice(item.price ?? '');
            setDescription(item.description ?? '');
            setURL(item.url ?? '');
    }, [item]);

    if (item == null) return null;

    const updateItem = async () => {
        try {
            await updateWishlistItem(item._id, { title, price, description, url });
            onClose();
            refresh();
            setTitle("");
            setPrice("");
            setDescription("");
            setURL("");
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