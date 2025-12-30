import "../../css/wishlist-item.css";
import { useState } from "react";
import { deleteWishlistItem } from "../../api/wishlist";
import Menu from "./Menu";

function WishlistItem({item, edit, refresh}) {
    const [menuVisible, setMenuVisible] = useState(false);

    const completeItem = async (id) => {
        try {
            await deleteWishlistItem(id);
            refresh();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    return (
        <div className="wishlist-item">
            <Menu item={item} onEdit={edit} isVisible={menuVisible} onClose={() => setMenuVisible(false)} refresh={refresh}></Menu>
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