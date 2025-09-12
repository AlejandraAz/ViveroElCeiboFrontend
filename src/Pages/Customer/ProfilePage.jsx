import { useAuth } from '../../context/AuthContext.jsx';
import { Link } from 'react-router-dom';


const ProfilePage = () => {
    const { user } = useAuth();
    // console.log(user)
    return (
        <div className='mx-auto'>
            <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
            <p><strong>Email:</strong> {user?.email}</p>

            <button className="mt-4 px-4 py-2 bg-green-800 hover:bg-green-900 cursor-pointer text-white rounded" >
                <Link to="/404">Cambiar contraseña</Link>
            </button>
        </div>
    );
};

export default ProfilePage;
