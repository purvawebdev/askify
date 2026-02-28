import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaPlus,
  FaCommentDots,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronRight,
  FaBars,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { getAllChats } from "../api/chatApi";

// Group chats by time period
const groupChatsByDate = (chats) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const last7 = new Date(today);
  last7.setDate(last7.getDate() - 7);
  const last30 = new Date(today);
  last30.setDate(last30.getDate() - 30);

  const groups = {
    Today: [],
    Yesterday: [],
    "Previous 7 Days": [],
    "Previous 30 Days": [],
    Older: [],
  };

  chats.forEach((chat) => {
    const date = new Date(chat.updatedAt);
    if (date >= today) groups["Today"].push(chat);
    else if (date >= yesterday) groups["Yesterday"].push(chat);
    else if (date >= last7) groups["Previous 7 Days"].push(chat);
    else if (date >= last30) groups["Previous 30 Days"].push(chat);
    else groups["Older"].push(chat);
  });

  // Remove empty groups
  return Object.fromEntries(
    Object.entries(groups).filter(([, items]) => items.length > 0),
  );
};

const Sidebar = ({ isOpen, onToggle }) => {
  const [chats, setChats] = useState([]);
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const { id: activeChatId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getAllChats();
        setChats(data);
      } catch (err) {
        console.error("Failed to load chats", err);
      }
    };
    fetchHistory();
  }, []);

  const handleNewChat = () => {
    // Navigate to the Welcome screen — the chat is created
    // only when the user actually sends a message
    navigate("/chat");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleGroup = (group) => {
    setCollapsedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const grouped = groupChatsByDate(chats);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`
          fixed lg:relative z-30 h-screen flex flex-col
          bg-gray-950 text-white border-r border-gray-800/50
          transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? "w-72 translate-x-0" : "w-0 -translate-x-full lg:w-0 lg:-translate-x-full pointer-events-none"}
        `}
      >
        <div
          className={`flex flex-col h-full ${isOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-200 min-w-[288px]`}
        >
          {/* Header */}
          <div className="p-4 flex items-center justify-between">
            <span className="text-lg font-semibold tracking-tight text-white/90">
              AskifyAI
            </span>
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-gray-800 transition text-gray-400 hover:text-white"
              title="Close sidebar"
            >
              <FaTimes size={14} />
            </button>
          </div>

          {/* New Chat Button */}
          <div className="px-3 pb-3">
            <button
              onClick={handleNewChat}
              className="flex items-center gap-2 justify-center w-full bg-brand hover:bg-brand-dark text-white py-2.5 rounded-xl transition font-medium text-sm shadow-lg shadow-brand/20"
            >
              <FaPlus size={12} /> New Chat
            </button>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto sidebar-scrollbar px-2 pb-2">
            {Object.entries(grouped).map(([group, items]) => (
              <div key={group} className="mb-1">
                {/* Group Header */}
                <button
                  onClick={() => toggleGroup(group)}
                  className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-300 transition"
                >
                  <span>{group}</span>
                  {collapsedGroups[group] ? (
                    <FaChevronRight size={10} />
                  ) : (
                    <FaChevronDown size={10} />
                  )}
                </button>

                {/* Chat Items (collapsible) */}
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    collapsedGroups[group] ? "max-h-0" : "max-h-[2000px]"
                  }`}
                >
                  {items.map((chat) => {
                    const isActive = activeChatId === chat._id;
                    return (
                      <Link
                        key={chat._id}
                        to={`/chat/${chat._id}`}
                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl mx-1 mb-0.5 transition-all duration-150 ${
                          isActive
                            ? "bg-brand/15 text-white border border-brand/30"
                            : "text-gray-400 hover:bg-gray-800/70 hover:text-gray-200 border border-transparent"
                        }`}
                      >
                        <FaCommentDots
                          size={12}
                          className={`shrink-0 ${
                            isActive
                              ? "text-brand"
                              : "text-gray-600 group-hover:text-gray-400"
                          }`}
                        />
                        <span className="truncate text-sm">
                          {chat.title || "New Conversation"}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {chats.length === 0 && (
              <div className="text-center text-gray-600 text-sm mt-8 px-4">
                <FaCommentDots className="mx-auto mb-2 text-2xl" />
                <p>No conversations yet.</p>
                <p className="text-xs mt-1">Start a new chat to begin!</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-800/50">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-gray-500 hover:text-red-400 transition text-sm w-full px-3 py-2.5 rounded-xl hover:bg-gray-800/50"
            >
              <FaSignOutAlt size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
