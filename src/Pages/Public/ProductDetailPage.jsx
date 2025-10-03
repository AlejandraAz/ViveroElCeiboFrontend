
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../Services/Api.js";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "../../css/App.css";

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
        {/* Imagen principal + thumbnails debajo */}
        <div className="flex flex-col">
          <div className="overflow-hidden rounded">
            {/* Usamos Zoom directamente en la imagen */}
            <Zoom zoomMargin={50}>
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-[400px] object-contain rounded"
                style={{ objectFit: "contain" }} // Asegura que la imagen se ajuste sin distorsionarse
              />
            </Zoom>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-4 justify-center">
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
                  style={{ width: '64px', height: '64px' }} // Tamaño fijo para los thumbnails
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info del producto */}
        <div>
          {/* Título + chip categoría */}
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>
            {product.category && (
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium shadow"
                style={{ backgroundColor: "#B08968", color: "#4B2E2E" }}
              >
                {product.category.name}
              </span>
            )}
          </div>

          {/* Precio */}
          <p className="text-3xl font-extrabold text-green-600 mb-4">
            ${product.price}
          </p>

          {/* Descripción */}
          <div
            className="prose prose-green max-w-none mb-4 list-disc list-inside"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

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
