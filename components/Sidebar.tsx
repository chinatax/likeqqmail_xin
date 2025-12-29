import React from 'react';
import { FOLDERS } from '../constants';
import { FolderType } from '../types';
import { Edit3 } from 'lucide-react';

interface SidebarProps {
  currentFolder: FolderType;
  onSelectFolder: (id: FolderType) => void;
  onComposeClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentFolder, onSelectFolder, onComposeClick }) => {
  return (
    <div className="w-16 md:w-48 lg:w-56 bg-[#FDFDFD] border-r border-gray-200 flex flex-col h-full flex-shrink-0">
      {/* Compose Button */}
      <div className="p-3 md:p-4">
        <button 
          onClick={onComposeClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 px-3 shadow-sm transition-colors flex items-center justify-center space-x-2"
        >
          <Edit3 size={18} />
          <span className="hidden md:inline font-medium">写信</span>
        </button>
      </div>

      {/* Folder List */}
      <nav className="flex-1 overflow-y-auto px-2 space-y-0.5">
        {FOLDERS.map((folder) => {
          const isActive = currentFolder === folder.id;
          return (
            <button
              key={folder.id}
              onClick={() => onSelectFolder(folder.id as FolderType)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm transition-colors group
                ${isActive 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <span className={`${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`}>
                  {folder.icon}
                </span>
                <span className="hidden md:block truncate">{folder.name}</span>
              </div>
              {folder.count && (
                <span className={`hidden md:block text-xs font-semibold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'
                }`}>
                  {folder.count}
                </span>
              )}
            </button>
          );
        })}

        <div className="mt-6 px-3 hidden md:block">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            我的文件夹
          </div>
          {/* Mock custom folders */}
          <button className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
            <span className="w-2 h-2 rounded-full bg-green-400 mr-3"></span>
            工作
          </button>
          <button className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
             <span className="w-2 h-2 rounded-full bg-orange-400 mr-3"></span>
             私人
          </button>
        </div>
      </nav>
    </div>
  );
};