import { useNavigate } from "react-router-dom";

const VendorList = () => {
  const navigate = useNavigate();

  const vendors = [
    { id: 1, name: "Vendor 1" },
    { id: 2, name: "Vendor 2" },
    { id: 3, name: "Vendor 3" },
    { id: 4, name: "Vendor 4" },
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

      {/* Header */}
      <div className="bg-blue-500 text-white text-center py-3 rounded w-1/3 mx-auto mb-10">
        Vendor - Florist
      </div>

      {/* Vendor Cards */}
      <div className="flex justify-center gap-10 flex-wrap">
        {vendors.map((v) => (
          <div
            key={v.id}
            className="bg-blue-600 text-white p-6 rounded-2xl w-56 text-center shadow-lg"
          >
            <h2 className="text-lg mb-3">{v.name}</h2>
            <p className="mb-6">Contact Details</p>

            <button
              onClick={() => navigate(`/user/vendor/${v.id}`)}
              className="bg-white text-black px-4 py-2 border border-green-500"
            >
              Shop Item
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorList;