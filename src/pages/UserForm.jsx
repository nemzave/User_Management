import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addOrUpdateUser } from "../redux/userSlice";

const UserForm = () => {
  /* Mendapatkan 'id' dari URL parameter untuk mengetahui user yang sedang diedit */
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);

  /* Mencari user yang sedang diedit berdasarkan 'id' dari parameter */
  const existingUser = users.find((user) => user.id === parseInt(id));

  /* State untuk form data, inisialisasi dengan data user yang ada (jika ada), atau data baru jika belum ada */
  const [formData, setFormData] = useState({
    id: existingUser
      ? existingUser.id
      : Math.max(...users.map((u) => u.id), 0) + 1,
    name: existingUser ? existingUser.name : "",
    email: existingUser ? existingUser.email : "",
    address: existingUser ? existingUser.address.street : "",
    company: existingUser ? existingUser.company.name : "",
  });

  /* Mengupdate form data jika ada user yang ditemukan di 'existingUser' */
  useEffect(() => {
    if (existingUser) {
      setFormData({
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        address: existingUser.address.street,
        company: existingUser.company.name,
      });
    }
  }, [existingUser]);

  /* Fungsi untuk meng-handle perubahan input form */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* Fungsi untuk meng-handle pengiriman form (simpan atau perbarui user) */
  const handleSubmit = (e) => {
    e.preventDefault();
    /* Membuat objek user yang baru atau yang diperbarui */
    const updatedUser = {
      ...formData,
      company: { name: formData.company },
    };
    dispatch(addOrUpdateUser(updatedUser));
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full sm:w-96">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          {existingUser ? "Edit User" : "Add User"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>
          <div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>
          <div>
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-3 rounded-lg w-full hover:bg-green-600 transition duration-200"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg w-full hover:bg-gray-600 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
