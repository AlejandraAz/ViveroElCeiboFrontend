import SearchFilter from './SearchFilter'
import CategoryModal from './CategoryModal'
import CategoryTable from './CategoryTable'
import { toast, ToastContainer } from "react-toastify";
import Pagination from '../../../Components/Pagination'
import React, { useEffect, useState, } from 'react'
import api from '../../../Services/Api.js';
import ConfirmModal from '../../../Components/ConfirmModal.jsx';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const fetchCategories = async () => {
        try {
            const res = await api.get("/admin/categories", {
                params: {
                    status: statusFilter || undefined,
                    search: searchTerm || undefined,
                    page: currentPage,
                },
            });
            console.log(res.data)
            setCategories(res.data.categories || []);
            // Si tu backend devuelve totalPages:
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            console.error(err);
            toast.error("Error al cargar las categorías");
        }
    };

    const handleAddCategory = async (data) => {
        try {
            await api.post("/admin/categories", data);
            fetchCategories();
            setIsModalOpen(false);
            toast.success("Categoría creada");
        } catch (err) {
            console.error(err);
            toast.error("Error creando la categoría");
        }
    };

    const handleEditCategory = async (id, data) => {
        try {
            await api.put(`/admin/categories/${id}`, data);
            fetchCategories();
            setEditingCategory(null);
            setIsModalOpen(false);
            toast.success("Categoría actualizada");
        } catch (err) {
            console.error(err);
            toast.error("Error actualizando la categoría");
        }
    };

    const toggleCategoryStatus = async (id) => {
        try {
            await api.patch(`/admin/categories/${id}/toggle`);
            fetchCategories();
            toast.success("Estado de categoría actualizado");
        } catch (err) {
            console.error(err);
            toast.error("Error al actualizar estado");
        }
    };
    useEffect(()=>{
        fetchCategories()
    },[])
    return (
        <>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Gestión de Categorías</h1>

                <div className="flex justify-between items-center mb-4">
                    <SearchFilter
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                    />

                    <button
                        className="px-4 py-2 bg-green-600 text-white cursor-pointer rounded hover:bg-green-700"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Crear Categoría
                    </button>
                </div>

                <CategoryTable
                    categories={categories}
                    onEdit={(cat) => {
                        setEditingCategory(cat);
                        setIsModalOpen(true);
                    }}
                    onToggleStatus={toggleCategoryStatus}
                />

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    itemsPerPage={categories.length}
                    totalItems={categories.length} 
                />

                <CategoryModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingCategory(null);
                    }}
                    onSubmit={editingCategory ? handleEditCategory : handleAddCategory}
                    category={editingCategory}
                />

                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </>
    )
}
export default CategoriesPage;