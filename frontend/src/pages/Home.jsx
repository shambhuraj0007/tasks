import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import UserCard from "./UserCard";
import Navbar from "./Navbar";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    fetchContacts();
  }, []);

  // ✅ Fetch all contacts from backend
  // ✅ Fetch all contacts from backend
const fetchContacts = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contacts`);
    let data;

    try {
      data = await res.json();
    } catch {
      return handleError("Invalid server response while fetching contacts");
    }

    if (!res.ok) {
      return handleError(data.message || "Failed to fetch contacts");
    }

    setUsers(data.contacts || []);
  } catch (err) {
    console.error("Fetch contacts error:", err);
    handleError("Server error while fetching contacts");
  }
};

// ✅ Add user to backend
const handleAddUser = async (e) => {
  e.preventDefault();
  if (!newUser.name || !newUser.email) {
    return handleError("Please fill out both fields");
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newUser.name, email: newUser.email }),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      return handleError("Invalid server response while adding user");
    }

    if (!res.ok) {
      return handleError(data.message || "Failed to add user");
    }

    setUsers((prev) => [...prev, data.contact]);
    setNewUser({ name: "", email: "" });
    handleSuccess("User Added!");
  } catch (err) {
    console.error("Add user error:", err);
    handleError("Server error while adding user");
  }
};

// ✅ Delete user from backend
const handleDeleteUser = async (email) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact/${email}`, {
      method: "DELETE",
    });

    let data;
    try {
      data = await res.json();
    } catch {
      return handleError("Invalid server response while deleting user");
    }

    if (!res.ok) {
      return handleError(data.message || "Failed to delete user");
    }

    setUsers((prev) => prev.filter((u) => u.email !== email));
    handleSuccess("User Deleted!");
  } catch (err) {
    console.error("Delete user error:", err);
    handleError("Server error while deleting user");
  }
};


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  // ✅ Add user to backend

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar username={loggedInUser} handleLogout={handleLogout} />

      {/* Add User Form */}
      <section className="flex justify-center mt-10 px-4">
        <form
          onSubmit={handleAddUser}
          className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl 
                   p-6 flex flex-col sm:flex-row gap-4 w-full max-w-3xl border border-gray-200"
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 
                       focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                       outline-none bg-white shadow-sm text-gray-800"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
          </div>

          <div className="relative flex-1">
            <input
              type="email"
              placeholder="Enter email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 
                       focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                       outline-none bg-white shadow-sm text-gray-800"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 
                     text-white font-semibold shadow-md hover:shadow-lg 
                     hover:scale-[1.02] transition-all duration-300"
          >
            ➕ Add User
          </button>
        </form>
      </section>

      {/* Users Grid */}
      <main className="flex justify-center p-6">
  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
    {users.map((user, idx) => (
      <UserCard
        key={idx}
        name={user.name}
        email={user.email}
        image={user.image}
        expanded={expandedIndex === idx}
        onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
        onDelete={() => handleDeleteUser(user.email)}
      />
    ))}
  </div>
</main>


      <ToastContainer />

      {/* Footer */}
      <footer className="text-center text-gray-600 mt-10">
        <p className="text-sm">© 2025 August 16 Shambhuraj Gadhave. All rights reserved.</p>
        <p>Made in India</p>
      </footer>
    </div>
  );
}

export default Home;
