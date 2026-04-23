import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import toast from "react-hot-toast";

export default function ManageUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [activeSection, setActiveSection] = useState("userUpdate");
  const [loadingUsers, setLoadingUsers] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);

      const res = await API.get("/admin/users");

      const userData = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.users)
          ? res.data.users
          : [];

      setUsers(userData);
    } catch (error) {
      console.error("Fetch users error:", error.response?.data || error.message);
      toast.error(error.response?.data?.msg || "Failed to load users");
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleAddUser = async () => {
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await API.post("/admin/users", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "user",
      });

      toast.success("User added successfully");
      setForm({ name: "", email: "", password: "" });

      await fetchUsers();
      setActiveSection("userUpdate");
    } catch (error) {
      console.error("Add user error:", error.response?.data || error.message);
      toast.error(error.response?.data?.msg || "Failed to add user");
    }
  };

  const handleDeleteUser = async (id) => {
    const ok = window.confirm("Delete this user?");
    if (!ok) return;

    try {
      await API.delete(`/admin/users/${id}`);
      toast.success("User deleted");

      await fetchUsers();
      setActiveSection("userUpdate");
    } catch (error) {
      console.error("Delete user error:", error.response?.data || error.message);
      toast.error(error.response?.data?.msg || "Failed to delete user");
    }
  };

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  const buttonClass =
    "bg-[#f7f7f7] border-2 border-lime-500 rounded-xl text-black hover:bg-white transition";
  const smallButtonClass = `${buttonClass} w-[135px] h-[42px] text-[17px]`;
  const leftButtonClass = `${buttonClass} h-[42px] text-[17px] px-4`;

  return (
    <div className="min-h-screen bg-[#d9d9d9] p-2 md:p-4">
      <div className="w-full max-w-[720px] min-h-[310px] mx-auto bg-[#cfcfcf] border border-gray-400 relative px-4 py-4 md:px-6">
        {/* top row */}
        <button
          type="button"
          onClick={() => navigate("/admin")}
          className={`absolute top-4 left-4 md:left-8 w-[135px] h-[44px] text-[18px] ${buttonClass}`}
        >
          Home
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className={`absolute top-4 right-4 md:right-8 w-[135px] h-[44px] text-[18px] ${buttonClass}`}
        >
          LogOut
        </button>

        {/* wireframe button area */}
        <div className="pt-20 w-full">

          {/*  */}
          <div className="w-full bg-gray-700 text-white py-10 flex flex-col md:flex-row justify-around items-center gap-10">

            {/* MEMBERSHIP */}
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-xl font-semibold">Membership</h2>

              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/admin/membership")}
                  className="px-6 py-2 bg-white text-black rounded"
                >
                  Add
                </button>

                <button
                  onClick={() => navigate("/admin/membership")}
                  className="px-6 py-2 bg-white text-black rounded"
                >
                  Update
                </button>
              </div>
            </div>

            {/* USER MANAGEMENT */}
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-xl font-semibold">User Management</h2>

              <div className="flex gap-4">
                <button
                  onClick={() => setActiveSection("userAdd")}
                  className="px-6 py-2 bg-white text-black rounded"
                >
                  Add
                </button>

                <button
                  onClick={async () => {
                    setActiveSection("userUpdate");
                    await fetchUsers();
                  }}
                  className="px-6 py-2 bg-white text-black rounded"
                >
                  Update
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* content */}
        <div className="mt-8">
          {activeSection === "userAdd" && (
            <div className="bg-white rounded-xl shadow p-5 mt-4">
              <h2 className="text-xl font-semibold mb-4 text-center">Add User</h2>

              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="User Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border p-3 rounded outline-none"
                />

                <input
                  type="email"
                  placeholder="User Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="border p-3 rounded outline-none"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="border p-3 rounded outline-none"
                />
              </div>

              <div className="mt-5 text-center">
                <button
                  type="button"
                  onClick={handleAddUser}
                  className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
                >
                  Add User
                </button>
              </div>
            </div>
          )}

          {activeSection === "userUpdate" && (
            <div className="bg-white rounded-xl shadow p-5 mt-4 overflow-x-auto">
              <h2 className="text-xl font-semibold mb-4 text-center">
                User Management
              </h2>

              {loadingUsers ? (
                <p className="text-center text-gray-500">Loading users...</p>
              ) : users.length === 0 ? (
                <p className="text-center text-gray-500">No users found</p>
              ) : (
                <table className="w-full border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-3 text-left">Name</th>
                      <th className="border p-3 text-left">Email</th>
                      <th className="border p-3 text-left">Role</th>
                      <th className="border p-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((item) => (
                      <tr key={item._id}>
                        <td className="border p-3">{item.name}</td>
                        <td className="border p-3">{item.email}</td>
                        <td className="border p-3">{item.role}</td>
                        <td className="border p-3">
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(item._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeSection === "" && (
            <div className="mt-8 text-center text-gray-700">
              Select Add or Update under User Management
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
