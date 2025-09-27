// import { createContext, useContext, useState, useEffect } from "react";
// import { getMyCart,createCart, addCartItem, updateCartItem, deleteCartItem } from "../Services/cartApi.js";
// import Swal from "sweetalert2";
// import { useAuth } from "./AuthContext.jsx";

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {

//     const { user } = useAuth();
//     const [cart, setCart] = useState({ items: [], total: 0, cartId: null });
//     const [loading, setLoading] = useState(true);

//     // Traer carrito activo al iniciar
//     useEffect(() => {
//         fetchCart();
//     }, []);

//     const fetchCart = async () => {
//         setLoading(true);
//         try {
//             const res = await getMyCart();
//             if (res.data.cartId) {
//                 setCart(res.data);
//             } else {
//                 setCart({ items: [], total: 0, cartId: null });
//             }
//         } catch (err) {
//             console.error("Error fetching cart:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const addItem = async ({ id_product, quantity = 1 }) => {
//         if (!user) {
//             Swal.fire({
//                 icon: 'info',
//                 title: 'Inicia sesión para comprar',
//                 text: 'Debes iniciar sesión para agregar productos al carrito.',
//                 confirmButtonText: 'Ir al login'
//             }).then((result) => {
//                 if (result.isConfirmed) {
//                     window.location.href = '/login'; 
//                 }
//             });
//             return; 
//         }
//       try {
//         // primero obtener carrito activo o crearlo
//             let cartId = cart.cartId;
//             if (!cartId) {
//                 const newCart = await createCart({ id_customer: user.id });
//                 cartId = newCart.data.cartId;
//             }

//             await addCartItem({ id_cart: cartId, id_product, quantity });
//             await fetchCart();

//             // opcional: mostrar toast de éxito
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Producto agregado',
//                 showConfirmButton: false,
//                 timer: 1200
//             });
//         } catch (err) {
//             console.error("Error adding item:", err);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'No se pudo agregar el producto',
//                 text: err.message
//             });
//         }
//     };

//     const updateItem = async (itemId, quantity) => {
//         const item = cart.items.find(i => i.id === itemId);
//         if (!item) return;
//         try {
//             await updateCartItem(itemId, { quantity});
//             await fetchCart();
//         } catch (err) {
//             console.error("Error updating item:", err);
//         }
//     };

//     const removeItem = async (itemId) => {
//         try {
//             await deleteCartItem(itemId);
//             await fetchCart();
//         } catch (err) {
//             console.error("Error removing item:", err);
//         }
//     };

//     return (
//         <CartContext.Provider value={{ cart, loading, addItem, updateItem, removeItem }}>
//             {children}
//         </CartContext.Provider>
//     );
// }

import { createContext, useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { useAuth } from "./AuthContext.jsx"; // ajusta la ruta si es necesario
import { getMyCart, createCart, addCartItem, updateCartItem, deleteCartItem } from "../Services/cartApi.js";
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const [cart, setCart] = useState({ items: [], total: 0, cartId: null });
    const [loading, setLoading] = useState(true);

    // console.log("🧪 En CartContext → user:", user, "loading:", loading);

    

useEffect(() => {
  console.log("🔍 CartContext useEffect disparado", {
    user,
    authLoading,
    role: user?.rol
  });

  if (!authLoading && user && user.rol === "cliente") {
    console.log("🛒 Llamando a fetchCart porque hay usuario cliente");
    fetchCart();
  } else {
    console.log("❗ Condición NO cumplida, no llama fetchCart");
  }
}, [user, authLoading]);


    const fetchCart = async () => {
  setLoading(true);
  try {
    const res = await getMyCart();
    console.log("📦 fetchCart respuesta:", res.data);

    // AJUSTE AQUÍ: usás res.data.cartId directamente
    if (res.data.cartId) {
      setCart({
        items: res.data.items || [],
        total: res.data.total || 0,
        cartId: res.data.cartId
      });
      console.log("🧾 Carrito cargado en contexto:", {
        items: res.data.items,
        total: res.data.total,
        cartId: res.data.cartId
      });
    } else {
      console.log("🪹 No se encontró carrito activo");
      setCart({ items: [], total: 0, cartId: null });
    }
  } catch (err) {
    console.error("Error fetching cart:", err);
  } finally {
    setLoading(false);
    console.log("✅ fetchCart terminado");
  }
};
   const addItem = async ({ id_product, quantity = 1 }) => {
    
  try {
    if (loading) {
  Swal.fire({
    icon: 'info',
    title: 'Cargando sesión...',
    text: 'Espera un momento mientras verificamos tu sesión.',
    showConfirmButton: false,
    timer: 1500
  });
  return;
}
    //  Verificar que el usuario esté logueado
    if (!user || !user.id) {
      Swal.fire({
        icon: 'info',
        title: 'Inicia sesión para comprar',
        text: 'Debes iniciar sesión para agregar productos al carrito.',
        confirmButtonText: 'Ir al login'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login';
        }
      });
      console.warn("Intento de agregar producto sin usuario logueado");
      return; // Salimos antes de hacer cualquier llamada al backend
    }

    console.log("Usuario logueado:", user);

    // 2️⃣ Obtener carrito activo o crearlo
    let cartId = cart.cartId;
    if (!cartId) {
      console.log("Antes de createCart:", { id_customer: user.id });
      const newCartResponse = await createCart({ id_customer: user.id });

      if (!newCartResponse || !newCartResponse.data || !newCartResponse.data.cart) {
        throw new Error("No se pudo crear el carrito");
      }

      cartId = newCartResponse.data.cart.id;
      console.log("Nuevo carrito creado con ID:", cartId);
    }

    // 3️⃣ Agregar producto al carrito
    console.log("Agregando producto:", { id_cart: cartId, id_product, quantity });
    const addItemResponse = await addCartItem({ id_cart: cartId, id_product, quantity });

    console.log("Respuesta al agregar item:", addItemResponse.data);

    // 4️⃣ Actualizar carrito en UI
    await fetchCart();

    // 5️⃣ Toast de éxito
    Swal.fire({
      icon: 'success',
      title: 'Producto agregado',
      showConfirmButton: false,
      timer: 1200
    });

  } catch (err) {
    console.error("Error adding item:", err);
    Swal.fire({
      icon: 'error',
      title: 'No se pudo agregar el producto',
      text: err.response?.data?.message || err.message
    });
  }
};
    const updateItem = async (itemId, quantity) => {
        const item = cart.items.find(i => i.id === itemId);
        if (!item) return;
        try {
            await updateCartItem(itemId, { quantity });
            await fetchCart();
        } catch (err) {
            console.error("Error updating item:", err);
        }
    };

    const removeItem = async (itemId) => {
        try {
            await deleteCartItem(itemId);
            await fetchCart();
        } catch (err) {
            console.error("Error removing item:", err);
        }
    };

    return (
        <CartContext.Provider value={{ cart, loading, addItem, updateItem, removeItem }}>
            {children}
        </CartContext.Provider>
    );
};
