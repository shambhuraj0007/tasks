import React from "react";
import { Mail, Trash2 } from "lucide-react";

const UserCard = ({ name, email, image, onDelete, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between gap-4 
                 hover:shadow-2xl hover:scale-105 transition-all duration-300 
                 w-full max-w-md cursor-pointer"
    >
      {/* Left Section - Avatar + Info */}
      <div className="flex items-center gap-4">
        {/* Avatar / Image */}
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
                       text-white font-bold text-xl animate-gradient-move"
          >
            {name.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Info */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Mail size={16} className="text-blue-500" />
            <span>{email}</span>
          </div>
        </div>
      </div>

      {/* Right Section - Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent card expand/click
          onDelete();
        }}
        className="p-2 rounded-full hover:bg-red-100 transition-colors"
        title="Delete User"
      >
        <Trash2 size={20} className="text-red-500" />
      </button>
    </div>
  );
};

export default UserCard;