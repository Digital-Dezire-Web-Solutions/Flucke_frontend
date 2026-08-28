import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
  orders: [],
  myOrders: [],
  order: null,
  loading: false,
  error: null,
};


// Create Order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/orders", data);
      return res.data.order;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);


// Customer Orders
export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/orders/my-orders");
      return res.data.orders;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);


// Admin Orders
export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/orders");
      return res.data.orders;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);


// Get Single Order
export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/orders/${id}`);
      return res.data.order;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);


// Update Status
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const res = await api.put(`/orders/${id}/status`, {
        orderStatus: status,
      });

      return res.data.order;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);


// Delete Order
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/orders/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",

  initialState,

  reducers: {
    clearOrder(state) {
      state.order = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })

      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.myOrders = action.payload;
      })

      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })

      .addCase(getOrder.fulfilled, (state, action) => {
        state.order = action.payload;
      })

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.orders = state.orders.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })

      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (item) => item._id !== action.payload
        );
      })

      .addMatcher(
        (action) => action.type.startsWith("order/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;