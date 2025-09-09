import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "../assets/Logos/elceibologo2-removebg-preview.png"
import {
    Home,
    Users,
    Boxes,
    Package,
    ClipboardList,
    LogOut,
    ChevronRight,
    ChevronLeft,
} from 'lucide-react';

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const links = [
        { to: '/admin/dashboard', label: 'Dashboard', icon: <Home size={20} /> },
        { to: '/admin/users', label: 'Usuarios', icon: <Users size={20} /> },
        { to: '/admin/categories', label: 'Categorías', icon: <Boxes size={20} /> },
        { to: '/admin/products', label: 'Productos', icon: <Package size={20} /> },
        { to: '/admin/orders', label: 'Pedidos', icon: <ClipboardList size={20} /> },
    ];

    const handleLogout = () => {
        // Aquí tu lógica para cerrar sesión
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <aside className={`bg-green-900 text-white transition-all duration-300 ease-in-out ${collapsed ? 'w-16' : 'w-64'} flex flex-col`}>
                <div className="flex items-center justify-between p-5 border-b border-green-700">
                    {!collapsed && <h1 className="text-lg font-bold">panel de admin</h1>}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="text-white"
                        title={collapsed ? 'Expandir' : 'Colapsar'}
                    >
                        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                <nav className="flex-1 flex flex-col gap-1 mt-4 px-2">
                    {links.map(({ to, label, icon }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`flex items-center gap-3 p-2 rounded-md transition-colors duration-200 ${location.pathname === to ? 'bg-green-700' : 'hover:bg-green-800'
                                }`}
                        >
                            {icon}
                            {!collapsed && <span>{label}</span>}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* 🧭 Navbar superior */}
                <header className="bg-green-900 shadow p-4 flex items-center justify-between border-b border-gray-200">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="flex items-center gap-2">
                            <img src={logo} alt="El Ceibo" className="h-10" />
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-white font-bold text-sm">Admin</span>
                        <button
                            onClick={handleLogout}

                            className="bg-yellow-300 text-green-800 px-3 py-1 rounded hover:bg-yellow-400 font-bold flex items-center cursor-pointer gap-2"
                        >
                            <LogOut size={16} />
                            Cerrar sesión
                        </button>
                    </div>
                </header>

                {/* Contenido de la página */}
                <main className="flex-1 p-6 bg-green-50 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
