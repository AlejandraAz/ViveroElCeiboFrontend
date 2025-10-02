
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import api from "../../Services/Api.js";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User, Phone, Home, MapPin, Map, Mail, Trash2 } from 'lucide-react';

const ProfileForm = ({ userProfile, setProfile, setUser }) => {
    const [formData, setFormData] = useState({
        name: userProfile.name || "",
        phone: userProfile.phone || "",
        street: userProfile.street || "",
        streetNumber: userProfile.streetNumber || "",
        neighborhood: userProfile.neighborhood || "",
        city: userProfile.city || "",
        postalCode: userProfile.postalCode || "",
    });

    const [preview, setPreview] = useState(userProfile.photo || null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    // Dropzone
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "image/*": [] },
        multiple: false,
        onDrop: (acceptedFiles) => {
            const newFile = acceptedFiles[0];
            setFile(newFile);
            setPreview(URL.createObjectURL(newFile));
        },
    });

    const handleRemovePhoto = async (e) => {
        e.stopPropagation();
        try {
            // Actualizamos solo la foto en el estado local mientras llamamos a la API
            setProfile((prev) => ({
                ...prev,
                photo: null,
            }));
            setPreview(null);
            setFile(null);

            const res = await api.put("/customer/profile", { photo: null });
            setProfile(res.data.profile);
            setUser(res.data.profile);
            //   toast.success("Foto de perfil eliminada correctamente!");
        } catch (err) {
            console.error("Error al eliminar foto:", err);
            //   toast.error("No se pudo eliminar la foto");
        }
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            Object.keys(formData).forEach((key) => data.append(key, formData[key]));

            if (file) {
                data.append("photo", file);
            } else if (!preview) {
                data.append("photo", "");
            }

            const res = await api.put("/customer/profile", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setProfile(res.data.profile);
            setUser(res.data.profile);
            toast.success("Perfil actualizado correctamente!");
        } catch (err) {
            console.error("Error al actualizar perfil:", err);
            toast.error("Error al actualizar perfil");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
            />

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dropzone */}
                <div className="flex flex-col items-center">
                    <div
                        {...getRootProps()}
                        className={`w-32 h-32 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors duration-200
              ${isDragActive ? "border-green-600 bg-green-50" : "border-green-400 bg-green-100 hover:bg-green-50"}
            `}
                    >
                        <input {...getInputProps()} />
                        {preview ? (
                            <div className="relative w-full h-full">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-full"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemovePhoto}
                                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow cursor-pointer"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ) : (
                            <span className="text-sm text-gray-600 text-center px-2">
                                Arrastrar o click
                            </span>
                        )}
                    </div>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nombre y teléfono */}
                    <div className="relative">
                        <label className="text-sm font-medium mb-1 block">Nombre completo</label>
                        <User className="absolute right-3 top-10 text-green-500" size={18} />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nombre completo"
                            className="w-full px-3 py-2 pr-10 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div className="relative">
                        <label className="text-sm font-medium mb-1 block">Teléfono</label>
                        <Phone className="absolute right-3 top-10 text-green-500" size={18} />
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Teléfono"
                            className="w-full px-3 py-2 pr-10 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Calle, Número, Barrio - misma fila en desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:col-span-2">
                        <div className="relative">
                            <label className="text-sm font-medium mb-1 block">Calle</label>
                            <Home className="absolute right-3 top-10 text-green-500" size={18} />
                            <input
                                type="text"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                placeholder="Calle"
                                className="w-full px-3 py-2 pr-10 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                        <div className="relative">
                            <label className="text-sm font-medium mb-1 block">Número</label>
                            <MapPin className="absolute right-3 top-10 text-green-500" size={18} />
                            <input
                                type="text"
                                name="streetNumber"
                                value={formData.streetNumber}
                                onChange={handleChange}
                                placeholder="Número"
                                className="w-full px-3 py-2 pr-10 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                        <div className="relative">
                            <label className="text-sm font-medium mb-1 block">Barrio</label>
                            <Map className="absolute right-3 top-10 text-green-500" size={18} />
                            <input
                                type="text"
                                name="neighborhood"
                                value={formData.neighborhood}
                                onChange={handleChange}
                                placeholder="Barrio"
                                className="w-full px-3 py-2 pr-10 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                    </div>

                    {/* Ciudad y Código Postal */}
                    <div className="relative">
                        <label className="text-sm font-medium mb-1 block">Ciudad</label>
                        <MapPin className="absolute right-3 top-10 text-green-500" size={18} />
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Ciudad"
                            className="w-full px-3 py-2 pr-10 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <div className="relative">
                        <label className="text-sm font-medium mb-1 block">Código Postal</label>
                        <Mail className="absolute right-3 top-10 text-green-500" size={18} />
                        <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            placeholder="Código Postal"
                            className="w-full px-3 py-2 pr-10 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                </div>

                {/* Botón Guardar */}
                <button
                    type="submit"
                    className={`w-full py-2 rounded-lg text-white cursor-pointer font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${loading
                            ? "bg-green-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 active:bg-green-800"
                        }`}
                    disabled={loading}
                >
                    {loading && (
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    )}
                    {loading ? "Guardando..." : "Guardar cambios"}
                </button>

            </form>
        </div>
    );
};

export default ProfileForm;
