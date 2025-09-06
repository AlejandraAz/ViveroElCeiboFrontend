import { React, useState } from 'react'
import FormLogin from '../../Components/FormLogin.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import api from '../../Services/Api.js';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", { email, password });
      login(response.data.user, response.data.token);
      console.log("Login response:", response.data);
      console.log(response.data.user.rol)

      if (response.data.user.rol === "admin") {
        navigate("/admin/dashboard");
      } else { navigate("/") };
    } catch (error) {
      if (error === error.response?.status === 403) {
        alert("Tu cuenta está bloqueada. Contacta con el administrador.");
      } else {
        alert("Credenciales inválidas"); // o mostrar el error real
      }

    }
  }
  return (
    <>
      <FormLogin
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin} />
    </>
  )
}

export default LoginPage