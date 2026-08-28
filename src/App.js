import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Checkout/Checkout";
import About from "./Pages/About/About";
import Product from "./Pages/Product/Product";
import ContactPage from "./Pages/ContactPage/ContactPage";
import ProductDetailPage from "./Pages/ProductDetailPage/ProductDetailPage";
import PrivacyPolicy from "./Pages/Policies/PrivacyPolicy";
import TermCondition from "./Pages/Policies/TermCondition";
import ReturnRefund from "./Pages/Policies/ReturnRefund";
import Account from "./Pages/Account/Account";
import AdminPanel from "./Pages/AdminPanel/AdminPanel";

import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Layout() {
  const location = useLocation();

  // Hide on admin pages
  const hideLayout = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />

      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productdetail/:id" element={<ProductDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/term-&-condition" element={<TermCondition />} />
        <Route path="/shipping-&-return" element={<ReturnRefund />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;