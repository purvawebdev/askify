import React from "react";
import { FaRobot } from "react-icons/fa";

const ThinkingBubble = () => {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
        <FaRobot className="text-gray-600 animate-pulse" />
      </div>
      <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 text-gray-400 text-sm">
        Thinking...
      </div>
    </div>
  );
};

export default ThinkingBubble;
