import { useState } from "react";
import { Link } from "react-router-dom";

export default function AuthPage() {
  const [role, setRole] = useState("vendor");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const rolePlaceholder = {
    admin: "Admin Email",
    vendor: "Vendor Email",
    user: "User Email",
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Role:", role);
    console.log("Form Data:", formData);
  };

  const handleReset = () => setFormData({ email: "", password: "" });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-gray-200 px-4 py-8">

      {/* Card — fluid width, max capped at 420px */}
      <div className="w-full max-w-[420px] bg-white shadow-2xl rounded-2xl p-6 sm:p-8">

        {/* Title — shrinks gracefully on small screens */}
        <h2 className="text-center text-base sm:text-xl font-semibold text-gray-700 mb-6 leading-snug">
          Event Management System - Sign in
        </h2>

        {/* Role Switch — wraps on very small screens */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
          {["admin", "vendor", "user"].map((item) => (
            <button
              key={item}
              onClick={() => setRole(item)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg capitalize text-sm sm:text-base transition ${
                role === item
                  ? "bg-blue-600 text-white shadow-md scale-105"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={rolePlaceholder[role]}
            className="w-full px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <div className="flex justify-between gap-3 mt-6">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 sm:flex-none px-5 sm:px-6 py-2 text-sm sm:text-base bg-gray-300 rounded-lg hover:bg-gray-400 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 sm:flex-none px-5 sm:px-6 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-sm sm:text-base text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-orange-600 hover:text-orange-800 font-semibold hover:underline"
            >
              Create your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}