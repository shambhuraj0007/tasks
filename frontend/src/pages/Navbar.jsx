import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ username, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Tailwind classes
  const linkClasses =
    "relative transition text-gray-300 hover:text-white after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 after:bg-gradient-to-r after:from-pink-500 after:to-orange-500 after:transition-all after:duration-300 hover:after:w-full";
  const activeClasses =
    "text-white font-semibold after:w-full after:bg-gradient-to-r after:from-pink-500 after:to-orange-500";

  return (
    <header className="shadow-lg bg-gray-900 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left: Welcome */}
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          Welcome,{" "}
          <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
            {username}
          </span>
        </h1>

        {/* Desktop Actions */}
        <div className="hidden md:flex space-x-8 items-center">
          <nav className="flex space-x-8 text-lg font-medium">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? `${activeClasses}` : `${linkClasses}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/About"
              className={({ isActive }) =>
                isActive ? `${activeClasses}` : `${linkClasses}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? `${activeClasses}` : `${linkClasses}`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-pink-500 to-orange-500 shadow-lg hover:scale-105 transition-transform"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 shadow-lg">
          <nav className="flex flex-col space-y-6 py-6 px-6 text-gray-300 text-lg font-medium">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="hover:text-white transition relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 after:bg-gradient-to-r after:from-pink-500 after:to-orange-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Home
            </Link>
            <Link
              to="/About"
              onClick={() => setIsOpen(false)}
              className="hover:text-white transition relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 after:bg-gradient-to-r after:from-pink-500 after:to-orange-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="hover:text-white transition relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 after:bg-gradient-to-r after:from-pink-500 after:to-orange-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact
            </Link>

            {/* Logout */}
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="px-5 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-pink-500 to-orange-500 shadow-lg hover:scale-105 transition-transform"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
