import { useState } from "react";

const OrderSuccessPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    number: "",
    state: "",
    pin: "",
    payment: "cash",
    total: 500,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.address ||
      !form.city ||
      !form.number ||
      !form.state ||
      !form.pin
    ) {
      alert("All fields are required!");
      return;
    }

    setShowPopup(true);
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center p-4">

      {/* ================= FORM ================= */}
      {!showPopup && (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl bg-gray-200 p-4 sm:p-6 md:p-10 rounded-lg shadow-lg"
        >
          <h2 className="text-center text-lg sm:text-xl mb-6">Checkout</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-blue-500 text-white placeholder-white"
            />

            <input
              name="number"
              placeholder="Number"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-blue-500 text-white placeholder-white"
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-blue-500 text-white placeholder-white"
            />

            <select
              name="payment"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-blue-500 text-white"
            >
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
            </select>

            <input
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-blue-500 text-white placeholder-white"
            />

            <input
              name="state"
              placeholder="State"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-blue-500 text-white placeholder-white"
            />

            <input
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-blue-500 text-white placeholder-white"
            />

            <input
              name="pin"
              placeholder="Pin Code"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-blue-500 text-white placeholder-white"
            />

          </div>

          {/* Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-10 py-2 sm:py-3 rounded-lg hover:bg-blue-700"
            >
              Order Now
            </button>
          </div>
        </form>
      )}

      {/* ================= POPUP ================= */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

          <div className="bg-gray-200 w-full max-w-3xl p-4 sm:p-6 rounded-lg shadow-lg">

            <h2 className="text-center text-base sm:text-lg mb-2">PopUp</h2>
            <h3 className="text-center text-lg sm:text-xl mb-6">THANK YOU</h3>

            {/* Total */}
            <div className="bg-blue-500 text-white text-center py-3 rounded mb-6 text-sm sm:text-base">
              Total Amount: ₹{form.total}
            </div>

            {/* Data Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

              <div className="bg-blue-500 p-3 text-white rounded text-sm sm:text-base">
                Name: {form.name}
              </div>

              <div className="bg-blue-500 p-3 text-white rounded text-sm sm:text-base">
                Number: {form.number}
              </div>

              <div className="bg-blue-500 p-3 text-white rounded text-sm sm:text-base">
                Email: {form.email}
              </div>

              <div className="bg-blue-500 p-3 text-white rounded text-sm sm:text-base">
                Payment: {form.payment}
              </div>

              <div className="bg-blue-500 p-3 text-white rounded text-sm sm:text-base">
                Address: {form.address}
              </div>

              <div className="bg-blue-500 p-3 text-white rounded text-sm sm:text-base">
                State: {form.state}
              </div>

              <div className="bg-blue-500 p-3 text-white rounded text-sm sm:text-base">
                City: {form.city}
              </div>

              <div className="bg-blue-500 p-3 text-white rounded text-sm sm:text-base">
                Pin: {form.pin}
              </div>

            </div>

            {/* Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowPopup(false)}
                className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-10 py-2 sm:py-3 rounded-lg hover:bg-blue-700"
              >
                Continue Shopping
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default OrderSuccessPopup;