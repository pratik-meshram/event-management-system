import { useState } from "react";

const Checkout = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    number: "",
    state: "",
    pin: "",
    payment: "cash",
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

    console.log(form);
    alert("Order Placed ✅");
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-gray-200 p-6 md:p-10 rounded-lg shadow-lg"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="bg-blue-500 text-white px-10 py-2 rounded inline-block mb-4">
            Item
          </div>
          <br />
          <div className="bg-blue-500 text-white px-8 py-2 rounded inline-block">
            Details
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="bg-blue-500 text-white placeholder-white p-4 rounded-lg"
          />

          <input
            type="text"
            name="number"
            placeholder="Number"
            onChange={handleChange}
            className="bg-blue-500 text-white placeholder-white p-4 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={handleChange}
            className="bg-blue-500 text-white placeholder-white p-4 rounded-lg"
          />

          {/* Payment Dropdown */}
          <select
            name="payment"
            onChange={handleChange}
            className="bg-blue-500 text-white p-4 rounded-lg"
          >
            <option value="cash">Cash</option>
            <option value="upi">UPI</option>
          </select>

          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="bg-blue-500 text-white placeholder-white p-4 rounded-lg"
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            onChange={handleChange}
            className="bg-blue-500 text-white placeholder-white p-4 rounded-lg"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            className="bg-blue-500 text-white placeholder-white p-4 rounded-lg"
          />

          <input
            type="text"
            name="pin"
            placeholder="Pin Code"
            onChange={handleChange}
            className="bg-blue-500 text-white placeholder-white p-4 rounded-lg"
          />
        </div>

        {/* Button */}
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="bg-blue-600 text-white px-10 py-3 rounded-lg hover:bg-blue-700"
          >
            Order Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;