// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import api from "../../Services/Api.js";
// import {
//   ShieldCheck,
//   RotateCcw,
//   CreditCard,
//   HandCoins,
//   Banknote,
// } from "lucide-react";




// const ProductDetailPage = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [mainImage, setMainImage] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProduct();
//   }, [id]);

//   const fetchProduct = async () => {
//     try {
//       const res = await api.get(`/products/${id}`);
//       const prod = res.data.product;
//       setProduct(prod);
//       const mainImg =
//         prod.images?.find((img) => img.is_main)?.url ||
//         prod.images?.[0]?.url ||
//         "/placeholder.jpg";
//       setMainImage(mainImg);
//     } catch (err) {
//       console.error("Error al obtener producto:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleQuantityChange = (type) => {
//     setQuantity((prev) => {
//       if (type === "decrement" && prev > 1) return prev - 1;
//       if (type === "increment" && prev < product.stock) return prev + 1;
//       return prev;
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center mt-20">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <p className="text-red-500 text-center mt-10 text-lg">
//         Producto no encontrado
//       </p>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto my-10 px-4">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Imágenes */}
//         <div className="bg-white p-4 shadow rounded">
//           <div className="w-full h-[400px] sm:h-[500px] overflow-hidden">
//             <img
//   src={mainImage}
//   alt={product.name}
//   className="w-full h-[400px] object-contain rounded"
// />

//           </div>

//           <div className="flex flex-wrap gap-2 mt-4">
//             {product.images?.map((img, i) => (
//               <div
//                 key={i}
//                 className={`w-20 h-20 overflow-hidden rounded border ${
//                   mainImage === img.url
//                     ? "border-green-600"
//                     : "border-gray-300"
//                 } cursor-pointer`}
//                 onClick={() => setMainImage(img.url)}
//               >
//                 <img
//                   src={img.url}
//                   alt={`thumb-${i}`}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Info del producto */}
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold mb-2">{product.name}</h1>
//           <p className="text-3xl font-extrabold text-green-600 mb-4">
//             ${product.price}
//           </p>
//           <p className="text-gray-700 mb-4 text-sm sm:text-base">
//             {product.description}
//           </p>
//           <p className="text-sm text-gray-500 mb-1">
//             Categoría: {product.category?.name || "Sin categoría"}
//           </p>
//           <p className="text-sm text-gray-500 mb-4">
//             Stock disponible: {product.stock}
//           </p>

//           {/* Desktop */}
//           <div className="hidden md:flex items-center gap-4 mb-6">
//             <div className="flex items-center border rounded">
//               <button
//                 onClick={() => handleQuantityChange("decrement")}
//                 className="px-3 py-1 text-lg hover:bg-gray-100"
//               >
//                 -
//               </button>
//               <input
//                 type="number"
//                 readOnly
//                 value={quantity}
//                 className="w-12 text-center border-x border-gray-300 focus:outline-none"
//               />
//               <button
//                 onClick={() => handleQuantityChange("increment")}
//                 className="px-3 py-1 text-lg hover:bg-gray-100"
//               >
//                 +
//               </button>
//             </div>

//             <button
//               className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded transition"
//               onClick={() => console.log(`Agregar ${quantity} al carrito`)}
//             >
//               Agregar al carrito
//             </button>
//           </div>

//           {/* Mobile */}
//           <div className="md:hidden mb-4">
//             <div className="flex items-center gap-2 mb-4">
//               <label htmlFor="quantity" className="text-sm">
//                 Cantidad:
//               </label>
//               <div className="flex items-center border rounded">
//                 <button
//                   onClick={() => handleQuantityChange("decrement")}
//                   className="px-3 py-1 text-lg hover:bg-gray-100"
//                 >
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   readOnly
//                   value={quantity}
//                   className="w-12 text-center border-x border-gray-300 focus:outline-none"
//                 />
//                 <button
//                   onClick={() => handleQuantityChange("increment")}
//                   className="px-3 py-1 text-lg hover:bg-gray-100"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             <button
//               className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition"
//               onClick={() => console.log(`Agregar ${quantity} al carrito`)}
//             >
//               Agregar al carrito
//             </button>
//           </div>

