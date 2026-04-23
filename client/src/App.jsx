import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/LoginPage";
import VendorSignup from "./pages/VendorSignup";
import ProtectedRoute from "./components/ProtectedRoute";

// ✅ ADMIN
import AdminDashboard from "./pages/Admin/AdminDashboard";
import MembershipPage from "./pages/Admin/MembershipPage";
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageVendors from "./pages/Admin/ManageVendors";
import VendorMembership from "./pages/Admin/MembershipPage";

// ✅ Dummy dashboards
const VendorDashboard = () => <h1>Vendor Dashboard</h1>;
const UserDashboard = () => <h1>User Dashboard</h1>;

export default function App() {
  return (
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

      {/* ✅ Vendor */}
      <Route
        path="/vendor"
        element={
          <ProtectedRoute role="vendor">
            <VendorDashboard />
          </ProtectedRoute>
        }
      />

      {/* ✅ User */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
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
