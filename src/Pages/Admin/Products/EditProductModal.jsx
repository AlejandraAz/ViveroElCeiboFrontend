// import { useEffect, useState } from "react";
// import { X, Upload } from "lucide-react";
// import ConfirmModal from "../../../Components/ConfirmModal.jsx";

// const EditProductModal = ({ isOpen, onClose, onSubmit, product, categories }) => {
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     stock: 0,
//     featured: false,
//     id_category: "",
//     images: [],
//     removeImages: []
//   });

//   const [mainImageId, setMainImageId] = useState(null);

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
//         images: [],
//         removeImages: []
//       });

//       //Inicializamos la imagen principal actual
//       const currentMainImage = product.images?.find(img => img.is_main);
//       setMainImageId(currentMainImage?.id || null);
//     }
//   }, [isOpen, product]);

//   if (!isOpen) return null;

//   const handleChange = (e) => {
//     const { name, value, files, type, checked } = e.target;
//     if (name === "images") {
//       setForm({ ...form, images: Array.from(files) });
//     } else if (type === "checkbox") {
//       setForm({ ...form, [name]: checked });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleRemoveImage = (imgId) => {
//     setForm((prev) => ({
//       ...prev,
//       removeImages: [...prev.removeImages, imgId]
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const existingImages = Array.isArray(product.images) ? product.images.length : 0;
//     const totalImages = form.images.length + (existingImages - form.removeImages.length);


//     if (totalImages > 5) {
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

//     form.images.forEach((file) => formData.append("images", file));
//     formData.append("removeImages", JSON.stringify(form.removeImages));

//     if (mainImageId) {
//     formData.append("mainImageId", mainImageId);
//     }

//     onSubmit(product.id, formData);
//     onClose();
//   };

//   return (
//     <>
//       <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-60 z-50">
//         <div className="bg-[#e9cbb0] rounded-lg shadow-lg w-full max-w-md p-6 relative">
//           {/* Botón cerrar */}
//           <button
//             className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 cursor-pointer"
//             onClick={onClose}
//           >
//             <X size={20} />
//           </button>

//           <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
//             Editar Producto
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Nombre */}
//             <label className="block">
//               <span className="text-gray-700 font-medium">Nombre</span>
//               <input
//                 type="text"
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded bg-[#F0EFEB]"
//                 style={{ borderColor: "#B08968" }}
//                 required
//               />
//             </label>

//             {/* Descripción */}
//             <label className="block">
//               <span className="text-gray-700 font-medium">Descripción</span>
//               <textarea
//                 name="description"
//                 value={form.description}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded bg-[#F0EFEB]"
//                 style={{ borderColor: "#B08968" }}
//                 rows="3"
//                 required
//               />
//             </label>

//             {/* Precio, Stock, Categoría */}
//             <div className="grid grid-cols-3 gap-2">
//               <label className="block">
//                 <span className="text-gray-700 font-medium">Precio</span>
//                 <input
//                   type="number"
//                   name="price"
//                   value={form.price}
//                   onChange={handleChange}
//                   step="0.01"
//                   className="w-full p-2 border rounded bg-[#F0EFEB]"
//                   style={{ borderColor: "#B08968" }}
//                   required
//                 />
//               </label>
//               <label className="block">
//                 <span className="text-gray-700 font-medium">Stock</span>
//                 <input
//                   type="number"
//                   name="stock"
//                   value={form.stock}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded bg-[#F0EFEB]"
//                   style={{ borderColor: "#B08968" }}
//                   required
//                 />
//               </label>
//               <label className="block">
//                 <span className="text-gray-700 font-medium">Categoría</span>
//                 <select
//                   name="id_category"
//                   value={form.id_category}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded bg-[#F0EFEB] focus:border-[#B08968] focus:ring-2 focus:ring-[#B08968] focus:outline-none"
//                   style={{ borderColor: "#B08968" }}
//                   required
//                 >
//                   <option value="">Selecciona</option>
//                   {categories.map((cat) => (
//                     <option key={cat.id} value={cat.id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>
//               </label>
//             </div>

//             {/* Checkbox destacar */}
//             <label className="flex items-center gap-2 mt-2">
//               <input
//                 type="checkbox"
//                 name="featured"
//                 checked={form.featured}
//                 onChange={handleChange}
//                 className="w-4 h-4"
//               />
//               <span className="text-gray-700 font-medium">Destacar</span>
//             </label>

//             {/* Preview de imágenes actuales */}
//             <div>
//               <span className="text-gray-700 font-medium">Imágenes actuales</span>
//               <div className="flex gap-2 mt-2 flex-wrap">
//                 {Array.isArray(product.images) &&
//                   product.images
//                     .filter((img) => !form.removeImages.includes(img.id))
//                     .map((img) => (
//                       <div key={img.id} className="relative">
//                         <img
//                           src={img.url}
//                           alt="img"
//                           className={`w-20 h-20 object-cover rounded ${mainImageId === img.id ? 'ring-4 ring-green-600' : ''}`}
//                         />

//                         {/* Botón eliminar */}
//                         <button
//                           type="button"
//                           className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//                           onClick={() => handleRemoveImage(img.id)}
//                         >
//                           X
//                         </button>

//                         {/* Selector de imagen principal */}
//                         <button
//                           type="button"
//                           className="absolute bottom-0 left-0 text-xs bg-white px-1 py-0.5 rounded border text-gray-700"
//                           onClick={() => setMainImageId(img.id)}
//                         >
//                           {mainImageId === img.id ? "Principal ✅" : "Marcar principal"}
//                         </button>
//                       </div>
//                     ))
//                 }
//               </div>
//             </div>

//             {/* Input nuevas imágenes */}
//             <label className="flex items-center gap-2 p-2 border rounded cursor-pointer bg-[#F0EFEB] hover:bg-gray-50">
//               <Upload size={18} className="text-gray-500" />
//               <span className="text-gray-600">
//                 {form.images.length > 0
//                   ? `${form.images.length} archivo(s) seleccionados`
//                   : "Agregar imágenes (máx. 5)"}
//               </span>
//               <input
//                 type="file"
//                 name="images"
//                 accept="image/*"
//                 multiple
//                 onChange={handleChange}
//                 className="hidden"
//               />
//             </label>

//             {/* Botón guardar */}
//             <button
//               type="submit"
//               className="w-full bg-[#6A994E] text-white font-bold py-2 rounded-full hover:bg-green-800 cursor-pointer"
//             >
//               Guardar Cambios
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Modal límite de imágenes */}
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

