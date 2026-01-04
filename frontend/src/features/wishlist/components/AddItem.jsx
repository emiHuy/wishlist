import { useState, useRef } from "react";
import { createWishlistItem } from "../../../api/wishlist";
import '../../../css/add-item.css';

export default function AddItem({ refresh }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");

  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    await createWishlistItem( { title, price, description, url })
    refresh(); 
    
    if (inputRef.current) {
      inputRef.current.blur();
    }
    setTitle("");
    setPrice("");
    setDescription("");
    setURL("");
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