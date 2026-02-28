import { useState } from "react";
import {
  FaFileUpload,
  FaLightbulb,
  FaCode,
  FaPen,
  FaBars,
  FaPaperPlane,
  FaBookOpen,
} from "react-icons/fa";
import { useOutletContext, useNavigate } from "react-router-dom";
import { createNewChat } from "../api/chatApi";

const suggestions = [
  { icon: <FaPen size={14} />, label: "Write anything" },
  { icon: <FaCode size={14} />, label: "Explain code" },
  { icon: <FaLightbulb size={14} />, label: "Brainstorm ideas" },
  { icon: <FaBookOpen size={14} />, label: "Summarize a topic" },
  { icon: <FaFileUpload size={14} />, label: "Upload & ask" },
];

const Welcome = () => {
  const { sidebarOpen, setSidebarOpen } = useOutletContext();
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const handleSend = async (message) => {
    const text = message || input;
    if (!text.trim() || sending) return;

    setSending(true);
    try {
      // Create a new chat and navigate to it with the message
      const data = await createNewChat();
      // Navigate to the chat — ChatWindow will load it
      // We pass the initial message via state so ChatWindow can auto-send it
      navigate(`/chat/${data.chatId}`, { state: { initialMessage: text } });
    } catch (err) {
      console.error("Failed to start chat", err);
      setSending(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 relative bg-gray-50">
      {/* Sidebar toggle */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="absolute top-4 left-4 p-2 rounded-lg hover:bg-gray-200/60 transition text-gray-500 hover:text-gray-700"
          title="Open sidebar"
        >
          <FaBars size={16} />
        </button>
      )}

      {/* Greeting */}
      <div className="mb-8 text-center">
        <div className="flex items-center gap-2 justify-center mb-3">
          <img
            src="/robot.png"
            alt="Askify"
            className="w-12 h-12 drop-shadow-lg"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-1 tracking-tight">
          Hi, what can I help with?
        </h1>
        <p className="text-gray-400 text-sm">Powered by AskifyAI</p>
      </div>

      {/* Input box */}
      <div className="w-full max-w-2xl mb-6">
        <form
          onSubmit={handleSubmit}
          className="relative bg-white rounded-2xl shadow-lg border border-gray-200 focus-within:border-brand/40 focus-within:shadow-[0_0_20px_rgba(32,117,104,0.15)] transition-all duration-300"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AskifyAI anything..."
            disabled={sending}
            className="w-full px-5 py-4 pr-14 rounded-2xl bg-transparent outline-none text-gray-800 placeholder-gray-400 text-base disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || sending}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-brand hover:bg-brand-dark text-white transition disabled:opacity-30 disabled:hover:bg-brand"
          >
            <FaPaperPlane size={14} />
          </button>
        </form>
      </div>

      {/* Suggestion chips (disabled — coming soon) */}
      <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
        {suggestions.map((s, i) => (
          <div key={i} className="relative group">
            <button
              disabled
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 shadow-sm cursor-pointer"
            >
              <span className="text-brand/70">{s.icon}</span>
              {s.label}
            </button>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Coming soon
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Welcome;
