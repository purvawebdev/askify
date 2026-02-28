import React from "react";
import { FaPaperPlane } from "react-icons/fa";

const ChatInput = ({ value, onChange, onSubmit, disabled }) => {
  return (
    <div className="p-4 bg-white border-t">
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your message..."
          disabled={disabled}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-brand focus:ring-2 outline-none bg-gray-50"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="bg-brand hover:bg-brand-dark text-white px-6 rounded-xl transition disabled:opacity-50 flex items-center justify-center"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
