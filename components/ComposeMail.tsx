import React, { useState } from 'react';
import { X, Send, Paperclip, Image as ImageIcon, FileText, Eye, Save } from 'lucide-react';

interface ComposeMailProps {
    onCancel: () => void;
}

// A very simple Markdown parser for preview purposes
const simpleMarkdownToHtml = (markdown: string) => {
    let html = markdown
        // Escape HTML
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        // Headers
        .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-2 border-b pb-1">$1</h1>')
        .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-2">$1</h2>')
        .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mb-1">$1</h3>')
        // Bold
        .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
        .replace(/__(.*)__/gim, '<b>$1</b>')
        // Italic
        .replace(/\*(.*)\*/gim, '<i>$1</i>')
        .replace(/_(.*)_/gim, '<i>$1</i>')
        // Blockquote
        .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-2">$1</blockquote>')
        // List items
        .replace(/^\* (.*$)/gim, '<ul class="list-disc ml-5"><li>$1</li></ul>')
        .replace(/^\- (.*$)/gim, '<ul class="list-disc ml-5"><li>$1</li></ul>')
        // Code block (simple)
        .replace(/```([^`]+)```/gim, '<pre class="bg-gray-100 p-2 rounded text-sm font-mono my-2 overflow-x-auto">$1</pre>')
        // Inline code
        .replace(/`([^`]+)`/gim, '<code class="bg-gray-100 px-1 rounded text-sm font-mono text-pink-600">$1</code>')
        // Line breaks
        .replace(/\n/gim, '<br />');
    
    // Fix adjacent lists (simple hack for visual consistency in this lightweight parser)
    html = html.replace(/<\/ul><br \/><ul class="list-disc ml-5">/gim, '');
    
    return html;
};

export const ComposeMail: React.FC<ComposeMailProps> = ({ onCancel }) => {
    const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
    const [content, setContent] = useState<string>('');

    return (
        <div className="flex flex-col h-full bg-white w-full animate-in fade-in duration-200">
            {/* 
                Metallic Toolbar 
                Consistent with EmailList header gradient 
            */}
             <div 
                className="h-10 border-b border-[#c1c1c1] flex items-center px-3 justify-between flex-shrink-0 select-none"
                style={{ backgroundImage: 'linear-gradient(to bottom, #ffffff 0%, #f0f0f0 100%)' }}
             >
                <div className="flex space-x-2 items-center">
                    {/* Metallic Buttons */}
                    <button className="px-3 py-1 bg-gradient-to-b from-white to-[#f0f0f0] border border-gray-300 hover:border-gray-400 hover:to-[#e6e6e6] text-gray-800 rounded-[2px] text-xs font-bold transition-all shadow-sm active:shadow-inner active:translate-y-[1px] flex items-center">
                        <Send size={13} className="mr-1.5 text-black" />
                        发送
                    </button>
                    <button className="px-3 py-1 bg-gradient-to-b from-white to-[#f0f0f0] border border-gray-300 hover:border-gray-400 hover:to-[#e6e6e6] text-gray-700 rounded-[2px] text-xs transition-all shadow-sm active:shadow-inner active:translate-y-[1px] flex items-center">
                        <Save size={13} className="mr-1.5" />
                        存草稿
                    </button>
                </div>
                
                <div className="flex items-center">
                     <button 
                        onClick={onCancel} 
                        className="p-1 hover:bg-gray-200 text-gray-500 rounded transition-colors"
                        title="关闭"
                     >
                        <X size={18} />
                    </button>
                </div>
             </div>

             {/* Form Area */}
             <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
                <div className="p-4 md:p-6 max-w-5xl mx-auto h-full flex flex-col">
                    
                    {/* Header Inputs */}
                    <div className="space-y-3 flex-shrink-0 mb-4">
                        {/* To */}
                        <div className="flex items-center group">
                            <label className="w-14 text-gray-500 text-sm font-bold text-right pr-3 pt-1">收件人</label>
                            <div className="flex-1 relative">
                                <input 
                                    type="text" 
                                    className="w-full border-b border-gray-200 focus:border-blue-500 py-1 px-1 outline-none transition-colors text-sm text-gray-800" 
                                />
                            </div>
                            <button className="text-blue-600 text-xs ml-2 hover:underline opacity-0 group-hover:opacity-100 transition-opacity">抄送/密送</button>
                        </div>

                        {/* Subject */}
                        <div className="flex items-center">
                            <label className="w-14 text-gray-500 text-sm font-bold text-right pr-3 pt-1">主题</label>
                            <div className="flex-1">
                                <input 
                                    type="text" 
                                    className="w-full border-b border-gray-200 focus:border-blue-500 py-1 px-1 outline-none transition-colors text-sm text-gray-800 font-medium" 
                                />
                            </div>
                        </div>
                        
                        {/* Attachments Trigger */}
                        <div className="flex items-center pt-1">
                            <label className="w-14 text-right pr-3"></label>
                            <button className="text-blue-600 text-sm flex items-center space-x-1 hover:underline">
                                <Paperclip size={14} />
                                <span>添加附件</span>
                            </button>
                            <span className="text-gray-300 mx-2">|</span>
                            <button className="text-blue-600 text-sm flex items-center space-x-1 hover:underline">
                                <ImageIcon size={14} />
                                <span>图片</span>
                            </button>
                        </div>
                    </div>

                    {/* Markdown Editor Container */}
                    <div className="flex-1 border border-gray-300 rounded-[2px] shadow-sm bg-white flex flex-col min-h-[400px]">
                        
                        {/* Tabs (Write / Preview) */}
                        <div className="flex items-center bg-[#F5F5F5] border-b border-gray-300 px-2 pt-2">
                            <button 
                                onClick={() => setActiveTab('write')}
                                className={`flex items-center space-x-1 px-4 py-1.5 text-xs font-medium rounded-t-md border-t border-l border-r border-transparent -mb-px relative z-10 ${activeTab === 'write' ? 'bg-white border-gray-300 border-b-white text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                            >
                                <FileText size={14} className="mr-1" />
                                Markdown 编辑
                            </button>
                            <button 
                                onClick={() => setActiveTab('preview')}
                                className={`flex items-center space-x-1 px-4 py-1.5 text-xs font-medium rounded-t-md border-t border-l border-r border-transparent -mb-px relative z-10 ${activeTab === 'preview' ? 'bg-white border-gray-300 border-b-white text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                            >
                                <Eye size={14} className="mr-1" />
                                预览
                            </button>
                        </div>
                        
                        {/* Content Area */}
                        <div className="flex-1 relative">
                            {activeTab === 'write' ? (
                                <textarea 
                                    className="w-full h-full p-4 outline-none resize-none text-gray-800 text-sm font-mono leading-relaxed" 
                                    placeholder="# 请在此输入 Markdown 内容...&#10;&#10;- 支持列表&#10;- **粗体**&#10;- `代码`"
                                    spellCheck={false}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                ></textarea>
                            ) : (
                                <div 
                                    className="w-full h-full p-6 overflow-y-auto prose prose-sm max-w-none text-gray-800"
                                    dangerouslySetInnerHTML={{ __html: content ? simpleMarkdownToHtml(content) : '<p class="text-gray-400 italic">暂无内容...</p>' }}
                                />
                            )}
                        </div>

                        {/* Footer Status */}
                        <div className="h-6 border-t border-gray-200 bg-gray-50 flex items-center px-2 justify-end">
                            <span className="text-[10px] text-gray-400">Markdown 模式</span>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    )
}