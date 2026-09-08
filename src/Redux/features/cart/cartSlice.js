import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    cartItems: [],
  },

  reducers: {
    addToCart(state, action) {
      const existing = state.cartItems.find(
        (item) =>
          item._id === action.payload._id && item.size === action.payload.size,
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
      const { id, size } = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) => !(item._id === id && item.size === size),
      );
    },

    updateCartQuantity(state, action) {
      const { id, size, delta } = action.payload;

      const item = state.cartItems.find(
        (item) => item._id === id && item.size === size,
      );

      if (!item) return;

      item.quantity += delta;

      if (item.quantity <= 0) {
        state.cartItems = state.cartItems.filter(
          (i) => !(i._id === id && i.size === size),
        );
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
