import { useEffect, useState } from "react";
import { getWishlist } from "../../api/wishlist";
import WishlistItem from "./WishlistItem";
import Editor from "./Editor"

import '../../css/wishlist.css';

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  const loadItems = async () => {
    try {
      const data = await getWishlist();
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="wishlist">
      <Editor item={itemToEdit}  onClose={() => setItemToEdit(null)} refresh={loadItems}></Editor>
      {items.length === 0 ? (
        <p>No items yet</p>
      ) : (
        items.map((item) => (
          <WishlistItem
            key={item._id}
            item={item}
            edit={setItemToEdit}
            refresh={loadItems}
          />
        ))
      )}
    </div>
  );
}