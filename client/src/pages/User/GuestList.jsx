import { useState } from "react";

const GuestList = () => {
  const [guests, setGuests] = useState([
    { id: 1, name: "Rahul", phone: "9876543210", persons: 2 },
  ]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    persons: "",
  });

  const [editId, setEditId] = useState(null);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add / Update Guest
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.persons) {
      alert("All fields required!");
      return;
    }

    if (editId) {
      // Update
      setGuests(
        guests.map((g) =>
          g.id === editId ? { ...form, id: editId } : g
        )
      );
      setEditId(null);
    } else {
      // Add
      setGuests([...guests, { ...form, id: Date.now() }]);
    }

    setForm({ name: "", phone: "", persons: "" });
  };

  // Delete
  const deleteGuest = (id) => {
    setGuests(guests.filter((g) => g.id !== id));
  };

  // Edit
  const editGuest = (guest) => {
    setForm(guest);
    setEditId(guest.id);
  };

  return (
    <div className="min-h-screen bg-gray-300 p-4 sm:p-6">

      {/* Header */}
      <div className="flex justify-center mb-6">
        <div className="bg-blue-600 text-white px-6 py-2 rounded">
          Guest List
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 p-4 sm:p-6 rounded shadow mb-8 max-w-3xl mx-auto"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="p-3 rounded bg-blue-500 text-white placeholder-white w-full"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="p-3 rounded bg-blue-500 text-white placeholder-white w-full"
          />

          <input
            type="number"
            name="persons"
            placeholder="Persons"
            value={form.persons}
            onChange={handleChange}
            className="p-3 rounded bg-blue-500 text-white placeholder-white w-full"
          />
        </div>

        <div className="flex justify-center mt-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded">
            {editId ? "Update Guest" : "Add Guest"}
          </button>
        </div>
      </form>

      {/* Guest List */}
      <div className="max-w-4xl mx-auto">

        {/* Header (desktop only) */}
        <div className="hidden md:grid grid-cols-4 gap-4 text-center mb-4">
          {["Name", "Phone", "Persons", "Action"].map((h) => (
            <div key={h} className="bg-blue-600 text-white py-2 rounded">
              {h}
            </div>
          ))}
        </div>

        {/* List */}
        {guests.map((g) => (
          <div
            key={g.id}
            className="bg-blue-500 text-white p-4 rounded mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center"
          >
            <div>
              <span className="md:hidden font-semibold">Name: </span>
              {g.name}
            </div>

            <div>
              <span className="md:hidden font-semibold">Phone: </span>
              {g.phone}
            </div>

            <div>
              <span className="md:hidden font-semibold">Persons: </span>
              {g.persons}
            </div>

            <div className="flex justify-center gap-2">
              <button
                onClick={() => editGuest(g)}
                className="bg-yellow-400 text-black px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteGuest(g.id)}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default GuestList;