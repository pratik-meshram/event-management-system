import { useParams } from "react-router-dom";

const VendorProducts = () => {
  const { id } = useParams();

  const products = [
    { id: 1, name: "Product 1", price: 500 },
    { id: 2, name: "Product 2", price: 800 },
    { id: 3, name: "Product 3", price: 1200 },
    { id: 4, name: "Product 4", price: 1500 },
  ];

  return (
    <div className="min-h-screen bg-gray-300 p-6">

      {/* Top Bar */}
      <div className="flex justify-between mb-6">
        <button className="border-2 border-green-500 px-6 py-2 rounded">
          Home
        </button>

        <button className="border-2 border-green-500 px-6 py-2 rounded">
          LogOut
        </button>
      </div>

      {/* Vendor Name */}
      <div className="bg-blue-500 text-white text-center py-3 rounded w-1/4 mx-auto mb-6">
        Vendor {id}
      </div>

      {/* Products Button */}
      <div className="mb-10">
        <button className="bg-blue-500 text-white px-6 py-2 rounded">
          Products
        </button>
      </div>

      {/* Product Cards */}
      <div className="flex justify-center gap-10 flex-wrap">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-blue-600 text-white p-6 rounded-2xl w-56 text-center shadow-lg"
          >
            <h2 className="mb-3">{p.name}</h2>
            <p className="mb-6">₹{p.price}</p>

            <button className="bg-white text-black px-4 py-2 border border-green-500">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorProducts;