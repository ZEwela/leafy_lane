import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Home from "./pages/Home.tsx";
import Product from "./pages/Product.tsx";
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient } from "@tanstack/react-query";
import { StoreProvider } from "./Store.tsx";
import Cart from "./pages/Cart.tsx";
import Signin from "./pages/Signin.tsx";
import Signup from "./pages/Signup.tsx";
import ShippingAdress from "./pages/ShippingAdress.tsx";
import PaymentMethod from "./pages/PaymentMethod.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import PlaceOrder from "./pages/PlaceOrder.tsx";
import Order from "./pages/Order.tsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import OrderHistory from "./pages/OrderHistory.tsx";
import AdminProfile from "./pages/AdminProfile.tsx";
import AdminProducts from "./pages/AdminProducts.tsx";
import ProductEdit from "./pages/ProductEdit.tsx";
import ProductCreate from "./pages/ProductCreate.tsx";
import Profile from "./pages/Profile.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home />} />
      <Route path="product/:slug" element={<Product />} />
      <Route path="cart" element={<Cart />} />
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route path="" element={<ProtectedRoute />}>
        <Route path="shipping" element={<ShippingAdress />} />
        <Route path="payment" element={<PaymentMethod />} />
        <Route path="placeorder" element={<PlaceOrder />} />
        <Route path="order/:id" element={<Order />} />
        <Route path="orderhistory" element={<OrderHistory />} />
        <Route path="admin" element={<AdminProfile />} />
        <Route path="admin/products" element={<AdminProducts />} />
        <Route path="admin/product/:id/edit" element={<ProductEdit />} />
        <Route path="admin/product/create" element={<ProductCreate />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider>
      <PayPalScriptProvider options={{ "client-id": "sb" }} deferLoading={true}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </HelmetProvider>
      </PayPalScriptProvider>
    </StoreProvider>
  </React.StrictMode>
);