//           {/* Compra protegida y devoluciones */}
//           <div className="mt-6 space-y-4 text-sm text-gray-700">
//             <div className="flex items-start gap-3">
//               <ShieldCheck className="text-green-600 mt-1" size={20} />
//               <div>
//                 <p className="font-semibold">Compra protegida</p>
//                 <p className="text-gray-500 text-xs sm:text-sm">
//                   Tus datos cuidados durante toda la compra.
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3">
//               <RotateCcw className="text-green-600 mt-1" size={20} />
//               <div>
//                 <p className="font-semibold">Cambios y devoluciones</p>
//                 <p className="text-gray-500 text-xs sm:text-sm">
//                   No se aceptan cambios y devoluciones.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Métodos de pago */}
//           <div className="mt-8">
//             <h2 className="text-sm font-semibold mb-3 text-gray-800">
//               Métodos de pago
//             </h2>
//             <div className="flex flex-col sm:flex-row gap-4 text-gray-600 text-sm">
//               <div className="flex items-center gap-2">
//                 <HandCoins size={26} className="text-green-600" />
//                 <span>Contrareembolso</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <CreditCard size={26} className="text-green-600" />
//                 <span>A convenir</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Banknote size={26} className="text-green-600" />
//                 <span>Depósito o transferencia</span>
//               </div>
//             </div>
//           </div>

//           {/* Tarjetas aceptadas */}
//           <div className="mt-6">
//             <h3 className="text-sm font-semibold mb-2 text-gray-800">
//               Tarjetas aceptadas
//             </h3>
//             <div className="flex gap-4 items-center">
//               <img
//                 src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
//                 alt="Visa"
//                 className="h-8 object-contain"
//               />
//               <img
//                 src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
//                 alt="MasterCard"
//                 className="h-8 object-contain"
//               />
//               <img
//                 src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg"
//                 alt="Amex"
//                 className="h-8 object-contain"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailPage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../Services/Api.js";
import {
  ShieldCheck,
  RotateCcw,
  CreditCard,
  HandCoins,
  Banknote,
} from "lucide-react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      const prod = res.data.product;
      setProduct(prod);
      const mainImg =
        prod.images?.find((img) => img.is_main)?.url ||
        prod.images?.[0]?.url ||
        "/placeholder.jpg";
      setMainImage(mainImg);
    } catch (err) {
      console.error("Error al obtener producto:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === "decrement" && prev > 1) return prev - 1;
      if (type === "increment" && prev < product.stock) return prev + 1;
      return prev;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <p className="text-red-500 text-center mt-10 text-lg">
        Producto no encontrado
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Imágenes con thumbnails a la izquierda */}
        <div className="flex gap-4">
          {/* Thumbnails verticales */}
          <div className="flex flex-col gap-2">
            {product.images?.map((img, i) => (
              <div
                key={i}
                className={`w-16 h-16 overflow-hidden rounded border cursor-pointer ${
                  mainImage === img.url ? "border-green-600" : "border-gray-300"
                }`}
                onClick={() => setMainImage(img.url)}
              >
                <img
                  src={img.url}
                  alt={`thumb-${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Imagen principal */}
          <div className="flex-1 overflow-hidden rounded">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-[400px] object-contain rounded"
            />
          </div>
        </div>

        {/* Info del producto */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-3xl font-extrabold text-green-600 mb-4">
            ${product.price}
          </p>
          <p className="text-gray-700 mb-4 text-sm sm:text-base">
            {product.description}
          </p>
          <p className="text-sm text-gray-500 mb-1">
            Categoría: {product.category?.name || "Sin categoría"}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Stock disponible: {product.stock}
          </p>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded">
              <button
                onClick={() => handleQuantityChange("decrement")}
                className="px-3 py-1 text-lg hover:bg-gray-100"
              >
                -
              </button>
              <input
                type="number"
                readOnly
                value={quantity}
                className="w-12 text-center border-x border-gray-300 focus:outline-none"
              />
              <button
                onClick={() => handleQuantityChange("increment")}
                className="px-3 py-1 text-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <button
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded transition"
              onClick={() => console.log(`Agregar ${quantity} al carrito`)}
            >
              Agregar al carrito
            </button>
          </div>

          {/* Mobile */}
          <div className="md:hidden mb-4">
            <div className="flex items-center gap-2 mb-4">
              <label htmlFor="quantity" className="text-sm">
                Cantidad:
              </label>
              <div className="flex items-center border rounded">
                <button
                  onClick={() => handleQuantityChange("decrement")}
                  className="px-3 py-1 text-lg hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  readOnly
                  value={quantity}
                  className="w-12 text-center border-x border-gray-300 focus:outline-none"
                />
                <button
                  onClick={() => handleQuantityChange("increment")}
                  className="px-3 py-1 text-lg hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition"
              onClick={() => console.log(`Agregar ${quantity} al carrito`)}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;


