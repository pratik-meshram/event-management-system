import { useState } from "react";

const UserDashboard = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-[80%] bg-gray-300 p-6 rounded shadow-lg relative">

        {/* Header */}
        <div className="bg-blue-600 text-white text-center py-3 rounded font-semibold">
          WELCOME USER
        </div>

        {/* Dropdown */}
        {/* <div className="absolute left-4 top-20">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Drop Down
          </button>

          {showDropdown && (
            <div className="bg-blue-200 mt-2 p-4 rounded w-40">
              <p>* Catering</p>
              <p>* Florist</p>
              <p>* Decoration</p>
              <p>* Lighting</p>
            </div>
          )}
        </div> */}

        {/* Buttons Section */}
        <div className="flex justify-center gap-10 mt-16">

          <button className="bg-blue-500 text-white px-8 py-3 rounded hover:bg-blue-600 cursor-pointer">
            Vendor
          </button>

          <button className="bg-blue-500 text-white px-8 py-3 rounded hover:bg-blue-600 cursor-pointer ">
            Cart
          </button>

          <button className="bg-blue-500 text-white px-8 py-3 rounded hover:bg-blue-600 cursor-pointer ">
            Guest List
          </button>

          <button className="bg-blue-500 text-white px-8 py-3 rounded hover:bg-blue-600 cursor-pointer ">
            Order Status
          </button>
        </div>

        {/* Logout */}
        <div className="flex justify-center mt-16">
          <button className="bg-blue-500 text-white px-10 py-3 rounded hover:bg-blue-600 cursor-pointer ">
            LogOut
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;