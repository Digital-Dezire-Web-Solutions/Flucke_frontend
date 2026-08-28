import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async () => {
    const res = await api.get("/categories");
    return res.data.categories;
  }
);

const categorySlice = createSlice({
  name: "category",

  initialState: {
    categories: [],
  },

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export default categorySlice.reducer;