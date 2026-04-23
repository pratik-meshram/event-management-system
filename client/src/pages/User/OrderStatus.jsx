import { useState } from "react";

const OrderStatus = () => {
  const [orders] = useState([
    {
      id: 1,
      name: "Pratik",
      email: "pratik@mail.com",
      address: "Nagpur",
      status: "Processing",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-300 p-4 sm:p-6">

      {/* Top Bar */}
      <div className="flex justify-between mb-6">
        <button className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg">
          Home
        </button>

        <button className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg">
          LogOut
        </button>
      </div>

      {/* Header */}
      <div className="flex justify-center mb-10">
        <div className="bg-blue-600 text-white px-6 sm:px-12 py-2 sm:py-3 rounded-lg text-sm sm:text-base">
          User Order Status
        </div>
      </div>

      {/* Table Header (hide on mobile) */}
      <div className="hidden md:grid grid-cols-4 gap-4 mb-6 text-center">
        {["Name", "E-mail", "Address", "Status"].map((item) => (
          <div
            key={item}
            className="bg-blue-600 text-white py-3 rounded-lg"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Orders List */}
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-blue-500 text-white rounded-xl p-4 mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center"
        >
          <div>
            <span className="md:hidden font-semibold">Name: </span>
            {order.name}
          </div>

          <div>
            <span className="md:hidden font-semibold">Email: </span>
            {order.email}
          </div>

          <div>
            <span className="md:hidden font-semibold">Address: </span>
            {order.address}
          </div>

          <div>
            <span className="md:hidden font-semibold">Status: </span>
            <span
              className={`px-3 py-1 rounded ${
                order.status === "Completed"
                  ? "bg-green-500"
                  : order.status === "Processing"
                  ? "bg-yellow-500 text-black"
                  : "bg-red-500"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatus;