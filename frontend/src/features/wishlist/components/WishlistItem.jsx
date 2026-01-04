import { useState } from 'react';
import { deleteWishlistItem } from '../../../api/wishlist';
import WishlistItemMenu from './WishlistItemMenu';
import '../../../css/wishlist-item.css';

// Component for displaying a single wishlist item.
function WishlistItem({ item, edit, refresh }) {
    // Controls visibility of item operations menu.
    const [menuVisible, setMenuVisible] = useState(false);

    // Mark an item as completed by deleting it.
    const completeItem = async (id) => {
        try {
            await deleteWishlistItem(id);
            // Trigger wishlist refresh after successful completion/deletion.
            refresh();
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    // Only display existing information about wishlist item.
    return (
        <div className="wishlist-item">
            <WishlistItemMenu item={item} onEdit={edit} isVisible={menuVisible} onClose={() => setMenuVisible(false)} refresh={refresh}></WishlistItemMenu>
            <div className="item-details">
                <div className="item">
                    <h3 className="title">{item.title}</h3>
                    {item.url ? (<a href={item.url}>Link</a>) : (<></>)}
                </div>
                <p className="description">{item.description}</p>
                {item.price? (<h4 className="price">${Number(item.price).toFixed(2)}</h4>) : (<h4 className="price">$?</h4>)}
            </div>
            <div className="operations">
                <button onClick={() => setMenuVisible(true)}>⋮</button>
                <input className="checkbox" type="checkbox" id="obtained" name="obtained" onClick={() => completeItem(item._id)}/>
            </div>
        </div>
    )
}

export default WishlistItem;