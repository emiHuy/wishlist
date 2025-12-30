import { useState } from 'react';
import AddItem from './features/wishlist/AddItem';
import Wishlist from './features/wishlist/Wishlist';
import './css/app.css'

function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const refresh = () => setRefreshFlag(!refreshFlag);
  
  return (
    <div className='app'>
      <h1>My Wishlist</h1>
      <div className='content'>
        <AddItem refresh={refresh}/>
        <Wishlist key={refreshFlag}/>
      </div>
    </div>
  )
}

export default App
