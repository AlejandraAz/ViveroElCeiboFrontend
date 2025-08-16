import React from 'react'
import { ArrowRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'


const FormLogin = () => {
    return (
        <>
            <div class="min-h-screen  flex items-center justify-center p-4">
                <div class="bg-[#E5BA95] w-full max-w-md rounded-md shadow-md p-6">
                    <h2 class="text-2xl font-bold text-center mb-6 text-[#835D3C]">Iniciar sesión</h2>
                    <form>
                        <div class="mb-4">
                            <label class="block mb-1 text-[#835D3C]">Correo electrónico</label>
                            <input
                                type="email" required
                                class="w-full border border-[#B08968] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6A994E]"
                            />
                        </div>
                        <div class="mb-6">
                            <label class="block mb-1 text-[#835D3C]">Contraseña</label>
                            <input
                                type="password" required
                                class="w-full border border-[#B08968] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6A994E]"
                            />
                            <p class="text-center my-4">¿No tienes cuenta?<Link to='/register' class="text-[#C46F1D] font-semibold hover:underline"> Registrate</Link></p>
                        </div>
                        <button
                            type="submit"
                            class="w-full bg-[#6A994E] text-white font-bold py-2 px-4 rounded-2xl hover:bg-green-700 transition duration-200"
                        >
                            Comenzar 
                        </button>
                    </form>
                    <Link to='/' className='text-center font-bold flex items-center justify-center mt-4 gap-1 text-[#835D3C]'>Volver a Inicio<ArrowRight /> </Link>
                </div>
            </div>
        </>
    )
}

export default FormLogin;