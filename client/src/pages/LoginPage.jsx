import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user"); //
  const [formData, setFormData] = useState({ email: "", password: "" });

  const rolePlaceholder = {
    admin: "Admin Email",
    vendor: "Vendor Email",
    user: "User Email",
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Login failed ❌");
        return;
      }

      alert("Login Successful ✅");

      // ✅ SAVE USER (IMPORTANT)
      localStorage.setItem("user", JSON.stringify({
        email: formData.email,
        role: role
      }));

      // ✅ RESET FORM
      setFormData({ email: "", password: "" });

      // ✅ REDIRECT
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "vendor") {
        navigate("/vendor");
      } else {
        navigate("/user");
      }

    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    }
  };

  const handleReset = () => setFormData({ email: "", password: "" });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-gray-200 px-4 py-8">

      <div className="w-full max-w-[420px] bg-white shadow-2xl rounded-2xl p-6 sm:p-8">

        <h2 className="text-center text-xl font-semibold text-gray-700 mb-6">
          Event Management System - Sign in
        </h2>

        {/* Role Switch */}
        <div className="flex justify-center gap-3 mb-6">
          {["admin", "vendor", "user"].map((item) => (
            <button
              key={item}
              onClick={() => setRole(item)}
              className={`px-4 py-2 rounded-lg capitalize ${role === item
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            autoComplete="off"
            value={formData.email}
            onChange={handleChange}
            placeholder={rolePlaceholder[role]}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            name="password"
            autoComplete="off"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />

          <div className="flex justify-between gap-3 mt-6">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-orange-600 font-semibold"
            >
              Create your account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}