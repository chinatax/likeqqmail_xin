import React from 'react';
import { Email } from '../types';
import { Star, Paperclip } from 'lucide-react';

interface EmailListProps {
  emails: Email[];
  selectedEmailId: string | null;
  onSelectEmail: (id: string) => void;
}

export const EmailList: React.FC<EmailListProps> = ({ emails, selectedEmailId, onSelectEmail }) => {
  return (
    <div className="flex-1 flex flex-col h-full min-w-0 bg-white border-r border-gray-200">
      
      {/* 
        QQ Style Header 
        - Metallic gradient background (vertical white to light gray)
        - Distinct column borders
        - Centered and Bold text
      */}
      <div 
        className="flex items-center h-7 border-b border-[#c1c1c1] text-xs text-gray-700 select-none flex-shrink-0"
        style={{ backgroundImage: 'linear-gradient(to bottom, #ffffff 0%, #f0f0f0 100%)' }}
      >
        {/* Checkbox Column */}
        <div className="w-10 flex items-center justify-center h-full border-r border-[#dcdcdc] hover:bg-white cursor-pointer active:bg-gray-50 transition-colors">
          <input type="checkbox" className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-0" />
        </div>
        
        {/* Sender Column */}
        <div className="w-32 md:w-40 px-2 h-full flex items-center justify-center border-r border-[#dcdcdc] hover:bg-white cursor-pointer active:bg-gray-50 transition-colors font-bold">
          发件人
        </div>
        
        {/* Subject Column (Flex 1 to take remaining space) */}
        <div className="flex-1 px-2 h-full flex items-center justify-center border-r border-[#dcdcdc] hover:bg-white cursor-pointer active:bg-gray-50 transition-colors font-bold">
          主题
        </div>
        
        {/* Date Column */}
        <div className="w-24 md:w-28 px-2 h-full flex items-center justify-center hover:bg-white cursor-pointer active:bg-gray-50 transition-colors font-bold">
          时间
        </div>
      </div>

      {/* List Content */}
      <div className="flex-1 overflow-y-auto">
        {emails.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p>没有邮件</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {emails.map((email) => {
              const isSelected = selectedEmailId === email.id;
              return (
                <li
                  key={email.id}
                  onClick={() => onSelectEmail(email.id)}
                  className={`
                    group flex items-center h-10 text-sm cursor-default
                    ${isSelected ? 'bg-[#DCEBFE]' : 'hover:bg-[#F2F7FF]'} 
                    transition-colors duration-75
                  `}
                >
                  {/* Checkbox / Star Area */}
                  <div className="w-10 flex items-center justify-center flex-shrink-0">
                     {/* In QQ Mail, hover usually reveals checkbox over star, or they are side-by-side. Simplified here. */}
                     <input type="checkbox" className={`h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-0 ${isSelected ? 'block' : 'hidden group-hover:block'}`} />
                     <button className={`${isSelected ? 'hidden' : 'block group-hover:hidden'} text-gray-300 hover:text-yellow-400`}>
                        <Star size={14} fill={email.isStarred ? "#FBBF24" : "none"} className={email.isStarred ? "text-yellow-400" : ""} />
                     </button>
                  </div>

                  {/* Sender */}
                  <div className={`w-32 md:w-40 px-2 truncate flex-shrink-0 ${email.isRead ? 'text-gray-600' : 'text-black font-bold'} ${isSelected ? 'text-black' : ''}`}>
                    {email.senderName}
                  </div>

                  {/* Subject & Snippet */}
                  <div className="flex-1 px-2 min-w-0 flex items-center">
                    {email.hasAttachment && (
                      <Paperclip size={12} className="mr-1.5 text-gray-400 flex-shrink-0" />
                    )}
                    <div className="truncate flex items-center">
                      <span className={`${email.isRead ? 'text-gray-700' : 'text-black font-bold'} truncate`}>
                        {email.subject}
                      </span>
                      <span className={`ml-2 text-gray-400 text-xs truncate hidden xl:inline`}>
                        - {email.snippet}
                      </span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className={`w-24 md:w-28 px-2 text-right text-xs flex-shrink-0 ${email.isRead ? 'text-gray-500' : 'text-blue-600 font-bold'} ${isSelected ? 'text-black' : ''}`}>
                    {email.date}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};