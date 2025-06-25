import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FcApproval } from "react-icons/fc";
import { IoLogOutOutline } from "react-icons/io5";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
  className={`fixed top-0 left-0 w-full px-4 py-3 flex items-center justify-between z-50 transition-all duration-300 ${
    scrolled ? 'bg-[#36607A] shadow-md' : 'bg-transparent'
  }`}
>
  <h1
    className={`text-xl font-bold cursor-pointer transition ${
      scrolled ? 'text-white' : 'text-black'
    }`}
    onClick={() => navigate('/posts')}
  >
    <FcApproval className={`inline-block mr-2`} color='#488B75' size={30} /> PRUEBA
  </h1>

  <div className="flex items-center gap-4">
    {user && (
      <>
        <div
          className={`cursor-pointer w-9 h-9 rounded-full flex items-center justify-center font-bold transition ${
            scrolled
              ? 'bg-[#488B75] text-white hover:bg-[#3c745f]'
              : 'bg-white text-black hover:bg-gray-200 border border-gray-300'
          }`}
          onClick={() => navigate('/profile')}
          title="Ver perfil"
        >
          {user.name[0]}
        </div>

        <button
          className={`text-sm px-3 py-1 rounded transition flex items-center gap-1 ${
            scrolled
              ? 'hover:bg-red-600 text-white'
              : 'bg-transparent hover:bg-red-100 text-black'
          }`}
          onClick={handleLogout}
        >
        Cerrar sesión  <IoLogOutOutline size={18} /> 
        </button>
      </>
    )}
  </div>
</nav>
  );
}
