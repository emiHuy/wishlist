import { useState } from 'react';
import AddItem from '../components/AddItem';
import Wishlist from '../components/Wishlist';
import '../../../css/wishlist-page.css'

function WishlistPage() {
  const [refreshFlag, setRefreshFlag] = useState(false);
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
