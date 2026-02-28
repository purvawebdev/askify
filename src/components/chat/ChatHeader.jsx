import React from "react";
import { FaBars } from "react-icons/fa";

const ChatHeader = ({ title, sidebarOpen, onToggleSidebar }) => {
  return (
    <div className="px-4 py-3 bg-white border-b border-gray-100 flex items-center gap-3">
      {!sidebarOpen && (
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-500 hover:text-gray-700 shrink-0"
          title="Open sidebar"
        >
          <FaBars size={16} />
        </button>
      )}
      <h2 className="font-semibold text-base text-gray-800 truncate">
        {title || "New Chat"}
      </h2>
    </div>
  );
};

export default ChatHeader;
