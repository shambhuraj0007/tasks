import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import UserCard from "./UserCard";
import Navbar from "./Navbar";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [users, setUsers] = useState([
  {
    name: "Shambhuraj Patil",
    email: "shambhuraj@example.com",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Aditi Sharma",
    email: "aditi@example.com",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Rahul Deshmukh",
    email: "rahul@example.com", 
  },
  {
    name: "Sneha Kulkarni",
    email: "sneha.kulkarni@example.com",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Arjun Reddy",
    email: "arjun.reddy@example.com",
    image: "https://i.pravatar.cc/150?img=4",
  },
  {
    name: "Priya Nair",
    email: "priya.nair@example.com",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Rohit Verma",
    email: "rohit.verma@example.com",
  },
  {
    name: "Kavya Iyer",
    email: "kavya.iyer@example.com",
    image: "https://i.pravatar.cc/150?img=6",
  },
  {
    name: "Aniket Joshi",
    email: "aniket.joshi@example.com",
    image: "https://i.pravatar.cc/150?img=7",
  },
]);


  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      return handleError("Please fill out both fields");
    }
    setUsers([...users, { ...newUser }]);
    setNewUser({ name: "", email: "" });
    handleSuccess("User Added!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     <Navbar username={loggedInUser} handleLogout={handleLogout} />

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
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        👤
      </span>
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
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        ✉️
      </span>
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
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl relative">
    {users.map((user, idx) => (
      <UserCard
        key={idx}
        name={user.name}
        email={user.email}
        image={user.image}
        expanded={expandedIndex === idx}
        onClick={() =>
          setExpandedIndex(expandedIndex === idx ? null : idx)
        }
      />
    ))}
  </div>
</main>
     


      <ToastContainer />
      {/* Footer */}
      <footer className="text-center text-gray-600 mt-10">
        <p className="text-sm">© 2025 Auguest 16 Shambhuraj Gadhave. All rights reserved.</p>
        <p>Made in India</p>
      </footer>
    </div>
  );
}

export default Home;
