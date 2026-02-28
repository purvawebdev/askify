import React from "react";
const ThinkingBubble = () => {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full flex items-center justify-center">
        <img
          src="/robot.png"
          alt="AI"
          className="w-8 h-8 rounded-full animate-bounce"
        />
      </div>
      <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 text-gray-400 text-sm">
        Thinking...
      </div>
    </div>
  );
};

export default ThinkingBubble;
