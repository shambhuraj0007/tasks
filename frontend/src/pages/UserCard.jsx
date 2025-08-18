import React from "react";
import { Mail, Trash2 } from "lucide-react";

const UserCard = ({ name, email, image, onDelete, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200
                 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4
                 w-full max-w-3xl mx-auto transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
    >
      {/* Left Section - Avatar + Info */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
          />
        ) : (
          <div
            className="flex-shrink-0 w-14 h-14 rounded-full 
                        bg-gradient-to-r from-blue-500 to-indigo-500 
                        flex items-center justify-center 
                        text-white font-bold text-xl"
          >
            {name.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="flex flex-col min-w-0">
          {/* Name */}
          <h2 className="text-lg font-semibold text-gray-800 break-words">
            {name}
          </h2>

          {/* Email */}
          <div className="flex items-center gap-2 text-gray-600 text-sm break-words">
            <Mail size={16} className="text-blue-500 flex-shrink-0" />
            <span className="break-words">{email}</span>
          </div>
        </div>
      </div>

      {/* Right Section - Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-red-50 text-red-600 
                   hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
        title="Delete User"
      >
        <Trash2 size={18} />
        <span className="sm:hidden">Delete</span>
      </button>
    </div>
  );
};

export default UserCard;
