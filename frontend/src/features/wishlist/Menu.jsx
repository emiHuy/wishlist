import "../../css/menu.css"
import { useEffect, useRef } from "react";
import { deleteWishlistItem } from "../../api/wishlist";

export default function Menu({item, onEdit, isVisible, onClose, refresh}) {
    const deleteItem = async (id) => {
        try {
            await deleteWishlistItem(id);
            refresh();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const menuRef = useRef(null);

    useEffect(() => {
        if (!isVisible) return;
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isVisible, onClose]);

  if (!isVisible) return null;
    return (
        <div className="menu" ref={menuRef}>
            <button onClick={() => onEdit(item)}>Edit</button>
            <button onClick={() => deleteItem(item._id)}>Remove</button>
        </div> 
    )
}