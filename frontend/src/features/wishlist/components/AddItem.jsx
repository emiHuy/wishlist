import { useState, useRef } from 'react';
import { createWishlistItem } from '../../../api/wishlist';
import '../../../css/add-item.css';

// Component for adding a new item to a wishlist.
function AddItem({ refresh }) {
  // Local state for each input field.
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [url, setURL] = useState('');

  // REference to the form to control focus.
  const inputRef = useRef(null);

  // Handles form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prevent submission if title is empty.
    if (!title) return;

    // Send new item to backend.
    await createWishlistItem( { title, price, description, url })
    // Refresh wishlist.
    refresh(); 
    
    // Remove focus from form for UX.
    if (inputRef.current) {
      inputRef.current.blur();
    }
    // Reset form fields after submission.
    setTitle('');
    setPrice('');
    setDescription('');
    setURL('');
    setExpanded(false);
  };

  return (
    <form onSubmit={handleSubmit} ref={inputRef}>
      <div className="expandable-title">
        <input
          type="text"
          placeholder="+ Item"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="expandable-content">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="url-price">
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
          />`
        </div>
        <button type="submit">Add Item</button>
      </div>
    </form>
  );
}

export default AddItem;