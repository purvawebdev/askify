import React from "react";

const ChatHeader = ({ title }) => {
  return (
    <div className="p-4 bg-white border-b shadow-sm flex items-center justify-between">
      <h2 className="font-bold text-lg text-gray-800 truncate">
        {title || "New Chat"}
      </h2>
    </div>
  );
};

export default ChatHeader;
