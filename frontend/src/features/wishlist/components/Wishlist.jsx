import { useEffect, useState } from 'react';
import { getWishlist } from '../../../api/wishlist.js'
import WishlistItem from './WishlistItem';
import WishlistItemEditor from './WishlistItemEditor.jsx'
import '../../../css/wishlist.css';

// Component for displaying the entire wishlist.
function Wishlist() {
  // Stores all wishlist items fetched from API.
  const [items, setItems] = useState([]);
  // Stores item currently being edited (null if none).
  const [itemToEdit, setItemToEdit] = useState(null);

  // Fetch wishlist items from server and update store.
  const loadItems = async () => {
    try {
      const data = await getWishlist();
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Load wishlist items when the component mounts.
  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="wishlist">
      <WishlistItemEditor item={itemToEdit}  onClose={() => setItemToEdit(null)} refresh={loadItems}></WishlistItemEditor>
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

export default Wishlist;