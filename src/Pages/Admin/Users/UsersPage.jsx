import React, { useEffect, useState } from "react";
import Pagination from "../../../Components/Pagination.jsx";
import ConfirmModal from '../../../Components/ConfirmModal.jsx';
import api from "../../../Services/Api.js";
import { LockKeyhole, LockKeyholeOpen,Mail,Plus } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import UserChart from "../Users/UserChart.jsx";

const UsersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Estados iniciales desde la URL
  const initialSearch = searchParams.get("q") || "";
  const initialStatus = searchParams.get("status") || "";
  const initialPage = Number(searchParams.get("page")) || 1;

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [debouncedStatus, setDebouncedStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Debounce para búsqueda
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Debounce para filtro
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedStatus(statusFilter), 300);
    return () => clearTimeout(handler);
  }, [statusFilter]);

  // Actualiza filtros en la URL
  useEffect(() => {
    const params = {
      q: searchTerm,
      status: statusFilter,
      page: page.toString(),
    };
    Object.keys(params).forEach((key) => {
      if (!params[key]) delete params[key];
    });
    setSearchParams(params);
  }, [searchTerm, statusFilter, page]);

  // Fetch de usuarios cuando cambia búsqueda, filtro o página
  useEffect(() => {
    fetchUsers(debouncedSearch, page, debouncedStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, debouncedStatus, page]);

  const fetchUsers = async (search = "", currentPage = 1, status = "") => {
    setLoading(true);
    try {
      const res = await api.get("/admin/customers", {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          q: search,
          status: status?.toLowerCase() || undefined,
        },
        withCredentials: true,
      });

      console.log("Respuesta del backend:", res.data);
      const payload = res.data || {};
      const items =
        payload.data ||
        payload.rows ||
        payload.customers ||
        payload.users ||
        (Array.isArray(payload) ? payload : []);

      const count =
        payload.pagination?.totalItems ??
        payload.count ??
        payload.totalItems ??
        (Array.isArray(items) ? items.length : 0);

      const itemsPerPageFromRes = payload.pagination?.itemsPerPage ?? itemsPerPage;
      const totalPagesFromRes =
        payload.pagination?.totalPages ??
        (itemsPerPageFromRes ? Math.max(1, Math.ceil(count / itemsPerPageFromRes)) : 1);

      setUsers(items || []);
      setTotalItems(Number(count) || 0);
      setItemsPerPage(Number(itemsPerPageFromRes) || itemsPerPage);
      setTotalPages(Number(totalPagesFromRes) || 1);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      setUsers([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id) => {
    try {
      await api.patch(`/admin/customers/${id}/status`, {}, { withCredentials: true });
      fetchUsers(debouncedSearch, page, debouncedStatus);
    } catch (err) {
      console.error("Error al cambiar estado:", err);
    }
  };

  const openConfirmModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>


<UserChart/>
      {/* Buscador + Filtro + Crear Usuario */}
<div className="flex items-center justify-between mb-4">
  <div className="flex items-center gap-4">
    <div className="w-64">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setPage(1);
          setSearchTerm(e.target.value);
        }}
        placeholder="Buscar por nombre o email"
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>

    <select
      className="p-2 border border-gray-300 rounded"
      value={statusFilter}
      onChange={(e) => {
        setPage(1);
        setStatusFilter(e.target.value);
      }}
    >
      <option value="">Todos</option>
      <option value="activo">Activos</option>
      <option value="bloqueado">Inactivos</option>
    </select>
  </div>


  <div className="flex gap-2">
    <button
      onClick={() => console.log("Crear usuario")}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      <Plus className="w-4 h-4" />
      Crear Usuario
    </button>

    <button
      onClick={() => console.log("Enviar correo")}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      <Mail className="w-4 h-4" />
      Enviar Correo
    </button>
  </div>
  
</div>


      {/* Tabla de usuarios */}
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Nombre</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Rol</th>
            <th className="border border-gray-300 p-2">Estado</th>
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                Cargando usuarios...
              </td>
            </tr>
          ) : users?.length > 0 ? (
            users.map((u) => (
              <tr key={u.id}>
                <td className="border border-gray-300 p-2">{u.name}</td>
                <td className="border border-gray-300 p-2">{u.email}</td>
                <td className="border border-gray-300 p-2">{u.rol ?? "No asignado"}</td>
                <td className="border border-gray-300 p-2">{u.accountStatus}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => openConfirmModal(u)}
                    className="p-2 rounded cursor-pointer hover:bg-blue-600 bg-blue-500 text-white"
                    title={u.accountStatus === "activo" ? "Bloquear usuario" : "Activar usuario"}
                  >
                    {u.accountStatus === "activo" ? (
                      <LockKeyhole className="w-5 h-5" />
                    ) : (
                      <LockKeyholeOpen className="w-5 h-5" />
                    )}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border border-gray-300 p-2 text-center text-gray-500">
                🚫 No se encontraron coincidencias
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      {users?.length > 0 && totalPages > 1 && (
        <div className="mt-4">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p)}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}

      {/* Modal de confirmación */}
      <ConfirmModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => toggleStatus(selectedUser?.id)}
        title={`¿Confirmás ${selectedUser?.accountStatus === "activo" ? "bloquear" : "activar"} este usuario?`}
        message={`Esta acción cambiará el estado de la cuenta de "${selectedUser?.name}".`}
      />
    </div>
  );
};

export default UsersPage;

