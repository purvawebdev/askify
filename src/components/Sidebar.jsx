import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaMicrophoneSlash, FaSignOutAlt } from "react-icons/fa";
import api from "../api/axios";

const Sidebar = () => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  // Fetch History
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/chat");
        setChats(res.data);
      } catch (err) {
        console.error("Failed to load chats", err);
      }
    };
    fetchHistory();
  }, []);

  const handleNewChat = async () => {
    try {
      const res = await api.post("/chat/new");
      navigate(`/chat/${res.data.chatId}`);
    } catch (err) {
      console.error("Failed to create new chat", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-gray-900 h-screen text-white flex flex-col border-r border-gray-800">
      {/* 1. New Chat Button */}
      <div className="p-4">
        <button
          onClick={handleNewChat}
          className="flex items-center gap-2 justify-center w-full bg-brand hover:bg-brand-dark text-white py-3 rounded-lg transition font-medium"
        >
          <FaPlus /> New Chat
        </button>
      </div>

      {/* 2. Chat List (Scrollable) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-2">
        <div className="space-y-1">
          {chats.map((chat) => (
            <Link
              key={chat._id}
              to={`/chat/${chat._id}`}
              className="block p-3 rounded-lg hover:bg-gray-800 transition text-gray-300 hover:text-white"
            >
              <div className="flex items-center gap-3">
                <FaMicrophoneSlash className="text-sm" />
                <span className="truncate text-sm">
                  {chat.title || "New Conversation"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Footer / Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm w-full"
        >
          <FaSignOutAlt /> Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
