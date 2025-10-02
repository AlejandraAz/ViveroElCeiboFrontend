import { createContext,useState,useContext,useEffect } from "react";
import api from '../../src/Services/Api.js';
// import { useNavigate } from "react-router-dom";

const AuthContext = createContext();


export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    // const navigate = useNavigate();

  const checkAuth = async () => {
     
    try {
      const res = await api.get("/auth/protegida"); // si hay cookie válida, devuelve el usuario
      
      setUser(res.data.user);
    } catch (error) {
      console.log('mensaje de error',error)
      setUser(null); // no logueado
    } finally {
      
      setLoading(false);
    }
  };

    const login = (userData)=>{
        setUser(userData);
    }

    const logout = async ()=>{
        await api.post('/auth/logout');
        setUser(null);
          //preguntar si conviene redirigir al Home o al login una vez cerrada la sesion
    }

     useEffect(() => {
      
    checkAuth();
  }, []);
    return(
        <AuthContext.Provider value={{user,setUser,login,logout,loading}}>
        {children}
        </AuthContext.Provider>
    )
};

export const useAuth = ()=> useContext(AuthContext);

// a este componente lo utilizo luego en el App (lo envuelvo) para garantizarme que toda la app tenga acceso al contexto de autenticacionz
