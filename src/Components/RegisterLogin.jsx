import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa';

const RegisterLogin = () => {
  return (
    <>
    <div className="min-h-screen  flex items-center justify-center p-4">
                <div className="bg-[#E5BA95] w-full max-w-md rounded-md shadow-md p-6">
                    <h2 className="text-2xl font-bold text-center mb-6 text-[#835D3C]">Crear cuenta</h2>
                    <form>
                        <div className="mb-4">
                            <label class="block mb-1 text-[#835D3C]">Nombre completo</label>
                            <input
                                type="text" minLength={3} maxLength={100} placeholder=' Nombre y apellido' required
                                className="w-full border border-[#B08968] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6A994E]"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 text-[#835D3C]">Correo electrónico</label>
                            <input
                                type="email" placeholder='nombre@gmail.com' required
                                className="w-full border border-[#B08968] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6A994E]"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-1 text-[#835D3C]">Contraseña</label>
                            <input
                                type="password" placeholder='Debe tener entre 8 y 12 caracteres' required
                                className="w-full border border-[#B08968] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6A994E]"
                            />
                            <p className="text-center  my-4">¿Ya tienes cuenta?<Link to='/login' className="text-[#C46F1D] font-semibold hover:underline"> Inicia sesión</Link></p>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#6A994E] text-white font-bold py-2 px-4 rounded-2xl hover:bg-green-700 transition duration-200"
                        >
                            Comenzar 
                        </button>
                    </form>
                    <Link to='/' className='text-center font-bold flex items-center justify-center mt-4 gap-1 text-[#835D3C]'>Volver a Inicio<FaHome size={18} /></Link>
                </div>
            </div>
    </>
  )
}

export default RegisterLogin