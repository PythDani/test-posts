import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center  p-4">
        <p className="text-red-500 text-lg">No hay usuario autenticado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4">
      <Navbar />
      <div className="rounded-3xl shadow-lg p-8 w-full max-w-lg mt-6">
        <div className="flex flex-col items-center">
          <FaUserCircle className="text-[#488B75]" size={100} />
          <h2 className="mt-4 text-3xl font-bold text-[#36607A]">
            {user.name} {user.lastname}
          </h2>
          <p className="text-gray-600 mb-4">@{user.username}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <span className="block font-semibold text-gray-700">Nombre</span>
            <span className="block text-gray-800">{user.name}</span>
          </div>
          <div>
            <span className="block font-semibold text-gray-700">Apellido</span>
            <span className="block text-gray-800">{user.lastname}</span>
          </div>
          <div className="col-span-2">
            <span className="block font-semibold text-gray-700">Nacimiento</span>
            <span className="block text-gray-800">
              {new Date(user.birthdate).toLocaleDateString()}
            </span>
          </div>
        </div>
       
      </div>
    </div>
  );
}

