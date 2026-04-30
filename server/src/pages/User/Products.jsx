import { useEffect, useState } from "react";
import { ShoppingCart, Search, Star } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout";
import API from "../../api/axios";
import toast from "react-hot-toast";

// Original product images using simple geometric patterns
const productImages = {
  default: (color) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <rect width="200" height="200" fill={color + "15"} />
      <circle cx="100" cy="100" r="40" fill={color + "40"} />
      <circle cx="100" cy="100" r="20" fill={color} />
    </svg>
  ),
  pattern1: (color) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <rect width="200" height="200" fill={color + "15"} />
      <rect x="60" y="60" width="80" height="80" fill={color + "40"} rx="8" />
      <rect x="80" y="80" width="40" height="40" fill={color} rx="4" />
    </svg>
  ),
  pattern2: (color) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <rect width="200" height="200" fill={color + "15"} />
      <polygon points="100,40 160,160 40,160" fill={color + "40"} />
      <polygon points="100,80 130,140 70,140" fill={color} />
    </svg>
  ),
};

const productColors = ["#7c3aed", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);
  const [search, setSearch] = useState("");
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    API.get("/auth/me").then(r => setUserName(r.data?.name || "User")).catch(() => {});
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try { 
      setLoading(true); 
      const res = await API.get("/products"); 
      setProducts(res.data || []); 
    }
    catch { toast.error("Failed to load products"); }
    finally { setLoading(false); }
  };

  const addToCart = async (productId) => {
    try { 
      setAddingId(productId); 
      await API.post("/cart", { productId, quantity: 1 }); 
      toast.success("Added to cart"); 
    }
    catch (err) { toast.error(err.response?.data?.msg || "Failed"); }
    finally { setAddingId(null); }
  };

  const filtered = products.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));

  const getProductImage = (index) => {
    const patterns = [productImages.default, productImages.pattern1, productImages.pattern2];
    const pattern = patterns[index % patterns.length];
    const color = productColors[index % productColors.length];
    return pattern(color);
  };

  return (
    <DashboardLayout role="user" userName={userName}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Marketplace</h2>
        <p className="text-gray-600 text-sm mt-1">{products.length} items available</p>
      </div>

      {/* Search */}
      <div className="card p-4 mb-6">
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            placeholder="Search items..." 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white text-gray-900 placeholder-gray-400" 
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="card p-20 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <ShoppingCart size={28} className="text-gray-300" />
          </div>
          <p className="text-gray-500 font-medium">No items found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((p, idx) => (
            <div key={p._id} className="card p-4 flex flex-col group">
              <div className="h-40 rounded-lg overflow-hidden mb-3 bg-gray-50">
                {getProductImage(idx)}
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{p.name}</h3>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={i < 4 ? "text-amber-400 fill-amber-400" : "text-gray-300"} />
                ))}
                <span className="text-xs text-gray-500 ml-1">(4.0)</span>
              </div>
              <p className="text-purple-600 font-bold text-lg mb-3">₹{p.price}</p>
              {p.status && (
                <span className={`text-xs px-2 py-1 rounded-md w-fit font-medium mb-3 capitalize
                  ${p.status === "active" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                  {p.status}
                </span>
              )}
              <button 
                onClick={() => addToCart(p._id)} 
                disabled={addingId === p._id}
                className="mt-auto w-full btn-primary py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50">
                <ShoppingCart size={16} />
                {addingId === p._id ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
