import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthPage from "./pages/LoginPage";
import VendorSignup from "./pages/VendorSignup";
import ProtectedRoute from "./components/ProtectedRoute";

//  ADMIN
import AdminDashboard from "./pages/Admin/AdminDashboard";
import MembershipPage from "./pages/Admin/MembershipPage";
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageVendors from "./pages/Admin/ManageVendors";
import VendorMembership from "./pages/Admin/MembershipPage";

// ============================Users====================
import UserDashboard from "./pages/User/Dashboard";
import Products from "./pages/User/VendorProducts";
import Cart from "./pages/User/Cart";
import CategoryVendors from "./pages/User/CategoryVendors";
import VendorItems from "./pages/User/VendorItems";

// ===============================vendor========================

import VendorDashboard from "./pages/vendor/VendorDashboard";
import InsertItemPage from "./pages/vendor/InsertItemPage";
import DeleteItemPage from "./pages/vendor/DeleteItemPage";
import AddNewItemPage from "./pages/vendor/AddNewItemPage";
import ProductStatusPage from "./pages/vendor/ProductStatusPage";
import RequestItemPage from "./pages/vendor/RequestItemPage";
import ViewProductPage from "./pages/vendor/ViewProductPage";
import TransactionPage from "./pages/vendor/TransactionPage";

// ✅ Dummy dashboards
// const VendorDashboard = () => <h1>Vendor Dashboard</h1>;
// const UserDashboard = () => <h1>User Dashboard</h1>;

export default function App() {
  return (
    <>
    <Toaster position="top-right" />
    <Routes>

      {/* Auth */}
      <Route path="/" element={<AuthPage />} />
      <Route path="/signup" element={<VendorSignup />} />

      {/* ✅ Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/membership"
        element={
          <ProtectedRoute role="admin">
            <MembershipPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="admin">
            <ManageUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/vendors"
        element={
          <ProtectedRoute role="admin">
            <ManageVendors />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/vendor-membership"
        element={
          <ProtectedRoute role="admin">
            <VendorMembership />
          </ProtectedRoute>
        }
      />

      {/* VENDOR */}
      <Route
        path="/vendor"
        element={
          <ProtectedRoute role="vendor">
            <VendorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/insert"
        element={
          <ProtectedRoute role="vendor">
            <InsertItemPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/delete"
        element={
          <ProtectedRoute role="vendor">
            <DeleteItemPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/add-item"
        element={
          <ProtectedRoute role="vendor">
            <AddNewItemPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/product-status"
        element={
          <ProtectedRoute role="vendor">
            <ProductStatusPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/request-item"
        element={
          <ProtectedRoute role="vendor">
            <RequestItemPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/view-product"
        element={
          <ProtectedRoute role="vendor">
            <ViewProductPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/transaction"
        element={
          <ProtectedRoute role="vendor">
            <TransactionPage />
          </ProtectedRoute>
        }
      />

      {/* ✅ User */}
      {/* USER */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/products"
        element={
          <ProtectedRoute role="user">
            <Products />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/cart"
        element={
          <ProtectedRoute role="user">
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/vendors/:category"
        element={
          <ProtectedRoute role="user">
            <CategoryVendors />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/vendor-items/:vendorId"
        element={
          <ProtectedRoute role="user">
            <VendorItems />
          </ProtectedRoute>
        }
      />

    </Routes>
    </>
  );
}


// import React from 'react'
// import Vcm from "./pages/User/VendorProducts"
// function App() {
//   return (
//     <div>
//       <Vcm />
//     </div>
//   )
// }

// export default App
