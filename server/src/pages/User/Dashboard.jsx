import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, ClipboardList, Store, CalendarDays, Ticket, ArrowRight } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout";
import API from "../../api/axios";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [categories, setCategories] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [bookingCount, setBookingCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    API.get("/auth/me").then(r => setUserName(r.data?.name || "User")).catch(() => {});
    API.get("/user/categories").then(r => setCategories(r.data || [])).catch(() => {});
    API.get("/events?status=upcoming").then(r => setUpcomingEvents((r.data || []).slice(0, 3))).catch(() => {});
    API.get("/bookings/my").then(r => setBookingCount((r.data || []).length)).catch(() => {});
    API.get("/cart").then(r => {
      const items = r.data?.cart?.items || r.data?.items || (Array.isArray(r.data) ? r.data : []);
      setCartCount(items.length);
    }).catch(() => {});
  }, []);

  const quickLinks = [
    { label: "Browse Events", icon: CalendarDays, path: "/user/events", color: "#7c3aed", count: null },
    { label: "My Bookings", icon: Ticket, path: "/user/bookings", color: "#06b6d4", count: bookingCount },
    { label: "Shopping Cart", icon: ShoppingCart, path: "/user/cart", color: "#10b981", count: cartCount },
    { label: "My Orders", icon: ClipboardList, path: "/user/orders", color: "#f59e0b", count: null },
  ];

  return (
    <DashboardLayout role="user" userName={userName}>
      {/* Welcome */}
      <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white">
        <h2 className="text-2xl font-bold mb-1">Welcome back, {userName}!</h2>
        <p className="text-purple-100 text-sm">Discover events and shop from our marketplace</p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickLinks.map(({ label, icon: Icon, path, color, count }) => (
          <button key={path} onClick={() => navigate(path)}
            className="stat-card text-left flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 relative" 
              style={{ background: color + "15" }}>
              <Icon size={22} style={{ color }} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm">{label}</p>
              <p className="text-gray-500 text-xs mt-0.5">View details</p>
            </div>
            <ArrowRight size={16} className="text-gray-300 group-hover:text-gray-600 transition shrink-0" />
          </button>
        ))}
      </div>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-lg">Upcoming Events</h3>
            <button onClick={() => navigate("/user/events")}
              className="text-purple-600 text-sm font-medium hover:text-purple-700 flex items-center gap-1">
              View all <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {upcomingEvents.map(event => (
              <div key={event._id} className="card p-4 hover:shadow-md transition cursor-pointer group"
                onClick={() => navigate(`/user/events/${event._id}`)}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-purple-50">
                    📅
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate group-hover:text-purple-600 transition">{event.title}</p>
                    <p className="text-xs text-gray-500 capitalize">{event.category}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">
                    {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </span>
                  <span className="text-purple-600 font-bold text-sm">
                    {event.price > 0 ? `₹${event.price}` : "Free"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vendor Categories */}
      {categories.length > 0 && (
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Store size={20} className="text-purple-600" />
            <h3 className="font-bold text-gray-900 text-lg">Browse by Category</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map((cat, i) => {
              const colors = ["#7c3aed", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
              const color = colors[i % colors.length];
              return (
                <button key={cat} onClick={() => navigate(`/user/vendors/${cat.toLowerCase()}`)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition group">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-lg font-bold"
                    style={{ background: color }}>
                    {cat.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-semibold text-gray-700 capitalize group-hover:text-purple-600 transition">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
