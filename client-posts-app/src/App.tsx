
import './App.css'
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import PostsPage from './pages/PostsPage';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/posts" element={<PostsPage />} />
      </Routes>
   
  );
}

export default App
