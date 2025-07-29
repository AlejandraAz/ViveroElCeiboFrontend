import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000",
    timeout:8000 //por si el backend tarda mas de 8 segundos se cancele la peticion
    });

export default api;