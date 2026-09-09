import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

// Get current user's wishlist
export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/wishlist");
      return res.data.wishlist.products;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// Add to wishlist
// Takes the full product object (not just an id) — the backend's
// addWishlist controller only responds with { success, message }, not
// the product itself, so there's nothing to append to state from the
// response alone. Passing the product you already have in hand (e.g.
// from a product card) lets the reducer add it straight to state
// without a second round trip to re-fetch the whole list.
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (product, thunkAPI) => {
    try {
      const productId = product._id || product.id;
      await api.post("/wishlist", { productId });
      return product;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// Remove from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/wishlist/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    clearWishlist(state) {
      state.products = [];
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
      })

      .addCase(getWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(addToWishlist.fulfilled, (state, action) => {
        const id = action.payload._id || action.payload.id;
        const alreadyIn = state.products.some(
          (item) => (item._id || item.id) === id
        );
        if (!alreadyIn) {
          state.products.push(action.payload);
        }
      })

      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (item) => (item._id || item.id) !== action.payload
        );
      })

      .addMatcher(
        (action) =>
          action.type.startsWith("wishlist/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;