import { Routes, Route, Navigate } from 'react-router-dom';
import WishlistPage from "../features/wishlist/pages/WishlistPage";
import SignupPage from '../features/auth/pages/SignupPage';
import LoginPage from '../features/auth/pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/wishlist" element={<WishlistPage/>}/>
      <Route path="*" element={<Navigate to="/signup"/>}/>
    </Routes>
  )
}

export default App
