import { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product Name",
      price: 100,
      quantity: 2,
      image: "Image",
    },
  ]);

  const updateQuantity = (id, value) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Number(value) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const deleteAll = () => {
    setCartItems([]);
  };

  const grandTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-300 p-4 sm:p-6">

      {/* Top Buttons */}
      <div className="flex flex-wrap justify-center sm:justify-between gap-3 mb-6">
        {["Home", "View Product", "Request Item", "Product Status", "LogOut"].map((btn) => (
          <button key={btn} className="border-2 border-green-500 px-3 sm:px-4 py-2 rounded text-sm sm:text-base">
            {btn}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="bg-blue-400 text-center py-3 rounded w-full sm:w-1/2 md:w-1/3 mx-auto mb-8 text-sm sm:text-base">
        Shopping Cart
      </div>

      {/* Table Header (hide on mobile) */}
      <div className="hidden md:grid grid-cols-6 gap-4 text-center mb-4">
        {["Image", "Name", "Price", "Quantity", "Total Price", "Action"].map((h) => (
          <div key={h} className="bg-blue-500 text-white p-3 rounded">
            {h}
          </div>
        ))}
      </div>

      {/* Cart Items */}
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="bg-blue-600 text-white rounded-xl p-4 mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 text-center"
        >
          <div>{item.image}</div>
          <div>{item.name}</div>
          <div>₹{item.price}</div>

          <div>
            <select
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, e.target.value)}
              className="text-black p-1 rounded"
            >
              {[1, 2, 3, 4, 5].map((q) => (
                <option key={q}>{q}</option>
              ))}
            </select>
          </div>

          <div>₹{item.price * item.quantity}</div>

          <div>
            <button
              onClick={() => removeItem(item.id)}
              className="bg-white text-black px-3 py-1 border border-green-500"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Grand Total */}
      <div className="bg-blue-600 text-white p-4 rounded flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
        <h2>Grand Total</h2>

        <div className="flex items-center gap-4">
          <span>₹{grandTotal}</span>
          <button
            onClick={deleteAll}
            className="bg-white text-black px-4 py-2 border border-green-500"
          >
            Delete All
          </button>
        </div>
      </div>

      {/* Checkout */}
      <div className="flex justify-center mt-8">
        <button className="border-2 border-green-500 px-6 sm:px-10 py-3 rounded text-sm sm:text-base cursor-pointer">
          Proceed to CheckOut
        </button>
      </div>

    </div>
  );
};

export default Cart;