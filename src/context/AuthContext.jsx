import { createContext,useState,useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [token,setToken]= useState(null);

    const login = (userData,token)=>{
        setUser(userData);
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
    }

    const logout = ()=>{
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    return(
        <AuthContext.Provider value={{user,token,login,logout}}>
        {children}
        </AuthContext.Provider>
    )
};

export const useAuth = ()=> useContext(AuthContext);

// a este componente lo utilizo luego en el App (lo envuelvo) para garantizarme que toda la app tenga acceso al contexto de autenticacionz
