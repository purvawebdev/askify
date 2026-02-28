import React from "react";
import { FaPaperPlane } from "react-icons/fa";

const ChatInput = ({ value, onChange, onSubmit, disabled }) => {
  return (
    <div className="p-4 bg-gray-50">
      <form
        onSubmit={onSubmit}
        className="relative max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 focus-within:border-brand/40 focus-within:shadow-[0_0_20px_rgba(32,117,104,0.15)] transition-all duration-300"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your message..."
          disabled={disabled}
          className="w-full px-5 py-4 pr-14 rounded-2xl bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-brand hover:bg-brand-dark text-white transition disabled:opacity-30 disabled:hover:bg-brand"
        >
          <FaPaperPlane size={13} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
