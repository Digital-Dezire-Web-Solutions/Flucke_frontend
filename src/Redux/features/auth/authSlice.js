import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await api.post("/auth/login", data);

    localStorage.setItem("token", res.data.token);

    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/auth/signup", data);

      localStorage.setItem("token", res.data.token);

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const getProfile = createAsyncThunk(
  "auth/profile",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/auth/profile");

      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data, thunkAPI) => {
    try {
      const res = await api.put("/auth/profile", data);
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const getUsers = createAsyncThunk(
  "auth/getUsers",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/auth");
      return res.data.users;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.put(`/auth/${id}`, data);
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/auth/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const addAddress = createAsyncThunk(
  "auth/addAddress",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/auth/addresses", data);
      return res.data.addresses;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const updateAddress = createAsyncThunk(
  "auth/updateAddress",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.put(`/auth/addresses/${id}`, data);
      return res.data.addresses;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const deleteAddress = createAsyncThunk(
  "auth/deleteAddress",
  async (id, thunkAPI) => {
    try {
      const res = await api.delete(`/auth/addresses/${id}`);
      return res.data.addresses;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const setDefaultAddress = createAsyncThunk(
  "auth/setDefaultAddress",
  async (id, thunkAPI) => {
    try {
      const res = await api.put(`/auth/addresses/default/${id}`);
      return res.data.addresses;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.loading = true;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })

      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(addAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })

      .addCase(updateAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })

      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })

      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map((item) =>
          item._id === action.payload._id ? action.payload : item,
        );
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((item) => item._id !== action.payload);
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
