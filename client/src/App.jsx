// // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { Routes, Route, Navigate } from "react-router-dom";
// import AuthPage from "./pages/AuthPage";
// import VendorSignup from "./pages/VendorSignup";

// // Dummy dashboards (baad me replace kar dena)
// const AdminDashboard = () => <h1>Admin Dashboard</h1>;
// const VendorDashboard = () => <h1>Vendor Dashboard</h1>;
// const UserDashboard = () => <h1>User Dashboard</h1>;

// //  Protected Route
// const ProtectedRoute = ({ children, role }) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user) return <Navigate to="/" />;

//   if (role && user.role !== role) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default function App() {
//   return (
//       <Routes>

//         {/* Auth */}
//         <Route path="/" element={<AuthPage />} />
//         <Route path="/signup" element={<VendorSignup />} />

//         {/*  Admin */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute role="admin">
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Vendor */}
//         <Route
//           path="/vendor"
//           element={
//             <ProtectedRoute role="vendor">
//               <VendorDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* User */}
//         <Route
//           path="/user"
//           element={
//             <ProtectedRoute role="user">
//               <UserDashboard />
//             </ProtectedRoute>
//           }
//         />

//       </Routes>
  
//   );
// }



import React from 'react'
import Vendor from "./pages/VendorDashbord"
function App() {
  return (
    <div>
      <Vendor />
      
    </div>
  )
}

export default App
