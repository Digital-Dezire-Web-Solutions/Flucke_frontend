import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    cartItems: [],
  },

  reducers: {
    addToCart(state, action) {
      const existing = state.cartItems.find(
        (item) => item._id === action.payload._id,
      );

      if (existing) {
        existing.quantity += action.payload.quantity || 1;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
    },

    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload,
      );
    },

    updateCartQuantity(state, action) {
      const { id, delta } = action.payload;

      const item = state.cartItems.find((item) => item._id === id);

      if (!item) return;

      item.quantity += delta;

      if (item.quantity <= 0) {
        state.cartItems = state.cartItems.filter((item) => item._id !== id);
      }
    },

    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateCartQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
