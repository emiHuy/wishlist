import { useEffect, useRef } from 'react';
import { deleteWishlistItem } from '../../../api/wishlist';
import '../../../css/menu.css'

// add cancel button

// Operations menu from a single wishlist item (edit / remove).
function WishlistItemMenu({ item, onEdit, isVisible, onClose, refresh }) {
    // Deletes an item.
    const deleteItem = async (id) => {
        try {
            await deleteWishlistItem(id);
            // Refresh wishlist after deletion.
            refresh();
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    // Reference to menu the DOM element.
    const menuRef = useRef(null);

    // Close menu when clicking outside of it.
    useEffect(() => {
        if (!isVisible) return;
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, onClose]);

    // Only render menu when it should be visible.
    if (!isVisible) return null;
    return (
        <div className="menu" ref={menuRef}>
            <button onClick={() => onEdit(item)}>Edit</button>
            <button onClick={() => deleteItem(item._id)}>Remove</button>
        </div> 
    )
}

export default WishlistItemMenu;