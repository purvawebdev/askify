import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const ChatLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* 1. Fixed Sidebar */}
      <Sidebar />

      {/* 2. Dynamic Content Area */}
      <div className="flex-1 flex flex-col h-full w-full">
        {/* <Outlet /> renders the child route (Welcome screen OR Chat Window) */}
        <Outlet />
      </div>
    </div>
  );
};

export default ChatLayout;