
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import ProfileForm from "./ProfileForm.jsx";
import ChangePasswordForm from "./ChangePasswordForm.jsx";
import api from "../../Services/Api.js";
import { Edit2, Lock } from "lucide-react";

const ProfilePage = () => {
    const { user, setUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get("/customer/profile");
                setProfile(res.data.profile);
            } catch (err) {
                console.log("Error al cargar perfil:", err);
            }
        };
        fetchProfile();
    }, []);

    if (!profile) return <p className="text-center mt-10">Cargando perfil...</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 p-6">
            <div className="mx-auto max-w-3xl bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
                {/* Datos del usuario */}
                <div className="flex items-center mb-6">
                    {profile?.photo ? (
                        <img
                            src={profile.photo}
                            alt="Perfil"
                            className="w-20 h-20 rounded-full mr-4 object-cover shadow-md"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-green-400 mr-4 flex items-center justify-center shadow-md">
                            <span className="text-2xl font-bold text-white">
                                {profile?.name?.[0]}
                            </span>
                        </div>
                    )}
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-green-700">{profile?.name}</h2>
                        <p className="text-gray-700 text-sm sm:text-base">{profile?.email}</p>
                    </div>
                </div>

                {/* Datos estáticos */}
                <div className="grid gap-2 text-gray-700 mb-4 text-sm sm:text-base">
                    <p><strong>Teléfono:</strong> {profile?.phone || "No registrado"}</p>
                    <p><strong>Calle:</strong> {profile?.street || "-"}</p>
                    <p><strong>Número:</strong> {profile?.streetNumber || "-"}</p>
                    <p><strong>Barrio:</strong> {profile?.neighborhood || "-"}</p>
                    <p><strong>Ciudad:</strong> {profile?.city || "-"}</p>
                    <p><strong>Código postal:</strong> {profile?.postalCode || "-"}</p>
                </div>

                {/* Botones */}
                <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 mb-4">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition text-sm sm:text-base"
                    >
                        <Edit2 size={16} />
                        {isEditing ? "Cerrar edición" : "Editar perfil"}
                    </button>

                    <button
                        onClick={() => setShowChangePassword(!showChangePassword)}
                        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition text-sm sm:text-base"
                    >
                        <Lock size={16} />
                        Cambiar contraseña
                    </button>
                </div>

                {/* Sección editar perfil */}
                <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${isEditing ? "max-h-[650px] opacity-100 mt-4" : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="bg-green-50 p-4 rounded-lg shadow-inner overflow-y-auto max-h-[600px]">
                        <ProfileForm
                            userProfile={profile}
                            setProfile={setProfile}
                            setUser={setUser}
                        />
                    </div>
                </div>

                {/* Sección cambiar contraseña */}
                <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${showChangePassword ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="bg-green-50 p-4 rounded-lg shadow-inner overflow-y-auto max-h-[500px]">
                        <ChangePasswordForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
