import { createSlice } from "@reduxjs/toolkit";

// A cart "line" is a product + size combination — the same product in two
// different sizes must stay as two separate rows, not merge into one.
// Falls back to "default" when a product has no size at all (e.g. items
// added from ProductGrid, which doesn't collect a size).
function getLineId(item) {
  return `${item._id}__${item.size || "default"}`;
}

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    cartItems: [],
  },

  reducers: {
    addToCart(state, action) {
      const lineId = getLineId(action.payload);
      const existing = state.cartItems.find(
        (item) => getLineId(item) === lineId,
      );

      if (existing) {
        existing.quantity += action.payload.quantity || 1;
      } else {
        state.cartItems.push({
          ...action.payload,
          lineId,
          quantity: action.payload.quantity || 1,
        });
      }
    },

    // `id` here is a lineId (see Cart.jsx), not a raw product _id — that's
    // what makes removing/updating one size not touch another size of the
    // same product.
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => getLineId(item) !== action.payload,
      );
    },

    updateCartQuantity(state, action) {
      const { id, delta } = action.payload;

      const item = state.cartItems.find((item) => getLineId(item) === id);

      if (!item) return;

      item.quantity += delta;

      if (item.quantity <= 0) {
        state.cartItems = state.cartItems.filter(
          (item) => getLineId(item) !== id,
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