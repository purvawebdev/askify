import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { FaUser, FaRobot, FaPaperPlane } from "react-icons/fa";

const ChatWindow = () => {
  const { id } = useParams(); // Get Chat ID from URL (e.g. /chat/123)
  const [chat, setChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Ref for auto-scrolling to bottom
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 1. Fetch Chat History when ID changes
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await api.get(`/chat/${id}`);
        setChat(res.data);
      } catch (err) {
        console.error("Failed to load chat", err);
      }
    };
    if (id) fetchChat();
  }, [id]);

  // 2. Auto-scroll whenever messages update
  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  // 3. Send Message Handler
  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setNewMessage("");
    setLoading(true);

    try {
      // Send message and get updated chat with AI response
      const response = await api.post("/chat", {
        message: newMessage,
        chatId: id,
      });

      // Update chat with the complete conversation
      setChat(response.data.chat);
    } catch (err) {
      console.error("Failed to send message", err);
      // Revert optimistic update on error
      setChat((prev) => ({
        ...prev,
        messages: prev.messages.slice(0, -1),
      }));
    } finally {
      setLoading(false);
    }
  };

  if (!chat)
    return <div className="p-10 text-gray-500">Loading conversation...</div>;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="p-4 bg-white border-b shadow-sm flex items-center justify-between">
        <h2 className="font-bold text-lg text-gray-800 truncate">
          {chat.title || "New Chat"}
        </h2>
        <span className="text-xs text-gray-400">ID: {id}</span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {chat.messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === "user"
                  ? "bg-brand text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {msg.role === "user" ? (
                <FaUser className="text-sm" />
              ) : (
                <FaRobot className="text-sm" />
              )}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[70%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === "user"
                  ? "bg-brand text-white rounded-tr-none"
                  : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Loading Bubble */}
        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <FaRobot className="text-gray-600 animate-pulse" />
            </div>
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 text-gray-400 text-sm">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-brand focus:ring-2 outline-none bg-gray-50"
          />
          <button
            type="submit"
            disabled={loading || !newMessage.trim()}
            className="bg-brand hover:bg-brand-dark text-white px-6 rounded-xl transition disabled:opacity-50"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
