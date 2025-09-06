
// import { useEffect, useState } from "react";
// import { X, Upload } from "lucide-react";
// import ConfirmModal from "../../../Components/ConfirmModal.jsx"; // asegurate de importar tu modal

// const EditProductModal = ({ isOpen, onClose, onSubmit, product, categories }) => {
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     stock: 0,
//     featured: false,
//     id_category: "",
//     newImages: [], // nuevas imágenes a subir
//     removeImages: [] // ids de ProductImage a eliminar
//   });

//   const [imageLimitModal, setImageLimitModal] = useState(false);

//   useEffect(() => {
//     if (isOpen && product) {
//       setForm({
//         name: product.name || "",
//         description: product.description || "",
//         price: product.price || "",
//         stock: product.stock || 0,
//         featured: product.featured || false,
//         id_category: product.id_category || "",
//         newImages: [],
//         removeImages: []
//       });
//     }
//   }, [isOpen, product]);

//   if (!isOpen) return null;

//   const handleChange = (e) => {
//     const { name, value, files, type, checked } = e.target;
//     if (name === "newImages") {
//       setForm({ ...form, newImages: Array.from(files) });
//     } else if (type === "checkbox") {
//       setForm({ ...form, [name]: checked });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleRemoveImage = (imgId) => {
//     setForm(prev => ({
//       ...prev,
//       removeImages: [...prev.removeImages, imgId]
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const existingImages = Array.isArray(product.images) ? product.images.length : 0;
// const totalImages = form.newImages.length + (existingImages - form.removeImages.length);

  

//     if (totalImages > 4) {
//       setImageLimitModal(true);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", form.name);
//     formData.append("description", form.description);
//     formData.append("price", form.price);
//     formData.append("stock", form.stock);
//     formData.append("id_category", form.id_category);
//     formData.append("featured", form.featured);

//     form.newImages.forEach(file => formData.append("newImages", file));
//     formData.append("removeImages", JSON.stringify(form.removeImages));

//     onSubmit(product.id, formData);
//     onClose();
//   };

//   return (
//     <>
//       <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-40 z-50">
//         <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
//           <button
//             className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
//             onClick={onClose}
//           >
//             <X size={20} />
//           </button>

//           <h2 className="text-xl font-semibold text-center mb-6">
//             Editar Producto
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               placeholder="Nombre del producto"
//               className="w-full p-2 border rounded"
//               required
//             />

//             <textarea
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               placeholder="Descripción"
//               className="w-full p-2 border rounded"
//               rows="3"
//               required
//             />

//             <div className="grid grid-cols-3 gap-2">
//               <input
//                 type="number"
//                 name="price"
//                 value={form.price}
//                 onChange={handleChange}
//                 placeholder="Precio"
//                 step="0.01"
//                 className="p-2 border rounded"
//                 required
//               />
//               <input
//                 type="number"
//                 name="stock"
//                 value={form.stock}
//                 onChange={handleChange}
//                 placeholder="Stock"
//                 className="p-2 border rounded"
//                 required
//               />
          
//               <select
//                 name="id_category"
//                 value={form.id_category}
//                 onChange={handleChange}
//                 className="p-2 border rounded"
//                 required
//               >
//                 <option value="">Categoría</option>
//                 {categories.map((cat) => (
//                   <option key={cat.id} value={cat.id}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="mb-4 flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 name="featured"
//                 checked={form.featured}
//                 onChange={handleChange}
//               />
//               <label className="text-sm font-semibold">¿Destacar?</label>
//             </div>

//             {/* Preview de imágenes actuales */}
//             <div className="flex gap-2 mb-4 flex-wrap">
//               {Array.isArray(product.images) &&
//   product.images
//     .filter(img => !form.removeImages.includes(img.id))
//     .map(img => (
//       <div key={img.id} className="relative">
//         <img src={img.url} alt="img" className="w-20 h-20 object-cover rounded" />
//         <button
//           type="button"
//           className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//           onClick={() => handleRemoveImage(img.id)}
//         >
//           X
//         </button>
//       </div>
// ))}
//             </div>

//             {/* Input para nuevas imágenes */}
//             <label className="flex items-center gap-2 p-2 border rounded cursor-pointer bg-white hover:bg-gray-50">
//               <Upload size={18} className="text-gray-500" />
//               <span className="text-gray-600">
//                 {form.newImages.length > 0
//                   ? `${form.newImages.length} imagen(es) seleccionadas`
//                   : "Agregar imágenes"}
//               </span>
//               <input
//                 type="file"
//                 name="newImages"
//                 accept="image/*"
//                 multiple
//                 onChange={handleChange}
//                 className="hidden"
//               />
//             </label>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700"
//             >
//               Guardar Cambios
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Modal de aviso límite de imágenes */}
//       <ConfirmModal
//         open={imageLimitModal}
//         onClose={() => setImageLimitModal(false)}
//         onConfirm={() => setImageLimitModal(false)}
//         title="Límite de imágenes"
//         message="No puedes subir más de 4 imágenes por producto."
//       />
//     </>
//   );
// };

