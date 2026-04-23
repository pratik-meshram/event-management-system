import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function SignupPage() {
  const navigate = useNavigate();


  const [role, setRole] = useState("vendor");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    category: "",
    phone: "",
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role,
          phone: formData.phone,
          ...(role === "vendor" && { category: formData.category }),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Signup failed ❌");
        return;
      }

      alert("Signup Successful ✅ Please login");

      // ✅ RESET FORM
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        category: "",
        phone: "",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


  const inputClass =
    "w-full px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-gray-200 px-4 py-8">

      {/* Card — fluid, max 500px */}
      <div className="w-full max-w-[500px] bg-white shadow-2xl rounded-2xl p-6 sm:p-8">

        {/* Title */}
        <h2 className="text-center text-base sm:text-xl font-semibold text-gray-700 mb-6 capitalize">
          {role} Registration
        </h2>

        {/* Role Switch */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
          {["admin", "vendor", "user"].map((item) => (
            <button
              key={item}
              onClick={() => setRole(item)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg capitalize text-sm sm:text-base transition ${role === item
                ? "bg-blue-600 text-white shadow-md scale-105"
                : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <input
            type="email"
            name="email"
            placeholder={`${role} Email`}
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            required
          />

          {(role === "user" || role === "vendor") && (
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
              required
            />
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={inputClass}
            required
          />

          {role === "vendor" && (
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select Category</option>
              <option>Catering</option>
              <option>Florist</option>
              <option>Decoration</option>
              <option>Lighting</option>
            </select>
          )}

          <button
            type="submit"
            className="w-full py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-2 cursor-pointer"
          >
            Sign Up
          </button>

          <button
            type="button"
            onClick={() => setFormData({ name: "", email: "", password: "", confirmPassword: "", category: "", phone: "" })}
            className="w-full py-2 text-sm sm:text-base bg-gray-400 text-white rounded-lg hover:bg-gray-500 cursor-pointer"
          >
            Cancel
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-5 text-center">
          <p className="text-sm sm:text-base text-gray-600">
            I have an account?{" "}
            <Link
              to="/"
              className="text-orange-600 hover:text-orange-800 font-semibold hover:underline"
            >
              Login Here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
} 