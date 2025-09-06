import { useState, useEffect } from "react";

const CategoryModal = ({ isOpen, onClose, onSubmit, category }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (category) {
            setName(category.name);
            setDescription(category.description || "");
        } else {
            setName("");
            setDescription("");
        }
    }, [category]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        const data = { name, description };
        if (category) {
            onSubmit(category.id, data);
        } else {
            onSubmit(data);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">
                    {category ? "Editar Categoría" : "Crear Categoría"}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Nombre de la categoría"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                    <textarea
                        placeholder="Descripción (opcional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    />
                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-green-600 text-white cursor-pointer hover:bg-green-700"
                        >
                            {category ? "Actualizar" : "Crear"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryModal;