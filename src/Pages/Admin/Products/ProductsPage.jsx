import { useEffect, useState } from "react";
import api from "../../../Services/Api.js";
import ProductModal from "./ProductModal.jsx";
import EditProductModal from "./EditProductModal.jsx";
import ImagesModal from "../Products/ProductImage.jsx";
import { toast, ToastContainer } from "react-toastify";
import { LockKeyhole, LockKeyholeOpen, Pencil, Plus, Image } from "lucide-react";
import ConfirmModal from "../../../Components/ConfirmModal.jsx";
import SearchFilter from "../Categories/SearchFilter.jsx";
import Pagination from "../../../Components/Pagination.jsx";
import "react-toastify/dist/ReactToastify.css";
import ProductStockChart from "./ProductStockChart.jsx";
import ProductCountChart from "./ProductCountChart.jsx";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [currentProductId, setCurrentProductId] = useState(null); //para refernciarme a la hora de eliminar las imgs


  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [imagesModalOpen, setImagesModalOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);

  // Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => { fetchCategories(); }, []);

  useEffect(() => { setCurrentPage(1); }, [searchTerm, selectedCategory, statusFilter]);

  useEffect(() => { fetchProducts(); }, [currentPage, searchTerm, selectedCategory, statusFilter]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/admin/products", {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm || undefined,
          status: statusFilter || undefined,
          category: selectedCategory || undefined
        }
      });
      setProducts(res.data.products || []);
      setTotalPages(res.data.totalPages || 1);
      setTotalItems(res.data.totalItems || 0);
    } catch (err) {
      console.error(err);
      setProducts([]);
      toast.error("Error al cargar productos");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/admin/categories");
      setCategories(res.data.categories || []);
    } catch (err) { console.error(err); }
  };

  const handleAddProduct = async (formData) => {
    try {
      await api.post("/admin/products", formData, { headers: { "Content-Type": "multipart/form-data" } });
      fetchProducts();
      setIsModalOpen(false);
      toast.success("Producto creado");
    } catch (err) { console.error(err); toast.error("Error creando producto"); }
  };

  const handleEditProduct = async (id, formData) => {
    try {
      await api.put(`/admin/products/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      fetchProducts();
      setIsEditModalOpen(false);
      toast.success("Producto actualizado");
    } catch (err) { console.error(err); toast.error("Error actualizando producto"); }
  };

  const toggleFeatured = async (id, newStatus, isActive) => {
    if (!isActive) { toast.error("Primero debes activar el producto para destacarlo."); return; }
    try { await api.put(`/admin/products/${id}/featured`, { featured: newStatus }); fetchProducts(); }
    catch (err) { toast.error("Error al actualizar el estado destacado."); console.error(err); }
  };

  const confirmToggleStatus = async () => {
    if (!selectedProduct) return;
    try {
      if (selectedProduct.status) await api.delete(`/admin/products/${selectedProduct.id}`);
      else await api.put(`/admin/products/${selectedProduct.id}/restore`);
      toast.success(selectedProduct.status ? "Producto inactivado" : "Producto restaurado");
      fetchProducts();
    } catch (err) { console.error(err); toast.error("No se pudo cambiar el estado del producto."); }
  };

  const openConfirmModal = (product) => { setSelectedProduct(product); setConfirmModalOpen(true); };
  const openImagesModal = (product) => { setCurrentImages(product.images || []); setImagesModalOpen(true);setCurrentProductId(product.id); };

  const deleteImage = async (imageId) => {
    try {
      await api.delete(`/admin/product-image/${imageId}`);
      toast.success("Imagen eliminada");
      setCurrentImages(currentImages.filter(img => img.id !== imageId));
      fetchProducts();
    } catch (err) { console.error(err); toast.error("No se pudo eliminar la imagen"); }
  };

  const deleteAllImages = async () => {
    try {
      const ids = currentImages.map(img => img.id);
      await Promise.all(ids.map(id => api.delete(`/admin/product-image/${id}`)));
      toast.success("Todas las imágenes eliminadas");
      setCurrentImages([]);
      fetchProducts();
    } catch (err) { console.error(err); toast.error("No se pudieron eliminar todas las imágenes"); }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Ocupa 6 columnas en pantallas grandes (lg), toda la fila en sm/md */}
        <div className="lg:col-span-6">
          <ProductStockChart height={300} />
        </div>

        <div className="lg:col-span-6">
          <ProductCountChart height={300} />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <SearchFilter
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        />
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">
          <Plus className="w-4 h-4" /> Agregar Producto
        </button>
      </div>

      <table className="table-auto w-full border border-gray-300 shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Precio</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Destacado</th>
            <th className="border p-2">Imágenes</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? products.map(p => (
            <tr key={p.id} className={p.status ? "" : "bg-gray-100 text-gray-400"}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">${p.price}</td>
              <td className="border p-2">{p.stock}</td>
              <td className="border p-2 text-center">
                <button onClick={() => toggleFeatured(p.id, !p.featured, p.status)} className="cursor-pointer">
                  {p.featured ? <span className="text-yellow-400 text-xl">★</span> : <span className="text-gray-400 text-xl">☆</span>}
                </button>
              </td>
              <td className="border p-2 text-center">
                <button onClick={() => openImagesModal(p)} className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
                  <Image className="w-4 h-4" /> Ver imágenes
                </button>
              </td>
              <td className="border p-2 flex gap-2">
                <button onClick={() => { if(!p.status){toast.error("Debes activar el producto para editarlo."); return;} setEditingProduct(p); setIsEditModalOpen(true); }} className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer" title="Editar">
                  <Pencil className="w-5 h-5" />
                </button>
                <button onClick={() => openConfirmModal(p)} className={`p-2 rounded cursor-pointer text-white ${p.status ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`} title={p.status ? "Inactivar" : "Restaurar"}>
                  {p.status ? <LockKeyhole className="w-5 h-5" /> : <LockKeyholeOpen className="w-5 h-5" />}
                </button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="6" className="border p-4 text-center text-gray-500">🚫 No hay productos disponibles</td></tr>
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />

      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddProduct} categories={categories} />
      <EditProductModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSubmit={handleEditProduct} product={editingProduct} categories={categories} />
      <ImagesModal isOpen={imagesModalOpen} onClose={() => setImagesModalOpen(false)} images={currentImages} deleteImage={deleteImage} deleteAllImages={() => deleteAllImages(currentProductId)} />
      <ConfirmModal open={confirmModalOpen} onClose={() => setConfirmModalOpen(false)} onConfirm={confirmToggleStatus} title={selectedProduct?.status ? "Inactivar Producto" : "Restaurar Producto"} message={selectedProduct?.status ? `¿Estás seguro de que deseas inactivar el producto "${selectedProduct?.name}"?` : `¿Deseas restaurar el producto "${selectedProduct?.name}"?`} />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default ProductsPage;
