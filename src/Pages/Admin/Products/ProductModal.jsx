
// import { useState, useEffect } from "react";
// import { X, Upload } from "lucide-react";

// const ProductModal = ({ isOpen, onClose, onSubmit, categories }) => {
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     stock: 0,
//     id_category: "",
//     image: null,
//   });

//   useEffect(() => {
//     if (isOpen) {
//       setForm({
//         name: "",
//         description: "",
//         price: "",
//         stock: 0,
//         id_category: "",
//         image: null,
//       });
//     }
//   }, [isOpen]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       setForm({ ...form, image: files[0] });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", form.name);
//     formData.append("description", form.description);
//     formData.append("price", form.price);
//     formData.append("stock", form.stock);
//     formData.append("id_category", form.id_category);
//     if (form.image) formData.append("image", form.image);

//     onSubmit(formData);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-40 z-50">
//       <div className="bg-[#e9cbb0] rounded-lg shadow-lg w-full max-w-md p-6 relative">
//         {/* Botón cerrar */}
//         <button
//           className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
//           onClick={onClose}
//         >
//           <X size={20} />
//         </button>

//         <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
//           Agregar nuevo producto
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Nombre */}
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Nombre del producto"
//             className="w-full p-2 border rounded"
//             required
//           />

//           {/* Descripción */}
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             placeholder="Descripción"
//             className="w-full p-2 border rounded"
//             rows="3"
//             required
//           />

//           {/* Fila Precio, Stock, Categoría */}
//           <div className="grid grid-cols-3 gap-2">
//             <input
//               type="number"
//               name="price"
//               value={form.price}
//               onChange={handleChange}
//               placeholder="Precio"
//               step="0.01"
//               className="p-2 border rounded"
//               required
//             />
//             <input
//               type="number"
//               name="stock"
//               value={form.stock}
//               onChange={handleChange}
//               placeholder="Stock"
//               className="p-2 border rounded"
//               required
//             />
//             <select
//               name="id_category"
//               value={form.id_category}
//               onChange={handleChange}
//               className="p-2 border rounded"
//               required
//             >
//               <option value="">Categoría</option>
//               {categories?.length > 0 ? (
//                 categories.map((cat) => (
//                   <option key={cat.id} value={cat.id}>
//                     {cat.name}
//                   </option>
//                 ))
//               ) : (
//                 <option disabled>Cargando...</option>
//               )}
//             </select>
//           </div>

//           {/* Imagen con icono */}
//           <label className="flex items-center gap-2 p-2 border rounded cursor-pointer bg-white hover:bg-gray-50">
//             <Upload size={18} className="text-gray-500" />
//             <span className="text-gray-600">
//               {form.image ? form.image.name : "Seleccionar imagen"}
//             </span>
//             <input
//               type="file"
//               name="image"
//               accept="image/*"
//               onChange={handleChange}
//               className="hidden"
//               required
//             />
//           </label>

//           {/* Botón enviar */}
//           <button
//             type="submit"
//             className="w-full bg-[#6A994E] text-white font-bold py-2 rounded-full  hover:bg-green-800"
//           >
//             AÑADIR
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductModal;

// **
import { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";

const ProductModal = ({ isOpen, onClose, onSubmit, categories }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: 0,
    id_category: "",
    images: [],
    featured: false, // <-- agregado
  });

  useEffect(() => {
    if (isOpen) {
      setForm({
        name: "",
        description: "",
        price: "",
        stock: 0,
        id_category: "",
        images: [],
        featured: false, // <-- reseteamos también aquí
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === "images") {
      setForm({ ...form, images: Array.from(files) });  // guardamos todas las imágenes
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("id_category", form.id_category);
    formData.append("featured", form.featured);
    
    form.images.forEach((img) => {
    formData.append("images", img); // este nombre debe coincidir con multer
  });

    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
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
          Agregar nuevo producto
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nombre del producto"
            className="w-full p-2 border rounded bg-[#F0EFEB]"
            style={{ borderColor: '#B08968' }}
            required
          />

          {/* Descripción */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descripción"
            className="w-full p-2 border rounded bg-[#F0EFEB]"
            style={{ borderColor: '#B08968' }}
            rows="3"
            required
          />

          {/* Fila Precio, Stock, Categoría */}
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Precio"
              step="0.01"
              className="p-2 border rounded bg-[#F0EFEB]"
              style={{ borderColor: '#B08968' }}
              required
            />
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="p-2 border rounded bg-[#F0EFEB]"
              style={{ borderColor: '#B08968' }}
              required
            />
            <select
              name="id_category"
              value={form.id_category}
              onChange={handleChange}
              className="p-2 border rounded bg-[#F0EFEB] focus:border-[#B08968] focus:ring-2 focus:ring-[#B08968]  focus:outline-none"
              style={{ borderColor: '#B08968' }}
              required
            >
              <option value="">Categoría</option>
              {categories?.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              ) : (
                <option disabled>Cargando...</option>
              )}
            </select>
          </div>

          {/* Imagen con icono */}
          {/* <label className="flex items-center gap-2 p-2 border rounded cursor-pointer bg-[#F0EFEB] hover:bg-gray-50">
            <Upload size={18} className="text-gray-500" />
            <span className="text-gray-600">
              {form.image ? form.image.name : "Seleccionar imagen"}
            </span>
            <input
              type="file"
              name="image"
              accept="image/*"
              style={{ borderColor: '#B08968' }}
              onChange={handleChange}
              className="hidden "
              
              required
            />
          </label> */}

<label className="flex items-center gap-2 p-2 border rounded cursor-pointer bg-[#F0EFEB] hover:bg-gray-50">
  <Upload size={18} className="text-gray-500" />
  <span className="text-gray-600">
    {form.images.length > 0
      ? `${form.images.length} archivo(s) seleccionados`
      : "Seleccionar imágenes (1 a 4)"}
  </span>
  <input
    type="file"
    name="images"
    accept="image/*"
    multiple
    onChange={handleChange}
    className="hidden"
    required
  />
</label>

          {/* Checkbox destacar debajo del input file */}
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

          {/* Botón enviar */}
          <button
            type="submit"
            className="w-full bg-[#6A994E] text-white font-bold py-2 rounded-full hover:bg-green-800"
          >
            AÑADIR
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
