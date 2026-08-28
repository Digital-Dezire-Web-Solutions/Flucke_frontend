import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../Redux/features/auth/authSlice";
import productReducer from "../Redux/features/products/productSlice";
import categoryReducer from "../Redux/features/category/categorySlice";
import cartReducer from "../Redux/features/cart/cartSlice";
import orderReducer from "../Redux/features/order/orderSlice";
import couponReducer from "../Redux/features/coupon/couponslice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
    orders: orderReducer,
    coupons: couponReducer,
  },
});