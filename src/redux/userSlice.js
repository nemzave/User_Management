import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  searchQuery: "",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    /* Mendapatkan dan mengatur data users dari action.payload */
    setUsers: (state, action) => {
      state.users = action.payload.map((user) => ({
        ...user,
        company:
          user.company && user.company.name
            ? { ...user.company }
            : { name: "N/A" },
        address: user.address ? { ...user.address } : {},
      }));
    },

    /* Mendapatkan query pencarian dari action.payload */
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    /* Menghapus user berdasarkan 'id' */
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },

    /* Menambahkan atau memperbarui user, berdasarkan apakah user sudah ada atau belum */
    addOrUpdateUser: (state, action) => {
      const { id, name, email, address, company } = action.payload;

      if (!id || !name || !email) {
        console.error("Invalid user data", action.payload);
        return;
      }

      /* Mencari user yang sudah ada di state berdasarkan 'id' */
      const existingUserIndex = state.users.findIndex((user) => user.id === id);

      if (existingUserIndex !== -1) {
        // Update existing user
        state.users[existingUserIndex] = {
          ...state.users[existingUserIndex],
          name,
          email,
          address: address || "",
          company: company && company.name ? { ...company } : { name: "N/A" },
        };
      } else {
        // Add new user
        state.users.push({
          id,
          name,
          email,
          address: address || "",
          company: company && company.name ? { ...company } : { name: "N/A" },
        });
      }
    },

    /* Mereset query pencarian */
    resetSearchQuery: (state) => {
      state.searchQuery = "";
    },
  },
});

export const {
  setUsers,
  setSearchQuery,
  deleteUser,
  addOrUpdateUser,
  resetSearchQuery,
} = userSlice.actions;

export default userSlice.reducer;
