import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white p-4">
                <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
                <nav className="flex flex-col gap-3">
                    <Link to="/admin" className="hover:underline">Dashboard</Link>
                    <Link to="/admin/users" className="hover:underline">Usuarios</Link>
                    <Link to="/admin/categories" className="hover:underline">Categorias</Link>
                    <Link to="/admin/products" className="hover:underline">Productos</Link>
                    <Link to="/admin/orders" className="hover:underline">Pedidos</Link>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