// export default EditProductModal;

import { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";
import ConfirmModal from "../../../Components/ConfirmModal.jsx";

const EditProductModal = ({ isOpen, onClose, onSubmit, product, categories }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: 0,
    featured: false,
    id_category: "",
    newImages: [],
    removeImages: []
  });

  const [imageLimitModal, setImageLimitModal] = useState(false);

  useEffect(() => {
    if (isOpen && product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock || 0,
        featured: product.featured || false,
        id_category: product.id_category || "",
        newImages: [],
        removeImages: []
      });
    }
  }, [isOpen, product]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === "newImages") {
      setForm({ ...form, newImages: Array.from(files) });
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRemoveImage = (imgId) => {
    setForm((prev) => ({
      ...prev,
      removeImages: [...prev.removeImages, imgId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingImages = Array.isArray(product.images) ? product.images.length : 0;
    const totalImages = form.newImages.length + (existingImages - form.removeImages.length);

    if (totalImages > 4) {
      setImageLimitModal(true);
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("id_category", form.id_category);
    formData.append("featured", form.featured);

    form.newImages.forEach((file) => formData.append("newImages", file));
    formData.append("removeImages", JSON.stringify(form.removeImages));

    onSubmit(product.id, formData);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-40 z-50">
        <div className="bg-[#e9cbb0] rounded-lg shadow-lg w-full max-w-md p-6 relative">
          {/* Botón cerrar */}
          <button
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            <X size={20} />
          </button>

          <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
            Editar Producto
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <label className="block">
              <span className="text-gray-700 font-medium">Nombre</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-[#F0EFEB]"
                style={{ borderColor: "#B08968" }}
                required
              />
            </label>

            {/* Descripción */}
            <label className="block">
              <span className="text-gray-700 font-medium">Descripción</span>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-[#F0EFEB]"
                style={{ borderColor: "#B08968" }}
                rows="3"
                required
              />
            </label>

            {/* Precio, Stock, Categoría */}
            <div className="grid grid-cols-3 gap-2">
              <label className="block">
                <span className="text-gray-700 font-medium">Precio</span>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full p-2 border rounded bg-[#F0EFEB]"
                  style={{ borderColor: "#B08968" }}
                  required
                />
              </label>
              <label className="block">
                <span className="text-gray-700 font-medium">Stock</span>
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-[#F0EFEB]"
                  style={{ borderColor: "#B08968" }}
                  required
                />
              </label>
              <label className="block">
                <span className="text-gray-700 font-medium">Categoría</span>
                <select
                  name="id_category"
                  value={form.id_category}
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-[#F0EFEB] focus:border-[#B08968] focus:ring-2 focus:ring-[#B08968] focus:outline-none"
                  style={{ borderColor: "#B08968" }}
                  required
                >
                  <option value="">Selecciona</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Checkbox destacar */}
            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-gray-700 font-medium">Destacar</span>
            </label>

            {/* Preview de imágenes actuales */}
            <div>
              <span className="text-gray-700 font-medium">Imágenes actuales</span>
              <div className="flex gap-2 mt-2 flex-wrap">
                {Array.isArray(product.images) &&
                  product.images
                    .filter((img) => !form.removeImages.includes(img.id))
                    .map((img) => (
                      <div key={img.id} className="relative">
                        <img
                          src={img.url}
                          alt="img"
                          className="w-20 h-20 object-cover rounded"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                          onClick={() => handleRemoveImage(img.id)}
                        >
                          X
                        </button>
                      </div>
                    ))}
              </div>
            </div>

            {/* Input nuevas imágenes */}
            <label className="flex items-center gap-2 p-2 border rounded cursor-pointer bg-[#F0EFEB] hover:bg-gray-50">
              <Upload size={18} className="text-gray-500" />
              <span className="text-gray-600">
                {form.newImages.length > 0
                  ? `${form.newImages.length} archivo(s) seleccionados`
                  : "Agregar imágenes (máx. 4)"}
              </span>
              <input
                type="file"
                name="newImages"
                accept="image/*"
                multiple
                onChange={handleChange}
                className="hidden"
              />
            </label>

            {/* Botón guardar */}
            <button
              type="submit"
              className="w-full bg-[#6A994E] text-white font-bold py-2 rounded-full hover:bg-green-800"
            >
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>

      {/* Modal límite de imágenes */}
      <ConfirmModal
        open={imageLimitModal}
        onClose={() => setImageLimitModal(false)}
        onConfirm={() => setImageLimitModal(false)}
        title="Límite de imágenes"
        message="No puedes subir más de 4 imágenes por producto."
      />
    </>
  );
};

export default EditProductModal;
