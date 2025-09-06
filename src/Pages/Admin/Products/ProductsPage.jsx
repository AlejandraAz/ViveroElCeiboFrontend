import { useEffect, useState } from "react";
import api from "../../../Services/Api.js";
import ProductModal from "./ProductModal.jsx";
import EditProductModal from "./EditProductModal.jsx";
import { toast, ToastContainer } from "react-toastify";
import { LockKeyhole, LockKeyholeOpen, Pencil, Plus } from "lucide-react";
import ConfirmModal from "../../../Components/ConfirmModal.jsx";
import "react-toastify/dist/ReactToastify.css";
import Pagination from '../../../Components/Pagination.jsx';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Estados de búsqueda/filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  //estados de paginación
  const [currentPage,setCurrentPage] = useState(1);
  const itemsPerPage = 5; //la cant que quiero ver

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get(`/admin/products?_=${Date.now()}`);
      const productsData = Array.isArray(res.data?.products)
        ? res.data.products
        : [];
      setProducts(productsData);
    } catch (err) {
      console.error(err);
      setProducts([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/admin/categories");
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProduct = async (formData) => {
    try {
      await api.post("/admin/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchProducts();
    } catch (err) {
      console.error("Error creando producto", err);
    }
  };

  const handleEditProduct = async (id, formData) => {
    try {
      await api.put(`/admin/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchProducts();
    } catch (err) {
      console.error("Error actualizando producto", err);
    }
  };

  const toggleFeatured = async (id, newStatus, isActive) => {
    if (!isActive) {
      toast.error("Primero debes activar el producto para destacarlo.");
      return;
    }

    try {
      await api.put(`/admin/products/${id}/featured`, { featured: newStatus });
      fetchProducts();
    } catch (err) {
      toast.error("Error al actualizar el estado destacado.");
      console.error(err);
    }
  };

  const confirmToggleStatus = async () => {
    if (!selectedProduct) return;

    try {
      if (selectedProduct.status) {
        await api.delete(`/admin/products/${selectedProduct.id}`);
        toast.success("Producto inactivado.");
      } else {
        await api.put(`/admin/products/${selectedProduct.id}/restore`);
        toast.success("Producto restaurado.");
      }
      fetchProducts();
    } catch (err) {
      console.error("Error al cambiar estado del producto", err);
      toast.error("No se pudo cambiar el estado del producto.");
    }
  };

  const openConfirmModal = (product) => {
    setSelectedProduct(product);
    setConfirmModalOpen(true);
  };

  // 📌 Filtrar productos
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory
      ? p.id_category === selectedCategory
      : true;

    const matchesStatus =
      statusFilter === ""
        ? true
        : statusFilter === "activo"
        ? p.status
        : !p.status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // productos paginados
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem,indexOfLastItem); 
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage); //para mostrar el total de paginas

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>

      {/* Buscador + Filtros + Agregar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          {/* Buscador */}
          <div className="w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar producto por nombre"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Filtro por categoría */}
          <select
            className="p-2 border border-gray-300 rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Filtro por estado */}
          <select
            className="p-2 border border-gray-300 rounded"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="activo">Activos</option>
            <option value="inactivo">Inactivos</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <Plus className="w-4 h-4" />
            Agregar Producto
          </button>
        </div>
      </div>

      {/* Modal crear */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddProduct}
        categories={categories}
      />

      {/* Modal editar */}
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditProduct}
        product={editingProduct}
        categories={categories}
      />

      {/* Tabla productos */}
      <table className="table-auto w-full border border-gray-300 shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Nombre</th>
            <th className="border border-gray-300 p-2">Precio</th>
            <th className="border border-gray-300 p-2">Stock</th>
            <th className="border border-gray-300 p-2">Destacado</th>
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <tr
                key={p.id}
                className={p.status ? "" : "bg-gray-100 text-gray-400"}
              >
                <td className="border border-gray-300 p-2">{p.name}</td>
                <td className="border border-gray-300 p-2">${p.price}</td>
                <td className="border border-gray-300 p-2">{p.stock}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() =>
                      toggleFeatured(p.id, !p.featured, p.status)
                    }
                  >
                    {p.featured ? (
                      <span
                        className="text-yellow-400 text-xl"
                        title="Destacado"
                      >
                        ★
                      </span>
                    ) : (
                      <span
                        className="text-gray-400 text-xl"
                        title="No destacado"
                      >
                        ☆
                      </span>
                    )}
                  </button>
                </td>
                <td className="border border-gray-300 p-2 flex gap-2">
                  <button
                    className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                    onClick={() => {
                      if (!p.status) {
                        toast.error("Debes activar el producto para editarlo.");
                        return;
                      }
                      setEditingProduct(p);
                      setIsEditModalOpen(true);
                    }}
                    title="Editar producto"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => openConfirmModal(p)}
                    className={`p-2 rounded cursor-pointer hover:opacity-80 ${
                      p.status ? "bg-red-600" : "bg-green-600"
                    } text-white`}
                    title={
                      p.status ? "Inactivar producto" : "Restaurar producto"
                    }
                  >
                    {p.status ? (
                      <LockKeyhole className="w-5 h-5" />
                    ) : (
                      <LockKeyholeOpen className="w-5 h-5" />
                    )}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="border border-gray-300 p-4 text-center text-gray-500"
              >
                🚫 No hay productos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Toasts */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Modal confirmar */}
      <ConfirmModal
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={confirmToggleStatus}
        title={
          selectedProduct?.status
            ? "Inactivar Producto"
            : "Restaurar Producto"
        }
        message={
          selectedProduct?.status
            ? `¿Estás seguro de que deseas inactivar el producto "${selectedProduct?.name}"?`
            : `¿Deseas restaurar el producto "${selectedProduct?.name}"?`
        }
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredProducts.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}

export default ProductsPage;
