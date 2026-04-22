export default function VendorHome() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4 py-8">

      <div className="w-full max-w-[800px] bg-blue-600 p-6 sm:p-10 rounded-md">

        {/* Welcome */}
        <div className="bg-gray-300 text-center py-4 mb-8 rounded">
          <h2 className="text-lg font-medium">Welcome</h2>
          <p className="font-semibold">Vendor</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-0 sm:justify-between">
          {["Your Item", "Add New Item", "Transaction", "Logout"].map((label) => (
            <button
              key={label}
              className="flex-1 min-w-[120px] sm:flex-none px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 transition cursor-pointer"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}