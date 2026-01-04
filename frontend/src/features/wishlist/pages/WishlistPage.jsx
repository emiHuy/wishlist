import { useState } from 'react';
import AddItem from '../components/AddItem';
import Wishlist from '../components/Wishlist';
import '../../../css/wishlist-page.css'

// Wishlist page containing user's wishlist.
function WishlistPage() {
  // State used to trigger refresh of Wishlist component.
  const [refreshFlag, setRefreshFlag] = useState(false);
  // Function used to force refresh by toggling refreshFlag for re-rendering of Wishlist.
  const refresh = () => setRefreshFlag(!refreshFlag);
  
  return (
    <div className='wishlist-page'>
      <h1>My Wishlist</h1>
      <div className='content'>
        <AddItem refresh={refresh}/>
        <Wishlist key={refreshFlag}/>
      </div>
    </div>
  )
}

export default WishlistPage;
