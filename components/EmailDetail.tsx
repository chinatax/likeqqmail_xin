import React from 'react';
import { Email } from '../types';
import { Reply, ReplyAll, Forward, Trash2, MoreHorizontal, Printer, Star } from 'lucide-react';

interface EmailDetailProps {
  email: Email | null;
}

export const EmailDetail: React.FC<EmailDetailProps> = ({ email }) => {
  if (!email) {
    return (
      <div className="hidden lg:flex flex-1 items-center justify-center bg-white text-gray-400 flex-col">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        </div>
        <p>未选择邮件</p>
      </div>
    );
  }

  return (
    <div className="flex-1 lg:flex flex-col h-full bg-white overflow-hidden absolute inset-0 lg:static z-20">
        {/* Toolbar */}
        <div className="h-12 border-b border-gray-200 flex items-center px-4 justify-between flex-shrink-0 bg-[#F9F9F9]">
            <div className="flex space-x-1">
                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600 flex items-center space-x-1 text-xs">
                    <Reply size={16} />
                    <span>回复</span>
                </button>
                 <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600 flex items-center space-x-1 text-xs">
                    <ReplyAll size={16} />
                    <span className="hidden xl:inline">回复全部</span>
                </button>
                 <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600 flex items-center space-x-1 text-xs">
                    <Forward size={16} />
                    <span>转发</span>
                </button>
                <div className="w-px h-5 bg-gray-300 mx-2 self-center"></div>
                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600 flex items-center space-x-1 text-xs">
                    <Trash2 size={16} />
                    <span>删除</span>
                </button>
            </div>
            
            <div className="flex space-x-2 text-gray-500">
                <button title="Mark as Starred" className="p-1.5 hover:bg-gray-200 rounded">
                    <Star size={16} fill={email.isStarred ? "#FBBF24" : "none"} className={email.isStarred ? "text-yellow-400" : ""} />
                </button>
                 <button className="p-1.5 hover:bg-gray-200 rounded">
                    <Printer size={16} />
                </button>
                 <button className="p-1.5 hover:bg-gray-200 rounded">
                    <MoreHorizontal size={16} />
                </button>
            </div>
        </div>

      {/* Email Header Info */}
      <div className="px-6 py-5 border-b border-gray-100 flex-shrink-0">
        <h1 className="text-xl font-bold text-gray-900 mb-4">{email.subject}</h1>
        
        <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {email.senderName.charAt(0)}
                </div>
                <div className="flex flex-col">
                    <div className="flex items-baseline space-x-2">
                        <span className="font-bold text-gray-900 text-sm">{email.senderName}</span>
                        <span className="text-gray-500 text-xs">&lt;{email.senderEmail}&gt;</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                        发送给 <span className="text-gray-700">我</span>
                    </div>
                </div>
            </div>
            <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                {email.date}
            </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6 bg-white">
        {/* Render HTML safely would go here, for now using dummy logic or just the body string */}
        <div 
            className="prose prose-sm max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: email.body }}
        />
        
        {/* Mock Attachment Area */}
        {email.hasAttachment && (
            <div className="mt-8 pt-4 border-t border-gray-100">
                <div className="text-xs font-bold text-gray-500 mb-2">普通附件 (1)</div>
                <div className="flex items-center p-3 border border-gray-200 rounded-md bg-gray-50 w-full sm:w-64 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
                    <div className="w-8 h-8 bg-red-100 text-red-500 rounded flex items-center justify-center mr-3 font-bold text-xs">PDF</div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-700 truncate group-hover:text-blue-700">Document_v2.pdf</div>
                        <div className="text-xs text-gray-400">2.4 MB</div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};