import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, Store, CreditCard, ShoppingCart,
  Package, ClipboardList, LogOut, Menu, X,
  CalendarDays, Ticket, UserCheck, ShoppingBag, Plus,
} from "lucide-react";

const roleMenus = {
  admin: [
    { label: "Dashboard",         icon: LayoutDashboard, path: "/admin" },
    { label: "Users",             icon: Users,           path: "/admin/users" },
    { label: "Vendors",           icon: Store,           path: "/admin/vendors" },
    { label: "Events",            icon: CalendarDays,    path: "/admin/events" },
    { label: "Bookings",          icon: Ticket,          path: "/admin/bookings" },
    { label: "Orders",            icon: ShoppingBag,     path: "/admin/orders" },
    { label: "Memberships",       icon: CreditCard,      path: "/admin/membership" },
  ],
  vendor: [
    { label: "Dashboard",    icon: LayoutDashboard, path: "/vendor" },
    { label: "Events",       icon: CalendarDays,    path: "/vendor/events" },
    { label: "Products",     icon: Package,         path: "/vendor/view-product" },
    { label: "Orders",       icon: ClipboardList,   path: "/vendor/orders" },
    { label: "Transactions", icon: CreditCard,      path: "/vendor/transaction" },
  ],
  user: [
    { label: "Dashboard",     icon: LayoutDashboard, path: "/user" },
    { label: "Marketplace",   icon: Store,           path: "/user/products" },
    { label: "Cart",          icon: ShoppingCart,    path: "/user/cart" },
    { label: "Events",        icon: CalendarDays,    path: "/user/events" },
    { label: "Bookings",      icon: Ticket,          path: "/user/bookings" },
    { label: "Orders",        icon: ClipboardList,   path: "/user/orders" },
  ],
};

const roleColors = {
  admin:  { color: "#7c3aed", label: "Admin" },
  vendor: { color: "#06b6d4", label: "Vendor" },
  user:   { color: "#10b981", label: "Customer" },
};

export default function DashboardLayout({ children, role = "user", userName = "User" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menu = roleMenus[role] || [];
  const { color, label } = roleColors[role] || roleColors.user;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: color }}>
            E
          </div>
          <div>
            <p className="text-gray-900 font-bold text-sm leading-none">EventHub</p>
            <p className="text-gray-500 text-xs mt-0.5">{label}</p>
          </div>
        </div>
      </div>

      {/* User info */}
      <div className="px-5 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0"
            style={{ background: color }}>
            {userName?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="min-w-0">
            <p className="text-gray-900 text-sm font-semibold truncate">{userName}</p>
            <p className="text-gray-500 text-xs">{label}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menu.map(({ label, icon: Icon, path }) => (
          <button key={path} onClick={() => { navigate(path); setSidebarOpen(false); }}
            className={`sidebar-link w-full text-left ${isActive(path) ? "active" : ""}`}>
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gray-200">
        <button onClick={handleLogout}
          className="sidebar-link w-full text-left hover:!bg-red-50 hover:!text-red-600">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  const currentLabel = menu.find(m => isActive(m.path))?.label || "Dashboard";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-white border-r border-gray-200 fixed top-0 left-0 h-full z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-60 bg-white h-full z-50 flex flex-col">
            <button onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 z-10">
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-900">
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-gray-900 font-bold text-base">{currentLabel}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold text-sm"
              style={{ background: color }}>
              {userName?.charAt(0)?.toUpperCase() || "U"}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
