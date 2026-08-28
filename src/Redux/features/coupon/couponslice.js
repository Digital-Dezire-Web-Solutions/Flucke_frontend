import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
  coupons: [],
  coupon: null,
  appliedCoupon: null,
  loading: false,
  error: null,
};

// Get All Coupons (Admin)
export const getCoupons = createAsyncThunk(
  "coupon/getCoupons",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/coupons");
      return res.data.coupons;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

// Create Coupon
export const createCoupon = createAsyncThunk(
  "coupon/createCoupon",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/coupons", data);
      return res.data.coupon;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

// Apply Coupon
export const applyCoupon = createAsyncThunk(
  "coupon/applyCoupon",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/coupons/apply", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

// Update Coupon
export const updateCoupon = createAsyncThunk(
  "coupon/updateCoupon",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.put(`/coupons/${id}`, data);
      return res.data.coupon;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

// Delete Coupon
export const deleteCoupon = createAsyncThunk(
  "coupon/deleteCoupon",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/coupons/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

const couponSlice = createSlice({
  name: "coupon",

  initialState,

  reducers: {
    clearCoupon(state) {
      state.appliedCoupon = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getCoupons.pending, (state) => {
        state.loading = true;
      })

      .addCase(getCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })

      .addCase(createCoupon.fulfilled, (state, action) => {
        state.coupons.unshift(action.payload);
      })

      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.appliedCoupon = action.payload;
      })

      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.coupons = state.coupons.map((item) =>
          item._id === action.payload._id ? action.payload : item,
        );
      })

      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.coupons = state.coupons.filter(
          (item) => item._id !== action.payload,
        );
      })

      .addMatcher(
        (action) =>
          action.type.startsWith("coupon/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const { clearCoupon } = couponSlice.actions;

export default couponSlice.reducer;
