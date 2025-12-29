import React from 'react';
import { Search, Mail, Settings, Grid, Bell, User } from 'lucide-react';

export const TopHeader: React.FC = () => {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 min-w-full z-10">
      {/* Left: Logo Area */}
      <div className="flex items-center space-x-2 w-48 lg:w-64">
        <div className="bg-blue-600 p-1.5 rounded-md">
          <Mail className="text-white h-5 w-5" />
        </div>
        <span className="text-lg font-bold text-gray-800 tracking-tight">QQ邮箱</span>
      </div>

      {/* Middle: Search */}
      <div className="flex-1 max-w-2xl px-4">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索邮件..."
            className="w-full bg-gray-100 border border-transparent focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 rounded-full py-1.5 pl-10 pr-4 text-sm transition-all duration-200 outline-none"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-3 text-gray-500">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
          <Settings size={18} />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
          <Bell size={18} />
        </button>
         <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
          <Grid size={18} />
        </button>
        <div className="h-6 w-px bg-gray-300 mx-2 hidden sm:block"></div>
        <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 pr-2 rounded-full border border-transparent hover:border-gray-200 transition-all">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <User size={16} />
          </div>
          <span className="text-sm font-medium text-gray-700 hidden md:block">User</span>
        </div>
      </div>
    </header>
  );
};