import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import ProductDetail from "../../Components/ProductDetail/ProductDetail";
import LuxuryCta from "../../Components/LuxuryCta/LuxuryCta";

import { getProduct } from "../../Redux/features/products/productSlice";

const ProductDetailPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  return (
    <div className="product-page">
      <ProductDetail />
      <LuxuryCta />
    </div>
  );
};

export default ProductDetailPage;
