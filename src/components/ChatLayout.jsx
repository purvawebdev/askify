import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const ChatLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full w-full">
        <Outlet context={{ sidebarOpen, setSidebarOpen }} />
      </div>
    </div>
  );
};

export default ChatLayout;
