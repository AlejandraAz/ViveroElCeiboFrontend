import React from 'react';
import { FaHome } from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google';
import { Link} from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useForm } from 'react-hook-form';


const FormLogin = ({ email, setEmail, password, setPassword, handleLogin,handleGoogleLogin }) => {

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-[#E5BA95] w-full max-w-md rounded-md shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#835D3C]">Iniciar sesión</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div className="mb-4">
            <label className="block mb-1 text-[#835D3C]">Correo electrónico</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#B08968] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6A994E]"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-[#835D3C]">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#B08968] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6A994E]"
            />
          
            <p className="text-center my-4">
              ¿No tienes cuenta?
              <Link to="/register" className="text-[#C46F1D] font-semibold hover:underline"> Registrate</Link>
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-[#6A994E] text-white font-bold py-2 px-4 rounded-3xl mb-3 cursor-pointer shadow-2xl hover:bg-green-700 transition duration-200"
          >
            Comenzar
          </button>
        </form>


        <div className="mt-4 flex items-center text-[#835D3C]">
        <hr className="flex-grow border-t-2  border-[#B08968]"/>
        <span className="mx-4 font-semibold">ó inicia sesión con</span>
        <hr className="flex-grow border-t-2 border-[#B08968]"/>
        </div>

         {/* BOTÓN DE GOOGLE */}
        <div className="mt-4 flex justify-center mb-5">
          <GoogleLogin
          size="large"
          shape="pill"
          theme="outline"
            onSuccess={handleGoogleLogin}
            onError={() => {
              alert("Error en la autenticación con Google");
            }}
          />
        </div>


        <Link to="/" className="text-center font-bold flex items-center justify-center mt-4 gap-1 text-[#835D3C]">
          Volver a Inicio<FaHome size={18} />
        </Link>
      </div>
    </div>
  );
};

export default FormLogin;


// lindo con react-hook-form e iconos pero no funciona 😔
// import React from 'react';
// import { FaHome, FaEnvelope, FaLock } from 'react-icons/fa';
// import { GoogleLogin } from '@react-oauth/google';
// import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';

// const FormLogin = ({ handleLogin, handleGoogleLogin }) => {
//   // Usamos react-hook-form para manejar el formulario y validaciones
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   // Función de manejo del formulario
//   const onSubmit = (data) => {
//     handleLogin(data);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <div className="bg-[#E5BA95] w-full max-w-md rounded-md shadow-md p-6">
//         <h2 className="text-2xl font-bold text-center mb-6 text-[#835D3C]">Iniciar sesión</h2>

//         {/* Formulario con validaciones */}
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-4 relative ">
//             <label className="block mb-1 text-[#835D3C]">Correo electrónico</label>
//             <div className="flex items-center border border-[#B08968] focus-within:ring-2 focus-within:ring-[#6A994E] rounded px-3 py-2">
//               <FaEnvelope className="text-[#6A994E] mr-2" size={18} />
//               <input
//                 type="email"
//                 {...register('email', { 
//                   required: 'El correo electrónico es obligatorio', 
//                   pattern: {
//                     value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                     message: 'Formato de correo electrónico inválido'
//                   }
//                 })}
//                 className="w-full focus:outline-none"
//               />
//             </div>
//             {/* Mostrar error si existe */}
//             {errors.email && <p className="text-sm text-[#5C2D0B] font-bold mt-1">{errors.email.message}</p>}
//           </div>

//           <div className="mb-6 relative">
//             <label className="block mb-1 text-[#835D3C]">Contraseña</label>
//             <div className="flex items-center border border-[#B08968] focus-within:ring-2 focus-within:ring-[#6A994E] rounded px-3 py-2">
//               <FaLock className="text-[#6A994E] mr-2" size={18} />
//               <input
//                 type="password"
//                 {...register('password', {
//                   required: 'La contraseña es obligatoria',
//                   minLength: {
//                     value: 6,
//                     message: 'La contraseña debe tener al menos 6 caracteres'
//                   }
//                 })}
//                 className="w-full focus:outline-none "
//               />
//             </div>
//             {/* Mostrar error si existe */}
//             {errors.password && <p className="text-sm text-[#5C2D0B] font-bold mt-1">{errors.password.message}</p>}
            
//             <p className="text-center my-4">
//               ¿No tienes cuenta?
//               <Link to="/register" className="text-[#C46F1D] font-semibold hover:underline"> Registrate</Link>
//             </p>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#6A994E] text-white font-bold py-2 px-4 rounded-3xl mb-3 cursor-pointer shadow-2xl hover:bg-green-700 transition duration-200"
//           >
//             Comenzar
//           </button>
//         </form>

//         <div className="mt-4 flex items-center text-[#835D3C]">
//           <hr className="flex-grow border-t-2  border-[#B08968]" />
//           <span className="mx-4 font-semibold">ó inicia sesión con</span>
//           <hr className="flex-grow border-t-2 border-[#B08968]" />
//         </div>

//         {/* BOTÓN DE GOOGLE */}
//         <div className="mt-4 flex justify-center mb-5">
//           <GoogleLogin
//             size="large"
//             shape="pill"
//             theme="outline"
//             onSuccess={handleGoogleLogin}
//             onError={() => {
//               alert("Error en la autenticación con Google");
//             }}
//           />
//         </div>

//         <Link to="/" className="text-center font-bold flex items-center justify-center mt-4 gap-1 text-[#835D3C]">
//           Volver a Inicio<FaHome size={18} />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default FormLogin;
