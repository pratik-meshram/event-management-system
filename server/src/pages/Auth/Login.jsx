import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import API from "../../api/axios";
import toast from "react-hot-toast";

const DEMO_ACCOUNTS = [
  { role: "Admin",  email: "admin@ems.com",    color: "#7c3aed" },
  { role: "Vendor", email: "priya@vendor.com", color: "#06b6d4" },
  { role: "User",   email: "arjun@user.com",   color: "#10b981" },
];

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const login = async () => {
    if (!data.email || !data.password) return toast.error("Please fill all fields");
    try {
      setLoading(true);
      const res = await API.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      const role = JSON.parse(atob(res.data.token.split(".")[1])).role;
      toast.success(`Welcome back! Redirecting...`);
      setTimeout(() => {
        if (role === "admin") window.location.href = "/admin";
        else if (role === "vendor") window.location.href = "/vendor";
        else window.location.href = "/user";
      }, 600);
    } catch (err) {
      toast.error(err?.response?.data?.msg || err?.response?.data?.message || "Invalid credentials");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #e8edf2 100%)" }}>
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-purple-600 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 text-sm mt-1">Sign in to your account</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={data.email}
                  onChange={e => setData({ ...data, email: e.target.value })}
                  onKeyDown={e => e.key === "Enter" && login()}
                  className="w-full pl-11 pr-4 py-3 rounded-lg text-sm text-gray-900 placeholder-gray-400 border border-gray-200 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={data.password}
                  onChange={e => setData({ ...data, password: e.target.value })}
                  onKeyDown={e => e.key === "Enter" && login()}
                  className="w-full pl-11 pr-11 py-3 rounded-lg text-sm text-gray-900 placeholder-gray-400 border border-gray-200 bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              onClick={login}
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-medium text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60 btn-primary"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <> Sign In <ArrowRight size={18} /> </>
              )}
            </button>
          </div>

          {/* Demo accounts */}
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-500 text-xs font-medium">Quick Demo</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {DEMO_ACCOUNTS.map(({ role, email, color }) => (
                <button
                  key={role}
                  onClick={() => setData({ email, password: "password123" })}
                  className="py-2 px-3 rounded-lg text-xs font-semibold transition-all hover:scale-105 border-2"
                  style={{ borderColor: color, color }}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Sign up link */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="font-semibold text-purple-600 hover:text-purple-700"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
