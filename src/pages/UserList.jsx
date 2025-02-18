import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setSearchQuery, deleteUser } from "../redux/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const UserList = () => {
  /* Mendapatkan dispatch dan navigate */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Mengambil data users dan searchQuery dari state */
  const { users, searchQuery } = useSelector((state) => state.users);

  /* State untuk menangani user yang terpilih dan modal konfirmasi */
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  /* Mengambil data users dari API ketika users kosong */
  useEffect(() => {
    if (users.length === 0) {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          dispatch(setUsers(response.data));
        })
        .catch((error) => console.error("Error fetching users:", error));
    }
  }, [dispatch, users.length]);

  /* Fungsi untuk mengonfirmasi penghapusan user */
  const confirmDelete = (id) => {
    setSelectedUserId(id);
    setShowConfirmModal(true);
  };

  /* Fungsi untuk menghapus user */
  const handleDelete = () => {
    if (selectedUserId) {
      dispatch(deleteUser(selectedUserId));
    }
    setShowConfirmModal(false);
  };

  /* Fungsi untuk membatalkan penghapusan user */
  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setSelectedUserId(null);
  };

  /* Fungsi untuk mencari user berdasarkan query */
  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  /* Fungsi untuk mengedit user */
  const handleEdit = (id) => {
    navigate(`/UserForm/${id}`);
  };

  /* Fungsi untuk menambahkan user baru */
  const handleAddUser = () => {
    navigate("/UserForm/new");
  };

  /* Menyaring users berdasarkan searchQuery */
  const filteredUsers = users
    .map((user) => ({
      ...user,
      company: user.company ? { ...user.company } : { name: "N/A" },
    }))
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">User Management</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleAddUser}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-200"
        >
          Add User
        </button>

        <div className="relative w-1/3">
          <FiSearch className="absolute left-3 top-3 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={handleSearch}
            className="border p-2 pl-10 rounded-lg w-full shadow-md focus:ring-2 focus:ring-green-500 focus:outline-none transition duration-200"
          />
        </div>
      </div>

      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-4 text-left font-semibold">ID</th>
            <th className="p-4 text-left font-semibold">Name</th>
            <th className="p-4 text-left font-semibold">Email</th>
            <th className="p-4 text-left font-semibold">Company</th>
            <th className="p-4 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {/* Menampilkan daftar user yang sudah difilter */}
          {filteredUsers.map((user, index) => (
            <tr
              key={user.id}
              className={`border-t ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 transition duration-200`}
            >
              <td className="p-4">{user.id}</td>
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.company?.name || "N/A"}</td>
              <td className="p-4 flex gap-3">
                <button
                  onClick={() => handleEdit(user.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal konfirmasi penghapusan */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