// descomentar porque funciona bien
// const EditProductModal = ({ isOpen, onClose, onSubmit, product, categories }) => {
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     stock: 0,
//     featured: false,
//     id_category: "",
//     images: [],        // nuevas imágenes { file, preview }
//     removeImages: [],  // ids de imágenes a eliminar
//   });
//   const [imageLimitModal, setImageLimitModal] = useState(false);
//   const [selectedMainImageId, setSelectedMainImageId] = useState(null); // Imagen principal

//   // Inicializar formulario al abrir modal
//   useEffect(() => {
//     if (isOpen && product) {
//       setForm({
//         name: product.name || "",
//         description: product.description || "",
//         price: product.price || "",
//         stock: product.stock || 0,
//         featured: product.featured || false,
//         id_category: product.id_category || "",
//         images: [],
//         removeImages: [],
//       });

//       // Marcar la imagen principal actual
//       const mainImg = product.images?.find(img => img.is_main);
//       setSelectedMainImageId(mainImg?.id || null);
//     }
//   }, [isOpen, product]);

//   if (!isOpen) return null;

//   // Manejo de campos
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm(prev => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Seleccionar nuevas imágenes
//   const handleImageSelect = (e) => {
//     const files = Array.from(e.target.files);
//     const existing = product.images.filter(img => !form.removeImages.includes(img.id)).length;
//     const total = form.images.length + existing + files.length;

//     if (total > 5) {
//       setImageLimitModal(true);
//       return;
//     }

//     const newImages = files.map(file => ({ file, preview: URL.createObjectURL(file) }));
//     setForm(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
//   };

//   // Eliminar imagen nueva
//   const handleRemoveNewImage = (index) => {
//     setForm(prev => {
//       const updated = [...prev.images];
//       URL.revokeObjectURL(updated[index].preview);
//       updated.splice(index, 1);
//       return { ...prev, images: updated };
//     });
//   };

//   // Eliminar imagen existente
//   const handleRemoveImage = (imgId) => {
//     setForm(prev => ({ ...prev, removeImages: [...prev.removeImages, imgId] }));

//     // Si la imagen eliminada era la principal, resetear principal
//     if (selectedMainImageId === imgId) setSelectedMainImageId(null);
//   };

//   // Seleccionar imagen principal
//   const handleSelectMainImage = (imgId) => {
//     setSelectedMainImageId(imgId);
//   };

//   // Drop para arrastrar imágenes
//   const handleDrop = (e) => {
//     e.preventDefault();
//     const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
//     const existing = product.images.filter(img => !form.removeImages.includes(img.id)).length;
//     const total = form.images.length + existing + files.length;

//     if (total > 5) {
//       setImageLimitModal(true);
//       return;
//     }

//     const dropped = files.map(file => ({ file, preview: URL.createObjectURL(file) }));
//     setForm(prev => ({ ...prev, images: [...prev.images, ...dropped] }));
//   };

//   // Submit del formulario
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", form.name);
//     formData.append("description", form.description);
//     formData.append("price", form.price);
//     formData.append("stock", form.stock);
//     formData.append("id_category", form.id_category);
//     formData.append("featured", form.featured);
//     formData.append("removeImages", JSON.stringify(form.removeImages));

//     form.images.forEach(img => formData.append("images", img.file));
//     if (selectedMainImageId) formData.append("mainImageId", selectedMainImageId);

//     onSubmit(product.id, formData);
//     onClose();
//   };

//   return (
//     <>
//       <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-60 z-50">
//         <div className="bg-[#e9cbb0] rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col relative">
//           {/* Header */}
//           <div className="p-4 border-b border-gray-300 flex justify-between items-center">
//             <h2 className="text-xl font-semibold text-gray-700">Editar Producto</h2>
//             <button onClick={onClose}><X size={20} /></button>
//           </div>

//           {/* Body */}
//           <form onSubmit={handleSubmit} className="p-4 overflow-y-auto flex-1 space-y-4">
//             {/* Nombre */}
//             <label className="block">
//               <span className="text-gray-700 font-medium">Nombre</span>
//               <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded bg-[#F0EFEB]" required />
//             </label>

//             {/* Descripción */}
//             <label className="block">
//               <span className="text-gray-700 font-medium">Descripción</span>
//               <textarea name="description" value={form.description} onChange={handleChange} rows="3" className="w-full p-2 border rounded bg-[#F0EFEB]" required />
//             </label>

//             {/* Precio, Stock, Categoría */}
//             <div className="grid grid-cols-3 gap-2">
//               <label className="block">
//                 <span className="text-gray-700 font-medium">Precio</span>
//                 <input type="number" name="price" value={form.price} onChange={handleChange} step="0.01" className="w-full p-2 border rounded bg-[#F0EFEB]" required />
//               </label>
//               <label className="block">
//                 <span className="text-gray-700 font-medium">Stock</span>
//                 <input type="number" name="stock" value={form.stock} onChange={handleChange} className="w-full p-2 border rounded bg-[#F0EFEB]" required />
//               </label>
//               <label className="block">
//                 <span className="text-gray-700 font-medium">Categoría</span>
//                 <select name="id_category" value={form.id_category} onChange={handleChange} className="w-full p-2 border rounded bg-[#F0EFEB]" required>
//                   <option value="">Selecciona</option>
//                   {categories.map(cat => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
//                 </select>
//               </label>
//             </div>

//             {/* Destacado */}
//             <label className="flex items-center gap-2">
//               <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
//               <span className="text-gray-700 font-medium">Destacado</span>
//             </label>

//             {/* Imágenes existentes */}
//             <div>
//               <span className="text-gray-700 font-medium">Imágenes actuales</span>
//               <div className="flex gap-2 mt-2 flex-wrap">
//                 {product.images
//                   ?.filter(img => !form.removeImages.includes(img.id))
//                   .map(img => (
//                     <div key={img.id} className="relative">
//                       <img src={img.url} alt="img" className={`w-20 h-20 object-cover rounded border ${selectedMainImageId === img.id ? "border-yellow-400 border-4" : ""}`} 
//                         onClick={() => handleSelectMainImage(img.id)}
//                         title={selectedMainImageId === img.id ? "Imagen principal" : "Hacer principal"}
//                       />
//                       <button type="button" className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1" onClick={() => handleRemoveImage(img.id)}>X</button>
//                     </div>
//                   ))}
//               </div>
//             </div>

//             {/* Nuevas imágenes */}
//             {form.images.length > 0 && (
//               <div>
//                 <span className="text-gray-700 font-medium">Nuevas imágenes</span>
//                 <div className="flex gap-2 mt-2 flex-wrap">
//                   {form.images.map((img, index) => (
//                     <div key={index} className="relative">
//                       <img src={img.preview} alt="preview" className={`w-20 h-20 object-cover rounded ${selectedMainImageId === img.id ? "border-yellow-400 border-4" : ""}`} 
//                         onClick={() => handleSelectMainImage(img.id)}
//                         title={selectedMainImageId === img.id ? "Imagen principal" : "Hacer principal"}
//                       />
//                       <button type="button" className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1" onClick={() => handleRemoveNewImage(index)}>X</button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Input para agregar nuevas imágenes */}
//             <label onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} className="flex items-center gap-2 p-2 border rounded cursor-pointer bg-[#F0EFEB] hover:bg-gray-50 mt-2">
//               <Upload size={18} className="text-gray-500" />
//               <span className="text-gray-600">{form.images.length > 0 ? `${form.images.length} archivo(s) seleccionados` : "Agregar imágenes (máx. 5)"}</span>
//               <input type="file" accept="image/*" multiple onChange={handleImageSelect} className="hidden" />
//             </label>
//           </form>

//           {/* Footer */}
//           <div className="p-4 border-t border-gray-300 flex justify-end gap-2">
//             <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
//             <button type="submit" onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Guardar</button>
//           </div>
//         </div>
//       </div>

//       {/* Modal límite imágenes */}
//       {imageLimitModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//           <div className="bg-white p-4 rounded shadow">
//             <p>No puedes subir más de 5 imágenes por producto.</p>
//             <button onClick={() => setImageLimitModal(false)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Cerrar</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EditProductModal;

// ****
// import { useEffect, useState } from "react";
// import { X, Upload } from "lucide-react";

// funciona perfecto pero no recibe datos html ni tiene scroll el modal
// const EditProductModal = ({ isOpen, onClose, onSubmit, product = {}, categories = [] }) => {
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     stock: 0,
//     featured: false,
//     id_category: "",
//     images: [],        // nuevas imágenes { file, preview }
//     removeImages: [],  // ids de imágenes a eliminar
//   });
//   const [imageLimitModal, setImageLimitModal] = useState(false);
//   const [selectedMainImageId, setSelectedMainImageId] = useState(null); // puede ser uuid o "new-0"/"new-1"

//   // Inicializar formulario cuando se abre
//   useEffect(() => {
//     if (isOpen && product) {
//       setForm({
//         name: product.name || "",
//         description: product.description || "",
//         price: product.price || "",
//         stock: product.stock ?? 0,
//         featured: product.featured || false,
//         id_category: product.id_category || "",
//         images: [],
//         removeImages: [],
//       });

//       // marcar la principal existente (si existe)
//       const main = product.images?.find(img => img.is_main || img.es_principal || img.isMain); // por compatibilidad
//       setSelectedMainImageId(main?.id ?? null);
//     }
//   }, [isOpen, product]);

//   if (!isOpen) return null;

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleImageSelect = (e) => {
//     const files = Array.from(e.target.files);
//     const existing = (product.images || []).filter(img => !form.removeImages.includes(img.id)).length;
//     const total = form.images.length + existing + files.length;
//     if (total > 5) { setImageLimitModal(true); return; }

//     const newImages = files.map(file => ({ file, preview: URL.createObjectURL(file) }));
//     setForm(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
//   };

//   const handleRemoveNewImage = (index) => {
//     setForm(prev => {
//       const copy = [...prev.images];
//       URL.revokeObjectURL(copy[index].preview);
//       copy.splice(index, 1);
//       return { ...prev, images: copy };
//     });

//     // Si la nueva imagen borrada era la marcada como principal, resetear
//     if (selectedMainImageId === `new-${index}`) setSelectedMainImageId(null);
//   };

//   const handleRemoveImage = (imgId) => {
//     setForm(prev => ({ ...prev, removeImages: [...prev.removeImages, imgId] }));
//     // si se elimina la principal, resetear
//     if (selectedMainImageId === imgId) setSelectedMainImageId(null);
//   };

//   const handleSelectMainImage = (id) => {
//     // id puede ser uuid (existing) o 'new-0' (nueva)
//     setSelectedMainImageId(id);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
//     const existing = (product.images || []).filter(img => !form.removeImages.includes(img.id)).length;
//     const total = form.images.length + existing + files.length;
//     if (total > 5) { setImageLimitModal(true); return; }
//     const dropped = files.map(file => ({ file, preview: URL.createObjectURL(file) }));
//     setForm(prev => ({ ...prev, images: [...prev.images, ...dropped] }));
//   };

//   const handleSubmit = (e) => {
//   e.preventDefault();

//   if (!form.name) { alert("El nombre es obligatorio"); return; }

//   const formData = new FormData();
//   formData.append("name", form.name);
//   formData.append("description", form.description);
//   formData.append("price", form.price);
//   formData.append("stock", form.stock);
//   formData.append("id_category", form.id_category);
//   formData.append("featured", form.featured);
//   formData.append("removeImages", JSON.stringify(form.removeImages));

//   // Adjuntar nuevas imágenes
//   form.images.forEach(img => formData.append("images", img.file));

//   // Imagen principal
//   if (selectedMainImageId != null) {
//     // solo enviamos si es una imagen existente
//     if (typeof selectedMainImageId !== "string" || !selectedMainImageId.startsWith("new-")) {
//        // principal es nueva
//       const index = parseInt(selectedMainImageId.replace("new-", ""), 10);
//       formData.append("mainNewIndex", index);
//     } else {
//       // principal es existente
//       formData.append("mainImageId", selectedMainImageId);
//     }
  
//   }

//   onSubmit(product.id, formData);
//   onClose();
// };


//   return (
//     <>
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
//         {/* WIDER modal: max-w-4xl para evitar scroll vertical */}
//         <div className="bg-[#e9cbb0] rounded-lg shadow-lg w-full max-w-4xl flex flex-col overflow-hidden">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 border-b">
//             <h2 className="text-xl font-semibold text-gray-800">Editar Producto</h2>
//             <button onClick={onClose} aria-label="Cerrar"><X size={20} /></button>
//           </div>

//           {/* Grid principal: formulario (2/3) | galería (1/3) */}
//           <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4" style={{ minHeight: 420 }}>
//             {/* LEFT: formulario (ocupa 2 columnas en lg) */}
//             <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 <label className="block">
//                   <span className="text-gray-700 font-medium">Nombre</span>
//                   <input type="text" name="name" value={form.name} onChange={handleChange}
//                          className="w-full p-2 border rounded bg-[#F0EFEB]" required />
//                 </label>

//                 <label className="block">
//                   <span className="text-gray-700 font-medium">Precio</span>
//                   <input type="number" name="price" value={form.price} onChange={handleChange} step="0.01"
//                          className="w-full p-2 border rounded bg-[#F0EFEB]" required />
//                 </label>
//               </div>

//               <label className="block">
//                 <span className="text-gray-700 font-medium">Descripción</span>
//                 <textarea name="description" value={form.description} onChange={handleChange} rows="3"
//                           className="w-full p-2 border rounded bg-[#F0EFEB]" required />
//               </label>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                 <label className="block">
//                   <span className="text-gray-700 font-medium">Stock</span>
//                   <input type="number" name="stock" value={form.stock} onChange={handleChange}
//                          className="w-full p-2 border rounded bg-[#F0EFEB]" required />
//                 </label>

//                 <label className="block">
//                   <span className="text-gray-700 font-medium">Categoría</span>
//                   <select name="id_category" value={form.id_category} onChange={handleChange}
//                           className="w-full p-2 border rounded bg-[#F0EFEB]" required>
//                     <option value="">Selecciona</option>
//                     {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
//                   </select>
//                 </label>

//                 <label className="flex items-center gap-2">
//                   <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
//                   <span className="text-gray-700 font-medium">Destacado</span>
//                 </label>
//               </div>

//               {/* Input arrastrar/subir */}
//               <label onDrop={handleDrop} onDragOver={(e)=>e.preventDefault()}
//                      className="flex items-center gap-2 p-2 border rounded cursor-pointer bg-[#F0EFEB] hover:bg-gray-50">
//                 <Upload size={18} className="text-gray-500" />
//                 <span className="text-gray-600">
//                   {form.images.length > 0 ? `${form.images.length} archivo(s) seleccionados` : "Agregar imágenes (máx. 5)"}
//                 </span>
//                 <input type="file" accept="image/*" multiple onChange={handleImageSelect} className="hidden" />
//               </label>

//               {/* Botones */}
//               <div className="flex justify-end gap-2 mt-4">
//                 <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
//                 <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Guardar</button>
//               </div>
//             </form>

//             {/* RIGHT: galería de imágenes */}
//             <div className="lg:col-span-1 bg-white rounded p-3 overflow-auto">
//               <h3 className="font-medium text-gray-700 mb-2">Imágenes (clic para marcar principal)</h3>

//               <div className="flex flex-col gap-3">
//                 {/* Imágenes existentes */}
//                 <div>
//                   <div className="text-sm text-gray-600 mb-1">Actual</div>
//                   <div className="flex flex-wrap gap-2">
//                     {(product.images || []).filter(img => !form.removeImages.includes(img.id)).map(img => (
//                       <div key={img.id} className="relative">
//                         <img
//                           src={img.url}
//                           alt="img"
//                           className={`w-24 h-24 object-cover rounded cursor-pointer border-2 ${selectedMainImageId === img.id ? "border-yellow-400" : "border-transparent"}`}
//                           onClick={() => handleSelectMainImage(img.id)}
//                           title={selectedMainImageId === img.id ? "Imagen principal" : "Marcar como principal"}
//                         />
//                         <button
//                           type="button"
//                           className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//                           onClick={() => handleRemoveImage(img.id)}
//                           aria-label="Eliminar imagen existente"
//                         >X</button>
//                       </div>
//                     ))}
//                     {((product.images || []).filter(img => !form.removeImages.includes(img.id)).length === 0) && (
//                       <div className="text-sm text-gray-500">No hay imágenes guardadas</div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Nuevas imágenes */}
//                 <div>
//                   <div className="text-sm text-gray-600 mb-1">Nuevas</div>
//                   <div className="flex flex-wrap gap-2">
//                     {form.images.map((img, i) => (
//                       <div key={i} className="relative">
//                         <img
//                           src={img.preview}
//                           alt="preview"
//                           className={`w-24 h-24 object-cover rounded cursor-pointer border-2 ${selectedMainImageId === `new-${i}` ? "border-yellow-400" : "border-transparent"}`}
//                           onClick={() => handleSelectMainImage(`new-${i}`)}
//                           title={selectedMainImageId === `new-${i}` ? "Imagen principal" : "Marcar como principal"}
//                         />
//                         <button
//                           type="button"
//                           className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//                           onClick={() => handleRemoveNewImage(i)}
//                           aria-label="Eliminar nueva imagen"
//                         >X</button>
//                       </div>
//                     ))}
//                     {form.images.length === 0 && <div className="text-sm text-gray-500">No hay imágenes nuevas</div>}
//                   </div>
//                 </div>

//                 <div className="text-xs text-gray-500">La imagen marcada se usará como portada en la card.</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal límite imágenes */}
//       {imageLimitModal && (
//         <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-40 p-4">
//           <div className="bg-white p-4 rounded shadow">
//             <p>No puedes subir más de 5 imágenes por producto.</p>
//             <div className="mt-2 text-right">
//               <button onClick={() => setImageLimitModal(false)} className="px-4 py-2 bg-blue-500 text-white rounded">Cerrar</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EditProductModal;

// Modal con editor de html y scroll

// import { useEffect, useState } from "react";
// import { X, Upload } from "lucide-react";
// import ConfirmModal from "../../../Components/ConfirmModal.jsx";
// import { EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";
// import BulletList from "@tiptap/extension-bullet-list";
// import OrderedList from "@tiptap/extension-ordered-list";
// import Heading from "@tiptap/extension-heading";

// const EditProductModal = ({ isOpen, onClose, onSubmit, product = {}, categories = [] }) => {
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     stock: 0,
//     featured: false,
//     id_category: "",
//     images: [],
//     removeImages: [],
//   });
//   const [imageLimitModal, setImageLimitModal] = useState(false);
//   const [selectedMainImageId, setSelectedMainImageId] = useState(null);

//   const editor = useEditor({
//     extensions: [StarterKit, Underline, BulletList, OrderedList, Heading.configure({ levels: [1,2,3] })],
//     content: form.description || "",
//     onUpdate({ editor }) {
//       setForm(prev => ({ ...prev, description: editor.getHTML() }));
//     },
//   });

//   useEffect(() => {
//     if (isOpen && product) {
//       setForm({
//         name: product.name || "",
//         description: product.description || "",
//         price: product.price || "",
//         stock: product.stock ?? 0,
//         featured: product.featured || false,
//         id_category: product.id_category || "",
//         images: [],
//         removeImages: [],
//       });

//       const main = product.images?.find(img => img.is_main || img.es_principal || img.isMain);
//       setSelectedMainImageId(main?.id ?? null);

//       if (editor) editor.commands.setContent(product.description || "");
//     }
//   }, [isOpen, product, editor]);

//   if (!isOpen) return null;

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleImageSelect = (e) => {
//     const files = Array.from(e.target.files);
//     const existing = (product.images || []).filter(img => !form.removeImages.includes(img.id)).length;
//     const total = form.images.length + existing + files.length;
//     if (total > 5) { setImageLimitModal(true); return; }

//     const newImages = files.map(file => ({ file, preview: URL.createObjectURL(file) }));
//     setForm(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
//   };

//   const handleRemoveNewImage = (index) => {
//     setForm(prev => {
//       const copy = [...prev.images];
//       URL.revokeObjectURL(copy[index].preview);
//       copy.splice(index, 1);
//       return { ...prev, images: copy };
//     });
//     if (selectedMainImageId === `new-${index}`) setSelectedMainImageId(null);
//   };

//   const handleRemoveImage = (imgId) => {
//     setForm(prev => ({ ...prev, removeImages: [...prev.removeImages, imgId] }));
//     if (selectedMainImageId === imgId) setSelectedMainImageId(null);
//   };

//   const handleSelectMainImage = (id) => setSelectedMainImageId(id);

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
//     const existing = (product.images || []).filter(img => !form.removeImages.includes(img.id)).length;
//     const total = form.images.length + existing + files.length;
//     if (total > 5) { setImageLimitModal(true); return; }
//     const dropped = files.map(file => ({ file, preview: URL.createObjectURL(file) }));
//     setForm(prev => ({ ...prev, images: [...prev.images, ...dropped] }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!form.name) { alert("El nombre es obligatorio"); return; }

//     const formData = new FormData();
//     formData.append("name", form.name);
//     formData.append("description", form.description);
//     formData.append("price", form.price);
//     formData.append("stock", form.stock);
//     formData.append("id_category", form.id_category);
//     formData.append("featured", form.featured);
//     formData.append("removeImages", JSON.stringify(form.removeImages));

//     form.images.forEach(img => formData.append("images", img.file));

//     if (selectedMainImageId != null) {
//       if (typeof selectedMainImageId === "string" && selectedMainImageId.startsWith("new-")) {
//         const index = parseInt(selectedMainImageId.replace("new-", ""), 10);
//         formData.append("mainNewIndex", index);
//       } else {
//         formData.append("mainImageId", selectedMainImageId);
//       }
//     }

//     onSubmit(product.id, formData);
//     onClose();
//   };

//   const MenuBar = ({ editor }) => {
//     if (!editor) return null;
//     return (
//       <div className="flex gap-1 mb-2 flex-wrap">
//         <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-gray-300' : ''}>B</button>
//         <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-gray-300' : ''}>I</button>
//         <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'bg-gray-300' : ''}>U</button>
//         <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'bg-gray-300' : ''}>• List</button>
//         <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'bg-gray-300' : ''}>1. List</button>
//         <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-300' : ''}>H1</button>
//         <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : ''}>H2</button>
//         <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'bg-gray-300' : ''}>H3</button>
//       </div>
//     );
//   };

//   return (
//     <>
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
//         <div className="bg-[#e9cbb0] rounded-lg shadow-lg w-full max-w-4xl flex flex-col overflow-hidden">
//           <div className="flex items-center justify-between p-4 border-b">
//             <h2 className="text-xl font-semibold text-gray-800">Editar Producto</h2>
//             <button onClick={onClose} aria-label="Cerrar"><X size={20} /></button>
//           </div>

//           <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4" style={{ minHeight: 420 }}>
//             {/* LEFT: Form */}
//             <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 <label className="block">
//                   <span className="text-gray-700 font-medium">Nombre</span>
//                   <input type="text" name="name" value={form.name} onChange={handleChange}
//                          className="w-full p-2 border rounded bg-[#F0EFEB]" required />
//                 </label>

//                 <label className="block">
//                   <span className="text-gray-700 font-medium">Precio</span>
//                   <input type="number" name="price" value={form.price} onChange={handleChange} step="0.01"
//                          className="w-full p-2 border rounded bg-[#F0EFEB]" required />
//                 </label>
//               </div>

//               <label className="block">
//                 <span className="text-gray-700 font-medium">Descripción</span>
//                 <div className="border rounded bg-[#F0EFEB] p-2 max-h-40 overflow-auto">
//                   <MenuBar editor={editor} />
//                   <EditorContent editor={editor} />
//                 </div>
//               </label>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                 <label className="block">
//                   <span className="text-gray-700 font-medium">Stock</span>
//                   <input type="number" name="stock" value={form.stock} onChange={handleChange}
//                          className="w-full p-2 border rounded bg-[#F0EFEB]" required />
//                 </label>

//                 <label className="block">
//                   <span className="text-gray-700 font-medium">Categoría</span>
//                   <select name="id_category" value={form.id_category} onChange={handleChange}
//                           className="w-full p-2 border rounded bg-[#F0EFEB]" required>
//                     <option value="">Selecciona</option>
//                     {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
//                   </select>
//                 </label>

//                 <label className="flex items-center gap-2">
//                   <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
//                   <span className="text-gray-700 font-medium">Destacado</span>
//                 </label>
//               </div>

//               {/* Input drag & drop */}
//               <label onDrop={handleDrop} onDragOver={(e)=>e.preventDefault()}
//                      className="flex items-center gap-2 p-2 border rounded cursor-pointer bg-[#F0EFEB] hover:bg-gray-50">
//                 <Upload size={18} className="text-gray-500" />
//                 <span className="text-gray-600">
//                   {form.images.length > 0 ? `${form.images.length} archivo(s) seleccionados` : "Agregar imágenes (máx. 5)"}
//                 </span>
//                 <input type="file" accept="image/*" multiple onChange={handleImageSelect} className="hidden" />
//               </label>

//               <div className="flex justify-end gap-2 mt-4">
//                 <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
//                 <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Guardar</button>
//               </div>
//             </form>

//             {/* RIGHT: Image gallery */}
//             <div className="lg:col-span-1 bg-white rounded p-3 overflow-auto">
//               <h3 className="font-medium text-gray-700 mb-2">Imágenes (clic para marcar principal)</h3>
//               <div className="flex flex-col gap-3">
//                 {/* Existing images */}
//                 <div>
//                   <div className="text-sm text-gray-600 mb-1">Actual</div>
//                   <div className="flex flex-wrap gap-2">
//                     {(product.images || []).filter(img => !form.removeImages.includes(img.id)).map(img => (
//                       <div key={img.id} className="relative">
//                         <img
//                           src={img.url}
//                           alt="img"
//                           className={`w-24 h-24 object-cover rounded cursor-pointer border-2 ${selectedMainImageId === img.id ? "border-yellow-400" : "border-transparent"}`}
//                           onClick={() => handleSelectMainImage(img.id)}
//                           title={selectedMainImageId === img.id ? "Imagen principal" : "Marcar como principal"}
//                         />
//                         <button type="button" className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//                                 onClick={() => handleRemoveImage(img.id)}>X</button>
//                       </div>
//                     ))}
//                     {((product.images || []).filter(img => !form.removeImages.includes(img.id)).length === 0) && (
//                       <div className="text-sm text-gray-500">No hay imágenes guardadas</div>
//                     )}
//                   </div>
//                 </div>

//                 {/* New images */}
//                 <div>
//                   <div className="text-sm text-gray-600 mb-1">Nuevas</div>
//                   <div className="flex flex-wrap gap-2">
//                     {form.images.map((img, i) => (
//                       <div key={i} className="relative">
//                         <img
//                           src={img.preview}
//                           alt="preview"
//                           className={`w-24 h-24 object-cover rounded cursor-pointer border-2 ${selectedMainImageId === `new-${i}` ? "border-yellow-400" : "border-transparent"}`}
//                           onClick={() => handleSelectMainImage(`new-${i}`)}
//                           title={selectedMainImageId === `new-${i}` ? "Imagen principal" : "Marcar como principal"}
//                         />
//                         <button type="button" className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//                                 onClick={() => handleRemoveNewImage(i)}>X</button>
//                       </div>
//                     ))}
//                     {form.images.length === 0 && <div className="text-sm text-gray-500">No hay imágenes nuevas</div>}
//                   </div>
//                 </div>

//                 <div className="text-xs text-gray-500">La imagen marcada se usará como portada en la card.</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {imageLimitModal && (
//         <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-40 p-4">
//           <div className="bg-white p-4 rounded shadow">
//             <p>No puedes subir más de 5 imágenes por producto.</p>
//             <div className="mt-2 text-right">
//               <button onClick={() => setImageLimitModal(false)} className="px-4 py-2 bg-blue-500 text-white rounded">Cerrar</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EditProductModal;

// *** si funciona con html pero si la de abajo anda se borra 
// import { useEffect, useState } from "react";
// import { X, Upload, Bold, Italic, Underline, List, ListOrdered } from "lucide-react";
// import ConfirmModal from "../../../Components/ConfirmModal.jsx"; 
// import { EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";

// const EditProductModal = ({ isOpen, onClose, onSubmit, product = {}, categories = [] }) => {
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     stock: 0,
//     featured: false,
//     id_category: "",
//     images: [],
//     removeImages: [],
//   });
//   const [imageLimitModal, setImageLimitModal] = useState(false);
//   const [selectedMainImageId, setSelectedMainImageId] = useState(null);

//   // Inicializar formulario cuando se abre
//   useEffect(() => {
//     if (isOpen && product) {
//       setForm({
//         name: product.name || "",
//         description: product.description || "",
//         price: product.price || "",
//         stock: product.stock ?? 0,
//         featured: product.featured || false,
//         id_category: product.id_category || "",
//         images: [],
//         removeImages: [],
//       });

//       const main = product.images?.find(img => img.is_main || img.es_principal || img.isMain);
//       setSelectedMainImageId(main?.id ?? null);
//     }
//   }, [isOpen, product]);

//   // Editor TipTap
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: form.description,
//     onUpdate: ({ editor }) => setForm(prev => ({ ...prev, description: editor.getHTML() })),
//   });

//   if (!isOpen) return null;

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleImageSelect = (e) => {
//     const files = Array.from(e.target.files);
//     const existing = (product.images || []).filter(img => !form.removeImages.includes(img.id)).length;
//     const total = form.images.length + existing + files.length;
//     if (total > 5) { setImageLimitModal(true); return; }

//     const newImages = files.map(file => ({ file, preview: URL.createObjectURL(file) }));
//     setForm(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
//   };

//   const handleRemoveNewImage = (index) => {
//     setForm(prev => {
//       const copy = [...prev.images];
//       URL.revokeObjectURL(copy[index].preview);
//       copy.splice(index, 1);
//       return { ...prev, images: copy };
//     });

//     if (selectedMainImageId === `new-${index}`) setSelectedMainImageId(null);
//   };

//   const handleRemoveImage = (imgId) => {
//     setForm(prev => ({ ...prev, removeImages: [...prev.removeImages, imgId] }));
//     if (selectedMainImageId === imgId) setSelectedMainImageId(null);
//   };

//   const handleSelectMainImage = (id) => setSelectedMainImageId(id);

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
//     const existing = (product.images || []).filter(img => !form.removeImages.includes(img.id)).length;
//     const total = form.images.length + existing + files.length;
//     if (total > 5) { setImageLimitModal(true); return; }
//     const dropped = files.map(file => ({ file, preview: URL.createObjectURL(file) }));
//     setForm(prev => ({ ...prev, images: [...prev.images, ...dropped] }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!form.name) { alert("El nombre es obligatorio"); return; }

//     const formData = new FormData();
//     formData.append("name", form.name);
//     formData.append("description", form.description);
//     formData.append("price", form.price);
//     formData.append("stock", form.stock);
//     formData.append("id_category", form.id_category);
//     formData.append("featured", form.featured);
//     formData.append("removeImages", JSON.stringify(form.removeImages));

//     form.images.forEach(img => formData.append("images", img.file));

//     if (selectedMainImageId != null) {
//       if (typeof selectedMainImageId === "string" && selectedMainImageId.startsWith("new-")) {
//         const index = parseInt(selectedMainImageId.replace("new-", ""), 10);
//         formData.append("mainNewIndex", index);
//       } else {
//         formData.append("mainImageId", selectedMainImageId);
//       }
//     }

//     onSubmit(product.id, formData);
//     onClose();
//   };

//   return (
//     <>
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
//         <div className="bg-[#e9cbb0] rounded-lg shadow-lg w-full max-w-4xl flex flex-col overflow-hidden max-h-[90vh]">
//           <div className="flex items-center justify-between p-4 border-b">
//             <h2 className="text-xl font-semibold text-gray-800">Editar Producto</h2>
//             <button onClick={onClose} aria-label="Cerrar"><X size={20} /></button>
//           </div>

//           <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 overflow-y-auto">
//             <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 <label className="block">
//                   <span className="text-gray-700 font-medium">Nombre</span>
//                   <input type="text" name="name" value={form.name} onChange={handleChange}
//                          className="w-full p-2 border rounded bg-[#F0EFEB]" required />
//                 </label>

//                 <label className="block">
//                   <span className="text-gray-700 font-medium">Precio</span>
//                   <input type="number" name="price" value={form.price} onChange={handleChange} step="0.01"
//                          className="w-full p-2 border rounded bg-[#F0EFEB]" required />
//                 </label>
//               </div>

//               {/* Editor TipTap para descripción */}
//               <label className="block">
//                 <span className="text-gray-700 font-medium">Descripción</span>
//                 <div className="flex gap-2 my-2">
//                   <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} title="Negrita"><Bold size={18} /></button>
//                   <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} title="Cursiva"><Italic size={18} /></button>
//                   <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} title="Subrayado"><Underline size={18} /></button>
//                   <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} title="Lista sin orden"><List size={18} /></button>
//                   <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Lista ordenada"><ListOrdered size={18} /></button>
//                 </div>
//                 <div className="w-full p-2 border rounded bg-[#F0EFEB] max-h-40 overflow-y-auto">
//                   <EditorContent editor={editor} />
//                 </div>
//               </label>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                 <label className="block">
//                   <span className="text-gray-700 font-medium">Stock</span>
//                   <input type="number" name="stock" value={form.stock} onChange={handleChange}
//                          className="w-full p-2 border rounded bg-[#F0EFEB]" required />
//                 </label>

//                 <label className="block">
//                   <span className="text-gray-700 font-medium">Categoría</span>
//                   <select name="id_category" value={form.id_category} onChange={handleChange}
//                           className="w-full p-2 border rounded bg-[#F0EFEB]" required>
//                     <option value="">Selecciona</option>
//                     {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
//                   </select>
//                 </label>

//                 <label className="flex items-center gap-2">
//                   <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
//                   <span className="text-gray-700 font-medium">Destacado</span>
//                 </label>
//               </div>

//               <label onDrop={handleDrop} onDragOver={(e)=>e.preventDefault()}
//                      className="flex items-center gap-2 p-2 border rounded cursor-pointer bg-[#F0EFEB] hover:bg-gray-50">
//                 <Upload size={18} className="text-gray-500" />
//                 <span className="text-gray-600">
//                   {form.images.length > 0 ? `${form.images.length} archivo(s) seleccionados` : "Agregar imágenes (máx. 5)"}
//                 </span>
//                 <input type="file" accept="image/*" multiple onChange={handleImageSelect} className="hidden" />
//               </label>

//               <div className="flex justify-end gap-2 mt-4">
//                 <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
//                 <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Guardar</button>
//               </div>
//             </form>

//             {/* Galería de imágenes */}
//             <div className="lg:col-span-1 bg-white rounded p-3 overflow-auto">
//               <h3 className="font-medium text-gray-700 mb-2">Imágenes (clic para marcar principal)</h3>
//               <div className="flex flex-col gap-3">
//                 <div>
//                   <div className="text-sm text-gray-600 mb-1">Actual</div>
//                   <div className="flex flex-wrap gap-2">
//                     {(product.images || []).filter(img => !form.removeImages.includes(img.id)).map(img => (
//                       <div key={img.id} className="relative">
//                         <img
//                           src={img.url}
//                           alt="img"
//                           className={`w-24 h-24 object-cover rounded cursor-pointer border-2 ${selectedMainImageId === img.id ? "border-yellow-400" : "border-transparent"}`}
//                           onClick={() => handleSelectMainImage(img.id)}
//                           title={selectedMainImageId === img.id ? "Imagen principal" : "Marcar como principal"}
//                         />
//                         <button
//                           type="button"
//                           className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//                           onClick={() => handleRemoveImage(img.id)}
//                           aria-label="Eliminar imagen existente"
//                         >X</button>
//                       </div>
//                     ))}
//                     {((product.images || []).filter(img => !form.removeImages.includes(img.id)).length === 0) && (
//                       <div className="text-sm text-gray-500">No hay imágenes guardadas</div>
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <div className="text-sm text-gray-600 mb-1">Nuevas</div>
//                   <div className="flex flex-wrap gap-2">
//                     {form.images.map((img, i) => (
//                       <div key={i} className="relative">
//                         <img
//                           src={img.preview}
//                           alt="preview"
//                           className={`w-24 h-24 object-cover rounded cursor-pointer border-2 ${selectedMainImageId === `new-${i}` ? "border-yellow-400" : "border-transparent"}`}
//                           onClick={() => handleSelectMainImage(`new-${i}`)}
//                           title={selectedMainImageId === `new-${i}` ? "Imagen principal" : "Marcar como principal"}
//                         />
//                         <button
//                           type="button"
//                           className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//                           onClick={() => handleRemoveNewImage(i)}
//                           aria-label="Eliminar nueva imagen"
//                         >X</button>
//                       </div>
//                     ))}
//                     {form.images.length === 0 && <div className="text-sm text-gray-500">No hay imágenes nuevas</div>}
//                   </div>
//                 </div>

//                 <div className="text-xs text-gray-500">La imagen marcada se usará como portada en la card.</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {imageLimitModal && (
//         <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-40 p-4">
//           <div className="bg-white p-4 rounded shadow">
//             <p>No puedes subir más de 5 imágenes por producto.</p>
//             <div className="mt-2 text-right">
//               <button onClick={() => setImageLimitModal(false)} className="px-4 py-2 bg-blue-500 text-white rounded">Cerrar</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EditProductModal;

import { useEffect, useState, useMemo } from "react";
import { X, Upload, Bold, Italic, Underline, List, ListOrdered } from "lucide-react";
import ConfirmModal from "../../../Components/ConfirmModal.jsx";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const EditProductModal = ({ isOpen, onClose, onSubmit, product = {}, categories = [] }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: 0,
    featured: false,
    id_category: "",
    images: [],        // nuevas imágenes { file, preview }
    removeImages: [],  // ids de imágenes a eliminar
  });
  const [imageLimitModal, setImageLimitModal] = useState(false);
  const [selectedMainImageId, setSelectedMainImageId] = useState(null); // puede ser uuid o "new-0"/"new-1"
  const [isDragging, setIsDragging] = useState(false);

  // Inicializar formulario cuando se abre
  useEffect(() => {
    if (isOpen && product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock ?? 0,
        featured: product.featured || false,
        id_category: product.id_category || "",
        images: [],
        removeImages: [],
      });

      // marcar la principal existente (si existe)
      const main = product.images?.find(img => img.is_main || img.es_principal || img.isMain);
      setSelectedMainImageId(main?.id ?? null);
    }
  }, [isOpen, product]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: form.description,
    onUpdate: ({ editor }) => setForm(prev => ({ ...prev, description: editor.getHTML() })),
  });

  const previewUrls = useMemo(
    () => form.images.map((f) => URL.createObjectURL(f.file || f)),
    [form.images]
  );

  useEffect(() => {
    return () => previewUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [previewUrls]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "images") return handleImageSelect({ target: { files } });
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const existing = (product.images || []).filter(img => !form.removeImages.includes(img.id)).length;
    const total = form.images.length + existing + files.length;
    if (total > 5) { setImageLimitModal(true); return; }

    const newImages = files.map(file => ({ file, preview: URL.createObjectURL(file) }));
    setForm(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
  };

  const handleRemoveNewImage = (index) => {
    setForm(prev => {
      const copy = [...prev.images];
      URL.revokeObjectURL(copy[index].preview);
      copy.splice(index, 1);
      return { ...prev, images: copy };
    });
    if (selectedMainImageId === `new-${index}`) setSelectedMainImageId(null);
  };

  const handleRemoveImage = (imgId) => {
    setForm(prev => ({ ...prev, removeImages: [...prev.removeImages, imgId] }));
    if (selectedMainImageId === imgId) setSelectedMainImageId(null);
  };

  const handleSelectMainImage = (id) => setSelectedMainImageId(id);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    handleImageSelect({ target: { files } });
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("id_category", form.id_category);
    formData.append("featured", form.featured);
    formData.append("removeImages", JSON.stringify(form.removeImages));
    form.images.forEach(img => formData.append("images", img.file));
    if (selectedMainImageId != null) {
      if (typeof selectedMainImageId === "string" && selectedMainImageId.startsWith("new-")) {
        formData.append("mainNewIndex", parseInt(selectedMainImageId.replace("new-", ""), 10));
      } else {
        formData.append("mainImageId", selectedMainImageId);
      }
    }
    onSubmit(product.id, formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
        <div className="bg-[#e9cbb0] rounded-lg shadow-lg w-full max-w-4xl flex flex-col overflow-hidden max-h-[90vh]">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Editar Producto</h2>
            <button onClick={onClose} aria-label="Cerrar"><X size={20} /></button>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 overflow-y-auto">
            {/* Formulario */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-gray-700 font-medium">Nombre</span>
                  <input type="text" name="name" value={form.name} onChange={handleChange}
                         className="w-full p-2 border rounded bg-[#F0EFEB]" required />
                </label>

                <label className="block">
                  <span className="text-gray-700 font-medium">Precio</span>
                  <input type="number" name="price" value={form.price} onChange={handleChange} step="0.01"
                         className="w-full p-2 border rounded bg-[#F0EFEB]" required />
                </label>
              </div>

              {/* Editor TipTap */}
              <label className="block">
                <span className="text-gray-700 font-medium">Descripción</span>
                <div className="flex gap-2 my-2">
                  <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}
                          className={`p-1 rounded ${editor?.isActive("bold") ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}`} title="Negrita">
                    <Bold size={18} />
                  </button>
                  <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}
                          className={`p-1 rounded ${editor?.isActive("italic") ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}`} title="Cursiva">
                    <Italic size={18} />
                  </button>
                  <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()}
                          className={`p-1 rounded ${editor?.isActive("underline") ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}`} title="Subrayado">
                    <Underline size={18} />
                  </button>
                  <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}
                          className={`p-1 rounded ${editor?.isActive("bulletList") ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}`} title="Lista sin orden">
                    <List size={18} />
                  </button>
                  <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}
                          className={`p-1 rounded ${editor?.isActive("orderedList") ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}`} title="Lista ordenada">
                    <ListOrdered size={18} />
                  </button>
                </div>
                <div className="w-full p-2 border rounded bg-[#F0EFEB] max-h-40 overflow-y-auto">
                  <EditorContent editor={editor} />
                </div>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <label className="block">
                  <span className="text-gray-700 font-medium">Stock</span>
                  <input type="number" name="stock" value={form.stock} onChange={handleChange} className="w-full p-2 border rounded bg-[#F0EFEB]" required />
                </label>

                <label className="block">
                  <span className="text-gray-700 font-medium">Categoría</span>
                  <select name="id_category" value={form.id_category} onChange={handleChange} className="w-full p-2 border rounded bg-[#F0EFEB]" required>
                    <option value="">Selecciona</option>
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </select>
                </label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
                  <span className="text-gray-700 font-medium">Destacado</span>
                </label>
              </div>

              {/* Drag & Drop */}
              <label
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`flex items-center gap-2 p-2 border rounded cursor-pointer bg-[#F0EFEB] hover:bg-gray-50 ${isDragging ? "border-green-600 bg-green-50" : ""}`}
              >
                <Upload size={18} className="text-gray-500" />
                <span className="text-gray-600">{form.images.length > 0 ? `${form.images.length} archivo(s) seleccionados` : "Agregar imágenes (máx. 5)"}</span>
                <input type="file" accept="image/*" multiple onChange={handleImageSelect} className="hidden" />
              </label>

              {/* Botones */}
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Guardar</button>
              </div>
            </form>

            {/* Galería de imágenes */}
            <div className="lg:col-span-1 bg-white rounded p-3 overflow-auto">
              <h3 className="font-medium text-gray-700 mb-2">Imágenes (clic para marcar principal)</h3>

              <div className="flex flex-col gap-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Actual</div>
                  <div className="flex flex-wrap gap-2">
                    {(product.images || []).filter(img => !form.removeImages.includes(img.id)).map(img => (
                      <div key={img.id} className="relative">
                        <img
                          src={img.url}
                          alt="img"
                          className={`w-24 h-24 object-cover rounded cursor-pointer border-2 ${selectedMainImageId === img.id ? "border-yellow-400" : "border-transparent"}`}
                          onClick={() => handleSelectMainImage(img.id)}
                        />
                        <button type="button" className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                onClick={() => handleRemoveImage(img.id)}>X</button>
                      </div>
                    ))}
                    {((product.images || []).filter(img => !form.removeImages.includes(img.id)).length === 0) && (
                      <div className="text-sm text-gray-500">No hay imágenes guardadas</div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Nuevas</div>
                  <div className="flex flex-wrap gap-2">
                    {form.images.map((img, i) => (
                      <div key={i} className="relative">
                        <img
                          src={img.preview}
                          alt="preview"
                          className={`w-24 h-24 object-cover rounded cursor-pointer border-2 ${selectedMainImageId === `new-${i}` ? "border-yellow-400" : "border-transparent"}`}
                          onClick={() => handleSelectMainImage(`new-${i}`)}
                        />
                        <button type="button" className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                onClick={() => handleRemoveNewImage(i)}>X</button>
                      </div>
                    ))}
                    {form.images.length === 0 && <div className="text-sm text-gray-500">No hay imágenes nuevas</div>}
                  </div>
                </div>

                <div className="text-xs text-gray-500">La imagen marcada se usará como portada en la card.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {imageLimitModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white p-4 rounded shadow">
            <p>No puedes subir más de 5 imágenes por producto.</p>
            <div className="mt-2 text-right">
              <button onClick={() => setImageLimitModal(false)} className="px-4 py-2 bg-blue-500 text-white rounded">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProductModal;
